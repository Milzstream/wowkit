// Keeps the map of the action bars fresh. The bars change in bursts (a form, a stance, a page, a slot), so they are
// mapped again once the changes settle.
import { Interval, OnEvent, OnGameEvent, type OnFirstLogin } from "@wowkit/core";
import type { ActionBarsService } from "./action-bars.service";
import { listAddonButtonNames } from "./bar-names";
import { isGamepadBarShown } from "./gamepad-buttons";
import type { ButtonRegistryService } from "./button-registry.service";
import type { ClockService } from "./clock.service";
import { attempt } from "./utils/protected-call.utils";

/** The bars are mapped again this long after the last change (changes come in bursts). */
const BAR_SETTLE = 0.5;
/**
 * How often the buttons of the bar addons are counted: they make buttons with no bar event (EllesmereUI after the login,
 * past the first map of the bars, a bar switched on in its options, and the buttons an addon registers), so a new count
 * maps the bars again.
 */
const BUTTON_COUNT_INTERVAL_MS = 2000;

export class BarRefreshService implements OnFirstLogin {
    private generation = 0;
    /** How many buttons of the bar addons there were when last counted. */
    private addonButtonCount = 0;
    private readonly addonButtonNames = listAddonButtonNames();

    constructor(
        private readonly actionBars: ActionBarsService,
        private readonly clock: ClockService,
        private readonly registry: ButtonRegistryService,
    ) {}

    /** The buttons of the bar addons as the first map of the bars finds them. */
    onFirstLogin(): void {
        this.addonButtonCount = this.countAddonButtons();
    }

    /** New buttons of a bar addon: map the bars again. No button can be made in a fight, so none is looked for then. */
    @Interval(BUTTON_COUNT_INTERVAL_MS)
    checkForNewButtons(): void {
        if (attempt(InCombatLockdown) === true) return;
        const count = this.countAddonButtons();
        if (count === this.addonButtonCount) return;
        this.addonButtonCount = count;
        this.actionBars.mapBars(true);
    }

    /** The bars changed: map them again once they settle. */
    @OnGameEvent("SPELL_PUSHED_TO_ACTIONBAR", "ACTIONBAR_SLOT_CHANGED", "ACTIONBAR_PAGE_CHANGED")
    scheduleBarRemap(): void {
        this.actionBars.noteBarsChanged();
        this.generation += 1;
        const generation = this.generation;
        this.clock.runAfter(BAR_SETTLE, () => {
            if (generation !== this.generation) return;
            this.actionBars.mapBars(true);
        });
    }

    /** New spells may sit on the bars at a new rank. */
    @OnEvent("spells.refreshed")
    scheduleRemapAfterSpellRefresh(): void {
        this.scheduleBarRemap();
    }

    private countAddonButtons(): number {
        const globals = _G as unknown as { [name: string]: unknown };
        let count = 0;
        for (const name of this.addonButtonNames) if (globals[name] !== undefined) count++;
        // The gamepad bars coming or going (gamepad mode switched) count as a change too: their buttons are mapped only while shown
        return count + this.registry.countButtons() + (isGamepadBarShown() ? 1 : 0);
    }
}
