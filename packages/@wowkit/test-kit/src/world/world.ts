// A fresh game with the addon loaded and logged in: what a test starts from. `setup` shapes the
// character before the addon sees it; afterwards the test plays through events and time.
import { config } from "../config";
import { createClock } from "./clock";
import { createClientState, type ClientState, type FakeAura } from "./client-state";
import { clearGlobal, readGlobal, defineValues } from "./define";
import { createFrameRegistry, type FakeFrame } from "./frames";
import { installClock } from "./install-clock";
import { installCurves } from "./install-curves";
import { installActionBars, installAuras, installLateAddonButtons } from "./install-bars-and-auras";
import { installItems } from "./install-items";
import { installTalents } from "./install-talents";
import { installTooltips, type TooltipKind } from "./install-tooltips";
import { installSpells } from "./install-spells";
import { installUi, type FakeMenu, type FakeMenuChoice, type ProxySettings } from "./install-ui";
import { installUnits } from "./install-units";

export interface World {
    /** The character, its spells, bars, auras, party and bags; change it and the addon sees the change. */
    state: ClientState;
    /** The lines the addon printed to the chat window. */
    chat: string[];
    /** The sounds the addon played. */
    sounds: number[];
    /** The checkboxes and dropdowns the addon put in the Settings panel, by variable name. */
    proxySettings: ProxySettings;
    /** Sets a checkbox or dropdown of the options page, the way the player's click does: "showWeapon", "buff_InnerFire". */
    setOption(name: string, value: unknown): void;
    frames: FakeFrame[];
    /** Clicks a button that opens a list of choices, and answers with the list. */
    openMenu(button: FakeFrame): FakeMenuChoice[];
    /** Does the list opened last scroll? */
    isMenuScrolling(): boolean;
    /** Clicks a button that opens a list of choices, and picks the one with this label. */
    pickFromMenu(button: FakeFrame, label: string): void;
    /** A game event, delivered to every frame that listens for it. */
    fire(event: string, ...args: unknown[]): void;
    /** Moves time forward; timers and the addon's regular tick run on the way. */
    advance(seconds: number): void;
    /** A buff that lasts `secondsLeft` more seconds from now. */
    makeAura(name: string, spellId: number, secondsLeft: number, sourceUnit?: string): FakeAura;
    /** How many glows are showing on action button 1..12 (of the main bar, or of another bar: "MultiBar6"). */
    glowsOn(button: number, bar?: string): number;
    /**
     * How many glows are showing on the button of this name: the spell alerts, and the ring a glow draws on a round button;
     * made in the button, or anchored to it (the glow of a gamepad button is beside it).
     */
    glowsOnFrame(name: string): number;
    /** The opacity of the glows showing on action button 1..12 (a glow faded by a hidden value is 0 or 1). */
    glowAlphasOn(button: number): number[];
    /** The text of the notice at the top of the screen; empty when it is not showing. */
    notice(): string;
    /** The lines the addon adds to the tooltip of a spell or an item (the player points at it); an ID of undefined is a tooltip without one. */
    tooltipLines(kind: TooltipKind, id: number | undefined): string[];
    /** What the addon keeps in the character's saved variables. */
    getSavedSettings(): Record<string, unknown> | undefined;
    /** What the addon keeps in the account's saved data (## SavedVariables). */
    getAccountSaved(): Record<string, unknown> | undefined;
    findFrame(matches: (frame: FakeFrame) => boolean): FakeFrame | undefined;
}

function loadAddon(): void {
    const [chunk, error] = loadfile(config.addonPath);
    if (chunk === undefined) throw new Error(`cannot load the addon from "${config.addonPath}": ${error}`);
    // The game runs each addon file with (addonName, addonTable)
    (chunk as (...args: unknown[]) => unknown)(config.addonName, {});
}

/** The frames of the last world: their names are globals, which the next world takes away (a frame only it made stays gone). */
let lastFrames: FakeFrame[] = [];

export function createWorld(setup: (state: ClientState) => void, savedSettings?: Record<string, unknown>): World {
    for (const frame of lastFrames) if (frame.name !== undefined) clearGlobal(frame.name);
    clearGlobal(config.savedVariables);
    if (config.accountVariables !== "") clearGlobal(config.accountVariables);
    // The notice area of the earlier world is gone with its frames
    clearGlobal("WowkitNotices");
    // What the game loaded from the character's file before the addon started: a character that played before
    if (savedSettings !== undefined) defineValues({ [config.savedVariables]: savedSettings });
    const state = createClientState();
    setup(state);
    // What the game loaded from the account's file: an account that played before
    if (state.accountSaved !== undefined && config.accountVariables !== "") defineValues({ [config.accountVariables]: state.accountSaved });
    const clock = createClock();
    const frames = createFrameRegistry();
    lastFrames = frames.all;
    const chat: string[] = [];
    const sounds: number[] = [];
    const proxySettings: ProxySettings = {};

    installClock(clock);
    installUnits(state);
    installSpells(state);
    const menu: FakeMenu = { choices: [], isScrolling: false };
    installUi(frames, chat, proxySettings, menu);
    const openMenu = (button: FakeFrame) => {
        menu.choices = [];
        button.scripts.OnClick!(button);
        return menu.choices;
    };
    installActionBars(state, frames);
    installAuras(state);
    installItems(state, sounds);
    const tooltips = installTooltips();
    installCurves(state);
    installTalents(state);

    loadAddon();
    frames.fire("ADDON_LOADED", config.addonName, false);
    frames.fire("PLAYER_LOGIN");
    frames.fire("PLAYER_ENTERING_WORLD", true, false);
    clock.advance(1);
    // A bar addon that makes its buttons after the addon's first map of the bars
    installLateAddonButtons(state, frames);

    return {
        state,
        chat,
        sounds,
        proxySettings,
        setOption(name, value) {
            const setting = proxySettings[`${config.addonName}_${name}`];
            if (setting === undefined) throw new Error(`the options page has no setting "${name}"`);
            setting.set(value);
        },
        frames: frames.all,
        openMenu: (button) => openMenu(button),
        isMenuScrolling: () => menu.isScrolling,
        pickFromMenu: (button, label) => {
            const choice = openMenu(button).find((listed) => listed.label === label);
            if (choice === undefined) throw new Error(`the list has no choice "${label}"`);
            choice.choose();
        },
        fire: (event, ...args) => frames.fire(event, ...args),
        advance: (seconds) => clock.advance(seconds),
        makeAura: (name, spellId, secondsLeft, sourceUnit) => ({ name, spellId, expirationTime: clock.getNow() + secondsLeft, sourceUnit }),
        glowsOn(button, bar = "Action") {
            return this.glowsOnFrame(`${bar}Button${button}`);
        },
        glowsOnFrame(name) {
            const buttonFrame = readGlobal(name);
            return frames.all.filter(
                (frame) =>
                    (frame.parent === buttonFrame || frame.anchor === buttonFrame) &&
                    (frame.template === "ActionButtonSpellAlertTemplate" || frame.frameType === "Frame") &&
                    frame.isShown,
            ).length;
        },
        glowAlphasOn(button) {
            const buttonFrame = readGlobal(`ActionButton${button}`);
            return frames.all
                .filter((frame) => frame.parent === buttonFrame && frame.template === "ActionButtonSpellAlertTemplate" && frame.isShown)
                .map((frame) => frame.alpha);
        },
        tooltipLines: (kind, id) => tooltips.show(kind, id),
        notice() {
            const shared = readGlobal("WowkitNotices") as { frame: FakeFrame; text: FakeFrame } | undefined;
            return shared?.frame.isShown ? (shared.text.text ?? "") : "";
        },
        getSavedSettings: () => readGlobal(config.savedVariables) as Record<string, unknown> | undefined,
        getAccountSaved: () =>
            config.accountVariables !== "" ? (readGlobal(config.accountVariables) as Record<string, unknown> | undefined) : undefined,
        findFrame: (matches) => frames.all.find((frame) => matches(frame)),
    };
}
