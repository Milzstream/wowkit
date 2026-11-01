// The parts of the table of looks that change which spells there are: the Spell ID box of a cooldown or proc row (to fix
// the ID the addon uses for it), and the row at the end that adds a spell by its ID. Like the table, it may call the game.
import type { NoticeService, Rgb } from "@wowkit/wow";
import type { CustomCuesService } from "../glows/custom-cues.service";
import type { SwitchesService } from "../settings/switches.service";
import type { AddonLocale } from "../locale/locale.interface";
import type { TextKey } from "../locale/texts.constants";
import { CUE_KINDS } from "../settings/settings.constants";
import { COLUMN, ROW_HEIGHT, TABLE_WIDTH, findCenteredX } from "./style-table.constants";
import { KIND_TEXTS, type StyleRow, type StyleRowsService } from "./style-rows.service";
import type { StyleService } from "../settings/style.service";
import type { CueKind } from "../settings/settings.interface";

/** How faded the spell rows of a kind that is switched off are. */
const KIND_OFF_ALPHA = 0.4;

/** What was typed is wrong: nothing was done, or something else than was asked. */
const ERROR_COLOR: Rgb = [1, 0.25, 0.2];

export class StyleEditsService {
    constructor(
        private readonly locale: AddonLocale,
        private readonly customCues: CustomCuesService,
        /** The table's own block of the shared notice: the tick clearing its lines must not take these with them. */
        private readonly notice: NoticeService,
        private readonly switches: SwitchesService,
        private readonly rows: StyleRowsService,
        private readonly styles: StyleService,
    ) {}

    /** The Enabled box of a row: it switches the kind (on a kind's row) or the spell; its tooltip says which. */
    connectEnabled(box: CheckButton, getRow: (this: void) => StyleRow | undefined): void {
        box.SetPoint("LEFT", box.GetParent() as Frame, "LEFT", findCenteredX(COLUMN.enabled, 24), 0);
        box.SetSize(24, 24);
        box.SetScript("OnClick", () => {
            const row = getRow();
            if (row !== undefined) this.switches.setOn(row, box.GetChecked());
        });
        box.SetScript("OnEnter", () => {
            const row = getRow();
            if (row === undefined) return;
            this.showTooltip(box, row.spellId === undefined ? "TIP_ENABLED_KIND" : "TIP_ENABLED_SPELL");
        });
        box.SetScript("OnLeave", () => GameTooltip.Hide());
    }

    /** The X button of a spell the player added: it takes the spell out. */
    connectRemove(button: Button, getRow: (this: void) => StyleRow | undefined): void {
        button.SetSize(22, 22);
        button.SetPoint("LEFT", button.GetParent() as Frame, "LEFT", COLUMN.actions.x + 50, 0);
        button.SetText("X");
        button.SetScript("OnClick", () => {
            const spellId = getRow()?.spellId;
            if (spellId !== undefined) this.customCues.removeCustom(spellId);
        });
    }

    /** Shows whether the row is on, and fades the spell rows of a kind that is off: they will not glow. */
    fillEnabled(box: CheckButton, frame: Frame, row: StyleRow): void {
        box.Show();
        box.SetChecked(this.switches.isOn(row));
        const isKindOff = row.spellId !== undefined && !this.switches.isKindOn(row.kind);
        frame.SetAlpha(isKindOff ? KIND_OFF_ALPHA : 1);
    }

    /** The Spell ID box of a row; `getRow` tells which row it shows now (the rows are reused). */
    createIdBox(frame: Frame, getRow: (this: void) => StyleRow | undefined): EditBox {
        const box = this.createNumberBox(frame, findCenteredX(COLUMN.id, 58), 58, 7);
        const restore = () => {
            const row = getRow();
            box.SetText(row?.spellId !== undefined ? string.format("%d", row.spellId) : "");
        };
        const apply = () => {
            const row = getRow();
            const spellId = tonumber(box.GetText());
            if (row !== undefined && this.isIdEditable(row) && spellId !== undefined && spellId !== row.spellId) {
                this.changeId(row, spellId);
            }
            restore();
        };
        box.SetScript("OnEnterPressed", () => box.ClearFocus());
        box.SetScript("OnEditFocusLost", apply);
        box.SetScript("OnEscapePressed", () => {
            restore();
            box.ClearFocus();
        });
        // What the ID is for, or why an old rank's cannot be changed
        box.SetScript("OnEnter", () => {
            const row = getRow();
            if (row !== undefined) this.showTooltip(box, this.isIdEditable(row) ? "TIP_ID_EDIT" : "TIP_ID_RANK");
        });
        box.SetScript("OnLeave", () => GameTooltip.Hide());
        return box;
    }

    /** Shows the ID of a spell's row (a kind's row has none); grayed where it cannot be changed (the ranks). */
    fillIdBox(box: EditBox, row: StyleRow): void {
        box.SetShown(row.spellId !== undefined);
        if (row.spellId !== undefined) box.SetText(string.format("%d", row.spellId));
        const isEditable = this.isIdEditable(row);
        box.SetEnabled(isEditable);
        const shade = isEditable ? 1 : 0.5;
        box.SetTextColor(shade, shade, shade);
    }

    /** A spell of the lists can be given another ID, and an added spell; a rank is the ID on the bar. */
    private isIdEditable(row: StyleRow): boolean {
        return row.listId !== undefined || row.isCustom === true;
    }

    /** The row at the end of the list: an ID, the kind (a click goes to the next one), and the button that adds it. */
    createAddRow(content: Frame): Frame {
        const frame = CreateFrame("Frame", undefined, content);
        frame.SetSize(TABLE_WIDTH, ROW_HEIGHT);
        const box = this.createNumberBox(frame, COLUMN.name.x, 90, 7);
        box.SetScript("OnEnter", () => this.showTooltip(box, "TIP_ADD_ID"));
        box.SetScript("OnLeave", () => GameTooltip.Hide());
        let kindIndex = 0;
        const kindButton = CreateFrame("Button", undefined, frame, "UIPanelButtonTemplate");
        kindButton.SetSize(136, 24);
        kindButton.SetPoint("LEFT", frame, "LEFT", COLUMN.name.x + 110, 0);
        const showKind = () => kindButton.SetText(this.locale.getText(KIND_TEXTS[CUE_KINDS[kindIndex]!]));
        kindButton.SetScript("OnClick", () => {
            kindIndex = (kindIndex + 1) % CUE_KINDS.length;
            showKind();
        });
        showKind();
        const addButton = CreateFrame("Button", undefined, frame, "UIPanelButtonTemplate");
        addButton.SetSize(80, 24);
        addButton.SetPoint("LEFT", frame, "LEFT", COLUMN.name.x + 262, 0);
        addButton.SetText(this.locale.getText("BTN_ADD"));
        addButton.SetScript("OnClick", () => {
            const spellId = tonumber(box.GetText());
            if (spellId !== undefined && this.addSpell(spellId, CUE_KINDS[kindIndex]!)) box.SetText("");
            box.ClearFocus();
        });
        return frame;
    }

    /** Adds a spell as the kind picked, or says why not (unknown ID, listed already, surely wrong kind). */
    private addSpell(spellId: number, kind: CueKind): boolean {
        if (!this.customCues.isKnownSpell(spellId)) {
            this.showUnknown(spellId);
            return false;
        }
        const name = this.styles.getSpellKey(spellId);
        if (this.isListedElsewhere(spellId)) {
            this.showProblem(string.format(this.locale.getText("MSG_ALREADY_LISTED"), name), ERROR_COLOR);
            return false;
        }
        const problem = this.customCues.findKindProblem(spellId, kind);
        if (problem !== undefined) {
            this.showProblem(string.format(this.locale.getText(problem), name), ERROR_COLOR);
            return false;
        }
        this.customCues.addCustom(spellId, kind);
        return true;
    }

    /**
     * Is a spell of this name in the table already, on another row than `except`? A spell is listed once, so a second one
     * would take the place of the first. Every ranked spell has a row of its own (old ranks are found for all): the rank rows
     * do not count. Foods and drinks of one name are different ones: only their ID counts.
     */
    private isListedElsewhere(spellId: number, except?: StyleRow): boolean {
        const name = this.styles.getSpellKey(spellId);
        const isSharingName = this.rows.isSharingName(spellId);
        return this.rows
            .listSpellRows()
            .some(
                (row) =>
                    row.kind !== "rank" &&
                    row.spellId !== undefined &&
                    (isSharingName ? row.spellId === spellId : this.styles.getSpellKey(row.spellId) === name) &&
                    !(except !== undefined && row.kind === except.kind && row.listId === except.listId && row.spellId === except.spellId),
            );
    }

    private changeId(row: StyleRow, spellId: number): void {
        const name = this.customCues.isKnownSpell(spellId) ? this.styles.getSpellKey(spellId) : undefined;
        if (name !== undefined && this.isListedElsewhere(spellId, row)) {
            this.showProblem(string.format(this.locale.getText("MSG_ALREADY_LISTED"), name), ERROR_COLOR);
            return;
        }
        const isChanged =
            row.isCustom === true
                ? row.spellId !== undefined && this.customCues.changeCustom(row.spellId, spellId)
                : row.listId !== undefined && this.customCues.changeOverride(row.listId, spellId);
        if (!isChanged) this.showUnknown(spellId);
    }

    private showUnknown(spellId: number): void {
        this.showProblem(string.format(this.locale.getText("MSG_UNKNOWN_SPELL"), spellId), ERROR_COLOR);
    }

    /** The game's tooltip next to a control, with one of the addon's texts. */
    private showTooltip(owner: Frame, text: TextKey): void {
        GameTooltip.SetOwner(owner, "ANCHOR_RIGHT");
        GameTooltip.SetText(this.locale.getText(text), 1, 1, 1, 1, true);
        GameTooltip.Show();
    }

    /** A problem with what was typed: a line at the top of the screen, like the messages of the reminders. */
    private showProblem(text: string, color: Rgb): void {
        this.notice.showNotice(this.styles.applyTextColor(color, text));
    }

    private createNumberBox(frame: Frame, x: number, width: number, maxLetters: number): EditBox {
        const box = CreateFrame("EditBox", undefined, frame, "InputBoxTemplate");
        box.SetSize(width, 20);
        // The input box draws its border a little to the left of where it starts
        box.SetPoint("LEFT", frame, "LEFT", x + 3, 0);
        box.SetAutoFocus(false);
        box.SetNumeric(true);
        box.SetMaxLetters(maxLetters);
        return box;
    }
}
