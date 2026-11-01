// A glow on action buttons: Blizzard's spell-alert ("proc") animation, tinted with a color, in one of three styles (see
// GlowStyle). The round buttons of Forever's gamepad bars get the client's own round highlight instead, breathing or
// still: the square alert does not fit them; so do the buttons another addon registered as round. Every breathing glow
// breathes in step.
//
// A glow on a button of the gamepad bars is a frame of our own beside it, never its child: the gamepad bars' code goes
// through the children of its buttons, and a frame an addon made there taints it (the game then blocks its
// SetPreferredGamepadInteractTarget). The glow follows the button through hooks on its showing and hiding instead.

import type { ActionBarsService } from "./action-bars.service";
import { tryCall } from "./utils/protected-call.utils";
import { getReadable } from "./utils/secret-value.utils";
import type { HiddenAlpha } from "./value-curves.service";

/** A color as red, green and blue between 0 and 1. */
export type Rgb = [r: number, g: number, b: number];

/**
 * How a glow moves: Blizzard's animation running around the button; the glow standing still, slowly fading out and in;
 * or standing still, fading in as it lights and out as it goes.
 */
export type GlowStyle = "circling" | "breathing" | "still";

/** Fallback art if the spell-alert glow template is missing; built-in client art only. */
const GLOW_FALLBACK = "Interface\\Cooldown\\star4";
const GLOW_SCALE = 1.45;
const GLOW_ALPHA = 0.95;
/**
 * The glow of a round gamepad button, in two layers of the client's own gamepad art: a soft round halo well around the
 * button (the glow it flashes when a cast completes), and the ring it highlights the button with.
 */
const RING_ATLAS = "gamepad-actionbar-circleslot-border-hover";
const RING_SCALE = 1.2;
const HALO_ATLAS = "gamepad-hud-actionbar-casting-complete-glow";
/** The halo's size, against the ring's. */
const HALO_SCALE = 1.35;
/** A breathing glow fades between full and this opacity, half a second each way. */
const RING_PULSE_ALPHA = 0.45;
const RING_PULSE_SECONDS = 0.5;
/**
 * The loop of the alert's glow, a flipbook. A glow that does not circle shows one picture of it still: the loop runs a
 * frame, so the client cuts the picture out, and is stopped, its picture kept: while it runs, even paused, it holds the
 * picture's opacity, so a fade could not change it.
 */
const LOOP_ATLAS = "UI-HUD-ActionBar-Proc-Loop-Flipbook";
/** A still glow fades in and out this fast. */
const STILL_FADE_SECONDS = 0.25;

interface Overlay {
    frame: Frame;
    alert?: SpellAlertFrame;
    texture?: Texture;
    /** The fading in and out of a still glow, and the breathing of a breathing one. */
    fadeIn?: AnimationGroup;
    fadeOut?: AnimationGroup;
    breathe?: AnimationGroup;
    /** The glow is lit (it shows while its button does). */
    isWanted?: boolean;
    /** A frame beside the button, not its child (a button of the gamepad bars). */
    isBeside?: boolean;
    /** The ring of a round button; its halo is drawn around it. */
    isRing?: boolean;
    halo?: Texture;
}

export interface ButtonGlow {
    /** Glows the buttons of these spells in the color; an empty list clears. */
    show: (this: void, spellIds: number[], color: Rgb) => void;
    clear: (this: void) => void;
    /**
     * The opacity of the glowing buttons: a curve result the client computed from a hidden value (see
     * ValueCurvesService), or a number; undefined is the glow's own opacity again.
     */
    setAlpha: (this: void, alpha: HiddenAlpha | number | undefined) => void;
}

export class GlowService {
    /** Overlays per button and reminder kind. Kept here, never written onto Blizzard's buttons. */
    private readonly overlays = new LuaMap<ActionButton, LuaMap<string, Overlay>>();
    /**
     * The last readable size of each button, and its scale against the screen: in combat the client keeps a protected
     * button's geometry secret, and a secret value cannot even be compared.
     */
    private readonly sizes = new LuaMap<ActionButton, [width: number, height: number, scale: number]>();
    /** The gamepad buttons whose showing and hiding the glows beside them follow. */
    private readonly tracked = new LuaSet<ActionButton>();
    /** The breathing of the glows that show (round, or square and breathing): they restart together, in step. */
    private readonly pulses = new LuaSet<AnimationGroup>();
    /** The style of the square glows, and of the round ones. A glow lit after a change shows the new way. */
    private squareStyle: GlowStyle = "circling";
    private roundStyle: GlowStyle = "breathing";

    constructor(private readonly actionBars: ActionBarsService) {}

    /** The styles of the glows lit from now on: of the square buttons, and of the round ones (not circling: breathing). */
    setStyles(squareStyle: GlowStyle, roundStyle: GlowStyle): void {
        this.squareStyle = squareStyle;
        this.roundStyle = roundStyle;
    }

    /**
     * One glow on the buttons of some spells; each kind (the buff, the weapon buff) keeps its own overlays.
     * `isButtonShown` leaves buttons out (a bar the player does not want to glow); it is asked each time the glow is shown.
     */
    createButtonGlow(kind: string, isButtonShown?: (this: void, button: ActionButton) => boolean): ButtonGlow {
        const glowing = new LuaSet<ActionButton>();
        let last: string | undefined;
        const clearGlow = () => {
            for (const button of glowing) {
                const entry = this.overlays.get(button)?.get(kind);
                if (entry) this.hideOverlay(entry);
                glowing.delete(button);
            }
            last = undefined;
        };
        return {
            clear: clearGlow,
            setAlpha: (alpha) => {
                // The client accepts the secret curve result here; addon code never reads it
                const value = (alpha ?? GLOW_ALPHA) as number;
                for (const button of glowing) this.overlays.get(button)?.get(kind)?.frame.SetAlpha(value);
            },
            show: (spellIds, color) => {
                if (spellIds.length === 0) return clearGlow();
                // The color is part of the key: the same spell may glow in another color (a heal that turns urgent)
                const key = `${spellIds.join(",")}|${color.join(",")}`;
                const buttons = spellIds
                    .flatMap((spellId) => this.actionBars.findButtonsOf(spellId))
                    .filter((button) => isButtonShown === undefined || isButtonShown(button));
                // The same spells on the same buttons: nothing to redraw. The buttons count too: the bars are mapped a few
                // buttons a frame, so a spell may be found on more buttons than when it was first lit
                if (key === last && !glowing.isEmpty() && this.isSameButtons(glowing, buttons)) return;
                clearGlow();
                for (const button of buttons) {
                    if (!glowing.has(button)) {
                        this.showOverlay(this.getOverlay(button, kind, color), button);
                        glowing.add(button);
                    }
                }
                // Drawn only once every button is lit: after an error the next tick draws again, it does not take it as done
                last = key;
            },
        };
    }

    /** Lights a glow; one that is fading out is back at once, without fading in again. */
    private showOverlay(entry: Overlay, button: ActionButton): void {
        entry.isWanted = true;
        // A glow beside its button shows only while the button does (see trackButton)
        if (entry.isBeside === true && !button.IsVisible()) return;
        if (entry.fadeOut?.IsPlaying() === true) entry.fadeOut.Stop();
        else entry.frame.Show();
    }

    /** Puts a glow out; a still one fades out first. */
    private hideOverlay(entry: Overlay): void {
        entry.isWanted = false;
        if (this.squareStyle === "still" && entry.fadeOut !== undefined && entry.frame.IsShown()) entry.fadeOut.Play();
        else entry.frame.Hide();
    }

    /** The buttons a glow is lit on, but those of the gamepad bars: their glow is beside them. */
    listGlowing(): ActionButton[] {
        const buttons: ActionButton[] = [];
        for (const [button] of this.overlays) if (this.isGlowing(button) && !this.isGamepadButton(button)) buttons.push(button);
        return buttons;
    }

    /** Is a glow lit on the button? */
    isGlowing(button: ActionButton): boolean {
        for (const [, entry] of this.overlays.get(button) ?? new LuaMap<string, Overlay>()) if (entry.isWanted === true) return true;
        return false;
    }

    /** Does the glow already light exactly these buttons? */
    private isSameButtons(glowing: LuaSet<ActionButton>, buttons: ActionButton[]): boolean {
        const wanted = new LuaSet<ActionButton>();
        for (const button of buttons) {
            if (!glowing.has(button)) return false;
            wanted.add(button);
        }
        // Every wanted button glows already; none glows that is not wanted
        for (const button of glowing) if (!wanted.has(button)) return false;
        return true;
    }

    private getOverlay(button: ActionButton, kind: string, [r, g, b]: Rgb): Overlay {
        let byKind = this.overlays.get(button);
        if (!byKind) {
            byKind = new LuaMap();
            this.overlays.set(button, byKind);
        }
        let entry = byKind.get(kind);
        if (!entry) {
            entry = this.createOverlay(button);
            byKind.set(kind, entry);
        }
        this.applySize(entry, button);
        if (entry.alert) {
            // Desaturated, so the reminder color tints the glow instead of mixing with gold
            for (const texture of [entry.alert.ProcStartFlipbook, entry.alert.ProcLoopFlipbook]) {
                texture?.SetDesaturated(true);
                texture?.SetVertexColor(r, g, b);
            }
            entry.frame.SetAlpha(GLOW_ALPHA);
        } else {
            entry.texture!.SetVertexColor(r, g, b, GLOW_ALPHA);
            entry.halo?.SetVertexColor(r, g, b, GLOW_ALPHA);
        }
        return entry;
    }

    /** The glow is a little larger than its button (a size the client has not laid out yet counts as 36). */
    private applySize(entry: Overlay, button: ActionButton): void {
        const [width, height, buttonScale] = this.readButtonSize(button);
        // A glow beside the button is sized in its own parent's scale
        const scale = (entry.isRing === true ? RING_SCALE : GLOW_SCALE) * (entry.isBeside === true ? buttonScale : 1);
        entry.frame.SetSize(width * scale, height * scale);
        entry.halo?.SetSize(width * scale * HALO_SCALE, height * scale * HALO_SCALE);
    }

    /** The button's size and scale against the screen: the last readable ones (36 and 1 before any, or not laid out yet). */
    private readButtonSize(button: ActionButton): [width: number, height: number, scale: number] {
        const width = getReadable(button.GetWidth());
        const height = getReadable(button.GetHeight());
        const [screenScale, ownScale] = [getReadable(UIParent.GetEffectiveScale()), getReadable(button.GetEffectiveScale())];
        const scale = screenScale !== undefined && ownScale !== undefined && screenScale > 0 ? ownScale / screenScale : 1;
        if (width !== undefined && height !== undefined && width >= 8 && height >= 8) this.sizes.set(button, [width, height, scale]);
        return this.sizes.get(button) ?? [36, 36, 1];
    }

    /** A button of the gamepad bars (Forever): they say their shape, round or square. Another addon's may too, but it is no such button. */
    private isGamepadButton(button: ActionButton): boolean {
        return (button as { activeButtonShape?: unknown }).activeButtonShape !== undefined && !this.actionBars.isRegistered(button);
    }

    /** The glows beside a gamepad button hide with it, and show again with it while they are lit. */
    private trackButton(button: ActionButton): void {
        if (this.tracked.has(button)) return;
        this.tracked.add(button);
        // HookScript runs after the button's own script and leaves it untainted
        button.HookScript("OnHide", () => {
            for (const [, entry] of this.overlays.get(button) ?? new LuaMap<string, Overlay>()) entry.frame.Hide();
        });
        button.HookScript("OnShow", () => {
            for (const [, entry] of this.overlays.get(button) ?? new LuaMap<string, Overlay>())
                if (entry.isWanted === true) entry.frame.Show();
        });
    }

    /**
     * The alert as it shows: the animation from its start, or the loop of the glow stopped on its first picture, without the
     * flash it starts with. The loop is stopped a frame after it starts: before, its flipbook shows the whole sheet.
     */
    private startAlert(alert: SpellAlertFrame, fades: Pick<Overlay, "fadeIn" | "breathe">): void {
        alert.ProcLoop!.Stop();
        const isCircling = this.squareStyle === "circling";
        alert.ProcStartFlipbook?.SetShown(isCircling);
        if (isCircling) {
            // The whole flipbook again, hidden until the loop shows it (as the template has it)
            alert.ProcLoopFlipbook?.SetAtlas(LOOP_ATLAS);
            alert.ProcLoopFlipbook?.SetAlpha(0);
            alert.ProcStartAnim!.Play();
            return;
        }
        this.showLoopPicture(alert, () => {
            if (this.squareStyle === "still") {
                fades.fadeIn?.Play();
            } else if (fades.breathe !== undefined) {
                this.pulses.add(fades.breathe);
                this.syncPulses();
            }
        });
    }

    /** A picture of the loop's flipbook, standing still; `then` runs once it stands (a frame later). */
    private showLoopPicture(alert: SpellAlertFrame, then: (this: void) => void): void {
        const picture = alert.ProcLoopFlipbook;
        if (picture === undefined) return;
        picture.Show();
        alert.ProcLoop!.Play();
        C_Timer.After(0, () => {
            // Put out in the meantime: nothing to keep
            if (!alert.IsShown()) return;
            const [ulX, ulY, llX, llY, urX, urY, lrX, lrY] = picture.GetTexCoord();
            alert.ProcLoop!.Stop();
            picture.SetTexCoord(ulX, ulY, llX, llY, urX, urY, lrX, lrY);
            picture.SetAlpha(1);
            then();
        });
    }

    /**
     * A fade of a still alert's glow, on its loop's picture (the frame's opacity is the glow's own). Undefined where the
     * client (or the fake game) has no animations: the glow then comes and goes at once.
     */
    private createFade(alert: SpellAlertFrame, fromAlpha: number, toAlpha: number, seconds: number): AnimationGroup | undefined {
        const group = alert.CreateAnimationGroup() as AnimationGroup | undefined;
        const fade = group?.CreateAnimation("Alpha") as AlphaAnimation | undefined;
        if (group === undefined || fade === undefined || alert.ProcLoopFlipbook === undefined) return undefined;
        fade.SetTarget(alert.ProcLoopFlipbook);
        fade.SetFromAlpha(fromAlpha);
        fade.SetToAlpha(toAlpha);
        fade.SetDuration(seconds);
        return group;
    }

    private createOverlay(button: ActionButton): Overlay {
        if (!this.isGamepadButton(button)) return this.createOverlayIn(button, button);
        this.trackButton(button);
        const overlay = this.createOverlayIn(UIParent, button);
        overlay.isBeside = true;
        overlay.frame.SetFrameStrata(button.GetFrameStrata());
        return overlay;
    }

    /** The glow of the button, made in `parent`: the button itself, or the screen for a button of the gamepad bars. */
    private createOverlayIn(parent: Frame, button: ActionButton): Overlay {
        const level = button.GetFrameLevel() + 6;
        if (this.isRoundButton(button)) return this.createRing(parent, button, level);
        // Blizzard's own spell-alert glow, but our own instance, never the one the action bar manager
        // drives, so real procs are unaffected
        const [didSucceed, created] = tryCall(() => CreateFrame("Frame", undefined, parent, "ActionButtonSpellAlertTemplate"));
        const alert = didSucceed ? (created as SpellAlertFrame) : undefined;
        if (alert?.ProcStartAnim && alert.ProcLoop) {
            alert.SetFrameStrata("MEDIUM");
            alert.SetFrameLevel(level);
            alert.SetPoint("CENTER", button, "CENTER", 0, 0);
            const fades = {
                fadeIn: this.createFade(alert, 0, 1, STILL_FADE_SECONDS),
                fadeOut: this.createFade(alert, 1, 0, STILL_FADE_SECONDS),
                breathe: this.createFade(alert, 1, RING_PULSE_ALPHA, RING_PULSE_SECONDS),
            };
            fades.breathe?.SetLooping("BOUNCE");
            // Faded out, the glow goes
            fades.fadeOut?.SetScript("OnFinished", () => alert.Hide());
            alert.SetScript("OnShow", () => this.startAlert(alert, fades));
            alert.SetScript("OnHide", () => {
                alert.ProcStartAnim!.Stop();
                alert.ProcLoop!.Stop();
                for (const fade of [fades.fadeIn, fades.fadeOut, fades.breathe]) fade?.Stop();
                if (fades.breathe !== undefined) this.pulses.delete(fades.breathe);
            });
            alert.ProcAltGlow?.Hide();
            alert.Hide();
            return { frame: alert, alert, ...fades };
        }
        const frame = CreateFrame("Frame", undefined, parent);
        frame.SetFrameStrata("MEDIUM");
        frame.SetFrameLevel(level);
        frame.SetPoint("CENTER", button, "CENTER", 0, 0);
        const texture = frame.CreateTexture(undefined, "OVERLAY");
        texture.SetAllPoints(frame);
        texture.SetTexture(GLOW_FALLBACK);
        texture.SetBlendMode("ADD");
        frame.Hide();
        return { frame, texture };
    }

    /** A round button: one another addon registered as round, or a round one of the gamepad bars (Forever). */
    private isRoundButton(button: ActionButton): boolean {
        return this.actionBars.getButtonShape(button) === "Circle";
    }

    /** The client's round halo and highlight around the button (the art of the gamepad bars), pulsing. */
    private createRing(parent: Frame, button: ActionButton, level: number): Overlay {
        const frame = CreateFrame("Frame", undefined, parent);
        frame.SetFrameStrata("MEDIUM");
        frame.SetFrameLevel(level);
        frame.SetPoint("CENTER", button, "CENTER", 0, 0);
        // The pulse is on a frame of its own: the overlay's opacity is the glow's (see setAlpha)
        const pulsing = CreateFrame("Frame", undefined, frame);
        pulsing.SetAllPoints(frame);
        const halo = this.createRingLayer(pulsing, HALO_ATLAS, "ARTWORK");
        halo.SetPoint("CENTER", pulsing, "CENTER", 0, 0);
        const texture = this.createRingLayer(pulsing, RING_ATLAS, "OVERLAY");
        texture.SetAllPoints(pulsing);
        // (A client, or the fake game, without animations keeps a steady glow)
        const pulse = pulsing.CreateAnimationGroup() as AnimationGroup | undefined;
        const fade = pulse?.CreateAnimation("Alpha") as AlphaAnimation | undefined;
        if (pulse !== undefined && fade !== undefined) {
            fade.SetFromAlpha(1);
            fade.SetToAlpha(RING_PULSE_ALPHA);
            fade.SetDuration(RING_PULSE_SECONDS);
            pulse.SetLooping("BOUNCE");
            frame.SetScript("OnShow", () => {
                if (this.roundStyle !== "breathing") return;
                this.pulses.add(pulse);
                this.syncPulses();
            });
            frame.SetScript("OnHide", () => {
                pulse.Stop();
                this.pulses.delete(pulse);
            });
        }
        frame.Hide();
        return { frame, texture, halo, isRing: true };
    }

    /** Every breathing glow that shows breathes from the start again, in step with the one that just lit. */
    private syncPulses(): void {
        for (const pulse of this.pulses) {
            pulse.Stop();
            pulse.Play();
        }
    }

    /** One layer of a round glow: the art in gray, so the reminder's color tints it instead of mixing with its gold. */
    private createRingLayer(frame: Frame, atlas: string, layer: DrawLayer): Texture {
        const texture = frame.CreateTexture(undefined, layer);
        texture.SetAtlas(atlas);
        texture.SetDesaturated(true);
        texture.SetBlendMode("ADD");
        return texture;
    }
}
