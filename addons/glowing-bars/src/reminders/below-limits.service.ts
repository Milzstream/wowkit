// How few of a reagent or an item is running low: the limit of its own row in the table, else that of its type's row.
import type { AddonSettingsService, ReminderType } from "../settings/settings.interface";

/** The types with a limit, and the setting that holds the limit of the type. */
const TYPE_LIMITS = { reagent: "reagentBelow", stock: "stockBelow" } as const;

export class BelowLimitsService {
    constructor(private readonly settings: AddonSettingsService) {}

    /** Does this type have a limit? */
    hasLimit(reminderType: ReminderType): reminderType is keyof typeof TYPE_LIMITS {
        return reminderType === "reagent" || reminderType === "stock";
    }

    /** The limit of a type; with `entry`, that of a row of it ("2512"). */
    getLimit(reminderType: keyof typeof TYPE_LIMITS, entry?: string): number {
        const own = entry !== undefined ? this.settings.get("belowLimits")[`${reminderType}:${entry}`] : undefined;
        return own ?? this.settings.get(TYPE_LIMITS[reminderType]);
    }

    /** Sets the limit of a type, or of a row of it; a row at its type's limit keeps none of its own. */
    setLimit(reminderType: keyof typeof TYPE_LIMITS, entry: string | undefined, limit: number): void {
        if (entry === undefined) return this.settings.change(TYPE_LIMITS[reminderType], limit);
        const belowLimits = { ...this.settings.get("belowLimits") };
        belowLimits[`${reminderType}:${entry}`] = limit === this.getLimit(reminderType) ? undefined : limit;
        this.settings.change("belowLimits", belowLimits);
    }
}
