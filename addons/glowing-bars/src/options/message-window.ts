// The small window of a message, opened by the gear of its row: what it says, the player's own words for it, and its color.
import type { AddonLocale } from "../locale/locale.interface";
import type { StyleService } from "../settings/style.service";
import type { TextKey } from "../locale/texts.constants";
import { MESSAGE_SHOW_FOR_CHOICES, MESSAGE_TEXT_CHOICES } from "../settings/settings.constants";
import { NOTICE_SECONDS } from "@wowkit/wow";
import type { MessageTextChoice } from "../settings/settings.interface";
import { connectChoiceMenu } from "./choice-menu";
import type { StyleRow } from "./style-rows.service";
import { connectEscape, createFrameWithBorder } from "./window-frame";

const WINDOW_NAME = "GlowingBarsMessage";
const WINDOW_WIDTH = 340;
const WINDOW_HEIGHT = 222;
const TEXT_LETTERS = 60;
/** Over the table it is opened from. */
const WINDOW_LEVEL = 500;
/** What the Reset of this window puts back: nothing else of the row. */
const MESSAGE_PARTS = ["messageTextChoice", "messageText", "messageColor", "messageShowFor"] as const;
/** The box of the player's own words, while another choice is picked. */
const OFF_ALPHA = 0.4;

const CHOICE_TEXTS: { [choice in MessageTextChoice]: TextKey } = {
    typeOnly: "TEXT_CHOICE_TYPE_ONLY",
    typeAndName: "TEXT_CHOICE_TYPE_AND_NAME",
    name: "TEXT_CHOICE_NAME",
    custom: "TEXT_CHOICE_CUSTOM",
};

interface WindowParts {
    window: Frame;
    title: FontString;
    choice: Button;
    showFor: Button;
    box: EditBox;
    swatchColor: Texture;
}

export class MessageWindow {
    private parts: WindowParts | undefined;
    private row: StyleRow | undefined;

    constructor(
        private readonly locale: AddonLocale,
        private readonly styles: StyleService,
        private readonly chooseColor: (this: void, row: StyleRow) => void,
    ) {}

    open(row: StyleRow): void {
        const parts = this.parts ?? this.createParts();
        this.row = row;
        parts.title.SetText(row.label);
        parts.window.Show();
        this.refresh();
    }

    /** Shows what the row holds now; what is being typed stays. */
    refresh(): void {
        const parts = this.parts;
        const row = this.row;
        if (parts === undefined || row === undefined || !parts.window.IsShown()) return;
        const style = this.styles.getStyle(row.reminderType, row.spellId);
        if (!parts.box.HasFocus()) parts.box.SetText(style.messageText ?? "");
        const [r, g, b] = style.messageColor ?? style.color;
        parts.swatchColor.SetColorTexture(r, g, b, 1);
        const choice = this.styles.getMessageTextChoice(row.reminderType, row.spellId);
        parts.choice.SetText(this.locale.getText(CHOICE_TEXTS[choice]));
        parts.showFor.SetText(this.findShowForLabel(style.messageShowFor ?? NOTICE_SECONDS));
        parts.box.SetEnabled(choice === "custom");
        parts.box.SetAlpha(choice === "custom" ? 1 : OFF_ALPHA);
    }

    private createParts(): WindowParts {
        const window = createFrameWithBorder(WINDOW_NAME);
        window.SetSize(WINDOW_WIDTH, WINDOW_HEIGHT);
        window.SetPoint("CENTER", UIParent, "CENTER", 0, 0);
        window.SetFrameStrata("DIALOG");
        window.SetFrameLevel(WINDOW_LEVEL);
        window.EnableMouse(true);
        connectEscape(window);
        const title = window.CreateFontString(undefined, "OVERLAY", "GameFontNormalLarge");
        title.SetPoint("TOP", window, "TOP", 0, -16);
        const close = CreateFrame("Button", undefined, window, "UIPanelCloseButton");
        close.SetPoint("TOPRIGHT", window, "TOPRIGHT", -6, -6);
        this.createReset(window);
        this.addLabel(window, "MESSAGE_TEXT", -52);
        const choice = this.createChoice(window);
        const box = this.createBox(window);
        this.addLabel(window, "MESSAGE_COLOR", -116);
        const swatchColor = this.createColorControls(window);
        this.addLabel(window, "MESSAGE_SHOW_FOR", -150);
        const showFor = this.createShowFor(window);
        const tip = window.CreateFontString(undefined, "OVERLAY", "GameFontNormalSmall");
        tip.SetPoint("BOTTOM", window, "BOTTOM", 0, 18);
        tip.SetWidth(WINDOW_WIDTH - 40);
        tip.SetText(this.locale.getText("TEXT_MESSAGE_TIP"));
        window.Hide();
        this.parts = { window, title, choice, showFor, box, swatchColor };
        return this.parts;
    }

    private addLabel(window: Frame, text: "MESSAGE_TEXT" | "MESSAGE_COLOR" | "MESSAGE_SHOW_FOR", y: number): void {
        const label = window.CreateFontString(undefined, "OVERLAY", "GameFontHighlight");
        label.SetPoint("TOPLEFT", window, "TOPLEFT", 24, y);
        label.SetText(this.locale.getText(text));
    }

    /** The list of what the message can say; the row is read as it opens. */
    private createChoice(window: Frame): Button {
        const button = CreateFrame("Button", undefined, window, "UIPanelButtonTemplate");
        button.SetSize(220, 24);
        button.SetPoint("TOPLEFT", window, "TOPLEFT", 88, -46);
        connectChoiceMenu(button, () => {
            const row = this.row;
            if (row === undefined) return [];
            return MESSAGE_TEXT_CHOICES.map((choice) => ({
                label: this.locale.getText(CHOICE_TEXTS[choice]),
                isChosen: () => this.styles.getMessageTextChoice(row.reminderType, row.spellId) === choice,
                choose: () => this.styles.changeStyle(row.reminderType, row.spellId, { messageTextChoice: choice }),
            }));
        });
        return button;
    }

    private createReset(window: Frame): void {
        const reset = CreateFrame("Button", undefined, window, "UIPanelButtonTemplate");
        reset.SetSize(56, 22);
        reset.SetPoint("TOPLEFT", window, "TOPLEFT", 14, -12);
        reset.SetText(this.locale.getText("BTN_RESET"));
        reset.SetScript("OnClick", () => {
            const row = this.row;
            if (row === undefined) return;
            // A box still being typed in saves as it lets go: first, so that goes too
            this.parts?.box.ClearFocus();
            for (const part of MESSAGE_PARTS) this.styles.resetPart(row.reminderType, row.spellId, part);
        });
    }

    private findShowForLabel(seconds: number): string {
        return seconds === 0 ? this.locale.getText("SHOW_FOR_GLOWING") : string.format(this.locale.getText("REPEAT_SECONDS"), seconds);
    }

    /** The list of how long the message stays; the row is read as it opens. */
    private createShowFor(window: Frame): Button {
        const button = CreateFrame("Button", undefined, window, "UIPanelButtonTemplate");
        button.SetSize(220, 24);
        button.SetPoint("TOPLEFT", window, "TOPLEFT", 88, -144);
        connectChoiceMenu(button, () => {
            const row = this.row;
            if (row === undefined) return [];
            return MESSAGE_SHOW_FOR_CHOICES.map((seconds) => ({
                label: this.findShowForLabel(seconds),
                isChosen: () => (this.styles.getStyle(row.reminderType, row.spellId).messageShowFor ?? NOTICE_SECONDS) === seconds,
                choose: () => this.styles.changeStyle(row.reminderType, row.spellId, { messageShowFor: seconds }),
            }));
        });
        return button;
    }

    private createBox(window: Frame): EditBox {
        const box = CreateFrame("EditBox", undefined, window, "InputBoxTemplate");
        box.SetSize(220, 20);
        box.SetPoint("TOPLEFT", window, "TOPLEFT", 92, -80);
        box.SetAutoFocus(false);
        box.SetMaxLetters(TEXT_LETTERS);
        box.SetScript("OnEnterPressed", () => box.ClearFocus());
        box.SetScript("OnEscapePressed", () => {
            box.SetText(this.row !== undefined ? (this.styles.getStyle(this.row.reminderType, this.row.spellId).messageText ?? "") : "");
            box.ClearFocus();
        });
        box.SetScript("OnEditFocusLost", () => this.saveText(box));
        return box;
    }

    private saveText(box: EditBox): void {
        const row = this.row;
        if (row === undefined) return;
        const text = box.GetText();
        if (text === "") this.styles.resetPart(row.reminderType, row.spellId, "messageText");
        else this.styles.changeStyle(row.reminderType, row.spellId, { messageText: text });
    }

    private createColorControls(window: Frame): Texture {
        const swatch = CreateFrame("Button", undefined, window);
        swatch.SetSize(22, 16);
        swatch.SetPoint("TOPLEFT", window, "TOPLEFT", 92, -114);
        const swatchColor = swatch.CreateTexture(undefined, "ARTWORK");
        swatchColor.SetAllPoints(swatch);
        swatch.SetScript("OnClick", () => {
            if (this.row !== undefined) this.chooseColor(this.row);
        });
        const same = CreateFrame("Button", undefined, window, "UIPanelButtonTemplate");
        same.SetSize(120, 22);
        same.SetPoint("LEFT", swatch, "RIGHT", 14, 0);
        same.SetText(this.locale.getText("BTN_SAME_AS_GLOW"));
        same.SetScript("OnClick", () => {
            if (this.row !== undefined) this.styles.resetPart(this.row.reminderType, this.row.spellId, "messageColor");
        });
        return swatchColor;
    }
}
