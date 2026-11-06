// The parts every window of the addon shares: the dark brown frame with the bronze border of the classic dialogs, Escape
// closing it, and the scroll bar tinted to match.
import { BORDER_COLOR } from "./style-table.constants";

/** A solid dark brown window named `name`, with the bronze border of the classic dialogs where the client has the art for it. */
export function createFrameWithBorder(name: string): Frame {
    const [didSucceed, created] = pcall(() => CreateFrame("Frame", name, UIParent, "BackdropTemplate"));
    const frame = didSucceed ? (created as Frame) : CreateFrame("Frame", name, UIParent);
    // The background is a texture of our own: a backdrop file the client lacks would leave the window see-through
    const background = frame.CreateTexture(undefined, "BACKGROUND");
    background.SetPoint("TOPLEFT", frame, "TOPLEFT", 6, -6);
    background.SetPoint("BOTTOMRIGHT", frame, "BOTTOMRIGHT", -6, 6);
    background.SetColorTexture(0.1, 0.07, 0.04, 1);
    if (didSucceed) {
        const backdrop = created as Frame & BackdropFrame;
        backdrop.SetBackdrop({
            edgeFile: "Interface\\DialogFrame\\UI-DialogBox-Border",
            edgeSize: 32,
            insets: { left: 11, right: 12, top: 12, bottom: 11 },
        });
        // The border art is silver; tinted, it is the bronze of Forever's own windows
        backdrop.SetBackdropBorderColor(BORDER_COLOR[0], BORDER_COLOR[1], BORDER_COLOR[2]);
    }
    return frame;
}

/**
 * Escape closes the window: it takes the key itself while it is open, and lets every other key on to the game. Not
 * through the game's list of windows Escape closes (UISpecialFrames): its own Escape handling reads that list, and a
 * name an addon put there taints it, so the game then blocks what it does next (ClearTarget, the game menu...). In
 * combat the game does not let the keys' passing on change: there every key goes on, and the close button closes.
 */
export function connectEscape(window: Frame): void {
    if (InCombatLockdown()) return;
    window.EnableKeyboard(true);
    window.SetPropagateKeyboardInput(true);
    window.SetScript("OnKeyDown", (_frame, key) => {
        if (InCombatLockdown()) return;
        const isEscape = key === "ESCAPE";
        window.SetPropagateKeyboardInput(!isEscape);
        if (isEscape) window.Hide();
    });
}

/** The scroll bar of the template is silver art too: tinted like the border. A client without it keeps it silver. */
export function applyScrollBarTint(scroll: ScrollFrame): void {
    const bar = (scroll as unknown as { ScrollBar?: Frame }).ScrollBar;
    if (bar !== undefined) pcall(() => applyTextureTint(bar, 0));
}

/** Every texture of the frame and of its children (the arrow buttons, the thumb), two levels down. */
function applyTextureTint(frame: Frame, depth: number): void {
    for (const region of [...frame.GetRegions()]) {
        if (region.GetObjectType() === "Texture") region.SetVertexColor(BORDER_COLOR[0], BORDER_COLOR[1], BORDER_COLOR[2]);
    }
    if (depth < 2) for (const child of [...frame.GetChildren()]) applyTextureTint(child, depth + 1);
}
