import {
    createWorld,
    describe,
    expect,
    fakeFlipbooks,
    FORTITUDE,
    it,
    learnSpell,
    playAs,
    PRIEST,
    type FakeFrame,
    type World,
} from "@wowkit/test-kit";

function findPicture(world: World): FakeFrame {
    return world.frames.find((frame) => frame.template === "ActionButtonSpellAlertTemplate" && frame.isShown)!.ProcLoopFlipbook!;
}

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
