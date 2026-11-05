// The section of the table under the add row: the folders in AddOns with sounds of the player's own, and how many each one has. The
// addon cannot see into a folder, so the player says both.
import type { AddonLocale } from "../locale/locale.interface";
import type { TextKey } from "../locale/texts.constants";
import { NEW_SOUND_FOLDER } from "../settings/settings.constants";
import type { AddonSettingsService } from "../settings/settings.interface";
import { HEADER_HEIGHT, ROW_HEIGHT, TABLE_WIDTH } from "./style-table.constants";

const FOLDER_LABEL_X = 38;
const FOLDER_X = 140;
const FOLDER_WIDTH = 200;
const COUNT_LABEL_X = 355;
const COUNT_X = 408;
const REMOVE_X = 448;

/** The controls of one folder; `index` is the folder of the saved list it shows now. */
interface FolderLine {
    frame: Frame;
    folderBox: EditBox;
    countBox: EditBox;
    remove: Button;
    index: number;
}

export class CustomSoundsSection {
    private readonly lines: FolderLine[] = [];
    private hover: Frame | undefined;
    private addFolder: Button | undefined;

    constructor(
        private readonly locale: AddonLocale,
        private readonly settings: AddonSettingsService,
    ) {}

    /** Its lines, under the header at `top`; returns where the next thing goes. */
    drawLines(content: Frame, top: number): number {
        this.showHover(content, top);
        const folders = this.settings.get("customSoundFolders");
        const firstLine = top + HEADER_HEIGHT;
        folders.forEach((_folder, index) => {
            const line = this.takeLine(content, index);
            line.frame.ClearAllPoints();
            line.frame.SetPoint("TOPLEFT", content, "TOPLEFT", 0, -(firstLine + index * ROW_HEIGHT));
            line.frame.Show();
            line.remove.SetShown(folders.length > 1);
            this.fillLine(line);
        });
        for (let i = folders.length; i < this.lines.length; i++) this.lines[i]!.frame.Hide();
        const afterLines = firstLine + folders.length * ROW_HEIGHT;
        const addFolder = this.addFolder ?? this.createAddFolder(content);
        addFolder.ClearAllPoints();
        addFolder.SetPoint("TOPLEFT", content, "TOPLEFT", FOLDER_LABEL_X, -afterLines);
        return afterLines + ROW_HEIGHT;
    }

    /** Over the header: it says what to do. */
    private showHover(content: Frame, top: number): void {
        if (this.hover === undefined) {
            const hover = CreateFrame("Frame", undefined, content);
            hover.SetSize(200, HEADER_HEIGHT);
            hover.EnableMouse(true);
            hover.SetScript("OnEnter", () => {
                GameTooltip.SetOwner(hover, "ANCHOR_RIGHT");
                GameTooltip.SetText(this.locale.getText("TIP_CUSTOM_SOUNDS"), 1, 1, 1, 1, true);
                GameTooltip.Show();
            });
            hover.SetScript("OnLeave", () => GameTooltip.Hide());
            this.hover = hover;
        }
        this.hover.ClearAllPoints();
        this.hover.SetPoint("TOPLEFT", content, "TOPLEFT", 0, -top);
    }

    private createAddFolder(content: Frame): Button {
        const button = CreateFrame("Button", undefined, content, "UIPanelButtonTemplate");
        button.SetSize(100, 24);
        button.SetText(this.locale.getText("BTN_ADD_FOLDER"));
        button.SetScript("OnClick", () => {
            this.settings.change("customSoundFolders", [
                ...this.settings.get("customSoundFolders"),
                { folder: NEW_SOUND_FOLDER, count: 0 },
            ]);
        });
        const tip = content.CreateFontString(undefined, "OVERLAY", "GameFontHighlightSmall");
        tip.SetPoint("LEFT", button, "RIGHT", 10, 0);
        tip.SetText(this.locale.getText("TEXT_CUSTOM_TIP"));
        this.addFolder = button;
        return button;
    }

    private takeLine(content: Frame, index: number): FolderLine {
        const line = this.lines[index] ?? this.createLine(content);
        line.index = index;
        return line;
    }

    private createLine(content: Frame): FolderLine {
        const frame = CreateFrame("Frame", undefined, content);
        frame.SetSize(TABLE_WIDTH, ROW_HEIGHT);
        this.createLabel(frame, FOLDER_LABEL_X, "OPT_CUSTOM_FOLDER");
        this.createLabel(frame, COUNT_LABEL_X, "OPT_CUSTOM_SOUNDS");
        const line: FolderLine = {
            frame,
            folderBox: this.createBox(frame, FOLDER_X, FOLDER_WIDTH, 60),
            countBox: this.createBox(frame, COUNT_X, 30, 2),
            remove: CreateFrame("Button", undefined, frame, "UIPanelButtonTemplate"),
            index: this.lines.length,
        };
        line.countBox.SetNumeric(true);
        line.remove.SetSize(22, 22);
        line.remove.SetPoint("LEFT", frame, "LEFT", REMOVE_X, 0);
        line.remove.SetText("X");
        line.remove.SetScript("OnClick", () => {
            this.settings.change(
                "customSoundFolders",
                this.settings.get("customSoundFolders").filter((_folder, index) => index !== line.index),
            );
        });
        this.connectBox(line, line.folderBox, () => this.applyFolder(line));
        this.connectBox(line, line.countBox, () => this.applyCount(line));
        this.lines.push(line);
        return line;
    }

    private createLabel(frame: Frame, x: number, text: TextKey): void {
        const label = frame.CreateFontString(undefined, "OVERLAY", "GameFontNormalSmall");
        label.SetPoint("LEFT", frame, "LEFT", x, 0);
        label.SetText(this.locale.getText(text));
    }

    private createBox(frame: Frame, x: number, width: number, maxLetters: number): EditBox {
        const box = CreateFrame("EditBox", undefined, frame, "InputBoxTemplate");
        box.SetSize(width, 20);
        box.SetPoint("LEFT", frame, "LEFT", x, 0);
        box.SetAutoFocus(false);
        box.SetMaxLetters(maxLetters);
        return box;
    }

    /** What was typed counts when the box is left; Escape puts the saved value back. */
    private connectBox(line: FolderLine, box: EditBox, apply: () => void): void {
        box.SetScript("OnEnterPressed", () => box.ClearFocus());
        box.SetScript("OnEditFocusLost", () => {
            apply();
            this.fillLine(line);
        });
        box.SetScript("OnEscapePressed", () => {
            this.fillLine(line);
            box.ClearFocus();
        });
    }

    private fillLine(line: FolderLine): void {
        const folder = this.settings.get("customSoundFolders")[line.index];
        if (folder === undefined) return;
        line.folderBox.SetText(folder.folder);
        line.countBox.SetText(string.format("%d", folder.count));
    }

    /** The name as typed, without spaces around it; only a name counts, so nothing or a path changes nothing. */
    private applyFolder(line: FolderLine): void {
        const [folder] = string.match(line.folderBox.GetText(), "^%s*([^\\/:]-)%s*$");
        if (folder !== undefined && folder !== "") this.changeLine(line, { folder });
    }

    private applyCount(line: FolderLine): void {
        const count = tonumber(line.countBox.GetText());
        if (count !== undefined) this.changeLine(line, { count });
    }

    private changeLine(line: FolderLine, change: { folder?: string; count?: number }): void {
        const folders = this.settings.get("customSoundFolders");
        if (folders[line.index] === undefined) return;
        this.settings.change(
            "customSoundFolders",
            folders.map((folder, index) => (index === line.index ? { ...folder, ...change } : folder)),
        );
    }
}
