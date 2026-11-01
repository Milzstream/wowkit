// The page of the addon in the Settings panel: the settings that are not about one kind or one spell. What is on and off,
// and how each kind and spell looks, is the table's (/gb); its button is at the top.

import type { AddonLocale } from "../locale/locale.interface";
import type { ClassBuffsService } from "../reminders/class-buffs.service";
import type { AddonSettingsService, AddonSettings } from "../settings/settings.interface";
import type { AboutSection, ControlsService, OptionsPage, WidgetsService } from "@wowkit/ui";
import type { BarsSection } from "./bars.section";
import type { GlowStyleSection } from "./glow-style.section";
import type { GlowsSection } from "./glows.section";
import type { ReagentsSection } from "./reagents.section";
import type { StyleTableService } from "./style-table.service";
import type { ReminderControlsService } from "./reminder-controls.service";
import type { WeaponSection } from "./weapon.section";

export class RemindersPage implements OptionsPage {
    constructor(
        private readonly locale: AddonLocale,
        private readonly classBuffs: ClassBuffsService,
        private readonly settings: AddonSettingsService,
        private readonly controls: ControlsService<AddonSettings>,
        private readonly reminderControls: ReminderControlsService,
        private readonly weaponSection: WeaponSection,
        private readonly glowsSection: GlowsSection,
        private readonly reagentsSection: ReagentsSection,
        private readonly about: AboutSection,
        private readonly widgets: WidgetsService,
        private readonly table: StyleTableService,
        private readonly barsSection: BarsSection,
        private readonly glowStyleSection: GlowStyleSection,
    ) {}

    buildPage(category: SettingsCategory, layout: SettingsLayout): void {
        this.reminderControls.addHeader(layout, "HDR_LOOKS");
        this.widgets.addButton(
            layout,
            this.locale.getText("OPT_TABLE"),
            this.locale.getText("BTN_OPEN"),
            () => this.table.toggle(),
            this.locale.getText("TIP_TABLE"),
        );
        this.controls.addSwitchCheckbox(
            category,
            "showTooltipIds",
            this.locale.getText("OPT_TOOLTIP_IDS"),
            this.locale.getText("TIP_TOOLTIP_IDS"),
        );

        this.glowStyleSection.addGlowStyleSection(category);

        this.reminderControls.addHeader(layout, "HDR_CHARACTER");
        this.controls.addCheckbox(
            category,
            "isMuted",
            this.locale.getText("OPT_MUTE"),
            this.locale.getText("TIP_MUTE"),
            false,
            () => this.settings.get("isMuted"),
            (isChecked) => this.settings.change("isMuted", isChecked),
        );
        this.reminderControls.addSwitch(category, "hideResting", "OPT_HIDE_RESTING", "TIP_HIDE_RESTING");

        // The party members: a part of the buff reminder that is not one buff
        if (this.classBuffs.getClassBuffs().some((classBuff) => classBuff.party !== undefined)) {
            this.reminderControls.addHeader(layout, "HDR_BUFFS");
            // Each switch with the number of members its group versions wait for, under it
            const hasGroupVersion = this.classBuffs.getClassBuffs().some((classBuff) => classBuff.party?.groupIds !== undefined);
            const partySwitch = this.reminderControls.addSwitch(category, "showPartyBuffs", "OPT_PARTY_BUFFS", "TIP_PARTY_BUFFS");
            if (hasGroupVersion)
                this.reminderControls.addGroupMin(category, "partyGroupMin", "TIP_PARTY_GROUP_MIN", partySwitch, "showPartyBuffs");
            const raidSwitch = this.reminderControls.addSwitch(category, "showRaidBuffs", "OPT_RAID_BUFFS", "TIP_RAID_BUFFS");
            if (hasGroupVersion)
                this.reminderControls.addGroupMin(category, "raidGroupMin", "TIP_RAID_GROUP_MIN", raidSwitch, "showRaidBuffs");
        }

        this.weaponSection.addWeaponSection(category, layout);
        this.glowsSection.addGlowsSection(category, layout);
        this.reagentsSection.addReagentsSection(category, layout);

        // The bars last: eight switches and eight more for the faded bars
        this.barsSection.addBarsSection(category, layout);
        this.barsSection.addFadedSection(category, layout);

        this.about.addAboutSection(layout);
    }
}
