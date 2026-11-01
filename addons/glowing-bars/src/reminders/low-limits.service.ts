// How few of a reagent or an item is running low: the limit of its own row in the table, else that of its kind's row.
import type { AddonSettingsService, ColorKey } from "../settings/settings.interface";

/** The kinds with a limit, and the setting that holds the limit of the kind. */
const KIND_LIMITS = { reagent: "reagentLow", stock: "stockLow" } as const;

export class LowLimitsService {
    constructor(private readonly settings: AddonSettingsService) {}

    /** Does this kind have a limit? */
    hasLimit(kind: ColorKey): kind is keyof typeof KIND_LIMITS {
        return kind === "reagent" || kind === "stock";
    }

    /** The limit of a kind; with `entry`, that of a row of it ("2512"). */
    getLimit(kind: keyof typeof KIND_LIMITS, entry?: string): number {
        const own = entry !== undefined ? this.settings.get("lowAt")[`${kind}:${entry}`] : undefined;
        return own ?? this.settings.get(KIND_LIMITS[kind]);
    }

    /** Sets the limit of a kind, or of a row of it; a row at its kind's limit keeps none of its own. */
    setLimit(kind: keyof typeof KIND_LIMITS, entry: string | undefined, limit: number): void {
        if (entry === undefined) return this.settings.change(KIND_LIMITS[kind], limit);
        const lowAt = { ...this.settings.get("lowAt") };
        lowAt[`${kind}:${entry}`] = limit === this.getLimit(kind) ? undefined : limit;
        this.settings.change("lowAt", lowAt);
    }
}
