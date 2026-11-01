import { isSoundKey } from "@wowkit/ui";
import type { AddonSettings, ColorKey, CueKind, Style, StyleOverride } from "./settings.interface";

/** The global the TOC saves per character (## SavedVariablesPerCharacter). */
export const SAVED_VARIABLES_NAME = "GlowingBarsCharDB";

export function createDefaultSettings(): AddonSettings {
    return {
        isMuted: false,
        hideResting: true,
        glowStyle: "circling",
        roundGlowStyle: "breathing",
        showBuff: true,
        showWeapon: true,
        showPartyBuffs: true,
        showRaidBuffs: true,
        partyGroupMin: 2,
        raidGroupMin: 1,
        showRanks: true,
        showReagents: true,
        showCooldowns: true,
        showCooldownsOutOfCombat: false,
        showCooldownsAtFightStart: false,
        cooldownGlowSeconds: 3,
        reagentLow: 5,
        showProcs: true,
        showSeals: true,
        showTracking: true,
        styles: {},
        spellStyles: {},
        buffOn: {},
        barOff: {},
        barFaded: {},
        fadedOpacity: 50,
        showTooltipIds: false,
        idOverrides: {},
        customCues: [],
        reagentOn: {},
        rankOff: {},
        glowOn: {},
        lastBuffs: {},
    };
}

/** The look of each kind of reminder until the player changes it. The old ranks and the low reagents are a quiet hint. */
export const STYLE_DEFAULTS: { [key in ColorKey]: Style } = {
    buff: { color: [0.2, 0.55, 1], opacity: 100, isTextOn: false, sound: "none", repeat: 0 },
    weapon: { color: [1, 0.55, 0.1], opacity: 100, isTextOn: false, sound: "alarm2", repeat: 0 },
    // The paladin's gold
    seal: { color: [1, 0.85, 0.2], opacity: 100, isTextOn: false, sound: "none", repeat: 0 },
    // #1AA6BF, a deep turquoise: a lighter cyan glows almost white
    tracking: { color: [0.1, 0.65, 0.75], opacity: 100, isTextOn: false, sound: "none", repeat: 0 },
    cooldown: { color: [1, 1, 1], opacity: 100, isTextOn: false, sound: "none", repeat: 0 },
    proc: { color: [1, 0.12, 0.08], opacity: 100, isTextOn: false, sound: "none", repeat: 0 },
    rank: { color: [1, 0.85, 0.2], opacity: 50, isTextOn: true, sound: "alarm1", repeat: 0 },
    // Its message is the town's: it names the reagents to buy
    reagent: { color: [1, 0.85, 0.2], opacity: 50, isTextOn: true, sound: "none", repeat: 0 },
};

/** The choices of how often a sound repeats while its glow is on (seconds; 0 = once). */
export const REPEAT_CHOICES = [0, 5, 10, 30, 60];

/** The kinds whose sound can repeat: their glow stays on until the player does something about it. */
export const REPEAT_KINDS: ColorKey[] = ["buff", "weapon", "tracking", "rank"];

/** The choices of how visible a faded bar's buttons are, in percent. */
export const FADED_OPACITY_CHOICES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

/** The choices of how long a cooldown glows once it is back (seconds; 0 = until it is pressed). */
export const COOLDOWN_GLOW_CHOICES = [2, 3, 5, 10, 0];

/** The choices of how few of a reagent in the bags is running low. */
export const REAGENT_LOW_CHOICES = [5, 10, 20, 40];

/** The choices of from how many missing a buff its group version is asked for. */
export const GROUP_MIN_CHOICES = [1, 2, 3, 4, 5];

/** The kinds a spell can be added as, in the order the add button goes through them. */
export const CUE_KINDS: CueKind[] = ["cooldown", "proc", "buff", "weapon", "reagent", "seal", "tracking"];

/** The kinds in the order the tables list them. */
export const KIND_ORDER: ColorKey[] = ["buff", "weapon", "seal", "tracking", "reagent", "cooldown", "proc", "rank"];

/** The part of a saved look that can be used: a sound that is no longer in the list, or a color that is no color, is dropped. */
function repairStyle(style: StyleOverride | undefined): StyleOverride | undefined {
    if (style === undefined || type(style) !== "table") return undefined;
    const repaired: StyleOverride = {};
    if (isSoundKey(style.sound)) repaired.sound = style.sound;
    if (type(style.isTextOn) === "boolean") repaired.isTextOn = style.isTextOn;
    if (REPEAT_CHOICES.includes(style.repeat as number)) repaired.repeat = style.repeat;
    const opacity = tonumber(style.opacity);
    if (opacity !== undefined) repaired.opacity = math.max(1, math.min(100, math.floor(opacity + 0.5)));
    const color = style.color;
    if (color !== undefined && type(color) === "table" && tonumber(color[0]) !== undefined) {
        repaired.color = [color[0], color[1] ?? 0, color[2] ?? 0];
    }
    return repaired;
}

/** Puts right what a saved look got wrong. */
export function repairSettings(values: AddonSettings): void {
    // A style no longer known (or circling on a round button) is the default again
    const defaults = createDefaultSettings();
    if (!["circling", "breathing", "still"].includes(values.glowStyle)) values.glowStyle = defaults.glowStyle;
    if (!["breathing", "still"].includes(values.roundGlowStyle)) values.roundGlowStyle = defaults.roundGlowStyle;
    if (!FADED_OPACITY_CHOICES.includes(values.fadedOpacity)) values.fadedOpacity = defaults.fadedOpacity;
    // An added spell that is not a number and a kind is dropped
    values.customCues = (values.customCues ?? []).filter(
        (cue) => type(cue) === "table" && tonumber(cue.id) !== undefined && CUE_KINDS.includes(cue.kind),
    );
    if (!COOLDOWN_GLOW_CHOICES.includes(values.cooldownGlowSeconds))
        values.cooldownGlowSeconds = createDefaultSettings().cooldownGlowSeconds;
    if (!REAGENT_LOW_CHOICES.includes(values.reagentLow)) values.reagentLow = defaults.reagentLow;
    // The old switch of a Greater Blessing for one member of a class in a party is a party group version from one
    const old = values as { showGreaterForOne?: boolean };
    if (old.showGreaterForOne === true) values.partyGroupMin = 1;
    old.showGreaterForOne = undefined;
    if (!GROUP_MIN_CHOICES.includes(values.partyGroupMin)) values.partyGroupMin = defaults.partyGroupMin;
    if (!GROUP_MIN_CHOICES.includes(values.raidGroupMin)) values.raidGroupMin = defaults.raidGroupMin;
    for (const kind of KIND_ORDER) values.styles[kind] = repairStyle(values.styles[kind]);
    for (const [name, style] of pairs(values.spellStyles)) values.spellStyles[name as string] = repairStyle(style);
}
