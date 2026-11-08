// What the game says about a spell beyond its name: cast time, range, whether it helps or harms, its cost, whether it
// can be pressed now and whether the target is in its range.
import { attempt, attemptMulti } from "./utils/protected-call.utils";
import { getReadable, isReadable } from "./utils/secret-value.utils";

/** What a spell costs: the kind of power (0 mana, 1 rage, 3 energy; a negative kind is health) and how much. */
export interface SpellCost {
    powerType: number;
    amount: number;
}

/** Can the spell be pressed now? Undefined parts are answers the client hid. */
export interface SpellUsability {
    isUsable: boolean | undefined;
    isOutOfPower: boolean | undefined;
}

export class SpellDetailsService {
    /** Cast time in milliseconds; 0 for an instant spell or when unknown. */
    getCastTimeMs(spellId: number): number {
        const info = attempt(C_Spell.GetSpellInfo, spellId);
        const castTime = info ? getReadable(info.castTime) : undefined;
        return type(castTime) === "number" ? castTime! : 0;
    }

    /** The farthest the spell reaches, in yards; undefined when unknown. 0 is a melee spell. */
    getMaxRange(spellId: number): number | undefined {
        const info = attempt(C_Spell.GetSpellInfo, spellId);
        const range = info ? getReadable(info.maxRange) : undefined;
        return type(range) === "number" && range === range ? range : undefined;
    }

    /** The client marks the spell as helpful (cast on friends). */
    isHelpful(spellId: number): boolean {
        return attempt(C_Spell.IsSpellHelpful, spellId) === true;
    }

    /** The client marks the spell as harmful (cast on enemies). */
    isHarmful(spellId: number): boolean {
        return attempt(C_Spell.IsSpellHarmful, spellId) === true;
    }

    /** An auto-repeat attack that is running now (Auto Shot, a wand's Shoot). */
    isAutoRepeating(spellId: number): boolean {
        return attempt(C_Spell.IsAutoRepeatSpell, spellId) === true;
    }

    readUsability(spellId: number): SpellUsability {
        const [didSucceed, isUsable, isOutOfPower] = attemptMulti(() => C_Spell.IsSpellUsable(spellId));
        if (!didSucceed) return { isUsable: undefined, isOutOfPower: undefined };
        return { isUsable: getReadable(isUsable), isOutOfPower: getReadable(isOutOfPower) };
    }

    /** Does the game say the spell has no cast time now? Not when it hides the answer. */
    isInstantNow(spellId: number): boolean {
        const info = attempt(C_Spell.GetSpellInfo, spellId);
        return info !== undefined && getReadable(info.castTime) === 0;
    }

    /** Does the game say the spell costs nothing now? Not when it hides the answer. */
    isFreeNow(spellId: number): boolean {
        const costs = this.listCosts(spellId);
        return costs.length > 0 && costs.every((cost) => cost.amount === 0);
    }

    /** What the spell costs, the readable parts only. */
    listCosts(spellId: number): SpellCost[] {
        const costs = attempt(C_Spell.GetSpellPowerCost, spellId);
        if (costs === undefined || type(costs) !== "table") return [];
        const out: SpellCost[] = [];
        for (const cost of costs) {
            const amount = tonumber(getReadable(cost.cost));
            const powerType = tonumber(getReadable(cost.type)) ?? 0;
            if (amount !== undefined) out.push({ powerType, amount });
        }
        return out;
    }

    /** The spell's description text; undefined until the client has loaded it. */
    getDescription(spellId: number): string | undefined {
        const text = getReadable(attempt(C_Spell.GetSpellDescription, spellId));
        return type(text) === "string" && text !== "" ? text : undefined;
    }

    /** Is the unit within the spell's range? Undefined when the client does not say. */
    isInRange(spellId: number, unit: UnitToken): boolean | undefined {
        return this.readFlag(attempt(C_Spell.IsSpellInRange, spellId, unit));
    }

    /** Is the target within the range of the action in this bar slot? Undefined when the client does not say. */
    isActionInRange(slot: number): boolean | undefined {
        return this.readFlag(attempt(C_ActionBar.IsActionInRange, slot));
    }

    /** Is this error text the client's "you must be behind your target"? */
    isNotBehindError(message: string): boolean {
        return (
            (SPELL_FAILED_NOT_BEHIND !== undefined && message === SPELL_FAILED_NOT_BEHIND) ||
            string.find(string.lower(message), "behind", 1, true)[0] !== undefined
        );
    }

    private readFlag(value: unknown): boolean | undefined {
        if (!isReadable(value)) return undefined;
        if (value === true || value === 1) return true;
        if (value === false || value === 0) return false;
        return undefined;
    }
}
