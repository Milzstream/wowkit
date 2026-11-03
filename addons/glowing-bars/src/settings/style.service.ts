// The look of a reminder: the default of its kind, what the player changed for the kind, and what the player changed for the
// spell, in that order of weight. A spell's look belongs to one kind of it: a buff that also has ranks keeps the quiet yellow
// of its old rank when the player colors the buff.
import type { Rgb, SpellsService } from "@wowkit/wow";
import { STYLE_DEFAULTS } from "./settings.constants";
import type { AddonSettingsService, ColorKey, Style, StyleOverride } from "./settings.interface";

/** The parts of a look. */
const PARTS: (keyof Style)[] = ["color", "opacity", "isTextOn", "sound", "repeat", "when", "glowSeconds", "animation"];

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

    /** The look of a kind of reminder, or of one spell of it: the spell's own, else the kind's, else the default. */
    getStyle(kind: ColorKey, spellId?: number): Style {
        const layers: StyleOverride[] = [
            spellId !== undefined ? this.getOverride(kind, spellId) : {},
            this.getOverride(kind),
            STYLE_DEFAULTS[kind],
        ];
        return {
            color: this.pickPart(layers, "color"),
            opacity: this.pickPart(layers, "opacity"),
            isTextOn: this.pickPart(layers, "isTextOn"),
            sound: this.pickPart(layers, "sound"),
            repeat: this.pickPart(layers, "repeat"),
            when: this.pickPart(layers, "when"),
            glowSeconds: this.pickPart(layers, "glowSeconds"),
            animation: this.pickPart(layers, "animation"),
        };
    }

    /** What the player changed for a kind or a spell (nothing inherited). */
    getOverride(kind: ColorKey, spellId?: number): StyleOverride {
        if (spellId === undefined) return this.settings.get("styles")[kind] ?? {};
        return this.settings.get("spellStyles")[this.getStyleKey(kind, spellId)] ?? {};
    }

    /** Did the player change anything of the look of this kind or spell? */
    isOverridden(kind: ColorKey, spellId?: number): boolean {
        const override = this.getOverride(kind, spellId);
        return PARTS.some((part) => override[part] !== undefined);
    }

    /**
     * Changes part of the look of a kind (no spell) or of one spell. A part set to what it would inherit anyway is not
     * kept: it follows the kind (or the default) again.
     */
    changeStyle(kind: ColorKey, spellId: number | undefined, change: StyleOverride): void {
        const inherited = spellId === undefined ? STYLE_DEFAULTS[kind] : this.getStyle(kind);
        const merged: StyleOverride = { ...this.getOverride(kind, spellId) };
        for (const part of PARTS) {
            const value = change[part];
            if (value === undefined) continue;
            if (this.isSameValue(value, inherited[part])) delete merged[part];
            else (merged as Record<string, unknown>)[part] = value;
        }
        const isEmpty = !PARTS.some((part) => merged[part] !== undefined);
        if (spellId === undefined) {
            const styles = this.copyWithout(this.settings.get("styles"), kind);
            if (!isEmpty) styles[kind] = merged;
            this.settings.change("styles", styles);
        } else {
            const key = this.getStyleKey(kind, spellId);
            const spellStyles = this.copyWithout(this.settings.get("spellStyles"), key);
            if (!isEmpty) spellStyles[key] = merged;
            this.settings.change("spellStyles", spellStyles);
        }
    }

    /** All the player's changes for the kind are forgotten: its spells follow the default again. */
    resetKind(kind: ColorKey): void {
        this.settings.change("styles", this.copyWithout(this.settings.get("styles"), kind));
    }

    /** All the player's changes for the spell in this kind are forgotten: it follows the kind again. */
    resetSpell(kind: ColorKey, spellId: number): void {
        this.settings.change("spellStyles", this.copyWithout(this.settings.get("spellStyles"), this.getStyleKey(kind, spellId)));
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

    /** The key of a spell's look: its kind and its name ("rank:Smite"). */
    private getStyleKey(kind: ColorKey, spellId: number): string {
        return `${kind}:${this.hasOwnLook(spellId) ? string.format("%d", spellId) : this.getSpellKey(spellId)}`;
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
