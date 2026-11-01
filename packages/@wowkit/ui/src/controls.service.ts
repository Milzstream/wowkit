// Controls for the Settings panel pages: the game's own checkboxes, dropdowns and color swatches, bound to the
// addon's settings. A control reads the setting through `get` and writes it through `set` (always
// SettingsService.change, so whoever cares reacts to "setting.changed").
import type { Rgb } from "@wowkit/wow";
import type { MessagesService } from "./messages.service";
import type { SettingsService } from "./settings.service";
import { SOUNDS, type SoundKey } from "./sounds.constants";

/** The keys of the settings that hold a true / false. */
type SwitchKey<T> = { [K in keyof T]: T[K] extends boolean ? K : never }[keyof T];

export class ControlsService<T extends object> {
    constructor(
        private readonly settings: SettingsService<T>,
        private readonly messages: MessagesService,
        /** Starts the name the game saves each control under, so two addons never share one. */
        private readonly variablePrefix: string,
    ) {}

    addHeader(layout: SettingsLayout, label: string): void {
        layout.AddInitializer(CreateSettingsListSectionHeaderInitializer(label));
    }

    addCheckbox(
        category: SettingsCategory,
        variable: string,
        label: string,
        tooltip: string | undefined,
        isOnByDefault: boolean,
        get: () => boolean,
        set: (isChecked: boolean) => void,
    ): SettingsInitializer {
        return Settings.CreateCheckbox(
            category,
            this.registerSetting(category, variable, Settings.VarType.Boolean, label, isOnByDefault, get, set),
            tooltip,
        );
    }

    /** A switch stored in the settings under `key`; its default is the default of the setting. */
    addSwitchCheckbox(category: SettingsCategory, key: SwitchKey<T>, label: string, tooltip: string): SettingsInitializer {
        return this.addCheckbox(
            category,
            String(key),
            label,
            tooltip,
            this.settings.getDefault(key) as boolean,
            () => this.settings.get(key) as boolean,
            (isChecked) => this.settings.change(key, isChecked as T[SwitchKey<T>]),
        );
    }

    /** `items` returns [value, label] pairs; a static list is built once. */
    addDropdown(
        category: SettingsCategory,
        variable: string,
        label: string,
        tooltip: string,
        defaultValue: string,
        get: () => string,
        set: (value: string) => void,
        items: () => [value: string, label: string][],
        isStatic = false,
    ): SettingsInitializer {
        const setting = this.registerSetting(category, variable, Settings.VarType.String, label, defaultValue, get, set);
        let cached: unknown;
        const buildOptions = () => {
            if (isStatic && cached !== undefined) return cached;
            const container = Settings.CreateControlTextContainer();
            for (const [value, text] of items()) container.Add(value, text);
            const data = container.GetData();
            if (isStatic) cached = data;
            return data;
        };
        return Settings.CreateDropdown(category, setting, buildOptions, tooltip);
    }

    /** The sound of a reminder; choosing one plays it once as a preview. */
    addSoundDropdown(
        category: SettingsCategory,
        variable: string,
        label: string,
        tooltip: string,
        get: () => SoundKey,
        set: (key: SoundKey) => void,
    ): void {
        this.addDropdown(
            category,
            variable,
            label,
            tooltip,
            "none",
            get,
            (value) => {
                set(value as SoundKey);
                this.messages.playAlertSound(value as SoundKey);
            },
            () => SOUNDS.map((sound): [string, string] => [sound.key, sound.label]),
            true,
        );
    }

    /** A color the player can pick; skipped on clients without color swatches. */
    addColorSwatch(
        category: SettingsCategory,
        variable: string,
        label: string,
        defaultColor: Rgb,
        get: () => Rgb,
        set: (color: Rgb) => void,
    ): void {
        const createSwatch = Settings.CreateColorSwatch;
        if (!createSwatch) return;
        const convertToHexColor = ([r, g, b]: Rgb) => CreateColor(r, g, b).GenerateHexColor();
        const setting = this.registerSetting(
            category,
            `color_${variable}`,
            Settings.VarType.String,
            label,
            convertToHexColor(defaultColor),
            () => convertToHexColor(get()),
            (value) => {
                const picked = CreateColorFromHexString(value);
                if (picked) set([picked.r, picked.g, picked.b]);
            },
        );
        createSwatch(category, setting);
    }

    private registerSetting<V>(
        category: SettingsCategory,
        variable: string,
        varType: string,
        label: string,
        defaultValue: V,
        get: () => V,
        set: (value: V) => void,
    ) {
        return Settings.RegisterProxySetting(category, `${this.variablePrefix}_${variable}`, varType, label, defaultValue, get, set);
    }
}
