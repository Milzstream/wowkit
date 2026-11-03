import { createWorld, describe, expect, it, playAs, PRIEST, type FakeFrame, type World } from "@wowkit/test-kit";
import { ARROW, createArcher } from "./low-stock.helpers";
import { findLabel, toggleTable } from "./table.helpers";

describe("the Below column and the low stock in the table", () => {
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
        expect(world.getSavedSettings()?.addedSpells).toEqual([{ id: ARROW, reminderType: "lowStock" }]);
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
        const belowLimits = findBoxes(world, "Rough Arrow")[2]!;
        expect(belowLimits.text).toBe("20");
        enter(belowLimits, "200");
        world.advance(1);
        expect(world.getSavedSettings()?.belowLimits).toEqual({ [`lowStock:${ARROW}`]: 200 });
        expect(world.glowsOn(1)).toBe(1);
    });

    it("keeps the old number when the box is left empty", () => {
        const belowLimits = findBoxes(createOpenTable(), "Rough Arrow")[2]!;
        enter(belowLimits, "");
        expect(belowLimits.text).toBe("20");
    });

    it("sets the limit of the type on the type's row", () => {
        const world = createOpenTable();
        enter(findBoxes(world, "Low stock")[2]!, "200");
        world.advance(1);
        expect(world.getSavedSettings()?.stockBelow).toBe(200);
        expect(findBoxes(world, "Rough Arrow")[2]!.text).toBe("200");
    });

    it("has no Below on a row of another type", () => {
        const world = createOpenTable();
        const boxes = findBoxes(world, "Missing buff");
        expect(boxes[boxes.length - 1]!.isShown).toBe(false);
    });

    it("is no longer on the Settings page", () => {
        const world = createArcher(100);
        expect(findLabel(world, "Reagents")).toBeUndefined();
    });
});
