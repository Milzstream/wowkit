// Which spells glow because they are ready: the important cooldowns, and the procs (a spell the game says is usable now).
// In combat a cooldown counts only once it comes back: one that was never on cooldown in this fight is not news. How long
// it glows then is its glow time (a few seconds by default: one that waits for the right moment should not glow all the
// while).
import { OnGameEvent } from "@wowkit/core";
import type { ActionBarsService, PlayerService, SpellDetailsService, SpellsService } from "@wowkit/wow";
import type { AddonSettingsService, AddableType } from "../settings/settings.interface";
import type { AddedSpellsService } from "./added-spells.service";
import { COOLDOWN_CUES, PROC_CUES, RACIAL_COOLDOWNS } from "./glow-cues.constants";
import { READY_MARGIN, type CooldownTrackerService } from "./cooldown-tracker.service";

export class GlowCuesService {
    /** The cooldowns that have been running at some point of this fight (or ready as it started, if the player asked). */
    private usedInCombat = new LuaSet<number>();

    constructor(
        private readonly player: PlayerService,
        private readonly spells: SpellsService,
        private readonly spellDetails: SpellDetailsService,
        private readonly actionBars: ActionBarsService,
        private readonly tracker: CooldownTrackerService,
        private readonly settings: AddonSettingsService,
        private readonly addedSpells: AddedSpellsService,
    ) {}

    /**
     * A new fight: what was used in the last one is forgotten, and a cooldown that is running as it starts counts as used
     * in it (it glows when it is back). Read now, while the client may still show the cooldowns. If the player asked for it,
     * the ready ones count too, as if they had just come back: they glow right away, a reminder to use them.
     */
    @OnGameEvent("PLAYER_REGEN_DISABLED")
    startFight(): void {
        this.usedInCombat = new LuaSet<number>();
        const isReadyGlowing = this.settings.get("showCooldownsAtFightStart");
        for (const id of this.listCues(this.listCueIds("cooldown"))) {
            if (isReadyGlowing || this.tracker.getRemaining(id) > READY_MARGIN) this.usedInCombat.add(id);
        }
    }

    /**
     * The important cooldowns of the class that are ready and on a button. In combat only the ones that have been on
     * cooldown in this fight; out of combat all of them (whether they show then is the When of their look, in combat only
     * by default, and for how long its glow time).
     * The cooldowns are read out of combat too, so the tracker knows the ones still running when a fight starts and the
     * client hides them.
     */
    findReadyCooldowns(): number[] {
        if (!this.settings.get("showCooldowns")) return [];
        const isInCombat = this.player.isInCombat();
        const ready: number[] = [];
        for (const id of this.listCues(this.listCueIds("cooldown"))) {
            if (this.tracker.getRemaining(id) > READY_MARGIN) {
                if (isInCombat) this.usedInCombat.add(id);
                continue;
            }
            if (!isInCombat || this.usedInCombat.has(id)) ready.push(id);
        }
        return ready;
    }

    /** The procs of the class that the game says are usable now, and on a button. */
    findProcs(): number[] {
        if (!this.settings.get("showProcs")) return [];
        return this.listCues(this.listCueIds("proc")).filter(
            (id) => this.spellDetails.readUsability(id).isUsable === true && this.tracker.getRemaining(id) <= READY_MARGIN,
        );
    }

    /**
     * The spells of the lists of a type (their wow-data IDs): for cooldowns the class's and the racials the player has
     * learned, for procs the class's.
     */
    listBuiltInIds(reminderType: AddableType): number[] {
        const classToken = this.player.getClassToken() ?? "";
        if (reminderType === "proc") return PROC_CUES[classToken] ?? [];
        const racials = RACIAL_COOLDOWNS.filter((id) => this.spells.isLearned(this.addedSpells.getEffectiveId(id)));
        return [...(COOLDOWN_CUES[classToken] ?? []), ...racials];
    }

    /** The spells of a type: the lists', and the ones the player added. */
    listCueIds(reminderType: AddableType): number[] {
        // Once each: a spell the player added may be on a list too (the Settings page cannot have two switches of one name)
        const ids: number[] = [];
        for (const id of [...this.listBuiltInIds(reminderType), ...this.addedSpells.listAdded(reminderType)])
            if (!ids.includes(id)) ids.push(id);
        return ids;
    }

    /** The cues that are learned, switched on, and on an action button, as the IDs the buttons hold. */
    private listCues(ids: number[]): number[] {
        const enabledSpells = this.settings.get("enabledSpells");
        const found: number[] = [];
        for (const id of ids) {
            const learned = this.spells.resolve(this.addedSpells.getEffectiveId(id));
            if (learned === undefined || enabledSpells[String(id)] === false || !this.actionBars.isOnBars(learned)) continue;
            found.push(learned);
        }
        return found;
    }
}
