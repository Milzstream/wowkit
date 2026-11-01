// Arriving in a town or an inn, where reagents are sold: a message on the screen names the ones that are running low,
// if the reagent's message is on, and again while there if it repeats (their glow, on the group buffs, is the finder's).
import { Interval, OnGameEvent, type OnReady } from "@wowkit/core";
import type { StyleService } from "../settings/style.service";
import type { ReagentsService } from "../reagents/reagents.service";
import type { ClockService, NoticeService, PlayerService } from "@wowkit/wow";
import type { AddonLocale } from "../locale/locale.interface";
import type { AddonSettingsService } from "../settings/settings.interface";

export class TownVisitService implements OnReady {
    private wasResting = false;
    /** When the message last showed; undefined while it has not in this visit. */
    private shownAt: number | undefined;

    constructor(
        private readonly player: PlayerService,
        private readonly reagents: ReagentsService,
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
        if (hasArrived) this.showLowReagents();
    }

    /** The message again, every so often where the player chose it to repeat; not in a fight. */
    @Interval(1000)
    showAgainInTown(): void {
        const repeat = this.styles.getStyle("reagent").repeat;
        if (repeat === 0 || !this.player.isResting() || this.player.isInCombat() || this.shownAt === undefined) return;
        if (this.clock.getCurrentTime() - this.shownAt >= repeat) this.showLowReagents();
    }

    private showLowReagents(): void {
        const style = this.styles.getStyle("reagent");
        if (this.settings.get("isMuted") || !this.settings.get("showReagents") || !style.isTextOn) return;
        const reagentOn = this.settings.get("reagentOn");
        const low = this.reagents.findLowReagents((reagent) => reagentOn[String(reagent.itemId)] !== false);
        if (low.length === 0) return;
        const names = low.map((stock) => `${stock.name} (${stock.count})`).join(", ");
        const message = string.format(this.locale.getText("NOTICE_REAGENTS_LOW"), names);
        this.shownAt = this.clock.getCurrentTime();
        this.notice.showNotice(this.styles.applyTextColor(style.color, message));
    }
}
