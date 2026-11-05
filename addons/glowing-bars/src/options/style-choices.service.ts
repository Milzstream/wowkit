// What the table of looks lets the player pick from a list (the sound, how often it repeats, when the reminder shows, for
// how long and how it moves), and a color from the game's picker.
import { SOUNDS, type MessagesService } from "@wowkit/ui";
import type { AddonLocale } from "../locale/locale.interface";
import { ANIMATION_CHOICES, GLOW_TIME_CHOICES, REPEAT_CHOICES, listWhenChoices } from "../settings/settings.constants";
import { ANIMATION_TEXTS } from "./animation.section";
import type { Style, StyleOverride, When } from "../settings/settings.interface";
import type { StyleService } from "../settings/style.service";
import type { TextKey } from "../locale/texts.constants";
import { connectChoiceMenu } from "./choice-menu";
import { COLUMN, findCenteredX, type Column } from "./style-table.constants";
import type { StyleRow } from "./style-rows.service";

/** The parts of a look picked from a list. */
type ChosenPart = "sound" | "repeat" | "when" | "glowTime" | "animation";

/** The buttons of a row that open a list of choices. */
export interface ChoiceButtons {
    repeat: Button;
    when: Button;
    glowTime: Button;
    animation: Button;
}

/** The words of each When. */
const WHEN_TEXTS: { [when in When]: TextKey } = {
    always: "WHEN_ALWAYS",
    inCombat: "WHEN_IN_COMBAT",
    outOfCombat: "WHEN_OUT_OF_COMBAT",
    enemyTargeted: "WHEN_ENEMY_TARGETED",
    townAlert: "WHEN_TOWN_ALERT",
};

export class StyleChoicesService {
    constructor(
        private readonly locale: AddonLocale,
        private readonly styles: StyleService,
        private readonly messages: MessagesService,
    ) {}

    /** The list of sounds of a row; the one picked plays once as a preview. */
    connectSoundMenu(button: Button, getRow: () => StyleRow | undefined): void {
        const listSounds = () => SOUNDS.map((sound) => ({ value: sound.key, label: sound.label }));
        this.connectMenu(button, getRow, "sound", listSounds, (sound) => this.messages.playAlertSound(sound));
    }

    /** The other buttons of a row that open a list of choices. */
    createChoiceButtons(frame: Frame, getRow: () => StyleRow | undefined): ChoiceButtons {
        return {
            repeat: this.createChoiceButton(frame, COLUMN.repeat, 54, getRow, "repeat", () =>
                REPEAT_CHOICES.map((seconds) => ({ value: seconds, label: this.findRepeatText(seconds) })),
            ),
            when: this.createChoiceButton(frame, COLUMN.when, 104, getRow, "when", (row) =>
                listWhenChoices(row.reminderType).map((when) => ({ value: when, label: this.locale.getText(WHEN_TEXTS[when]) })),
            ),
            glowTime: this.createChoiceButton(frame, COLUMN.glowTime, 72, getRow, "glowTime", () =>
                GLOW_TIME_CHOICES.map((seconds) => ({ value: seconds, label: this.findGlowTimeText(seconds) })),
            ),
            animation: this.createChoiceButton(frame, COLUMN.animation, 82, getRow, "animation", () =>
                ANIMATION_CHOICES.map((animation) => ({ value: animation, label: this.locale.getText(ANIMATION_TEXTS[animation]) })),
            ),
        };
    }

    /** What the choice buttons of a row show. */
    fillChoices(buttons: ChoiceButtons, row: StyleRow): void {
        const style = this.styles.getStyle(row.reminderType, row.spellId);
        buttons.repeat.SetText(this.findRepeatText(style.repeat));
        buttons.when.SetText(this.locale.getText(WHEN_TEXTS[style.when]));
        buttons.glowTime.SetText(this.findGlowTimeText(style.glowTime));
        buttons.animation.SetText(this.locale.getText(ANIMATION_TEXTS[style.animation]));
    }

    private createChoiceButton<Part extends ChosenPart>(
        frame: Frame,
        column: Column,
        width: number,
        getRow: () => StyleRow | undefined,
        part: Part,
        listValues: (row: StyleRow) => { value: Style[Part]; label: string }[],
    ): Button {
        const button = CreateFrame("Button", undefined, frame, "UIPanelButtonTemplate");
        button.SetSize(width, 24);
        button.SetPoint("LEFT", frame, "LEFT", findCenteredX(column, width), 0);
        this.connectMenu(button, getRow, part, listValues);
        return button;
    }

    /** The row is read as the list opens: the choices stay with it, whatever the table shows by the time one is picked. */
    private connectMenu<Part extends ChosenPart>(
        button: Button,
        getRow: () => StyleRow | undefined,
        part: Part,
        listValues: (row: StyleRow) => { value: Style[Part]; label: string }[],
        reactToChoice?: (value: Style[Part]) => void,
    ): void {
        connectChoiceMenu(button, () => {
            const row = getRow();
            if (row === undefined) return [];
            return listValues(row).map(({ value, label }) => ({
                label,
                isChosen: () => this.styles.getStyle(row.reminderType, row.spellId)[part] === value,
                choose: () => {
                    this.styles.changeStyle(row.reminderType, row.spellId, { [part]: value } as StyleOverride);
                    reactToChoice?.(value);
                },
            }));
        });
    }

    private findRepeatText(seconds: number): string {
        return seconds === 0 ? this.locale.getText("REPEAT_OFF") : string.format(this.locale.getText("REPEAT_SECONDS"), seconds);
    }

    private findGlowTimeText(seconds: number): string {
        return seconds === 0 ? this.locale.getText("GLOW_UNTIL_DONE") : string.format(this.locale.getText("REPEAT_SECONDS"), seconds);
    }

    /** The game's color picker; every move of it changes the color, and cancelling puts the old one back. */
    chooseColor(row: StyleRow): void {
        const picker = ColorPickerFrame;
        if (picker.SetupColorPickerAndShow === undefined) {
            this.messages.say(this.locale.getText("NO_COLOR_PICKER"));
            return;
        }
        const [r, g, b] = this.styles.getStyle(row.reminderType, row.spellId).color;
        picker.SetupColorPickerAndShow({
            r,
            g,
            b,
            hasOpacity: false,
            swatchFunc: () => {
                const [pickedR, pickedG, pickedB] = picker.GetColorRGB();
                this.styles.changeStyle(row.reminderType, row.spellId, { color: [pickedR, pickedG, pickedB] });
            },
            cancelFunc: () => this.styles.changeStyle(row.reminderType, row.spellId, { color: [r, g, b] }),
        });
    }
}
