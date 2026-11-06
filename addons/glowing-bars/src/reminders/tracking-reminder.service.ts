// Gathering: a miner or a herbalist wants Find Minerals or Find Herbs on. Only one tracking can be on at a time, so any
// counts (the "missingTracking" category of the buff memory): a hunter tracking beasts is not told to find minerals. When none is
// on, every gathering tracking the player has learned glows, the ones the player added by their ID too.
import { OnEvent } from "@wowkit/core";
import type { ActionBarsService, SpellsService } from "@wowkit/wow";
import { Tracking } from "@wowkit/wow-data";
import type { BuffStateService } from "../character/buff-state.service";
import type { AddedSpellsService } from "../glows/added-spells.service";
import type { AddonSettingsService } from "../settings/settings.interface";

/** The trackings of the gathering professions, in the order the table lists them (their wow-data IDs). */
// The dwarves' Find Treasure too: like the gathering trackings, it is the one a player keeps on
export const GATHERING_TRACKINGS = [Tracking.FindMinerals, Tracking.FindHerbs, Tracking.FindTreasure];

/** No tracking to remind of: one empty list for every tick (nobody changes it). */
const NO_TRACKINGS: number[] = [];

export class TrackingReminderService {
    /** The trackings of the list and the added ones, kept until the settings or the spells change. */
    private allTrackings: number[] | undefined;

    constructor(
        private readonly spells: SpellsService,
        private readonly actionBars: ActionBarsService,
        private readonly buffState: BuffStateService,
        private readonly settings: AddonSettingsService,
        private readonly addedSpells: AddedSpellsService,
    ) {}

    /** The gathering trackings the player has learned (their wow-data IDs). */
    listTrackings(): number[] {
        return GATHERING_TRACKINGS.filter((id) => this.spells.resolve(id) !== undefined);
    }

    /** With no tracking on: the gathering trackings to put on, when they are on a button and switched on. */
    findMissingTrackings(): number[] {
        if (!this.settings.get("isMissingTrackingEnabled")) return NO_TRACKINGS;
        this.allTrackings ??= [...this.listTrackings(), ...this.addedSpells.listAdded("missingTracking")];
        // A character with no tracking at all (no gathering profession, none added): nothing to look at
        if (this.allTrackings.length === 0) return NO_TRACKINGS;
        const enabledSpells = this.settings.get("enabledSpells");
        const onBars: number[] = [];
        for (const listId of this.allTrackings) {
            const id = this.spells.resolve(listId) ?? listId;
            // Any tracking counts for every other (one category)
            if (this.buffState.hasAura(id)) return NO_TRACKINGS;
            if (enabledSpells[string.format("%d", listId)] !== false && this.actionBars.isOnBars(id)) onBars.push(id);
        }
        return onBars;
    }

    @OnEvent("setting.changed", "spells.refreshed", "spells.invalidated", "spellbook.indexed")
    forgetTrackings(): void {
        this.allTrackings = undefined;
    }
}
