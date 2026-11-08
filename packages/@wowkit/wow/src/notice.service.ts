// Sounds, chat lines and the on-screen notice.
//
// The notice is one frame in the upper middle of the screen that every addon using this service shares (the
// first one creates it and leaves it in the global WowkitNotices). Each addon owns a block of lines in it, so two
// addons showing a message at the same time stack their blocks instead of drawing over each other.
import { attempt } from "./utils/protected-call.utils";

export const NOTICE_SECONDS = 10;
const NOTICE_WIDTH = 700;
/** How far below the top of the screen the messages are. */
const NOTICE_TOP = 180;
/** A message that zooms starts, or ends, this small, and takes this long. */
const ZOOM_SMALL = 0.4;
const ZOOM_SECONDS = 0.25;
/** A message that pulses fades to this much, or grows by this much, and back, each way in this long. */
const PULSE_FADED = 0.5;
const PULSE_GROWTH = 0.12;
const PULSE_SECONDS = 0.5;

/** The kinds of sound file the game plays, in the order they are tried: the addon cannot see which one is there. */
const SOUND_FILE_EXTENSIONS = ["ogg", "mp3"];

/** The lines one addon shows, and the number of its latest message (an older timer must not remove a newer one). */
interface OwnedNotice {
    owner: string;
    text: string;
    token: number;
}

/** How a message comes: its size (1 is the normal one), and whether it zooms in. */
export interface NoticeLook {
    scale: number;
    /** How far below the top of the screen it is; none: NOTICE_TOP. */
    top?: number;
    shouldZoomIn: boolean;
    shouldZoomOut: boolean;
    isFadePulsing: boolean;
    isSizePulsing: boolean;
    /** Seconds it stays; 0: until it is taken away (clearNotice, or a newer message); none: NOTICE_SECONDS. */
    seconds?: number;
}

interface SharedNotices {
    frame: Frame;
    text: FontString;
    /** The look of the latest message: how it goes. */
    look?: NoticeLook;
    /** Each made the first time it is needed. */
    zoomIn?: AnimationGroup;
    zoomOut?: AnimationGroup;
    pulse?: AnimationGroup;
    /** Is its text growing and shrinking now? */
    isSizePulsing?: boolean;
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

    /** Plays a sound file given without its extension, in the first kind the game finds; a missing file plays nothing. */
    playSoundFile(pathWithoutExtension: string): void {
        for (const extension of SOUND_FILE_EXTENSIONS) {
            if (attempt(PlaySoundFile, `${pathWithoutExtension}.${extension}`) === true) return;
        }
    }

    /** A line in the chat window. */
    printToChat(text: string): void {
        print(text);
    }

    /**
     * A message in the upper middle of the screen for NOTICE_SECONDS, under the messages of the other addons that are
     * showing one. (UIErrorsFrame fades a message after a second or two: too short to read.)
     */
    showNotice(text: string, look?: NoticeLook): void {
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
        this.applyLook(shared, look);
        const seconds = look?.seconds ?? NOTICE_SECONDS;
        if (seconds > 0) C_Timer.After(seconds, () => this.removeExpired(token));
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
            this.hide(shared);
            return;
        }
        shared.zoomOut?.Stop();
        shared.text.SetText(shared.entries.map((entry) => entry.text).join("\n"));
        shared.frame.Show();
    }

    private applyLook(shared: SharedNotices, look: NoticeLook | undefined): void {
        shared.look = look;
        const scale = look?.scale ?? 1;
        shared.frame.SetScale(scale);
        // A scale counts for the frame's distance from the top too: its place stays where it is
        shared.frame.ClearAllPoints();
        shared.frame.SetPoint("TOP", UIParent, "TOP", 0, -(look?.top ?? NOTICE_TOP) / scale);
        if (look?.shouldZoomIn === true) {
            shared.zoomIn ??= this.createZoom(shared.frame, ZOOM_SMALL, 1);
            shared.zoomIn?.Stop();
            shared.zoomIn?.Play();
        }
        this.applyPulse(shared, look);
    }

    private applyPulse(shared: SharedNotices, look: NoticeLook | undefined): void {
        if (look?.isFadePulsing === true) {
            shared.pulse ??= this.createFadePulse(shared.frame);
            if (shared.pulse?.IsPlaying() === false) shared.pulse.Play();
        } else {
            shared.pulse?.Stop();
        }
        if (look?.isSizePulsing === true) this.startSizePulse(shared);
        else this.stopSizePulse(shared);
    }

    /** The text's own size, not a picture of it stretched: the letters stay sharp. */
    private startSizePulse(shared: SharedNotices): void {
        if (shared.isSizePulsing === true) return;
        shared.isSizePulsing = true;
        let elapsed = 0;
        shared.frame.SetScript("OnUpdate", (_frame, seconds) => {
            elapsed += seconds;
            shared.text.SetTextScale(1 + PULSE_GROWTH * (0.5 - 0.5 * math.cos((elapsed * math.pi) / PULSE_SECONDS)));
        });
    }

    private stopSizePulse(shared: SharedNotices): void {
        if (shared.isSizePulsing !== true) return;
        shared.isSizePulsing = false;
        shared.frame.SetScript("OnUpdate", undefined);
        shared.text.SetTextScale(1);
    }

    /** The message goes: at once, or (as its addon asked) shrinking away first. */
    private hide(shared: SharedNotices): void {
        shared.pulse?.Stop();
        this.stopSizePulse(shared);
        if (shared.look?.shouldZoomOut !== true || !shared.frame.IsShown()) {
            shared.frame.Hide();
            return;
        }
        shared.zoomOut ??= this.createZoomOut(shared);
        if (shared.zoomOut === undefined) {
            shared.frame.Hide();
            return;
        }
        shared.zoomOut.Stop();
        shared.zoomOut.Play();
    }

    /** A client without animations leaves the message as it is: undefined. */
    private createZoom(frame: Frame, from: number, to: number): AnimationGroup | undefined {
        const zoom = frame.CreateAnimationGroup() as AnimationGroup | undefined;
        this.addScale(zoom, from, to);
        return zoom;
    }

    /** It shrinks and fades, and goes out as that ends; a new message in the meantime stops it, and it stays. */
    private createZoomOut(shared: SharedNotices): AnimationGroup | undefined {
        const zoom = this.createZoom(shared.frame, 1, ZOOM_SMALL);
        if (zoom === undefined) return undefined;
        const fade = zoom.CreateAnimation("Alpha") as AlphaAnimation;
        fade.SetFromAlpha(1);
        fade.SetToAlpha(0);
        fade.SetDuration(ZOOM_SECONDS);
        zoom.SetScript("OnFinished", () => {
            if (shared.entries.length === 0) shared.frame.Hide();
        });
        return zoom;
    }

    private createFadePulse(frame: Frame): AnimationGroup | undefined {
        const pulse = frame.CreateAnimationGroup() as AnimationGroup | undefined;
        if (pulse === undefined) return undefined;
        pulse.SetLooping("BOUNCE");
        const fade = pulse.CreateAnimation("Alpha") as AlphaAnimation;
        fade.SetFromAlpha(1);
        fade.SetToAlpha(PULSE_FADED);
        fade.SetDuration(PULSE_SECONDS);
        fade.SetSmoothing("IN_OUT");
        return pulse;
    }

    private addScale(group: AnimationGroup | undefined, from: number, to: number): void {
        if (group === undefined) return;
        const scale = group.CreateAnimation("Scale") as ScaleAnimation;
        scale.SetScaleFrom(from, from);
        scale.SetScaleTo(to, to);
        scale.SetDuration(ZOOM_SECONDS);
        scale.SetOrigin("CENTER", 0, 0);
        scale.SetSmoothing("IN_OUT");
    }

    private getSharedNotices(): SharedNotices {
        if (WowkitNotices) return WowkitNotices;
        const frame = CreateFrame("Frame", undefined, UIParent);
        frame.SetSize(NOTICE_WIDTH, 40);
        frame.SetPoint("TOP", UIParent, "TOP", 0, -NOTICE_TOP);
        // Above the dialogs too: a message about what was just done in a window must not hide behind it
        frame.SetFrameStrata("FULLSCREEN_DIALOG");
        const text = frame.CreateFontString(undefined, "OVERLAY", "GameFontNormalHuge");
        text.SetPoint("CENTER");
        // As wide as the area, so it grows and shrinks from its middle
        text.SetWidth(NOTICE_WIDTH);
        text.SetJustifyH("CENTER");
        text.SetTextColor(1, 0.82, 0);
        WowkitNotices = { frame, text, entries: [] };
        return WowkitNotices;
    }
}
