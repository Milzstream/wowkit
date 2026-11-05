// The rule of the old ranks: a spell on the action bars at a lower rank than the highest one the player has learned. A macro
// casts the highest rank, or the one it names on purpose, so a spell in a macro never counts. Reading every spell on the bars
// is the costliest part of a tick and its answer changes only with the bars or the spells, so it is kept until then.
import { OnEvent } from "@wowkit/core";
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
    /** The answer of the last look, before the player's switches; undefined when it has to be looked for again. */
    private found: OutdatedRank[] | undefined;

    constructor(
        private readonly actionBars: ActionBarsService,
        private readonly spells: SpellsService,
        private readonly settings: AddonSettingsService,
    ) {}

    /** The bars or the spells changed: the next look reads them again. */
    @OnEvent("bars.mapped", "spells.refreshed", "spells.invalidated", "spellbook.indexed")
    forgetFound(): void {
        this.found = undefined;
    }

    /** Every spell on the bars at a lower rank than the highest learned one, sorted by name. */
    findOutdatedRanks(): OutdatedRank[] {
        this.found ??= this.readOutdatedRanks();
        // The spells the player switched off
        const enabledRanks = this.settings.get("enabledRanks");
        return this.found.filter((rank) => enabledRanks[rank.name] !== false);
    }

    private readOutdatedRanks(): OutdatedRank[] {
        const outdated: OutdatedRank[] = [];
        for (const [name, entry] of this.findBestOnBars()) {
            const best = this.spells.getHighestRank(entry.id);
            if (best !== undefined && best > entry.rank) outdated.push({ id: entry.id, name, onBar: entry.rank, best });
        }
        outdated.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        return outdated;
    }

    /** The highest rank of each name that is on the bars, outside macros. */
    private findBestOnBars(): LuaMap<string, { id: number; rank: number }> {
        const byName = new LuaMap<string, { id: number; rank: number }>();
        for (const id of this.actionBars.listSpellIdsOnBars()) {
            const name = this.spells.getSpellName(id);
            const rank = name !== undefined && name !== "" ? this.spells.getSpellRank(id) : undefined;
            if (name === undefined || rank === undefined || this.actionBars.isInMacro(name)) continue;
            if (rank > (byName.get(name)?.rank ?? -1)) byName.set(name, { id, rank });
        }
        return byName;
    }
}
