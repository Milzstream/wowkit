// What the addon draws and prints: frames, the chat window, and the game's Settings panel (which
// records what the addon registered, so a test can press a checkbox by calling its setter).
import { defineGlobals, defineNamespace, defineValues } from "./define";
import { createInertObject, type FakeFrame, type FrameRegistry } from "./frames";

/** A checkbox or dropdown the addon registered in the Settings panel. */
export interface ProxySetting {
    defaultValue: unknown;
    // The addon's own functions: called without a self
    get: (this: void) => unknown;
    set: (this: void, value: unknown) => void;
}

export interface ProxySettings {
    [variable: string]: ProxySetting | undefined;
}

/** A line of the list a button opened. */
export interface FakeMenuChoice {
    label: string;
    isChosen: (this: void) => boolean;
    choose: (this: void) => void;
}

/** The list the addon opened last. */
export interface FakeMenu {
    choices: FakeMenuChoice[];
}

/** The game's color picker: it keeps what the addon set it up with, and answers with the color a test picks. */
export interface FakeColorPicker {
    info: ColorPickerInfo | undefined;
    pickedColor: [number, number, number];
    SetupColorPickerAndShow(info: ColorPickerInfo): void;
    GetColorRGB(): LuaMultiReturn<[number, number, number]>;
}

function createColorPicker(): FakeColorPicker {
    const picker: FakeColorPicker = {
        info: undefined,
        pickedColor: [1, 1, 1],
        SetupColorPickerAndShow(info) {
            picker.info = info;
        },
        GetColorRGB() {
            return $multi(picker.pickedColor[0], picker.pickedColor[1], picker.pickedColor[2]);
        },
    };
    return picker;
}

export function installUi(frames: FrameRegistry, chat: string[], proxySettings: ProxySettings, menu: FakeMenu): void {
    defineValues({
        CreateFrame: (frameType: string, name?: string, parent?: FakeFrame, template?: string) =>
            frames.create(frameType, name, parent, template),
        // The game's root frames
        UIParent: frames.create("Frame", "UIParent"),
        RaidWarningFrame: frames.create("Frame", "RaidWarningFrame"),
        DEFAULT_CHAT_FRAME: frames.create("Frame", "DEFAULT_CHAT_FRAME"),
        GameTooltip: frames.create("GameTooltip", "GameTooltip"),
        // Slash commands: the addon adds its handlers here
        SlashCmdList: {},
        // The frames that Escape closes
        UISpecialFrames: [],
        ColorPickerFrame: createColorPicker(),
        MenuUtil: {
            CreateContextMenu: (owner: FakeFrame, generator: (this: void, owner: FakeFrame, root: unknown) => void) => {
                menu.choices = [];
                generator(owner, {
                    CreateRadio(label: string, isChosen: (this: void) => boolean, choose: (this: void) => void) {
                        menu.choices.push({ label, isChosen, choose });
                    },
                });
            },
        },
        Enum: {
            SpellBookSpellBank: { Player: 0, Pet: 1 },
            SpellBookItemType: { None: 0, Spell: 1, FutureSpell: 2, PetAction: 3, Flyout: 4 },
            WeaponSlot: { MainHand: 0, OffHand: 1, Ranged: 2 },
            ItemEnchantType: { None: 0, Permanent: 1, Temporary: 2, Imbue: 3 },
            ItemClass: { Weapon: 2 },
            PowerType: { Mana: 0, Rage: 1, Focus: 2, Energy: 3, ComboPoints: 4 },
            LuaCurveType: { Linear: 0, Step: 1, Cosine: 2 },
            TooltipDataType: { Item: 0, Spell: 1 },
        },
    });

    // The addon writes to the chat with print
    defineGlobals({
        print: (...args: unknown[]) => {
            chat.push(args.map((arg) => tostring(arg)).join(" "));
        },
        CreateSettingsListSectionHeaderInitializer: () => createInertObject<SettingsInitializer>(),
        CreateSettingsButtonInitializer: () => createInertObject<SettingsInitializer>(),
    });

    defineNamespace<typeof Settings>("Settings", {
        VarType: { Boolean: "boolean", Number: "number", String: "string" },
        RegisterVerticalLayoutCategory: () => $multi(createInertObject<SettingsCategory>(), createInertObject<SettingsLayout>()),
        RegisterCanvasLayoutCategory: () => createInertObject<SettingsCategory>(),
        RegisterCanvasLayoutSubcategory: () => createInertObject<SettingsCategory>(),
        RegisterVerticalLayoutSubcategory: () => $multi(createInertObject<SettingsCategory>(), createInertObject<SettingsLayout>()),
        RegisterAddOnCategory: () => undefined,
        RegisterProxySetting: (_category, variable, _varType, _name, defaultValue, getValue, setValue) => {
            // The game refuses a second setting of the same name, and the whole page with it
            if (proxySettings[variable] !== undefined) throw new Error(`a setting named ${variable} is registered already`);
            proxySettings[variable] = { defaultValue, get: getValue, set: setValue as (this: void, value: unknown) => void };
            return createInertObject<SettingsSetting>();
        },
        CreateCheckbox: () => createInertObject<SettingsInitializer>(),
        CreateDropdown: (_category, _setting, options) => {
            // The game asks for the options when the menu opens; asking once catches mistakes in them
            options();
            return createInertObject<SettingsInitializer>();
        },
        CreateControlTextContainer: () => {
            const entries: [string, string][] = [];
            return {
                Add(value: string, label: string) {
                    entries.push([value, label]);
                },
                GetData() {
                    return entries;
                },
            };
        },
        // No CreateColorSwatch: like a client without color swatches, the addon skips them
    });
}
