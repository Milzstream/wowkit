// The buff list of the player's class, the per-character switch of each buff, and which buff of a group (one paladin aura,
// one blessing, one armor) the player wants: the one cast last, else the main talent tree's, else the first.

import type { AddonSettingsService } from "../settings/settings.interface";
import type { PlayerService, SpellsService } from "@wowkit/wow";
import type { ClassBuff } from "./class-buff.interface";
import { BUFF_LISTS, TALENT_BUFFS } from "./class-buffs.constants";

export class ClassBuffsService {
    constructor(
        private readonly player: PlayerService,
        private readonly spells: SpellsService,
        private readonly settings: AddonSettingsService,
    ) {}

    /** The buffs of the player's class, in list order. */
    getClassBuffs(): ClassBuff[] {
        const token = this.player.getClassToken();
        return (token !== undefined ? BUFF_LISTS[token] : undefined) ?? [];
    }

    /**
     * How long a buff that was seen or cast counts as up while the client hides the auras: the `last`
     * of its list entry (matched by ID or name), else 30 seconds.
     */
    getBuffSeconds(spellId: number | undefined, name: string): number {
        for (const classBuff of this.getClassBuffs()) {
            if (classBuff.last !== undefined && (classBuff.id === spellId || this.spells.getSpellName(classBuff.id) === name)) {
                return classBuff.last;
            }
        }
        return 30;
    }

    isBuffEnabled(classBuff: ClassBuff): boolean {
        return this.settings.get("enabledBuffs")[classBuff.key] ?? classBuff.isOnByDefault;
    }

    /** Switches one buff on or off; the default is not stored. */
    setBuffEnabled(classBuff: ClassBuff, isOn: boolean): void {
        const enabledBuffs = { ...this.settings.get("enabledBuffs") };
        enabledBuffs[classBuff.key] = isOn === classBuff.isOnByDefault ? undefined : isOn;
        this.settings.change("enabledBuffs", enabledBuffs);
    }

    /** Of the buffs of a group that could glow: the one cast last, else the main talent tree's, else the first. */
    pickGroupBuff(members: ClassBuff[]): ClassBuff {
        const first = members[0]!;
        if (members.length === 1) return first;
        const last = this.settings.get("lastBuffs")[this.getGroupKey(first)];
        const castLast = members.find((member) => member.id === last);
        if (castLast !== undefined) return castLast;
        const tree = this.player.findMainTalentTree();
        const token = this.player.getClassToken();
        const wanted = tree !== undefined && token !== undefined ? (TALENT_BUFFS[token]?.[tree] ?? []) : [];
        for (const id of wanted) {
            const found = members.find((member) => member.id === id);
            if (found !== undefined) return found;
        }
        return first;
    }

    /** The key of a buff's group in the saved settings: the group's first spell ID. */
    getGroupKey(classBuff: ClassBuff): string {
        return string.format("%d", classBuff.categoryMembers?.[0] ?? classBuff.id);
    }
}
