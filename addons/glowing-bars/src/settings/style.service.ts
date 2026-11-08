// The look of a reminder: the default of its type, what the player changed for the type, the spell's own default (a few have
// one), and what the player changed for the spell, in that order of weight. A spell's look belongs to one type of it: a buff that also has ranks keeps the quiet yellow
// of its old rank when the player colors the buff.
import type { Rgb, SpellsService } from "@wowkit/wow";
import { SPELL_STYLE_DEFAULTS, STYLE_DEFAULTS } from "./settings.constants";
import type { AddonSettingsService, MessageTextChoice, ReminderType, Style, StyleOverride } from "./settings.interface";

/** The parts of a look. */
const PARTS: (keyof Style)[] = [
    "color",
    "glowPercent",
    "isMessageOn",
    "sound",
    "repeat",
    "when",
    "glowTime",
    "animation",
    "messageTextChoice",
    "messageText",
    "messageColor",
    "messageShowFor",
];

export class StyleService {
    /** Is this a spell whose look goes by its ID, not its name (see useOwnLooks)? */
    private hasOwnLook: (this: void, spellId: number) => boolean = () => false;
    /** The spell of the table's row of a weapon buff, for one of its ranks (see useWeaponBuffLooks). */
    private findWeaponBuffRow: (this: void, spellId: number) => number = (spellId) => spellId;

    constructor(
        private readonly spells: SpellsService,
        private readonly settings: AddonSettingsService,
    ) {}

    /** Spells that share a name but are different things (foods, drinks) each keep a look of their own. */
    useOwnLooks(hasOwnLook: (this: void, spellId: number) => boolean): void {
        this.hasOwnLook = hasOwnLook;
    }

    /** The ranks of a poison or a stone each have a name of their own (Instant Poison II): their look is the one of the buff's row. */
    useWeaponBuffLooks(findWeaponBuffRow: (this: void, spellId: number) => number): void {
        this.findWeaponBuffRow = findWeaponBuffRow;
    }

    /** The look of a type of reminder, or of one spell of it: the spell's own, else the type's, else the default. */
    getStyle(reminderType: ReminderType, spellId?: number): Style {
        const layers: StyleOverride[] = [
            spellId !== undefined ? this.getOverride(reminderType, spellId) : {},
            this.getSpellDefault(reminderType, spellId),
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
            messageTextChoice: this.pickPart(layers, "messageTextChoice"),
            messageText: this.pickPart(layers, "messageText"),
            messageColor: this.pickPart(layers, "messageColor"),
            messageShowFor: this.pickPart(layers, "messageShowFor"),
        };
    }

    /** What the message of a type or a spell says: what the player chose; else the item and its count, or the type alone. */
    getMessageTextChoice(reminderType: ReminderType, spellId: number | undefined): MessageTextChoice {
        const choice = this.getStyle(reminderType, spellId).messageTextChoice;
        return choice ?? (reminderType === "lowStock" || reminderType === "lowReagent" ? "typeAndName" : "typeOnly");
    }

    /** The spell's own default look, where it has one; the same for every rank (by name). */
    private getSpellDefault(reminderType: ReminderType, spellId: number | undefined): StyleOverride {
        const defaults = SPELL_STYLE_DEFAULTS[reminderType];
        if (defaults === undefined || spellId === undefined) return {};
        for (const [id, look] of pairs(defaults)) {
            const name = this.spells.getSpellName(spellId);
            if (id === spellId || (name !== undefined && this.spells.getSpellName(id as number) === name)) return look ?? {};
        }
        return {};
    }

    /** The look a spell has without what the player changed for it: its own default, else its type's. */
    private getInheritedStyle(reminderType: ReminderType, spellId: number): Style {
        const style = this.getStyle(reminderType);
        return { ...style, ...this.getSpellDefault(reminderType, spellId) };
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
        const inherited = spellId === undefined ? STYLE_DEFAULTS[reminderType] : this.getInheritedStyle(reminderType, spellId);
        const merged: StyleOverride = { ...this.getOverride(reminderType, spellId) };
        for (const part of PARTS) {
            const value = change[part];
            if (value === undefined) continue;
            if (value === "" || this.isSameValue(value, inherited[part])) delete merged[part];
            else (merged as Record<string, unknown>)[part] = value;
        }
        this.saveOverride(reminderType, spellId, merged);
    }

    /** A part follows what it inherits again (a message that takes the color of its glow). */
    resetPart(reminderType: ReminderType, spellId: number | undefined, part: keyof Style): void {
        const merged: StyleOverride = { ...this.getOverride(reminderType, spellId) };
        delete merged[part];
        this.saveOverride(reminderType, spellId, merged);
    }

    private saveOverride(reminderType: ReminderType, spellId: number | undefined, merged: StyleOverride): void {
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
        const id = reminderType === "weaponBuff" ? this.findWeaponBuffRow(spellId) : spellId;
        return `${reminderType}:${this.hasOwnLook(id) ? string.format("%d", id) : this.getSpellKey(id)}`;
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
        return STYLE_DEFAULTS.missingBuff[part];
    }
}
