// The notice at the top of the screen: one message with a short line for each kind of reminder whose message the player
// switched on, in the color of its glow. A line says what kind of reminder it is, not which spell; only a reminder with
// no button to glow (a buff on no bar, a party member) names what it is about. The same message comes again after a
// while; sooner where the player chose its sound to repeat, together with the sound. A low stock can last for hours: with
// no repeat its line comes once, until there are enough of the item again.

import type { AddonLocale } from "../locale/locale.interface";
import type { TextKey } from "../locale/texts.constants";
import type { ColorKey } from "../settings/settings.interface";
import type { StyleService } from "../settings/style.service";
import type { ActionBarsService, ClockService, NoticeService, Rgb, SpellsService } from "@wowkit/wow";
import type { Reminders } from "./tick.interface";

/** The same message is shown again only after this long, unless one of its lines repeats sooner. */
const NOTICE_REPEAT = 30;
/** A party message names this many members at most; past them, it counts them (a raid). */
const NAMES_MAX = 5;
/** After the bars changed they are mapped again; until then the old map would call every spell missing. */
const NOTICE_AFTER_BAR_CHANGE = 1.5;

interface Line {
    /** Identifies the content: the same key means the same line. */
    key: string;
    /** Already in its color. */
    text: string;
    /** Seconds between its repeats, the sound's (0: the usual NOTICE_REPEAT). */
    repeat: number;
    /** Shown once while it stays among the lines. */
    isOnce?: boolean;
}

/** The soonest repeat of the lines: the one of a line whose sound repeats, else NOTICE_REPEAT. */
function findRepeatSeconds(lines: Line[]): number {
    let seconds = NOTICE_REPEAT;
    for (const line of lines) if (line.repeat > 0) seconds = math.min(seconds, line.repeat);
    return seconds;
}

export class NoticesService {
    private lastNoticeKey: string | undefined;
    private lastNoticeAt = 0;
    /** The keys of the lines that come once and have come. */
    private told = new LuaSet<string>();

    constructor(
        private readonly actionBars: ActionBarsService,
        private readonly clock: ClockService,
        private readonly notice: NoticeService,
        private readonly spells: SpellsService,
        private readonly locale: AddonLocale,
        private readonly styles: StyleService,
    ) {}

    /** Shows the notice when its content is new, or when it has been a while since it was shown. */
    showNoticeIfNew(reminders: Reminders): void {
        if (this.actionBars.getSecondsSinceBarsChanged() <= NOTICE_AFTER_BAR_CHANGE) return;
        const lines = this.listLines(reminders);
        this.forgetTold(lines);
        if (lines.length === 0) {
            // What the message was about is over: it goes out at once, not when its time is up
            if (this.lastNoticeKey !== undefined) this.notice.clearNotice();
            this.lastNoticeKey = undefined;
            return;
        }
        const key = lines.map((line) => line.key).join(";");
        const now = this.clock.getCurrentTime();
        if (key === this.lastNoticeKey && now - this.lastNoticeAt < findRepeatSeconds(lines)) return;
        this.lastNoticeKey = key;
        this.lastNoticeAt = now;
        const shown = lines.filter((line) => line.isOnce !== true || !this.told.has(line.key));
        for (const line of shown) if (line.isOnce === true) this.told.add(line.key);
        if (shown.length > 0) this.notice.showNotice(shown.map((line) => line.text).join("\n"));
    }

    /** A line that is gone can come again. */
    private forgetTold(lines: Line[]): void {
        const told = new LuaSet<string>();
        for (const line of lines) if (this.told.has(line.key)) told.add(line.key);
        this.told = told;
    }

    private listLines(reminders: Reminders): Line[] {
        const lines: Line[] = [];
        this.addKindLines(lines, "buff", reminders.buffsToCast, "TEXT_BUFF");
        this.addKindLines(
            lines,
            "weapon",
            [...(reminders.weaponSpell !== undefined ? [reminders.weaponSpell] : []), ...reminders.customWeaponSpells],
            "TEXT_WEAPON",
        );
        this.addKindLines(lines, "seal", reminders.seals, "TEXT_SEAL");
        this.addKindLines(lines, "tracking", reminders.trackings, "TEXT_TRACKING");
        this.addKindLines(lines, "cooldown", reminders.readyCooldowns, "TEXT_COOLDOWN");
        this.addKindLines(lines, "proc", reminders.procs, "TEXT_PROC");
        this.addKindLines(
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
            if (style.isTextOn) lines.push({ key: `stock:${stock.itemId}`, text, repeat: style.repeat, isOnce: style.repeat === 0 });
        }
        for (const spellId of reminders.buffsNotOnBars) {
            const name = this.spells.getSpellName(spellId) ?? "?";
            this.addNamedLine(lines, spellId, `bar:${spellId}`, string.format(this.locale.getText("NOTICE_NOT_ON_BAR"), name));
        }
        for (const suggestion of reminders.partySuggestions) {
            const names = suggestion.names.join(", ");
            const spellName = this.spells.getSpellName(suggestion.spellId) ?? "?";
            const count = suggestion.names.length;
            const text =
                count > NAMES_MAX
                    ? string.format(this.locale.getText("NOTICE_PARTY_COUNT"), spellName, count)
                    : string.format(this.locale.getText("NOTICE_PARTY"), spellName, names);
            this.addNamedLine(lines, suggestion.spellId, `party:${suggestion.spellId}:${names}`, text);
        }
        return lines;
    }

    /** A line for a kind of reminder: one for each color its spells (whose message is on) are shown in. */
    private addKindLines(lines: Line[], kind: ColorKey, spellIds: number[], text: TextKey): void {
        const groups: { color: Rgb; ids: number[]; repeat: number }[] = [];
        for (const id of spellIds) {
            const style = this.styles.getStyle(kind, id);
            if (!style.isTextOn) continue;
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
            lines.push({ key: `${kind}:${group.ids.join(",")}`, text: lineText, repeat: group.repeat });
        }
    }

    /** A line that names what it is about, in the buff color of the spell. */
    private addNamedLine(lines: Line[], spellId: number, key: string, text: string): void {
        const style = this.styles.getStyle("buff", spellId);
        if (style.isTextOn) lines.push({ key, text: this.styles.applyTextColor(style.color, text), repeat: style.repeat });
    }
}
