import { createWorld, describe, expect, it, learnSpell, playAs, WARRIOR, type SpellDefinition, type World } from "@wowkit/test-kit";

const SHIELD_BLOCK: SpellDefinition = { id: 2565, name: "Shield Block", rank: 1, icon: 132110, isHelpful: true, cooldownSeconds: 5 };

/** A warrior in a fight, the game hiding the buffs, with Shield Block added as a missing buff and just cast. */
function createFightWorld(): World {
    const world = createWorld(
        (state) => {
            playAs(state, WARRIOR);
            learnSpell(state, SHIELD_BLOCK);
            state.bars[1] = SHIELD_BLOCK.id;
            state.isInCombat = true;
            // In a fight the game hides the buffs and the cooldowns
            state.areAurasHidden = true;
            state.areCooldownsHidden = true;
        },
        { addedSpells: [{ id: SHIELD_BLOCK.id, reminderType: "missingBuff" }] },
    );
    world.advance(1);
    world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-1", SHIELD_BLOCK.id);
    world.advance(1);
    return world;
}

describe("a warrior who added Shield Block as a missing buff, in a fight", () => {
    it("sees no glow while it lasts, and the glow back once its 7 seconds are up", () => {
        const world = createFightWorld();
        expect(world.glowsOn(1)).toBe(0);
        world.advance(4);
        expect(world.glowsOn(1)).toBe(0);
        world.advance(3);
        expect(world.glowsOn(1)).toBe(1);
    });

    it("sees the glow back once its blocks are used up and its cooldown is over, not before", () => {
        const world = createFightWorld();
        world.fire("UNIT_COMBAT", "player", "BLOCK", "", 0, 1);
        world.advance(0.6);
        expect(world.glowsOn(1)).toBe(0);
        world.fire("UNIT_COMBAT", "player", "WOUND", "BLOCK_REDUCED", 80, 1);
        world.advance(0.6);
        // The blocks are used up, but its 5 second cooldown is not over yet
        expect(world.glowsOn(1)).toBe(0);
        world.advance(3.5);
        expect(world.glowsOn(1)).toBe(1);
    });

    it("does not count a block of another unit, or a dodge", () => {
        const world = createFightWorld();
        world.fire("UNIT_COMBAT", "target", "BLOCK", "", 0, 1);
        world.fire("UNIT_COMBAT", "player", "DODGE", "", 0, 1);
        world.fire("UNIT_COMBAT", "player", "BLOCK", "", 0, 1);
        world.advance(0.6);
        expect(world.glowsOn(1)).toBe(0);
    });
});

describe("a warrior with Shield Block on the bar, without adding it", () => {
    function createWarriorWorld(isInCombat: boolean, isUsable: boolean): World {
        const world = createWorld((state) => {
            playAs(state, WARRIOR);
            learnSpell(state, SHIELD_BLOCK);
            state.bars[1] = SHIELD_BLOCK.id;
            state.isInCombat = isInCombat;
            if (!isUsable) state.unusableSpells[SHIELD_BLOCK.id] = true;
        });
        world.advance(1);
        return world;
    }

    it("sees it glow in a fight while it is not up", () => {
        expect(createWarriorWorld(true, true).glowsOn(1)).toBe(1);
    });

    it("sees no glow out of a fight: it lasts only 7 seconds", () => {
        expect(createWarriorWorld(false, true).glowsOn(1)).toBe(0);
    });

    it("sees no glow while it cannot be cast (another stance, no shield, no rage, on cooldown)", () => {
        expect(createWarriorWorld(true, false).glowsOn(1)).toBe(0);
    });
});
