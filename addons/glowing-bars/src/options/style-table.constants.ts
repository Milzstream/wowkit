// The size, the columns and the colors of the table of looks.
import type { Rgb } from "@wowkit/wow";

export const WINDOW_NAME = "GlowingBarsLooks";
export const WINDOW_HEIGHT = 520;
export const ROW_HEIGHT = 36;
export const ICON_SIZE = 30;
/** Every second row is tinted bronze, the color of the classic interface. */
export const STRIPE_COLOR: Rgb = [0.85, 0.62, 0.3];
export const STRIPE_ALPHA = 0.14;
export const BRONZE_TEXT: Rgb = [0.78, 0.62, 0.42];
export const HEADER_HEIGHT = 24;
/** The small heading of a type in the list of spells. */
export const TYPE_HEADING_HEIGHT = 20;
/** A column of the table: where it starts, from the left of a row, and how wide it is. */
export interface Column {
    x: number;
    width: number;
}

/**
 * The columns, side by side. The spell's name and its type read from the left of their column; every other control is
 * centered in its column, under its header, so the two check box columns line up the same way.
 */
export const COLUMN = {
    icon: { x: 4, width: 34 },
    name: { x: 38, width: 146 },
    type: { x: 184, width: 86 },
    id: { x: 270, width: 90 },
    color: { x: 360, width: 56 },
    glowPercent: { x: 416, width: 60 },
    message: { x: 476, width: 66 },
    messageLook: { x: 542, width: 46 },
    sound: { x: 588, width: 130 },
    repeat: { x: 718, width: 62 },
    when: { x: 780, width: 108 },
    glowTime: { x: 888, width: 76 },
    animation: { x: 964, width: 110 },
    belowLimits: { x: 1074, width: 56 },
    enabled: { x: 1130, width: 66 },
    actions: { x: 1196, width: 72 },
} satisfies { [name: string]: Column };

/** The columns of the Basic view: the ones everybody needs. The others keep working, unseen. */
export const BASIC_COLUMN = {
    icon: COLUMN.icon,
    name: COLUMN.name,
    type: COLUMN.type,
    color: { x: 270, width: 56 },
    message: { x: 326, width: 66 },
    sound: { x: 392, width: 130 },
    belowLimits: { x: 522, width: 56 },
    enabled: { x: 578, width: 66 },
    actions: { x: 644, width: 72 },
} satisfies { [name: string]: Column };

/** Where the columns of a view are; without `hasBelow` (no row has a limit) the Below column is left out and the next ones close up. */
export function findColumns(
    isAdvanced: boolean,
    hasBelow: boolean,
): { [name in keyof typeof COLUMN]?: Column } & Omit<typeof BASIC_COLUMN, "belowLimits"> {
    const columns = isAdvanced ? COLUMN : BASIC_COLUMN;
    if (hasBelow) return columns;
    const width = columns.belowLimits.width;
    const closedUp: { [name in keyof typeof COLUMN]?: Column } & Omit<typeof BASIC_COLUMN, "belowLimits"> = {
        ...columns,
        enabled: { x: columns.enabled.x - width, width: columns.enabled.width },
        actions: { x: columns.actions.x - width, width: columns.actions.width },
    };
    // Set after the copy: in Lua a nil among the fields of a table leaves the copied one there
    closedUp.belowLimits = undefined;
    return closedUp;
}

/** A row is as wide as its columns. */
export const TABLE_WIDTH = COLUMN.actions.x + COLUMN.actions.width;
export const TABLE_LEFT = 28;

/** The window around a table this wide: a margin inside its border on the left, the scroll bar on the right. */
export function findWindowWidth(tableWidth: number): number {
    return TABLE_LEFT + tableWidth + 34;
}

/** Where a control of this width starts to sit in the middle of its column. */
export function findCenteredX(column: Column, controlWidth: number): number {
    return column.x + (column.width - controlWidth) / 2;
}
/** The name of an overridden spell, against the gray of one that follows its type. */
export const OVERRIDDEN_COLOR: [number, number, number] = [1, 0.82, 0];
/** The window border: the silver dialog art, tinted bronze. */
export const BORDER_COLOR: Rgb = [0.85, 0.6, 0.3];
