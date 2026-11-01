import { createWorld, describe, expect, it, playAs, PRIEST, type ClientState, type World } from "@wowkit/test-kit";
import { findLabel } from "./table.helpers";

/** A food of the fake game: using the item casts a spell named Food, whose buff ends with the eating. */
const FOOD_ITEM = 13935;
const FOOD_SPELL = 18233;
const ELIXIR_ITEM = 13452;
const ELIXIR_SPELL = 17538;
const WELL_FED = { name: "Well Fed", spellId: 19710, expirationTime: 99999 };

function setUpFood(state: ClientState, foodName: string): void {
    playAs(state, PRIEST);
    state.spells[FOOD_SPELL] = { id: FOOD_SPELL, name: foodName, rank: 1, icon: 1 };
    state.itemUseSpells[FOOD_ITEM] = FOOD_SPELL;
    state.barItems[1] = FOOD_ITEM;
    state.bags[FOOD_ITEM] = 5;
}

function createFoodWorld(isWellFed: boolean, foodName = "Food") {
    const world = createWorld(
        (state) => {
            setUpFood(state, foodName);
            if (isWellFed) state.auras.push(WELL_FED);
        },
        { customCues: [{ id: FOOD_SPELL, kind: "buff" }] },
    );
    world.advance(1);
    return world;
}

describe("a food added as a buff by the spell it casts", () => {
    it("glows while the player is not well fed", () => {
        expect(createFoodWorld(false).glowsOn(1)).toBe(1);
    });

    it("does not glow on a player who is well fed, whichever food gave it", () => {
        expect(createFoodWorld(true).glowsOn(1)).toBe(0);
    });

    it("goes by Well Fed for Forever's better food too, whose spell is called Nutritious Food", () => {
        expect(createFoodWorld(false, "Nutritious Food").glowsOn(1)).toBe(1);
        expect(createFoodWorld(true, "Nutritious Food").glowsOn(1)).toBe(0);
    });

    it("goes by Well Fed for Forever's better drink too, whose spell is called Nutritious Drink", () => {
        expect(createFoodWorld(false, "Nutritious Drink").glowsOn(1)).toBe(1);
        expect(createFoodWorld(true, "Nutritious Drink").glowsOn(1)).toBe(0);
    });

    it("glows again once the player is no longer well fed", () => {
        const world = createFoodWorld(true);
        world.state.auras = [];
        world.fire("UNIT_AURA", "player");
        world.advance(1);
        expect(world.glowsOn(1)).toBe(1);
    });
});

describe("an elixir added as a buff by the spell it casts", () => {
    function createElixirWorld(isUp: boolean) {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                state.spells[ELIXIR_SPELL] = { id: ELIXIR_SPELL, name: "Elixir of the Mongoose", rank: 1, icon: 1 };
                state.itemUseSpells[ELIXIR_ITEM] = ELIXIR_SPELL;
                state.barItems[1] = ELIXIR_ITEM;
                state.bags[ELIXIR_ITEM] = 5;
                if (isUp) state.auras.push({ name: "Elixir of the Mongoose", spellId: ELIXIR_SPELL, expirationTime: 99999 });
            },
            { customCues: [{ id: ELIXIR_SPELL, kind: "buff" }] },
        );
        world.advance(1);
        return world;
    }

    it("still goes by its own aura", () => {
        expect(createElixirWorld(false).glowsOn(1)).toBe(1);
        expect(createElixirWorld(true).glowsOn(1)).toBe(0);
    });
});

describe("a food on a Spanish client, where the client names the spells", () => {
    const NUTRITIOUS_FOOD = 1248377;
    const WELL_FED_NAMED = 19705;

    function createSpanishWorld(auras: { name: string; spellId: number; expirationTime: number }[]) {
        const world = createWorld(
            (state) => {
                setUpFood(state, "Comida nutritiva");
                state.spells[NUTRITIOUS_FOOD] = { id: NUTRITIOUS_FOOD, name: "Comida nutritiva", rank: 1, icon: 1 };
                state.spells[WELL_FED_NAMED] = { id: WELL_FED_NAMED, name: "Bien alimentado", rank: 1, icon: 1 };
                state.auras.push(...auras);
            },
            { customCues: [{ id: FOOD_SPELL, kind: "buff" }] },
        );
        world.advance(1);
        return world;
    }

    it("goes by the client's name of Well Fed", () => {
        expect(createSpanishWorld([]).glowsOn(1)).toBe(1);
        expect(createSpanishWorld([{ name: "Bien alimentado", spellId: 19710, expirationTime: 99999 }]).glowsOn(1)).toBe(0);
    });
});

describe("a food and a drink both added as buffs", () => {
    const DRINK_ITEM = 249876;
    const DRINK_SPELL = 1249919;
    const WELL_FED_DRINK = { name: "Well Fed", spellId: 1249926, expirationTime: 99999 };

    function createFedWorld(auras: (typeof WELL_FED)[], isDrinkOnBars = true) {
        const world = createWorld(
            (state) => {
                setUpFood(state, "Nutritious Food");
                state.spells[DRINK_SPELL] = { id: DRINK_SPELL, name: "Nutritious Drink", rank: 1, icon: 2 };
                state.itemUseSpells[DRINK_ITEM] = DRINK_SPELL;
                state.bags[DRINK_ITEM] = 5;
                if (isDrinkOnBars) state.barItems[2] = DRINK_ITEM;
                state.auras.push(...auras);
            },
            {
                customCues: [
                    { id: FOOD_SPELL, kind: "buff" },
                    { id: DRINK_SPELL, kind: "buff" },
                ],
            },
        );
        world.advance(1);
        return world;
    }

    it("both glow with no Well Fed", () => {
        const world = createFedWorld([]);
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("both still glow with one Well Fed: it cannot be told whose it is", () => {
        const world = createFedWorld([WELL_FED]);
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("both go out with two Well Fed", () => {
        const world = createFedWorld([WELL_FED, WELL_FED_DRINK]);
        expect(world.glowsOn(1)).toBe(0);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("one Well Fed is enough while the drink is on no bar", () => {
        expect(createFedWorld([WELL_FED], false).glowsOn(1)).toBe(0);
    });
});

describe("a food added as a buff, with none of it in the bags", () => {
    function createEmptyWorld(): World {
        const world = createWorld(
            (state) => {
                setUpFood(state, "Nutritious Food");
                state.bags[FOOD_ITEM] = 0;
            },
            { customCues: [{ id: FOOD_SPELL, kind: "buff" }], styles: { buff: { sound: "raidwarning" } } },
        );
        world.advance(1);
        return world;
    }

    it("does not glow, and plays no sound", () => {
        const world = createEmptyWorld();
        expect(world.glowsOn(1)).toBe(0);
        expect(world.sounds.length).toBe(0);
    });

    it("glows once there is some again", () => {
        const world = createEmptyWorld();
        world.state.bags[FOOD_ITEM] = 3;
        world.fire("BAG_UPDATE_DELAYED");
        world.advance(1);
        expect(world.glowsOn(1)).toBe(1);
    });

    it("goes out when the last one is gone", () => {
        const world = createEmptyWorld();
        world.state.bags[FOOD_ITEM] = 1;
        world.fire("BAG_UPDATE_DELAYED");
        world.advance(1);
        world.state.bags[FOOD_ITEM] = 0;
        world.fire("BAG_UPDATE_DELAYED");
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("glows only on the food there is, of two of one name", () => {
        const otherItem = 13936;
        const world = createWorld(
            (state) => {
                setUpFood(state, "Nutritious Food");
                state.bags[FOOD_ITEM] = 0;
                state.itemUseSpells[otherItem] = FOOD_SPELL;
                state.barItems[2] = otherItem;
                state.bags[otherItem] = 4;
            },
            { customCues: [{ id: FOOD_SPELL, kind: "buff" }] },
        );
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
        expect(world.glowsOn(2)).toBe(1);
    });
});

describe("a food added by the spell in its tooltip, with other foods of that name on the bars", () => {
    const OTHER_ITEM = 13936;
    const OTHER_SPELL = 18234;

    function createTwoFoods(savedSettings: Record<string, unknown>): World {
        const world = createWorld((state) => {
            setUpFood(state, "Nutritious Food");
            state.itemNames[FOOD_ITEM] = "Tender Wolf Steak";
            state.itemNames[OTHER_ITEM] = "Grilled Squid";
            state.spells[OTHER_SPELL] = { id: OTHER_SPELL, name: "Nutritious Food", rank: 1, icon: 1 };
            state.spells[1248377] = { id: 1248377, name: "Nutritious Food", rank: 1, icon: 1 };
            state.itemUseSpells[OTHER_ITEM] = OTHER_SPELL;
            state.barItems[2] = OTHER_ITEM;
            state.bags[OTHER_ITEM] = 5;
        }, savedSettings);
        world.advance(1);
        return world;
    }

    it("glows on its own button only", () => {
        const world = createTwoFoods({ customCues: [{ id: FOOD_SPELL, kind: "buff" }] });
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("does not glow when only another food of that name is on the bars", () => {
        const world = createTwoFoods({ customCues: [{ id: 18235, kind: "buff" }] });
        expect(world.glowsOn(1)).toBe(0);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("has a row of its own in the table under the item's name, one for each food", () => {
        const world = createTwoFoods({
            customCues: [
                { id: FOOD_SPELL, kind: "buff" },
                { id: OTHER_SPELL, kind: "buff" },
            ],
        });
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        expect(findLabel(world, "Tender Wolf Steak")).toBeDefined();
        expect(findLabel(world, "Grilled Squid")).toBeDefined();
    });

    it("keeps the item's name when the item has left the bars", () => {
        const world = createTwoFoods({ customCues: [{ id: FOOD_SPELL, kind: "buff" }], fedItems: { [`${FOOD_SPELL}`]: FOOD_ITEM } });
        world.state.barItems[1] = undefined;
        world.fire("ACTIONBAR_SLOT_CHANGED", 1);
        world.advance(2);
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        expect(findLabel(world, "Tender Wolf Steak")).toBeDefined();
    });
});

describe("the table of a character who added no food", () => {
    it("has no row of food or drink", () => {
        const world = createWorld((state) => setUpFood(state, "Nutritious Food"));
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        expect(findLabel(world, "Nutritious Food")).toBeUndefined();
        expect(findLabel(world, "Nutritious Drink")).toBeUndefined();
    });
});
