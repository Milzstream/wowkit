// Which buffs of the class list are missing. Of a group (one paladin aura, one armor) one glows: the one the player cast
// last, else the one their main talent tree wants, else the first in the list; always one that is on the bars and
// switched on, so a buff the player switched off hands the glow to the next.

import { OnEvent } from "@wowkit/core";
import type { BuffStateService } from "../character/buff-state.service";
import type { ActionBarsService, PlayerService, PlayerSpellCast, SpellsService } from "@wowkit/wow";
import type { AddonSettingsService } from "../settings/settings.interface";
import type { ClassBuff } from "./class-buff.interface";
import type { ClassBuffsService } from "./class-buffs.service";
import type { BuffCheck, MissingBuffs } from "./reminders.interface";

/** The two answers of a buff's check, made once (nobody changes them). */
const NOT_WANTED: BuffCheck = { isWanted: false };
const WANTED: BuffCheck = { isWanted: true };

function clearList(list: unknown[]): void {
    for (let index = list.length; index > 0; index--) list.pop();
}

export class BuffReminderService {
    /** The answer of the last look at the buffs: the same lists each time (whoever keeps them past a tick copies them). */
    private readonly missing: MissingBuffs = { glow: [], notOnBars: [] };
    /** The tables the look at the buffs works in, used again at each tick. */
    private readonly scratch = {
        groups: [] as ClassBuff[][],
        groupOf: new LuaMap<object, ClassBuff[]>(),
        candidateIds: [] as number[],
        candidateCategories: [] as object[],
        categoryOnBars: new LuaSet<object>(),
        named: new LuaSet<object>(),
    };

    constructor(
        private readonly auras: BuffStateService,
        private readonly spells: SpellsService,
        private readonly player: PlayerService,
        private readonly actionBars: ActionBarsService,
        private readonly classBuffs: ClassBuffsService,
        private readonly settings: AddonSettingsService,
    ) {}

    /** Is this buff worth asking for now? */
    checkBuff(classBuff: ClassBuff): BuffCheck {
        const id = this.spells.resolve(classBuff.id);
        if (id === undefined || !this.spells.isLearned(id)) return NOT_WANTED;
        if (classBuff.isSwimmingOnly && !this.player.isSwimming()) return NOT_WANTED;
        for (const other of classBuff.categoryMembers ?? []) {
            if (this.auras.hasAura(other)) return NOT_WANTED;
        }
        // hasAura reads the aura, and falls back on what was seen or cast while the client hides auras
        if (this.auras.hasAura(id, classBuff.lead)) return NOT_WANTED;
        return WANTED;
    }

    /**
     * Looks at the buffs of the list out of combat, whether or not a reminder is due, so the aura
     * memory knows them: a buff put on in town still counts once the client hides auras.
     */
    rememberSelfBuffs(): void {
        if (this.player.isInCombat()) return;
        const blessings: [number, number[]][] = [];
        for (const classBuff of this.classBuffs.getClassBuffs()) {
            if (this.classBuffs.isBuffEnabled(classBuff)) {
                const id = this.spells.resolve(classBuff.id);
                if (id !== undefined) this.auras.hasAura(id);
            }
            if (classBuff.party?.isPerClass) blessings.push([classBuff.id, [classBuff.id, ...(classBuff.party.groupIds ?? [])]]);
        }
        // A blessing is also cast on others: the one of the player is the one on the player
        const onPlayer = blessings.length > 0 ? this.auras.findOwnUnitBuff("player", blessings) : undefined;
        const castBuff = this.classBuffs.getClassBuffs().find((classBuff) => classBuff.id === onPlayer);
        if (castBuff !== undefined) this.noteGroupBuff(castBuff);
    }

    /**
     * A buff of a group the player casts is the one of the group to glow from now on (kept per character). Not a
     * blessing: it may go on another, so the one seen on the player counts (rememberSelfBuffs).
     */
    @OnEvent("player.spell-cast")
    noteCast(cast: PlayerSpellCast): void {
        if (cast.spellId === undefined) return;
        const id = this.spells.resolveOrSame(cast.spellId);
        const castName = this.spells.getSpellName(id);
        // A group version (a Greater Blessing) counts as its buff; a higher rank than the list's ID by its name
        const castBuff = this.classBuffs
            .getClassBuffs()
            .find(
                (classBuff) =>
                    classBuff.categoryMembers !== undefined &&
                    classBuff.party?.isPerClass !== true &&
                    [classBuff.id, ...(classBuff.party?.groupIds ?? [])].some(
                        (buffId) => (this.spells.resolve(buffId) ?? buffId) === id || this.spells.getSpellName(buffId) === castName,
                    ),
            );
        if (castBuff !== undefined) this.noteGroupBuff(castBuff);
    }

    /** The buff of its group to glow from now on (kept per character). */
    private noteGroupBuff(classBuff: ClassBuff): void {
        const group = this.classBuffs.getGroupKey(classBuff);
        const lastBuffs = this.settings.get("lastBuffs");
        if (lastBuffs[group] !== classBuff.id) this.settings.change("lastBuffs", { ...lastBuffs, [group]: classBuff.id });
    }

    /**
     * The missing buffs in list order, one of each group; when a member of a group is on the bars nothing of the group
     * is named in the "not on your bars" message, else the first one.
     */
    findMissingBuffs(): MissingBuffs {
        // The buffs that could glow, by group (a buff of no group is a group of its own), in list order; the tables of the
        // last tick are used again, so a tick with every buff up makes none
        const scratch = this.scratch;
        this.clearScratch();
        for (const classBuff of this.classBuffs.getClassBuffs()) {
            if (!this.classBuffs.isBuffEnabled(classBuff) || !this.checkBuff(classBuff).isWanted) continue;
            const id = this.spells.resolve(classBuff.id) ?? classBuff.id;
            const category = classBuff.categoryMembers ?? classBuff;
            if (!this.actionBars.isOnBars(id)) {
                scratch.candidateIds.push(id);
                scratch.candidateCategories.push(category);
                continue;
            }
            scratch.categoryOnBars.add(category);
            // Only a buff that can be cast now glows (Battle Shout waits for rage); one the client gives no answer about
            // still does
            if (this.spells.isCastable(id) === false) continue;
            let members = scratch.groupOf.get(category);
            if (members === undefined) {
                members = [];
                scratch.groupOf.set(category, members);
                scratch.groups.push(members);
            }
            members.push(classBuff);
        }
        const found = this.missing;
        for (const members of scratch.groups) {
            const picked = this.classBuffs.pickGroupBuff(members);
            found.glow.push(this.spells.resolve(picked.id) ?? picked.id);
        }
        this.addNotOnBars(found);
        return found;
    }

    /** The buffs on no bar, one of each group, when no member of the group is on the bars. */
    private addNotOnBars(found: MissingBuffs): void {
        const scratch = this.scratch;
        for (let index = 0; index < scratch.candidateIds.length; index++) {
            const id = scratch.candidateIds[index]!;
            const category = scratch.candidateCategories[index]!;
            if (!scratch.categoryOnBars.has(category) && !scratch.named.has(category)) {
                scratch.named.add(category);
                found.notOnBars.push(id);
            }
        }
    }

    /** Empties the tables of the last look at the buffs, and its answer. */
    private clearScratch(): void {
        const scratch = this.scratch;
        clearList(scratch.groups);
        clearList(scratch.candidateIds);
        clearList(scratch.candidateCategories);
        clearList(this.missing.glow);
        clearList(this.missing.notOnBars);
        for (const [category] of scratch.groupOf) scratch.groupOf.delete(category);
        for (const category of scratch.categoryOnBars) scratch.categoryOnBars.delete(category);
        for (const category of scratch.named) scratch.named.delete(category);
    }
}
