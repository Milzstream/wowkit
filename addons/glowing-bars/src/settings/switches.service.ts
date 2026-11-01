// Whether a row of the table of looks is on: a kind of reminder as a whole, or one spell of it. Each kind keeps its switches
// where it always did (the buff list, the reagents, the cooldowns and procs); this answers for any row in one way, so the
// table can show and change them in one column.
import type { SpellsService } from "@wowkit/wow";
import type { StyleRow } from "../options/style-rows.service";
import type { ReagentsService } from "../reagents/reagents.service";
import type { ClassBuffsService } from "../reminders/class-buffs.service";
import type { AddonSettingsService, ColorKey } from "./settings.interface";

/** The setting that switches a kind of reminder on. */
const KIND_SWITCHES = {
    buff: "showBuff",
    weapon: "showWeapon",
    seal: "showSeals",
    tracking: "showTracking",
    reagent: "showReagents",
    cooldown: "showCooldowns",
    proc: "showProcs",
    rank: "showRanks",
    stock: "showStock",
} as const satisfies { [kind in ColorKey]: string };

export class SwitchesService {
    constructor(
        private readonly spells: SpellsService,
        private readonly classBuffs: ClassBuffsService,
        private readonly reagents: ReagentsService,
        private readonly settings: AddonSettingsService,
    ) {}

    /** Is the whole kind on? While it is off, none of its spells glow, whatever their own switch says. */
    isKindOn(kind: ColorKey): boolean {
        return this.settings.get(KIND_SWITCHES[kind]);
    }

    isOn(row: StyleRow): boolean {
        const spellId = row.spellId;
        if (spellId === undefined) return this.settings.get(KIND_SWITCHES[row.kind]);
        const classBuff = this.findClassBuff(row);
        if (classBuff !== undefined) return this.classBuffs.isBuffEnabled(classBuff);
        const itemId = this.findReagentItem(row);
        if (itemId !== undefined) return this.settings.get("reagentOn")[itemId] !== false;
        if (row.kind === "rank") return this.settings.get("rankOff")[this.getName(spellId)] !== true;
        return this.settings.get("glowOn")[this.getGlowKey(row, spellId)] !== false;
    }

    /** Switches a kind or a spell; the default (on) is not stored. */
    setOn(row: StyleRow, isOn: boolean): void {
        const spellId = row.spellId;
        if (spellId === undefined) return this.settings.change(KIND_SWITCHES[row.kind], isOn);
        const classBuff = this.findClassBuff(row);
        if (classBuff !== undefined) return this.classBuffs.setBuffEnabled(classBuff, isOn);
        const itemId = this.findReagentItem(row);
        if (itemId !== undefined) return this.changeEntry("reagentOn", itemId, isOn ? undefined : false);
        if (row.kind === "rank") return this.changeEntry("rankOff", this.getName(spellId), isOn ? undefined : true);
        this.changeEntry("glowOn", this.getGlowKey(row, spellId), isOn ? undefined : false);
    }

    private findClassBuff(row: StyleRow) {
        if (row.kind !== "buff" || row.isCustom === true) return undefined;
        return this.classBuffs.getClassBuffs().find((classBuff) => classBuff.id === row.spellId);
    }

    /** The reagent item of a group buff of the class (the reagent rows of the lists). */
    private findReagentItem(row: StyleRow): string | undefined {
        if (row.kind !== "reagent" || row.isCustom === true || row.spellId === undefined) return undefined;
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

    private changeEntry<V>(key: "reagentOn" | "rankOff" | "glowOn", entry: string, newValue: V | undefined): void {
        const copy = { ...this.settings.get(key) } as { [entry: string]: boolean | undefined };
        copy[entry] = newValue as boolean | undefined;
        this.settings.change(key, copy as never);
    }
}
