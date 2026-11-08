// The welcome window: a word of welcome, the setting new players trip over, and what the scan of the action bars found.
import type { AddonLocale } from "../locale/locale.interface";
import type { TextKey } from "../locale/texts.constants";
import { connectEscape, createFrameWithBorder } from "./window-frame";

const WINDOW_NAME = "GlowingBarsWelcome";
const WINDOW_WIDTH = 460;
const WINDOW_HEIGHT = 462;
/** The picture with the addon's name, built from assets/welcome-header.png. */
const HEADER_TEXTURE = "Interface\\AddOns\\GlowingBars\\images\\welcome-header";
const HEADER_WIDTH = 420;
const HEADER_HEIGHT = 105;
const TEXT_WIDTH = WINDOW_WIDTH - 48;
/** In front of What's new, which may open with it. */
const WINDOW_LEVEL = 600;

/** Where the window keeps the setting. */
export interface WelcomeChoice {
    isQuiet(this: void): boolean;
    setQuiet(this: void, isQuiet: boolean): void;
    isAfkRainbow(this: void): boolean;
    setAfkRainbow(this: void, isOn: boolean): void;
    scan(this: void): void;
    noteClosed(this: void): void;
}

interface WindowParts {
    window: Frame;
    quietBox: CheckButton;
    afkBox: CheckButton;
    result: FontString;
    report: EditBox;
    reportTip: FontString;
}

export class WelcomeWindow {
    private parts: WindowParts | undefined;

    constructor(
        private readonly locale: AddonLocale,
        private readonly choice: WelcomeChoice,
    ) {}

    open(): void {
        const parts = this.parts ?? this.createParts();
        parts.quietBox.SetChecked(this.choice.isQuiet());
        parts.afkBox.SetChecked(this.choice.isAfkRainbow());
        parts.window.Show();
    }

    /** What the scan says, and the text to copy for a bug report. */
    showResult(text: string, report: string): void {
        if (this.parts === undefined) return;
        this.parts.result.SetText(text);
        this.parts.report.SetText(report);
        this.parts.reportTip.SetText(this.locale.getText("WELCOME_REPORT_TIP"));
    }

    private createParts(): WindowParts {
        const window = createFrameWithBorder(WINDOW_NAME);
        window.SetSize(WINDOW_WIDTH, WINDOW_HEIGHT);
        window.SetPoint("CENTER", UIParent, "CENTER", 0, 0);
        window.SetFrameStrata("DIALOG");
        window.SetFrameLevel(WINDOW_LEVEL);
        window.EnableMouse(true);
        connectEscape(window);
        const header = window.CreateTexture(undefined, "ARTWORK");
        header.SetSize(HEADER_WIDTH, HEADER_HEIGHT);
        header.SetPoint("TOP", window, "TOP", 0, -14);
        header.SetTexture(HEADER_TEXTURE);
        this.addText(window, "GameFontHighlight", "WELCOME_TEXT", -128);
        const quietBox = this.createBox(window, "OPT_STAY_QUIET_IN_TOWNS", -184, (isOn) => this.choice.setQuiet(isOn));
        const afkBox = this.createBox(window, "WELCOME_AFK_RAINBOW", -234, (isOn) => this.choice.setAfkRainbow(isOn));
        this.addText(window, "GameFontNormalSmall", "WELCOME_QUIET_TIP", -212);
        const result = window.CreateFontString(undefined, "OVERLAY", "GameFontHighlight");
        result.SetPoint("TOP", window, "TOP", 0, -276);
        result.SetWidth(TEXT_WIDTH);
        const report = this.createReport(window);
        const reportTip = this.addText(window, "GameFontNormalSmall", "WELCOME_REPORT_TIP", -336);
        this.addText(window, "GameFontNormalSmall", "WELCOME_TIP", -364);
        const ok = CreateFrame("Button", undefined, window, "UIPanelButtonTemplate");
        ok.SetSize(90, 24);
        ok.SetPoint("BOTTOM", window, "BOTTOM", 55, 18);
        ok.SetText(this.locale.getText("BTN_OK"));
        ok.SetScript("OnClick", () => window.Hide());
        const scan = CreateFrame("Button", undefined, window, "UIPanelButtonTemplate");
        scan.SetSize(90, 24);
        scan.SetPoint("BOTTOM", window, "BOTTOM", -55, 18);
        scan.SetText(this.locale.getText("BTN_SCAN"));
        scan.SetScript("OnClick", () => this.choice.scan());
        window.Hide();
        window.SetScript("OnHide", () => this.choice.noteClosed());
        this.parts = { window, quietBox, afkBox, result, report, reportTip };
        return this.parts;
    }

    private addText(window: Frame, font: string, text: TextKey, y: number): FontString {
        const line = window.CreateFontString(undefined, "OVERLAY", font);
        line.SetPoint("TOP", window, "TOP", 0, y);
        line.SetWidth(TEXT_WIDTH);
        line.SetText(this.locale.getText(text));
        return line;
    }

    private createBox(window: Frame, text: TextKey, y: number, set: (this: void, isOn: boolean) => void): CheckButton {
        const box = CreateFrame("CheckButton", undefined, window, "UICheckButtonTemplate");
        box.SetSize(24, 24);
        box.SetPoint("TOPLEFT", window, "TOPLEFT", 24, y);
        box.SetScript("OnClick", () => set(box.GetChecked()));
        const label = window.CreateFontString(undefined, "OVERLAY", "GameFontHighlight");
        label.SetPoint("LEFT", box, "RIGHT", 6, 0);
        label.SetText(this.locale.getText(text));
        return box;
    }

    /** The report in a box, and the button that selects it: an addon cannot copy, so the player presses Ctrl+C. */
    private createReport(window: Frame): EditBox {
        const box = CreateFrame("EditBox", undefined, window, "InputBoxTemplate");
        box.SetSize(310, 20);
        box.SetPoint("TOPLEFT", window, "TOPLEFT", 30, -308);
        box.SetAutoFocus(false);
        box.SetScript("OnEscapePressed", () => box.ClearFocus());
        const copy = CreateFrame("Button", undefined, window, "UIPanelButtonTemplate");
        copy.SetSize(80, 22);
        copy.SetPoint("LEFT", box, "RIGHT", 10, 0);
        copy.SetText(this.locale.getText("BTN_SELECT"));
        copy.SetScript("OnClick", () => {
            box.SetFocus();
            box.HighlightText();
            this.parts?.reportTip.SetText(this.locale.getText("WELCOME_PRESS_COPY"));
        });
        return box;
    }
}
