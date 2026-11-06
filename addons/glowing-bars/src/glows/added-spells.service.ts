// The player's own say in the spells: a fixed ID for a spell of the lists (when the client knows it by another one: every
// question about the spell then goes to that ID), and spells the player added by their ID. Both are the character's.
import { OnEvent } from "@wowkit/core";
import { type CooldownsService, type SpellsService, isKnownItem } from "@wowkit/wow";
import type { TextKey } from "../locale/texts.constants";
import type { ReagentsService } from "../reagents/reagents.service";
import type { AddonSettingsService, AddableType, AddedSpell } from "../settings/settings.interface";

export class AddedSpellsService {
    /** The IDs added as each type, kept until the list changes: every tick asks for them. */
    private readonly addedByType = new LuaMap<AddableType, number[]>();

    constructor(
        private readonly spells: SpellsService,
        private readonly settings: AddonSettingsService,
        private readonly cooldowns: CooldownsService,
        private readonly reagents: ReagentsService,
    ) {}

    /**
     * What is surely wrong with this type for the spell, if anything? A cooldown needs a cooldown, a low reagent a
     * reagent named in the tooltip; the game tells both. The other types it cannot tell apart, so they are taken as given.
     */
    findTypeProblem(spellId: number, reminderType: AddableType): TextKey | undefined {
        if (reminderType === "readyCooldown" && this.cooldowns.getBaseCooldown(spellId) <= 0) return "MSG_NO_COOLDOWN";
        if (reminderType === "lowReagent" && this.reagents.findTooltipReagent(spellId) === undefined) return "MSG_NO_REAGENT";
        return undefined;
    }

    /** The ID a spell of the lists is used by: the one the player fixed, else the list's own. */
    getEffectiveId(listId: number): number {
        return this.settings.get("idOverrides")[string.format("%d", listId)] ?? listId;
    }

    /** Does the client know a spell by this ID? */
    isKnownSpell(spellId: number): boolean {
        return this.spells.getSpellName(spellId) !== undefined;
    }

    /** Fixes the ID of a spell of the lists; its own ID drops the fix. False when the client knows no spell by the new ID. */
    changeOverride(listId: number, spellId: number): boolean {
        if (!this.isKnownSpell(spellId)) return false;
        const overrides = { ...this.settings.get("idOverrides") };
        overrides[string.format("%d", listId)] = spellId === listId ? undefined : spellId;
        this.spells.forgetResolved(listId);
        this.settings.change("idOverrides", overrides);
        return true;
    }

    /** The IDs of the spells the player added as this type. */
    listAdded(reminderType: AddableType): number[] {
        const kept = this.addedByType.get(reminderType);
        if (kept !== undefined) return kept;
        const ids: number[] = [];
        for (const spell of this.settings.get("addedSpells")) if (spell.reminderType === reminderType) ids.push(spell.id);
        this.addedByType.set(reminderType, ids);
        return ids;
    }

    @OnEvent("setting.changed")
    forgetAdded(key: string): void {
        if (key !== "addedSpells") return;
        for (const [reminderType] of this.addedByType) this.addedByType.delete(reminderType);
    }

    /** Adds a spell by its ID. False when the client knows no spell by it; a spell added already stays as it is. */
    addSpell(spellId: number, reminderType: AddableType): boolean {
        if (!this.isKnownSpell(spellId)) return false;
        const spells = this.settings.get("addedSpells");
        if (!spells.some((spell) => spell.id === spellId)) this.settings.change("addedSpells", [...spells, { id: spellId, reminderType }]);
        return true;
    }

    /** Adds an item to watch by its ID. False when the client knows no item by it. */
    addItem(itemId: number): boolean {
        if (!isKnownItem(itemId)) return false;
        const spells = this.settings.get("addedSpells");
        if (!spells.some((spell) => spell.id === itemId && spell.reminderType === "lowStock"))
            this.settings.change("addedSpells", [...spells, { id: itemId, reminderType: "lowStock" }]);
        return true;
    }

    /** Gives an added spell another ID. False when the client knows no spell by it. */
    changeAdded(oldId: number, spellId: number): boolean {
        if (!this.isKnownSpell(spellId)) return false;
        const spells: AddedSpell[] = this.settings
            .get("addedSpells")
            .map((spell) => (spell.id === oldId ? { id: spellId, reminderType: spell.reminderType } : spell));
        this.settings.change("addedSpells", spells);
        return true;
    }

    removeAdded(spellId: number, reminderType: AddableType | undefined): void {
        this.settings.change(
            "addedSpells",
            this.settings
                .get("addedSpells")
                .filter(
                    (spell) =>
                        spell.id !== spellId ||
                        (reminderType !== undefined && (reminderType === "lowStock") !== (spell.reminderType === "lowStock")),
                ),
        );
    }
}
