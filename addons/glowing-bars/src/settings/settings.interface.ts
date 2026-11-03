import type { SettingsService, SoundKey } from "@wowkit/ui";
import type { GlowAnimation, Rgb } from "@wowkit/wow";

/** The types of reminder. Each has a look (color, glow %, message, sound) the player can change for the type and for a spell. */
export type ReminderType = "buff" | "weapon" | "seal" | "tracking" | "cooldown" | "proc" | "rank" | "reagent" | "stock";

/** The settings service of this addon: a SettingsService that knows the shape of its settings. */
export type AddonSettingsService = SettingsService<AddonSettings>;

/**
 * When a reminder may show: always, only in combat or only out of it, only with a living enemy targeted; or (the low
 * reagents and the low stock) glowing anywhere, with its message and sound only in a town or an inn.
 */
export type When = "always" | "combat" | "noCombat" | "target" | "townAlert";

/** How a reminder looks and sounds, and when it shows. */
export interface Style {
    /** Of the glow and of the message. */
    color: Rgb;
    /** The glow %, 1 to 100. */
    glowPercent: number;
    /** Does a short message at the top of the screen say so? */
    isMessageOn: boolean;
    sound: SoundKey;
    /** Seconds between the repeats of the glow, the message and the sound; 0 shows them once, as the reminder starts. */
    repeat: number;
    when: When;
    /** Seconds the reminder shows once it is due, and again with each repeat; 0 = the whole time, until it is done. */
    glowTime: number;
    /** How the glow moves: around the button, breathing, or still (fading in and out only as it comes and goes). */
    animation: GlowAnimation;
}

/** The types a spell can be added as by the player: every type but the old ranks, which are found for every spell. */
export type AddableType = "buff" | "weapon" | "seal" | "tracking" | "reagent" | "cooldown" | "proc" | "stock";

/** A spell the player added by its ID; for the low stock an item, by its item ID. */
export interface AddedSpell {
    id: number;
    reminderType: AddableType;
}

/** The parts of a look the player changed; the rest is inherited. */
export type StyleOverride = Partial<Style>;

export interface AddonSettings {
    isMuted: boolean;
    hideResting: boolean;
    /** What a circling glow does on a round button (Forever's gamepad bars, another addon's), where it cannot circle. */
    roundAnimation: GlowAnimation;
    showBuff: boolean;
    showWeapon: boolean;
    /** Party members missing the player's buffs. */
    showPartyBuffs: boolean;
    /** Raid members missing the player's buffs. */
    showRaidBuffs: boolean;
    /**
     * The group version (Prayer of Fortitude, a Greater Blessing) is asked for from this many missing the buff, the player
     * counted (1 to 5): in a party, and in a raid. A Greater Blessing counts the members of its class.
     */
    partyGroupMin: number;
    raidGroupMin: number;
    /** Spells on the bars at a lower rank than the one the player knows. */
    showRanks: boolean;
    /** The reagents of the group buffs running low, on arriving in a town. */
    showReagents: boolean;
    /** Important cooldowns that are ready. */
    showCooldowns: boolean;
    /** As a fight starts, every ready cooldown glows too (a reminder to use it), for its glow time. */
    showCooldownsAtFightStart: boolean;
    /** A group buff's reagent runs low with fewer than this in the bags. */
    reagentBelow: number;
    /** The same of the items the player watches, and whether they are watched. */
    stockBelow: number;
    showStock: boolean;
    /** The limit of a row of its own ("stock:2512", "reagent:17028"), where it has one. */
    belowLimits: { [entry: string]: number | undefined };
    /** Spells the game says are usable now (Overpower, Revenge, Execute...). */
    showProcs: boolean;
    /** A paladin in a fight with no seal up. */
    showSeals: boolean;
    /** A miner or a herbalist with no tracking on. */
    showTracking: boolean;
    /** The player's changes to the look of each type of reminder (the default look of its spells). */
    styles: { [key in ReminderType]?: StyleOverride };
    /** The player's changes to the look of one spell in one type, by the type and the spell's name ("rank:Smite"). */
    spellStyles: { [typeAndName: string]: StyleOverride | undefined };
    /** The player's fix of the ID of a cooldown or proc of the lists (by the list's ID): the ID the client knows it by. */
    idOverrides: { [listId: string]: number | undefined };
    /** Cooldowns and procs the player added by their ID. */
    addedSpells: AddedSpell[];
    /** The action bars (1 to 8) whose buttons are faded until they glow; only set where the player switched one on. */
    barFaded: { [bar: string]: boolean | undefined };
    /** How visible the buttons of a faded bar are while they do not glow, in percent. */
    fadedOpacity: number;
    /** The spell IDs in the spell and item tooltips, to add a spell by its ID in the table. */
    showTooltipIds: boolean;
    /** The action bars (1 to 8) whose buttons do not glow; only set where the player switched one off. */
    barOff: { [bar: string]: boolean | undefined };
    /** Per-spell switches of the cooldown and proc glows (by spell ID); only set where the player switched one off. */
    enabledSpells: { [spellId: string]: boolean | undefined };
    /** The buff of a group (one aura, one armor) the player cast last, by the group's first spell ID: the one that glows. */
    lastBuffs: { [group: string]: number | undefined };
    /** The Well Fed each food or drink the player added gives, as learned when it was used (spell ID -> the aura's spell ID). */
    fedBuffs: { [spell: string]: number | undefined };
    /** The item of each food or drink the player added, as seen on a button (spell ID -> item ID). */
    fedItems: { [spell: string]: number | undefined };
    /** The spells whose old rank is not reminded of, by name; only set where the player switched one off. */
    enabledRanks: { [spellName: string]: boolean | undefined };
    /** Per-reagent switches (by item ID); only set where the player switched one off. */
    enabledReagents: { [itemId: string]: boolean | undefined };
    /** Per-buff switches; only set where the player changed the default. */
    enabledBuffs: { [buffKey: string]: boolean | undefined };
    /** Weapon buff picks (WeaponBuff.key); undefined = automatic. */
    weaponBuff?: string;
    weaponBuffOff?: string;
}
