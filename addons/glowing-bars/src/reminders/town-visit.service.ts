// Arriving in a town or an inn, where reagents are sold: a message on the screen names the ones that are running low,
// if the reagent's message is on, and again while there if it repeats (their glow, on the group buffs, is the finder's).
import { Interval, OnGameEvent, type OnReady } from "@wowkit/core";
import type { StyleService } from "../settings/style.service";
import type { ReagentsService } from "../reagents/reagents.service";
import type { ClockService, NoticeService, PlayerService } from "@wowkit/wow";
import type { AddonLocale } from "../locale/locale.interface";
import type { LowReagent } from "../reagents/reagent.interface";
import type { CustomRemindersService } from "./custom-reminders.service";
import type { AddonSettingsService, Style } from "../settings/settings.interface";

export class TownVisitService implements OnReady {
    private wasResting = false;
    /** When the message last showed; undefined while it has not in this visit. */
    private shownAt: number | undefined;

    constructor(
        private readonly player: PlayerService,
        private readonly reagents: ReagentsService,
        private readonly customReminders: CustomRemindersService,
        private readonly settings: AddonSettingsService,
        private readonly notice: NoticeService,
        private readonly locale: AddonLocale,
        private readonly styles: StyleService,
        private readonly clock: ClockService,
    ) {}

    onReady(): void {
        this.checkArrival();
    }

    /** Called at login and when the resting state changes. */
    @OnGameEvent("PLAYER_UPDATE_RESTING")
    checkArrival(): void {
        const isRestingNow = this.player.isResting();
        const hasArrived = isRestingNow && !this.wasResting;
        this.wasResting = isRestingNow;
        if (!isRestingNow) this.shownAt = undefined;
        if (hasArrived) this.show(this.listTold());
    }

    /** The message again, every so often where the player chose it to repeat; first now if none came in this visit. Not in a fight. */
    @Interval(1000)
    showAgainInTown(): void {
        if (!this.player.isResting() || this.player.isInCombat()) return;
        const told = this.listTold();
        // The soonest of the rows that repeat
        let repeat = 0;
        for (const { style } of told) if (style.repeat > 0 && (repeat === 0 || style.repeat < repeat)) repeat = style.repeat;
        if (repeat === 0) return;
        const isDue = this.shownAt === undefined || this.clock.getCurrentTime() - this.shownAt >= repeat;
        if (isDue) this.show(told);
    }

    /** The reagents running low whose message is on, by the look of their own row. */
    private listTold(): { stock: LowReagent; style: Style }[] {
        if (this.settings.get("isMuted") || !this.settings.get("showReagents")) return [];
        const reagentOn = this.settings.get("reagentOn");
        const listed: LowReagent[] = this.reagents.findLowReagents((reagent) => reagentOn[String(reagent.itemId)] !== false);
        const added = this.customReminders.findLowReagents().filter((stock) => !listed.some((other) => other.name === stock.name));
        return [...listed, ...added]
            .map((stock) => ({ stock, style: this.styles.getStyle("reagent", stock.spellId) }))
            .filter((entry) => entry.style.isTextOn);
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
