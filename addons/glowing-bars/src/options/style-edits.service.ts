// The parts of the table of looks that change which spells there are: the Spell ID box of a cooldown or proc row (to fix
// the ID the addon uses for it), and the row at the end that adds a spell by its ID. Like the table, it may call the game.
import type { NoticeService, Rgb } from "@wowkit/wow";
import type { AddedSpellsService } from "../glows/added-spells.service";
import type { EnabledService } from "../settings/enabled.service";
import type { AddonLocale } from "../locale/locale.interface";
import type { TextKey } from "../locale/texts.constants";
import { ADDABLE_TYPES } from "../settings/settings.constants";
import { connectChoiceMenu } from "./choice-menu";
import { COLUMN, HEADER_HEIGHT, ROW_HEIGHT, TABLE_WIDTH, findCenteredX } from "./style-table.constants";
import { TYPE_TEXTS, type StyleRow, type StyleRowsService } from "./style-rows.service";
import type { StyleService } from "../settings/style.service";
import type { ReagentsService } from "../reagents/reagents.service";
import type { BelowLimitsService } from "../reminders/below-limits.service";
import type { AddableType } from "../settings/settings.interface";

/** How faded the spell rows of a type that is switched off are. */
const TYPE_OFF_ALPHA = 0.4;
/** How faded the name and icon of a spell the character has not learned (yet) are: listed all the same, to set its look before. */
const NOT_LEARNED_ALPHA = 0.5;

/** What was typed is wrong: nothing was done, or something else than was asked. */
const ERROR_COLOR: Rgb = [1, 0.25, 0.2];

export class StyleEditsService {
    constructor(
        private readonly locale: AddonLocale,
        private readonly addedSpells: AddedSpellsService,
        /** The table's own block of the shared notice: the tick clearing its lines must not take these with them. */
        private readonly notice: NoticeService,
        private readonly switches: EnabledService,
        private readonly rows: StyleRowsService,
        private readonly styles: StyleService,
        private readonly limits: BelowLimitsService,
        private readonly reagents: ReagentsService,
    ) {}

    /** The Enabled box of a row: it switches the type (on a type's row) or the spell; its tooltip says which. */
    connectEnabled(box: CheckButton, getRow: (this: void) => StyleRow | undefined): void {
        box.SetPoint("LEFT", box.GetParent() as Frame, "LEFT", findCenteredX(COLUMN.enabled, 24), 0);
        box.SetSize(24, 24);
        box.SetScript("OnClick", () => {
            const row = getRow();
            if (row !== undefined) this.switches.setEnabled(row, box.GetChecked());
        });
    }

    /** The X button of a spell the player added: it takes the spell out. */
    connectRemove(button: Button, getRow: (this: void) => StyleRow | undefined): void {
        button.SetSize(22, 22);
        button.SetPoint("LEFT", button.GetParent() as Frame, "LEFT", COLUMN.actions.x + 50, 0);
        button.SetText("X");
        button.SetScript("OnClick", () => {
            const row = getRow();
            const id = row?.itemId ?? row?.spellId;
            if (id !== undefined) this.addedSpells.removeAdded(id, row?.reminderType as AddableType);
        });
    }

    /**
     * Shows whether the row is on, and fades the spell rows of a type that is off (they will not glow), and the name and
     * icon (nameParts) of a spell not learned yet (what the character has stands out).
     */
    fillEnabled(box: CheckButton, frame: Frame, row: StyleRow, nameParts: Region[]): void {
        box.Show();
        box.SetChecked(this.switches.isEnabled(row));
        const isTypeOff = row.spellId !== undefined && !this.switches.isTypeEnabled(row.reminderType);
        frame.SetAlpha(isTypeOff ? TYPE_OFF_ALPHA : 1);
        for (const part of nameParts) part.SetAlpha(row.isLearned === false ? NOT_LEARNED_ALPHA : 1);
    }

    /** The Spell ID box of a row; `getRow` tells which row it shows now (the rows are reused). */
    createIdBox(frame: Frame, getRow: (this: void) => StyleRow | undefined): EditBox {
        const box = this.createNumberBox(frame, findCenteredX(COLUMN.id, 58), 58, 7);
        const restore = () => {
            const row = getRow();
            const id = row !== undefined ? this.getShownId(row) : undefined;
            box.SetText(id !== undefined ? string.format("%d", id) : "");
        };
        const apply = () => {
            const row = getRow();
            const spellId = tonumber(box.GetText());
            if (row !== undefined && this.isIdEditable(row) && spellId !== undefined && spellId !== this.getShownId(row)) {
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
        return box;
    }

    /** Shows the ID of a spell's row (a type's row has none); grayed where it cannot be changed (the ranks). */
    fillIdBox(box: EditBox, row: StyleRow): void {
        box.SetShown(row.spellId !== undefined);
        const id = this.getShownId(row);
        if (id !== undefined) box.SetText(string.format("%d", id));
        const isEditable = this.isIdEditable(row);
        box.SetEnabled(isEditable);
        const shade = isEditable ? 1 : 0.5;
        box.SetTextColor(shade, shade, shade);
    }

    /** The Below box of a row of a type with a limit: a click out of it keeps a number, and an empty box takes back the old one. */
    createBelowBox(frame: Frame, getRow: (this: void) => StyleRow | undefined): EditBox {
        const box = this.createNumberBox(frame, findCenteredX(COLUMN.belowLimits, 44), 44, 5);
        box.SetScript("OnEnterPressed", () => box.ClearFocus());
        box.SetScript("OnEditFocusLost", () => {
            const row = getRow();
            const limit = tonumber(box.GetText());
            if (row !== undefined && limit !== undefined && this.limits.hasLimit(row.reminderType)) {
                this.limits.setLimit(row.reminderType, this.findLimitEntry(row), limit);
            }
            if (row !== undefined) this.fillBelowBox(box, row);
        });
        return box;
    }

    fillBelowBox(box: EditBox, row: StyleRow): void {
        const hasLimit = this.limits.hasLimit(row.reminderType);
        box.SetShown(hasLimit);
        if (this.limits.hasLimit(row.reminderType))
            box.SetText(string.format("%d", this.limits.getLimit(row.reminderType, this.findLimitEntry(row))));
    }

    /** What the limit of a row is kept under: the item, or the spell the player added; a type's row has none. */
    private findLimitEntry(row: StyleRow): string | undefined {
        if (row.spellId === undefined) return undefined;
        if (row.itemId !== undefined) return string.format("%d", row.itemId);
        if (row.isAdded === true) return `spell${string.format("%d", row.spellId)}`;
        const reagent = this.reagents.findReagentOfSpell(row.spellId);
        return reagent !== undefined ? string.format("%d", reagent.itemId) : undefined;
    }

    /** A spell of the lists can be given another ID, and an added spell; a rank is the ID on the bar. */
    private isIdEditable(row: StyleRow): boolean {
        return row.itemId === undefined && (row.listId !== undefined || row.isAdded === true || row.sharesIdOf !== undefined);
    }

    /** The ID a row shows: its item's, the one of the spell it shares its ID with, else its spell's. */
    private getShownId(row: StyleRow): number | undefined {
        return row.itemId ?? (row.sharesIdOf !== undefined ? this.addedSpells.getEffectiveId(row.sharesIdOf) : row.spellId);
    }

    /** Is this row the one being changed, or the row of the spell whose ID it shares? */
    private isSameSpellRow(row: StyleRow, except: StyleRow | undefined): boolean {
        if (except === undefined) return false;
        if (except.sharesIdOf !== undefined && row.listId === except.sharesIdOf) return true;
        return row.reminderType === except.reminderType && row.listId === except.listId && row.spellId === except.spellId;
    }

    /** The row at the end of the list: an ID, the type (a click goes to the next one), and the button that adds it. */
    createAddRow(content: Frame): Frame {
        const frame = CreateFrame("Frame", undefined, content);
        frame.SetSize(TABLE_WIDTH, ROW_HEIGHT);
        // Over the heading of the row: it says what to enter
        const hover = CreateFrame("Frame", undefined, frame);
        hover.SetPoint("BOTTOMLEFT", frame, "TOPLEFT", 0, 0);
        hover.SetSize(200, HEADER_HEIGHT);
        hover.EnableMouse(true);
        hover.SetScript("OnEnter", () => this.showTooltip(hover, "TIP_ADD"));
        hover.SetScript("OnLeave", () => GameTooltip.Hide());
        const box = this.createNumberBox(frame, COLUMN.name.x, 90, 7);
        let chosenType = ADDABLE_TYPES[0]!;
        const typeButton = CreateFrame("Button", undefined, frame, "UIPanelButtonTemplate");
        typeButton.SetSize(136, 24);
        typeButton.SetPoint("LEFT", frame, "LEFT", COLUMN.name.x + 110, 0);
        const showType = () => typeButton.SetText(this.locale.getText(TYPE_TEXTS[chosenType]));
        connectChoiceMenu(typeButton, () =>
            ADDABLE_TYPES.map((reminderType) => ({
                label: this.locale.getText(TYPE_TEXTS[reminderType]),
                isChosen: () => reminderType === chosenType,
                choose: () => {
                    chosenType = reminderType;
                    showType();
                },
            })),
        );
        showType();
        const addButton = CreateFrame("Button", undefined, frame, "UIPanelButtonTemplate");
        addButton.SetSize(80, 24);
        addButton.SetPoint("LEFT", frame, "LEFT", COLUMN.name.x + 262, 0);
        addButton.SetText(this.locale.getText("BTN_ADD"));
        addButton.SetScript("OnClick", () => {
            const spellId = tonumber(box.GetText());
            if (spellId !== undefined && this.addSpell(spellId, chosenType)) box.SetText("");
            box.ClearFocus();
        });
        return frame;
    }

    /** Adds a spell or item as the type picked, or says why not (unknown ID, listed already, surely wrong type). */
    private addSpell(spellId: number, reminderType: AddableType): boolean {
        if (reminderType === "lowStock") {
            if (this.addedSpells.addItem(spellId)) return true;
            this.showProblem(string.format(this.locale.getText("MSG_UNKNOWN_ITEM"), spellId), ERROR_COLOR);
            return false;
        }
        if (!this.addedSpells.isKnownSpell(spellId)) {
            this.showUnknown(spellId);
            return false;
        }
        const name = this.styles.getSpellKey(spellId);
        if (this.isListedElsewhere(spellId)) {
            this.showProblem(string.format(this.locale.getText("MSG_ALREADY_LISTED"), name), ERROR_COLOR);
            return false;
        }
        const isWrongForFood = this.rows.isSharingName(spellId) && reminderType !== "missingBuff";
        const problem = isWrongForFood ? "MSG_FOOD_IS_BUFF" : this.addedSpells.findTypeProblem(spellId, reminderType);
        if (problem !== undefined) {
            this.showProblem(string.format(this.locale.getText(problem), name), ERROR_COLOR);
            return false;
        }
        this.addedSpells.addSpell(spellId, reminderType);
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
                    row.reminderType !== "oldRank" &&
                    row.spellId !== undefined &&
                    (isSharingName ? row.spellId === spellId : this.styles.getSpellKey(row.spellId) === name) &&
                    !this.isSameSpellRow(row, except),
            );
    }

    private changeId(row: StyleRow, spellId: number): void {
        const name = this.addedSpells.isKnownSpell(spellId) ? this.styles.getSpellKey(spellId) : undefined;
        if (name !== undefined && this.isListedElsewhere(spellId, row)) {
            this.showProblem(string.format(this.locale.getText("MSG_ALREADY_LISTED"), name), ERROR_COLOR);
            return;
        }
        const listId = row.listId ?? row.sharesIdOf;
        const isChanged =
            row.isAdded === true
                ? row.spellId !== undefined && this.addedSpells.changeAdded(row.spellId, spellId)
                : listId !== undefined && this.addedSpells.changeOverride(listId, spellId);
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
