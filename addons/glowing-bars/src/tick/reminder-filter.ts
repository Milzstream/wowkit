// The reminders of a tick, kept or left out one by one, each by its type and spell (an item of the low stock by its key).
// The When of a look and its glow time both filter them so: what is left out shows nothing, glow, message and sound alike.
// The kept ones go into lists that are used again at every tick, so a tick makes no new ones: whoever keeps a list past
// the tick copies it.
import type { ReminderType } from "../settings/settings.interface";
import type { Reminders } from "./tick.interface";

type IsShown = (this: void, reminderType: ReminderType, id: number) => boolean;

/** Reminders with every list empty: what the filter fills, tick after tick. */
export function createEmptyReminders(): Reminders {
    return {
        buffsToCast: [],
        weaponSpell: undefined,
        addedWeaponSpells: [],
        coveredWeaponButtons: [],
        seals: [],
        trackings: [],
        buffsNotOnBars: [],
        partySuggestions: [],
        outdatedRanks: [],
        readyCooldowns: [],
        reagentSpells: [],
        lowReagents: [],
        lowStock: [],
        procs: [],
    };
}

/** `target` becomes the items of `source` that are shown, found by the ID `getId` gives. */
function copyShown<T>(
    target: T[],
    source: T[],
    reminderType: ReminderType,
    getId: (this: void, item: T) => number,
    isShown: IsShown,
): void {
    let count = 0;
    for (const item of source) {
        if (isShown(reminderType, getId(item))) {
            count++;
            target[count - 1] = item;
        }
    }
    for (let index = target.length; index > count; index--) target.pop();
}

const getOwnId = (id: number) => id;
const getSuggestionId = (suggestion: { spellId: number }) => suggestion.spellId;
const getRankId = (rank: { id: number }) => rank.id;
const getStockKey = (stock: { key: number }) => stock.key;

/** `target` becomes the reminders of `reminders` that `isShown` keeps. */
export function filterReminders(target: Reminders, reminders: Reminders, isShown: IsShown): Reminders {
    target.isInTown = reminders.isInTown;
    copyShown(target.buffsToCast, reminders.buffsToCast, "missingBuff", getOwnId, isShown);
    copyShown(target.buffsNotOnBars, reminders.buffsNotOnBars, "missingBuff", getOwnId, isShown);
    copyShown(target.partySuggestions, reminders.partySuggestions, "missingBuff", getSuggestionId, isShown);
    const weapon = reminders.weaponSpell;
    target.weaponSpell = weapon !== undefined && isShown("weaponBuff", weapon) ? weapon : undefined;
    target.weaponHandSlot = reminders.weaponHandSlot;
    target.coveredWeaponButtons = reminders.coveredWeaponButtons;
    copyShown(target.addedWeaponSpells, reminders.addedWeaponSpells, "weaponBuff", getOwnId, isShown);
    copyShown(target.seals, reminders.seals, "missingSeal", getOwnId, isShown);
    copyShown(target.trackings, reminders.trackings, "missingTracking", getOwnId, isShown);
    copyShown(target.outdatedRanks, reminders.outdatedRanks, "oldRank", getRankId, isShown);
    copyShown(target.lowStock, reminders.lowStock, "lowStock", getStockKey, isShown);
    copyShown(target.reagentSpells, reminders.reagentSpells, "lowReagent", getOwnId, isShown);
    copyShown(target.lowReagents, reminders.lowReagents, "lowReagent", getSuggestionId, isShown);
    copyShown(target.readyCooldowns, reminders.readyCooldowns, "readyCooldown", getOwnId, isShown);
    copyShown(target.procs, reminders.procs, "proc", getOwnId, isShown);
    return target;
}
