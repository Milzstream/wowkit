// One tick: look at the game, then show what is due. Runs every 0.5 seconds in combat and every second out of it, and
// sooner when something happens (RefreshService asks for it). Between the two, each reminder found shows only when its look
// says it may (the When column of the table): always, in combat, out of combat, with a living enemy targeted, or (the low
// reagents and stock) in a town or an inn; and then for its glow time, again with its repeat (GlowSchedule). What is due
// is the finders' to say; when it shows is the player's, for each type and spell.
// A tick makes as few new tables as it can (each one is memory the game has to clear later): the filtered reminders go into
// the same lists every time, and the tests the filter asks are made once.
import { Interval, type OnFirstLogin, type OnLogout, type OnReady } from "@wowkit/core";
import type { ClockService, PlayerService } from "@wowkit/wow";
import type { ReminderType } from "../settings/settings.interface";
import type { StyleService } from "../settings/style.service";
import type { FindRemindersService } from "./find-reminders.service";
import type { ShowRemindersService } from "./show-reminders.service";
import type { Reminders } from "./tick.interface";
import { createWhenState, readWhenState } from "./when-state";
import { createEmptyReminders, filterReminders } from "./reminder-filter";
import { GlowSchedule } from "./glow-schedule";

/** Out of combat, a tick on the clock waits until this long after the last one (the clock comes every 0.5 seconds). */
const QUIET_TICK_SECONDS = 0.9;

type IsShown = (this: void, reminderType: ReminderType, id: number) => boolean;

export class TickService implements OnFirstLogin, OnLogout, OnReady {
    private isRunning = false;
    /** When each due reminder shows: its glow time and repeat. */
    private readonly schedule = new GlowSchedule();
    /** Was the player in a town at the last tick: arriving, an Alert in town starts over. */
    private wasInTown = false;
    /** Was the player in combat at the last tick: as a fight starts, a ready cooldown starts over. */
    private wasInCombat = false;
    private lastTickAt = 0;
    /** What the filter of this tick asks: the When that holds, the time, the town and the start of a fight. */
    private readonly whenState = createWhenState();
    private time = 0;
    private isInTown = false;
    private hasArrivedInTown = false;
    private hasFightStarted = false;
    /** The reminders the When lets through, then the ones that show now: the same lists at every tick. */
    private readonly byWhen = createEmptyReminders();
    private readonly showing = createEmptyReminders();

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

    /** A tick on the clock. Out of combat fewer are needed: what must come at once (procs, ready cooldowns) comes in combat. */
    @Interval(500)
    tickOnClock(): void {
        if (!this.player.isInCombat() && this.clock.getCurrentTime() - this.lastTickAt < QUIET_TICK_SECONDS) return;
        this.tick();
    }

    /** Looks at the game and shows what is due, when its look says it may. Does nothing before the first login. */
    tick(): void {
        if (!this.isRunning) return;
        this.lastTickAt = this.clock.getCurrentTime();
        this.shower.showReminders(this.filterShowing(this.finder.findReminders()));
    }

    /**
     * The reminders that may show now: by the When of their look, then by its glow time and repeat; the others are left
     * out, glow, message and sound alike.
     */
    private filterShowing(reminders: Reminders): Reminders {
        const now = readWhenState(this.player, this.whenState);
        filterReminders(this.byWhen, reminders, this.isAllowedNow);
        this.time = this.clock.getCurrentTime();
        this.isInTown = this.player.isResting();
        this.hasArrivedInTown = this.isInTown && !this.wasInTown;
        this.wasInTown = this.isInTown;
        this.hasFightStarted = now.inCombat && !this.wasInCombat;
        this.wasInCombat = now.inCombat;
        this.schedule.startTick();
        filterReminders(this.showing, this.byWhen, this.isDueNow);
        this.showing.isInTown = this.isInTown;
        return this.showing;
    }

    /** Does the When of the reminder's look hold now? */
    private readonly isAllowedNow: IsShown = (reminderType, id) => this.whenState[this.styles.getStyle(reminderType, id).when];

    /** Does the reminder show now, by its glow time and repeat? */
    private readonly isDueNow: IsShown = (reminderType, id) => {
        const style = this.styles.getStyle(reminderType, id);
        const isStartingOver =
            (style.when === "townAlert" && this.hasArrivedInTown) || (reminderType === "readyCooldown" && this.hasFightStarted);
        return this.schedule.isShowing(`${reminderType}:${id}`, style, this.time, this.isInTown, isStartingOver);
    };
}
