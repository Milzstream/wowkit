export type SoundKey =
    "none" | "raidwarning" | "battlegroundstart" | "readycheck" | "rolecheck" | "alarm1" | "alarm2" | "alarm3" | `custom:${string}`;

export interface SoundChoice {
    key: SoundKey;
    label: string;
    /** SOUNDKIT name, and the sound ID to fall back on. */
    kit?: string;
    id?: number;
}

/** A folder in AddOns with sound files of the player's own, named custom1, custom2... */
export interface CustomSoundFolder {
    folder: string;
    count: number;
}

/** The key of a sound file of the player's own. It holds the folder, so the sound stays when the folder leaves the list. */
function createCustomSoundKey(folder: string, soundNumber: number): SoundKey {
    return `custom:${folder}:${soundNumber}`;
}

/** The folder and the number of a sound file of the player's own; the other sounds have none. */
export function findCustomSound(value: unknown): { folder: string; soundNumber: number } | undefined {
    if (type(value) !== "string") return undefined;
    const [folder, digits] = string.match(value as string, "^custom:([^\\/:]+):(%d+)$");
    const soundNumber = tonumber(digits);
    return folder !== undefined && soundNumber !== undefined ? { folder, soundNumber } : undefined;
}

/** Is this a sound the player can have? A saved choice may be from a time the list was longer. */
export function isSoundKey(value: unknown): value is SoundKey {
    return findCustomSound(value) !== undefined || SOUNDS.some((sound) => sound.key === value);
}

/**
 * The name of a folder in the Sound list, short enough for a button: without the part it shares with the main folder
 * ("GlowingBars_My_Sounds" next to "GlowingBars_Sounds"), and with spaces.
 */
function findFolderLabel(folder: string, mainFolder: string): string {
    const [prefix] = string.match(mainFolder, "^(.-_)");
    const isPrefixed = prefix !== undefined && folder.length > prefix.length && string.sub(folder, 1, prefix.length) === prefix;
    const [label] = string.gsub(isPrefixed ? string.sub(folder, prefix.length + 1) : folder, "_", " ");
    return label;
}

/** The words of a sound: a file of the player's own goes by the name of its folder and its number. */
export function findSoundLabel(key: SoundKey, mainFolder: string): string {
    const custom = findCustomSound(key);
    if (custom === undefined) return SOUNDS.find((sound) => sound.key === key)?.label ?? "";
    return string.format("%s %d", findFolderLabel(custom.folder, mainFolder), custom.soundNumber);
}

/** The sounds to pick from: the game's, then those of each folder; a folder entered twice counts once. */
export function listSoundChoices(folders: CustomSoundFolder[], mainFolder: string): SoundChoice[] {
    const choices = [...SOUNDS];
    for (const { folder, count } of folders) {
        for (let i = 1; i <= count; i++) {
            const key = createCustomSoundKey(folder, i);
            if (!choices.some((choice) => choice.key === key)) choices.push({ key, label: findSoundLabel(key, mainFolder) });
        }
    }
    return choices;
}

/** The sounds the player can pick. The first entry is "no sound". */
export const SOUNDS: SoundChoice[] = [
    { key: "none", label: "No sound" },
    { key: "raidwarning", label: "Raid warning", kit: "RAID_WARNING", id: 8959 },
    { key: "battlegroundstart", label: "Battleground start", kit: "UI_BATTLEGROUND_COUNTDOWN_FINISHED", id: 25478 },
    { key: "readycheck", label: "Ready check", kit: "READY_CHECK", id: 8960 },
    { key: "rolecheck", label: "Role check", kit: "LFG_ROLE_CHECK", id: 17317 },
    { key: "alarm1", label: "Alarm clock 1", kit: "ALARM_CLOCK_WARNING_1", id: 18871 },
    { key: "alarm2", label: "Alarm clock 2", kit: "ALARM_CLOCK_WARNING_2", id: 12867 },
    { key: "alarm3", label: "Alarm clock 3", kit: "ALARM_CLOCK_WARNING_3", id: 12889 },
];
