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
    findSpells: (this: void, reminders: Reminders) => number[];
}

const TYPES: GlowType[] = [
    { category: "missingBuff", isOnSetting: "isMissingBuffEnabled", findSpells: (reminders) => reminders.buffsToCast },
    {
        category: "weaponBuff",
        isOnSetting: "isWeaponBuffEnabled",
        findSpells: (reminders) => [
            ...(reminders.weaponSpell !== undefined ? [reminders.weaponSpell] : []),
            ...reminders.addedWeaponSpells,
        ],
    },
    { category: "missingSeal", isOnSetting: "isMissingSealEnabled", findSpells: (reminders) => reminders.seals },
    { category: "missingTracking", isOnSetting: "isMissingTrackingEnabled", findSpells: (reminders) => reminders.trackings },
    { category: "readyCooldown", isOnSetting: "isReadyCooldownEnabled", findSpells: (reminders) => reminders.readyCooldowns },
    { category: "proc", isOnSetting: "isProcEnabled", findSpells: (reminders) => reminders.procs },
    { category: "oldRank", isOnSetting: "isOldRankEnabled", findSpells: (reminders) => reminders.outdatedRanks.map((rank) => rank.id) },
    { category: "lowReagent", isOnSetting: "isLowReagentEnabled", findSpells: (reminders) => reminders.reagentSpells },
    { category: "lowStock", isOnSetting: "isLowStockEnabled", findSpells: (reminders) => reminders.lowStock.map((stock) => stock.key) },
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
    /** When the sound of each glowing spell last played ("buff:21562"), for the ones that repeat. */
    private soundPlayedAt = new LuaMap<string, number>();
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
        this.playSoundsForNewReminders(reminders);
        this.notices.showNoticeIfNew(reminders);
        this.updateGlows(reminders);
        this.applyBarFades();
    }

    /** The faded bars: their buttons faded while they do not glow (every tick: the glows come and go). */
    private applyBarFades(): void {
        const opacityByBar = new LuaMap<number, number>();
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
        const playedAt = new LuaMap<string, number>();
        const sounds: SoundKey[] = [];
        TYPES.forEach((reminderType, index) => {
            const spells = reminderType.findSpells(reminders);
            for (const id of spells) {
                const key = `${reminderType.category}:${id}`;
                const style = this.styles.getStyle(reminderType.category, id);
                const lastAt = this.soundPlayedAt.get(key);
                const isNew = !this.previous[index]!.includes(id) || lastAt === undefined || this.isStartingOver(style, hasArrivedInTown);
                const isDue = !isNew && style.repeat > 0 && now - lastAt! >= style.repeat;
                playedAt.set(key, isNew || isDue ? now : lastAt!);
                if (this.isHeardHere(style, reminders) && (isNew || isDue) && !sounds.includes(style.sound)) sounds.push(style.sound);
            }
            this.previous[index] = spells;
        });
        // A spell that stopped glowing is forgotten: when it glows again, its sound is new
        this.soundPlayedAt = playedAt;
        for (const sound of sounds) this.messages.playAlertSound(sound);
    }

    /** Arriving in a town, an Alert in town starts over. */
    private isStartingOver(style: Style, hasArrivedInTown: boolean): boolean {
        return hasArrivedInTown && style.when === "townAlert";
    }

    /** May its sound play here? An Alert in town keeps it to a town, the way it does its message. */
    private isHeardHere(style: Style, reminders: Reminders): boolean {
        return style.when !== "townAlert" || reminders.isInTown === true;
    }

    private updateGlows(reminders: Reminders): void {
        const groups = this.listGroups(reminders);
        this.groupSpells = new LuaMap<string, number[]>();
        for (const group of groups) this.groupSpells.set(group.key, group.spells);
        const weaponSpells = reminders.weaponSpell !== undefined ? [reminders.weaponSpell] : [];
        this.usedUpShown = [...weaponSpells, ...reminders.addedWeaponSpells, ...reminders.lowStock.map((stock) => stock.key)];
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
    private listGroups(reminders: Reminders): GlowGroup[] {
        const groups: GlowGroup[] = [];
        for (const reminderType of TYPES) {
            for (const id of reminderType.findSpells(reminders)) {
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
