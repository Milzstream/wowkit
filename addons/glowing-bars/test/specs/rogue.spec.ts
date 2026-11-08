import {
    beforeEach,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    createWorld,
    type World,
    DEADLY_POISON,
    INSTANT_POISON,
    ROGUE,
} from "@wowkit/test-kit";

const MAIN_HAND = 16;
const OFF_HAND = 17;
const ONE_HOUR_MS = 3600 * 1000;
/** Enchant IDs the client reports while a poison is on a weapon (src/data/weapon-buffs.ts). */
const INSTANT_ENCHANT = 323;
const DEADLY_ENCHANT = 7;

function poisonLasting(enchantID: number, seconds: number): { enchantID: number; remainingTimeMs: number } {
    return { enchantID, remainingTimeMs: seconds * 1000 };
}

describe("a rogue with two weapons", () => {
    let world!: World;

    // Instant Poison is on button 5 and Deadly Poison on button 6. The main hand takes Instant by
    // default and the off-hand Deadly; the world is two seconds into the session
    beforeEach(() => {
        world = createWorld((state) => {
            playAs(state, ROGUE);
            learnSpell(state, INSTANT_POISON);
            learnSpell(state, DEADLY_POISON);
            state.bars[5] = INSTANT_POISON.id;
            state.bars[6] = DEADLY_POISON.id;
            state.equippedItems[MAIN_HAND] = 1234;
            state.equippedItems[OFF_HAND] = 5678;
        });
        world.advance(2);
    });

    it("is asked for the main hand poison first when neither weapon is coated", () => {
        expect(world.glowsOn(5)).toBe(1);
        expect(world.glowsOn(6)).toBe(0);
    });

    // The enchant event is taken for the player's own cast: a grace time of three seconds starts
    it("is asked for the off-hand poison once the main hand is coated", () => {
        world.state.enchants[MAIN_HAND] = poisonLasting(INSTANT_ENCHANT, 3600);
        world.fire("WEAPON_ENCHANT_CHANGED");
        world.advance(4);
        expect(world.glowsOn(5)).toBe(0);
        expect(world.glowsOn(6)).toBe(1);
    });

    it("sees no glow when both weapons are coated", () => {
        world.state.enchants[MAIN_HAND] = poisonLasting(INSTANT_ENCHANT, 3600);
        world.state.enchants[OFF_HAND] = poisonLasting(DEADLY_ENCHANT, 3600);
        world.fire("WEAPON_ENCHANT_CHANGED");
        world.advance(2);
        expect(world.glowsOn(5)).toBe(0);
        expect(world.glowsOn(6)).toBe(0);
    });

    it("is asked for a poison that is about to run out", () => {
        world.state.enchants[MAIN_HAND] = poisonLasting(INSTANT_ENCHANT, 3600);
        world.state.enchants[OFF_HAND] = poisonLasting(DEADLY_ENCHANT, 20);
        world.fire("WEAPON_ENCHANT_CHANGED");
        world.advance(2);
        expect(world.glowsOn(5)).toBe(0);
        expect(world.glowsOn(6)).toBe(1);
    });

    it("is asked for the poison picked on the Settings page when another one is on the weapon", () => {
        world.setOption("weaponBuff", "InstantPoison");
        // Deadly Poison on the main hand, where Instant Poison is picked
        world.state.enchants[MAIN_HAND] = poisonLasting(DEADLY_ENCHANT, ONE_HOUR_MS / 1000);
        world.state.enchants[OFF_HAND] = poisonLasting(DEADLY_ENCHANT, ONE_HOUR_MS / 1000);
        world.fire("WEAPON_ENCHANT_CHANGED");
        world.advance(4);
        expect(world.glowsOn(5)).toBe(1);
    });

    it("keeps the poison put on last, on its own, when it is on the automatic pick", () => {
        // Deadly Poison on both hands, Instant Poison first in the automatic order of the main hand
        world.state.enchants[MAIN_HAND] = poisonLasting(DEADLY_ENCHANT, ONE_HOUR_MS / 1000);
        world.state.enchants[OFF_HAND] = poisonLasting(DEADLY_ENCHANT, ONE_HOUR_MS / 1000);
        world.fire("WEAPON_ENCHANT_CHANGED");
        world.advance(4);
        expect(world.glowsOn(5)).toBe(0);
        expect(world.glowsOn(6)).toBe(0);
        // The main hand runs dry: Deadly Poison, put on it last, is asked for, not Instant Poison
        world.state.enchants[MAIN_HAND] = undefined;
        world.fire("WEAPON_ENCHANT_CHANGED");
        world.advance(4);
        expect(world.glowsOn(6)).toBe(1);
        expect(world.glowsOn(5)).toBe(0);
    });

    it("stays quiet when the client gives no answer", () => {
        world.state.areEnchantReadsBroken = true;
        world.advance(3);
        expect(world.glowsOn(5)).toBe(0);
        expect(world.glowsOn(6)).toBe(0);
    });

    it("does not wait for the main hand poison for ever after a cast", () => {
        world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-guid", INSTANT_POISON.id);
        world.advance(0.5);
        expect(world.glowsOn(5)).toBe(0);
        world.advance(5);
        expect(world.glowsOn(5)).toBe(1);
    });
});

describe("a rogue with the poison items on the bars, as in the game", () => {
    /** The items of Instant Poison and the spells they cast, rank I to VI (from the game). */
    const INSTANT = [
        { item: 6947, spell: 8679, name: "Instant Poison" },
        { item: 6949, spell: 8686, name: "Instant Poison II" },
        { item: 6950, spell: 8688, name: "Instant Poison III" },
        { item: 8926, spell: 11338, name: "Instant Poison IV" },
        { item: 8927, spell: 11339, name: "Instant Poison V" },
        { item: 8928, spell: 11340, name: "Instant Poison VI" },
    ];

    /** A rogue with one weapon, nothing learned of the poisons, and these ranks (1 to 6) on buttons 11 and on, with these many in the bags. */
    function createRogueWorld(ranks: number[], counts: number[]): World {
        const world = createWorld((state) => {
            playAs(state, ROGUE);
            ranks.forEach((rank, index) => {
                const poison = INSTANT[rank - 1]!;
                state.spells[poison.spell] = { id: poison.spell, name: poison.name, rank: 1, icon: 132273, isHelpful: true };
                state.itemUseSpells[poison.item] = poison.spell;
                state.barItems[11 + index] = poison.item;
                state.bags[poison.item] = counts[index];
            });
            state.equippedItems[MAIN_HAND] = 1234;
        });
        world.advance(2);
        return world;
    }

    it("sees the item of the missing poison glow, although nothing of it is learned", () => {
        expect(createRogueWorld([6], [20]).glowsOn(11)).toBe(1);
    });

    it("sees only the highest rank glow while there is some of it", () => {
        const world = createRogueWorld([5, 6], [5, 5]);
        expect(world.glowsOn(12)).toBe(1);
        expect(world.glowsOn(11)).toBe(0);
    });

    it("sees the lower rank glow once the higher one is used up", () => {
        const world = createRogueWorld([5, 6], [5, 0]);
        expect(world.glowsOn(11)).toBe(1);
        expect(world.glowsOn(12)).toBe(0);
    });

    it("sees the highest rank glow when there is none of either", () => {
        const world = createRogueWorld([5, 6], [0, 0]);
        expect(world.glowsOn(12)).toBe(1);
        expect(world.glowsOn(11)).toBe(0);
    });

    it("sees only rank VI glow beside the first rank, which has no numeral", () => {
        const world = createRogueWorld([1, 6], [5, 5]);
        expect(world.glowsOn(12)).toBe(1);
        expect(world.glowsOn(11)).toBe(0);
    });

    it("sees only rank VI glow beside a button of the first rank's spell, which shares its icon", () => {
        const world = createRogueWorld([6], [5]);
        world.state.knownSpells[8679] = true;
        world.state.spells[8679] = { id: 8679, name: "Instant Poison", rank: 1, icon: 132273, isHelpful: true };
        world.state.bars[12] = 8679;
        world.fire("ACTIONBAR_SLOT_CHANGED", 12);
        world.advance(2);
        // Rank I sits on the bars now (the spell button): with none of its item, rank VI, which the player has, glows
        expect(world.glowsOn(11)).toBe(1);
        expect(world.glowsOn(12)).toBe(0);
    });

    it("sees no glow with no poison on the bars", () => {
        expect(createRogueWorld([], []).glowsOn(11)).toBe(0);
    });
});
