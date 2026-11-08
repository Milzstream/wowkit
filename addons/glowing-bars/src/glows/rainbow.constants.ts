import type { Rgb } from "@wowkit/wow";

/** The colors the buttons go through, one button after the other. */
export const RAINBOW: Rgb[] = [
    [1, 0.1, 0.1],
    [1, 0.5, 0.1],
    [1, 0.9, 0.1],
    [0.2, 1, 0.2],
    [0.1, 0.8, 1],
    [0.3, 0.3, 1],
    [0.8, 0.2, 1],
];

/** Seconds from one step of the rainbow to the next. */
export const RAINBOW_STEP_SECONDS = 0.2;
/** After the last step, so that its glow is seen to the end before they all go out. */
export const RAINBOW_LAST_SECONDS = 0.8;
