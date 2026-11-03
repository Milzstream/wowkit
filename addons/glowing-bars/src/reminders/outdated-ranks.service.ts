// The rule of the old ranks: a spell on the action bars at a lower rank than the highest one the player has learned.
import type { ActionBarsService, SpellsService } from "@wowkit/wow";
import type { AddonSettingsService } from "../settings/settings.interface";

export interface OutdatedRank {
    id: number;
    name: string;
    /** The rank on the bar. */
    onBar: number;
    /** The highest learned rank. */
    best: number;
}

export class OutdatedRanksService {
    constructor(
        private readonly actionBars: ActionBarsService,
        private readonly spells: SpellsService,
        private readonly settings: AddonSettingsService,
    ) {}

    /** Every spell on the bars at a lower rank than the highest learned one, sorted by name. */
    findOutdatedRanks(): OutdatedRank[] {
        // The highest rank of each name that is on the bars
        const byName = new LuaMap<string, { id: number; rank: number }>();
        for (const id of this.actionBars.listSpellIdsOnBars()) {
            const name = this.spells.getSpellName(id);
            const rank = name !== undefined && name !== "" ? this.spells.getSpellRank(id) : undefined;
            if (name !== undefined && rank !== undefined && rank > (byName.get(name)?.rank ?? -1)) byName.set(name, { id, rank });
        }
        const outdated: OutdatedRank[] = [];
        for (const [name, entry] of byName) {
            const best = this.spells.getHighestRank(entry.id);
            if (best !== undefined && best > entry.rank) outdated.push({ id: entry.id, name, onBar: entry.rank, best });
        }
        outdated.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        // The spells the player switched off
        const enabledRanks = this.settings.get("enabledRanks");
        return outdated.filter((rank) => enabledRanks[rank.name] !== false);
    }
}
