// What a circling glow does on a round button (Forever's gamepad bars, another addon's round buttons), where it cannot
// circle: breathe, or stand still. How each glow moves is the table's (its Animation column).

import type { GlowStyle } from "@wowkit/wow";
import type { AddonLocale } from "../locale/locale.interface";
import type { TextKey } from "../locale/texts.constants";
import type { AddonSettings, AddonSettingsService } from "../settings/settings.interface";
import type { ControlsService } from "@wowkit/ui";

/** The words of each style (the table's Animation column says them too). */
export const STYLE_TEXTS: { [style in GlowStyle]: TextKey } = {
    circling: "OPT_STYLE_CIRCLING",
    breathing: "OPT_STYLE_BREATHING",
    still: "OPT_STYLE_STILL",
};

export class GlowStyleSection {
    constructor(
        private readonly locale: AddonLocale,
        private readonly settings: AddonSettingsService,
        private readonly controls: ControlsService<AddonSettings>,
    ) {}

    addGlowStyleSection(category: SettingsCategory): void {
        // A round button has no animation around it
        const styles: GlowStyle[] = ["breathing", "still"];
        const key = "roundGlowStyle";
        this.controls.addDropdown(
            category,
            key,
            this.locale.getText("OPT_ROUND_GLOW_STYLE"),
            this.locale.getText("TIP_ROUND_GLOW_STYLE"),
            this.settings.getDefault(key),
            () => this.settings.get(key),
            (value) =>
                this.settings.change(key, styles.includes(value as GlowStyle) ? (value as GlowStyle) : this.settings.getDefault(key)),
            () => styles.map((style): [string, string] => [style, this.locale.getText(STYLE_TEXTS[style])]),
            false,
        );
    }
}
