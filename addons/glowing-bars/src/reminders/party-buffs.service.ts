// Party members missing one of the player's buffs, in a party and in a raid (each has its switch). Out of combat only (in
// combat the client hides other units' auras), members online, alive and in range. In a raid every member: a group version
// (Prayer of Fortitude) covers the raid around the caster in Forever; but a blessing only on the classes the player gave
// one there (the others are another paladin's). When enough miss a buff (the player's setting, for a party and for a raid;
// of one class, for Greater Blessings) and the reagent is in the bags, the group version is suggested. The player counts
// too, as the buff reminder sees it: the group version buffs the player as well; but never for the player alone, for whom
// the single buff does. Of a group the one the player wants is
// asked for: the one cast last, else the main talent tree's, else the first. A blessing goes by the member's class: the one
// the player last gave that class (seen on its members), else Wisdom for a class with mana and Kings, else Might, for the
// others; the player's own is the one the buff reminder asks for.

import type { BuffStateService } from "../character/buff-state.service";
import type { AddonSettingsService } from "../settings/settings.interface";
import type { ReagentsService } from "../reagents/reagents.service";
import type { ClockService, PartyService, PlayerService, SpellsService } from "@wowkit/wow";
import type { BuffReminderService } from "./buff-reminder.service";
import type { ClassBuff } from "./class-buff.interface";
import { PARTY_BLESSINGS, WEAPON_MANA_CLASSES } from "./class-buffs.constants";
import type { ClassBuffsService } from "./class-buffs.service";
import type { PartySuggestion } from "./reminders.interface";

/** Party auras are read at most this often. */
const REFRESH_SECONDS = 1;

interface Member {
    unit: UnitToken;
    name: string;
    classToken: string;
    /** The player: counted for the group version, never named (the buff reminder asks for the player's own buffs). */
    isPlayer?: boolean;
}

export class PartyBuffsService {
    private cachedAt = -10;
    /** Was the player in a raid at the last look; undefined before the first (a reload in a raid forgets nothing). */
    private wasInRaid: boolean | undefined;
    private cached: PartySuggestion[] = [];

    constructor(
        private readonly auras: BuffStateService,
        private readonly spells: SpellsService,
        private readonly clock: ClockService,
        private readonly party: PartyService,
        private readonly player: PlayerService,
        private readonly classBuffs: ClassBuffsService,
        private readonly reagents: ReagentsService,
        private readonly settings: AddonSettingsService,
        private readonly buffReminder: BuffReminderService,
    ) {}

    /** What to cast on whom; empty in combat, or when the feature is off (for a party, or for a raid). */
    findPartyBuffSuggestions(): PartySuggestion[] {
        const isInRaid = this.party.isInRaid();
        // Before the switches: the blessings of a raid are forgotten on leaving it, with the switch of the new place off too
        if (this.wasInRaid !== undefined && this.wasInRaid !== isInRaid) {
            this.forgetGivenBlessings();
            this.cachedAt = -10;
        }
        this.wasInRaid = isInRaid;
        if (!this.settings.get(isInRaid ? "showRaidBuffs" : "showPartyBuffs") || this.player.isInCombat()) return [];
        const now = this.clock.getCurrentTime();
        if (now - this.cachedAt < REFRESH_SECONDS) return this.cached;
        this.cachedAt = now;
        const others: Member[] = (isInRaid ? this.party.getRaidUnits() : this.party.getPartyUnits())
            .filter((unit) => this.party.isReachable(unit))
            .map((unit) => ({ unit, ...this.party.getUnitIdentity(unit) }));
        const members = [...others, { unit: "player" as UnitToken, ...this.party.getUnitIdentity("player"), isPlayer: true }];
        this.cached =
            others.length === 0 ? [] : this.listPartyGroups().flatMap((group) => this.buildGroupSuggestions(group, members, isInRaid));
        return this.cached;
    }

    /** Read the party again on the next call (roster or auras changed). */
    refreshPartyBuffs(): void {
        this.cachedAt = -10;
    }

    /** The buffs to check, by category: enabled, learned, castable on others. */
    private listPartyGroups(): ClassBuff[][] {
        const groups: ClassBuff[][] = [];
        const groupOf = new LuaMap<object, ClassBuff[]>();
        for (const classBuff of this.classBuffs.getClassBuffs()) {
            if (!classBuff.party || !this.classBuffs.isBuffEnabled(classBuff) || !this.spells.isLearned(classBuff.id)) continue;
            const category = classBuff.categoryMembers ?? classBuff;
            let members = groupOf.get(category);
            if (members === undefined) {
                members = [];
                groupOf.set(category, members);
                groups.push(members);
            }
            members.push(classBuff);
        }
        return groups;
    }

    /** The suggestions of one category: the buff the player wants for all, or a blessing for each member's class. */
    private buildGroupSuggestions(group: ClassBuff[], members: Member[], isInRaid: boolean): PartySuggestion[] {
        if (!group[0]!.party!.isPerClass) return this.buildSuggestionsFor(this.classBuffs.pickGroupBuff(group), members, isInRaid);
        // A blessing of the player's on the player says nothing of what the player gives the paladins
        this.noteGivenBlessings(
            group,
            members.filter((member) => member.isPlayer !== true),
        );
        const buffs: ClassBuff[] = [];
        const membersOf = new LuaMap<ClassBuff, Member[]>();
        for (const member of members) {
            const buff = this.pickMemberBlessing(group, member, isInRaid);
            if (buff === undefined) continue;
            const list = membersOf.get(buff) ?? [];
            if (list.length === 0) buffs.push(buff);
            list.push(member);
            membersOf.set(buff, list);
        }
        return buffs.flatMap((buff) => this.buildSuggestionsFor(buff, membersOf.get(buff)!, isInRaid));
    }

    /**
     * Into a raid or out of one: the blessings given to each class are forgotten. A raid shares them out again, and a
     * class given one in the party may be another paladin's there.
     */
    private forgetGivenBlessings(): void {
        const lastBuffs = { ...this.settings.get("lastBuffs") };
        let hasForgotten = false;
        for (const group of this.listPartyGroups()) {
            const prefix = this.getClassKey(group, "");
            for (const [key] of pairs(lastBuffs)) {
                if (string.sub(key as string, 1, prefix.length) === prefix) {
                    lastBuffs[key as string] = undefined;
                    hasForgotten = true;
                }
            }
        }
        if (hasForgotten) this.settings.change("lastBuffs", lastBuffs);
    }

    /** The key of the blessing last given to a class, in the saved settings ("19740:PRIEST"). */
    private getClassKey(group: ClassBuff[], classToken: string): string {
        return `${this.classBuffs.getGroupKey(group[0]!)}:${classToken}`;
    }

    /** A member with one of the player's blessings shows the one the player gives its class (kept per character). */
    private noteGivenBlessings(group: ClassBuff[], members: Member[]): void {
        const spellsOf = group.map((buff): [number, number[]] => [buff.id, [buff.id, ...(buff.party?.groupIds ?? [])]]);
        for (const member of members) {
            const given = this.auras.findOwnUnitBuff(member.unit, spellsOf);
            const key = this.getClassKey(group, member.classToken);
            const lastBuffs = this.settings.get("lastBuffs");
            if (given !== undefined && lastBuffs[key] !== given) this.settings.change("lastBuffs", { ...lastBuffs, [key]: given });
        }
    }

    /**
     * The blessing for a member: the one last given to its class, else the first of PARTY_BLESSINGS the player knows. In
     * a raid only the one last given: the blessings are shared out there, a class the player gave none is another's.
     */
    private pickMemberBlessing(group: ClassBuff[], member: Member, isInRaid: boolean): ClassBuff | undefined {
        if (member.isPlayer === true) return this.classBuffs.pickGroupBuff(group);
        const last = this.settings.get("lastBuffs")[this.getClassKey(group, member.classToken)];
        const shouldGetWisdom = this.party.doesUseMana(member.unit) && !WEAPON_MANA_CLASSES.includes(member.classToken);
        const order = isInRaid ? [] : shouldGetWisdom ? PARTY_BLESSINGS.mana : PARTY_BLESSINGS.other;
        for (const id of [...(last !== undefined ? [last] : []), ...order]) {
            const found = group.find((buff) => buff.id === id);
            if (found !== undefined) return found;
        }
        return isInRaid ? undefined : group[0]!;
    }

    /** The highest learned rank of the group version that has its reagent. */
    private findUsableGroupSpell(classBuff: ClassBuff): number | undefined {
        const ranks = classBuff.party?.groupIds ?? [];
        for (let i = ranks.length - 1; i >= 0; i--) {
            const id = ranks[i]!;
            if (this.spells.isLearned(id)) return this.reagents.hasReagentFor(id) ? id : undefined;
        }
        return undefined;
    }

    private buildSuggestionsFor(classBuff: ClassBuff, members: Member[], isInRaid: boolean): PartySuggestion[] {
        const missing = members.filter((member) => this.isMissing(classBuff, member));
        if (missing.length === 0) return [];
        const groupSpell = this.findUsableGroupSpell(classBuff);
        if (groupSpell === undefined) return this.buildSuggestion(classBuff, classBuff.id, missing);
        const groupMin = this.settings.get(isInRaid ? "raidGroupMin" : "partyGroupMin");
        if (!classBuff.party!.isPerClass) {
            return this.buildSuggestion(classBuff, this.isGroupWorth(missing, groupMin) ? groupSpell : classBuff.id, missing);
        }
        return this.buildGreaterSuggestions(classBuff, groupSpell, missing, groupMin);
    }

    /** Enough miss the buff for its group version, and not the player alone: the single buff does for that. */
    private isGroupWorth(missing: Member[], groupMin: number): boolean {
        return missing.length >= groupMin && missing.some((member) => member.isPlayer !== true);
    }

    /** Does the member miss the buff? The player as the buff reminder sees it: anyone's buff of its group counts. */
    private isMissing(classBuff: ClassBuff, member: Member): boolean {
        if (member.isPlayer === true) return this.buffReminder.checkBuff(classBuff).isWanted;
        const party = classBuff.party!;
        return (
            (!party.isManaOnly || this.party.doesUseMana(member.unit)) &&
            this.party.isInSpellRange(classBuff.id, member.unit) &&
            this.auras.getUnitBuffState(member.unit, classBuff.id, party.isOwnOnly === true) === "missing"
        );
    }

    /**
     * The suggestion of a spell for the members who miss the buff, naming all but the player; none for the single buff on
     * the player alone (the buff reminder asks for it). A group version that buffs the player says so.
     */
    private buildSuggestion(classBuff: ClassBuff, spellId: number, missing: Member[]): PartySuggestion[] {
        const isGroup = spellId !== classBuff.id;
        const names = missing.filter((member) => member.isPlayer !== true).map((member) => member.name);
        if (!isGroup && names.length === 0) return [];
        const isForPlayer = isGroup && missing.some((member) => member.isPlayer === true);
        return [{ spellId, names, buffId: this.spells.resolve(classBuff.id) ?? classBuff.id, isForPlayer }];
    }

    /**
     * Greater Blessings cover one class: the group version for classes with enough members missing (the player's
     * setting), the single blessing for the rest.
     */
    private buildGreaterSuggestions(classBuff: ClassBuff, groupSpell: number, missing: Member[], groupMin: number): PartySuggestion[] {
        const byClass = new LuaMap<string, Member[]>();
        for (const member of missing) {
            const list = byClass.get(member.classToken) ?? [];
            list.push(member);
            byClass.set(member.classToken, list);
        }
        const out: PartySuggestion[] = [];
        const singles: Member[] = [];
        for (const [, list] of byClass) {
            if (this.isGroupWorth(list, groupMin)) out.push(...this.buildSuggestion(classBuff, groupSpell, list));
            else singles.push(...list);
        }
        out.push(...this.buildSuggestion(classBuff, classBuff.id, singles));
        return out;
    }
}
