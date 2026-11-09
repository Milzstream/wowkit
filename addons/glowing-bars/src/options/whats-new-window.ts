// The What's new window: the versions on the left, the notes of the one picked on the right, and at the bottom the box
// that keeps it from opening by itself. Opened by /gb changelog, the Settings page, or once after an update with something
// new in it.
import type { AddonLocale } from "../locale/locale.interface";
import { RELEASE_NOTES } from "../changelog/release-notes.generated";
import { BORDER_COLOR } from "./style-table.constants";
import { applyScrollBarTint, connectEscape, createFrameWithBorder, createCloseButton } from "./window-frame";

const WINDOW_NAME = "GlowingBarsWhatsNew";
const WINDOW_WIDTH = 620;
const WINDOW_HEIGHT = 440;
const LIST_WIDTH = 110;
const VERSION_HEIGHT = 22;
const TEXT_WIDTH = 420;
/** Under the lists: the box on one line, the tip on the next. */
const BOTTOM_ROOM = 64;
/** The version picked, in the game's gold; the others white. */
const PICKED_COLOR: [number, number, number] = [1, 0.82, 0];
/** The list of versions stands on a lighter brown than the window's, with a bronze line beside it. */
const LIST_BACKGROUND: [number, number, number] = [0.17, 0.12, 0.07];

/** Where the window keeps whether it opens by itself (the account's choice, kept by WhatsNewService). */
export interface WhatsNewChoice {
    isOff(this: void): boolean;
    setOff(this: void, isOff: boolean): void;
}

export class WhatsNewWindow {
    private window: Frame | undefined;
    private text: FontString | undefined;
    private textContent: Frame | undefined;
    private readonly versionButtons: Button[] = [];
    private offBox: CheckButton | undefined;

    constructor(
        private readonly locale: AddonLocale,
        private readonly choice: WhatsNewChoice,
    ) {}

    /** Opens the window on a version's notes (the newest by default). */
    open(version?: string): void {
        const window = this.window ?? this.createWindow();
        this.offBox?.SetChecked(this.choice.isOff());
        this.showVersion(version ?? RELEASE_NOTES[0]?.version);
        window.Show();
    }

    private showVersion(version: string | undefined): void {
        const note = RELEASE_NOTES.find((candidate) => candidate.version === version) ?? RELEASE_NOTES[0];
        if (note === undefined || this.text === undefined) return;
        this.text.SetText(`|cffffd100${this.locale.getText("TITLE")} ${note.version}|r  |cff999999${note.date}|r\n\n${note.text}`);
        this.textContent?.SetHeight(((this.text.GetStringHeight() as number | undefined) ?? 0) + 20);
        RELEASE_NOTES.forEach((candidate, index) => {
            const label = this.versionButtons[index]?.GetFontString();
            const [r, g, b] = candidate === note ? PICKED_COLOR : [1, 1, 1];
            label?.SetTextColor(r, g, b);
        });
    }

    private createWindow(): Frame {
        const window = createFrameWithBorder(WINDOW_NAME);
        window.SetSize(WINDOW_WIDTH, WINDOW_HEIGHT);
        window.SetPoint("CENTER", UIParent, "CENTER", 0, 0);
        window.SetFrameStrata("DIALOG");
        window.SetMovable(true);
        window.EnableMouse(true);
        window.RegisterForDrag("LeftButton");
        window.SetScript("OnDragStart", () => window.StartMoving());
        window.SetScript("OnDragStop", () => window.StopMovingOrSizing());
        connectEscape(window);
        const title = window.CreateFontString(undefined, "OVERLAY", "GameFontNormalLarge");
        title.SetPoint("TOP", window, "TOP", 0, -16);
        title.SetText(this.locale.getText("TITLE_WHATS_NEW"));
        createCloseButton(window);
        this.createVersionList(window);
        this.createTextArea(window);
        this.createOffBox(window);
        window.Hide();
        this.window = window;
        return window;
    }

    /** The versions, newest first, in a list of their own that scrolls. */
    private createVersionList(window: Frame): void {
        // Above the window's own background, under the list
        const background = window.CreateTexture(undefined, "BORDER");
        background.SetPoint("TOPLEFT", window, "TOPLEFT", 12, -44);
        background.SetPoint("BOTTOMLEFT", window, "BOTTOMLEFT", 12, BOTTOM_ROOM - 4);
        background.SetWidth(LIST_WIDTH + 34);
        background.SetColorTexture(LIST_BACKGROUND[0], LIST_BACKGROUND[1], LIST_BACKGROUND[2], 1);
        const line = window.CreateTexture(undefined, "BORDER");
        line.SetPoint("TOPLEFT", background, "TOPRIGHT", 0, 0);
        line.SetPoint("BOTTOMLEFT", background, "BOTTOMRIGHT", 0, 0);
        line.SetWidth(1);
        line.SetColorTexture(BORDER_COLOR[0], BORDER_COLOR[1], BORDER_COLOR[2], 1);
        const scroll = CreateFrame("ScrollFrame", undefined, window, "UIPanelScrollFrameTemplate");
        scroll.SetPoint("TOPLEFT", window, "TOPLEFT", 18, -48);
        scroll.SetPoint("BOTTOMLEFT", window, "BOTTOMLEFT", 18, BOTTOM_ROOM);
        scroll.SetWidth(LIST_WIDTH);
        applyScrollBarTint(scroll);
        const list = CreateFrame("Frame", undefined, scroll);
        list.SetSize(LIST_WIDTH, RELEASE_NOTES.length * VERSION_HEIGHT);
        scroll.SetScrollChild(list);
        RELEASE_NOTES.forEach((note, index) => {
            const button = CreateFrame("Button", undefined, list);
            button.SetSize(LIST_WIDTH, VERSION_HEIGHT);
            button.SetPoint("TOPLEFT", list, "TOPLEFT", 0, -index * VERSION_HEIGHT);
            button.SetNormalFontObject((_G as unknown as { GameFontHighlight: Font }).GameFontHighlight);
            button.SetText(note.version);
            button.GetFontString()?.SetJustifyH("LEFT");
            button.GetFontString()?.SetPoint("LEFT", button, "LEFT", 6, 0);
            button.SetScript("OnClick", () => this.showVersion(note.version));
            this.versionButtons.push(button);
        });
    }

    /** The notes of the version picked, in a scroll area. */
    private createTextArea(window: Frame): void {
        const scroll = CreateFrame("ScrollFrame", undefined, window, "UIPanelScrollFrameTemplate");
        scroll.SetPoint("TOPLEFT", window, "TOPLEFT", LIST_WIDTH + 52, -48);
        scroll.SetPoint("BOTTOMRIGHT", window, "BOTTOMRIGHT", -36, BOTTOM_ROOM);
        applyScrollBarTint(scroll);
        const content = CreateFrame("Frame", undefined, scroll);
        content.SetSize(TEXT_WIDTH, 10);
        scroll.SetScrollChild(content);
        const text = content.CreateFontString(undefined, "OVERLAY", "GameFontHighlight");
        text.SetPoint("TOPLEFT", content, "TOPLEFT", 0, 0);
        text.SetWidth(TEXT_WIDTH);
        text.SetJustifyH("LEFT");
        text.SetJustifyV("TOP");
        text.SetWordWrap(true);
        this.text = text;
        this.textContent = content;
    }

    /** The box at the bottom: ticked, the window no longer opens by itself after an update. */
    private createOffBox(window: Frame): void {
        const box = CreateFrame("CheckButton", undefined, window, "UICheckButtonTemplate");
        box.SetSize(24, 24);
        box.SetPoint("BOTTOMLEFT", window, "BOTTOMLEFT", 18, 32);
        box.SetScript("OnClick", () => this.choice.setOff(box.GetChecked()));
        const label = window.CreateFontString(undefined, "OVERLAY", "GameFontHighlightSmall");
        label.SetPoint("LEFT", box, "RIGHT", 4, 0);
        label.SetText(this.locale.getText("OPT_WHATS_NEW_OFF"));
        // Where to find it again, once it no longer opens by itself
        const tip = window.CreateFontString(undefined, "OVERLAY", "GameFontDisableSmall");
        tip.SetPoint("BOTTOMLEFT", window, "BOTTOMLEFT", 24, 16);
        tip.SetJustifyH("LEFT");
        tip.SetText(this.locale.getText("TEXT_WHATS_NEW_TIP"));
        this.offBox = box;
    }
}
