// The window with the table of looks: one row for each type of reminder (its default look) and one for each spell of the
// player's class (a look of its own where the player changed it, else the type's). A row shows the color, the glow %,
// whether a message says so, the sound and how often it repeats; a click or an entry changes it. Opened by /gb and by
// the button on the Settings page. Like the Settings page, this folder may call the game.
import { OnEvent } from "@wowkit/core";
import { SOUNDS, type MessagesService } from "@wowkit/ui";
import type { AddonLocale } from "../locale/locale.interface";
import type { TextKey } from "../locale/texts.constants";
import type { StyleOverride } from "../settings/settings.interface";
import type { StyleService } from "../settings/style.service";
import {
    BRONZE_TEXT,
    COLUMN,
    findCenteredX,
    type Column,
    HEADER_HEIGHT,
    ICON_SIZE,
    OVERRIDDEN_COLOR,
    ROW_HEIGHT,
    STRIPE_ALPHA,
    STRIPE_COLOR,
    TABLE_WIDTH,
    TABLE_WIDTH_WITHOUT_ACTIONS,
    findWindowWidth,
} from "./style-table.constants";
import type { StyleWindowService } from "./style-window.service";
import type { ChoiceButtons, StyleChoicesService } from "./style-choices.service";
import type { StyleEditsService } from "./style-edits.service";
import { TYPE_TEXTS, type StyleRow, type StyleRowsService } from "./style-rows.service";

/** The widgets of one row; the table has as many as its longest list and reuses them. */
interface RowWidgets {
    frame: Frame;
    /** The background of every second row, lighter, so the rows tell apart. */
    stripe: Texture;
    icon: Texture;
    name: FontString;
    typeText: FontString;
    swatch: Button;
    swatchColor: Texture;
    glowPercent: EditBox;
    /** The ID of a cooldown or proc: it can be fixed. */
    spellIdBox: EditBox;
    message: CheckButton;
    sound: Button;
    /** The buttons that click through choices: how often the sound repeats, and when the reminder may show. */
    choices: ChoiceButtons;
    belowBox: EditBox;
    reset: Button;
    /** Takes out a spell the player added. */
    remove: Button;
    /** The type or the spell is on. */
    enabled: CheckButton;
    /** What the row shows now. */
    row: StyleRow | undefined;
}

export class StyleTableService {
    private window: Frame | undefined;
    private content: Frame | undefined;
    private readonly widgets: RowWidgets[] = [];
    private readonly headers: FontString[] = [];
    private usedWidgets = 0;
    private usedHeaders = 0;
    /** How wide the rows are now: the Reset and X column only while a row shows one of its buttons. */
    private tableWidth = TABLE_WIDTH;
    /** The row at the end that adds a spell; made with the first rows. */
    private addRow: Frame | undefined;

    constructor(
        private readonly locale: AddonLocale,
        private readonly styles: StyleService,
        private readonly rows: StyleRowsService,
        private readonly messages: MessagesService,
        private readonly choices: StyleChoicesService,
        private readonly windows: StyleWindowService,
        private readonly edits: StyleEditsService,
    ) {}

    /** Opens the window, or closes it when it is open. A failure is printed, never thrown. */
    toggle(): void {
        const [didSucceed, error] = pcall(() => this.toggleWindow());
        if (!didSucceed) this.messages.say(tostring(error));
    }

    /** A look changed (here or elsewhere): the rows show it. */
    @OnEvent("setting.changed")
    refreshAfterChange(_key: string): void {
        // Any setting: a look, a spell added or fixed, a switch (also one changed on the Settings page)
        if (this.window?.IsShown() === true) this.showRows();
    }

    private toggleWindow(): void {
        if (this.window === undefined) {
            const created = this.windows.createWindow();
            this.window = created.window;
            this.content = created.content;
        }
        if (this.window.IsShown()) {
            this.window.Hide();
            return;
        }
        this.showRows();
        this.window.Show();
    }

    /** Lays out the two lists: a header, the types, a header, the spells. */
    private showRows(): void {
        const content = this.content;
        if (content === undefined) return;
        this.usedWidgets = 0;
        this.usedHeaders = 0;
        const spellRows = this.rows.listSpellRows();
        const typeRows = this.rows.listTypeRows(spellRows);
        this.applyTableWidth(content, [...typeRows, ...spellRows]);
        let y = this.drawSection(content, "HDR_TABLE_DEFAULTS", typeRows, 0);
        y = this.drawSection(content, "HDR_TABLE_SPELLS", spellRows, y);
        y = this.drawAddRow(content, y);
        for (let i = this.usedHeaders; i < this.headers.length; i++) this.headers[i]!.Hide();
        for (let i = this.usedWidgets; i < this.widgets.length; i++) this.widgets[i]!.frame.Hide();
        content.SetHeight(math.max(10, y));
    }

    /** The window is as wide as the columns in use: without the Reset and X column while no row shows one of its buttons. */
    private applyTableWidth(content: Frame, rows: StyleRow[]): void {
        const hasActions = rows.some((row) => row.isAdded === true || this.styles.isOverridden(row.reminderType, row.spellId));
        this.tableWidth = hasActions ? TABLE_WIDTH : TABLE_WIDTH_WITHOUT_ACTIONS;
        if (this.window !== undefined) this.windows.setWidthToFit(this.window, findWindowWidth(this.tableWidth));
        content.SetWidth(this.tableWidth);
    }

    /** A header and a row for each entry, from `top` down; returns where the next section starts. */
    private drawSection(content: Frame, headerText: TextKey, rows: StyleRow[], top: number): number {
        const header = this.takeHeader(content);
        header.SetPoint("TOPLEFT", content, "TOPLEFT", 0, -top);
        header.SetText(this.locale.getText(headerText));
        header.Show();
        let y = top + HEADER_HEIGHT;
        for (const row of rows) {
            const widgets = this.takeWidgets(content);
            widgets.row = row;
            widgets.frame.ClearAllPoints();
            widgets.frame.SetPoint("TOPLEFT", content, "TOPLEFT", 0, -y);
            widgets.frame.SetWidth(this.tableWidth);
            widgets.frame.Show();
            this.fill(widgets, row);
            widgets.stripe.SetColorTexture(
                STRIPE_COLOR[0],
                STRIPE_COLOR[1],
                STRIPE_COLOR[2],
                this.usedWidgets % 2 === 0 ? STRIPE_ALPHA : 0,
            );
            y += ROW_HEIGHT;
        }
        return y + 10;
    }

    /** The header and the row that adds a spell by its ID, at the end of the list. */
    private drawAddRow(content: Frame, top: number): number {
        const header = this.takeHeader(content);
        header.SetPoint("TOPLEFT", content, "TOPLEFT", 0, -top);
        header.SetText(this.locale.getText("HDR_TABLE_ADD"));
        header.Show();
        this.addRow = this.addRow ?? this.edits.createAddRow(content);
        this.addRow.ClearAllPoints();
        this.addRow.SetPoint("TOPLEFT", content, "TOPLEFT", 0, -(top + HEADER_HEIGHT));
        this.addRow.Show();
        return top + HEADER_HEIGHT + ROW_HEIGHT + 10;
    }

    private takeHeader(content: Frame): FontString {
        let header = this.headers[this.usedHeaders];
        if (header === undefined) {
            header = content.CreateFontString(undefined, "OVERLAY", "GameFontNormalLarge");
            this.headers.push(header);
        }
        this.usedHeaders += 1;
        header.ClearAllPoints();
        return header;
    }

    private takeWidgets(content: Frame): RowWidgets {
        let widgets = this.widgets[this.usedWidgets];
        if (widgets === undefined) {
            widgets = this.createWidgets(content);
            this.widgets.push(widgets);
        }
        this.usedWidgets += 1;
        return widgets;
    }

    /** What a row shows: the look of its type or spell, and whether it is the player's own. */
    private fill(widgets: RowWidgets, row: StyleRow): void {
        const style = this.styles.getStyle(row.reminderType, row.spellId);
        const isOverridden = this.styles.isOverridden(row.reminderType, row.spellId);
        widgets.icon.SetShown(row.iconId !== undefined);
        // The client takes an icon's file ID as well as a path; the typing knows only the path
        if (row.iconId !== undefined) widgets.icon.SetTexture(row.iconId as unknown as string);
        widgets.name.SetText(row.label);
        const [r, g, b] = isOverridden && row.spellId !== undefined ? OVERRIDDEN_COLOR : [1, 1, 1];
        widgets.name.SetTextColor(r, g, b);
        widgets.typeText.SetTextColor(BRONZE_TEXT[0], BRONZE_TEXT[1], BRONZE_TEXT[2]);
        widgets.typeText.SetText(row.spellId !== undefined ? this.locale.getText(TYPE_TEXTS[row.reminderType]) : "");
        widgets.swatchColor.SetColorTexture(style.color[0], style.color[1], style.color[2], 1);
        widgets.glowPercent.SetText(string.format("%d", style.glowPercent));
        widgets.message.SetChecked(style.isMessageOn);
        widgets.sound.SetText(SOUNDS.find((sound) => sound.key === style.sound)?.label ?? "");
        this.choices.fillChoices(widgets.choices, row);
        widgets.reset.SetShown(isOverridden);
        widgets.remove.SetShown(row.isAdded === true);
        this.edits.fillEnabled(widgets.enabled, widgets.frame, row);
        this.edits.fillIdBox(widgets.spellIdBox, row);
        this.edits.fillBelowBox(widgets.belowBox, row);
    }

    private createWidgets(content: Frame): RowWidgets {
        const frame = CreateFrame("Frame", undefined, content);
        frame.SetSize(TABLE_WIDTH, ROW_HEIGHT);
        // The ID box asks for the row it shows when it is used, by then the object below is there
        const widgets: RowWidgets = {
            frame,
            stripe: this.createStripe(frame),
            icon: this.createIcon(frame),
            name: this.createText(frame, COLUMN.name, "GameFontHighlight"),
            typeText: this.createText(frame, COLUMN.type, "GameFontNormalSmall"),
            ...this.createSwatch(frame),
            glowPercent: this.createGlowPercentBox(frame),
            message: CreateFrame("CheckButton", undefined, frame, "UICheckButtonTemplate"),
            sound: CreateFrame("Button", undefined, frame, "UIPanelButtonTemplate"),
            reset: CreateFrame("Button", undefined, frame, "UIPanelButtonTemplate"),
            remove: CreateFrame("Button", undefined, frame, "UIPanelButtonTemplate"),
            enabled: CreateFrame("CheckButton", undefined, frame, "UICheckButtonTemplate"),
            choices: this.choices.createChoiceButtons(frame, () => widgets.row),
            spellIdBox: this.edits.createIdBox(frame, () => widgets.row),
            belowBox: this.edits.createBelowBox(frame, () => widgets.row),
            row: undefined,
        };
        this.connectSwatch(widgets);
        this.connectGlowPercent(widgets);
        this.connectMessage(widgets);
        this.connectSound(widgets);
        this.connectReset(widgets);
        this.edits.connectRemove(widgets.remove, () => widgets.row);
        this.edits.connectEnabled(widgets.enabled, () => widgets.row);
        this.choices.addTypeTooltip(frame, () => widgets.row);
        return widgets;
    }

    private createStripe(frame: Frame): Texture {
        const stripe = frame.CreateTexture(undefined, "BACKGROUND");
        stripe.SetAllPoints(frame);
        return stripe;
    }

    private createIcon(frame: Frame): Texture {
        const icon = frame.CreateTexture(undefined, "ARTWORK");
        icon.SetSize(ICON_SIZE, ICON_SIZE);
        icon.SetPoint("LEFT", frame, "LEFT", findCenteredX(COLUMN.icon, ICON_SIZE), 0);
        return icon;
    }

    private createText(frame: Frame, column: Column, font: string): FontString {
        const text = frame.CreateFontString(undefined, "OVERLAY", font);
        text.SetPoint("LEFT", frame, "LEFT", column.x, 0);
        text.SetWidth(column.width - 4);
        text.SetJustifyH("LEFT");
        return text;
    }

    private createSwatch(frame: Frame): { swatch: Button; swatchColor: Texture } {
        const swatch = CreateFrame("Button", undefined, frame);
        swatch.SetSize(22, 16);
        swatch.SetPoint("LEFT", frame, "LEFT", findCenteredX(COLUMN.color, 22), 0);
        const border = swatch.CreateTexture(undefined, "BACKGROUND");
        border.SetAllPoints(swatch);
        border.SetColorTexture(0.55, 0.42, 0.2, 1);
        const swatchColor = swatch.CreateTexture(undefined, "ARTWORK");
        swatchColor.SetPoint("TOPLEFT", swatch, "TOPLEFT", 1, -1);
        swatchColor.SetPoint("BOTTOMRIGHT", swatch, "BOTTOMRIGHT", -1, 1);
        return { swatch, swatchColor };
    }

    private createGlowPercentBox(frame: Frame): EditBox {
        const box = CreateFrame("EditBox", undefined, frame, "InputBoxTemplate");
        box.SetSize(36, 20);
        box.SetPoint("LEFT", frame, "LEFT", findCenteredX(COLUMN.glowPercent, 36) + 3, 0);
        box.SetAutoFocus(false);
        box.SetNumeric(true);
        box.SetMaxLetters(3);
        return box;
    }

    private connectSwatch(widgets: RowWidgets): void {
        widgets.swatch.SetScript("OnClick", () => {
            if (widgets.row !== undefined) this.choices.chooseColor(widgets.row);
        });
    }

    private connectGlowPercent(widgets: RowWidgets): void {
        const apply = () => {
            const row = widgets.row;
            const percent = tonumber(widgets.glowPercent.GetText());
            if (row !== undefined && percent !== undefined) {
                const glowPercent = math.max(1, math.min(100, math.floor(percent + 0.5)));
                this.styles.changeStyle(row.reminderType, row.spellId, { glowPercent });
            }
            widgets.glowPercent.ClearFocus();
        };
        widgets.glowPercent.SetScript("OnEnterPressed", apply);
        widgets.glowPercent.SetScript("OnEditFocusLost", apply);
        widgets.glowPercent.SetScript("OnEscapePressed", () => {
            if (widgets.row !== undefined) this.fill(widgets, widgets.row);
            widgets.glowPercent.ClearFocus();
        });
    }

    private connectMessage(widgets: RowWidgets): void {
        widgets.message.SetPoint("LEFT", widgets.frame, "LEFT", findCenteredX(COLUMN.message, 24), 0);
        widgets.message.SetSize(24, 24);
        widgets.message.SetScript("OnClick", () => this.change(widgets, { isMessageOn: widgets.message.GetChecked() }));
    }

    /** Left click: the next sound; right click: the one before. Choosing one plays it once as a preview. */
    private connectSound(widgets: RowWidgets): void {
        widgets.sound.SetSize(126, 24);
        widgets.sound.SetPoint("LEFT", widgets.frame, "LEFT", findCenteredX(COLUMN.sound, 126), 0);
        widgets.sound.RegisterForClicks("LeftButtonUp", "RightButtonUp");
        widgets.sound.SetScript("OnClick", (_button, mouseButton) => {
            if (widgets.row !== undefined) this.choices.chooseNextSound(widgets.row, mouseButton === "RightButton" ? -1 : 1);
        });
    }

    private connectReset(widgets: RowWidgets): void {
        widgets.reset.SetSize(46, 22);
        widgets.reset.SetPoint("LEFT", widgets.frame, "LEFT", COLUMN.actions.x + 2, 0);
        widgets.reset.SetText(this.locale.getText("BTN_RESET"));
        widgets.reset.SetScript("OnClick", () => {
            const row = widgets.row;
            if (row === undefined) return;
            if (row.spellId === undefined) this.styles.resetType(row.reminderType);
            else this.styles.resetSpell(row.reminderType, row.spellId);
        });
    }

    private change(widgets: RowWidgets, change: StyleOverride): void {
        const row = widgets.row;
        if (row !== undefined) this.styles.changeStyle(row.reminderType, row.spellId, change);
    }
}
