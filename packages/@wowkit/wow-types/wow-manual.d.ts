// Hand-written declarations for what Blizzard's API documentation does not cover: string-valued
// "enums", typed script handlers, CreateFrame and FrameXML (Lua-side) globals.
// Everything in types/generated/ comes from scripts/generate-wow-types.ts; extend the API here.

/** A Lua function handed to the client (C_Timer callbacks, untyped script handlers, ...). */
type WowCallback = (this: void, ...args: any[]) => any;

type UnitToken =
    | "player"
    | "target"
    | "focus"
    | "mouseover"
    | "pet"
    | "vehicle"
    | "none"
    | `party${1 | 2 | 3 | 4}`
    | `raid${number}`
    | `boss${number}`
    | `nameplate${number}`
    | (string & {});
type MouseButton = "LeftButton" | "RightButton" | "MiddleButton" | "Button4" | "Button5" | (string & {});
type FramePoint = "TOPLEFT" | "TOP" | "TOPRIGHT" | "LEFT" | "CENTER" | "RIGHT" | "BOTTOMLEFT" | "BOTTOM" | "BOTTOMRIGHT";
type FrameStrata = "PARENT" | "BACKGROUND" | "LOW" | "MEDIUM" | "HIGH" | "DIALOG" | "FULLSCREEN" | "FULLSCREEN_DIALOG" | "TOOLTIP";
type DrawLayer = "BACKGROUND" | "BORDER" | "ARTWORK" | "OVERLAY" | "HIGHLIGHT";
type BlendMode = "DISABLE" | "BLEND" | "ALPHAKEY" | "ADD" | "MOD";
type JustifyHorizontal = "LEFT" | "CENTER" | "RIGHT";
type JustifyVertical = "TOP" | "MIDDLE" | "BOTTOM";
type Orientation = "HORIZONTAL" | "VERTICAL";

/** Plays a sound file from the Interface folder; answers whether it will play. */
declare function PlaySoundFile(this: void, file: string): boolean;

/** The game's menu: what a generator fills, one radio line at a time. */
interface MenuDescription {
    CreateRadio(text: string, isSelected: (this: void) => boolean, setSelected: (this: void) => void): unknown;
    SetScrollMode(maxScrollExtent: number): void;
}

/** FrameXML MenuUtil: the game's dropdown lists. */
declare const MenuUtil: {
    CreateContextMenu(this: void, owner: Frame, generator: (this: void, owner: Frame, root: MenuDescription) => void): unknown;
};

/** FrameXML ColorMixin (CreateColor, NORMAL_FONT_COLOR, ...). */
interface ColorMixin {
    r: number;
    g: number;
    b: number;
    a?: number;
    GetRGB(): LuaMultiReturn<[r: number, g: number, b: number]>;
    GetRGBA(): LuaMultiReturn<[r: number, g: number, b: number, a: number]>;
    GenerateHexColor(): string;
    WrapTextInColorCode(text: string): string;
}

// ---------------------------------------------------------------------------------------------
// Script handlers. Handlers receive the widget as their first argument (`self` in Lua).

interface ScriptRegionScripts<Self> {
    OnShow: (this: void, self: Self) => void;
    OnHide: (this: void, self: Self) => void;
    OnEnter: (this: void, self: Self, motion: boolean) => void;
    OnLeave: (this: void, self: Self, motion: boolean) => void;
    OnMouseDown: (this: void, self: Self, button: MouseButton) => void;
    OnMouseUp: (this: void, self: Self, button: MouseButton, upInside: boolean) => void;
    OnMouseWheel: (this: void, self: Self, delta: number) => void;
}

interface FrameScripts<Self> extends ScriptRegionScripts<Self> {
    OnLoad: (this: void, self: Self) => void;
    OnEvent: (this: void, self: Self, event: WowEvent, ...args: any[]) => void;
    OnUpdate: (this: void, self: Self, elapsed: number) => void;
    OnSizeChanged: (this: void, self: Self, width: number, height: number) => void;
    OnDragStart: (this: void, self: Self, button: MouseButton) => void;
    OnDragStop: (this: void, self: Self) => void;
    OnReceiveDrag: (this: void, self: Self) => void;
    OnKeyDown: (this: void, self: Self, key: string) => void;
    OnKeyUp: (this: void, self: Self, key: string) => void;
    OnAttributeChanged: (this: void, self: Self, name: string, value: unknown) => void;
}

interface ButtonScripts<Self> extends FrameScripts<Self> {
    OnClick: (this: void, self: Self, button: MouseButton, down: boolean) => void;
    OnDoubleClick: (this: void, self: Self, button: MouseButton) => void;
    PreClick: (this: void, self: Self, button: MouseButton, down: boolean) => void;
    PostClick: (this: void, self: Self, button: MouseButton, down: boolean) => void;
}

interface EditBoxScripts<Self> extends FrameScripts<Self> {
    OnEnterPressed: (this: void, self: Self) => void;
    OnEscapePressed: (this: void, self: Self) => void;
    OnTabPressed: (this: void, self: Self) => void;
    OnTextChanged: (this: void, self: Self, userInput: boolean) => void;
    OnChar: (this: void, self: Self, text: string) => void;
    OnEditFocusGained: (this: void, self: Self) => void;
    OnEditFocusLost: (this: void, self: Self) => void;
}

/** Handle returned by C_Timer.NewTimer / C_Timer.NewTicker. */
interface TimerHandle {
    Cancel(): void;
    IsCancelled(): boolean;
}

// Each widget type declares script methods for its own handler map, followed by the signatures of
// its base types (so a Button is still a Frame). `this` makes a handler's `self` the widget type
// the method is called on.

interface ScriptRegion {
    // The documented SetPoint requires all five arguments; the client also accepts these shorter forms
    SetPoint(point: FramePoint, offsetX?: number, offsetY?: number): void;
    SetPoint(point: FramePoint, relativeTo: ScriptRegion | string | undefined, relativePoint?: FramePoint, offsetX?: number, offsetY?: number): void;
    SetScript<K extends keyof ScriptRegionScripts<this>>(scriptTypeName: K, script: ScriptRegionScripts<this>[K] | undefined): void;
    HookScript<K extends keyof ScriptRegionScripts<this>>(scriptTypeName: K, script: ScriptRegionScripts<this>[K]): void;
    GetScript<K extends keyof ScriptRegionScripts<this>>(scriptTypeName: K): ScriptRegionScripts<this>[K] | undefined;
}

interface Frame {
    SetScript<K extends keyof FrameScripts<this>>(scriptTypeName: K, script: FrameScripts<this>[K] | undefined): void;
    SetScript<K extends keyof ScriptRegionScripts<this>>(scriptTypeName: K, script: ScriptRegionScripts<this>[K] | undefined): void;
    HookScript<K extends keyof FrameScripts<this>>(scriptTypeName: K, script: FrameScripts<this>[K]): void;
    HookScript<K extends keyof ScriptRegionScripts<this>>(scriptTypeName: K, script: ScriptRegionScripts<this>[K]): void;
    GetScript<K extends keyof FrameScripts<this>>(scriptTypeName: K): FrameScripts<this>[K] | undefined;
    GetScript<K extends keyof ScriptRegionScripts<this>>(scriptTypeName: K): ScriptRegionScripts<this>[K] | undefined;
}

interface Button {
    SetScript<K extends keyof ButtonScripts<this>>(scriptTypeName: K, script: ButtonScripts<this>[K] | undefined): void;
    SetScript<K extends keyof FrameScripts<this>>(scriptTypeName: K, script: FrameScripts<this>[K] | undefined): void;
    SetScript<K extends keyof ScriptRegionScripts<this>>(scriptTypeName: K, script: ScriptRegionScripts<this>[K] | undefined): void;
    HookScript<K extends keyof ButtonScripts<this>>(scriptTypeName: K, script: ButtonScripts<this>[K]): void;
    HookScript<K extends keyof FrameScripts<this>>(scriptTypeName: K, script: FrameScripts<this>[K]): void;
    HookScript<K extends keyof ScriptRegionScripts<this>>(scriptTypeName: K, script: ScriptRegionScripts<this>[K]): void;
    GetScript<K extends keyof ButtonScripts<this>>(scriptTypeName: K): ButtonScripts<this>[K] | undefined;
    GetScript<K extends keyof FrameScripts<this>>(scriptTypeName: K): FrameScripts<this>[K] | undefined;
    GetScript<K extends keyof ScriptRegionScripts<this>>(scriptTypeName: K): ScriptRegionScripts<this>[K] | undefined;
}

interface EditBox {
    SetScript<K extends keyof EditBoxScripts<this>>(scriptTypeName: K, script: EditBoxScripts<this>[K] | undefined): void;
    SetScript<K extends keyof FrameScripts<this>>(scriptTypeName: K, script: FrameScripts<this>[K] | undefined): void;
    SetScript<K extends keyof ScriptRegionScripts<this>>(scriptTypeName: K, script: ScriptRegionScripts<this>[K] | undefined): void;
    HookScript<K extends keyof EditBoxScripts<this>>(scriptTypeName: K, script: EditBoxScripts<this>[K]): void;
    HookScript<K extends keyof FrameScripts<this>>(scriptTypeName: K, script: FrameScripts<this>[K]): void;
    HookScript<K extends keyof ScriptRegionScripts<this>>(scriptTypeName: K, script: ScriptRegionScripts<this>[K]): void;
    GetScript<K extends keyof EditBoxScripts<this>>(scriptTypeName: K): EditBoxScripts<this>[K] | undefined;
    GetScript<K extends keyof FrameScripts<this>>(scriptTypeName: K): FrameScripts<this>[K] | undefined;
    GetScript<K extends keyof ScriptRegionScripts<this>>(scriptTypeName: K): ScriptRegionScripts<this>[K] | undefined;
}

// ---------------------------------------------------------------------------------------------
// Frame creation

interface FrameTypes {
    Frame: Frame;
    Button: Button;
    CheckButton: CheckButton;
    EditBox: EditBox;
    ScrollFrame: ScrollFrame;
    Slider: Slider;
    StatusBar: StatusBar;
    ColorSelect: ColorSelect;
    Cooldown: Cooldown;
    GameTooltip: GameTooltip;
    MessageFrame: MessageFrame;
    SimpleHTML: SimpleHTML;
    Model: Model;
    PlayerModel: PlayerModel;
    DressUpModel: DressUpModel;
    CinematicModel: CinematicModel;
    TabardModel: TabardModel;
    ModelScene: ModelScene;
}

declare function CreateFrame<T extends keyof FrameTypes>(
    frameType: T,
    name?: string,
    parent?: Frame,
    template?: string,
    id?: number,
): FrameTypes[T];

// ---------------------------------------------------------------------------------------------
// FrameXML globals

/** A chat window (ScrollingMessageFrame). */
interface ChatFrame extends Frame {
    AddMessage(text: string, r?: number, g?: number, b?: number): void;
}

declare const UIParent: Frame;
declare const WorldFrame: Frame;
declare const DEFAULT_CHAT_FRAME: ChatFrame;
declare const RaidWarningFrame: Frame;
declare const NORMAL_FONT_COLOR: ColorMixin;
declare const HIGHLIGHT_FONT_COLOR: ColorMixin;
declare const RED_FONT_COLOR: ColorMixin;
declare const GREEN_FONT_COLOR: ColorMixin;
declare const ChatTypeInfo: { [chatType: string]: { r: number; g: number; b: number } };
declare const SOUNDKIT: { [sound: string]: number };
/** Assign `SlashCmdList.NAME` and the globals `SLASH_NAME1`, `SLASH_NAME2`, ... to add a slash command. */
declare const SlashCmdList: { [command: string]: (this: void, msg: string, editBox: EditBox) => void };

declare function CreateColor(r: number, g: number, b: number, a?: number): ColorMixin;
declare function RaidNotice_AddMessage(
    noticeFrame: Frame,
    text: string,
    colorInfo: { r: number; g: number; b: number },
    displayTime?: number,
): void;
declare function SecondsToTime(seconds: number, noSeconds?: boolean, notAbbreviated?: boolean, maxCount?: number): string;

// WoW's Lua environment has no `os`; these globals take its place
interface DateTable {
    year: number;
    month: number;
    day: number;
    hour: number;
    min: number;
    sec: number;
    wday: number;
    yday: number;
    isdst: boolean;
}
declare function date(format: "*t" | "!*t", time?: number): DateTable;
declare function date(format?: string, time?: number): string;
declare function time(): number;
declare function strtrim(text: string, chars?: string): string;
declare function strsplit(delimiter: string, text: string, pieces?: number): LuaMultiReturn<string[]>;
declare function wipe<T extends object>(table: T): T;

/** The corners form of SetTexCoord, the one GetTexCoord answers in (the documentation names only the edges form). */
interface TextureBase {
    SetTexCoord(ulX: number, ulY: number, llX: number, llY: number, urX: number, urY: number, lrX: number, lrY: number): void;
}

/** Whether the client locks protected actions now (in combat): the documentation does not list it. */
declare function InCombatLockdown(): boolean;
