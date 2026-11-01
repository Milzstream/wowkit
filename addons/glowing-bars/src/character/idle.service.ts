// When the reminders keep quiet: the policy that Buff Reminder and Rank Reminder share. The facts are the player's.
import type { PlayerService } from "@wowkit/wow";

export class IdleService {
    constructor(private readonly player: PlayerService) {}

    /** Nothing is shown while dead, on a taxi, mounted, or (when asked) resting in town. */
    shouldStayIdle(shouldStayQuietWhenResting: boolean): boolean {
        if (this.player.isDead() || this.player.isOnTaxi() || this.player.isMounted()) return true;
        // A town or an inn: nobody fights there
        return shouldStayQuietWhenResting && !this.player.isInCombat() && this.player.isResting();
    }
}
