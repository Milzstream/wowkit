// The items the player added to watch by their ID (arrows, candles, water): running low they glow on their button, and say
// so with a message and a sound, also while they are on no bar, anywhere.
import { type BagsService, getItemButtonKey } from "@wowkit/wow";
import type { AddedSpellsService } from "../glows/added-spells.service";
import type { AddonSettingsService } from "../settings/settings.interface";
import type { LowLimitsService } from "./low-limits.service";
import type { LowStock } from "./reminders.interface";

export class LowStockService {
    constructor(
        private readonly addedSpells: AddedSpellsService,
        private readonly bags: BagsService,
        private readonly limits: LowLimitsService,
        private readonly settings: AddonSettingsService,
    ) {}

    /** The items running low, that are switched on. */
    findLowStock(): LowStock[] {
        if (!this.settings.get("showStock")) return [];
        const low: LowStock[] = [];
        const enabledSpells = this.settings.get("enabledSpells");
        for (const itemId of this.addedSpells.listAdded("stock")) {
            const key = getItemButtonKey(itemId);
            if (enabledSpells[string.format("%d", key)] === false) continue;
            const count = this.bags.getItemCount(itemId);
            if (count <= this.limits.getLimit("stock", string.format("%d", itemId))) {
                low.push({ key, itemId, name: this.bags.getItemName(itemId) ?? string.format("%d", itemId), count });
            }
        }
        return low;
    }
}
