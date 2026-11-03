// The look of a reminder: the default of its type, what the player changed for the type, and what the player changed for the
// spell, in that order of weight. A spell's look belongs to one type of it: a buff that also has ranks keeps the quiet yellow
// of its old rank when the player colors the buff.
import type { Rgb, SpellsService } from "@wowkit/wow";
import { STYLE_DEFAULTS } from "./settings.constants";
import type { AddonSettingsService, ReminderType, Style, StyleOverride } from "./settings.interface";

/** The parts of a look. */
const PARTS: (keyof Style)[] = ["color", "glowPercent", "isMessageOn", "sound", "repeat", "when", "glowTime", "animation"];

export class StyleService {
    /** Is this a spell whose look goes by its ID, not its name (see useOwnLooks)? */
    private hasOwnLook: (this: void, spellId: number) => boolean = () => false;

    constructor(
        private readonly spells: SpellsService,
        private readonly settings: AddonSettingsService,
    ) {}

    /** Spells that share a name but are different things (foods, drinks) each keep a look of their own. */
    useOwnLooks(hasOwnLook: (this: void, spellId: number) => boolean): void {
        this.hasOwnLook = hasOwnLook;
    }

    /** The look of a type of reminder, or of one spell of it: the spell's own, else the type's, else the default. */
    getStyle(reminderType: ReminderType, spellId?: number): Style {
        const layers: StyleOverride[] = [
            spellId !== undefined ? this.getOverride(reminderType, spellId) : {},
            this.getOverride(reminderType),
            STYLE_DEFAULTS[reminderType],
        ];
        return {
            color: this.pickPart(layers, "color"),
            glowPercent: this.pickPart(layers, "glowPercent"),
            isMessageOn: this.pickPart(layers, "isMessageOn"),
            sound: this.pickPart(layers, "sound"),
            repeat: this.pickPart(layers, "repeat"),
            when: this.pickPart(layers, "when"),
            glowTime: this.pickPart(layers, "glowTime"),
            animation: this.pickPart(layers, "animation"),
        };
    }

    /** What the player changed for a type or a spell (nothing inherited). */
    getOverride(reminderType: ReminderType, spellId?: number): StyleOverride {
        if (spellId === undefined) return this.settings.get("styles")[reminderType] ?? {};
        return this.settings.get("spellStyles")[this.getStyleKey(reminderType, spellId)] ?? {};
    }

    /** Did the player change anything of the look of this type or spell? */
    isOverridden(reminderType: ReminderType, spellId?: number): boolean {
        const override = this.getOverride(reminderType, spellId);
        return PARTS.some((part) => override[part] !== undefined);
    }

    /**
     * Changes part of the look of a type (no spell) or of one spell. A part set to what it would inherit anyway is not
     * kept: it follows the type (or the default) again.
     */
    changeStyle(reminderType: ReminderType, spellId: number | undefined, change: StyleOverride): void {
        const inherited = spellId === undefined ? STYLE_DEFAULTS[reminderType] : this.getStyle(reminderType);
        const merged: StyleOverride = { ...this.getOverride(reminderType, spellId) };
        for (const part of PARTS) {
            const value = change[part];
            if (value === undefined) continue;
            if (this.isSameValue(value, inherited[part])) delete merged[part];
            else (merged as Record<string, unknown>)[part] = value;
        }
        const isEmpty = !PARTS.some((part) => merged[part] !== undefined);
        if (spellId === undefined) {
            const styles = this.copyWithout(this.settings.get("styles"), reminderType);
            if (!isEmpty) styles[reminderType] = merged;
            this.settings.change("styles", styles);
        } else {
            const key = this.getStyleKey(reminderType, spellId);
            const spellStyles = this.copyWithout(this.settings.get("spellStyles"), key);
            if (!isEmpty) spellStyles[key] = merged;
            this.settings.change("spellStyles", spellStyles);
        }
    }

    /** All the player's changes for the type are forgotten: its spells follow the default again. */
    resetType(reminderType: ReminderType): void {
        this.settings.change("styles", this.copyWithout(this.settings.get("styles"), reminderType));
    }

    /** All the player's changes for the spell in this type are forgotten: it follows the type again. */
    resetSpell(reminderType: ReminderType, spellId: number): void {
        this.settings.change("spellStyles", this.copyWithout(this.settings.get("spellStyles"), this.getStyleKey(reminderType, spellId)));
    }

    /** A spell is told apart by its name, so a new rank keeps what the player chose. */
    getSpellKey(spellId: number): string {
        return this.spells.getSpellName(spellId) ?? string.format("%d", spellId);
    }

    /** The text in a color (|cffRRGGBB ... |r). */
    applyTextColor(color: Rgb, text: string): string {
        const [r, g, b] = color;
        return string.format("|cff%02x%02x%02x%s|r", math.floor(r * 255 + 0.5), math.floor(g * 255 + 0.5), math.floor(b * 255 + 0.5), text);
    }

    /** The key of a spell's look: its type and its name ("rank:Smite"). */
    private getStyleKey(reminderType: ReminderType, spellId: number): string {
        return `${reminderType}:${this.hasOwnLook(spellId) ? string.format("%d", spellId) : this.getSpellKey(spellId)}`;
    }

    private isSameValue(a: unknown, b: unknown): boolean {
        if (type(a) === "table" && type(b) === "table") return (a as number[]).join(",") === (b as number[]).join(",");
        return a === b;
    }

    /** The table without one of its entries (an entry set to undefined in a copy is still the old one). */
    private copyWithout<V>(entries: { [key: string]: V | undefined }, key: string): { [key: string]: V | undefined } {
        const copy: { [key: string]: V | undefined } = {};
        for (const [name, value] of pairs(entries)) if (name !== key) copy[name as string] = value;
        return copy;
    }

    /** The first layer that sets the part; the last layer is the default, which sets every part. */
    private pickPart<K extends keyof Style>(layers: StyleOverride[], part: K): Style[K] {
        for (const layer of layers) {
            const value = layer[part];
            if (value !== undefined) return value as Style[K];
        }
        return STYLE_DEFAULTS.buff[part];
    }
}
