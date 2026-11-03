// The notice at the top of the screen: one message with a short line for each type of reminder whose message the player
// switched on, in the color of its glow. A line says what type of reminder it is, not which spell; only a reminder with
// no button to glow (a buff on no bar, a party member) names what it is about. A line comes once, as what it is about
// starts, and again only where the player chose it to repeat, together with the sound.

import type { AddonLocale } from "../locale/locale.interface";
import type { TextKey } from "../locale/texts.constants";
import type { ReminderType } from "../settings/settings.interface";
import type { StyleService } from "../settings/style.service";
import { NOTICE_SECONDS, type ActionBarsService, type ClockService, type NoticeService, type Rgb, type SpellsService } from "@wowkit/wow";
import type { Reminders } from "./tick.interface";

/** A party message names this many members at most; past them, it counts them (a raid). */
const NAMES_MAX = 5;
/** After the bars changed they are mapped again; until then the old map would call every spell missing. */
const NOTICE_AFTER_BAR_CHANGE = 1.5;

interface Line {
    /** What it is about: it comes again only when one of these is new, or with its repeat. */
    parts: string[];
    /** Already in its color. */
    text: string;
    /** Seconds between its repeats, the sound's (0: it comes once). */
    repeat: number;
}

export class NoticesService {
    /** The text showing now. */
    private lastText = "";
    /** When each part of a line last came; a part that is over is forgotten, so it comes again when it is back. */
    private shownAt = new LuaMap<string, number>();

    constructor(
        private readonly actionBars: ActionBarsService,
        private readonly clock: ClockService,
        private readonly notice: NoticeService,
        private readonly spells: SpellsService,
        private readonly locale: AddonLocale,
        private readonly styles: StyleService,
    ) {}

    /** Shows the lines that are due, with those that are still up: the notice takes one text. */
    showNoticeIfNew(reminders: Reminders): void {
        if (this.actionBars.getSecondsSinceBarsChanged() <= NOTICE_AFTER_BAR_CHANGE) return;
        const now = this.clock.getCurrentTime();
        const lines = this.listLines(reminders);
        this.forgetOver(lines);
        const due = lines.filter((line) => this.isDue(line, now));
        const text = lines
            .filter((line) => due.includes(line) || this.isStillUp(line, now))
            .map((line) => line.text)
            .join("\n");
        for (const line of due) for (const part of line.parts) this.shownAt.set(part, now);
        if (due.length === 0 && text === this.lastText) return;
        this.lastText = text;
        // What the message was about is over: it goes out at once, not when its time is up
        if (text === "") this.notice.clearNotice();
        else this.notice.showNotice(text);
    }

    private isDue(line: Line, now: number): boolean {
        return line.parts.some((part) => {
            const at = this.shownAt.get(part);
            return at === undefined || (line.repeat > 0 && now - at >= line.repeat);
        });
    }

    private isStillUp(line: Line, now: number): boolean {
        return line.parts.some((part) => now - (this.shownAt.get(part) ?? 0) < NOTICE_SECONDS);
    }

    private forgetOver(lines: Line[]): void {
        const shownAt = new LuaMap<string, number>();
        for (const line of lines) {
            for (const part of line.parts) {
                const at = this.shownAt.get(part);
                if (at !== undefined) shownAt.set(part, at);
            }
        }
        this.shownAt = shownAt;
    }

    private listLines(reminders: Reminders): Line[] {
        const lines: Line[] = [];
        this.addTypeLines(lines, "buff", reminders.buffsToCast, "TEXT_BUFF");
        this.addTypeLines(
            lines,
            "weapon",
            [...(reminders.weaponSpell !== undefined ? [reminders.weaponSpell] : []), ...reminders.addedWeaponSpells],
            "TEXT_WEAPON",
        );
        this.addTypeLines(lines, "seal", reminders.seals, "TEXT_SEAL");
        this.addTypeLines(lines, "tracking", reminders.trackings, "TEXT_TRACKING");
        this.addTypeLines(lines, "cooldown", reminders.readyCooldowns, "TEXT_COOLDOWN");
        this.addTypeLines(lines, "proc", reminders.procs, "TEXT_PROC");
        this.addTypeLines(
            lines,
            "rank",
            reminders.outdatedRanks.map((rank) => rank.id),
            "TEXT_RANK",
        );
        for (const stock of reminders.lowStock) {
            const style = this.styles.getStyle("stock", stock.key);
            const text = this.styles.applyTextColor(
                style.color,
                string.format(this.locale.getText("NOTICE_STOCK_LOW"), stock.name, stock.count),
            );
            const isTold = style.isMessageOn && (style.when !== "townAlert" || reminders.isInTown === true);
            if (isTold) lines.push({ parts: [`stock:${stock.itemId}`], text, repeat: style.repeat });
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

    /** A line for a type of reminder: one for each color its spells (whose message is on) are shown in. */
    private addTypeLines(lines: Line[], reminderType: ReminderType, spellIds: number[], text: TextKey): void {
        const groups: { color: Rgb; ids: number[]; repeat: number }[] = [];
        for (const id of spellIds) {
            const style = this.styles.getStyle(reminderType, id);
            if (!style.isMessageOn) continue;
            const group = groups.find((candidate) => candidate.color.join(",") === style.color.join(","));
            if (group === undefined) {
                groups.push({ color: style.color, ids: [id], repeat: style.repeat });
            } else {
                group.ids.push(id);
                // The line comes again with the sound that repeats soonest
                if (style.repeat > 0 && (group.repeat === 0 || style.repeat < group.repeat)) group.repeat = style.repeat;
            }
        }
        for (const group of groups) {
            const lineText = this.styles.applyTextColor(group.color, this.locale.getText(text));
            lines.push({ parts: group.ids.map((id) => `${reminderType}:${id}`), text: lineText, repeat: group.repeat });
        }
    }

    /** A line that names what it is about, in the buff color of the spell. */
    private addNamedLine(lines: Line[], spellId: number, parts: string[], text: string): void {
        const style = this.styles.getStyle("buff", spellId);
        if (style.isMessageOn) lines.push({ parts, text: this.styles.applyTextColor(style.color, text), repeat: style.repeat });
    }
}
