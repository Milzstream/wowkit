// The frame of the table of looks: the classic dialog border, the title, the close button, the column headers and the
// scroll area. The rows are the table's.
import type { AddonLocale } from "../locale/locale.interface";
import type { TextKey } from "../locale/texts.constants";
import type { AddonSettingsService } from "../settings/settings.interface";
import { CustomSoundsSection } from "./custom-sounds-section";
import {
    BORDER_COLOR,
    COLUMN,
    findColumns,
    TABLE_LEFT,
    TABLE_WIDTH,
    WINDOW_HEIGHT,
    WINDOW_NAME,
    findWindowWidth,
    type Column,
} from "./style-table.constants";

/** What the window leaves free of the screen's width when it has to shrink. */
const SCREEN_MARGIN = 40;

/** The headers that explain their column as the mouse comes over them. */
const HEADER_TIPS: { [name in keyof typeof COLUMN]?: TextKey } = {
    type: "TIP_TYPE",
    id: "TIP_ID",
    color: "TIP_COLOR",
    glowPercent: "TIP_GLOW_PERCENT",
    message: "TIP_MESSAGE",
    sound: "TIP_SOUND",
    repeat: "TIP_REPEAT",
    when: "TIP_WHEN",
    glowTime: "TIP_GLOW_TIME",
    animation: "TIP_ANIMATION",
    belowLimits: "TIP_BELOW",
    enabled: "TIP_ENABLED",
    actions: "TIP_ACTIONS",
};

export class StyleWindowService {
    /** The column headers, and what each one's column is called. */
    private readonly headers: { header: FontString; hover?: Frame; column: keyof typeof COLUMN }[] = [];
    private viewButton: Button | undefined;
    private customSounds: CustomSoundsSection | undefined;
    private hasBelow = false;

    constructor(
        private readonly locale: AddonLocale,
        private readonly settings: AddonSettingsService,
    ) {}

    /** Does the table show every column, not only the ones everybody needs? */
    isAdvanced(): boolean {
        return this.settings.get("isTableAdvanced");
    }

    /** Does any row have a limit? Without one the Below column is left out. */
    setBelowShown(hasBelow: boolean): void {
        this.hasBelow = hasBelow;
    }

    /** The folders with sounds of the player's own; returns where the next thing goes. */
    drawCustomSounds(content: Frame, top: number): number {
        this.customSounds = this.customSounds ?? new CustomSoundsSection(this.locale, this.settings);
        return this.customSounds.drawLines(content, top);
    }

    /** Where the columns are now. */
    getColumns(): ReturnType<typeof findColumns> {
        return findColumns(this.isAdvanced(), this.hasBelow);
    }

    /** The headers and the button say which view it is. */
    showView(window: Frame): void {
        const columns = this.getColumns();
        for (const { header, hover, column } of this.headers) {
            const shown = columns[column];
            header.SetShown(shown !== undefined);
            hover?.SetShown(shown !== undefined);
            if (shown !== undefined) this.applyHeaderPosition(window, header, hover, shown);
        }
        this.viewButton?.SetText(this.locale.getText(this.isAdvanced() ? "BTN_BASIC" : "BTN_ADVANCED"));
    }

    private applyHeaderPosition(window: Frame, header: FontString, hover: Frame | undefined, column: Column): void {
        header.ClearAllPoints();
        header.SetPoint("TOPLEFT", window, "TOPLEFT", TABLE_LEFT + column.x, -42);
        hover?.ClearAllPoints();
        hover?.SetPoint("TOPLEFT", window, "TOPLEFT", TABLE_LEFT + column.x, -38);
    }

    /** Sets the width of the window, and shrinks it as a whole on a screen too narrow for it (a large UI scale). */
    setWidthToFit(window: Frame, width: number): void {
        window.SetWidth(width);
        window.SetScale(math.min(1, (UIParent.GetWidth() - SCREEN_MARGIN) / width));
        this.showView(window);
    }

    /** The frame, and the frame inside its scroll area that the rows go in. */
    createWindow(): { window: Frame; content: Frame } {
        const window = this.createFrameWithBorder();
        window.SetSize(findWindowWidth(TABLE_WIDTH), WINDOW_HEIGHT);
        window.SetPoint("CENTER", UIParent, "CENTER", 0, 0);
        window.SetFrameStrata("DIALOG");
        window.SetMovable(true);
        window.EnableMouse(true);
        window.RegisterForDrag("LeftButton");
        window.SetScript("OnDragStart", () => window.StartMoving());
        window.SetScript("OnDragStop", () => window.StopMovingOrSizing());
        this.connectEscape(window);
        const title = window.CreateFontString(undefined, "OVERLAY", "GameFontNormalLarge");
        title.SetPoint("TOP", window, "TOP", 0, -16);
        title.SetText(this.locale.getText("TABLE_TITLE"));
        const close = CreateFrame("Button", undefined, window, "UIPanelCloseButton");
        close.SetPoint("TOPRIGHT", window, "TOPRIGHT", -6, -6);
        this.createViewButton(window);
        this.addColumnHeaders(window);
        const scroll = CreateFrame("ScrollFrame", undefined, window, "UIPanelScrollFrameTemplate");
        scroll.SetPoint("TOPLEFT", window, "TOPLEFT", TABLE_LEFT, -60);
        scroll.SetPoint("BOTTOMRIGHT", window, "BOTTOMRIGHT", -34, 16);
        this.applyScrollBarTint(scroll);
        const content = CreateFrame("Frame", undefined, scroll);
        content.SetSize(TABLE_WIDTH, 10);
        scroll.SetScrollChild(content);
        // A new frame is shown; the table opens when it is asked for
        window.Hide();
        return { window, content };
    }

    /**
     * Escape closes the window: it takes the key itself while it is open, and lets every other key on to the game. Not
     * through the game's list of windows Escape closes (UISpecialFrames): its own Escape handling reads that list, and a
     * name an addon put there taints it, so the game then blocks what it does next (ClearTarget, the game menu...). In
     * combat the game does not let the keys' passing on change: there every key goes on, and the close button closes.
     */
    private connectEscape(window: Frame): void {
        if (InCombatLockdown()) return;
        window.EnableKeyboard(true);
        window.SetPropagateKeyboardInput(true);
        window.SetScript("OnKeyDown", (_frame, key) => {
            if (InCombatLockdown()) return;
            const isEscape = key === "ESCAPE";
            window.SetPropagateKeyboardInput(!isEscape);
            if (isEscape) window.Hide();
        });
    }

    /** A solid dark brown window, with the bronze border of the classic dialogs where the client has the art for it. */
    private createFrameWithBorder(): Frame {
        const [didSucceed, created] = pcall(() => CreateFrame("Frame", WINDOW_NAME, UIParent, "BackdropTemplate"));
        const frame = didSucceed ? (created as Frame) : CreateFrame("Frame", WINDOW_NAME, UIParent);
        // The background is a texture of our own: a backdrop file the client lacks would leave the window see-through
        const background = frame.CreateTexture(undefined, "BACKGROUND");
        background.SetPoint("TOPLEFT", frame, "TOPLEFT", 6, -6);
        background.SetPoint("BOTTOMRIGHT", frame, "BOTTOMRIGHT", -6, 6);
        background.SetColorTexture(0.1, 0.07, 0.04, 1);
        if (didSucceed) {
            const backdrop = created as Frame & BackdropFrame;
            backdrop.SetBackdrop({
                edgeFile: "Interface\\DialogFrame\\UI-DialogBox-Border",
                edgeSize: 32,
                insets: { left: 11, right: 12, top: 12, bottom: 11 },
            });
            // The border art is silver; tinted, it is the bronze of Forever's own windows
            backdrop.SetBackdropBorderColor(BORDER_COLOR[0], BORDER_COLOR[1], BORDER_COLOR[2]);
        }
        return frame;
    }

    /** The scroll bar of the template is silver art too: tinted like the border. A client without it keeps it silver. */
    private applyScrollBarTint(scroll: ScrollFrame): void {
        const bar = (scroll as unknown as { ScrollBar?: Frame }).ScrollBar;
        if (bar !== undefined) pcall(() => this.applyTextureTint(bar, 0));
    }

    /** Every texture of the frame and of its children (the arrow buttons, the thumb), two levels down. */
    private applyTextureTint(frame: Frame, depth: number): void {
        for (const region of [...frame.GetRegions()]) {
            if (region.GetObjectType() === "Texture") region.SetVertexColor(BORDER_COLOR[0], BORDER_COLOR[1], BORDER_COLOR[2]);
        }
        if (depth < 2) for (const child of [...frame.GetChildren()]) this.applyTextureTint(child, depth + 1);
    }

    /** Next to the close button: it leads to the other view. */
    private createViewButton(window: Frame): void {
        const button = CreateFrame("Button", undefined, window, "UIPanelButtonTemplate");
        button.SetSize(80, 22);
        button.SetPoint("TOPRIGHT", window, "TOPRIGHT", -34, -9);
        button.SetScript("OnClick", () => this.settings.change("isTableAdvanced", !this.isAdvanced()));
        this.viewButton = button;
    }

    private addColumnHeaders(window: Frame): void {
        // The name and the type read from the left; the other headers are centered over their controls
        const columns: [name: keyof typeof COLUMN, text: TextKey, isCentered: boolean][] = [
            ["name", "COL_SPELL_ITEM", false],
            ["type", "COL_TYPE", false],
            ["id", "COL_SPELL_ITEM_ID", true],
            ["color", "COL_COLOR", true],
            ["glowPercent", "COL_GLOW_PERCENT", true],
            ["message", "COL_MESSAGE", true],
            ["sound", "COL_SOUND", true],
            ["repeat", "COL_REPEAT", true],
            ["when", "COL_WHEN", true],
            ["glowTime", "COL_GLOW_TIME", true],
            ["animation", "COL_ANIMATION", true],
            ["belowLimits", "COL_BELOW", true],
            ["enabled", "COL_ENABLED", true],
            ["actions", "COL_ACTIONS", true],
        ];
        for (const [name, text, isCentered] of columns) {
            const column = COLUMN[name];
            const header = window.CreateFontString(undefined, "OVERLAY", "GameFontNormalSmall");
            header.SetPoint("TOPLEFT", window, "TOPLEFT", TABLE_LEFT + column.x, -42);
            header.SetWidth(column.width);
            header.SetJustifyH(isCentered ? "CENTER" : "LEFT");
            header.SetText(this.locale.getText(text));
            const tip = HEADER_TIPS[name];
            const hover = tip !== undefined ? this.addHeaderTooltip(window, column, tip) : undefined;
            this.headers.push({ header, hover, column: name });
        }
    }

    /** A header that explains its column as the mouse comes over it (the round buttons, for the animations). */
    private addHeaderTooltip(window: Frame, column: Column, tip: TextKey): Frame {
        const hover = CreateFrame("Frame", undefined, window);
        hover.SetPoint("TOPLEFT", window, "TOPLEFT", TABLE_LEFT + column.x, -38);
        hover.SetSize(column.width, 18);
        hover.EnableMouse(true);
        hover.SetScript("OnEnter", () => {
            GameTooltip.SetOwner(hover, "ANCHOR_TOP");
            GameTooltip.SetText(this.locale.getText(tip), 1, 1, 1, 1, true);
            GameTooltip.Show();
        });
        hover.SetScript("OnLeave", () => GameTooltip.Hide());
        return hover;
    }
}
