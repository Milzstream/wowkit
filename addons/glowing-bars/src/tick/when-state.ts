// Which When of a look holds right now, read once for a tick: always, in combat or out of it, a living enemy targeted, in
// a town or an inn. "Alert in town" holds anywhere for a glow, and only in a town for a message and its repeat.
import type { PlayerService } from "@wowkit/wow";
import type { When } from "../settings/settings.interface";

/** For each When, does it hold now: for a glow, or (`isForMessage`) for a message and its repeat. */
export function readWhenState(player: PlayerService, isForMessage: boolean): { [when in When]: boolean } {
    const isInCombat = player.isInCombat();
    const isInTown = player.isResting();
    return {
        always: true,
        combat: isInCombat,
        noCombat: !isInCombat,
        target: player.hasEnemyTarget(),
        town: isInTown,
        townAlert: !isForMessage || isInTown,
    };
}
