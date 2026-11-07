// Auras and casts. No forced tick on auras: aura storms would feel like input lag; the regular
// tick reads them again.
import type { BuffStateService } from "./buff-state.service";
import { OnEvent, OnGameEvent, OnUnitEvent } from "@wowkit/core";
import type { WeaponReminderService } from "../reminders/weapon/weapon-reminder.service";
import type { RefreshService } from "../tick/refresh.service";
import { isBlockedHit, type PlayerSpellCast } from "@wowkit/wow";

export class AuraWatchService {
    constructor(
        private readonly refresh: RefreshService,
        private readonly auras: BuffStateService,
        private readonly weaponReminder: WeaponReminderService,
    ) {}

    /** The player blocked, fully or partly: Shield Block may have used its last charge. */
    @OnGameEvent("UNIT_COMBAT")
    noteCombat(unit: UnitToken, action: string, flagText: string): void {
        if (unit !== "player") return;
        if (!isBlockedHit(action, flagText)) return;
        this.auras.noteBlock();
        this.refresh.requestTick();
    }

    @OnUnitEvent("UNIT_AURA")
    wipeScan(unit: string): void {
        this.auras.wipeAuraScan(unit);
    }

    /**
     * A cast of a buff is remembered (in combat the client hides the aura), and a weapon buff cast
     * starts the grace time of the weapon reminder.
     */
    @OnEvent("player.spell-cast")
    noteCast(cast: PlayerSpellCast): void {
        this.auras.noteSelfBuff(cast.spellId);
        this.weaponReminder.noteCast(cast.spellId, cast.spellName);
        this.auras.wipeAuraScan("player");
        this.refresh.requestTick();
    }
}
