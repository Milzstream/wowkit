// Gathering: a miner or a herbalist wants Find Minerals or Find Herbs on. Only one tracking can be on at a time, so any
// counts (the "missingTracking" category of the buff memory): a hunter tracking beasts is not told to find minerals. When none is
// on, every gathering tracking the player has learned glows, the ones the player added by their ID too.
import type { ActionBarsService, SpellsService } from "@wowkit/wow";
import { Tracking } from "@wowkit/wow-data";
import type { BuffStateService } from "../character/buff-state.service";
import type { AddedSpellsService } from "../glows/added-spells.service";
import type { AddonSettingsService } from "../settings/settings.interface";

/** The trackings of the gathering professions, in the order the table lists them (their wow-data IDs). */
export const GATHERING_TRACKINGS = [Tracking.FindMinerals, Tracking.FindHerbs];

export class TrackingReminderService {
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
        if (!this.settings.get("isMissingTrackingEnabled")) return [];
        const enabledSpells = this.settings.get("enabledSpells");
        const onBars: number[] = [];
        for (const listId of [...this.listTrackings(), ...this.addedSpells.listAdded("missingTracking")]) {
            const id = this.spells.resolve(listId) ?? listId;
            // Any tracking counts for every other (one category)
            if (this.buffState.hasAura(id)) return [];
            if (enabledSpells[string.format("%d", listId)] !== false && this.actionBars.isOnBars(id)) onBars.push(id);
        }
        return onBars;
    }
}
