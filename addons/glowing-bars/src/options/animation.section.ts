// What a circling glow does on a round button (Forever's gamepad bars, another addon's round buttons), where it cannot
// circle: breathe, or stand still. How each glow moves is the table's (its Animation column).

import type { GlowAnimation } from "@wowkit/wow";
import type { AddonLocale } from "../locale/locale.interface";
import type { TextKey } from "../locale/texts.constants";
import type { AddonSettings, AddonSettingsService } from "../settings/settings.interface";
import type { ControlsService } from "@wowkit/ui";

/** The words of each style (the table's Animation column says them too). */
export const ANIMATION_TEXTS: { [style in GlowAnimation]: TextKey } = {
    circling: "ANIMATION_CIRCLING",
    clean: "ANIMATION_CLEAN",
    breathing: "ANIMATION_BREATHING",
    breathingClean: "ANIMATION_BREATHING_CLEAN",
    none: "ANIMATION_NONE",
    noneClean: "ANIMATION_NONE_CLEAN",
};

/** The words of the round buttons' choices: their ring is neither ants nor clean. */
const ROUND_TEXTS: { [style in GlowAnimation]?: TextKey } = {
    breathing: "ANIMATION_ROUND_BREATHING",
    none: "ANIMATION_ROUND_NONE",
};

export class AnimationSection {
    constructor(
        private readonly locale: AddonLocale,
        private readonly settings: AddonSettingsService,
        private readonly controls: ControlsService<AddonSettings>,
    ) {}

    addAnimationSection(category: SettingsCategory): void {
        // A round button has no animation around it
        const styles: GlowAnimation[] = ["breathing", "none"];
        const key = "roundAnimation";
        this.controls.addDropdown(
            category,
            key,
            this.locale.getText("OPT_ROUND_ANIMATION"),
            this.locale.getText("TIP_ROUND_ANIMATION"),
            this.settings.getDefault(key),
            () => this.settings.get(key),
            (value) =>
                this.settings.change(
                    key,
                    styles.includes(value as GlowAnimation) ? (value as GlowAnimation) : this.settings.getDefault(key),
                ),
            () => styles.map((style): [string, string] => [style, this.locale.getText(ROUND_TEXTS[style] ?? ANIMATION_TEXTS[style])]),
            false,
        );
    }
}
