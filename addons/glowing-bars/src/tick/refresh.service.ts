// When to look again. Game events come in bursts (a quest turn-in or a level-up fires many at
// once, and Forever froze when the addon rebuilt things on every one), so each request is merged
// with the ones around it and delayed a little. The spells and the bars keep themselves fresh
// (@wowkit/wow); this only asks for a tick when they say they changed.
import type { BuffStateService } from "../character/buff-state.service";
import { OnEvent, OnGameEvent } from "@wowkit/core";
import type { BarRefreshService, ClockService } from "@wowkit/wow";
import type { ShowRemindersService } from "./show-reminders.service";
import type { TickService } from "./tick.service";

export class RefreshService {
    private isTickQueued = false;

    constructor(
        private readonly ticker: TickService,
        private readonly shower: ShowRemindersService,
        private readonly auras: BuffStateService,
        private readonly clock: ClockService,
        private readonly barRefresh: BarRefreshService,
    ) {}

    /** A tick on the next frame; several requests in one frame give one tick. */
    @OnEvent("bars.mapped", "spells.refreshed", "procs.changed")
    requestTick(): void {
        this.shower.markGlowsStale();
        if (this.isTickQueued) return;
        this.isTickQueued = true;
        this.clock.runAfter(0, () => {
            this.isTickQueued = false;
            this.ticker.tick();
        });
    }

    /** An item on a button may have run out, or come back. */
    @OnGameEvent("BAG_UPDATE_DELAYED")
    requestTickForBags(): void {
        this.requestTick();
    }

    /** A new target, or a fight starting: what may show (the When of each look) changed. */
    @OnGameEvent("PLAYER_TARGET_CHANGED", "PLAYER_REGEN_DISABLED")
    requestTickForWhen(): void {
        this.requestTick();
    }

    /** A tick that reads the auras again instead of reusing a recent read. */
    @OnGameEvent(
        "PLAYER_UPDATE_RESTING",
        "ZONE_CHANGED_NEW_AREA",
        "PLAYER_ALIVE",
        "PLAYER_UNGHOST",
        "PLAYER_MOUNT_DISPLAY_CHANGED",
        "PLAYER_DEAD",
        "PLAYER_REGEN_ENABLED",
    )
    requestTickWithFreshAuras(): void {
        this.auras.wipeAuraScans();
        this.requestTick();
    }

    /** A shapeshift changes the bars and the buffs the player has. */
    @OnGameEvent("UPDATE_SHAPESHIFT_FORM")
    noteShapeshift(): void {
        this.auras.noteFormChange();
        this.barRefresh.scheduleBarRemap();
    }
}
