// A clean line running around a button: Blizzard's own art for its rotation helper (its name says ants), played the way
// its template plays it, but in a frame of our own. Gray, so the reminder's color tints it.

/** The flipbook of the line: 30 pictures in 6 rows of 5, one turn a second (as Blizzard's template has it). */
const LINE_ATLAS = "rotationhelper_ants_flipbook";
const LINE_ROWS = 6;
const LINE_COLUMNS = 5;
const LINE_FRAMES = 30;
const LINE_SECONDS = 1;

/** A hidden frame around `button`, made in `parent`, with the line's art, gray. */
function createLineFrame(parent: Frame, button: ActionButton, level: number): { frame: Frame; texture: Texture } {
    const frame = CreateFrame("Frame", undefined, parent);
    frame.SetFrameStrata("MEDIUM");
    frame.SetFrameLevel(level);
    frame.SetPoint("CENTER", button, "CENTER", 0, 0);
    const texture = frame.CreateTexture(undefined, "OVERLAY");
    texture.SetAllPoints(frame);
    texture.SetAtlas(LINE_ATLAS, false, undefined, true);
    texture.SetDesaturated(true);
    frame.Hide();
    return { frame, texture };
}

/** The line around `button`, made in `parent`, hidden; it runs while it shows. */
export function createLineGlow(parent: Frame, button: ActionButton, level: number): { frame: Frame; texture: Texture } {
    const { frame, texture } = createLineFrame(parent, button, level);
    // (A client, or the fake game, without animations keeps the line still)
    const group = frame.CreateAnimationGroup() as AnimationGroup | undefined;
    const flipbook = group?.CreateAnimation("FlipBook") as FlipBookAnimation | undefined;
    if (group !== undefined && flipbook !== undefined) {
        flipbook.SetTarget(texture);
        flipbook.SetFlipBookRows(LINE_ROWS);
        flipbook.SetFlipBookColumns(LINE_COLUMNS);
        flipbook.SetFlipBookFrames(LINE_FRAMES);
        flipbook.SetFlipBookFrameWidth(0);
        flipbook.SetFlipBookFrameHeight(0);
        flipbook.SetDuration(LINE_SECONDS);
        group.SetLooping("REPEAT");
        frame.SetScript("OnShow", () => group.Play());
        frame.SetScript("OnHide", () => group.Stop());
    }
    return { frame, texture };
}
