// The game's frames (windows, buttons, text). The addon creates them, shows and hides them and sets
// scripts on them. Only what the addon does is modelled; any other method of a frame does nothing.
import { defineValues } from "./define";

type Script = (...args: any[]) => void;

export interface FakeFrame {
    frameType: string;
    name: string | undefined;
    parent: FakeFrame | undefined;
    template: string | undefined;
    /** The action slot of an action button. */
    action: number | undefined;
    isShown: boolean;
    /** The opacity the addon set (a glow faded by a hidden value). */
    alpha: number;
    /** Drawn in full whatever its parent's opacity (SetIgnoreParentAlpha). */
    isIgnoringParentAlpha: boolean;
    text: string | undefined;
    /** The frame the addon last anchored this one to (SetPoint). */
    anchor?: FakeFrame;
    /** The width the addon set (36, the size of an action button, until it sets one). */
    width: number;
    scale: number;
    /** A check button's state. */
    isChecked: boolean;
    scripts: { [script: string]: Script | undefined };
    events: { [event: string]: true | undefined };
    fontStrings: FakeFrame[];
    // The parts of the spell-alert glow template
    ProcStartAnim?: FakeFrame;
    ProcLoop?: FakeFrame;
    ProcAltGlow?: FakeFrame;
    ProcStartFlipbook?: FakeFrame;
    ProcLoopFlipbook?: FakeFrame;
    Show(): void;
    Hide(): void;
    IsShown(): boolean;
    SetShown(isShown: boolean): void;
    SetAlpha(alpha: number): void;
    GetAlpha(): number;
    SetIgnoreParentAlpha(ignore: boolean): void;
    SetScript(script: string, handler: Script | undefined): void;
    GetName(): string | undefined;
    GetFrameLevel(): number;
    SetWidth(width: number): void;
    SetScale(scale: number): void;
    SetPoint(point: string, relativeTo?: unknown): void;
    IsVisible(): boolean;
    HookScript(script: string, handler: Script): void;
    GetEffectiveScale(): number;
    SetSize(width: number, height: number): void;
    GetWidth(): number;
    GetHeight(): number;
    RegisterEvent(event: string): boolean;
    RegisterUnitEvent(event: string): boolean;
    UnregisterEvent(event: string): void;
    UnregisterAllEvents(): void;
    SetText(text: string): void;
    GetText(): string | undefined;
    SetChecked(isChecked?: boolean): void;
    GetChecked(): boolean;
    CreateFontString(): FakeFrame;
    CreateTexture(): FakeFrame;
}

const doNothing = () => undefined;

// Any method nobody modelled (SetPoint, SetSize...) is found as a function that does nothing
const unmodelledMethods: object = {
    __index: (_table: unknown, key: unknown) =>
        type(key) === "string" && string.match(key as string, "^%u")[0] !== undefined ? doNothing : undefined,
};

/** An object that answers every method with a no-op: the game's settings categories, layouts, ... */
export function createInertObject<T>(): T {
    return setmetatable({}, unmodelledMethods) as T;
}

interface FrameInit {
    frameType: string;
    name?: string;
    parent?: FakeFrame;
    template?: string;
}

function createFakeFrame(init: FrameInit): FakeFrame {
    const frame: FakeFrame = {
        frameType: init.frameType,
        name: init.name,
        parent: init.parent,
        template: init.template,
        action: undefined,
        isShown: true,
        alpha: 1,
        isIgnoringParentAlpha: false,
        text: undefined,
        width: 36,
        scale: 1,
        isChecked: false,
        scripts: {},
        events: {},
        fontStrings: [],
        Show() {
            if (this.isShown) return;
            this.isShown = true;
            this.scripts.OnShow?.(this);
        },
        Hide() {
            if (!this.isShown) return;
            this.isShown = false;
            this.scripts.OnHide?.(this);
        },
        SetShown(isShown) {
            if (isShown) this.Show();
            else this.Hide();
        },
        SetAlpha(alpha) {
            this.alpha = alpha;
        },
        GetAlpha() {
            return this.alpha;
        },
        SetIgnoreParentAlpha(ignore) {
            this.isIgnoringParentAlpha = ignore;
        },
        IsShown() {
            return this.isShown;
        },
        SetScript(script, handler) {
            this.scripts[script] = handler;
        },
        GetName() {
            return this.name;
        },
        GetFrameLevel() {
            return 1;
        },
        SetScale(scale) {
            this.scale = scale;
        },
        SetWidth(width) {
            this.width = width;
        },
        SetPoint(_point, relativeTo) {
            if (type(relativeTo) === "table") this.anchor = relativeTo as FakeFrame;
        },
        // Shown, and every parent shown too
        IsVisible() {
            return this.isShown && (this.parent === undefined || this.parent.IsVisible());
        },
        // The handler runs after the script the frame has
        HookScript(script, handler) {
            const before = this.scripts[script];
            this.scripts[script] = (...args) => {
                before?.(...args);
                handler(...args);
            };
        },
        GetEffectiveScale() {
            return 1;
        },
        SetSize(width) {
            this.width = width;
        },
        GetWidth() {
            return this.width;
        },
        GetHeight() {
            return 36;
        },
        RegisterEvent(event) {
            this.events[event] = true;
            return true;
        },
        RegisterUnitEvent(event) {
            this.events[event] = true;
            return true;
        },
        UnregisterEvent(event) {
            this.events[event] = undefined;
        },
        UnregisterAllEvents() {
            this.events = {};
        },
        SetText(text) {
            this.text = text;
        },
        GetText() {
            return this.text;
        },
        SetChecked(isChecked) {
            this.isChecked = isChecked === true;
        },
        GetChecked() {
            return this.isChecked;
        },
        CreateFontString() {
            const fontString = createFakeFrame({ frameType: "FontString", parent: this });
            this.fontStrings.push(fontString);
            return fontString;
        },
        CreateTexture() {
            return createFakeFrame({ frameType: "Texture", parent: this });
        },
    };
    return setmetatable(frame, unmodelledMethods);
}

export interface FrameRegistry {
    all: FakeFrame[];
    create(frameType: string, name?: string, parent?: FakeFrame, template?: string): FakeFrame;
    /** Delivers a game event to every frame that registered for it. */
    fire(event: string, ...args: unknown[]): void;
}

/** The flipbooks of the fake game: while stalled (a loading screen), a playing one has not reached a picture yet. */
export const fakeFlipbooks = { isStalled: false };

/** The whole sheet of a flipbook until its animation runs, then one picture of it. */
function addFlipbookCoords(alert: FakeFrame): void {
    let isPlayed = false;
    const loop = alert.ProcLoop as FakeFrame & { Play(): void };
    const flipbook = alert.ProcLoopFlipbook as FakeFrame & { SetAtlas(): void; GetTexCoord(): LuaMultiReturn<number[]> };
    loop.Play = () => {
        isPlayed = true;
    };
    flipbook.SetAtlas = () => {
        isPlayed = false;
    };
    flipbook.GetTexCoord = () => {
        const size = isPlayed && !fakeFlipbooks.isStalled ? 0.1 : 1;
        return $multi(0, 0, 0, size, size, 0, size, size);
    };
}

export function createFrameRegistry(): FrameRegistry {
    const all: FakeFrame[] = [];
    return {
        all,
        create(frameType, name, parent, template) {
            const frame = createFakeFrame({ frameType, name, parent, template });
            if (template === "ActionButtonSpellAlertTemplate") {
                frame.ProcStartAnim = createFakeFrame({ frameType: "AnimationGroup" });
                frame.ProcLoop = createFakeFrame({ frameType: "AnimationGroup" });
                frame.ProcAltGlow = createFakeFrame({ frameType: "Texture" });
                frame.ProcStartFlipbook = createFakeFrame({ frameType: "Texture" });
                frame.ProcLoopFlipbook = createFakeFrame({ frameType: "Texture" });
                addFlipbookCoords(frame);
            }
            // Its children, as the game lists them (a frame is a child of the frame it was made in)
            (frame as FakeFrame & { GetChildren(): LuaMultiReturn<FakeFrame[]> }).GetChildren = () =>
                $multi(...all.filter((other) => other.parent === frame));
            all.push(frame);
            if (name !== undefined) defineValues({ [name]: frame });
            return frame;
        },
        fire(event, ...args) {
            for (const frame of [...all]) {
                if (frame.events[event] !== undefined) frame.scripts.OnEvent?.(frame, event, ...args);
            }
        },
    };
}
