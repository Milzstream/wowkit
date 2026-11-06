// The fades of a glow that stands still: in as it lights, out as it goes, and the breathing of a breathing one, all on its
// picture (the frame's own opacity is the glow's, set by its glow %).

/** A still glow fades in and out this fast. */
export const STILL_FADE_SECONDS = 0.25;
/** A breathing glow fades between full and this opacity, half a second each way. */
export const PULSE_ALPHA = 0.45;
export const PULSE_SECONDS = 0.5;

export interface StillFades {
    fadeIn?: AnimationGroup;
    fadeOut?: AnimationGroup;
    breathe?: AnimationGroup;
}

/**
 * A fade of `picture`, in an animation group of `owner`. Undefined where the client (or the fake game) has no animations:
 * the glow then comes and goes at once.
 */
export function createPictureFade(
    owner: Frame,
    picture: ScriptRegion | undefined,
    fromAlpha: number,
    toAlpha: number,
    seconds: number,
): AnimationGroup | undefined {
    const group = owner.CreateAnimationGroup() as AnimationGroup | undefined;
    const fade = group?.CreateAnimation("Alpha") as AlphaAnimation | undefined;
    if (group === undefined || fade === undefined || picture === undefined) return undefined;
    fade.SetTarget(picture);
    fade.SetFromAlpha(fromAlpha);
    fade.SetToAlpha(toAlpha);
    fade.SetDuration(seconds);
    return group;
}

/** The three fades of a still glow's picture; faded out, `owner` hides. */
export function createStillFades(owner: Frame, picture: ScriptRegion | undefined): StillFades {
    const fades = {
        fadeIn: createPictureFade(owner, picture, 0, 1, STILL_FADE_SECONDS),
        fadeOut: createPictureFade(owner, picture, 1, 0, STILL_FADE_SECONDS),
        breathe: createPictureFade(owner, picture, 1, PULSE_ALPHA, PULSE_SECONDS),
    };
    fades.breathe?.SetLooping("BOUNCE");
    fades.fadeOut?.SetScript("OnFinished", () => owner.Hide());
    return fades;
}
