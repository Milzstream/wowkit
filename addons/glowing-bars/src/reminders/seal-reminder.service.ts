// The paladin's seals: in a fight a seal should be up. The client hides the auras in combat, so a seal counts from the
// player's own cast for its 30 seconds (the "seal" category of the buff memory); a Judgement leaves it on. Any seal
// counts, the seals the player added too. The one that glows is the seal the player last used (kept per character); before
// the first one, the one the main talent tree wants, else the first on the bars. A seal switched off in the table or not
// on the bars is skipped.
import { OnEvent } from "@wowkit/core";
import type { ActionBarsService, PlayerService, PlayerSpellCast, SpellsService } from "@wowkit/wow";
import { Paladin } from "@wowkit/wow-data";
import type { BuffStateService } from "../character/buff-state.service";
import type { AddedSpellsService } from "../glows/added-spells.service";
import type { AddonSettingsService } from "../settings/settings.interface";

/** The seals, in the order the table lists them (their wow-data IDs). */
export const SEALS = [
    Paladin.SealOfRighteousness,
    Paladin.SealOfCommand,
    Paladin.SealOfTheCrusader,
    Paladin.SealOfWisdom,
    Paladin.SealOfLight,
    Paladin.SealOfJustice,
    Paladin.SealOfFury,
];

/** A seal's reminder comes this many seconds before it runs out: one global cooldown, to cast the next in time. */
const SEAL_LEAD = 1.5;

/** The seal each talent tree (1 Holy, 2 Protection, 3 Retribution) wants first, before the player has cast one. */
const TALENT_SEALS: { [tree: number]: number[] | undefined } = {
    1: [Paladin.SealOfWisdom, Paladin.SealOfLight],
    2: [Paladin.SealOfRighteousness],
    3: [Paladin.SealOfCommand, Paladin.SealOfRighteousness],
};

/** The key of the seal cast last in the saved settings. */
const LAST_SEAL_KEY = "seal";

export class SealReminderService {
    constructor(
        private readonly spells: SpellsService,
        private readonly actionBars: ActionBarsService,
        private readonly buffState: BuffStateService,
        private readonly player: PlayerService,
        private readonly settings: AddonSettingsService,
        private readonly addedSpells: AddedSpellsService,
    ) {}

    /** The seals the player has learned (their wow-data IDs). */
    listSeals(): number[] {
        return SEALS.filter((id) => this.spells.resolve(id) !== undefined);
    }

    /** The learned seals of the list, and the ones the player added (by their IDs). */
    private listAllSeals(): number[] {
        return [...this.listSeals(), ...this.addedSpells.listAdded("seal")];
    }

    /** A seal cast is the one to glow next time (kept per character). */
    @OnEvent("player.spell-cast")
    noteCast(cast: PlayerSpellCast): void {
        if (cast.spellId === undefined) return;
        const id = this.spells.resolveOrSame(cast.spellId);
        const castName = this.spells.getSpellName(id);
        // A higher rank than the list's ID by its name
        const listId = this.listAllSeals().find(
            (sealId) => (this.spells.resolve(sealId) ?? sealId) === id || this.spells.getSpellName(sealId) === castName,
        );
        const lastBuffs = this.settings.get("lastBuffs");
        if (listId !== undefined && lastBuffs[LAST_SEAL_KEY] !== listId) {
            this.settings.change("lastBuffs", { ...lastBuffs, [LAST_SEAL_KEY]: listId });
        }
    }

    /**
     * No seal up: one seal on the bars and switched on, the one the player last used if it can be. Only in a fight by
     * default: that is the When of the seals' look.
     */
    findMissingSeal(): number[] {
        if (!this.settings.get("showSeals")) return [];
        const enabledSpells = this.settings.get("enabledSpells");
        const onBars: number[] = [];
        for (const listId of this.listAllSeals()) {
            const id = this.spells.resolve(listId) ?? listId;
            // Any seal counts for every other (one category)
            if (this.buffState.hasAura(id, SEAL_LEAD)) return [];
            if (enabledSpells[string.format("%d", listId)] !== false && this.actionBars.isOnBars(id)) onBars.push(listId);
        }
        const picked = this.pickSeal(onBars);
        return picked !== undefined ? [this.spells.resolve(picked) ?? picked] : [];
    }

    /** Of the seals that could glow (list IDs): the one cast last, else the main talent tree's, else the first. */
    private pickSeal(onBars: number[]): number | undefined {
        const last = this.settings.get("lastBuffs")[LAST_SEAL_KEY];
        if (last !== undefined && onBars.includes(last)) return last;
        const tree = this.player.findMainTalentTree();
        for (const id of tree !== undefined ? (TALENT_SEALS[tree] ?? []) : []) if (onBars.includes(id)) return id;
        return onBars[0];
    }
}
