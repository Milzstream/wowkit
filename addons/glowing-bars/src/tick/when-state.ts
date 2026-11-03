// Which When of a look holds right now, read once for a tick: always, in combat or out of it, a living enemy targeted.
// "Alert in town" holds anywhere: it glows anywhere, and keeps its message and sound to a town or an inn.
import type { PlayerService } from "@wowkit/wow";
import type { When } from "../settings/settings.interface";

/** For each When, does it hold now? */
export function readWhenState(player: PlayerService): { [when in When]: boolean } {
    const isInCombat = player.isInCombat();
    return {
        always: true,
        combat: isInCombat,
        noCombat: !isInCombat,
        target: player.hasEnemyTarget(),
        townText: true,
    };
}
