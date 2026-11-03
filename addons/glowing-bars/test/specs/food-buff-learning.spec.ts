import { createWorld, describe, expect, it, playAs, PRIEST, type ClientState, type World } from "@wowkit/test-kit";

/** A food of the fake game: using the item casts a spell named Nutritious Food, whose buff ends with the eating. */
const FOOD_ITEM = 13935;
const FOOD_SPELL = 18233;

function setUpFood(state: ClientState, foodName: string): void {
    playAs(state, PRIEST);
    state.spells[FOOD_SPELL] = { id: FOOD_SPELL, name: foodName, rank: 1, icon: 1 };
    state.itemUseSpells[FOOD_ITEM] = FOOD_SPELL;
    state.barItems[1] = FOOD_ITEM;
    state.bags[FOOD_ITEM] = 5;
}

describe("a food and a drink the player has used", () => {
    const DRINK_ITEM = 249876;
    const DRINK_SPELL = 1249919;
    const FOOD_FED = { name: "Well Fed", spellId: 1248420, expirationTime: 2000 };
    const DRINK_FED = { name: "Well Fed", spellId: 1249926, expirationTime: 2500 };
    const EATING = { name: "Nutritious Food", spellId: FOOD_SPELL, expirationTime: 99999 };
    const LEARNED_BOTH = { fedBuffs: { [`${FOOD_SPELL}`]: FOOD_FED.spellId, [`${DRINK_SPELL}`]: DRINK_FED.spellId } };

    function createWorldWithBoth(savedSettings: Record<string, unknown> = {}): World {
        const world = createWorld(
            (state) => {
                setUpFood(state, "Nutritious Food");
                state.spells[DRINK_SPELL] = { id: DRINK_SPELL, name: "Nutritious Drink", rank: 1, icon: 2 };
                state.itemUseSpells[DRINK_ITEM] = DRINK_SPELL;
                state.barItems[2] = DRINK_ITEM;
                state.bags[DRINK_ITEM] = 5;
            },
            {
                addedSpells: [
                    { id: FOOD_SPELL, reminderType: "buff" },
                    { id: DRINK_SPELL, reminderType: "buff" },
                ],
                ...savedSettings,
            },
        );
        world.advance(1);
        return world;
    }

    function use(world: World, spellId: number): void {
        world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-guid", spellId);
        world.state.auras.push(EATING);
        world.fire("UNIT_AURA", "player");
        world.advance(0.5);
    }

    function gain(world: World, ...auras: (typeof FOOD_FED)[]): void {
        world.state.auras.push(...auras);
        world.fire("UNIT_AURA", "player");
        world.advance(0.5);
    }

    function readLearned(world: World): { [spell: string]: number | undefined } {
        return world.getSavedSettings()?.fedBuffs as { [spell: string]: number | undefined };
    }

    it("learns which Well Fed came after the food", () => {
        const world = createWorldWithBoth();
        use(world, FOOD_SPELL);
        gain(world, FOOD_FED);
        expect(readLearned(world)[`${FOOD_SPELL}`]).toBe(FOOD_FED.spellId);
    });

    it("then knows the food is up and the drink is the one missing", () => {
        const world = createWorldWithBoth(LEARNED_BOTH);
        gain(world, FOOD_FED);
        expect(world.glowsOn(1)).toBe(0);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("then knows the drink is up and the food is the one missing", () => {
        const world = createWorldWithBoth(LEARNED_BOTH);
        gain(world, DRINK_FED);
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("gives two used one after the other their Well Fed in that order", () => {
        const world = createWorldWithBoth();
        use(world, FOOD_SPELL);
        use(world, DRINK_SPELL);
        gain(world, FOOD_FED);
        gain(world, DRINK_FED);
        expect(readLearned(world)[`${FOOD_SPELL}`]).toBe(FOOD_FED.spellId);
        expect(readLearned(world)[`${DRINK_SPELL}`]).toBe(DRINK_FED.spellId);
    });

    it("tells two that come at one tick by what they have left, the first with the least", () => {
        const world = createWorldWithBoth();
        use(world, FOOD_SPELL);
        use(world, DRINK_SPELL);
        gain(world, DRINK_FED, FOOD_FED);
        expect(readLearned(world)[`${FOOD_SPELL}`]).toBe(FOOD_FED.spellId);
        expect(readLearned(world)[`${DRINK_SPELL}`]).toBe(DRINK_FED.spellId);
    });

    it("learns nothing from two that came at the same moment", () => {
        const world = createWorldWithBoth();
        use(world, FOOD_SPELL);
        use(world, DRINK_SPELL);
        gain(world, FOOD_FED, { ...DRINK_FED, expirationTime: FOOD_FED.expirationTime });
        expect(readLearned(world)[`${FOOD_SPELL}`]).toBeUndefined();
    });

    it("learns nothing when the eating stopped before a Well Fed came", () => {
        const world = createWorldWithBoth();
        use(world, FOOD_SPELL);
        world.state.auras = [];
        world.fire("UNIT_AURA", "player");
        world.advance(0.5);
        world.advance(2);
        gain(world, FOOD_FED);
        expect(readLearned(world)[`${FOOD_SPELL}`]).toBeUndefined();
    });

    it("learns nothing from a Well Fed that was on the player at the login", () => {
        const world = createWorld(
            (state) => {
                setUpFood(state, "Nutritious Food");
                state.auras.push(FOOD_FED);
            },
            { addedSpells: [{ id: FOOD_SPELL, reminderType: "buff" }] },
        );
        world.advance(1);
        expect(readLearned(world)[`${FOOD_SPELL}`]).toBeUndefined();
    });

    it("counts a learned spell as a food whatever it is called", () => {
        const world = createWorld(
            (state) => {
                setUpFood(state, "Brain Food");
                state.auras.push(FOOD_FED);
            },
            { addedSpells: [{ id: FOOD_SPELL, reminderType: "buff" }], fedBuffs: { [`${FOOD_SPELL}`]: FOOD_FED.spellId } },
        );
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
    });
});
