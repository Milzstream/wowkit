// The text a player copies from the welcome window into a bug report: what the addon sees of the game and of their bars.
import {
    attempt,
    attemptMulti,
    findMacroOfSlot,
    getReadable,
    type ActionBarsService,
    type ButtonSearchResult,
    type PlayerService,
    type SpellsService,
} from "@wowkit/wow";
import { ADDON_VERSION } from "../changelog/release-notes.generated";
import type { Reminders } from "../tick/tick.interface";

/** So many names of what was auto-detected go in the report. */
const NAMES_IN_REPORT = 10;
/** The bar addons that matter for a report. */
const BAR_ADDONS = ["Bartender4", "Dominos", "ElvUI", "EllesmereUI", "EllesmereUIActionBars", "DaylightUI"];

/** What each button holds. */
interface ButtonCounts {
    spells: number;
    items: number;
    macros: number;
    readMacros: number;
    empty: number;
}

export class ScanReport {
    constructor(
        private readonly actionBars: ActionBarsService,
        private readonly spells: SpellsService,
        private readonly player: PlayerService,
        private readonly findReminders: (this: void) => Reminders,
    ) {}

    buildReport(result: ButtonSearchResult): string {
        const counts = this.countButtons(result.buttons);
        return [
            `Glowing Bars ${ADDON_VERSION}`,
            this.describeGame(),
            `${this.player.getClassToken() ?? "?"} ${getReadable(attempt(UnitLevel, "player")) ?? "?"}`,
            this.describeBarAddons(),
            this.describeButtons(result),
            `${counts.spells} spells, ${counts.items} items, ${counts.macros} macros, ${counts.empty} empty`,
            `macros read ${counts.readMacros}/${counts.macros}`,
            `spellbook ${this.spells.listSpellBookIds().length}`,
            `due: ${this.describeDue(this.findReminders())}`,
        ].join(" | ");
    }

    private describeGame(): string {
        const [, , build] = attemptMulti(GetBuildInfo);
        return `build ${getReadable(build) ?? "?"} ${attempt(GetLocale) ?? "?"}`;
    }

    private describeButtons(result: ButtonSearchResult): string {
        const names = result.found.slice(0, NAMES_IN_REPORT).map((button) => button.GetName() ?? "?");
        const found = names.length > 0 ? ` (${names.join(", ")})` : "";
        return `${result.buttons.length} buttons, ${result.found.length} auto-detected${found}, ${result.hiddenCount} hidden`;
    }

    private describeBarAddons(): string {
        const addons = this.listBarAddons();
        return addons.length > 0 ? addons.join(", ") : "no bar addon";
    }

    private listBarAddons(): string[] {
        return BAR_ADDONS.filter((name) => {
            const [didRead, isLoaded] = attemptMulti(() => C_AddOns.IsAddOnLoaded(name));
            return didRead && getReadable(isLoaded) === true;
        });
    }

    private countButtons(buttons: ActionButton[]): ButtonCounts {
        const counts: ButtonCounts = { spells: 0, items: 0, macros: 0, readMacros: 0, empty: 0 };
        for (const button of buttons) {
            const slot = this.actionBars.getActionSlot(button);
            const [, kind, id] = slot !== undefined ? attemptMulti(() => GetActionInfo(slot)) : [];
            const readable = getReadable(kind);
            if (readable === "spell") counts.spells += 1;
            else if (readable === "item") counts.items += 1;
            else if (readable === "macro" && slot !== undefined) this.countMacro(counts, slot, id);
            else if (slot !== undefined) counts.empty += 1;
        }
        return counts;
    }

    private countMacro(counts: ButtonCounts, slot: number, id: unknown): void {
        counts.macros += 1;
        const macro = findMacroOfSlot(slot) ?? (id as number);
        if (getReadable(attempt(GetMacroBody, macro)) !== undefined) counts.readMacros += 1;
    }

    /** How many reminders are due now, of the kinds there are any of. */
    private describeDue(found: Reminders): string {
        const parts: [string, number][] = [
            ["buffs", found.buffsToCast.length],
            ["weapon", (found.weaponSpell !== undefined ? 1 : 0) + found.addedWeaponSpells.length],
            ["seals", found.seals.length],
            ["trackings", found.trackings.length],
            ["cooldowns", found.readyCooldowns.length],
            ["procs", found.procs.length],
            ["old ranks", found.outdatedRanks.length],
            ["reagents", found.lowReagents.length],
            ["stock", found.lowStock.length],
        ];
        const due = parts.filter(([, count]) => count > 0).map(([name, count]) => `${count} ${name}`);
        return due.length > 0 ? due.join(", ") : "none";
    }
}
