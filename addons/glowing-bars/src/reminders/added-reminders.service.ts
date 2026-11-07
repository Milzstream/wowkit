// The buffs, weapon buffs and group buffs with a reagent that the player added by their ID. The addon knows nothing more of
// them than the spell, so each is reminded of in the simplest way that fits its type: a buff when the player has no aura
// of its name (a food or drink: see FedBuffsService), a weapon buff when the main hand has no temporary enchant at all, a reagent when the item the spell's
// tooltip names as its reagent runs low.
import type { LowReagent } from "../reagents/reagent.interface";
import { type ActionBarsService, type BagsService, type SpellsService, type WeaponEnchantsService, isOutOfItem } from "@wowkit/wow";
import type { BuffStateService } from "../character/buff-state.service";
import type { AddedSpellsService } from "../glows/added-spells.service";
import type { ReagentsService } from "../reagents/reagents.service";
import type { AddonSettingsService, AddableType } from "../settings/settings.interface";
import type { FedBuffsService } from "./fed-buffs.service";

export class AddedRemindersService {
    constructor(
        private readonly addedSpells: AddedSpellsService,
        private readonly spells: SpellsService,
        private readonly actionBars: ActionBarsService,
        private readonly buffState: BuffStateService,
        private readonly weaponEnchants: WeaponEnchantsService,
        private readonly bags: BagsService,
        private readonly settings: AddonSettingsService,
        private readonly reagents: ReagentsService,
        private readonly fedBuffs: FedBuffsService,
    ) {}

    /** The added buffs that are on a button and not on the player (in combat a cast one counts until the fight ends). */
    findMissingBuffs(): number[] {
        const ids = this.listOnBars("missingBuff");
        if (ids.length === 0) return ids;
        const missingFed = this.fedBuffs.findMissing(ids.filter((id) => this.fedBuffs.isFedSpell(id)));
        return ids.filter((id) =>
            this.fedBuffs.isFedSpell(id) ? missingFed.includes(id) : !this.buffState.hasAura(id) && this.spells.isCastable(id) !== false,
        );
    }

    /** The added weapon buffs, when the main-hand weapon has no temporary enchant (poison, imbue or stone) at all. */
    findWeaponSpells(): number[] {
        const spellIds = this.listOnBars("weaponBuff");
        if (spellIds.length === 0) return [];
        return this.weaponEnchants.getWeaponEnchant(false).has === false ? spellIds : [];
    }

    /** The added spells whose reagent, named in the spell's tooltip, runs low in the bags. */
    findReagentSpells(): number[] {
        return this.listOnBars("lowReagent").filter((id) => {
            const reagent = this.reagents.findTooltipReagent(id);
            return reagent !== undefined && this.reagents.isLow(this.bags.getItemCountByName(reagent), `spell${string.format("%d", id)}`);
        });
    }

    /** The reagents of the added spells that are learned and switched on, running low, on a bar or not; each reagent once. */
    findLowReagents(): LowReagent[] {
        const low: LowReagent[] = [];
        const enabledSpells = this.settings.get("enabledSpells");
        for (const id of this.addedSpells.listAdded("lowReagent")) {
            const spellId = this.spells.resolve(id);
            const name = this.reagents.findTooltipReagent(id);
            if (spellId === undefined || name === undefined || enabledSpells[string.format("%d", id)] === false) continue;
            const count = this.bags.getItemCountByName(name);
            const isLow = this.reagents.isLow(count, `spell${string.format("%d", id)}`);
            if (isLow && !low.some((other) => other.name === name)) low.push({ spellId, name, count });
        }
        return low;
    }

    /** The added spells of a type that are switched on, learned and on a button that has not run out, as the IDs the buttons hold. */
    private listOnBars(reminderType: AddableType): number[] {
        const added = this.addedSpells.listAdded(reminderType);
        // None added as this type: the list itself, empty (nobody changes it)
        if (added.length === 0) return added;
        const found: number[] = [];
        const enabledSpells = this.settings.get("enabledSpells");
        for (const id of added) {
            if (enabledSpells[string.format("%d", id)] === false) continue;
            const learned = this.spells.resolve(id) ?? id;
            const isOnBars = this.fedBuffs.isFedSpell(learned)
                ? this.fedBuffs.isOnBarsWithSome(learned)
                : this.actionBars.findButtonsOf(learned).some((button) => !isOutOfItem(this.actionBars, button));
            if (isOnBars) found.push(learned);
        }
        return found;
    }
}
