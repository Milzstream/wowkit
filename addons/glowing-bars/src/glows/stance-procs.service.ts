// Overpower and Revenge in any stance. The game calls them usable only in their own stance, and the client hides the
// combat log, so their openings are found from two other signals:
//   - Overpower: Forever gives the warrior a combo point for the seconds after the target dodged; while it is there,
//     Overpower can be used.
//   - Revenge: the game tells (UNIT_COMBAT) when the player blocks, dodges or parries; Revenge can be used for the
//     seconds after it.
// Casting the spell ends its opening (Overpower's combo point goes; Revenge is forgotten here).
import { OnEvent, OnGameEvent, type EventBus } from "@wowkit/core";
import { isReadable, type ClockService, type PlayerService, type PlayerSpellCast, type SpellsService } from "@wowkit/wow";
import { Warrior } from "@wowkit/wow-data";

declare module "@wowkit/core/event-bus" {
    interface AppEvents {
        /** An opening of Overpower or Revenge began or ended. */
        "procs.changed": [];
    }
}

/** How long Revenge can be used after a block, a dodge or a parry. */
const REVENGE_SECONDS = 5;
/** What UNIT_COMBAT says of an attack the player blocked, dodged or parried. */
const AVOIDED_ACTIONS = ["BLOCK", "DODGE", "PARRY"];

export class StanceProcsService {
    /** When the opening of Revenge ends. */
    private revengeUntil = 0;

    constructor(
        private readonly player: PlayerService,
        private readonly spells: SpellsService,
        private readonly clock: ClockService,
        private readonly bus: EventBus,
    ) {}

    /** The player blocked, dodged or parried (a partial block says so in its flag text). */
    @OnGameEvent("UNIT_COMBAT")
    noteCombat(unit: UnitToken, action: string, flagText: string): void {
        if (unit !== "player" || !this.isWarrior()) return;
        const isAvoided = (isReadable(action) && AVOIDED_ACTIONS.includes(action)) || (isReadable(flagText) && flagText === "BLOCK");
        if (!isAvoided) return;
        this.revengeUntil = this.clock.getCurrentTime() + REVENGE_SECONDS;
        this.bus.emit("procs.changed");
    }

    /** The combo point of Overpower came or went. */
    @OnGameEvent("UNIT_POWER_UPDATE")
    noteComboPoints(unit: UnitToken, powerType: string): void {
        if (unit === "player" && powerType === "COMBO_POINTS" && this.isWarrior()) this.bus.emit("procs.changed");
    }

    @OnEvent("player.spell-cast")
    noteCast(cast: PlayerSpellCast): void {
        if (cast.spellId !== undefined && this.isNamed(cast.spellId, Warrior.Revenge)) this.revengeUntil = 0;
    }

    /** Is the spell Overpower or Revenge, with its opening up, whatever the stance? */
    isOpen(spellId: number): boolean {
        if (!this.isWarrior()) return false;
        if (this.isNamed(spellId, Warrior.Overpower)) return (this.player.readComboPoints() ?? 0) > 0;
        if (this.isNamed(spellId, Warrior.Revenge)) return this.clock.getCurrentTime() < this.revengeUntil;
        return false;
    }

    /** Has the spell the name of this one (any rank)? */
    private isNamed(spellId: number, listId: number): boolean {
        const name = this.spells.getSpellLabel(spellId);
        return name !== undefined && name === this.spells.getSpellLabel(listId);
    }

    private isWarrior(): boolean {
        return this.player.getClassToken() === "WARRIOR";
    }
}
