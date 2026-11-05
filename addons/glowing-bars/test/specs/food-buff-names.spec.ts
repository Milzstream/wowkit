import { createWorld, describe, expect, it, playAs, PRIEST, type FakeFrame, type World } from "@wowkit/test-kit";
import { toggleTable } from "./table.helpers";

describe("a second food of one name, added in the table", () => {
    const FIRST = 1248377;
    const SECOND = 1248401;

    function createWorldWithFirst(): World {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                state.spells[FIRST] = { id: FIRST, name: "Nutritious Food", rank: 1, icon: 1 };
                state.spells[SECOND] = { id: SECOND, name: "Nutritious Food", rank: 1, icon: 1 };
            },
            { addedSpells: [{ id: FIRST, reminderType: "missingBuff" }], isTableAdvanced: true },
        );
        world.advance(1);
        toggleTable();
        return world;
    }

    function addById(world: World, spellId: number): void {
        const box = world.frames.find(
            (frame) =>
                frame.frameType === "EditBox" &&
                !world.frames.some((other) => other.parent === frame.parent && other.frameType === "CheckButton"),
        )!;
        const buttons = world.frames.filter((frame) => frame.parent === box.parent && frame.template === "UIPanelButtonTemplate");
        world.pickFromMenu(buttons[0]!, "Missing buff");
        box.text = `${spellId}`;
        buttons[1]!.scripts.OnClick!(buttons[1]!);
    }

    function countIdBoxes(world: World, id: number): number {
        return world.frames.filter((frame) => frame.frameType === "EditBox" && frame.isShown && frame.text === `${id}`).length;
    }

    it("can be added, with a row of its own, before either is seen on a bar", () => {
        const world = createWorldWithFirst();
        addById(world, SECOND);
        expect(world.getSavedSettings()?.addedSpells).toEqual([
            { id: FIRST, reminderType: "missingBuff" },
            { id: SECOND, reminderType: "missingBuff" },
        ]);
        expect(world.notice()).not.toContain("already in the list");
        expect(countIdBoxes(world, FIRST)).toBe(1);
        expect(countIdBoxes(world, SECOND)).toBe(1);
    });

    it("is refused as anything but a buff", () => {
        const world = createWorldWithFirst();
        const box = world.frames.find(
            (frame) =>
                frame.frameType === "EditBox" &&
                !world.frames.some((other) => other.parent === frame.parent && other.frameType === "CheckButton"),
        )!;
        const buttons = world.frames.filter((frame) => frame.parent === box.parent && frame.template === "UIPanelButtonTemplate");
        for (const reminderType of ["Ready cooldown", "Low reagent", "Proc"]) {
            world.pickFromMenu(buttons[0]!, reminderType);
            box.text = `${SECOND}`;
            buttons[1]!.scripts.OnClick!(buttons[1]!);
            expect(world.notice()).toContain("Nutritious Food is a food or drink, add it as Missing buff.");
        }
        expect(world.getSavedSettings()?.addedSpells).toEqual([{ id: FIRST, reminderType: "missingBuff" }]);
    });

    it("is refused when its very ID is in the list", () => {
        const world = createWorldWithFirst();
        addById(world, FIRST);
        expect(world.notice()).toContain("Nutritious Food is already in the list.");
    });
});

describe("the look of two foods of one name", () => {
    const FIRST = 1248377;
    const SECOND = 1248401;

    function createWorldWithBoth(savedSettings: Record<string, unknown> = {}): World {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                state.spells[FIRST] = { id: FIRST, name: "Nutritious Food", rank: 1, icon: 1 };
                state.spells[SECOND] = { id: SECOND, name: "Nutritious Food", rank: 1, icon: 1 };
            },
            {
                isTableAdvanced: true,
                addedSpells: [
                    { id: FIRST, reminderType: "missingBuff" },
                    { id: SECOND, reminderType: "missingBuff" },
                ],
                ...savedSettings,
            },
        );
        world.advance(1);
        toggleTable();
        return world;
    }

    /** The message box of the row with this ID. */
    function findMessageBox(world: World, id: number): FakeFrame {
        const idBox = world.frames.find((frame) => frame.frameType === "EditBox" && frame.isShown && frame.text === `${id}`)!;
        return world.frames.filter((frame) => frame.parent === idBox.parent && frame.frameType === "CheckButton")[0]!;
    }

    it("is kept for each of them when one row is changed", () => {
        const world = createWorldWithBoth();
        const message = findMessageBox(world, FIRST);
        message.isChecked = true;
        message.scripts.OnClick!(message);
        expect(world.getSavedSettings()?.spellStyles).toEqual({ [`missingBuff:${FIRST}`]: { isMessageOn: true } });
        expect(findMessageBox(world, FIRST).isChecked).toBe(true);
        expect(findMessageBox(world, SECOND).isChecked).toBe(false);
    });
});

describe("the glow of two foods of one name, each with a color of its own", () => {
    const FIRST = 1248377;
    const SECOND = 1248401;
    const FIRST_ITEM = 200001;
    const SECOND_ITEM = 200002;

    function createWorldOnBars(looks: Record<string, unknown>): World {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                state.spells[FIRST] = { id: FIRST, name: "Nutritious Food", rank: 1, icon: 1 };
                state.spells[SECOND] = { id: SECOND, name: "Nutritious Food", rank: 1, icon: 1 };
                state.itemUseSpells[FIRST_ITEM] = FIRST;
                state.itemUseSpells[SECOND_ITEM] = SECOND;
                state.barItems[1] = FIRST_ITEM;
                state.barItems[2] = SECOND_ITEM;
                state.bags[FIRST_ITEM] = 5;
                state.bags[SECOND_ITEM] = 5;
            },
            {
                addedSpells: [
                    { id: FIRST, reminderType: "missingBuff" },
                    { id: SECOND, reminderType: "missingBuff" },
                ],
                spellStyles: looks,
            },
        );
        world.advance(1);
        return world;
    }

    it("shows one glow on each button, not both on both", () => {
        const world = createWorldOnBars({
            [`missingBuff:${FIRST}`]: { color: [1, 0, 0] },
            [`missingBuff:${SECOND}`]: { color: [0, 1, 0] },
        });
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("shows one glow on each button with the same color too", () => {
        const world = createWorldOnBars({});
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("keeps the glow of the other food when only one color is changed", () => {
        const world = createWorldOnBars({ [`missingBuff:${FIRST}`]: { color: [1, 0, 0] } });
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(1);
    });
});
