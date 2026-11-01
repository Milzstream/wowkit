export interface Reagent {
    itemId: number;
    name: string;
    /** The class whose group buffs use it ("PRIEST"). */
    classToken: string;
    /** The spells that use it. */
    spells: number[];
}

/** A reagent and how many of it the player has. */
/** A reagent running low. */
export interface LowReagent {
    /** The spell of the player that uses it; the look of its row goes by this. */
    spellId: number;
    name: string;
    count: number;
}

export interface ReagentStock extends LowReagent {
    reagent: Reagent;
}
