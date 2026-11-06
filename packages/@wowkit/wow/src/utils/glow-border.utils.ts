// The glow that stands still (breathing, or none): Blizzard's soft square frame of a buff that can be stolen or purged, as
// its target frame draws it around such a buff. One plain texture, desaturated, so the reminder's color tints it.

/** Blizzard's art: a soft glowing square frame. */
const BORDER_TEXTURE = "Interface\\TargetingFrame\\UI-TargetingFrame-Stealable";
/** Blizzard draws it 24 pixels on a 21 pixel buff icon: this much bigger than the button. */
export const BORDER_SCALE = 24 / 21;
/** The art is not quite centered in its file: it is moved this many pixels left and up. */
const BORDER_OFFSET_X = -1;
const BORDER_OFFSET_Y = 1;
/** The edge of the file is cut off, a pixel of its 32: drawn added, its faint edge would show as a square around the glow. */
const BORDER_TRIM = 1 / 32;

/** The frame around `button`, made in `parent`, hidden; its texture is in `inner` (the frame that breathes or fades). */
export function createSoftFrame(parent: Frame, button: ActionButton, level: number): { frame: Frame; inner: Frame; parts: Texture[] } {
    const frame = CreateFrame("Frame", undefined, parent);
    frame.SetFrameStrata("MEDIUM");
    frame.SetFrameLevel(level);
    // On the icon, where the button has one: the button's own frame may not be centered on what shows of it
    const icon = (button as { icon?: Texture }).icon;
    frame.SetPoint("CENTER", icon ?? button, "CENTER", BORDER_OFFSET_X, BORDER_OFFSET_Y);
    const inner = CreateFrame("Frame", undefined, frame);
    inner.SetAllPoints(frame);
    const texture = inner.CreateTexture(undefined, "OVERLAY");
    texture.SetAllPoints(inner);
    texture.SetTexture(BORDER_TEXTURE);
    texture.SetTexCoord(BORDER_TRIM, 1 - BORDER_TRIM, BORDER_TRIM, 1 - BORDER_TRIM);
    texture.SetBlendMode("ADD");
    texture.SetDesaturated(true);
    // Not rounded to whole pixels: its size is a fraction of the button's, and rounding pushes it to one side (as Blizzard's
    // own glows have it)
    texture.SetSnapToPixelGrid(false);
    texture.SetTexelSnappingBias(0);
    frame.Hide();
    return { frame, inner, parts: [texture] };
}
