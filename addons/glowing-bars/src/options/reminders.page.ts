// The page of the addon in the Settings panel: the settings that are not about one type or one spell. What is on and off,
// and how each type and spell looks, is the table's (/gb); its button is at the top.

import type { AddonLocale } from "../locale/locale.interface";
import type { ClassBuffsService } from "../reminders/class-buffs.service";
import type { AddonSettingsService, AddonSettings } from "../settings/settings.interface";
import type { AboutSection, ControlsService, OptionsPage, WidgetsService } from "@wowkit/ui";
import type { BarsSection } from "./bars.section";
import type { AnimationSection } from "./animation.section";
import type { GlowsSection } from "./glows.section";
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
        private readonly about: AboutSection,
        private readonly widgets: WidgetsService,
        private readonly table: StyleTableService,
        private readonly barsSection: BarsSection,
        private readonly animationSection: AnimationSection,
    ) {}

    buildPage(category: SettingsCategory, layout: SettingsLayout): void {
        this.reminderControls.addHeader(layout, "HDR_REMINDERS");
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

        this.animationSection.addAnimationSection(category);

        this.reminderControls.addHeader(layout, "HDR_CHARACTER");
        this.controls.addCheckbox(
            category,
            "isDisabled",
            this.locale.getText("OPT_DISABLE"),
            this.locale.getText("TIP_DISABLE"),
            false,
            () => this.settings.get("isDisabled"),
            (isChecked) => this.settings.change("isDisabled", isChecked),
        );
        this.reminderControls.addSwitch(category, "shouldStayQuietInTowns", "OPT_STAY_QUIET_IN_TOWNS", "TIP_STAY_QUIET_IN_TOWNS");

        // The party members: a part of the buff reminder that is not one buff
        if (this.classBuffs.getClassBuffs().some((classBuff) => classBuff.party !== undefined)) {
            this.reminderControls.addHeader(layout, "HDR_BUFFS");
            // Each switch with the number of members its group versions wait for, under it
            const hasGroupVersion = this.classBuffs.getClassBuffs().some((classBuff) => classBuff.party?.groupIds !== undefined);
            const partySwitch = this.reminderControls.addSwitch(category, "showPartyBuffs", "OPT_PARTY_BUFFS", "TIP_PARTY_BUFFS");
            if (hasGroupVersion)
                this.reminderControls.addGroupMin(category, "partyGroupFrom", "TIP_PARTY_GROUP_MIN", partySwitch, "showPartyBuffs");
            const raidSwitch = this.reminderControls.addSwitch(category, "showRaidBuffs", "OPT_RAID_BUFFS", "TIP_RAID_BUFFS");
            if (hasGroupVersion)
                this.reminderControls.addGroupMin(category, "raidGroupFrom", "TIP_RAID_GROUP_MIN", raidSwitch, "showRaidBuffs");
        }

        this.weaponSection.addWeaponSection(category, layout);
        this.glowsSection.addGlowsSection(category, layout);

        // The bars last: eight switches and eight more for the faded bars
        this.barsSection.addBarsSection(category, layout);
        this.barsSection.addFadedSection(category, layout);

        this.about.addAboutSection(layout);
    }
}
