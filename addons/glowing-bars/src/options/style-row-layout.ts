// Where the controls of a row of the table go in a view: the same controls, in the columns of the Basic or the Advanced
// view; the ones of a column that the view does not have are hidden. What they hold keeps working.
import { ICON_SIZE, findCenteredX, COLUMN, type Column, type findColumns } from "./style-table.constants";

/** The controls of a row that move, or hide, with the view. */
export interface RowControls {
    frame: Frame;
    swatch: Button;
    message: CheckButton;
    sound: Button;
    belowBox: EditBox;
    enabled: CheckButton;
    reset: Button;
    remove: Button;
    glowPercent: EditBox;
    spellIdBox: EditBox;
    choices: { repeat: Button; when: Button; glowTime: Button; animation: Button };
}

function applyPosition(control: Button | CheckButton | EditBox, frame: Frame, x: number): void {
    control.ClearAllPoints();
    control.SetPoint("LEFT", frame, "LEFT", x, 0);
}

/** Puts the controls of a filled row in the columns of the view. */
export function applyRowView(row: RowControls, columns: ReturnType<typeof findColumns>, isAdvanced: boolean): void {
    applyPosition(row.swatch, row.frame, findCenteredX(columns.color, 22));
    applyPosition(row.message, row.frame, findCenteredX(columns.message, 24));
    applyPosition(row.sound, row.frame, findCenteredX(columns.sound, 126));
    if (columns.belowLimits !== undefined) applyPosition(row.belowBox, row.frame, findCenteredX(columns.belowLimits, 44));
    applyPosition(row.enabled, row.frame, findCenteredX(columns.enabled, 24));
    applyPosition(row.reset, row.frame, columns.actions.x + 2);
    applyPosition(row.remove, row.frame, columns.actions.x + 50);
    const { repeat, when, glowTime, animation } = row.choices;
    for (const control of [row.glowPercent, repeat, when, glowTime, animation]) control.SetShown(isAdvanced);
    if (!isAdvanced) row.spellIdBox.Hide();
}

export function createStripe(frame: Frame): Texture {
    const stripe = frame.CreateTexture(undefined, "BACKGROUND");
    stripe.SetAllPoints(frame);
    return stripe;
}

export function createIcon(frame: Frame): Texture {
    const icon = frame.CreateTexture(undefined, "ARTWORK");
    icon.SetSize(ICON_SIZE, ICON_SIZE);
    icon.SetPoint("LEFT", frame, "LEFT", findCenteredX(COLUMN.icon, ICON_SIZE), 0);
    return icon;
}

export function createText(frame: Frame, column: Column, font: string): FontString {
    const text = frame.CreateFontString(undefined, "OVERLAY", font);
    text.SetPoint("LEFT", frame, "LEFT", column.x, 0);
    text.SetWidth(column.width - 4);
    text.SetJustifyH("LEFT");
    return text;
}

/** The color square of a row: a button, its border, and the color. */
export function createSwatch(frame: Frame): { swatch: Button; swatchColor: Texture } {
    const swatch = CreateFrame("Button", undefined, frame);
    swatch.SetSize(22, 16);
    const border = swatch.CreateTexture(undefined, "BACKGROUND");
    border.SetAllPoints(swatch);
    border.SetColorTexture(0.55, 0.42, 0.2, 1);
    const swatchColor = swatch.CreateTexture(undefined, "ARTWORK");
    swatchColor.SetPoint("TOPLEFT", swatch, "TOPLEFT", 1, -1);
    swatchColor.SetPoint("BOTTOMRIGHT", swatch, "BOTTOMRIGHT", -1, 1);
    return { swatch, swatchColor };
}
