// A still picture of the loop of Blizzard's glow: the loop plays for a moment, and is stopped on the picture it reached.

/** How soon to look again at a loop that has not reached a picture yet. */
const RETRY_SECONDS = 0.1;

/**
 * Stops the loop on the picture it has reached. It may have reached none yet, as the game still loads, and then shows
 * the whole sheet of its pictures: it is looked at again later, unseen until then.
 */
function applyLoopPicture(alert: SpellAlertFrame, picture: Texture, sheetWidth: number, then: (this: void) => void, delay: number): void {
    C_Timer.After(delay, () => {
        // Put out in the meantime: nothing to keep
        if (!alert.IsShown()) return;
        const [ulX, ulY, llX, llY, urX, urY, lrX, lrY] = picture.GetTexCoord();
        if (urX - ulX > sheetWidth * 0.9) return applyLoopPicture(alert, picture, sheetWidth, then, RETRY_SECONDS);
        alert.ProcLoop!.Stop();
        picture.SetTexCoord(ulX, ulY, llX, llY, urX, urY, lrX, lrY);
        picture.SetAlpha(1);
        then();
    });
}

/** A picture of the loop's flipbook (of this atlas), standing still; `then` runs once it stands (a frame later at the soonest). */
export function showLoopPicture(alert: SpellAlertFrame, atlas: string, then: (this: void) => void): void {
    const picture = alert.ProcLoopFlipbook;
    if (picture === undefined) return;
    // The whole sheet of its pictures, which nothing may see. The coordinates set by hand the last time it stood still
    // stay through a new atlas unless it resets them: the sheet would then seem one picture wide, and the loop never stop
    picture.SetAtlas(atlas, false, undefined, true);
    picture.SetAlpha(0);
    const [sheetLeft, , , , sheetRight] = picture.GetTexCoord();
    picture.Show();
    alert.ProcLoop!.Play();
    applyLoopPicture(alert, picture, sheetRight - sheetLeft, then, 0);
}
