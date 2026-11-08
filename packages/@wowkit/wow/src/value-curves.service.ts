// Glows that follow a value the client hides (health, mana). The client evaluates a curve over the hidden value and hands
// back the result as a secret: addon code may not read it, but may pass it on, to SetAlpha. A glow can so fade in as
// the health drops below a threshold without any number ever being compared by addon code.
import { attempt } from "./utils/protected-call.utils";

/** A curve result: opaque, only to be passed to a glow (ButtonGlow.setAlpha). */
export interface HiddenAlpha {
    readonly isHiddenAlpha: true;
}

/** "below": 1 under the threshold, 0 above it (a heal lights up as health drops); "above": the reverse. */
export type CurveSide = "below" | "above";

export class ValueCurvesService {
    private readonly curves = new LuaMap<string, LuaCurveObject | false>();

    /** The unit's health through the curve; undefined when the client cannot do it. */
    getHealthAlpha(unit: UnitToken, thresholdPercent: number, side: CurveSide, strength = 1): HiddenAlpha | undefined {
        const curve = this.getCurve(thresholdPercent, side, strength);
        if (curve === undefined) return undefined;
        return attempt(UnitHealthPercent, unit, true, curve) as HiddenAlpha | undefined;
    }

    /** The player's mana through the curve; undefined when the client cannot do it. */
    getManaAlpha(thresholdPercent: number, side: CurveSide): HiddenAlpha | undefined {
        const curve = this.getCurve(thresholdPercent, side);
        if (curve === undefined) return undefined;
        return attempt(UnitPowerPercent, "player", Enum.PowerType.Mana, false, curve) as HiddenAlpha | undefined;
    }

    /** A step at the threshold: `strength` on its side, 0 on the other (a short linear ramp just before it). */
    private getCurve(thresholdPercent: number, side: CurveSide, strength = 1): LuaCurveObject | undefined {
        const threshold = math.floor(thresholdPercent + 0.5);
        const key = `${side}:${threshold}:${strength}`;
        const cached = this.curves.get(key);
        if (cached !== undefined) return cached === false ? undefined : cached;
        const made = attempt(() => {
            const curve = C_CurveUtil.CreateCurve();
            curve.SetType(Enum.LuaCurveType.Linear);
            const at = math.max(0.05, math.min(1, threshold / 100));
            const [low, high] = side === "below" ? [strength, 0] : [0, strength];
            curve.AddPoint(0, low);
            curve.AddPoint(math.max(0.01, at - 0.02), low);
            curve.AddPoint(at, high);
            curve.AddPoint(1, high);
            return curve;
        });
        this.curves.set(key, made ?? false);
        return made;
    }
}
