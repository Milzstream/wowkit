// The reminders of a tick, kept or left out one by one, each by its type and spell (an item of the low stock by its key).
// The When of a look and its glow time both filter them so: what is left out shows nothing, glow, message and sound alike.
import type { ReminderType } from "../settings/settings.interface";
import type { Reminders } from "./tick.interface";

/** The items `isKept` keeps. Most lists are empty at most ticks, and an empty one needs no new list. */
function filterList<T>(list: T[], isKept: (this: void, item: T) => boolean): T[] {
    return list.length === 0 ? list : list.filter((item) => isKept(item));
}

/** The reminders `isShown` keeps. */
export function filterReminders(reminders: Reminders, isShown: (this: void, reminderType: ReminderType, id: number) => boolean): Reminders {
    const pickShown = (reminderType: ReminderType, ids: number[]) =>
        ids.length === 0 ? ids : ids.filter((id) => isShown(reminderType, id));
    const weapon = reminders.weaponSpell;
    return {
        isInTown: reminders.isInTown,
        buffsToCast: pickShown("missingBuff", reminders.buffsToCast),
        buffsNotOnBars: pickShown("missingBuff", reminders.buffsNotOnBars),
        partySuggestions: filterList(reminders.partySuggestions, (suggestion) => isShown("missingBuff", suggestion.spellId)),
        weaponSpell: weapon !== undefined && isShown("weaponBuff", weapon) ? weapon : undefined,
        addedWeaponSpells: pickShown("weaponBuff", reminders.addedWeaponSpells),
        seals: pickShown("missingSeal", reminders.seals),
        trackings: pickShown("missingTracking", reminders.trackings),
        outdatedRanks: filterList(reminders.outdatedRanks, (rank) => isShown("oldRank", rank.id)),
        lowStock: filterList(reminders.lowStock, (stock) => isShown("lowStock", stock.key)),
        reagentSpells: pickShown("lowReagent", reminders.reagentSpells),
        lowReagents: filterList(reminders.lowReagents, (stock) => isShown("lowReagent", stock.spellId)),
        readyCooldowns: pickShown("readyCooldown", reminders.readyCooldowns),
        procs: pickShown("proc", reminders.procs),
    };
}
