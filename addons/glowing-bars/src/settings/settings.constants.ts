import { isSoundKey } from "@wowkit/ui";
import type { GlowAnimation } from "@wowkit/wow";
import type { AddonSettings, ReminderType, AddableType, Style, StyleOverride, When } from "./settings.interface";

/** The global the TOC saves per character (## SavedVariablesPerCharacter). */
export const SAVED_VARIABLES_NAME = "GlowingBarsCharDB";

export function createDefaultSettings(): AddonSettings {
    return {
        isMuted: false,
        hideResting: true,
        roundAnimation: "breathing",
        showBuff: true,
        showWeapon: true,
        showPartyBuffs: true,
        showRaidBuffs: true,
        partyGroupMin: 2,
        raidGroupMin: 1,
        showRanks: true,
        showReagents: true,
        showCooldowns: true,
        showCooldownsAtFightStart: false,
        reagentBelow: 10,
        stockBelow: 20,
        showStock: true,
        belowLimits: {},
        showProcs: true,
        showSeals: true,
        showTracking: true,
        styles: {},
        spellStyles: {},
        enabledBuffs: {},
        barOff: {},
        barFaded: {},
        fadedOpacity: 50,
        showTooltipIds: false,
        idOverrides: {},
        addedSpells: [],
        enabledReagents: {},
        enabledRanks: {},
        enabledSpells: {},
        lastBuffs: {},
        fedBuffs: {},
        fedItems: {},
    };
}

/** The look of each type of reminder until the player changes it. The old ranks and the low reagents are a quiet hint. */
export const STYLE_DEFAULTS: { [key in ReminderType]: Style } = {
    buff: {
        color: [0.2, 0.55, 1],
        glowPercent: 100,
        isMessageOn: false,
        sound: "none",
        repeat: 0,
        when: "always",
        glowTime: 0,
        animation: "circling",
    },
    weapon: {
        color: [1, 0.55, 0.1],
        glowPercent: 100,
        isMessageOn: false,
        sound: "alarm2",
        repeat: 0,
        when: "always",
        glowTime: 0,
        animation: "circling",
    },
    // The paladin's gold
    seal: {
        color: [1, 0.85, 0.2],
        glowPercent: 100,
        isMessageOn: false,
        sound: "none",
        repeat: 0,
        when: "combat",
        glowTime: 0,
        animation: "circling",
    },
    // #1AA6BF, a deep turquoise: a lighter cyan glows almost white
    tracking: {
        color: [0.1, 0.65, 0.75],
        glowPercent: 100,
        isMessageOn: false,
        sound: "none",
        repeat: 0,
        when: "always",
        glowTime: 0,
        animation: "circling",
    },
    cooldown: {
        color: [1, 1, 1],
        glowPercent: 100,
        isMessageOn: false,
        sound: "none",
        repeat: 0,
        when: "combat",
        glowTime: 3,
        animation: "circling",
    },
    proc: {
        color: [1, 0.12, 0.08],
        glowPercent: 100,
        isMessageOn: false,
        sound: "none",
        repeat: 0,
        when: "always",
        glowTime: 0,
        animation: "circling",
    },
    rank: {
        color: [1, 0.85, 0.2],
        glowPercent: 50,
        isMessageOn: true,
        sound: "alarm1",
        repeat: 0,
        when: "always",
        glowTime: 0,
        animation: "circling",
    },
    // Its message is the town's: it names the reagents to buy
    reagent: {
        color: [1, 0.85, 0.2],
        glowPercent: 50,
        isMessageOn: true,
        sound: "none",
        repeat: 0,
        when: "townAlert",
        glowTime: 0,
        animation: "circling",
    },
    // A quieter red than the procs'
    stock: {
        color: [1, 0.12, 0.08],
        glowPercent: 50,
        isMessageOn: true,
        sound: "none",
        repeat: 0,
        when: "always",
        glowTime: 0,
        animation: "circling",
    },
};

/** When a reminder of the reminderType may show: by combat or a target; the low reagents and the low stock also with their alert in a town. */
export function listWhenChoices(reminderType: ReminderType): When[] {
    const choices: When[] = ["always", "combat", "noCombat", "target"];
    return reminderType === "reagent" || reminderType === "stock" ? [...choices, "townAlert"] : choices;
}

/** The choices of how often a sound repeats while its glow is on (seconds; 0 = once). */
export const REPEAT_CHOICES = [0, 5, 10, 30, 60];

/** The choices of how visible a faded bar's buttons are, in percent. */
export const FADED_OPACITY_CHOICES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

/** The choices of how a glow moves. */
export const ANIMATION_CHOICES: GlowAnimation[] = ["circling", "breathing", "still"];

/** The choices of how long a reminder shows once it is due (seconds; 0 = until it is done). */
export const GLOW_TIME_CHOICES = [0, 1, 2, 3, 5, 10];

/** The choices of from how many missing a buff its group version is asked for. */
export const GROUP_MIN_CHOICES = [1, 2, 3, 4, 5];

/** The types a spell can be added as, in the order the add button goes through them. */
export const ADDABLE_TYPES: AddableType[] = ["cooldown", "proc", "buff", "weapon", "reagent", "stock", "seal", "tracking"];

/** The types in the order the tables list them. */
export const TYPE_ORDER: ReminderType[] = ["buff", "weapon", "seal", "tracking", "reagent", "stock", "cooldown", "proc", "rank"];

/** A saved value that is one of the choices; undefined for any other. */
function pickChoice<T>(value: T | undefined, choices: T[]): T | undefined {
    return value !== undefined && choices.includes(value) ? value : undefined;
}

/** A saved When that the type has; undefined for any other (the type of a spell look not known: none). */
function repairWhen(when: unknown, reminderType: ReminderType | undefined): When | undefined {
    return reminderType !== undefined && listWhenChoices(reminderType).includes(when as When) ? (when as When) : undefined;
}

/** The part of a saved look that can be used: a sound that is no longer in the list, or a color that is no color, is dropped. */
function repairStyle(style: StyleOverride | undefined, reminderType: ReminderType | undefined): StyleOverride | undefined {
    if (style === undefined || type(style) !== "table") return undefined;
    const repaired: StyleOverride = {};
    repaired.when = repairWhen(style.when, reminderType);
    if (isSoundKey(style.sound)) repaired.sound = style.sound;
    if (type(style.isMessageOn) === "boolean") repaired.isMessageOn = style.isMessageOn;
    repaired.repeat = pickChoice(style.repeat, REPEAT_CHOICES);
    repaired.glowTime = pickChoice(style.glowTime, GLOW_TIME_CHOICES);
    repaired.animation = pickChoice(style.animation, ANIMATION_CHOICES);
    const glowPercent = tonumber(style.glowPercent);
    if (glowPercent !== undefined) repaired.glowPercent = math.max(1, math.min(100, math.floor(glowPercent + 0.5)));
    const color = style.color;
    if (color !== undefined && type(color) === "table" && tonumber(color[0]) !== undefined) {
        repaired.color = [color[0], color[1] ?? 0, color[2] ?? 0];
    }
    return repaired;
}

/** A limit of how few is running low: any number from 0. */
function repairLimit(limit: unknown, byDefault: number): number {
    return type(limit) === "number" && (limit as number) >= 0 ? (limit as number) : byDefault;
}

/** Puts right what a saved look got wrong. */
export function repairSettings(values: AddonSettings): void {
    // A style no longer known (or circling on a round button) is the default again
    const defaults = createDefaultSettings();
    if (!["breathing", "still"].includes(values.roundAnimation)) values.roundAnimation = defaults.roundAnimation;
    if (!FADED_OPACITY_CHOICES.includes(values.fadedOpacity)) values.fadedOpacity = defaults.fadedOpacity;
    // An added spell that is not a number and a type is dropped
    values.addedSpells = (values.addedSpells ?? []).filter(
        (cue) => type(cue) === "table" && tonumber(cue.id) !== undefined && ADDABLE_TYPES.includes(cue.reminderType),
    );
    values.reagentBelow = repairLimit(values.reagentBelow, defaults.reagentBelow);
    values.stockBelow = repairLimit(values.stockBelow, defaults.stockBelow);
    // The old switch of a Greater Blessing for one member of a class in a party is a party group version from one
    const old = values as { showGreaterForOne?: boolean };
    if (old.showGreaterForOne === true) values.partyGroupMin = 1;
    old.showGreaterForOne = undefined;
    if (!GROUP_MIN_CHOICES.includes(values.partyGroupMin)) values.partyGroupMin = defaults.partyGroupMin;
    if (!GROUP_MIN_CHOICES.includes(values.raidGroupMin)) values.raidGroupMin = defaults.raidGroupMin;
    for (const reminderType of TYPE_ORDER) values.styles[reminderType] = repairStyle(values.styles[reminderType], reminderType);
    // A spell's look is kept under its type and name ("buff:Arcane Intellect")
    for (const [key, style] of pairs(values.spellStyles)) {
        const [reminderType] = string.match(key as string, "^(%a+):");
        values.spellStyles[key as string] = repairStyle(
            style,
            TYPE_ORDER.find((known) => known === reminderType),
        );
    }
}
