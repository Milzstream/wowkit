import { createWorld, describe, expect, it, playAs, PRIEST, type World } from "@wowkit/test-kit";
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
            { customCues: [{ id: FIRST, kind: "buff" }] },
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
        for (let click = 0; click < 10 && buttons[0]!.text !== "Missing buff"; click++) buttons[0]!.scripts.OnClick!(buttons[0]!);
        box.text = `${spellId}`;
        buttons[1]!.scripts.OnClick!(buttons[1]!);
    }

    function countIdBoxes(world: World, id: number): number {
        return world.frames.filter((frame) => frame.frameType === "EditBox" && frame.isShown && frame.text === `${id}`).length;
    }

    it("can be added, with a row of its own, before either is seen on a bar", () => {
        const world = createWorldWithFirst();
        addById(world, SECOND);
        expect(world.getSavedSettings()?.customCues).toEqual([
            { id: FIRST, kind: "buff" },
            { id: SECOND, kind: "buff" },
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
        for (const kind of ["Ready cooldown", "Low reagent", "Proc"]) {
            for (let click = 0; click < 10 && buttons[0]!.text !== kind; click++) buttons[0]!.scripts.OnClick!(buttons[0]!);
            box.text = `${SECOND}`;
            buttons[1]!.scripts.OnClick!(buttons[1]!);
            expect(world.notice()).toContain("Nutritious Food is a food or drink, add it as Missing buff.");
        }
        expect(world.getSavedSettings()?.customCues).toEqual([{ id: FIRST, kind: "buff" }]);
    });

    it("is refused when its very ID is in the list", () => {
        const world = createWorldWithFirst();
        addById(world, FIRST);
        expect(world.notice()).toContain("Nutritious Food is already in the list.");
    });
});
