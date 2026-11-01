// The door for other addons, in the global GlowingBars: a UI addon with bars of its own registers its action buttons,
// and they glow as Blizzard's do. A button keeps its action slot where Blizzard's buttons do (made from
// ActionBarButtonTemplate, or LibActionButton-1.0); a stance button has no slot, so it says which stance it stands for.
// A round button (a gamepad addon's) says so, and gets a round glow instead of the square alert.
// An addon that lists GlowingBars in its OptionalDeps loads after it, and finds the API there.
import { BARS, type ButtonRegistryService, type ButtonShape, setGlobal } from "@wowkit/wow";

export interface GlowingBarsApi {
    /**
     * A button to glow on, counting as Action Bar `bar` (1 to 8: its switch and its fading on the Settings page), or as no
     * bar when left out (nil). `shape` "Circle" glows a round button with a round glow; "Square", or nothing, the square
     * one. Mapped within a few seconds, out of combat.
     */
    RegisterButton: (this: void, button: ActionButton, bar?: number, shape?: ButtonShape) => void;
    /** A stance button to glow on (a form, a paladin's aura), standing for the stance `stance` (1 the first), of the shape `shape`. */
    RegisterStanceButton: (this: void, button: ActionButton, stance: number, shape?: ButtonShape) => void;
}

/** A whole number from `low` up; undefined for anything else. */
function readWhole(value: unknown, low: number): number | undefined {
    return type(value) === "number" && (value as number) >= low ? math.floor(value as number) : undefined;
}

/** A shape the glow knows; undefined for anything else. */
function readShape(value: unknown): ButtonShape | undefined {
    return value === "Circle" || value === "Square" ? value : undefined;
}

/** Puts the API in the global GlowingBars. */
export function registerPublicApi(registry: ButtonRegistryService): void {
    const api: GlowingBarsApi = {
        RegisterButton: (button, bar, shape) => {
            if (type(button) !== "table") return;
            const number = readWhole(bar, 1);
            registry.registerButton(button, number !== undefined && number <= BARS.length ? number : undefined, readShape(shape));
        },
        RegisterStanceButton: (button, stance, shape) => {
            const index = readWhole(stance, 1);
            if (type(button) === "table" && index !== undefined) registry.registerStanceButton(button, index, readShape(shape));
        },
    };
    setGlobal("GlowingBars", api);
}
