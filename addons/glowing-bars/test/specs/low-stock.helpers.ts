// What the specs of the low stock share: a character with arrows added as low stock.
import { createWorld, playAs, PRIEST, type World } from "@wowkit/test-kit";

export const ARROW = 2512;
export const ARROW_KEY = 1000000000 + ARROW;

/** In a town by default, where its message comes (Alert in town). */
export function createArcher(count: number, savedSettings: Record<string, unknown> = {}, isOnBars = true, isInTown = true): World {
    const world = createWorld(
        (state) => {
            playAs(state, PRIEST);
            state.itemNames[ARROW] = "Rough Arrow";
            state.bags[ARROW] = count;
            if (isOnBars) state.barItems[1] = ARROW;
            state.isResting = isInTown;
        },
        { addedSpells: [{ id: ARROW, reminderType: "stock" }], ...savedSettings },
    );
    world.advance(1);
    return world;
}
