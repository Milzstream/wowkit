// Whether a row of the table of looks is on: a type of reminder as a whole, or one spell of it. Each type keeps its switches
// where it always did (the buff list, the reagents, the cooldowns and procs); this answers for any row in one way, so the
// table can show and change them in one column.
import type { SpellsService } from "@wowkit/wow";
import type { StyleRow } from "../options/style-rows.service";
import type { ReagentsService } from "../reagents/reagents.service";
import type { ClassBuffsService } from "../reminders/class-buffs.service";
import type { AddonSettingsService, ReminderType } from "./settings.interface";

/** The setting that switches a type of reminder on. */
const TYPE_SWITCHES = {
    missingBuff: "isMissingBuffEnabled",
    weaponBuff: "isWeaponBuffEnabled",
    missingSeal: "isMissingSealEnabled",
    missingTracking: "isMissingTrackingEnabled",
    lowReagent: "isLowReagentEnabled",
    readyCooldown: "isReadyCooldownEnabled",
    proc: "isProcEnabled",
    oldRank: "isOldRankEnabled",
    lowStock: "isLowStockEnabled",
} as const satisfies { [reminderType in ReminderType]: string };

export class EnabledService {
    constructor(
        private readonly spells: SpellsService,
        private readonly classBuffs: ClassBuffsService,
        private readonly reagents: ReagentsService,
        private readonly settings: AddonSettingsService,
    ) {}

    /** Is the whole type on? While it is off, none of its spells glow, whatever their own switch says. */
    isTypeEnabled(reminderType: ReminderType): boolean {
        return this.settings.get(TYPE_SWITCHES[reminderType]);
    }

    isEnabled(row: StyleRow): boolean {
        const spellId = row.spellId;
        if (spellId === undefined) return this.settings.get(TYPE_SWITCHES[row.reminderType]);
        const classBuff = this.findClassBuff(row);
        if (classBuff !== undefined) return this.classBuffs.isBuffEnabled(classBuff);
        const itemId = this.findReagentItem(row);
        if (itemId !== undefined) return this.settings.get("enabledReagents")[itemId] !== false;
        if (row.reminderType === "oldRank") return this.settings.get("enabledRanks")[this.getName(spellId)] !== false;
        return this.settings.get("enabledSpells")[this.getGlowKey(row, spellId)] !== false;
    }

    /** Switches a type or a spell; the default (on) is not stored. */
    setEnabled(row: StyleRow, isEnabled: boolean): void {
        const spellId = row.spellId;
        if (spellId === undefined) return this.settings.change(TYPE_SWITCHES[row.reminderType], isEnabled);
        const classBuff = this.findClassBuff(row);
        if (classBuff !== undefined) return this.classBuffs.setBuffEnabled(classBuff, isEnabled);
        const itemId = this.findReagentItem(row);
        if (itemId !== undefined) return this.changeEntry("enabledReagents", itemId, isEnabled ? undefined : false);
        if (row.reminderType === "oldRank") return this.changeEntry("enabledRanks", this.getName(spellId), isEnabled ? undefined : false);
        this.changeEntry("enabledSpells", this.getGlowKey(row, spellId), isEnabled ? undefined : false);
    }

    private findClassBuff(row: StyleRow) {
        if (row.reminderType !== "missingBuff" || row.isAdded === true) return undefined;
        return this.classBuffs.getClassBuffs().find((classBuff) => classBuff.id === row.spellId);
    }

    /** The reagent item of a group buff of the class (the reagent rows of the lists). */
    private findReagentItem(row: StyleRow): string | undefined {
        if (row.reminderType !== "lowReagent" || row.isAdded === true || row.spellId === undefined) return undefined;
        const reagent = this.reagents.findReagentOfSpell(row.spellId);
        return reagent !== undefined ? string.format("%d", reagent.itemId) : undefined;
    }

    /** The switch of a cooldown or proc is kept by its ID in the lists; that of a spell the player added by its own. */
    private getGlowKey(row: StyleRow, spellId: number): string {
        return string.format("%d", row.listId ?? spellId);
    }

    private getName(spellId: number): string {
        return this.spells.getSpellName(spellId) ?? string.format("%d", spellId);
    }

    private changeEntry<V>(key: "enabledReagents" | "enabledRanks" | "enabledSpells", entry: string, newValue: V | undefined): void {
        const copy = { ...this.settings.get(key) } as { [entry: string]: boolean | undefined };
        copy[entry] = newValue as boolean | undefined;
        this.settings.change(key, copy as never);
    }
}
