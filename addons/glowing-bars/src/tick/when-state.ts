// Which When of a look holds right now, read once for a tick: always, in combat or out of it, a living enemy targeted.
// "Alert in town" holds anywhere: it glows anywhere, and keeps its message and sound to a town or an inn.
import type { PlayerService } from "@wowkit/wow";
import type { When } from "../settings/settings.interface";

export type WhenState = { [when in When]: boolean };

export function createWhenState(): WhenState {
    return { always: true, inCombat: false, outOfCombat: true, enemyTargeted: false, townAlert: true };
}

/** For each When, does it hold now? Read into `state`, the same table at every tick. */
export function readWhenState(player: PlayerService, state: WhenState): WhenState {
    const isInCombat = player.isInCombat();
    state.inCombat = isInCombat;
    state.outOfCombat = !isInCombat;
    state.enemyTargeted = player.hasEnemyTarget();
    return state;
}
