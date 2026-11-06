// Stage 1 of a tick: find everything the player should be reminded of right now.
//
// It reads the game and the settings and returns a plain description. It shows nothing and does
// not remember the previous tick; that is show-reminders.service.ts.

import type { BuffReminderService } from "../reminders/buff-reminder.service";
import type { GlowCuesService } from "../glows/glow-cues.service";
import type { OutdatedRanksService } from "../reminders/outdated-ranks.service";
import type { ReagentsService } from "../reagents/reagents.service";
import type { AddedRemindersService } from "../reminders/added-reminders.service";
import type { LowStockService } from "../reminders/low-stock.service";
import type { SealReminderService } from "../reminders/seal-reminder.service";
import type { TrackingReminderService } from "../reminders/tracking-reminder.service";
import type { PartyBuffsService } from "../reminders/party-buffs.service";
import type { LowStock, MissingBuffs, PartySuggestion } from "../reminders/reminders.interface";
import type { WeaponReminderService } from "../reminders/weapon/weapon-reminder.service";
import type { AddonSettingsService } from "../settings/settings.interface";
import type { IdleService } from "../character/idle.service";
import { OnEvent, OnGameEvent } from "@wowkit/core";
import type { ActionBarsService, ClockService, PlayerService, SpellsService } from "@wowkit/wow";
import type { LowReagent } from "../reagents/reagent.interface";
import type { Reminders } from "./tick.interface";
import { createEmptyReminders } from "./reminder-filter";

/** The reagents and the stock are read again after this long at most, for what the client tells late (an item's name). */
const STOCK_REUSE = 5;

interface StockReminders {
    reagentSpells: number[];
    lowReagents: LowReagent[];
    lowStock: LowStock[];
    at: number;
}

export class FindRemindersService {
    /** The reagents and the stock of the last look: they change with the bags, so they are kept until then. */
    private stock: StockReminders | undefined;
    /** What an idle tick finds: nothing, or only the reagents and the stock (never changed by those who read it). */
    private readonly idleReminders = createEmptyReminders();
    /** Empty lists that stay empty: no stock to tell. */
    private readonly noReminders = createEmptyReminders();
    /** What a tick finds: the same table each time, its lists the finders' own. */
    private readonly found = createEmptyReminders();
    private readonly noMissingBuffs: MissingBuffs = { glow: [], notOnBars: [] };

    constructor(
        private readonly lowStock: LowStockService,
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
        private readonly addedReminders: AddedRemindersService,
        private readonly sealReminder: SealReminderService,
        private readonly trackingReminder: TrackingReminderService,
        private readonly settings: AddonSettingsService,
        private readonly clock: ClockService,
    ) {}

    @OnEvent("setting.changed", "bars.mapped", "spells.refreshed", "spells.invalidated", "spellbook.indexed")
    @OnGameEvent("BAG_UPDATE", "BAG_UPDATE_DELAYED", "GET_ITEM_INFO_RECEIVED")
    forgetStock(): void {
        this.stock = undefined;
    }

    findReminders(): Reminders {
        // Looks at the buffs out of combat even when nothing is due, so the aura memory knows them
        this.buffReminder.rememberSelfBuffs();

        // Nothing while dead, mounted or eating, or when the player muted the addon
        if (this.idle.shouldStayIdle(false) || this.settings.get("isDisabled")) return this.findIdleReminders(undefined);

        // The reagents are bought in a town, so their hint stays there; the rest keeps quiet when asked
        const { reagentSpells, lowReagents, lowStock } = this.readStock();
        if (this.idle.shouldStayIdle(this.settings.get("shouldStayQuietInTowns"))) return this.findIdleReminders(this.stock);

        const none = this.noReminders;
        const found = this.findBuffReminders();
        const isWeaponBuffEnabled = this.settings.get("isWeaponBuffEnabled");
        const weaponCheck = isWeaponBuffEnabled ? this.weaponReminder.check() : undefined;
        found.weaponSpell = weaponCheck?.isNeeded ? weaponCheck.spellId : undefined;
        found.addedWeaponSpells = isWeaponBuffEnabled ? this.addedReminders.findWeaponSpells() : none.addedWeaponSpells;
        found.seals = this.sealReminder.findMissingSeal();
        found.trackings = this.trackingReminder.findMissingTrackings();
        found.outdatedRanks = this.settings.get("isOldRankEnabled") ? this.outdatedRanks.findOutdatedRanks() : none.outdatedRanks;
        found.readyCooldowns = this.glowCues.findReadyCooldowns();
        found.procs = this.glowCues.findProcs();
        found.reagentSpells = reagentSpells;
        found.lowReagents = lowReagents;
        found.lowStock = lowStock;
        return found;
    }

    /** The missing buffs, the player's and the party's, into the answer of this tick. */
    private findBuffReminders(): Reminders {
        const found = this.found;
        const isMissingBuffEnabled = this.settings.get("isMissingBuffEnabled");
        const missingBuffs = isMissingBuffEnabled ? this.buffReminder.findMissingBuffs() : this.noMissingBuffs;
        found.partySuggestions = isMissingBuffEnabled ? this.partyBuffs.findPartyBuffSuggestions() : this.noReminders.partySuggestions;
        found.buffsToCast = this.findBuffsToCast(missingBuffs.glow, found.partySuggestions);
        if (isMissingBuffEnabled) for (const id of this.addedReminders.findMissingBuffs()) found.buffsToCast.push(id);
        found.buffsNotOnBars = missingBuffs.notOnBars;
        return found;
    }

    /**
     * The group buffs on a button whose reagent runs low, when the player wants to hear about it (where: the When of their
     * look, in a town or an inn by default).
     */
    private findReagentSpells(): number[] {
        if (!this.settings.get("isLowReagentEnabled")) return [];
        const enabledReagents = this.settings.get("enabledReagents");
        const listed = this.reagents
            .findSpellsWithLowReagent((reagent) => enabledReagents[String(reagent.itemId)] !== false)
            .filter((id) => this.actionBars.isOnBars(id));
        return [...listed, ...this.addedReminders.findReagentSpells()];
    }

    /** The reagents running low that are switched on: those of the list, then those of the spells the player added. */
    private findLowReagents(): LowReagent[] {
        if (!this.settings.get("isLowReagentEnabled")) return [];
        const enabledReagents = this.settings.get("enabledReagents");
        const listed: LowReagent[] = this.reagents.findLowReagents((reagent) => enabledReagents[String(reagent.itemId)] !== false);
        const added = this.addedReminders.findLowReagents().filter((stock) => !listed.some((other) => other.name === stock.name));
        return [...listed, ...added];
    }

    /**
     * The player's own missing buffs, then the party buffs that can be cast from the bars. A group version that glows and
     * buffs the player too takes the place of the player's own reminder of that buff.
     */
    private findBuffsToCast(ownBuffs: number[], partySuggestions: PartySuggestion[]): number[] {
        let buffs = [...ownBuffs];
        if (partySuggestions.length === 0) return buffs;
        for (const suggestion of partySuggestions) {
            if (!this.actionBars.isOnBars(suggestion.spellId) || this.spells.isCastable(suggestion.spellId) === false) continue;
            if (suggestion.isForPlayer) buffs = buffs.filter((id) => id !== suggestion.buffId);
            if (!buffs.includes(suggestion.spellId)) buffs.push(suggestion.spellId);
        }
        return buffs;
    }

    private readStock(): StockReminders {
        const now = this.clock.getCurrentTime();
        if (this.stock === undefined || now - this.stock.at >= STOCK_REUSE) {
            this.stock = {
                reagentSpells: this.findReagentSpells(),
                lowReagents: this.findLowReagents(),
                lowStock: this.lowStock.findLowStock(),
                at: now,
            };
        }
        return this.stock;
    }

    /** Nothing, or only the stock: the same table each time. */
    private findIdleReminders(stock: StockReminders | undefined): Reminders {
        const idle = this.idleReminders;
        idle.reagentSpells = stock?.reagentSpells ?? this.noReminders.reagentSpells;
        idle.lowReagents = stock?.lowReagents ?? this.noReminders.lowReagents;
        idle.lowStock = stock?.lowStock ?? this.noReminders.lowStock;
        return idle;
    }
}
