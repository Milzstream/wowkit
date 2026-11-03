// When a reminder that is due shows: from the moment it became due (its own reason, and its When), for its glow time;
// then, where it repeats, again for its glow time every so many seconds. "Until done" (0) shows it the whole time it is
// due. An Alert in town repeats only in a town, and starts over on arriving in one. One schedule for the glow, the message
// and the sound: they all come and go with what it lets through.
import type { Style } from "../settings/settings.interface";

export class GlowSchedule {
    /** When each reminder ("buff:21562") became due; one that is no longer due is forgotten, and starts over when back. */
    private dueSince = new LuaMap<string, number>();
    /** The reminders seen due in this tick. */
    private seen = new LuaSet<string>();

    /** A new tick: the reminders not seen due in the last one are over. */
    startTick(): void {
        for (const [key] of this.dueSince) if (!this.seen.has(key)) this.dueSince.delete(key);
        this.seen = new LuaSet<string>();
    }

    /** Does the due reminder show now? `isStartingOver`: its time starts again, as if it had just become due. */
    isShowing(key: string, style: Style, now: number, isInTown: boolean, isStartingOver: boolean): boolean {
        this.seen.add(key);
        const isTownAlert = style.when === "townAlert";
        let since = this.dueSince.get(key);
        if (since === undefined || isStartingOver) {
            since = now;
            this.dueSince.set(key, since);
        }
        if (style.glowSeconds === 0) return true;
        const elapsed = now - since;
        if (elapsed < style.glowSeconds) return true;
        const repeat = isTownAlert && !isInTown ? 0 : style.repeat;
        return repeat > 0 && elapsed % repeat < style.glowSeconds;
    }
}
