// Stage 1 of a tick: find everything the player should be reminded of right now.
//
// It reads the game and the settings and returns a plain description. It shows nothing and does
// not remember the previous tick; that is show-reminders.service.ts.

import type { BuffReminderService } from "../reminders/buff-reminder.service";
import type { GlowCuesService } from "../glows/glow-cues.service";
import type { OutdatedRanksService } from "../reminders/outdated-ranks.service";
import type { ReagentsService } from "../reagents/reagents.service";
import type { CustomRemindersService } from "../reminders/custom-reminders.service";
import type { SealReminderService } from "../reminders/seal-reminder.service";
import type { TrackingReminderService } from "../reminders/tracking-reminder.service";
import type { PartyBuffsService } from "../reminders/party-buffs.service";
import type { MissingBuffs, PartySuggestion } from "../reminders/reminders.interface";
import type { WeaponReminderService } from "../reminders/weapon/weapon-reminder.service";
import type { AddonSettingsService } from "../settings/settings.interface";
import type { IdleService } from "../character/idle.service";
import type { ActionBarsService, PlayerService, SpellsService } from "@wowkit/wow";
import type { Reminders } from "./tick.interface";

export class FindRemindersService {
    constructor(
        private readonly actionBars: ActionBarsService,
        private readonly idle: IdleService,
        private readonly player: PlayerService,
        private readonly spells: SpellsService,
        private readonly buffReminder: BuffReminderService,
        private readonly partyBuffs: PartyBuffsService,
        private readonly weaponReminder: WeaponReminderService,
        private readonly outdatedRanks: OutdatedRanksService,
        private readonly glowCues: GlowCuesService,
        private readonly reagents: ReagentsService,
        private readonly customReminders: CustomRemindersService,
        private readonly sealReminder: SealReminderService,
        private readonly trackingReminder: TrackingReminderService,
        private readonly settings: AddonSettingsService,
    ) {}

    findReminders(): Reminders {
        // Looks at the buffs out of combat even when nothing is due, so the aura memory knows them
        this.buffReminder.rememberSelfBuffs();

        // Nothing while dead, mounted or eating, or when the player muted the addon
        if (this.idle.shouldStayIdle(false) || this.settings.get("isMuted")) return this.createEmptyReminders();

        // The reagents are bought in a town, so their hint stays there; the rest keeps quiet when asked
        const reagentSpells = this.findReagentSpells();
        if (this.idle.shouldStayIdle(this.settings.get("hideResting"))) return { ...this.createEmptyReminders(), reagentSpells };

        const showBuff = this.settings.get("showBuff");
        const missingBuffs: MissingBuffs = showBuff ? this.buffReminder.findMissingBuffs() : { glow: [], notOnBars: [] };
        const partySuggestions = showBuff ? this.partyBuffs.findPartyBuffSuggestions() : [];
        const weaponCheck = this.settings.get("showWeapon") ? this.weaponReminder.check() : undefined;
        return {
            buffsToCast: [
                ...this.findBuffsToCast(missingBuffs.glow, partySuggestions),
                ...(showBuff ? this.customReminders.findMissingBuffs() : []),
            ],
            weaponSpell: weaponCheck?.isNeeded ? weaponCheck.spellId : undefined,
            customWeaponSpells: this.settings.get("showWeapon") ? this.customReminders.findWeaponSpells() : [],
            seals: this.sealReminder.findMissingSeal(),
            trackings: this.trackingReminder.findMissingTrackings(),
            buffsNotOnBars: missingBuffs.notOnBars,
            partySuggestions,
            outdatedRanks: this.settings.get("showRanks") ? this.outdatedRanks.findOutdatedRanks() : [],
            readyCooldowns: this.glowCues.findReadyCooldowns(),
            procs: this.glowCues.findProcs(),
            reagentSpells,
        };
    }

    /** The group buffs on a button whose reagent runs low, when the player wants to hear about it. */
    private findReagentSpells(): number[] {
        if (!this.settings.get("showReagents") || this.player.isInCombat()) return [];
        const reagentOn = this.settings.get("reagentOn");
        const listed = this.reagents
            .findSpellsWithLowReagent((reagent) => reagentOn[String(reagent.itemId)] !== false)
            .filter((id) => this.actionBars.isOnBars(id));
        return [...listed, ...this.customReminders.findReagentSpells()];
    }

    /**
     * The player's own missing buffs, then the party buffs that can be cast from the bars. A group version that glows and
     * buffs the player too takes the place of the player's own reminder of that buff.
     */
    private findBuffsToCast(ownBuffs: number[], partySuggestions: PartySuggestion[]): number[] {
        let buffs = [...ownBuffs];
        for (const suggestion of partySuggestions) {
            if (!this.actionBars.isOnBars(suggestion.spellId) || this.spells.isCastable(suggestion.spellId) === false) continue;
            if (suggestion.isForPlayer) buffs = buffs.filter((id) => id !== suggestion.buffId);
            if (!buffs.includes(suggestion.spellId)) buffs.push(suggestion.spellId);
        }
        return buffs;
    }

    private createEmptyReminders(): Reminders {
        return {
            buffsToCast: [],
            weaponSpell: undefined,
            customWeaponSpells: [],
            seals: [],
            trackings: [],
            buffsNotOnBars: [],
            partySuggestions: [],
            outdatedRanks: [],
            readyCooldowns: [],
            reagentSpells: [],
            procs: [],
        };
    }
}
