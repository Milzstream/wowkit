// One tick: look at the game, then show what is due. Runs every 0.2 seconds, and sooner when
// something happens (RefreshService asks for it). Between the two, each reminder found shows only when its look says it
// may (the When column of the table): always, in combat, out of combat, with a living enemy targeted, or (the low
// reagents and stock) in a town or an inn; and then for its glow time, again with its repeat (GlowSchedule). What is due
// is the finders' to say; when it shows is the player's, for each type and spell.
import { Interval, type OnFirstLogin, type OnLogout, type OnReady } from "@wowkit/core";
import type { ClockService, PlayerService } from "@wowkit/wow";
import type { StyleService } from "../settings/style.service";
import type { FindRemindersService } from "./find-reminders.service";
import type { ShowRemindersService } from "./show-reminders.service";
import type { Reminders } from "./tick.interface";
import { readWhenState } from "./when-state";
import { filterReminders } from "./reminder-filter";
import { GlowSchedule } from "./glow-schedule";

export class TickService implements OnFirstLogin, OnLogout, OnReady {
    private isRunning = false;
    /** When each due reminder shows: its glow time and repeat. */
    private readonly schedule = new GlowSchedule();
    /** Was the player in a town at the last tick: arriving, an Alert in town starts over. */
    private wasInTown = false;
    /** Was the player in combat at the last tick: as a fight starts, a ready cooldown starts over. */
    private wasInCombat = false;

    constructor(
        private readonly finder: FindRemindersService,
        private readonly shower: ShowRemindersService,
        private readonly player: PlayerService,
        private readonly styles: StyleService,
        private readonly clock: ClockService,
    ) {}

    onFirstLogin(): void {
        this.isRunning = true;
    }

    onLogout(): void {
        this.isRunning = false;
    }

    onReady(): void {
        this.tick();
    }

    /** Looks at the game and shows what is due, when its look says it may. Does nothing before the first login. */
    @Interval(200)
    tick(): void {
        if (!this.isRunning) return;
        this.shower.showReminders(this.filterShowing(this.finder.findReminders()));
    }

    /**
     * The reminders that may show now: by the When of their look, then by its glow time and repeat; the others are left
     * out, glow, message and sound alike.
     */
    private filterShowing(reminders: Reminders): Reminders {
        const now = readWhenState(this.player);
        const byWhen = filterReminders(reminders, (reminderType, id) => now[this.styles.getStyle(reminderType, id).when]);
        const time = this.clock.getCurrentTime();
        const isInTown = this.player.isResting();
        const hasArrivedInTown = isInTown && !this.wasInTown;
        this.wasInTown = isInTown;
        const hasFightStarted = now.inCombat && !this.wasInCombat;
        this.wasInCombat = now.inCombat;
        this.schedule.startTick();
        return {
            ...filterReminders(byWhen, (reminderType, id) => {
                const style = this.styles.getStyle(reminderType, id);
                const isStartingOver =
                    (style.when === "townAlert" && hasArrivedInTown) || (reminderType === "readyCooldown" && hasFightStarted);
                return this.schedule.isShowing(`${reminderType}:${id}`, style, time, isInTown, isStartingOver);
            }),
            isInTown,
        };
    }
}
