import { createWorld, describe, expect, it, playAs, PRIEST, type FakeFrame, type World } from "@wowkit/test-kit";
import { ARROW, createArcher } from "./low-stock.helpers";
import { findLabel, toggleTable } from "./table.helpers";

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
        expect(world.getSavedSettings()?.addedSpells).toEqual([{ id: ARROW, reminderType: "stock" }]);
    });

    it("removes the item of the row", () => {
        const world = createOpenTable();
        const row = findLabel(world, "Rough Arrow")!.parent;
        const remove = world.frames.filter((frame) => frame.parent === row && frame.template === "UIPanelButtonTemplate")[2]!;
        remove.scripts.OnClick!(remove);
        expect(world.getSavedSettings()?.addedSpells).toEqual([]);
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

    it("sets the limit of the type on the type's row", () => {
        const world = createOpenTable();
        enter(findBoxes(world, "Low stock")[2]!, "200");
        world.advance(1);
        expect(world.getSavedSettings()?.stockLow).toBe(200);
        expect(findBoxes(world, "Rough Arrow")[2]!.text).toBe("200");
    });

    it("has no Low at on a row of another type", () => {
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

    it("speak of items on the type's row", () => {
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
        const reminderType = world.frames.filter((frame) => frame.parent === box.parent && frame.template === "UIPanelButtonTemplate")[0]!;
        expect(readTooltip(world, box)).toContain("Add a spell");
        for (let click = 0; click < 10 && reminderType.text !== "Low stock"; click++) reminderType.scripts.OnClick!(reminderType);
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

    it("says on the type's row that it is for all its rows", () => {
        const world = createArcher(100);
        toggleTable();
        expect(readLowAtTip(world, "Low stock")).toContain("Used for every row of this type");
    });
});
