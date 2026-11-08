// The player, the target, the pet and the party: who they are, whether they fight, rest, are alive and in range, how
// hurt they are, what they cast.
import { POWER, findPartyMember, type ClientState, type FakePartyMember } from "./client-state";
import { defineGlobals } from "./define";

/** Health points behind a percent (the fake game keeps percents). */
const MAX_HEALTH = 1000;
/** Interact distances: 3 duel (10 yards), 2 trade (11 yards), 1 inspect (28 yards). */
const INTERACT_YARDS: { [index: number]: number | undefined } = { 1: 28, 2: 11, 3: 10 };

export function installUnits(state: ClientState): void {
    /** party1..party4 (raid1..n in a raid) are the members of the test's party, the player is everyone else. */
    function findMember(unit: UnitToken): FakePartyMember | undefined {
        return findPartyMember(state, unit);
    }

    /** nameplate1..n are the enemies around that fight the player. */
    function isNameplate(unit: UnitToken): boolean {
        const [digit] = string.match(unit, "^nameplate(%d+)$");
        return digit !== undefined && tonumber(digit)! <= state.nameplates;
    }

    function doesExist(unit: UnitToken): boolean {
        if (unit === "player" || isNameplate(unit)) return true;
        if (unit === "raid1") return state.isInRaid;
        if (unit === "target") return state.target !== undefined;
        if (unit === "pet") return state.pet !== undefined;
        return findMember(unit) !== undefined;
    }

    /** The unit's health in percent; undefined while the game hides it. */
    function readHealth(unit: UnitToken): number | undefined {
        if (unit === "target") return state.target?.health;
        if (unit === "player") return state.isHealthHidden ? undefined : state.health;
        return doesExist(unit) ? 100 : undefined;
    }

    function readPower(unit: UnitToken, powerType?: Enum.PowerType): number | undefined {
        if (unit !== "player") return 0;
        if (powerType === undefined || powerType === POWER.Mana) return state.isHealthHidden ? undefined : state.mana.current;
        if (powerType === POWER.Energy) return state.energy;
        if (powerType === 4) return state.comboPoints;
        return 0;
    }

    defineGlobals({
        UnitClass: (unit) => {
            const member = findMember(unit);
            if (member) return $multi(member.classToken, member.classToken, 0);
            return $multi(state.character.name, state.character.token, state.character.id);
        },
        UnitClassBase: (unit) => {
            const member = findMember(unit);
            if (member) return $multi(member.classToken, 0);
            return $multi(state.character.token, state.character.id);
        },
        UnitName: (unit) => $multi(unit === "target" ? (state.target?.name ?? "") : (findMember(unit)?.name ?? "Me"), ""),
        UnitLevel: (unit) => (unit === "target" ? (state.target?.level ?? 0) : state.level),
        UnitRace: () => $multi(state.race.file, state.race.file, state.race.id),
        UnitFactionGroup: () => $multi("Alliance", "Alliance"),
        UnitExists: (unit) => doesExist(unit as UnitToken),
        UnitIsConnected: () => true,
        UnitIsVisible: () => true,
        UnitIsUnit: (unit, other) => unit === other,
        UnitIsPlayer: (unit) => unit === "player" || findMember(unit as UnitToken) !== undefined,
        UnitIsDead: (unit) => (unit === "target" ? state.target?.isDead === true : unit === "pet" ? state.pet?.isDead === true : false),
        UnitIsDeadOrGhost: (unit) =>
            unit === "target"
                ? state.target?.isDead === true
                : unit === "pet"
                  ? state.pet?.isDead === true
                  : findMember(unit)?.isDead === true,
        UnitReaction: (_unit, other) => (other === "target" && state.target?.isEnemy === true ? 2 : 5),
        UnitCanAttack: (_unit, other) => (other === "target" && state.target?.isEnemy === true) || isNameplate(other),
        UnitGUID: (unit) => (unit === "target" && state.target ? `Creature-0-0-0-0-1-${state.target.name}` : undefined),
        UnitClassification: (unit) => (unit === "target" ? (state.target?.classification ?? "normal") : "normal"),
        UnitCreatureType: (unit) => {
            const creature = unit === "target" ? state.target?.creatureType : undefined;
            return $multi(creature as string, 0);
        },
        UnitThreatSituation: (_unit, mob) => {
            if (mob !== undefined && isNameplate(mob)) return 0;
            return mob === "target" && state.target ? (state.target.isAttackingPlayer === true ? 3 : 0) : undefined;
        },
        CheckInteractDistance: (unit, index) => {
            const yards = INTERACT_YARDS[index];
            return unit === "target" && state.target !== undefined && yards !== undefined && state.target.yards <= yards;
        },
        UnitDistanceSquared: () => $multi(0, false),
        UnitInRange: () => $multi(true, true),
        UnitInParty: (unit) => findMember(unit as UnitToken) !== undefined,
        UnitInRaid: () => undefined,
        IsInGroup: () => state.party.length > 0,
        UnitHealth: (unit) => {
            const percent = readHealth(unit);
            return (percent !== undefined ? (percent / 100) * MAX_HEALTH : undefined) as number;
        },
        UnitHealthMax: (unit) => (readHealth(unit) !== undefined ? MAX_HEALTH : undefined) as number,
        // The client evaluates the curve over the hidden value: here over the real one
        UnitHealthPercent: (unit, _usePredicted, curve) => {
            const percent = unit === "player" ? state.health : (readHealth(unit) ?? 100);
            return curve ? (curve as LuaCurveObject).Evaluate(percent / 100) : percent;
        },
        UnitPowerPercent: (_unit, _powerType, _unmodified, curve) => {
            const percent = (state.mana.current / state.mana.max) * 100;
            return curve ? (curve as LuaCurveObject).Evaluate(percent / 100) : percent;
        },
        UnitPower: (unit, powerType) => readPower(unit, powerType) as number,
        UnitPowerMax: (unit, powerType) =>
            (unit !== "player"
                ? 0
                : powerType === undefined || powerType === POWER.Mana
                  ? state.isHealthHidden
                      ? undefined
                      : state.mana.max
                  : 100) as number,
        GetComboPoints: () => state.comboPoints,
        UnitPowerType: (unit) => $multi(findMember(unit)?.power ?? 0, "POWER", undefined, undefined, undefined),
        UnitAffectingCombat: (unit) =>
            unit === "player" ? state.isInCombat : unit === "target" && state.target?.isAttackingPlayer === true,
        InCombatLockdown: () => state.isInCombat,
        UnitOnTaxi: () => false,
        IsMounted: () => false,
        IsResting: () => state.isResting,
        IsSwimming: () => false,
        UnitIsAFK: () => state.isAfk,
        GetInventoryItemID: (_unit, slot) => state.equippedItems[slot],
        GetNumShapeshiftForms: () => state.stances.length,
        // icon, active, castable, spell
        GetShapeshiftFormInfo: (index) => $multi(0, state.stances[index - 1] === state.activeStance, true, state.stances[index - 1]!),
        GetBuildInfo: () => $multi("1.60.1", "70425", "Oct 16 2026", 16001, "1.60.1 (70425)", "1.60.1"),
        // name first, notInterruptible eighth (castID is seventh)
        UnitCastingInfo: ((unit: UnitToken) => {
            const name = unit === "target" ? state.target?.castingSpell : unit === "player" ? state.castingSpell : undefined;
            if (name === undefined) return $multi();
            const isShielded = unit === "target" && state.target?.isCastShielded === true;
            return $multi(name, name, 0, 0, GetTime() * 1000 + 1500, false, "cast", isShielded, 0);
        }) as unknown as typeof UnitCastingInfo,
        UnitChannelInfo: (() => $multi()) as unknown as typeof UnitChannelInfo,
        // The game's secret values: this fake game never hides one (hidden reads come back empty instead)
        issecretvalue: () => false,
        canaccessvalue: () => true,
    });
}
