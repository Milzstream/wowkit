// The low reagents' message: it names the reagents running low, if the reagent's message is on, where and when their
// look's When lets it (in a town or an inn by default, where reagents are sold), and again while it does if it repeats.
// Their glow, on the group buffs, is the finder's.
import { Interval, OnGameEvent, type OnReady } from "@wowkit/core";
import type { StyleService } from "../settings/style.service";
import type { ReagentsService } from "../reagents/reagents.service";
import type { ClockService, NoticeService, PlayerService } from "@wowkit/wow";
import type { AddonLocale } from "../locale/locale.interface";
import type { LowReagent } from "../reagents/reagent.interface";
import type { AddedRemindersService } from "./added-reminders.service";
import type { AddonSettingsService, Style } from "../settings/settings.interface";
import { readWhenState } from "../tick/when-state";

export class TownVisitService implements OnReady {
    /** When the message last showed; undefined while it has not since the reagents it names could be told (a new visit). */
    private shownAt: number | undefined;

    constructor(
        private readonly player: PlayerService,
        private readonly reagents: ReagentsService,
        private readonly addedReminders: AddedRemindersService,
        private readonly settings: AddonSettingsService,
        private readonly notice: NoticeService,
        private readonly locale: AddonLocale,
        private readonly styles: StyleService,
        private readonly clock: ClockService,
    ) {}

    onReady(): void {
        this.showIfDue();
    }

    /**
     * The message, at once on arriving in a town, then every so often where the player chose it to repeat; first as soon as
     * there is something to tell where its When lets it.
     */
    @OnGameEvent("PLAYER_UPDATE_RESTING")
    @Interval(1000)
    showIfDue(): void {
        const told = this.listTold();
        if (told.length === 0) {
            this.shownAt = undefined;
            return;
        }
        // The soonest of the rows that repeat
        let repeat = 0;
        for (const { style } of told) if (style.repeat > 0 && (repeat === 0 || style.repeat < repeat)) repeat = style.repeat;
        const isDue = this.shownAt === undefined || (repeat > 0 && this.clock.getCurrentTime() - this.shownAt >= repeat);
        if (isDue) this.show(told);
    }

    /** The reagents running low whose message is on and may show here, by the look of their own row. */
    private listTold(): { stock: LowReagent; style: Style }[] {
        if (this.settings.get("isMuted") || !this.settings.get("showReagents")) return [];
        const enabledReagents = this.settings.get("enabledReagents");
        const listed: LowReagent[] = this.reagents.findLowReagents((reagent) => enabledReagents[String(reagent.itemId)] !== false);
        const added = this.addedReminders.findLowReagents().filter((stock) => !listed.some((other) => other.name === stock.name));
        const now = readWhenState(this.player, true);
        return [...listed, ...added]
            .map((stock) => ({ stock, style: this.styles.getStyle("reagent", stock.spellId) }))
            .filter((entry) => entry.style.isMessageOn && now[entry.style.when]);
    }

    private show(told: { stock: LowReagent; style: Style }[]): void {
        const first = told[0];
        if (first === undefined) return;
        const names = told.map(({ stock }) => `${stock.name} (${stock.count})`).join(", ");
        const message = string.format(this.locale.getText("NOTICE_REAGENTS_LOW"), names);
        this.shownAt = this.clock.getCurrentTime();
        this.notice.showNotice(this.styles.applyTextColor(first.style.color, message));
    }
}
