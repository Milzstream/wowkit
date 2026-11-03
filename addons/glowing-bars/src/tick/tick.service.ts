// One tick: look at the game, then show what is due. Runs every 0.2 seconds, and sooner when
// something happens (RefreshService asks for it). Between the two, each reminder found shows only when its look says it
// may (the When column of the table): always, in combat, out of combat, with a living enemy targeted, or (the low
// reagents) in a town or an inn. What is due is the finders' to say; when it shows is the player's, for each kind and spell.
import { Interval, type OnFirstLogin, type OnLogout, type OnReady } from "@wowkit/core";
import type { PlayerService } from "@wowkit/wow";
import type { ColorKey, When } from "../settings/settings.interface";
import type { StyleService } from "../settings/style.service";
import type { FindRemindersService } from "./find-reminders.service";
import type { ShowRemindersService } from "./show-reminders.service";
import type { Reminders } from "./tick.interface";

export class TickService implements OnFirstLogin, OnLogout, OnReady {
    private isRunning = false;

    constructor(
        private readonly finder: FindRemindersService,
        private readonly shower: ShowRemindersService,
        private readonly player: PlayerService,
        private readonly styles: StyleService,
    ) {}

    onFirstLogin(): void {
        this.isRunning = true;
    }

    onLogout(): void {
        this.isRunning = false;
    }

    onReady(): void {
        this.tick();
    }

    /** Looks at the game and shows what is due, when its look says it may. Does nothing before the first login. */
    @Interval(200)
    tick(): void {
        if (!this.isRunning) return;
        this.shower.showReminders(this.filterByWhen(this.finder.findReminders()));
    }

    /** The reminders that may show now; the others are left out, glow, message and sound alike. */
    private filterByWhen(reminders: Reminders): Reminders {
        const isInCombat = this.player.isInCombat();
        const now: { [when in When]: boolean } = {
            always: true,
            combat: isInCombat,
            noCombat: !isInCombat,
            target: this.player.hasEnemyTarget(),
            town: this.player.isResting(),
            // Its glow anywhere; its message and repeat are kept for a town where they are shown
            townText: true,
        };
        const isShown = (kind: ColorKey, id: number) => now[this.styles.getStyle(kind, id).when];
        const pickShown = (kind: ColorKey, ids: number[]) => ids.filter((id) => isShown(kind, id));
        const weapon = reminders.weaponSpell;
        return {
            ...reminders,
            isInTown: this.player.isResting(),
            buffsToCast: pickShown("buff", reminders.buffsToCast),
            buffsNotOnBars: pickShown("buff", reminders.buffsNotOnBars),
            partySuggestions: reminders.partySuggestions.filter((suggestion) => isShown("buff", suggestion.spellId)),
            weaponSpell: weapon !== undefined && isShown("weapon", weapon) ? weapon : undefined,
            customWeaponSpells: pickShown("weapon", reminders.customWeaponSpells),
            seals: pickShown("seal", reminders.seals),
            trackings: pickShown("tracking", reminders.trackings),
            outdatedRanks: reminders.outdatedRanks.filter((rank) => isShown("rank", rank.id)),
            lowStock: reminders.lowStock.filter((stock) => isShown("stock", stock.key)),
            reagentSpells: pickShown("reagent", reminders.reagentSpells),
            readyCooldowns: pickShown("cooldown", reminders.readyCooldowns),
            procs: pickShown("proc", reminders.procs),
        };
    }
}
