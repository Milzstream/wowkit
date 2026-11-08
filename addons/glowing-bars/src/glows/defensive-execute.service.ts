// Execute in Defensive Stance. The game calls it unusable there, whatever the target's health, and hides that health from
// addons, so nothing can tell when it could be used after a change of stance. The game can still do it itself: the glow is
// lit on the button all the while, and its opacity comes from the target's hidden health through a curve (see
// ValueCurvesService), so it shows only on a low target. The addon never learns whether it shows: no sound, no message and
// no glow time can follow it. The table fades those on this row.
import { Interval } from "@wowkit/core";
import type {
    ActionBarsService,
    ButtonGlow,
    GlowAnimation,
    GlowService,
    PlayerService,
    SpellsService,
    ValueCurvesService,
} from "@wowkit/wow";
import { Warrior } from "@wowkit/wow-data";
import type { IdleService } from "../character/idle.service";
import type { AddonSettingsService } from "../settings/settings.interface";
import type { StyleService } from "../settings/style.service";
import { createWhenState, readWhenState } from "../tick/when-state";

/** The row of this glow in the table: no spell has this ID, so its look and its switch are its own. */
export const DEFENSIVE_EXECUTE_ROW = -Warrior.Execute;

/** The curve ends here: its short ramp is over at 20%, where Execute can be used. */
const CURVE_END_PERCENT = 22;

export class DefensiveExecuteService {
    private glow: ButtonGlow | undefined;
    private glowAnimation: GlowAnimation | undefined;
    private readonly whenState = createWhenState();
    /** The one spell of the glow: the same list at every look. */
    private readonly spellIds: number[] = [];

    constructor(
        private readonly player: PlayerService,
        private readonly spells: SpellsService,
        private readonly actionBars: ActionBarsService,
        private readonly glows: GlowService,
        private readonly curves: ValueCurvesService,
        private readonly styles: StyleService,
        private readonly settings: AddonSettingsService,
        private readonly idle: IdleService,
    ) {}

    /** The opacity is only true for a moment: it is asked of the game again and again. */
    @Interval(500)
    updateGlow(): void {
        const spellId = this.findExecute();
        const style = this.styles.getStyle("proc", DEFENSIVE_EXECUTE_ROW);
        const alpha =
            spellId !== undefined && readWhenState(this.player, this.whenState)[style.when]
                ? this.curves.getHealthAlpha("target", CURVE_END_PERCENT, "below", style.glowPercent / 100)
                : undefined;
        if (spellId === undefined || alpha === undefined) {
            this.glow?.clear();
            return;
        }
        const glow = this.takeGlow(style.animation);
        this.spellIds[0] = spellId;
        glow.show(this.spellIds, style.color);
        glow.setAlpha(alpha);
    }

    /** The Execute to light: learned, on a bar and switched on, in Defensive Stance with a living enemy targeted. */
    private findExecute(): number | undefined {
        if (this.player.getClassToken() !== "WARRIOR" || !this.player.hasEnemyTarget()) return undefined;
        if (!this.settings.get("isProcEnabled") || this.settings.get("isDisabled") || this.idle.shouldStayIdle(false)) return undefined;
        if (this.settings.get("enabledSpells")[string.format("%d", DEFENSIVE_EXECUTE_ROW)] === false) return undefined;
        const spellId = this.spells.resolve(Warrior.Execute);
        if (spellId === undefined || !this.actionBars.isOnBars(spellId)) return undefined;
        return this.isInDefensiveStance() ? spellId : undefined;
    }

    private isInDefensiveStance(): boolean {
        return this.player.listShapeshiftForms().some((form) => form.isActive === true && form.spellId === Warrior.DefensiveStance);
    }

    /** The glow of this animation: one made for another goes out. */
    private takeGlow(animation: GlowAnimation): ButtonGlow {
        if (this.glow !== undefined && this.glowAnimation === animation) return this.glow;
        this.glow?.clear();
        this.glow = this.glows.createButtonGlow(`defensiveExecute:${animation}`, animation, (button) => this.isBarShown(button));
        this.glowAnimation = animation;
        return this.glow;
    }

    private isBarShown(button: ActionButton): boolean {
        const bar = this.actionBars.getBarNumber(button);
        return bar === undefined || this.settings.get("barsThatGlow")[string.format("%d", bar)] !== false;
    }
}
