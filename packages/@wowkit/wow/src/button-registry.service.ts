// The buttons other addons registered (a UI addon with bars of its own, through an addon's API): action buttons, with the
// bar each counts as, and stance buttons, with the stance each stands for. The bars are mapped with them
// (ActionBarsService), and the faded bars fade them (BarFadeService). A button may say its shape, and its glow takes it
// (GlowService).

/** The shape of a button, named as the gamepad bars of Forever name theirs (their `activeButtonShape`). */
export type ButtonShape = "Circle" | "Square";

export class ButtonRegistryService {
    /** The action buttons, with the bar each counts as: 1 to 8, or 0 for none. */
    private readonly bars = new LuaMap<ActionButton, number>();
    /** The stance buttons, with the stance each stands for. */
    private readonly stances = new LuaMap<ActionButton, number>();
    /** The shape each button said it has, when it said one. */
    private readonly shapes = new LuaMap<ActionButton, ButtonShape>();

    /**
     * An action button, counting as the bar `bar` (1 to 8), or as no bar, and of the shape `shape` when it says one. It
     * keeps its action slot where Blizzard's do.
     */
    registerButton(button: ActionButton, bar: number | undefined, shape?: ButtonShape): void {
        this.bars.set(button, bar ?? 0);
        this.setShape(button, shape);
    }

    /** A stance button, standing for the stance `stance` (1 the first form, a paladin's first aura), of the shape `shape`. */
    registerStanceButton(button: ActionButton, stance: number, shape?: ButtonShape): void {
        this.stances.set(button, stance);
        this.setShape(button, shape);
    }

    /** The shape a registered button said it has; undefined when it said none, or was not registered. */
    findShape(button: ActionButton): ButtonShape | undefined {
        return this.shapes.get(button);
    }

    private setShape(button: ActionButton, shape: ButtonShape | undefined): void {
        if (shape !== undefined) this.shapes.set(button, shape);
        else this.shapes.delete(button);
    }

    /** Was the button registered (as an action button or a stance button)? */
    isRegistered(button: ActionButton): boolean {
        return this.bars.has(button) || this.stances.has(button);
    }

    /** The bar a registered button counts as; undefined for a button of no bar, and for a stance button. */
    findBar(button: ActionButton): number | undefined {
        const bar = this.bars.get(button);
        return bar !== undefined && bar > 0 ? bar : undefined;
    }

    /** The action buttons: every one, or those that count as the bar `bar`. */
    listActionButtons(bar?: number): ActionButton[] {
        const buttons: ActionButton[] = [];
        for (const [button, buttonBar] of this.bars) if (bar === undefined || buttonBar === bar) buttons.push(button);
        return buttons;
    }

    /** The stance buttons, with the stance each stands for. */
    listStanceButtons(): [button: ActionButton, stance: number][] {
        const buttons: [ActionButton, number][] = [];
        for (const [button, stance] of this.stances) buttons.push([button, stance]);
        return buttons;
    }

    /** How many buttons were registered, stance buttons too. */
    countButtons(): number {
        return this.listActionButtons().length + this.listStanceButtons().length;
    }
}
