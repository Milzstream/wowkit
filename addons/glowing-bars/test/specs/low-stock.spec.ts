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
    type FakeFrame,
    type World,
} from "@wowkit/test-kit";
import { findLabel, toggleTable } from "./table.helpers";

const ARROW = 2512;
const ARROW_KEY = 1000000000 + ARROW;

function createArcher(count: number, savedSettings: Record<string, unknown> = {}, isOnBars = true): World {
    const world = createWorld(
        (state) => {
            playAs(state, PRIEST);
            state.itemNames[ARROW] = "Rough Arrow";
            state.bags[ARROW] = count;
            if (isOnBars) state.barItems[1] = ARROW;
        },
        { customCues: [{ id: ARROW, kind: "stock" }], ...savedSettings },
    );
    world.advance(1);
    return world;
}

describe("an item added as low stock by its ID", () => {
    it("glows on its button once 20 or fewer are left, by default", () => {
        expect(createArcher(21).glowsOn(1)).toBe(0);
        expect(createArcher(20).glowsOn(1)).toBe(1);
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
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                state.itemNames[ARROW] = "Rough Arrow";
                state.bags[ARROW] = 5;
                state.isResting = true;
            },
            { customCues: [{ id: ARROW, kind: "stock" }] },
        );
        world.advance(1);
        expect(world.notice()).toContain("Running low: Rough Arrow (5)");
    });

    it("goes by the limit of its own row", () => {
        expect(createArcher(150, { lowAt: { [`stock:${ARROW}`]: 200 } }).glowsOn(1)).toBe(1);
    });

    it("goes by the limit of the kind's row, where its own has none", () => {
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
        const world = createArcher(10, { glowOn: { [`${ARROW_KEY}`]: false } });
        expect(world.glowsOn(1)).toBe(0);
        expect(world.notice()).not.toContain("Running low");
    });

    it("stays quiet when the kind is switched off", () => {
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
            { customCues: [{ id: ARROW, kind: "stock" }] },
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
        }, savedSettings);
        world.advance(2);
        return world;
    }

    it("is 5 by default", () => {
        expect(createPriest(5).glowsOn(1)).toBe(1);
        expect(createPriest(6).glowsOn(1)).toBe(0);
    });

    it("keeps what the character chose on the old Settings page, as the kind's", () => {
        expect(createPriest(8, { reagentLow: 10 }).glowsOn(1)).toBe(1);
    });

    it("can be set on the row of the reagent", () => {
        expect(createPriest(8, { lowAt: { [`reagent:${HOLY_CANDLE}`]: 10 } }).glowsOn(1)).toBe(1);
    });

    it("takes a limit that is not one of the old choices", () => {
        expect(createPriest(30, { reagentLow: 33 }).glowsOn(1)).toBe(1);
    });
});

describe("the Low at column and the low stock in the table", () => {
    function findBoxes(world: World, label: string): FakeFrame[] {
        const row = findLabel(world, label)!.parent;
        return world.frames.filter((frame) => frame.parent === row && frame.frameType === "EditBox");
    }

    function enter(box: FakeFrame, text: string): void {
        box.text = text;
        box.scripts.OnEditFocusLost!(box);
    }

    function createOpenTable(): World {
        const world = createArcher(100);
        toggleTable();
        return world;
    }

    it("shows the item's ID in its row, not what its buttons are found by", () => {
        expect(findBoxes(createOpenTable(), "Rough Arrow")[1]!.text).toBe(`${ARROW}`);
    });

    it("adds an item by its ID as low stock", () => {
        const world = createWorld((state) => playAs(state, PRIEST));
        world.advance(1);
        toggleTable();
        const box = world.frames.find(
            (frame) =>
                frame.frameType === "EditBox" &&
                !world.frames.some((other) => other.parent === frame.parent && other.frameType === "CheckButton"),
        )!;
        const buttons = world.frames.filter((frame) => frame.parent === box.parent && frame.template === "UIPanelButtonTemplate");
        for (let click = 0; click < 10 && buttons[0]!.text !== "Low stock"; click++) buttons[0]!.scripts.OnClick!(buttons[0]!);
        expect(buttons[0]!.text).toBe("Low stock");
        box.text = `${ARROW}`;
        buttons[1]!.scripts.OnClick!(buttons[1]!);
        expect(world.getSavedSettings()?.customCues).toEqual([{ id: ARROW, kind: "stock" }]);
    });

    it("removes the item of the row", () => {
        const world = createOpenTable();
        const row = findLabel(world, "Rough Arrow")!.parent;
        const remove = world.frames.filter((frame) => frame.parent === row && frame.template === "UIPanelButtonTemplate")[2]!;
        remove.scripts.OnClick!(remove);
        expect(world.getSavedSettings()?.customCues).toEqual([]);
    });

    it("sets the limit of the row", () => {
        const world = createOpenTable();
        const lowAt = findBoxes(world, "Rough Arrow")[2]!;
        expect(lowAt.text).toBe("20");
        enter(lowAt, "200");
        world.advance(1);
        expect(world.getSavedSettings()?.lowAt).toEqual({ [`stock:${ARROW}`]: 200 });
        expect(world.glowsOn(1)).toBe(1);
    });

    it("keeps the old number when the box is left empty", () => {
        const lowAt = findBoxes(createOpenTable(), "Rough Arrow")[2]!;
        enter(lowAt, "");
        expect(lowAt.text).toBe("20");
    });

    it("sets the limit of the kind on the kind's row", () => {
        const world = createOpenTable();
        enter(findBoxes(world, "Low stock")[2]!, "200");
        world.advance(1);
        expect(world.getSavedSettings()?.stockLow).toBe(200);
        expect(findBoxes(world, "Rough Arrow")[2]!.text).toBe("200");
    });

    it("has no Low at on a row of another kind", () => {
        const world = createOpenTable();
        const boxes = findBoxes(world, "Missing buff");
        expect(boxes[boxes.length - 1]!.isShown).toBe(false);
    });

    it("is no longer on the Settings page", () => {
        const world = createArcher(100);
        expect(findLabel(world, "Reagents")).toBeUndefined();
    });
});

describe("the tooltips of the low stock in the table", () => {
    function readTooltip(world: World, frame: FakeFrame): string | undefined {
        frame.scripts.OnEnter!(frame);
        return world.findFrame((other) => other.name === "GameTooltip")?.text;
    }

    function findEnabled(world: World, label: string): FakeFrame {
        const row = findLabel(world, label)!.parent;
        return world.frames.filter((frame) => frame.parent === row && frame.frameType === "CheckButton")[1]!;
    }

    function createOpenTable(): World {
        const world = createArcher(100);
        toggleTable();
        return world;
    }

    it("speak of the item on its row", () => {
        const world = createOpenTable();
        expect(readTooltip(world, findEnabled(world, "Rough Arrow"))).toBe("Turns the reminder for this item on or off.");
    });

    it("speak of items on the kind's row", () => {
        const world = createOpenTable();
        expect(readTooltip(world, findEnabled(world, "Low stock"))).toContain("none of its items glow");
    });

    it("ask for an item in the add row once Low stock is picked", () => {
        const world = createOpenTable();
        const box = world.frames.find(
            (frame) =>
                frame.frameType === "EditBox" &&
                !world.frames.some((other) => other.parent === frame.parent && other.frameType === "CheckButton"),
        )!;
        const kind = world.frames.filter((frame) => frame.parent === box.parent && frame.template === "UIPanelButtonTemplate")[0]!;
        expect(readTooltip(world, box)).toContain("Add a spell");
        for (let click = 0; click < 10 && kind.text !== "Low stock"; click++) kind.scripts.OnClick!(kind);
        expect(readTooltip(world, box)).toContain("Add an item");
    });
});

describe("the tooltip of Low at", () => {
    function readLowAtTip(world: World, label: string): string | undefined {
        const row = findLabel(world, label)!.parent;
        const box = world.frames.filter((frame) => frame.parent === row && frame.frameType === "EditBox")[2]!;
        box.scripts.OnEnter!(box);
        return world.findFrame((frame) => frame.name === "GameTooltip")?.text;
    }

    it("says what the number does on a row", () => {
        const world = createArcher(100);
        toggleTable();
        expect(readLowAtTip(world, "Rough Arrow")).toBe("Reminds you when you have this many or fewer.");
    });

    it("says on the kind's row that it is for all its rows", () => {
        const world = createArcher(100);
        toggleTable();
        expect(readLowAtTip(world, "Low stock")).toContain("Used for every row of this type");
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
            { customCues: [{ id: ARROW, kind: "stock" }], styles: { buff: { isTextOn: true } } },
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
