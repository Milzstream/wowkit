// The buffs the addon reminds about, per class (UnitClass token).
import { Druid as D, Hunter as H, Mage as M, Paladin as P, Priest as Pr, Shaman as Sh, Warlock as L, Warrior as W } from "@wowkit/wow-data";
import type { ClassBuff, PartyBuff } from "./class-buff.interface";

function createClassBuff(
    key: string,
    id: number,
    options: Omit<ClassBuff, "key" | "id" | "isOnByDefault"> = {},
    isOnByDefault = true,
): ClassBuff {
    return { key, id, isOnByDefault, ...options };
}

/** A blessing: the player's own counts, its Greater version covers one class. */
function createBlessing(groupIds: number[]): PartyBuff {
    return { groupIds, isPerClass: true, isOwnOnly: true };
}

const mageArmors = [M.MageArmor, M.IceArmor, M.FrostArmor];
const lockSkins = [L.DemonArmor, L.DemonSkin];
const shamanShields = [Sh.LightningShield, Sh.WaterShield];
const palaAuras = [
    P.DevotionAura,
    P.RetributionAura,
    P.ConcentrationAura,
    P.SanctityAura,
    P.FireResistAura,
    P.FrostResistAura,
    P.ShadowResistAura,
];
const palaBlessings = [P.BlessingMight, P.BlessingKings, P.BlessingWisdom, P.BlessingSalvation, P.BlessingLight];
const hunterAspects = [H.AspectHawk, H.AspectMonkey, H.AspectWild, H.AspectCheetah, H.AspectPack, H.AspectBeast];

/**
 * Of a group, the buff each talent tree (by its place in the client's list) wants first, before the player has cast one:
 * the list of the tree, in order; a buff of another group in the same list is skipped.
 */
export const TALENT_BUFFS: { [classToken: string]: { [tree: number]: number[] | undefined } | undefined } = {
    PALADIN: {
        1: [P.ConcentrationAura, P.BlessingWisdom],
        2: [P.DevotionAura, P.BlessingKings],
        3: [P.SanctityAura, P.RetributionAura, P.BlessingMight],
    },
    SHAMAN: { 1: [Sh.LightningShield], 2: [Sh.LightningShield], 3: [Sh.WaterShield] },
    MAGE: { 1: [M.MageArmor], 2: [M.MageArmor], 3: [M.IceArmor] },
};

/**
 * The blessing a party member wants before the player has given one to its class (the first of these the player
 * knows): Wisdom for a class with mana (a healer or a caster runs out of it), Kings for the others (a tank, a hunter),
 * else Might.
 */
/** Classes with mana that fight with weapons: Kings or Might, not Wisdom. */
export const WEAPON_MANA_CLASSES = ["HUNTER"];

export const PARTY_BLESSINGS = {
    mana: [P.BlessingWisdom, P.BlessingKings, P.BlessingMight],
    other: [P.BlessingKings, P.BlessingMight, P.BlessingWisdom],
};

/** Battle Shout's reminder comes this many seconds before it runs out: it runs out in a fight, and needs rage. */
const BATTLE_SHOUT_LEAD = 3;

/** In list order: of a category, the first one that is learned and on the bars is the one asked for. */
export const BUFF_LISTS: { [classToken: string]: ClassBuff[] | undefined } = {
    DRUID: [
        createClassBuff("MarkoftheWild", D.MarkOfTheWild, { last: 1800, party: { groupIds: D.GiftOfTheWild } }),
        createClassBuff("Thorns", D.Thorns, { last: 600 }),
        createClassBuff("Moonkin", D.Moonkin, {}, false),
    ],
    PALADIN: [
        createClassBuff("DevotionAura", P.DevotionAura, { categoryMembers: palaAuras }),
        createClassBuff("RetributionAura", P.RetributionAura, { categoryMembers: palaAuras }),
        createClassBuff("ConcentrationAura", P.ConcentrationAura, { categoryMembers: palaAuras }),
        createClassBuff("SanctityAura", P.SanctityAura, { categoryMembers: palaAuras }),
        createClassBuff("FireResistAura", P.FireResistAura, { categoryMembers: palaAuras }),
        createClassBuff("FrostResistAura", P.FrostResistAura, { categoryMembers: palaAuras }),
        createClassBuff("ShadowResistAura", P.ShadowResistAura, { categoryMembers: palaAuras }),
        createClassBuff("BlessingMight", P.BlessingMight, {
            categoryMembers: palaBlessings,
            party: createBlessing(P.GreaterBlessingMight),
        }),
        createClassBuff("BlessingKings", P.BlessingKings, {
            categoryMembers: palaBlessings,
            party: createBlessing(P.GreaterBlessingKings),
        }),
        createClassBuff("BlessingWisdom", P.BlessingWisdom, {
            categoryMembers: palaBlessings,
            party: createBlessing(P.GreaterBlessingWisdom),
        }),
        createClassBuff("RighteousFury", P.RighteousFury, { last: 1800 }, false),
    ],
    WARRIOR: [
        createClassBuff("BattleShout", W.BattleShout, { last: 120, lead: BATTLE_SHOUT_LEAD }),
        // A tank's: it glows only when it can be cast (Defensive Stance, a shield, rage, off cooldown), in a fight by default
        createClassBuff("ShieldBlock", W.ShieldBlock, { last: 7 }),
    ],
    HUNTER: [
        createClassBuff("AspectHawk", H.AspectHawk, { categoryMembers: hunterAspects }),
        createClassBuff("AspectMonkey", H.AspectMonkey, { categoryMembers: hunterAspects }),
        createClassBuff("AspectWild", H.AspectWild, { categoryMembers: hunterAspects }),
        createClassBuff("TrueshotAura", H.TrueshotAura, { last: 1800 }),
    ],
    ROGUE: [],
    PRIEST: [
        createClassBuff("InnerFire", Pr.InnerFire, { last: 600 }),
        createClassBuff("PowerWordFortitude", Pr.PowerWordFortitude, { last: 1800, party: { groupIds: Pr.PrayerOfFortitude } }),
        createClassBuff("DivineSpirit", Pr.DivineSpirit, { last: 1800, party: { groupIds: Pr.PrayerOfSpirit } }),
        createClassBuff("ShadowProtection", Pr.ShadowProtection, { last: 600, party: { groupIds: Pr.PrayerOfShadowProtection } }),
        createClassBuff("Shadowform", Pr.Shadowform, { last: 1800 }),
    ],
    SHAMAN: [
        createClassBuff("LightningShield", Sh.LightningShield, { categoryMembers: shamanShields, last: 600 }),
        createClassBuff("WaterShield", Sh.WaterShield, { categoryMembers: shamanShields, last: 600 }),
    ],
    MAGE: [
        createClassBuff("ArcaneIntellect", M.ArcaneIntellect, { last: 1800, party: { groupIds: M.ArcaneBrilliance, isManaOnly: true } }),
        createClassBuff("MageArmor", M.MageArmor, { categoryMembers: mageArmors }),
        createClassBuff("IceArmor", M.IceArmor, { categoryMembers: mageArmors }),
        createClassBuff("FrostArmor", M.FrostArmor, { categoryMembers: mageArmors }),
        createClassBuff("AmplifyMagic", M.AmplifyMagic, { last: 600 }, false),
    ],
    WARLOCK: [
        createClassBuff("DemonArmor", L.DemonArmor, { categoryMembers: lockSkins }),
        createClassBuff("DemonSkin", L.DemonSkin, { categoryMembers: lockSkins }),
        createClassBuff("UnendingBreath", L.UnendingBreath, { isSwimmingOnly: true, last: 600 }),
    ],
};
