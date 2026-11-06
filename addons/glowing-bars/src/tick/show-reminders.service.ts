// Stage 2 of a tick: show the reminders. A sound when something new appears (and again every few seconds, where the
// player chose so), the notice text, and
// the glows on the action buttons. It remembers what it showed last time, so only a change is
// shown again.

import type { MessagesService, SoundKey } from "@wowkit/ui";
import type { StyleService } from "../settings/style.service";
import type { AddonSettingsService, ReminderType, Style } from "../settings/settings.interface";
import {
    type ActionBarsService,
    type BarFadeService,
    type ClockService,
    type GlowService,
    type GlowAnimation,
    type ButtonGlow,
    type Rgb,
    isOutOfItem,
} from "@wowkit/wow";
import type { NoticesService } from "./notices.service";
import type { FedBuffsService } from "../reminders/fed-buffs.service";
import type { Reminders } from "./tick.interface";

/** One type of reminder: the setting that switches it on, and the spells of the reminders that make it glow. */
interface GlowType {
    category: ReminderType;
    isOnSetting:
        | "isMissingBuffEnabled"
        | "isWeaponBuffEnabled"
        | "isMissingSealEnabled"
        | "isMissingTrackingEnabled"
        | "isReadyCooldownEnabled"
        | "isProcEnabled"
        | "isOldRankEnabled"
        | "isLowReagentEnabled"
        | "isLowStockEnabled";
    /** Puts the spells of the type's reminders into `spells`, an empty list. */
    collectSpells: (this: void, reminders: Reminders, spells: number[]) => void;
}

function pushAll(spells: number[], ids: number[]): void {
    for (const id of ids) spells.push(id);
}

const TYPES: GlowType[] = [
    {
        category: "missingBuff",
        isOnSetting: "isMissingBuffEnabled",
        collectSpells: (reminders, spells) => pushAll(spells, reminders.buffsToCast),
    },
    {
        category: "weaponBuff",
        isOnSetting: "isWeaponBuffEnabled",
        collectSpells: (reminders, spells) => {
            if (reminders.weaponSpell !== undefined) spells.push(reminders.weaponSpell);
            pushAll(spells, reminders.addedWeaponSpells);
        },
    },
    {
        category: "missingSeal",
        isOnSetting: "isMissingSealEnabled",
        collectSpells: (reminders, spells) => pushAll(spells, reminders.seals),
    },
    {
        category: "missingTracking",
        isOnSetting: "isMissingTrackingEnabled",
        collectSpells: (reminders, spells) => pushAll(spells, reminders.trackings),
    },
    {
        category: "readyCooldown",
        isOnSetting: "isReadyCooldownEnabled",
        collectSpells: (reminders, spells) => pushAll(spells, reminders.readyCooldowns),
    },
    { category: "proc", isOnSetting: "isProcEnabled", collectSpells: (reminders, spells) => pushAll(spells, reminders.procs) },
    {
        category: "oldRank",
        isOnSetting: "isOldRankEnabled",
        collectSpells: (reminders, spells) => {
            for (const rank of reminders.outdatedRanks) spells.push(rank.id);
        },
    },
    {
        category: "lowReagent",
        isOnSetting: "isLowReagentEnabled",
        collectSpells: (reminders, spells) => pushAll(spells, reminders.reagentSpells),
    },
    {
        category: "lowStock",
        isOnSetting: "isLowStockEnabled",
        collectSpells: (reminders, spells) => {
            for (const stock of reminders.lowStock) spells.push(stock.key);
        },
    },
];

/** The spells that glow in one color, glow % and animation: one glow shows them. */
interface GlowGroup {
    /** The look as text: the glow of the group is kept under it. */
    key: string;
    color: Rgb;
    glowPercent: number;
    animation: GlowAnimation;
    spells: number[];
}

export class ShowRemindersService {
    /** The glows made so far, by the look they give (color, glow % and animation); one that is not needed any more is cleared, not dropped. */
    private readonly glows = new LuaMap<string, ButtonGlow>();
    /** The spells of each type in the previous tick, to tell what is new. */
    private previous: number[][] = TYPES.map(() => []);
    /** The spells of each type in this tick. */
    private current: number[][] = TYPES.map(() => []);
    /** The keys of the glowing spells seen in this tick (for the sounds). */
    private readonly soundSeen = new LuaSet<string>();
    /** The sounds to play in this tick. */
    private readonly sounds: SoundKey[] = [];
    /** The bars to fade, by number, and their opacity: kept from tick to tick. */
    private readonly opacityByBar = new LuaMap<number, number>();
    /** When the sound of each glowing spell last played ("buff:21562"), for the ones that repeat. */
    private readonly soundPlayedAt = new LuaMap<string, number>();
    /** Was the player in a town at the previous tick: arriving, an Alert in town sounds once more. */
    private wasInTown = false;
    /** The glows of the previous tick as one text; undefined makes the next tick set the glows again. */
    private shownGlowKey: string | undefined;
    /** The weapon buffs due and the low stock: their items glow also when used up, as what is to be made or bought. */
    private usedUpShown: number[] = [];
    /** The spells of each glow, by its look. */
    private groupSpells = new LuaMap<string, number[]>();

    constructor(
        private readonly glow: GlowService,
        private readonly messages: MessagesService,
        private readonly settings: AddonSettingsService,
        private readonly notices: NoticesService,
        private readonly styles: StyleService,
        private readonly actionBars: ActionBarsService,
        private readonly barFade: BarFadeService,
        private readonly clock: ClockService,
        private readonly fedBuffs: FedBuffsService,
    ) {}

    showReminders(reminders: Reminders): void {
        const isSame = this.collectSpells(reminders);
        this.playSoundsForNewReminders(reminders);
        this.notices.showNoticeIfNew(reminders);
        this.updateGlows(isSame);
        // This tick's spells are the previous ones of the next: the lists swap, none is made
        const previous = this.previous;
        this.previous = this.current;
        this.current = previous;
        this.applyBarFades();
    }

    /** The spells of each type, into this tick's lists. Are they the same as at the last tick? */
    private collectSpells(reminders: Reminders): boolean {
        let isSame = true;
        for (let index = 0; index < TYPES.length; index++) {
            const reminderType = TYPES[index]!;
            const spells = this.current[index]!;
            for (let i = spells.length; i > 0; i--) spells.pop();
            reminderType.collectSpells(reminders, spells);
            const previous = this.previous[index]!;
            if (spells.length !== previous.length) isSame = false;
            else for (let i = 0; i < spells.length && isSame; i++) if (spells[i] !== previous[i]) isSame = false;
        }
        return isSame;
    }

    /** The faded bars: their buttons faded while they do not glow (every tick: the glows come and go). */
    private applyBarFades(): void {
        const opacityByBar = this.opacityByBar;
        for (const [bar] of opacityByBar) opacityByBar.delete(bar);
        const glowPercent = this.settings.get("fadedOpacity") / 100;
        for (const [bar, isFaded] of pairs(this.settings.get("fadedBars"))) {
            const number = tonumber(bar);
            if (isFaded === true && number !== undefined) opacityByBar.set(number, glowPercent);
        }
        this.barFade.applyBarFades(opacityByBar);
    }

    /** The buttons or the spells changed under the glows: set them again on the next tick. */
    markGlowsStale(): void {
        this.shownGlowKey = undefined;
    }

    /** A setting changed: the glows go out at once and are lit again by the next tick, in the new look. */
    redrawGlowsAfterSettingChange(key: string): void {
        if (
            key !== "styles" &&
            key !== "spellStyles" &&
            key !== "barsThatGlow" &&
            key !== "idOverrides" &&
            key !== "addedSpells" &&
            key !== "roundAnimation" &&
            !TYPES.some((reminderType) => reminderType.isOnSetting === key)
        )
            return;
        for (const [, glow] of this.glows) glow.clear();
        this.markGlowsStale();
    }

    /**
     * A sound when a glow starts for a spell, in the spell's own sound; not each time another one goes out. Where the
     * player chose a repeat, it plays again every so many seconds while the glow is on.
     */
    private playSoundsForNewReminders(reminders: Reminders): void {
        const now = this.clock.getCurrentTime();
        const hasArrivedInTown = reminders.isInTown === true && !this.wasInTown;
        this.wasInTown = reminders.isInTown === true;
        const playedAt = this.soundPlayedAt;
        const seen = this.soundSeen;
        const sounds = this.sounds;
        for (const key of seen) seen.delete(key);
        for (let i = sounds.length; i > 0; i--) sounds.pop();
        for (let index = 0; index < TYPES.length; index++) this.noteSoundsOfType(index, reminders, now, hasArrivedInTown);
        // A spell that stopped glowing is forgotten: when it glows again, its sound is new
        for (const [key] of playedAt) if (!seen.has(key)) playedAt.delete(key);
        for (const sound of sounds) this.messages.playAlertSound(sound);
    }

    /** The spells of one type: when each sound last played, and the sounds due now (new glows, and repeats). */
    private noteSoundsOfType(index: number, reminders: Reminders, now: number, hasArrivedInTown: boolean): void {
        const reminderType = TYPES[index]!;
        for (const id of this.current[index]!) {
            const key = `${reminderType.category}:${id}`;
            const style = this.styles.getStyle(reminderType.category, id);
            const lastAt = this.soundPlayedAt.get(key);
            this.soundSeen.add(key);
            const isNew = !this.previous[index]!.includes(id) || lastAt === undefined || this.isStartingOver(style, hasArrivedInTown);
            const isDue = !isNew && style.repeat > 0 && now - lastAt! >= style.repeat;
            this.soundPlayedAt.set(key, isNew || isDue ? now : lastAt!);
            if (this.isHeardHere(style, reminders) && (isNew || isDue) && !this.sounds.includes(style.sound)) this.sounds.push(style.sound);
        }
    }

    /** Arriving in a town, an Alert in town starts over. */
    private isStartingOver(style: Style, hasArrivedInTown: boolean): boolean {
        return hasArrivedInTown && style.when === "townAlert";
    }

    /** May its sound play here? An Alert in town keeps it to a town, the way it does its message. */
    private isHeardHere(style: Style, reminders: Reminders): boolean {
        return style.when !== "townAlert" || reminders.isInTown === true;
    }

    private updateGlows(isSame: boolean): void {
        // No type's spells changed, and the glows shown are still right: nothing to do
        if (isSame && this.shownGlowKey !== undefined) return;
        const groups = this.listGroups();
        this.groupSpells = new LuaMap<string, number[]>();
        for (const group of groups) this.groupSpells.set(group.key, group.spells);
        // The weapon buffs due and the low stock (a copy: this tick's lists are used again)
        this.usedUpShown = [];
        TYPES.forEach((reminderType, index) => {
            if (reminderType.category === "weaponBuff" || reminderType.category === "lowStock")
                pushAll(this.usedUpShown, this.current[index]!);
        });
        const glowKey = groups.map((group) => `${group.key}=${group.spells.join(",")}`).join(";");
        if (glowKey === this.shownGlowKey) return;
        this.glow.setRoundAnimation(this.settings.get("roundAnimation"));
        // A look that no spell has now: its glow goes out
        for (const [key, glow] of this.glows) if (!groups.some((group) => group.key === key)) glow.clear();
        for (const group of groups) {
            let glow = this.glows.get(group.key);
            if (glow === undefined) {
                const key = group.key;
                glow = this.glow.createButtonGlow(key, group.animation, (button) => this.isBarShown(button, key));
                this.glows.set(group.key, glow);
            }
            glow.show(group.spells, group.color);
            glow.setAlpha(group.glowPercent / 100);
        }
        // Shown only once every glow is: after an error the next tick shows them again
        this.shownGlowKey = glowKey;
    }

    /** A button glows unless it holds an item that has run out, or its bar is switched off (a button of no numbered bar always may). */
    private isBarShown(button: ActionButton, groupKey: string): boolean {
        const isUsedUpShown = this.usedUpShown.some((id) => this.actionBars.findButtonsOf(id).includes(button));
        if (!isUsedUpShown && isOutOfItem(this.actionBars, button)) return false;
        // Foods of one name are found on each other's buttons: a button glows only in the look of its own food
        const spells = this.groupSpells.get(groupKey) ?? [];
        const isOwnUsedUp = spells.some((id) => this.usedUpShown.includes(id) && this.actionBars.findButtonsOf(id).includes(button));
        if (!isOwnUsedUp && !this.fedBuffs.isButtonWanted(button, spells)) return false;
        const bar = this.actionBars.getBarNumber(button);
        return bar === undefined || this.settings.get("barsThatGlow")[string.format("%d", bar)] !== false;
    }

    /** The spells to glow, in groups of the same look. */
    private listGroups(): GlowGroup[] {
        const groups: GlowGroup[] = [];
        for (let index = 0; index < TYPES.length; index++) {
            const reminderType = TYPES[index]!;
            for (const id of this.current[index]!) {
                const style = this.styles.getStyle(reminderType.category, id);
                const key = `${style.color.join(",")}|${style.glowPercent}|${style.animation}`;
                const group = groups.find((candidate) => candidate.key === key);
                const { color, glowPercent, animation } = style;
                if (group === undefined) groups.push({ key, color, glowPercent, animation, spells: [id] });
                else if (!group.spells.includes(id)) group.spells.push(id);
            }
        }
        return groups;
    }
}
