import type { OutdatedRank } from "../reminders/outdated-ranks.service";
import type { PartySuggestion, LowStock } from "../reminders/reminders.interface";

/** Everything the player should be reminded of right now: what stage 1 of a tick finds. */
export interface Reminders {
    /** Buffs to cast now that sit on an action button: their buttons glow (the player's, then the party's). */
    buffsToCast: number[];
    /** The weapon buff that needs attention: its button glows. */
    weaponSpell?: number;
    /** Weapon buffs the player added, when the main-hand weapon has no temporary enchant: their buttons glow. */
    customWeaponSpells: number[];
    /** A paladin in a fight with no seal up: the seal to put on. */
    seals: number[];
    /** A miner or a herbalist with no tracking on: the gathering trackings to put on. */
    trackings: number[];
    /** Missing buffs the player has learned but put on no action bar. */
    buffsNotOnBars: number[];
    /** Party members missing one of the player's buffs. */
    partySuggestions: PartySuggestion[];
    /** Spells on the bars at a lower rank than the highest learned one. */
    outdatedRanks: OutdatedRank[];
    /** The items the player watches that run low: they glow if on a button, and say so anyway. */
    lowStock: LowStock[];
    /** Group buffs on a button whose reagent runs low: their buttons glow quietly. */
    reagentSpells: number[];
    /** In a town or an inn: only there a reminder whose When is "message in town" says so, and repeats. */
    isInTown?: boolean;
    /** Important cooldowns that are ready and on a button: their buttons glow. */
    readyCooldowns: number[];
    /** Spells the game says are usable now (and ready): their buttons glow. */
    procs: number[];
}
