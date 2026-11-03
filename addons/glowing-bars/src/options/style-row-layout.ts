// Where the controls of a row of the table go in a view: the same controls, in the columns of the Basic or the Advanced
// view; the ones of a column that the view does not have are hidden. What they hold keeps working.
import { findCenteredX, findColumns } from "./style-table.constants";

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
export function applyRowView(row: RowControls, isAdvanced: boolean): void {
    const columns = findColumns(isAdvanced);
    applyPosition(row.swatch, row.frame, findCenteredX(columns.color, 22));
    applyPosition(row.message, row.frame, findCenteredX(columns.message, 24));
    applyPosition(row.sound, row.frame, findCenteredX(columns.sound, 126));
    applyPosition(row.belowBox, row.frame, findCenteredX(columns.belowLimits, 44));
    applyPosition(row.enabled, row.frame, findCenteredX(columns.enabled, 24));
    applyPosition(row.reset, row.frame, columns.actions.x + 2);
    applyPosition(row.remove, row.frame, columns.actions.x + 50);
    const { repeat, when, glowTime, animation } = row.choices;
    for (const control of [row.glowPercent, repeat, when, glowTime, animation]) control.SetShown(isAdvanced);
    if (!isAdvanced) row.spellIdBox.Hide();
}
