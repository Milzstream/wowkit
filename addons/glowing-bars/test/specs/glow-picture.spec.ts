import {
    createWorld,
    describe,
    expect,
    fakeFlipbooks,
    FORTITUDE,
    GAMEPAD_BAR,
    it,
    learnSpell,
    playAs,
    PRIEST,
    type FakeFrame,
    type World,
} from "@wowkit/test-kit";
import { findLabel, toggleTable } from "./table.helpers";

function findPicture(world: World): FakeFrame {
    return world.frames.find((frame) => frame.template === "ActionButtonSpellAlertTemplate" && frame.isShown)!.ProcLoopFlipbook!;
}

describe("a glow switched to Breathing (ants), to Circling (ants), then back", () => {
    it("stands still again: the picture it stood on before does not hide the sheet", () => {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, FORTITUDE);
                state.bars[1] = FORTITUDE.id;
            },
            { styles: { missingBuff: { animation: "breathing" } } },
        );
        world.advance(1);
        expect(findPicture(world).alpha).toBe(1);
        toggleTable();
        const row = findLabel(world, "Missing buff")!.parent;
        for (const choice of ["Circling (ants)", "Breathing (ants)"]) {
            const button = world.frames.find((frame) => frame.parent === row && frame.frameType === "Button" && frame.width === 106)!;
            world.pickFromMenu(button, choice);
            world.advance(2);
        }
        expect(findPicture(world).alpha).toBe(1);
    });
});

describe("a glow standing still, as the game still loads", () => {
    it("never shows the whole sheet of its pictures: it waits until the animation has one to stand on", () => {
        fakeFlipbooks.isStalled = true;
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, FORTITUDE);
                state.bars[1] = FORTITUDE.id;
            },
            { styles: { missingBuff: { animation: "breathing" } } },
        );
        world.advance(1);
        const picture = findPicture(world);
        expect(picture.alpha).toBe(0);
        fakeFlipbooks.isStalled = false;
        world.advance(1);
        expect(picture.alpha).toBe(1);
    });
});

describe("a priest in Forever's gamepad mode, with each look of the glow", () => {
    /** The first button of the left gamepad bar is square (slot 185), of the right one round (slot 193). */
    const BUTTONS = [
        [185, `${GAMEPAD_BAR}PageUnitLeftCenteredAnchorLeftBarActionButton1`],
        [193, `${GAMEPAD_BAR}PageUnitRightCenteredAnchorRightBarActionButton1`],
    ] as const;
    for (const animation of ["circling", "clean", "breathing", "breathingClean", "none", "noneClean"] as const) {
        for (const [slot, name] of BUTTONS) {
            it(`sees the missing buff glow by the button of slot ${slot} with ${animation}`, () => {
                const world = createWorld(
                    (state) => {
                        playAs(state, PRIEST);
                        learnSpell(state, FORTITUDE);
                        state.bars[slot] = FORTITUDE.id;
                    },
                    { styles: { missingBuff: { animation } } },
                );
                world.advance(1);
                expect(world.glowsOnFrame(name)).toBe(1);
            });
        }
    }
});
