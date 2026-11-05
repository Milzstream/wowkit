// A game with only a clock, frames and the chat: for the tests of a package, which needs no addon (and so no world).
import { createClock, type FakeClock } from "./clock";
import { clearGlobal, readGlobal } from "./define";
import { createFrameRegistry, type FrameRegistry } from "./frames";
import { installClock } from "./install-clock";
import { installUi } from "./install-ui";

export interface BasicGame {
    clock: FakeClock;
    frames: FrameRegistry;
    chat: string[];
    /** The text of the notice area on the screen, or an empty text when it is hidden. */
    readNotice(): string;
}

export function createBasicGame(): BasicGame {
    clearGlobal("WowkitNotices");
    const clock = createClock();
    const frames = createFrameRegistry();
    const chat: string[] = [];
    installClock(clock);
    installUi(frames, chat, {}, { choices: [] });
    return {
        clock,
        frames,
        chat,
        readNotice() {
            const noticeFrame = frames.all.find((frame) => frame.parent === readGlobal("UIParent") && frame.fontStrings.length > 0);
            return noticeFrame?.isShown ? (noticeFrame.fontStrings[0]?.text ?? "") : "";
        },
    };
}
