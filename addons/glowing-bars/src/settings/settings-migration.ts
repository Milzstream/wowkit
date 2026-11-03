// Brings the settings saved by 1.9.1 and before to the names of today, so a player who set things up before updating keeps
// them. Each step looks only at the old names and takes them away, so settings that are already new pass through untouched.
import type { AddonSettings } from "./settings.interface";

/** A saved table, read by its names: old ones are not in the types of today. */
interface SavedTable {
    [key: string]: unknown;
}

/** The settings that only changed their name. */
const RENAMED_SETTINGS: { [oldName: string]: string } = {
    isMuted: "isDisabled",
    hideResting: "shouldStayQuietInTowns",
    showBuff: "isMissingBuffEnabled",
    showWeapon: "isWeaponBuffEnabled",
    showSeals: "isMissingSealEnabled",
    showTracking: "isMissingTrackingEnabled",
    showReagents: "isLowReagentEnabled",
    showStock: "isLowStockEnabled",
    showCooldowns: "isReadyCooldownEnabled",
    showProcs: "isProcEnabled",
    showRanks: "isOldRankEnabled",
    partyGroupMin: "partyGroupFrom",
    raidGroupMin: "raidGroupFrom",
    barFaded: "fadedBars",
    glowOn: "enabledSpells",
    buffOn: "enabledBuffs",
    reagentOn: "enabledReagents",
};

/** The old names of the types of reminder. */
const RENAMED_TYPES: { [oldName: string]: string } = {
    buff: "missingBuff",
    weapon: "weaponBuff",
    seal: "missingSeal",
    tracking: "missingTracking",
    cooldown: "readyCooldown",
    rank: "oldRank",
    reagent: "lowReagent",
    stock: "lowStock",
};

/** What the old limits were by default: a saved default is no choice of the player's, so it takes the new one. */
const OLD_REAGENT_LOW = 5;
const OLD_STOCK_LOW = 20;
const OLD_COOLDOWN_GLOW_SECONDS = 3;

/** The look of a type or a spell, with the names of today. */
function convertStyle(style: SavedTable): SavedTable {
    const converted: SavedTable = { ...style };
    if (converted.isTextOn !== undefined) converted.isMessageOn = converted.isTextOn;
    if (converted.opacity !== undefined) converted.glowPercent = converted.opacity;
    converted.isTextOn = undefined;
    converted.opacity = undefined;
    return converted;
}

function convertStyles(values: SavedTable): void {
    const styles: SavedTable = {};
    for (const [key, style] of pairs(values.styles as SavedTable)) {
        styles[RENAMED_TYPES[key as string] ?? (key as string)] = convertStyle(style as SavedTable);
    }
    values.styles = styles;
    const spellStyles: SavedTable = {};
    for (const [key, style] of pairs(values.spellStyles as SavedTable)) {
        const [oldType, name] = string.match(key as string, "^(%a+):(.*)$");
        const newType = RENAMED_TYPES[oldType as string];
        spellStyles[newType !== undefined ? `${newType}:${name as string}` : (key as string)] = convertStyle(style as SavedTable);
    }
    values.spellStyles = spellStyles;
}

/** What was "this many or fewer" is "below this" now: one more says the same. */
function convertLimits(values: SavedTable): void {
    if (values.reagentLow !== undefined && values.reagentLow !== OLD_REAGENT_LOW) values.reagentBelow = (values.reagentLow as number) + 1;
    if (values.stockLow !== undefined && values.stockLow !== OLD_STOCK_LOW) values.stockBelow = (values.stockLow as number) + 1;
    values.reagentLow = undefined;
    values.stockLow = undefined;
    if (values.lowAt === undefined) return;
    const belowLimits: SavedTable = {};
    for (const [key, limit] of pairs(values.lowAt as SavedTable)) {
        const [oldType, entry] = string.match(key as string, "^(%a+):(.*)$");
        belowLimits[`${RENAMED_TYPES[oldType as string] ?? (oldType as string)}:${entry as string}`] = (limit as number) + 1;
    }
    values.belowLimits = belowLimits;
    values.lowAt = undefined;
}

/** An old map of what is switched off (true) as a new map of what is on, where off is false. */
function convertSwitchedOff(values: SavedTable, oldName: string, newName: string): void {
    if (values[oldName] === undefined) return;
    const enabled: SavedTable = {};
    for (const [key, isOff] of pairs(values[oldName] as SavedTable)) if (isOff === true) enabled[key as string] = false;
    values[newName] = enabled;
    values[oldName] = undefined;
}

function convertAddedSpells(values: SavedTable): void {
    if (values.customCues === undefined) return;
    values.addedSpells = (values.customCues as { id: number; kind: string }[]).map((cue) => ({
        id: cue.id,
        reminderType: RENAMED_TYPES[cue.kind] ?? cue.kind,
    }));
    values.customCues = undefined;
}

/** A setting for all glows or all cooldowns that is now a part of the look of a type. */
function convertToLooks(values: SavedTable): void {
    const styles = values.styles as { [reminderType: string]: SavedTable | undefined };
    const changeLook = (reminderType: string, change: SavedTable) => {
        styles[reminderType] = { ...styles[reminderType], ...change };
    };
    const glowStyle = values.glowStyle;
    if (glowStyle === "breathing" || glowStyle === "still") {
        const animation = glowStyle === "still" ? "none" : glowStyle;
        for (const [, reminderType] of pairs(RENAMED_TYPES)) changeLook(reminderType, { animation });
        changeLook("proc", { animation });
    }
    if (values.showCooldownsOutOfCombat === true) changeLook("readyCooldown", { when: "always" });
    const seconds = values.cooldownGlowSeconds;
    if (seconds !== undefined && seconds !== OLD_COOLDOWN_GLOW_SECONDS) changeLook("readyCooldown", { glowTime: seconds });
    values.glowStyle = undefined;
    values.showCooldownsOutOfCombat = undefined;
    values.cooldownGlowSeconds = undefined;
}

/** Brings settings saved under the old names to the new ones; the saved values were already laid over the defaults. */
export function convertOldSettings(settings: AddonSettings): void {
    const values = settings as unknown as SavedTable;
    for (const [oldName, newName] of pairs(RENAMED_SETTINGS)) {
        if (values[oldName] === undefined) continue;
        values[newName] = values[oldName];
        values[oldName] = undefined;
    }
    if (values.roundGlowStyle !== undefined) values.roundAnimation = values.roundGlowStyle === "still" ? "none" : values.roundGlowStyle;
    values.roundGlowStyle = undefined;
    convertStyles(values);
    convertLimits(values);
    convertSwitchedOff(values, "rankOff", "enabledRanks");
    convertSwitchedOff(values, "barOff", "barsThatGlow");
    convertAddedSpells(values);
    convertToLooks(values);
}
