// What the reminder services answer with.
import type { WeaponBuff } from "./weapon/weapon-buff.interface";

export interface BuffCheck {
    isWanted: boolean;
}

export interface MissingBuffs {
    /** The missing buffs on an action button that can be cast now: they glow (one per category). */
    glow: number[];
    /** Missing buffs on no button, one per category: named in a message. */
    notOnBars: number[];
}

export interface PartySuggestion {
    /** The spell to cast: the single buff or its group version. */
    spellId: number;
    /** Names of the members who miss it (never the player's). */
    names: string[];
    /** The buff it gives (the single buff's ID, as the buff reminder knows it). */
    buffId: number;
    /** A group version that buffs the player too, who misses the buff: the player's own reminder of it gives way. */
    isForPlayer: boolean;
}

export interface WeaponCheck {
    spellId: number | undefined;
    /** Seconds left; 0 = missing. */
    remain: number;
    /** Remind now (missing, wrong, or about to run out). */
    isNeeded: boolean;
}

export interface PickedWeaponBuff {
    entry: WeaponBuff;
    /** The highest learned rank. */
    spellId: number;
}
