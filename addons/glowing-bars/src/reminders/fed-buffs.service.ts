// The foods and drinks the player added as buffs. Their own buff ends with the eating; what stays is a Well Fed, a spell of
// its own, one for each food and drink under one name. The game does not tell which spell gives which, so it is learned in
// the order of things: the player uses a food, and the next new Well Fed while eating is its own. What is learned is kept
// per character. A Well Fed nobody has learned counts for any food or drink, as long as there are enough of them.
import { Interval, OnEvent } from "@wowkit/core";
import {
    type ActionBarsService,
    type AuraEntry,
    type ClockService,
    type PlayerService,
    type PlayerSpellCast,
    type SpellsService,
    buildNameKey,
    findButtonItem,
    findItemUseSpell,
    isOutOfItem,
    readItemLook,
} from "@wowkit/wow";
import { Consumable } from "@wowkit/wow-data";
import type { BuffStateService } from "../character/buff-state.service";
import type { AddedSpellsService } from "../glows/added-spells.service";
import type { AddonSettingsService } from "../settings/settings.interface";

/** The buff of eating may take this long to show after the cast; a spell with no eating after it is no food. */
const EATING_GRACE_SECONDS = 1.5;
/** Two Well Fed closer than this in what they have left came at the same moment: their order cannot be told. */
const SAME_MOMENT_SECONDS = 0.1;
/** The spells named so give a Well Fed, whatever their ID, by what they are; any other is known once learned. */
const FED_SPELLS: { [fedKind: string]: number[] } = {
    Food: [Consumable.Food, Consumable.NutritiousFood],
    Drink: [Consumable.NutritiousDrink],
};

interface UsedFood {
    spellId: number;
    usedAt: number;
}

export class FedBuffsService {
    /** The foods and drinks used, the oldest first, that no new Well Fed has been given to yet. */
    private used: UsedFood[] = [];
    /** The Well Fed seen at the last look; undefined before the first, when any on the player are old news. */
    private seen: LuaSet<number> | undefined;

    constructor(
        private readonly addedSpells: AddedSpellsService,
        private readonly spells: SpellsService,
        private readonly buffState: BuffStateService,
        private readonly player: PlayerService,
        private readonly clock: ClockService,
        private readonly settings: AddonSettingsService,
        private readonly actionBars: ActionBarsService,
    ) {}

    @OnEvent("player.spell-cast")
    noteUse(cast: PlayerSpellCast): void {
        const spellId = cast.spellId;
        if (spellId === undefined) return;
        const isAdded = this.addedSpells.listAdded("missingBuff").some((id) => id === spellId || this.spells.resolve(id) === spellId);
        if (isAdded) this.used.push({ spellId, usedAt: this.clock.getCurrentTime() });
    }

    /** Looks for a new Well Fed. */
    @Interval(200)
    checkWellFed(): void {
        const auras = this.buffState.findAuras(Consumable.WellFed);
        if (auras === undefined) return;
        const now = this.clock.getCurrentTime();
        const isEating = this.player.isEating();
        this.used = this.used.filter((food) => isEating || now - food.usedAt < EATING_GRACE_SECONDS);
        const seen = this.seen;
        this.seen = new LuaSet();
        for (const aura of auras) if (aura.spellId !== undefined) this.seen.add(aura.spellId);
        if (seen !== undefined) this.rememberNew(auras.filter((aura) => aura.spellId !== undefined && !seen.has(aura.spellId)));
    }

    /** Is it a spell that gives a Well Fed: named so, or learned? */
    isFedSpell(spellId: number): boolean {
        return this.settings.get("fedBuffs")[string.format("%d", spellId)] !== undefined || this.findFedKind(spellId) !== undefined;
    }

    /** Does this button stand for a food or drink that is asked for? One of another ID goes dark; any other button is free. */
    isButtonWanted(button: ActionButton, wanted: number[]): boolean {
        const spellId = this.findButtonSpell(button);
        return spellId === undefined || !this.isFedSpell(spellId) || wanted.includes(spellId);
    }

    /** Is the food or drink of exactly this spell on a button with some left? */
    isOnBarsWithSome(spellId: number): boolean {
        return this.actionBars
            .findButtonsOf(spellId)
            .some((button) => this.findButtonSpell(button) === spellId && !isOutOfItem(this.actionBars, button));
    }

    /** The item of a food or drink the player added, by what a button holds; kept once seen, for when it leaves the bars. */
    findItemLook(spellId: number): { name: string | undefined; iconId: number | undefined } | undefined {
        if (!this.isFedSpell(spellId)) return undefined;
        const key = string.format("%d", spellId);
        const button = this.actionBars.findButtonsOf(spellId).find((candidate) => this.findButtonSpell(candidate) === spellId);
        const seen = button !== undefined ? findButtonItem(this.actionBars, button) : undefined;
        if (seen !== undefined && this.settings.get("fedItems")[key] !== seen) {
            this.settings.change("fedItems", { ...this.settings.get("fedItems"), [key]: seen });
        }
        const itemId = this.settings.get("fedItems")[key];
        return itemId !== undefined ? readItemLook(itemId) : undefined;
    }

    /** Which of these foods and drinks are not up. Spells of one name are one: the player eats either. */
    findMissing(spellIds: number[]): number[] {
        const auras = this.buffState.findAuras(Consumable.WellFed);
        if (auras === undefined) return this.buffState.hasAura(Consumable.WellFed) ? [] : spellIds;
        const keyByAura = this.listLearned();
        const upKeys = new LuaSet<string>();
        let unknown = 0;
        for (const aura of auras) {
            const key = keyByAura.get(aura.spellId ?? 0);
            if (key !== undefined) upKeys.add(key);
            else unknown++;
        }
        const waiting: string[] = [];
        for (const id of spellIds) {
            const key = this.getKey(id);
            if (!upKeys.has(key) && !waiting.includes(key)) waiting.push(key);
        }
        // A Well Fed nobody learned may be anyone's; with too few of them it cannot be told who is missing one
        if (unknown >= waiting.length) return [];
        return spellIds.filter((id) => waiting.includes(this.getKey(id)));
    }

    /** The new Well Fed go to the foods used, each to the oldest: the one with the least left came first. */
    private rememberNew(auras: AuraEntry[]): void {
        if (auras.length === 0 || this.used.length === 0) return;
        const sorted = [...auras].sort((a, b) => a.remain - b.remain);
        const isClear = sorted.every((aura, i) => i === 0 || aura.remain - sorted[i - 1]!.remain > SAME_MOMENT_SECONDS);
        const foods = this.used.splice(0, sorted.length);
        if (!isClear) return;
        const learned = { ...this.settings.get("fedBuffs") };
        foods.forEach((food, i) => {
            learned[string.format("%d", food.spellId)] = sorted[i]!.spellId;
        });
        this.settings.change("fedBuffs", learned);
    }

    /** The Well Fed learned, with the name key of the spell that gives it. */
    private listLearned(): LuaMap<number, string> {
        const keyByAura = new LuaMap<number, string>();
        for (const [spell, aura] of pairs(this.settings.get("fedBuffs"))) {
            if (aura !== undefined) keyByAura.set(aura, this.getKey(tonumber(spell)!));
        }
        return keyByAura;
    }

    private findButtonSpell(button: ActionButton): number | undefined {
        const itemId = findButtonItem(this.actionBars, button);
        return itemId !== undefined ? findItemUseSpell(itemId) : undefined;
    }

    /** Whether a spell is of a food or a drink, by its name in the client's language. */
    private findFedKind(spellId: number): string | undefined {
        const key = this.getNameKey(spellId);
        for (const [kind, ids] of pairs(FED_SPELLS)) if (ids.some((id) => this.getNameKey(id) === key)) return kind as string;
        return undefined;
    }

    /** What makes spells one: being a food or a drink, else their name. */
    private getKey(spellId: number): string {
        return this.findFedKind(spellId) ?? this.getNameKey(spellId);
    }

    private getNameKey(spellId: number): string {
        return buildNameKey(this.spells.getSpellLabel(spellId) ?? string.format("%d", spellId));
    }
}
