// Sounds, chat lines and the on-screen notice.
//
// The notice is one frame in the upper middle of the screen that every addon using this service shares (the
// first one creates it and leaves it in the global WowkitNotices). Each addon owns a block of lines in it, so two
// addons showing a message at the same time stack their blocks instead of drawing over each other.
import { attempt } from "./utils/protected-call.utils";

export const NOTICE_SECONDS = 10;

/** The lines one addon shows, and the number of its latest message (an older timer must not remove a newer one). */
interface OwnedNotice {
    owner: string;
    text: string;
    token: number;
}

interface SharedNotices {
    frame: Frame;
    text: FontString;
    /** In the order the addons first showed something. */
    entries: OwnedNotice[];
}

declare global {
    var WowkitNotices: SharedNotices | undefined;
}

export class NoticeService {
    constructor(
        /** The addon that shows the messages: its block of lines in the shared notice. */
        private readonly owner: string,
    ) {}

    /** Plays a sound by its SOUNDKIT name, or by `fallbackId` when the client has no such name. */
    playSound(kitName: string | undefined, fallbackId: number): void {
        const soundKitId = (kitName !== undefined ? SOUNDKIT[kitName] : undefined) ?? fallbackId;
        attempt(C_Sound.PlaySound, soundKitId, undefined, true);
    }

    /** A line in the chat window. */
    printToChat(text: string): void {
        print(text);
    }

    /**
     * A message in the upper middle of the screen for NOTICE_SECONDS, under the messages of the other addons that are
     * showing one. (UIErrorsFrame fades a message after a second or two: too short to read.)
     */
    showNotice(text: string): void {
        const shared = this.getSharedNotices();
        let entry = shared.entries.find((candidate) => candidate.owner === this.owner);
        if (!entry) {
            entry = { owner: this.owner, text, token: 0 };
            shared.entries.push(entry);
        }
        entry.text = text;
        entry.token += 1;
        const token = entry.token;
        this.draw(shared);
        C_Timer.After(NOTICE_SECONDS, () => this.removeExpired(token));
    }

    /** This addon's message goes out now, without waiting for its time. */
    clearNotice(): void {
        const shared = WowkitNotices;
        if (!shared) return;
        const before = shared.entries.length;
        shared.entries = shared.entries.filter((candidate) => candidate.owner !== this.owner);
        if (shared.entries.length !== before) this.draw(shared);
    }

    /** This addon's message goes out, if no newer message replaced it. */
    private removeExpired(token: number): void {
        const shared = WowkitNotices;
        if (!shared) return;
        const entry = shared.entries.find((candidate) => candidate.owner === this.owner);
        if (!entry || entry.token !== token) return;
        shared.entries = shared.entries.filter((candidate) => candidate !== entry);
        this.draw(shared);
    }

    private draw(shared: SharedNotices): void {
        if (shared.entries.length === 0) {
            shared.frame.Hide();
            return;
        }
        shared.text.SetText(shared.entries.map((entry) => entry.text).join("\n"));
        shared.frame.Show();
    }

    private getSharedNotices(): SharedNotices {
        if (WowkitNotices) return WowkitNotices;
        const frame = CreateFrame("Frame", undefined, UIParent);
        frame.SetSize(700, 40);
        frame.SetPoint("TOP", UIParent, "TOP", 0, -180);
        // Above the dialogs too: a message about what was just done in a window must not hide behind it
        frame.SetFrameStrata("FULLSCREEN_DIALOG");
        const text = frame.CreateFontString(undefined, "OVERLAY", "GameFontNormalHuge");
        text.SetPoint("CENTER");
        text.SetTextColor(1, 0.82, 0);
        WowkitNotices = { frame, text, entries: [] };
        return WowkitNotices;
    }
}
