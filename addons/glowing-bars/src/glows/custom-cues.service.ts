// The player's own say in the spells: a fixed ID for a spell of the lists (when the client knows it by another one: every
// question about the spell then goes to that ID), and spells the player added by their ID. Both are the character's.
import type { CooldownsService, SpellsService } from "@wowkit/wow";
import type { TextKey } from "../locale/texts.constants";
import type { ReagentsService } from "../reagents/reagents.service";
import type { AddonSettingsService, CueKind, CustomCue } from "../settings/settings.interface";

export class CustomCuesService {
    constructor(
        private readonly spells: SpellsService,
        private readonly settings: AddonSettingsService,
        private readonly cooldowns: CooldownsService,
        private readonly reagents: ReagentsService,
    ) {}

    /**
     * What is surely wrong with this kind for the spell, if anything? A cooldown needs a cooldown, a low reagent a
     * reagent named in the tooltip; the game tells both. The other kinds it cannot tell apart, so they are taken as given.
     */
    findKindProblem(spellId: number, kind: CueKind): TextKey | undefined {
        if (kind === "cooldown" && this.cooldowns.getBaseCooldown(spellId) <= 0) return "MSG_NO_COOLDOWN";
        if (kind === "reagent" && this.reagents.findTooltipReagent(spellId) === undefined) return "MSG_NO_REAGENT";
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

    /** The IDs of the spells the player added as this kind. */
    listCustom(kind: CueKind): number[] {
        return this.settings
            .get("customCues")
            .filter((cue) => cue.kind === kind)
            .map((cue) => cue.id);
    }

    /** Adds a spell by its ID. False when the client knows no spell by it; a spell added already stays as it is. */
    addCustom(spellId: number, kind: CueKind): boolean {
        if (!this.isKnownSpell(spellId)) return false;
        const cues = this.settings.get("customCues");
        if (!cues.some((cue) => cue.id === spellId)) this.settings.change("customCues", [...cues, { id: spellId, kind }]);
        return true;
    }

    /** Gives an added spell another ID. False when the client knows no spell by it. */
    changeCustom(oldId: number, spellId: number): boolean {
        if (!this.isKnownSpell(spellId)) return false;
        const cues: CustomCue[] = this.settings.get("customCues").map((cue) => (cue.id === oldId ? { id: spellId, kind: cue.kind } : cue));
        this.settings.change("customCues", cues);
        return true;
    }

    removeCustom(spellId: number): void {
        this.settings.change(
            "customCues",
            this.settings.get("customCues").filter((cue) => cue.id !== spellId),
        );
    }
}
