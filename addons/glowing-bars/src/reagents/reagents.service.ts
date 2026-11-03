// Reagents of the group buffs: whether a spell needs one, whether there is one in the bags, and
// which are running low. Whether a spell needs a reagent is read from its tooltip, so a client
// that dropped the reagent cost never nags about it.
import { OnEvent, contains } from "@wowkit/core";
import type { BagsService, SpellsService } from "@wowkit/wow";
import type { BelowLimitsService } from "../reminders/below-limits.service";
import type { Reagent, ReagentStock } from "./reagent.interface";
import { REAGENTS } from "./reagents.constants";

export class ReagentsService {
    private readonly reagentBySpell = new LuaMap<number, Reagent>();
    /** spell ID -> its tooltip names the reagent (tooltips are read once per spell). */
    private readonly tooltipNeedsReagent = new LuaMap<number, boolean>();

    constructor(
        private readonly bags: BagsService,
        private readonly spells: SpellsService,
        private readonly limits: BelowLimitsService,
    ) {
        for (const reagent of REAGENTS) for (const spellId of reagent.spells) this.reagentBySpell.set(spellId, reagent);
    }

    @OnEvent("spells.invalidated")
    forgetTooltips(): void {
        for (const [id] of this.tooltipNeedsReagent) this.tooltipNeedsReagent.delete(id);
    }

    /** Can the spell be cast as far as reagents go? */
    hasReagentFor(spellId: number): boolean {
        const reagent = this.findReagentFor(spellId);
        return reagent === undefined || this.getReagentCount(reagent) > 0;
    }

    /** The first item of the "Reagents:" line of the spell's tooltip (the English client's wording); undefined without one. */
    findTooltipReagent(spellId: number): string | undefined {
        for (const text of this.spells.getSpellTooltipTexts(spellId) ?? []) {
            const [list] = string.match(text, "^Reagents?:%s*(.+)$");
            if (list === undefined) continue;
            // Color codes and counts are not part of the name: "|cffff2020Holy Candle|r (2)"
            const [plain] = string.gsub(string.gsub(list, "|c%x%x%x%x%x%x%x%x", "")[0], "|r", "");
            const [first] = string.match(plain, "^%s*([^,%(]-)%s*[,%(]");
            return first ?? string.match(plain, "^%s*(.-)%s*$")[0];
        }
        return undefined;
    }

    /** The reagent a group buff of the list uses; undefined for another spell. */
    findReagentOfSpell(spellId: number): Reagent | undefined {
        return REAGENTS.find((reagent) => reagent.spells.includes(spellId));
    }

    /** The reagents the group buffs of a class use ("PRIEST"), in list order. */
    getReagentsOfClass(classToken: string | undefined): Reagent[] {
        return REAGENTS.filter((reagent) => reagent.classToken === classToken);
    }

    /**
     * Reagents of spells the player knows, with fewer than the player's limit in the bags. `isWanted` leaves out the reagents
     * the player does not want to hear about. A rank the player has outgrown does not count (Prayer of Fortitude 1, with
     * rank 2 learned: no Holy Candle needed).
     */
    findLowReagents(isWanted: (reagent: Reagent) => boolean = () => true): ReagentStock[] {
        const low: ReagentStock[] = [];
        REAGENTS.forEach((reagent, index) => {
            if (!isWanted(reagent)) return;
            const usedBy = reagent.spells.find(
                (spellId) =>
                    this.spells.isLearned(spellId) && this.findReagentFor(spellId) !== undefined && !this.isOutranked(spellId, index),
            );
            const count = this.getReagentCount(reagent);
            if (usedBy !== undefined && this.isLow(count, string.format("%d", reagent.itemId)))
                low.push({ reagent, spellId: usedBy, name: this.getReagentName(reagent), count });
        });
        return low;
    }

    /** Does the player know a higher rank of the spell, one with a later reagent of the list (its ranks are in order)? */
    private isOutranked(spellId: number, index: number): boolean {
        const name = this.spells.getSpellName(spellId);
        if (name === undefined) return false;
        return REAGENTS.slice(index + 1).some((later) =>
            later.spells.some((id) => this.spells.isLearned(id) && this.spells.getSpellName(id) === name),
        );
    }

    /** The learned group buffs, as the IDs the buttons hold, whose reagent is running low. */
    findSpellsWithLowReagent(isWanted: (reagent: Reagent) => boolean = () => true): number[] {
        const spellIds: number[] = [];
        for (const stock of this.findLowReagents(isWanted)) {
            for (const spellId of stock.reagent.spells) {
                const learned = this.spells.resolve(spellId);
                if (learned !== undefined && this.findReagentFor(spellId) !== undefined && !spellIds.includes(learned))
                    spellIds.push(learned);
            }
        }
        return spellIds;
    }

    /** This many of a reagent in the bags is running low: fewer than the limit of its row (`entry`), else the reminderType's. */
    isLow(count: number, entry?: string): boolean {
        return count < this.limits.getLimit("lowReagent", entry);
    }

    /** The name of the item (the client's, else the English one). */
    getReagentName(reagent: Reagent): string {
        return this.bags.getItemName(reagent.itemId) ?? reagent.name;
    }

    private getReagentCount(reagent: Reagent): number {
        return this.bags.getItemCount(reagent.itemId);
    }

    private doesTooltipNameReagent(spellId: number, reagent: Reagent): boolean {
        if (this.tooltipNeedsReagent.has(spellId)) return this.tooltipNeedsReagent.get(spellId) === true;
        const texts = this.spells.getSpellTooltipTexts(this.spells.resolve(spellId) ?? spellId);
        // No tooltip: assume the classic cost
        if (texts === undefined) return true;
        const reagentName = string.lower(this.getReagentName(reagent));
        const isNeeded = texts.some((text) => contains(string.lower(text), reagentName));
        this.tooltipNeedsReagent.set(spellId, isNeeded);
        return isNeeded;
    }

    /** The reagent this spell costs on this client, if any. */
    private findReagentFor(spellId: number): Reagent | undefined {
        const reagent = this.reagentBySpell.get(spellId);
        return reagent && this.doesTooltipNameReagent(spellId, reagent) ? reagent : undefined;
    }
}
