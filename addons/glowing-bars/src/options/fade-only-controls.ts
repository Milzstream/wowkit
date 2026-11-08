// The controls a row of the table cannot use (a glow only the game itself can light has no sound, message or glow time):
// faded and off, with a tooltip that says why. The rows are reused: on any other row they work and have no tooltip.

const FADED_ALPHA = 0.4;

export function setFadeOnly(controls: Button[], isFadeOnly: boolean, tip: string): void {
    for (const control of controls) {
        control.SetEnabled(!isFadeOnly);
        control.SetAlpha(isFadeOnly ? FADED_ALPHA : 1);
        // A switched-off control feels the mouse only if it is told to
        control.SetMotionScriptsWhileDisabled(isFadeOnly);
        control.SetScript("OnEnter", isFadeOnly ? () => showTip(control, tip) : undefined);
        control.SetScript("OnLeave", isFadeOnly ? () => GameTooltip.Hide() : undefined);
    }
}

function showTip(control: Button, tip: string): void {
    GameTooltip.SetOwner(control, "ANCHOR_RIGHT");
    GameTooltip.SetText(tip, 1, 1, 1, 1, true);
    GameTooltip.Show();
}
