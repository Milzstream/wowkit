import { createWorld, describe, expect, it, playAs, FORTITUDE, learnSpell, PRIEST, type FakeFrame, type World } from "@wowkit/test-kit";

function createAfk(isOn: boolean): World {
    const world = createWorld(
        (state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            state.isAfk = true;
        },
        { isAfkRainbowOn: isOn },
    );
    world.advance(0.05);
    world.fire("PLAYER_FLAGS_CHANGED", "player");
    return world;
}

describe("the rainbow when AFK", () => {
    it("is off by default", () => {
        const world = createAfk(false);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("lights the buttons one after the other, the others staying lit", () => {
        const world = createAfk(true);
        expect(world.glowsOn(1)).toBe(1);
        world.advance(1.1);
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("stops when the player is back", () => {
        const world = createAfk(true);
        world.state.isAfk = false;
        world.fire("PLAYER_FLAGS_CHANGED", "player");
        expect(world.glowsOn(1)).toBe(0);
    });

    it("stops in a fight", () => {
        const world = createAfk(true);
        world.state.isInCombat = true;
        world.fire("PLAYER_REGEN_DISABLED");
        expect(world.glowsOn(1)).toBe(0);
    });

    it("starts even if the game says nothing when the player goes AFK", () => {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, FORTITUDE);
            },
            { isAfkRainbowOn: true },
        );
        world.advance(1);
        world.state.isAfk = true;
        world.advance(1.2);
        expect(world.glowsOn(1)).toBe(1);
    });

    it("lights the stance bar together with the others", () => {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                state.isAfk = true;
            },
            { isAfkRainbowOn: true },
        );
        const stance = CreateFrame("CheckButton", "StanceButton1", UIParent);
        world.advance(14.5);
        const lit = world.frames.filter((frame) => frame.parent === (stance as unknown as FakeFrame) && frame.isShown);
        expect(lit.length).toBeGreaterThan(0);
    });
});
