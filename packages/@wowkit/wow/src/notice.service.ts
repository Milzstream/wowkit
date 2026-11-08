// Sounds, chat lines and the on-screen notice.
//
// The notice is one frame in the upper middle of the screen that every addon using this service shares (the
// first one creates it and leaves it in the global WowkitNotices). Each addon owns a block of lines in it, so two
// addons showing a message at the same time stack their blocks instead of drawing over each other.
import { attempt } from "./utils/protected-call.utils";
import type { HiddenAlpha } from "./value-curves.service";

export const NOTICE_SECONDS = 10;
const NOTICE_WIDTH = 700;
/** How far above the shared messages the faded line is. */
const FADED_LINE_ROOM = 36;
/** How far below the top of the screen the messages are. */
const NOTICE_TOP = 180;
/** A message that zooms starts, or ends, this small, and takes this long. */
const ZOOM_SMALL = 0.4;
const ZOOM_SECONDS = 0.25;
/** A message that pulses fades to this much, or grows by this much, and back, each way in this long. */
const PULSE_FADED = 0.5;
const PULSE_GROWTH = 0.5;
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
    /** How fast and how strong the pulses are: 1 is the normal. */
    pulseSpeed?: number;
    /** Seconds it stays; 0: until it is taken away (clearNotice, or a newer message); none: NOTICE_SECONDS. */
    seconds?: number;
}

interface SharedNotices {
    frame: Frame;
    text: FontString;
    /** The look of the latest message: how it goes. */
    look?: NoticeLook;
    /** The zoom going on now. */
    zoom?: { from: number; to: number; elapsed: number; isLeaving: boolean };
    /** Counts the times the message started to go: a later one, or a new message, overrules the wait of an earlier one. */
    leaving?: number;
    /** How long the text has been growing and shrinking. */
    pulseElapsed?: number;
    /** Made the first time it is needed. */
    pulse?: AnimationGroup;
    pulseFade?: AlphaAnimation;
    /** How fast and how strong the pulses are now. */
    pulseSpeed?: number;
    /** Is its text growing and shrinking now? */
    isSizePulsing?: boolean;
    /** In the order the addons first showed something. */
    entries: OwnedNotice[];
}

declare global {
    var WowkitNotices: SharedNotices | undefined;
}

export class NoticeService {
    /** The line of showFadedText, made the first time it is asked for. */
    private faded: { frame: Frame; text: FontString } | undefined;

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

    /**
     * A line whose opacity the client worked out from a value it hides from addons: its own frame, above the shared messages,
     * since fading those would fade every other line too.
     */
    showFadedText(text: string, alpha: HiddenAlpha, look: { scale: number; top: number }): void {
        const faded = this.faded ?? this.createFadedText();
        faded.text.SetText(text);
        faded.frame.SetScale(look.scale);
        faded.frame.ClearAllPoints();
        faded.frame.SetPoint("TOP", UIParent, "TOP", 0, -math.max(look.top - FADED_LINE_ROOM, 0) / look.scale);
        // The client accepts the secret curve result here; addon code never reads it
        faded.frame.SetAlpha(alpha as unknown as number);
        faded.frame.Show();
    }

    clearFadedText(): void {
        this.faded?.frame.Hide();
    }

    private createFadedText(): { frame: Frame; text: FontString } {
        const frame = CreateFrame("Frame", undefined, UIParent);
        frame.SetSize(NOTICE_WIDTH, 40);
        frame.SetFrameStrata("FULLSCREEN_DIALOG");
        const text = frame.CreateFontString(undefined, "OVERLAY", "GameFontNormalHuge");
        text.SetPoint("CENTER");
        text.SetWidth(NOTICE_WIDTH);
        text.SetJustifyH("CENTER");
        this.faded = { frame, text };
        return this.faded;
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
        this.stopLeaving(shared);
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
        if (look?.shouldZoomIn === true) this.startZoom(shared, ZOOM_SMALL, 1, false);
        this.applyPulse(shared, look);
    }

    private applyPulse(shared: SharedNotices, look: NoticeLook | undefined): void {
        const speed = look?.pulseSpeed ?? 1;
        const isNewSpeed = speed !== shared.pulseSpeed;
        shared.pulseSpeed = speed;
        if (look?.isFadePulsing === true) {
            shared.pulse ??= this.createFadePulse(shared);
            if (isNewSpeed) this.applyFadeSpeed(shared, speed);
            if (shared.pulse?.IsPlaying() === false) shared.pulse.Play();
        } else {
            shared.pulse?.Stop();
        }
        if (look?.isSizePulsing === true) this.startSizePulse(shared);
        else this.stopSizePulse(shared);
    }

    /** The message goes: at once, or (as its addon asked) shrinking away first. */
    private hide(shared: SharedNotices): void {
        shared.pulse?.Stop();
        this.stopSizePulse(shared);
        if (shared.look?.shouldZoomOut !== true || !shared.frame.IsShown()) {
            this.hideNow(shared);
            return;
        }
        this.startZoom(shared, 1, ZOOM_SMALL, true);
        shared.leaving = (shared.leaving ?? 0) + 1;
        const leaving = shared.leaving;
        C_Timer.After(ZOOM_SECONDS, () => {
            if (shared.leaving === leaving && shared.entries.length === 0) this.hideNow(shared);
        });
    }

    private hideNow(shared: SharedNotices): void {
        shared.frame.Hide();
        this.resetText(shared);
    }

    /** A message came while the last one was going: it stays, as it was. */
    private stopLeaving(shared: SharedNotices): void {
        shared.leaving = (shared.leaving ?? 0) + 1;
        if (shared.zoom?.isLeaving === true) this.resetText(shared);
    }

    private resetText(shared: SharedNotices): void {
        shared.zoom = undefined;
        shared.text.SetAlpha(1);
        shared.text.SetTextScale(1);
    }

    /** The text's own size, not a picture of it stretched: the letters stay sharp, and it grows from its middle. */
    private startZoom(shared: SharedNotices, from: number, to: number, isLeaving: boolean): void {
        shared.zoom = { from, to, elapsed: 0, isLeaving };
        shared.text.SetTextScale(from);
        this.startUpdating(shared);
    }

    private startSizePulse(shared: SharedNotices): void {
        if (shared.isSizePulsing === true) return;
        shared.isSizePulsing = true;
        shared.pulseElapsed = 0;
        this.startUpdating(shared);
    }

    private stopSizePulse(shared: SharedNotices): void {
        if (shared.isSizePulsing !== true) return;
        shared.isSizePulsing = false;
        if (shared.zoom === undefined) shared.text.SetTextScale(1);
    }

    private startUpdating(shared: SharedNotices): void {
        shared.frame.SetScript("OnUpdate", (_frame, seconds) => this.updateText(shared, seconds));
    }

    /** One frame of the text's zoom and pulse; with neither going on, nothing more is asked. */
    private updateText(shared: SharedNotices, seconds: number): void {
        let scale = this.updateZoom(shared, seconds);
        if (shared.isSizePulsing === true) {
            shared.pulseElapsed = (shared.pulseElapsed ?? 0) + seconds;
            const speed = shared.pulseSpeed ?? 1;
            scale *= 1 + PULSE_GROWTH * speed * (0.5 - 0.5 * math.cos((shared.pulseElapsed * math.pi * speed) / PULSE_SECONDS));
        }
        shared.text.SetTextScale(scale);
        if (shared.zoom === undefined && shared.isSizePulsing !== true) shared.frame.SetScript("OnUpdate", undefined);
    }

    /** The size the zoom has come to now; 1 with none going on. A message going away fades as it shrinks, and stays so until it is hidden. */
    private updateZoom(shared: SharedNotices, seconds: number): number {
        const zoom = shared.zoom;
        if (zoom === undefined) return 1;
        zoom.elapsed += seconds;
        const progress = math.min(zoom.elapsed / ZOOM_SECONDS, 1);
        if (zoom.isLeaving) shared.text.SetAlpha(1 - progress);
        else if (progress >= 1) shared.zoom = undefined;
        return zoom.from + (zoom.to - zoom.from) * progress;
    }

    /** A pulse of another speed starts over: what is running keeps the old one to the end of its round. */
    private applyFadeSpeed(shared: SharedNotices, speed: number): void {
        shared.pulse?.Stop();
        shared.pulseFade?.SetToAlpha(math.max(1 - (1 - PULSE_FADED) * speed, 0));
        shared.pulseFade?.SetDuration(PULSE_SECONDS / speed);
    }

    private createFadePulse(shared: SharedNotices): AnimationGroup | undefined {
        const pulse = shared.frame.CreateAnimationGroup() as AnimationGroup | undefined;
        if (pulse === undefined) return undefined;
        pulse.SetLooping("BOUNCE");
        const fade = pulse.CreateAnimation("Alpha") as AlphaAnimation;
        fade.SetFromAlpha(1);
        fade.SetToAlpha(PULSE_FADED);
        fade.SetDuration(PULSE_SECONDS);
        fade.SetSmoothing("IN_OUT");
        shared.pulseFade = fade;
        this.applyFadeSpeed(shared, shared.pulseSpeed ?? 1);
        return pulse;
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
