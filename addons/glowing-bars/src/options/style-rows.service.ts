// The rows of the table of looks: the kinds of reminder (their default look), and the spells of the player's class that
// can have a look of their own: the buffs, the weapon buffs, the seals, the gathering trackings, the cooldowns, the procs, the group buffs with a reagent, and
// every spell of the book that has ranks. Plain lists; the window draws them.
import type { PlayerService, SpellsService } from "@wowkit/wow";
import type { CustomCuesService } from "../glows/custom-cues.service";
import type { GlowCuesService } from "../glows/glow-cues.service";
import type { AddonLocale } from "../locale/locale.interface";
import type { TextKey } from "../locale/texts.constants";
import type { ReagentsService } from "../reagents/reagents.service";
import type { ClassBuffsService } from "../reminders/class-buffs.service";
import type { FedBuffsService } from "../reminders/fed-buffs.service";
import type { SealReminderService } from "../reminders/seal-reminder.service";
import type { TrackingReminderService } from "../reminders/tracking-reminder.service";
import type { WeaponChoiceService } from "../reminders/weapon/weapon-choice.service";
import { CUE_KINDS, KIND_ORDER } from "../settings/settings.constants";
import type { ColorKey } from "../settings/settings.interface";
import type { StyleService } from "../settings/style.service";

/** One row of the table: a kind (no spell), or a spell of a kind. */
export interface StyleRow {
    kind: ColorKey;
    spellId: number | undefined;
    label: string;
    /** The spell's icon; none for a kind. */
    iconId: number | undefined;
    /** For a cooldown or proc of the lists: its ID there (the player may give it another). */
    listId?: number;
    /** A spell the player added. */
    isCustom?: boolean;
}

/** The words that name each kind of reminder. */
export const KIND_TEXTS: { [kind in ColorKey]: TextKey } = {
    buff: "KIND_BUFF",
    weapon: "KIND_WEAPON",
    seal: "KIND_SEAL",
    tracking: "KIND_TRACKING",
    cooldown: "KIND_COOLDOWN",
    proc: "KIND_PROC",
    rank: "KIND_RANK",
    reagent: "KIND_REAGENT",
};

export class StyleRowsService {
    constructor(
        private readonly player: PlayerService,
        private readonly spells: SpellsService,
        private readonly classBuffs: ClassBuffsService,
        private readonly weaponChoice: WeaponChoiceService,
        private readonly reagents: ReagentsService,
        private readonly locale: AddonLocale,
        private readonly styles: StyleService,
        private readonly glowCues: GlowCuesService,
        private readonly customCues: CustomCuesService,
        private readonly sealReminder: SealReminderService,
        private readonly trackingReminder: TrackingReminderService,
        private readonly fedBuffs: FedBuffsService,
    ) {}

    /** The default look of each kind of reminder this character has spells of (a warrior has no weapon buff to remind of). */
    listKindRows(spellRows: StyleRow[]): StyleRow[] {
        return KIND_ORDER.filter((kind) => spellRows.some((row) => row.kind === kind)).map((kind) => ({
            kind,
            spellId: undefined,
            label: this.locale.getText(KIND_TEXTS[kind]),
            iconId: undefined,
        }));
    }

    /** How a row shows a spell. A food or drink the player added goes by its item: the spell's name is the same for all of them. */
    private readLook(spellId: number, name: string, isCustom: boolean): { key: string; label: string; iconId: number | undefined } {
        const item = isCustom ? this.fedBuffs.findItemLook(spellId) : undefined;
        return {
            key: item?.name ?? name,
            label: item?.name ?? this.spells.getSpellLabel(spellId) ?? name,
            iconId: item?.iconId ?? this.spells.getSpellInfo(spellId)?.iconID,
        };
    }

    /** The spells of the class that can have a look of their own, by kind, then by name. A spell is listed once. */
    listSpellRows(): StyleRow[] {
        const rows: StyleRow[] = [];
        const keys = new LuaSet<string>();
        /** A spell is listed once, unless `suffix` tells two rows of one name apart (the ranks of a group buff with their reagents). */
        const add = (kind: ColorKey, spellId: number | undefined, extra: Partial<StyleRow> = {}, suffix?: string) => {
            if (spellId === undefined) return;
            const name = this.styles.getSpellKey(spellId);
            const look = this.readLook(spellId, name, extra.isCustom === true);
            // A spell the player added has a row of its own even when a list has it as another kind: it glows on its own too
            const key = extra.isCustom === true ? `${kind}:${look.key}` : suffix !== undefined ? `${name}|${suffix}` : name;
            if (keys.has(key)) return;
            keys.add(key);
            rows.push({
                kind,
                spellId,
                label: suffix !== undefined ? `${look.label} (${suffix})` : look.label,
                iconId: look.iconId,
                ...extra,
            });
        };
        const addListed = (kind: ColorKey, listId: number | undefined, suffix?: string) => {
            if (listId !== undefined) add(kind, this.customCues.getEffectiveId(listId), { listId }, suffix);
        };
        for (const classBuff of this.classBuffs.getClassBuffs()) addListed("buff", classBuff.id);
        for (const entry of this.weaponChoice.getWeaponChoices()) addListed("weapon", entry.id);
        for (const id of this.sealReminder.listSeals()) addListed("seal", id);
        for (const id of this.trackingReminder.listTrackings()) addListed("tracking", id);
        for (const kind of ["cooldown", "proc"] as const) {
            for (const id of this.glowCues.listBuiltInIds(kind)) addListed(kind, id);
        }
        for (const kind of CUE_KINDS) for (const id of this.customCues.listCustom(kind)) add(kind, id, { isCustom: true });
        // A group buff whose ranks take different reagents (Holy Candle, Sacred Candle) has a row for each reagent
        for (const reagent of this.reagents.getReagentsOfClass(this.player.getClassToken())) {
            addListed("reagent", reagent.spells[0], this.reagents.getReagentName(reagent));
        }
        // The spells that have ranks (a spell with one rank has no "Rank" in its subtext), on a bar or not. The ranks are read
        // off the bars, by the IDs there: a rank row's ID is not one to fix
        for (const id of this.spells.listSpellBookIds()) if (this.spells.getSpellRank(id) !== undefined) add("rank", id);
        rows.sort((a, b) => this.compareRows(a, b));
        return rows;
    }

    private compareRows(a: StyleRow, b: StyleRow): number {
        const byKind = KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind);
        if (byKind !== 0) return byKind;
        return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
    }
}
