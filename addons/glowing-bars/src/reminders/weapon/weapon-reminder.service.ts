// Whether the weapon buff needs a reminder. The client's weapon enchant reads lag behind casts and
// are sometimes missing, so the answer comes from three small parts: the reading
// (weapon-reading.service.ts), the timeline the reminder remembers (weapon-memory.service.ts) and
// what to do with a reading (weapon-reactions.ts).

import { MAIN_HAND_SLOT, OFF_HAND_SLOT, type ClockService, type WeaponEnchantsService } from "@wowkit/wow";
import type { WeaponCheck } from "../reminders.interface";
import type { WeaponChoiceService } from "./weapon-choice.service";
import type { WeaponMemoryService, Hand } from "./weapon-memory.service";
import { isAboutToExpire, MISSING_CONFIRM, reactToReading } from "./weapon-reactions";
import type { WeaponReadingService } from "./weapon-reading.service";

export class WeaponReminderService {
    /** The last check asked for the weapon buff. */
    private wasNeededLast = false;

    constructor(
        private readonly clock: ClockService,
        private readonly enchants: WeaponEnchantsService,
        private readonly choice: WeaponChoiceService,
        private readonly memory: WeaponMemoryService,
        private readonly reading: WeaponReadingService,
    ) {}

    /**
     * The player cast a spell: if it put on a weapon buff, its grace time starts. In combat the
     * client may hide both the spell ID and its name; a cast like that, while the weapon buff is
     * wanted, is assumed to be the weapon buff. A cast we can identify as another spell (the
     * shield) is not: it must not hide the weapon glow.
     */
    noteCast(spellId: number | undefined, castName: string | undefined): void {
        const isIdentified = spellId !== undefined || castName !== undefined;
        const entry =
            this.choice.findWeaponBuffForCast(spellId, castName) ??
            (!isIdentified && this.wasNeededLast ? this.choice.findSelectedWeaponBuff()?.entry : undefined);
        if (!entry) return;
        this.memory.rememberApply(entry, this.clock.getCurrentTime());
        this.enchants.clearWeaponTooltipCache();
        // With one weapon to coat the cast is for the main hand; a rogue's hand is told by the enchant it then shows
        if (!this.choice.isCoatingBothWeapons()) this.choice.noteWeaponBuffPut(entry, false);
    }

    noteEnchantChanged(): void {
        this.choice.noteWeaponEnchant(this.enchants.getWeaponEnchant(false).enchantId, false);
        if (this.choice.isCoatingBothWeapons()) this.choice.noteWeaponEnchant(this.enchants.getWeaponEnchant(true).enchantId, true);
        const pick = this.choice.findSelectedWeaponBuff();
        if (!pick) return;
        const now = this.clock.getCurrentTime();
        if (this.wasNeededLast) return this.memory.rememberApply(pick.entry, now);
        if (this.memory.isChangeOurOwn(now)) return;
        this.memory.expectDrop();
    }

    /** A different weapon was equipped: what we remembered is about the old one. */
    clearMemory(): void {
        this.memory.forgetAll();
    }

    /** The weapon buff to remind about, if the class has one learned. */
    check(): WeaponCheck | undefined {
        if (this.choice.isCoatingBothWeapons()) return this.checkBothHands();
        const pick = this.choice.findSelectedWeaponBuff();
        if (!pick) {
            this.wasNeededLast = false;
            return undefined;
        }
        const reading = this.reading.readWeaponBuff(pick.entry);
        const { remain, isNeeded } = reactToReading(this.memory, pick.entry, reading, this.clock.getCurrentTime());
        this.wasNeededLast = isNeeded;
        return { spellId: pick.spellId, remain, isNeeded, handSlot: MAIN_HAND_SLOT };
    }

    /** One hand of a two-weapon class: its spell when it needs a reminder. */
    private checkHand(isOffhand: boolean, now: number): { spellId: number; remain: number } | undefined {
        const hand: Hand = isOffhand ? "off" : "main";
        const pick = this.choice.findSelectedWeaponBuff(isOffhand);
        if (!pick) {
            this.memory.stopHandMissing(hand);
            return undefined;
        }
        const { state, remain } = this.reading.readHandOrAura(pick.entry, isOffhand);
        if (state === "up" || state === "unknown") {
            // Unknown: the client did not answer; stay quiet rather than nag
            this.memory.stopHandMissing(hand);
            return state === "up" && isAboutToExpire(remain) ? { spellId: pick.spellId, remain } : undefined;
        }
        // Missing or another poison: wait out the cast, and believe a reading that holds
        const missingSeconds = this.memory.noteHandMissing(hand, now);
        if (this.memory.isInGrace(now) || missingSeconds < MISSING_CONFIRM) return undefined;
        return { spellId: pick.spellId, remain: 0 };
    }

    /** Two coated weapons (rogue): each hand on its own; the first one that needs a poison wins. */
    private checkBothHands(): WeaponCheck {
        const now = this.clock.getCurrentTime();
        const main = this.checkHand(false, now);
        const due = main ?? this.checkHand(true, now);
        this.wasNeededLast = due !== undefined;
        if (due)
            return {
                spellId: due.spellId,
                remain: due.remain,
                isNeeded: true,
                handSlot: main !== undefined ? MAIN_HAND_SLOT : OFF_HAND_SLOT,
            };
        return { spellId: this.choice.findSelectedWeaponBuff(false)?.spellId, remain: 0, isNeeded: false };
    }
}
