// Which spells glow because they are ready: the important cooldowns, and the procs (a spell the game says is usable now).
// In combat a cooldown glows only when it comes back, and only for a few seconds: one that was never on cooldown in this
// fight is not news, and one that waits for the right moment should not glow all the while.
import { OnGameEvent } from "@wowkit/core";
import type { ActionBarsService, ClockService, PlayerService, SpellDetailsService, SpellsService } from "@wowkit/wow";
import type { AddonSettingsService, CueKind } from "../settings/settings.interface";
import type { CustomCuesService } from "./custom-cues.service";
import { COOLDOWN_CUES, PROC_CUES, RACIAL_COOLDOWNS } from "./glow-cues.constants";
import { READY_MARGIN, type CooldownTrackerService } from "./cooldown-tracker.service";

export class GlowCuesService {
    /** The cooldowns that have been running at some point of this fight. */
    private usedInCombat = new LuaSet<number>();
    /** Spell ID -> when its cooldown came back in this fight. */
    private backAt = new LuaMap<number, number>();

    constructor(
        private readonly player: PlayerService,
        private readonly spells: SpellsService,
        private readonly spellDetails: SpellDetailsService,
        private readonly actionBars: ActionBarsService,
        private readonly tracker: CooldownTrackerService,
        private readonly clock: ClockService,
        private readonly settings: AddonSettingsService,
        private readonly customCues: CustomCuesService,
    ) {}

    /**
     * A new fight: what was used in the last one is forgotten, and a cooldown that is running as it starts counts as used
     * in it (it glows when it is back). Read now, while the client may still show the cooldowns. If the player asked for it,
     * the ready ones glow right away, as if they had just come back: a reminder to use them.
     */
    @OnGameEvent("PLAYER_REGEN_DISABLED")
    startFight(): void {
        this.usedInCombat = new LuaSet<number>();
        this.backAt = new LuaMap<number, number>();
        const isReadyGlowing = this.settings.get("showCooldownsAtFightStart");
        const now = this.clock.getCurrentTime();
        for (const id of this.listCues(this.listCueIds("cooldown"))) {
            if (this.tracker.getRemaining(id) > READY_MARGIN) {
                this.usedInCombat.add(id);
            } else if (isReadyGlowing) {
                this.usedInCombat.add(id);
                this.backAt.set(id, now);
            }
        }
    }

    /**
     * The important cooldowns of the class that are ready and on a button. In combat only the ones that have been on
     * cooldown in this fight, for the seconds the player chose after they are back; out of combat all of them (whether
     * they show then is the When of their look: in combat only, by default).
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
                this.backAt.delete(id);
                continue;
            }
            if (!isInCombat || this.isJustBack(id)) ready.push(id);
        }
        return ready;
    }

    /** Was the ready cooldown running in this fight, and is it back for less than the seconds the player chose (0: any time)? */
    private isJustBack(id: number): boolean {
        if (!this.usedInCombat.has(id)) return false;
        const now = this.clock.getCurrentTime();
        const since = this.backAt.get(id) ?? now;
        this.backAt.set(id, since);
        const seconds = this.settings.get("cooldownGlowSeconds");
        return seconds === 0 || now - since < seconds;
    }

    /** The procs of the class that the game says are usable now, and on a button. */
    findProcs(): number[] {
        if (!this.settings.get("showProcs")) return [];
        return this.listCues(this.listCueIds("proc")).filter(
            (id) => this.spellDetails.readUsability(id).isUsable === true && this.tracker.getRemaining(id) <= READY_MARGIN,
        );
    }

    /**
     * The spells of the lists of a kind (their wow-data IDs): for cooldowns the class's and the racials the player has
     * learned, for procs the class's.
     */
    listBuiltInIds(kind: CueKind): number[] {
        const classToken = this.player.getClassToken() ?? "";
        if (kind === "proc") return PROC_CUES[classToken] ?? [];
        const racials = RACIAL_COOLDOWNS.filter((id) => this.spells.isLearned(this.customCues.getEffectiveId(id)));
        return [...(COOLDOWN_CUES[classToken] ?? []), ...racials];
    }

    /** The spells of a kind: the lists', and the ones the player added. */
    listCueIds(kind: CueKind): number[] {
        // Once each: a spell the player added may be on a list too (the Settings page cannot have two switches of one name)
        const ids: number[] = [];
        for (const id of [...this.listBuiltInIds(kind), ...this.customCues.listCustom(kind)]) if (!ids.includes(id)) ids.push(id);
        return ids;
    }

    /** The cues that are learned, switched on, and on an action button, as the IDs the buttons hold. */
    private listCues(ids: number[]): number[] {
        const glowOn = this.settings.get("glowOn");
        const found: number[] = [];
        for (const id of ids) {
            const learned = this.spells.resolve(this.customCues.getEffectiveId(id));
            if (learned === undefined || glowOn[String(id)] === false || !this.actionBars.isOnBars(learned)) continue;
            found.push(learned);
        }
        return found;
    }
}
