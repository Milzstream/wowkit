// While the player is AFK, if they asked for it: the action buttons light up in the colors of the rainbow, one after the
// other from the start of each bar, all the bars together, staying lit until the end; then they go out and it starts over. A fight ends it at once.
import { Interval, OnEvent, OnGameEvent } from "@wowkit/core";
import type { ButtonSearchService, ClockService, GlowService, PlayerService } from "@wowkit/wow";
import type { AddonSettingsService } from "../settings/settings.interface";
import { RAINBOW, RAINBOW_LAST_SECONDS } from "./rainbow.constants";

/** Seconds from one step to the next: slower than the scan, it is only for the eye. */
const AFK_STEP_SECONDS = 1;

const GLOW_KEY = "afkRainbow";

export class AfkRainbowService {
    /** The buttons lit so far in this round. */
    private readonly lit: ActionButton[] = [];
    /** Counts the times the rainbow started or stopped: the wait of an older one comes to nothing. */
    private run = 0;
    private isRunning = false;

    constructor(
        private readonly search: ButtonSearchService,
        private readonly glow: GlowService,
        private readonly clock: ClockService,
        private readonly player: PlayerService,
        private readonly settings: AddonSettingsService,
    ) {}

    /** The game may tell of the AFK before its answer changes: looked at again now and then. */
    @Interval(1000)
    checkRainbow(): void {
        this.updateRainbow();
    }

    @OnEvent("setting.changed")
    @OnGameEvent("PLAYER_FLAGS_CHANGED", "PLAYER_REGEN_DISABLED", "PLAYER_REGEN_ENABLED")
    updateRainbow(): void {
        const isWanted = this.settings.get("isAfkRainbowOn") && this.player.isAfk() && !this.player.isInCombat();
        if (isWanted === this.isRunning) return;
        this.isRunning = isWanted;
        this.run += 1;
        if (isWanted) this.showNextGlow(this.run, 0);
        else this.clearLit();
    }

    /** On every bar at once, one button further from its start, the others staying lit; a step after the end of the longest bar they go out, and it starts over. */
    private showNextGlow(run: number, index: number): void {
        if (run !== this.run) return;
        const bars = this.search.listBars();
        if (bars.length === 0) return;
        let longest = 0;
        for (const bar of bars) longest = math.max(longest, bar.length);
        if (index >= longest) {
            this.clock.runAfter(RAINBOW_LAST_SECONDS, () => this.startOver(run));
            return;
        }
        const step = index;
        for (const bar of bars) {
            const button = bar[step];
            if (button === undefined) continue;
            this.glow.showButtonGlow(GLOW_KEY, button, RAINBOW[step % RAINBOW.length]!, "circling");
            this.lit.push(button);
        }
        this.clock.runAfter(AFK_STEP_SECONDS, () => this.showNextGlow(run, step + 1));
    }

    private startOver(run: number): void {
        if (run !== this.run) return;
        this.clearLit();
        this.showNextGlow(run, 0);
    }

    private clearLit(): void {
        for (const button of this.lit) this.glow.clearButtonGlow(GLOW_KEY, button);
        for (let index = this.lit.length; index > 0; index--) this.lit.pop();
    }
}
