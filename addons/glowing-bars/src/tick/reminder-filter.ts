// The reminders of a tick, kept or left out one by one, each by its type and spell (an item of the low stock by its key).
// The When of a look and its glow time both filter them so: what is left out shows nothing, glow, message and sound alike.
import type { ReminderType } from "../settings/settings.interface";
import type { Reminders } from "./tick.interface";

/** The reminders `isShown` keeps. */
export function filterReminders(reminders: Reminders, isShown: (this: void, reminderType: ReminderType, id: number) => boolean): Reminders {
    const pickShown = (reminderType: ReminderType, ids: number[]) => ids.filter((id) => isShown(reminderType, id));
    const weapon = reminders.weaponSpell;
    return {
        ...reminders,
        buffsToCast: pickShown("buff", reminders.buffsToCast),
        buffsNotOnBars: pickShown("buff", reminders.buffsNotOnBars),
        partySuggestions: reminders.partySuggestions.filter((suggestion) => isShown("buff", suggestion.spellId)),
        weaponSpell: weapon !== undefined && isShown("weapon", weapon) ? weapon : undefined,
        addedWeaponSpells: pickShown("weapon", reminders.addedWeaponSpells),
        seals: pickShown("seal", reminders.seals),
        trackings: pickShown("tracking", reminders.trackings),
        outdatedRanks: reminders.outdatedRanks.filter((rank) => isShown("rank", rank.id)),
        lowStock: reminders.lowStock.filter((stock) => isShown("stock", stock.key)),
        reagentSpells: pickShown("reagent", reminders.reagentSpells),
        readyCooldowns: pickShown("cooldown", reminders.readyCooldowns),
        procs: pickShown("proc", reminders.procs),
    };
}
