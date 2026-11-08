import { createWorld, describe, expect, it, learnSpell, playAs, MAGE, type SpellDefinition, type World } from "@wowkit/test-kit";
import { findLabel, toggleTable } from "./table.helpers";

const WARLOCK = { name: "Warlock", token: "WARLOCK", id: 9 };
const MISSILES: SpellDefinition = { id: 5143, name: "Arcane Missiles", rank: 1, icon: 136096, maxRange: 30, isHarmful: true };
const SHADOW_BOLT: SpellDefinition = {
    id: 686,
    name: "Shadow Bolt",
    rank: 1,
    icon: 136197,
    maxRange: 30,
    isHarmful: true,
    castTimeMs: 1700,
};

function createMage(cost: number | undefined): World {
    const world = createWorld((state) => {
        playAs(state, MAGE);
        learnSpell(state, MISSILES);
        state.bars[1] = MISSILES.id;
        state.spellCosts[MISSILES.id] = cost;
    });
    world.advance(1);
    return world;
}

function createWarlock(): World {
    const world = createWorld((state) => {
        playAs(state, WARLOCK);
        learnSpell(state, SHADOW_BOLT);
        state.bars[1] = SHADOW_BOLT.id;
    });
    world.advance(1);
    return world;
}

describe("a proc told by its spell", () => {
    it("lights Arcane Missiles only while it is free", () => {
        const world = createMage(85);
        expect(world.glowsOn(1)).toBe(0);
        world.state.spellCosts[MISSILES.id] = 0;
        world.advance(1);
        expect(world.glowsOn(1)).toBe(1);
    });

    it("lights nothing while the game names no cost", () => {
        expect(createMage(undefined).glowsOn(1)).toBe(0);
    });

    it("lights Shadow Bolt only while it is instant", () => {
        const world = createWarlock();
        expect(world.glowsOn(1)).toBe(0);
        world.state.spells[SHADOW_BOLT.id]!.castTimeMs = 0;
        world.advance(1);
        expect(world.glowsOn(1)).toBe(1);
    });

    it("has an alpha row in the table, with a tooltip on its name", () => {
        const world = createWarlock();
        toggleTable();
        const row = findLabel(world, "Shadow Bolt (alpha)")?.parent;
        expect(row).toBeDefined();
        expect(world.frames.some((frame) => frame.parent === row && frame.scripts.OnEnter !== undefined)).toBe(true);
    });
});
