// The spell IDs in the tooltips, for a player who adds a spell by its ID in the table: every spell tooltip (the
// spellbook, the action bars, links) gets "Spell ID", and an item with a use (an elixir, a potion, food, a drink) the spell it
// casts. Off by default; the Settings page switches it on. The game has no way to take a tooltip call back, so a
// switched-off one adds no line.
import type { OnAddonLoaded } from "@wowkit/core";
import type { TooltipService } from "@wowkit/wow";
import type { AddonLocale } from "../locale/locale.interface";
import type { AddonSettingsService } from "../settings/settings.interface";

export class IdTooltipService implements OnAddonLoaded {
    constructor(
        private readonly tooltips: TooltipService,
        private readonly settings: AddonSettingsService,
        private readonly locale: AddonLocale,
    ) {}

    onAddonLoaded(): void {
        this.tooltips.addSpellLines((spellId) =>
            this.isOn() ? string.format(this.locale.getText("TOOLTIP_SPELL_ID"), spellId) : undefined,
        );
        this.tooltips.addItemLines((itemId) => {
            if (!this.isOn()) return undefined;
            const useSpellId = this.tooltips.getUseSpellId(itemId);
            return useSpellId === undefined ? undefined : string.format(this.locale.getText("TOOLTIP_USE_SPELL_ID"), useSpellId);
        });
    }

    private isOn(): boolean {
        return this.settings.get("showTooltipIds");
    }
}
