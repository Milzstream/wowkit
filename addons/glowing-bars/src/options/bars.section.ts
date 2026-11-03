// Which action bars glow: a switch for each of the eight bars of the game, all on by default. A player who keeps a big bar of
// cooldowns next to the character can have the glow there and not on the usual bars. And every bar can be faded
// until its buttons glow, so a bar in the middle of the screen shows only what is due.

import type { AddonLocale } from "../locale/locale.interface";
import { FADED_OPACITY_CHOICES } from "../settings/settings.constants";
import type { AddonSettings, AddonSettingsService } from "../settings/settings.interface";
import type { ControlsService } from "@wowkit/ui";
import type { ReminderControlsService } from "./reminder-controls.service";

/** The bars of the game, numbered as Edit Mode numbers them. */
const BAR_COUNT = 8;

export class BarsSection {
    constructor(
        private readonly locale: AddonLocale,
        private readonly settings: AddonSettingsService,
        private readonly controls: ControlsService<AddonSettings>,
        private readonly reminderControls: ReminderControlsService,
    ) {}

    addBarsSection(category: SettingsCategory, layout: SettingsLayout): void {
        this.reminderControls.addHeader(layout, "HDR_BARS");
        for (let bar = 1; bar <= BAR_COUNT; bar++) {
            const key = string.format("%d", bar);
            this.controls.addCheckbox(
                category,
                `bar_${key}`,
                string.format(this.locale.getText("OPT_BAR"), bar),
                this.locale.getText("TIP_BAR"),
                true,
                () => this.settings.get("barsThatGlow")[key] !== false,
                (isChecked) => this.setBarOn(key, isChecked),
            );
        }
    }

    /** A switch for each bar to be faded until its buttons glow, and how faded. */
    addFadedSection(category: SettingsCategory, layout: SettingsLayout): void {
        this.reminderControls.addHeader(layout, "HDR_FADED");
        for (let bar = 1; bar <= BAR_COUNT; bar++) {
            const key = string.format("%d", bar);
            this.controls.addCheckbox(
                category,
                `fade_${key}`,
                string.format(this.locale.getText("OPT_BAR"), bar),
                this.locale.getText("TIP_FADE"),
                false,
                () => this.settings.get("fadedBars")[key] === true,
                (isChecked) => this.setBarFaded(key, isChecked),
            );
        }
        this.controls.addDropdown(
            category,
            "fadedOpacity",
            this.locale.getText("OPT_FADED_OPACITY"),
            this.locale.getText("TIP_FADED_OPACITY"),
            string.format("%d", this.settings.getDefault("fadedOpacity")),
            () => string.format("%d", this.settings.get("fadedOpacity")),
            (value) => this.settings.change("fadedOpacity", tonumber(value) ?? this.settings.getDefault("fadedOpacity")),
            () =>
                FADED_OPACITY_CHOICES.map((percent): [string, string] => [
                    string.format("%d", percent),
                    string.format(this.locale.getText("OPT_PERCENT"), percent),
                ]),
            true,
        );
    }

    /** Fades one bar or not; the default (not) is not stored. */
    private setBarFaded(key: string, isFaded: boolean): void {
        const fadedBars = { ...this.settings.get("fadedBars") };
        fadedBars[key] = isFaded ? true : undefined;
        this.settings.change("fadedBars", fadedBars);
    }

    /** Switches one bar on or off; the default (on) is not stored. */
    private setBarOn(key: string, isOn: boolean): void {
        const barsThatGlow = { ...this.settings.get("barsThatGlow") };
        barsThatGlow[key] = isOn ? undefined : false;
        this.settings.change("barsThatGlow", barsThatGlow);
    }
}
