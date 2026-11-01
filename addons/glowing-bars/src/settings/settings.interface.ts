import type { SettingsService, SoundKey } from "@wowkit/ui";
import type { GlowStyle, Rgb } from "@wowkit/wow";

/** The kinds of reminder. Each has a look (color, opacity, message, sound) the player can change for the kind and for a spell. */
export type ColorKey = "buff" | "weapon" | "seal" | "tracking" | "cooldown" | "proc" | "rank" | "reagent";

/** The settings service of this addon: a SettingsService that knows the shape of its settings. */
export type AddonSettingsService = SettingsService<AddonSettings>;

/** How a reminder looks and sounds. */
export interface Style {
    /** Of the glow and of the message. */
    color: Rgb;
    /** The opacity of the glow, 1 to 100 percent. */
    opacity: number;
    /** Does a short message at the top of the screen say so? */
    isTextOn: boolean;
    sound: SoundKey;
    /** Seconds between the sound's repeats while the glow is on; 0 plays it once, as the glow starts. */
    repeat: number;
}

/** The kinds a spell can be added as by the player: every kind but the old ranks, which are found for every spell. */
export type CueKind = "buff" | "weapon" | "seal" | "tracking" | "reagent" | "cooldown" | "proc";

/** A spell the player added by its ID. */
export interface CustomCue {
    id: number;
    kind: CueKind;
}

/** The parts of a look the player changed; the rest is inherited. */
export type StyleOverride = Partial<Style>;

export interface AddonSettings {
    isMuted: boolean;
    hideResting: boolean;
    /** How the glows move: around the button, breathing, or still (fading in and out as they come and go). */
    glowStyle: GlowStyle;
    /** How the glows of the round buttons of Forever's gamepad bars move: breathing, or still. */
    roundGlowStyle: GlowStyle;
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
    /** Also out of combat (by default only in combat). */
    showCooldownsOutOfCombat: boolean;
    /** As a fight starts, every ready cooldown glows too (a reminder to use it), for the same time. */
    showCooldownsAtFightStart: boolean;
    /** How long a cooldown glows in a fight once it is back, in seconds; 0 = until it is pressed. */
    cooldownGlowSeconds: number;
    /** A group buff's reagent runs low with this many or fewer in the bags. */
    reagentLow: number;
    /** Spells the game says are usable now (Overpower, Revenge, Execute...). */
    showProcs: boolean;
    /** A paladin in a fight with no seal up. */
    showSeals: boolean;
    /** A miner or a herbalist with no tracking on. */
    showTracking: boolean;
    /** The player's changes to the look of each kind of reminder (the default look of its spells). */
    styles: { [key in ColorKey]?: StyleOverride };
    /** The player's changes to the look of one spell in one kind, by the kind and the spell's name ("rank:Smite"). */
    spellStyles: { [kindAndName: string]: StyleOverride | undefined };
    /** The player's fix of the ID of a cooldown or proc of the lists (by the list's ID): the ID the client knows it by. */
    idOverrides: { [listId: string]: number | undefined };
    /** Cooldowns and procs the player added by their ID. */
    customCues: CustomCue[];
    /** The action bars (1 to 8) whose buttons are faded until they glow; only set where the player switched one on. */
    barFaded: { [bar: string]: boolean | undefined };
    /** How visible the buttons of a faded bar are while they do not glow, in percent. */
    fadedOpacity: number;
    /** The spell IDs in the spell and item tooltips, to add a spell by its ID in the table. */
    showTooltipIds: boolean;
    /** The action bars (1 to 8) whose buttons do not glow; only set where the player switched one off. */
    barOff: { [bar: string]: boolean | undefined };
    /** Per-spell switches of the cooldown and proc glows (by spell ID); only set where the player switched one off. */
    glowOn: { [spellId: string]: boolean | undefined };
    /** The buff of a group (one aura, one armor) the player cast last, by the group's first spell ID: the one that glows. */
    lastBuffs: { [group: string]: number | undefined };
    /** The spells whose old rank is not reminded of, by name; only set where the player switched one off. */
    rankOff: { [spellName: string]: boolean | undefined };
    /** Per-reagent switches (by item ID); only set where the player switched one off. */
    reagentOn: { [itemId: string]: boolean | undefined };
    /** Per-buff switches; only set where the player changed the default. */
    buffOn: { [buffKey: string]: boolean | undefined };
    /** Weapon buff picks (WeaponBuff.key); undefined = automatic. */
    weaponBuff?: string;
    weaponBuffOff?: string;
}
