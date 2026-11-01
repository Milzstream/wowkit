// The cooldown part of the Settings page: also out of combat, also at the start of a fight, and how long a cooldown glows
// once it is back. Which cooldowns glow, and how they look, is the table's.

import type { AddonLocale } from "../locale/locale.interface";
import { COOLDOWN_GLOW_CHOICES } from "../settings/settings.constants";
import type { GlowCuesService } from "../glows/glow-cues.service";
import type { AddonSettings, AddonSettingsService } from "../settings/settings.interface";
import type { ControlsService } from "@wowkit/ui";
import type { ReminderControlsService } from "./reminder-controls.service";

export class GlowsSection {
    constructor(
        private readonly locale: AddonLocale,
        private readonly settings: AddonSettingsService,
        private readonly controls: ControlsService<AddonSettings>,
        private readonly reminderControls: ReminderControlsService,
        private readonly glowCues: GlowCuesService,
    ) {}

    /** How the cooldowns glow (which ones do is the table's); nothing for a character without one. */
    addGlowsSection(category: SettingsCategory, layout: SettingsLayout): void {
        if (this.glowCues.listCueIds("cooldown").length === 0) return;
        this.reminderControls.addHeader(layout, "HDR_COOLDOWNS");
        this.reminderControls.addSwitch(category, "showCooldownsOutOfCombat", "OPT_COOLDOWNS_OUT_OF_COMBAT", "TIP_COOLDOWNS_OUT_OF_COMBAT");
        this.reminderControls.addSwitch(category, "showCooldownsAtFightStart", "OPT_COOLDOWNS_FIGHT_START", "TIP_COOLDOWNS_FIGHT_START");
        this.addGlowSecondsDropdown(category);
    }

    /** How long a cooldown glows once it is back: a few seconds, or until it is pressed. */
    private addGlowSecondsDropdown(category: SettingsCategory): void {
        this.controls.addDropdown(
            category,
            "cooldownGlowSeconds",
            this.locale.getText("OPT_COOLDOWN_SECONDS"),
            this.locale.getText("TIP_COOLDOWN_SECONDS"),
            string.format("%d", this.settings.getDefault("cooldownGlowSeconds")),
            () => string.format("%d", this.settings.get("cooldownGlowSeconds")),
            (value) => this.settings.change("cooldownGlowSeconds", tonumber(value) ?? this.settings.getDefault("cooldownGlowSeconds")),
            () =>
                COOLDOWN_GLOW_CHOICES.map((seconds): [string, string] => [
                    string.format("%d", seconds),
                    seconds === 0
                        ? this.locale.getText("OPT_UNTIL_PRESSED")
                        : string.format(this.locale.getText(seconds === 1 ? "OPT_SECOND" : "OPT_SECONDS"), seconds),
                ]),
            true,
        );
    }
}
