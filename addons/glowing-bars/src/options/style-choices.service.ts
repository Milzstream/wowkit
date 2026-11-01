// What a click in the table of looks chooses: the next sound, how often it repeats, and a color from the game's picker.
import { SOUNDS, type MessagesService, type SoundKey } from "@wowkit/ui";
import type { AddonLocale } from "../locale/locale.interface";
import { REPEAT_CHOICES } from "../settings/settings.constants";
import type { StyleService } from "../settings/style.service";
import { COLUMN, ROW_HEIGHT, findCenteredX } from "./style-table.constants";
import type { StyleRow } from "./style-rows.service";

export class StyleChoicesService {
    constructor(
        private readonly locale: AddonLocale,
        private readonly styles: StyleService,
        private readonly messages: MessagesService,
    ) {}

    /** The sound after (or, with a negative step, before) the current one; it plays once as a preview. */
    chooseNextSound(row: StyleRow, step: number): void {
        const current = this.styles.getStyle(row.kind, row.spellId).sound;
        const index = math.max(
            0,
            SOUNDS.findIndex((sound) => sound.key === current),
        );
        const chosen: SoundKey = SOUNDS[(index + step + SOUNDS.length) % SOUNDS.length]!.key;
        this.styles.changeStyle(row.kind, row.spellId, { sound: chosen });
        this.messages.playAlertSound(chosen);
    }

    /** The repeat button of a row: left click the next choice, right click the one before. */
    createRepeatButton(frame: Frame, getRow: () => StyleRow | undefined): Button {
        const button = CreateFrame("Button", undefined, frame, "UIPanelButtonTemplate");
        button.SetSize(54, 24);
        button.SetPoint("LEFT", frame, "LEFT", findCenteredX(COLUMN.repeat, 54), 0);
        button.RegisterForClicks("LeftButtonUp", "RightButtonUp");
        button.SetScript("OnClick", (_button, mouseButton) => {
            const row = getRow();
            if (row !== undefined) this.chooseNextRepeat(row, mouseButton === "RightButton" ? -1 : 1);
        });
        button.SetScript("OnEnter", () => {
            GameTooltip.SetOwner(button, "ANCHOR_RIGHT");
            GameTooltip.SetText(this.locale.getText("TIP_REPEAT"), 1, 1, 1, 1, true);
            GameTooltip.Show();
        });
        button.SetScript("OnLeave", () => GameTooltip.Hide());
        return button;
    }

    /** The name and type of a low reagent's row say where it works; the other kinds need no words. */
    addKindTooltip(frame: Frame, getRow: () => StyleRow | undefined): void {
        const hover = CreateFrame("Frame", undefined, frame);
        hover.SetPoint("LEFT", frame, "LEFT", COLUMN.name.x, 0);
        hover.SetSize(COLUMN.kind.x + COLUMN.kind.width - COLUMN.name.x, ROW_HEIGHT);
        hover.EnableMouse(true);
        hover.SetScript("OnEnter", () => {
            if (getRow()?.kind !== "reagent") return;
            GameTooltip.SetOwner(hover, "ANCHOR_RIGHT");
            GameTooltip.SetText(this.locale.getText("TIP_KIND_REAGENT"), 1, 1, 1, 1, true);
            GameTooltip.Show();
        });
        hover.SetScript("OnLeave", () => GameTooltip.Hide());
    }

    /** What the repeat button shows. */
    fillRepeat(button: Button, row: StyleRow): void {
        const seconds = this.styles.getStyle(row.kind, row.spellId).repeat;
        button.SetText(seconds === 0 ? this.locale.getText("REPEAT_OFF") : string.format(this.locale.getText("REPEAT_SECONDS"), seconds));
    }

    /** The repeat after (or, with a negative step, before) the current one. */
    private chooseNextRepeat(row: StyleRow, step: number): void {
        const index = math.max(0, REPEAT_CHOICES.indexOf(this.styles.getStyle(row.kind, row.spellId).repeat));
        const chosen = REPEAT_CHOICES[(index + step + REPEAT_CHOICES.length) % REPEAT_CHOICES.length]!;
        this.styles.changeStyle(row.kind, row.spellId, { repeat: chosen });
    }

    /** The game's color picker; every move of it changes the color, and cancelling puts the old one back. */
    chooseColor(row: StyleRow): void {
        const picker = ColorPickerFrame;
        if (picker.SetupColorPickerAndShow === undefined) {
            this.messages.say(this.locale.getText("NO_COLOR_PICKER"));
            return;
        }
        const [r, g, b] = this.styles.getStyle(row.kind, row.spellId).color;
        picker.SetupColorPickerAndShow({
            r,
            g,
            b,
            hasOpacity: false,
            swatchFunc: () => {
                const [pickedR, pickedG, pickedB] = picker.GetColorRGB();
                this.styles.changeStyle(row.kind, row.spellId, { color: [pickedR, pickedG, pickedB] });
            },
            cancelFunc: () => this.styles.changeStyle(row.kind, row.spellId, { color: [r, g, b] }),
        });
    }
}
