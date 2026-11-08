// The notice at the top of the screen: a short line for each reminder whose message the player switched on, in the color of
// its glow or the one the player gave it. What a line says is the player's to choose, for each type and spell: the type of
// reminder, the type and the spell or item, the spell or item, or their own words. A reminder with no button to glow (a buff
// on no bar, a party member) always names what it is about. A line comes once, as what it is about starts, and again only
// where the player chose it to repeat, together with the sound.

import { OnEvent } from "@wowkit/core";
import type { AddonLocale } from "../locale/locale.interface";
import type { TextKey } from "../locale/texts.constants";
import type { AddonSettingsService, ReminderType, Style } from "../settings/settings.interface";
import type { StyleService } from "../settings/style.service";
import { NOTICE_SECONDS, type ActionBarsService, type ClockService, type NoticeService, type Rgb, type SpellsService } from "@wowkit/wow";
import { findWords, type Words } from "./message-words";
import type { Reminders } from "./tick.interface";

/** A party message names this many members at most; past them, it counts them (a raid). */
const NAMES_MAX = 5;
/** After the bars changed they are mapped again; until then the old map would call every spell missing. */
const NOTICE_AFTER_BAR_CHANGE = 1.5;

interface Line extends Words {
    /** What it is about: it comes again only when one of these is new, or with its repeat. */
    parts: string[];
    color: Rgb;
    /** Seconds it stays; 0: as long as the button glows, so as long as the line is there. */
    showFor: number;
    /** The type it is a line of; none: it stands on its own (a party member, a buff on no bar). */
    reminderType?: ReminderType;
    /** Seconds between its repeats, the sound's (0: it comes once). */
    repeat: number;
}

/** The settings that change how the message on screen looks. */
const LOOK_SETTINGS = [
    "messageSize",
    "messageTop",
    "isMessageZoomInOn",
    "isMessageZoomOutOn",
    "isMessageFadePulseOn",
    "isMessageSizePulseOn",
    "isOneLinePerType",
    "messagePulseSpeed",
];

/** The sliders of how a message looks: dragged, the message does not zoom again at every step. */
const SLIDER_SETTINGS = ["messageSize", "messageTop", "messagePulseSpeed"];
const SAMPLE_SECONDS = 3;
/** Of the Zoom out: it is its going that is to be seen. */
const SAMPLE_SECONDS_SHORT = 1;

/** How long the message of a look stays. */
function findShowFor(style: Style): number {
    return style.messageShowFor ?? NOTICE_SECONDS;
}

/** The longer of two times a message stays; 0 is as long as the button glows, longer than any. */
function pickLonger(first: number, second: number): number {
    return first === 0 || second === 0 ? 0 : math.max(first, second);
}

export class NoticesService {
    /** The text showing now. */
    private lastText = "";
    /** How long the text showing now stays. */
    private lastSeconds = NOTICE_SECONDS;
    /** When each part of a line last came; a part that is over is forgotten, so it comes again when it is back. */
    private readonly shownAt = new LuaMap<string, number>();
    /** The parts of this tick's lines, to forget the others. */
    private readonly parts = new LuaSet<string>();
    /** The lines of this tick. */
    private readonly lines: Line[] = [];
    /** The weapon buffs and the old ranks of this tick, as spell IDs: lists used again. */
    private readonly weaponIds: number[] = [];
    private readonly rankIds: number[] = [];

    constructor(
        private readonly actionBars: ActionBarsService,
        private readonly clock: ClockService,
        private readonly notice: NoticeService,
        private readonly spells: SpellsService,
        private readonly locale: AddonLocale,
        private readonly styles: StyleService,
        private readonly settings: AddonSettingsService,
    ) {}

    /** Shows the lines that are due, with those that are still up: the notice takes one text. */
    showNoticeIfNew(reminders: Reminders): void {
        if (this.actionBars.getSecondsSinceBarsChanged() <= NOTICE_AFTER_BAR_CHANGE) return;
        const now = this.clock.getCurrentTime();
        const lines = this.listLines(reminders);
        this.forgetOver(lines);
        // Nothing to say, as at most ticks: nothing to build
        if (lines.length === 0) {
            if (this.lastText === "") return;
            this.lastText = "";
            this.notice.clearNotice();
            return;
        }
        const due = lines.filter((line) => this.isDue(line, now));
        const shown = lines.filter((line) => due.includes(line) || this.isStillUp(line, now));
        const text = this.buildNoticeText(shown);
        for (const line of due) for (const part of line.parts) this.shownAt.set(part, now);
        if (due.length === 0 && text === this.lastText) return;
        this.lastText = text;
        // What the message was about is over: it goes out at once, not when its time is up
        if (text === "") this.notice.clearNotice();
        else
            this.showText(
                text,
                due.length > 0,
                shown.reduce((longest, line) => pickLonger(longest, line.showFor), 1),
            );
    }

    /** A setting of how messages come changed: the one on screen takes it at once; with none, a sample shows what it does. */
    @OnEvent("setting.changed")
    applyMessageSetting(key: string): void {
        if (!LOOK_SETTINGS.includes(key)) return;
        const isNew = !SLIDER_SETTINGS.includes(key);
        if (this.lastText !== "") this.showText(this.lastText, isNew, this.lastSeconds);
        else this.showText(this.buildSample(key), isNew, key === "isMessageZoomOutOn" ? SAMPLE_SECONDS_SHORT : SAMPLE_SECONDS);
    }

    /** The sample: of the lines per type, two, side by side or not. */
    private buildSample(key: string): string {
        const sample = this.locale.getText("TEXT_MESSAGE_SAMPLE");
        if (key !== "isOneLinePerType") return sample;
        return `${sample}${this.settings.get("isOneLinePerType") ? ", " : "\n"}${this.locale.getText("TEXT_MESSAGE_SAMPLE_2")}`;
    }

    private showText(text: string, isNew: boolean, seconds: number): void {
        this.lastSeconds = seconds;
        this.notice.showNotice(text, {
            scale: this.settings.get("messageSize") / 100,
            top: this.settings.get("messageTop"),
            shouldZoomIn: isNew && this.settings.get("isMessageZoomInOn"),
            shouldZoomOut: this.settings.get("isMessageZoomOutOn"),
            isFadePulsing: this.settings.get("isMessageFadePulseOn"),
            isSizePulsing: this.settings.get("isMessageSizePulseOn"),
            pulseSpeed: this.settings.get("messagePulseSpeed") / 100,
            seconds,
        });
    }

    private isDue(line: Line, now: number): boolean {
        return line.parts.some((part) => {
            const at = this.shownAt.get(part);
            return at === undefined || (line.repeat > 0 && now - at >= line.repeat);
        });
    }

    private isStillUp(line: Line, now: number): boolean {
        return line.showFor === 0 || line.parts.some((part) => now - (this.shownAt.get(part) ?? 0) < line.showFor);
    }

    private forgetOver(lines: Line[]): void {
        const parts = this.parts;
        for (const part of parts) parts.delete(part);
        for (const line of lines) for (const part of line.parts) parts.add(part);
        for (const [part] of this.shownAt) if (!parts.has(part)) this.shownAt.delete(part);
    }

    /** The weapon buff due and the added ones, in this tick's list. */
    private listWeaponIds(reminders: Reminders): number[] {
        const ids = this.weaponIds;
        for (let index = ids.length; index > 0; index--) ids.pop();
        if (reminders.weaponSpell !== undefined) ids.push(reminders.weaponSpell);
        for (const id of reminders.addedWeaponSpells) ids.push(id);
        return ids;
    }

    /** The spells of the old ranks, in this tick's list. */
    private listRankIds(reminders: Reminders): number[] {
        const ids = this.rankIds;
        for (let index = ids.length; index > 0; index--) ids.pop();
        for (const rank of reminders.outdatedRanks) ids.push(rank.id);
        return ids;
    }

    private listLines(reminders: Reminders): Line[] {
        const lines = this.lines;
        for (let index = lines.length; index > 0; index--) lines.pop();
        this.addTypeLines(lines, "missingBuff", reminders.buffsToCast, "TEXT_BUFF");
        this.addTypeLines(lines, "weaponBuff", this.listWeaponIds(reminders), "TEXT_WEAPON");
        this.addTypeLines(lines, "missingSeal", reminders.seals, "TEXT_SEAL");
        this.addTypeLines(lines, "missingTracking", reminders.trackings, "TEXT_TRACKING");
        this.addTypeLines(lines, "readyCooldown", reminders.readyCooldowns, "TEXT_COOLDOWN");
        this.addTypeLines(lines, "proc", reminders.procs, "TEXT_PROC");
        this.addTypeLines(lines, "oldRank", this.listRankIds(reminders), "TEXT_RANK");
        for (const stock of reminders.lowStock)
            this.addCountLine(lines, "lowStock", stock.key, `lowStock:${stock.itemId}`, stock, reminders);
        for (const stock of reminders.lowReagents) {
            this.addCountLine(lines, "lowReagent", stock.spellId, `lowReagent:${stock.name}`, stock, reminders);
        }
        for (const spellId of reminders.buffsNotOnBars) {
            const name = this.spells.getSpellName(spellId) ?? "?";
            this.addNamedLine(lines, spellId, [`bar:${spellId}`], string.format(this.locale.getText("NOTICE_NOT_ON_BAR"), name));
        }
        for (const suggestion of reminders.partySuggestions) {
            const names = suggestion.names.join(", ");
            const spellName = this.spells.getSpellName(suggestion.spellId) ?? "?";
            const count = suggestion.names.length;
            const text =
                count > NAMES_MAX
                    ? string.format(this.locale.getText("NOTICE_PARTY_COUNT"), spellName, count)
                    : string.format(this.locale.getText("NOTICE_PARTY"), spellName, names);
            const parts = suggestion.names.map((name) => `party:${suggestion.spellId}:${name}`);
            this.addNamedLine(lines, suggestion.spellId, parts, text);
        }
        return lines;
    }

    /** Is the message on, and may it show here? An Alert in town's only in a town. */
    private isTold(style: Style, reminders: Reminders): boolean {
        return style.isMessageOn && (style.when !== "townAlert" || reminders.isInTown === true);
    }

    /** The lines of a type of reminder: those that would say the same in one color are one, repeating with the soonest. */
    private addTypeLines(lines: Line[], reminderType: ReminderType, spellIds: number[], text: TextKey): void {
        if (spellIds.length === 0) return;
        const added: Line[] = [];
        for (const id of spellIds) {
            const style = this.styles.getStyle(reminderType, id);
            if (!style.isMessageOn) continue;
            const color = style.messageColor ?? style.color;
            const words = this.findWords(reminderType, id, style, text, this.spells.getSpellLabel(id));
            const same = added.find((line) => line.words === words.words && line.color.join(",") === color.join(","));
            if (same === undefined) {
                added.push({
                    ...words,
                    parts: [`${reminderType}:${id}`],
                    color,
                    showFor: findShowFor(style),
                    repeat: style.repeat,
                    reminderType,
                });
            } else {
                same.parts.push(`${reminderType}:${id}`);
                same.showFor = pickLonger(same.showFor, findShowFor(style));
                // The line comes again with the sound that repeats soonest
                if (style.repeat > 0 && (same.repeat === 0 || style.repeat < same.repeat)) same.repeat = style.repeat;
            }
        }
        for (const line of added) lines.push(line);
    }

    /** The line of something running low: the item and how many are left is its name. */
    private addCountLine(
        lines: Line[],
        reminderType: ReminderType,
        id: number,
        part: string,
        stock: { name: string; count: number },
        reminders: Reminders,
    ): void {
        const style = this.styles.getStyle(reminderType, id);
        if (!this.isTold(style, reminders)) return;
        const words = this.findWords(reminderType, id, style, "TEXT_LOW", `${stock.name} (${stock.count})`);
        lines.push({
            ...words,
            parts: [part],
            color: style.messageColor ?? style.color,
            showFor: findShowFor(style),
            repeat: style.repeat,
            reminderType,
        });
    }

    /** What a line says, by what the player chose for it. */
    private findWords(reminderType: ReminderType, id: number, style: Style, text: TextKey, name: string | undefined): Words {
        const choice = this.styles.getMessageTextChoice(reminderType, id);
        return findWords(choice, style.messageText, this.locale.getText(text), name);
    }

    /** A line that names what it is about, in the buff color of the spell. */
    private addNamedLine(lines: Line[], spellId: number, parts: string[], text: string): void {
        const style = this.styles.getStyle("missingBuff", spellId);
        if (style.isMessageOn) {
            lines.push({ words: text, parts, color: style.messageColor ?? style.color, showFor: findShowFor(style), repeat: style.repeat });
        }
    }

    /** The lines as the notice's one text: each on its own, or (as the player chose) those of one type side by side. */
    private buildNoticeText(lines: Line[]): string {
        if (!this.settings.get("isOneLinePerType")) {
            return lines.map((line) => this.styles.applyTextColor(line.color, line.words)).join("\n");
        }
        const rows: { reminderType: ReminderType | undefined; prefix?: string; seen: string[]; parts: { color: Rgb; words: string }[] }[] =
            [];
        for (const line of lines) {
            let row = line.reminderType !== undefined ? rows.find((candidate) => candidate.reminderType === line.reminderType) : undefined;
            if (row === undefined) {
                row = { reminderType: line.reminderType, seen: [], parts: [] };
                rows.push(row);
            }
            if (row.seen.includes(line.words)) continue;
            row.seen.push(line.words);
            // "Proc: Overpower, Revenge": what they share is said once
            const words = line.prefix !== undefined && line.prefix === row.prefix ? line.body! : line.words;
            row.prefix = line.prefix ?? row.prefix;
            row.parts.push({ color: line.color, words });
        }
        // The comma in the color of what it follows
        const applyPartColor = (part: { color: Rgb; words: string }, isLast: boolean) =>
            this.styles.applyTextColor(part.color, isLast ? part.words : `${part.words},`);
        return rows.map((row) => row.parts.map((part, index) => applyPartColor(part, index === row.parts.length - 1)).join(" ")).join("\n");
    }
}
