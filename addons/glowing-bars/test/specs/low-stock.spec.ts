import {
    createWorld,
    describe,
    expect,
    HOLY_CANDLE,
    it,
    learnSpell,
    playAs,
    FORTITUDE,
    PRAYER_OF_FORTITUDE,
    PRIEST,
    type World,
} from "@wowkit/test-kit";
import { findLabel, toggleTable } from "./table.helpers";
import { ARROW, ARROW_KEY, createArcher } from "./low-stock.helpers";

describe("an item added as low stock by its ID", () => {
    it("glows on its button once fewer than 20 are left, by default", () => {
        expect(createArcher(20).glowsOn(1)).toBe(0);
        expect(createArcher(19).glowsOn(1)).toBe(1);
    });

    it("glows when none is left too", () => {
        expect(createArcher(0).glowsOn(1)).toBe(1);
    });

    it("names the item and what is left in its message", () => {
        expect(createArcher(12).notice()).toContain("Running low: Rough Arrow (12)");
    });

    it("says so and plays its sound while it is on no bar, where nothing can glow", () => {
        const world = createArcher(12, { styles: { stock: { sound: "raidwarning" } } }, false);
        expect(world.notice()).toContain("Running low: Rough Arrow (12)");
        expect(world.sounds.length).toBe(1);
    });

    it("says so out of a town and in one", () => {
        expect(createArcher(5, {}, false, false).notice()).toContain("Running low: Rough Arrow (5)");
        expect(createArcher(5, {}, false, true).notice()).toContain("Running low: Rough Arrow (5)");
    });

    it("goes by the limit of its own row", () => {
        expect(createArcher(150, { lowAt: { [`stock:${ARROW}`]: 200 } }).glowsOn(1)).toBe(1);
    });

    it("goes by the limit of the type's row, where its own has none", () => {
        expect(createArcher(150, { stockLow: 200 }).glowsOn(1)).toBe(1);
    });

    it("stops when there are enough again", () => {
        const world = createArcher(10);
        world.state.bags[ARROW] = 200;
        world.fire("BAG_UPDATE_DELAYED");
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
        expect(world.notice()).not.toContain("Running low");
    });

    it("stays quiet when its row is switched off", () => {
        const world = createArcher(10, { enabledSpells: { [`${ARROW_KEY}`]: false } });
        expect(world.glowsOn(1)).toBe(0);
        expect(world.notice()).not.toContain("Running low");
    });

    it("stays quiet when the type is switched off", () => {
        expect(createArcher(10, { showStock: false }).glowsOn(1)).toBe(0);
    });

    it("has a row of its own in the table, under the item's name", () => {
        const world = createArcher(100);
        toggleTable();
        expect(findLabel(world, "Rough Arrow")).toBeDefined();
        expect(findLabel(world, "Low stock")).toBeDefined();
    });

    it("does not glow on a button of another item", () => {
        const other = 2516;
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                state.bags[ARROW] = 5;
                state.bags[other] = 5;
                state.barItems[1] = other;
            },
            { addedSpells: [{ id: ARROW, reminderType: "stock" }] },
        );
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
    });
});

describe("the limit of a low reagent", () => {
    function createPriest(candles: number, savedSettings: Record<string, unknown> = {}): World {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            learnSpell(state, PRAYER_OF_FORTITUDE);
            state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
            state.bags[HOLY_CANDLE] = candles;
            state.bars[1] = PRAYER_OF_FORTITUDE.id;
            state.isResting = true;
        }, savedSettings);
        world.advance(2);
        return world;
    }

    it("is below 10 by default", () => {
        expect(createPriest(9).glowsOn(1)).toBe(1);
        expect(createPriest(10).glowsOn(1)).toBe(0);
    });

    it("keeps what the character chose on the old Settings page, as the type's", () => {
        expect(createPriest(8, { reagentLow: 10 }).glowsOn(1)).toBe(1);
    });

    it("can be set on the row of the reagent", () => {
        expect(createPriest(8, { lowAt: { [`reagent:${HOLY_CANDLE}`]: 10 } }).glowsOn(1)).toBe(1);
    });

    it("takes a limit that is not one of the old choices", () => {
        expect(createPriest(30, { reagentLow: 33 }).glowsOn(1)).toBe(1);
    });
});

describe("the message of a low stock", () => {
    it("comes once while its repeat is off", () => {
        const world = createArcher(12);
        world.state.bags[ARROW] = 3;
        world.advance(61);
        expect(world.notice()).not.toContain("Running low");
    });

    it("comes again as often as its repeat says, with what is left by then", () => {
        const world = createArcher(12, { styles: { stock: { repeat: 10 } } });
        world.state.bags[ARROW] = 3;
        world.advance(11);
        expect(world.notice()).toContain("Running low: Rough Arrow (3)");
    });

    it("does not come back with the message of another reminder", () => {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, FORTITUDE);
                state.bars[2] = FORTITUDE.id;
                state.itemNames[ARROW] = "Rough Arrow";
                state.bags[ARROW] = 12;
            },
            { addedSpells: [{ id: ARROW, reminderType: "stock" }], styles: { buff: { isMessageOn: true } } },
        );
        world.advance(1);
        expect(world.notice()).toContain("Running low: Rough Arrow (12)");
        world.advance(31);
        expect(world.notice()).not.toContain("Running low");
    });

    it("comes once more after the item was refilled and runs low again", () => {
        const world = createArcher(12);
        world.state.bags[ARROW] = 200;
        world.fire("BAG_UPDATE_DELAYED");
        world.advance(1);
        world.state.bags[ARROW] = 3;
        world.fire("BAG_UPDATE_DELAYED");
        world.advance(1);
        expect(world.notice()).toContain("Running low: Rough Arrow (3)");
    });
});

describe("two items running low one after the other", () => {
    const WATER = 1179;

    it("show together while the first is still up, and neither comes again", () => {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                state.itemNames[ARROW] = "Rough Arrow";
                state.itemNames[WATER] = "Ice Cold Milk";
                state.bags[ARROW] = 5;
                state.bags[WATER] = 100;
            },
            {
                addedSpells: [
                    { id: ARROW, reminderType: "stock" },
                    { id: WATER, reminderType: "stock" },
                ],
            },
        );
        world.advance(2);
        world.state.bags[WATER] = 3;
        world.fire("BAG_UPDATE_DELAYED");
        world.advance(1);
        expect(world.notice()).toContain("Rough Arrow (5)");
        expect(world.notice()).toContain("Ice Cold Milk (3)");
        world.advance(40);
        expect(world.notice()).not.toContain("Running low");
    });
});
