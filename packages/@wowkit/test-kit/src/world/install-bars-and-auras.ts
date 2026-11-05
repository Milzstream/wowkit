// The action bars (which spell is on which slot) and the auras on the player and the party.
import { findPartyMember, type ClientState, type FakeAura } from "./client-state";
import { defineGlobals, defineNamespace } from "./define";
import type { FakeFrame, FrameRegistry } from "./frames";

const MAIN_BAR_BUTTONS = 12;
const TOTEM_BAR_BUTTONS = 4;
/** The frame of Forever's gamepad bars. */
export const GAMEPAD_BAR = "GamepadMainActionBarFrame";

/** The action slot of MultiCastActionButton1. */
export const TOTEM_BAR_FIRST_SLOT = 133;

/** The bars 2 to 8 and the action slot of their first button. */
const OTHER_BARS: [bar: string, firstSlot: number][] = [
    ["MultiBarBottomLeft", 61],
    ["MultiBarBottomRight", 49],
    ["MultiBarRight", 25],
    ["MultiBarLeft", 37],
    ["MultiBar5", 145],
    ["MultiBar6", 157],
    ["MultiBar7", 169],
];

/**
 * The buttons a bar addon makes after the login, past the first map of the bars (installAddonBars' are there before it):
 * the world calls this then. EllesmereUI's (Blizzard's template: the slot in `action`), named after their bar's first slot.
 */
export function installLateAddonButtons(state: ClientState, frames: FrameRegistry): void {
    if (!state.hasEllesmere) return;
    for (const first of [61, 13]) {
        for (let i = 0; i < 12; i++) frames.create("CheckButton", `EABButton${first + i}`).action = first + i;
    }
}

/** The bars of the action bar addons the test loads: Bartender4's and Dominos's first ones, two of ElvUI's, DaylightUI's bar 2. */
function installAddonBars(state: ClientState, frames: FrameRegistry): void {
    // Bartender4's buttons (LibActionButton keeps the slot in `action`, as Blizzard's buttons do)
    if (state.hasBartender) {
        for (let index = 1; index <= 24; index++) frames.create("CheckButton", `BT4Button${index}`).action = index;
    }
    // Dominos's buttons (Blizzard's template: the slot in `action`), under its names
    if (state.hasDominos) {
        for (let id = 13; id <= 24; id++) frames.create("CheckButton", `DominosActionButton${id}`).action = id;
        for (let index = 1; index <= 12; index++) frames.create("CheckButton", `MultiBarRightActionButton${index}`).action = 24 + index;
    }
    // DaylightUI's buttons (Blizzard's template: the slot in `action`): its bar 2 on Action Bar 2's slots
    if (state.hasDaylight) {
        for (let index = 1; index <= 12; index++) frames.create("CheckButton", `DaylightUIBar2Button${index}`).action = 60 + index;
    }
    // ElvUI's buttons (LibActionButton keeps the slot in `action`): its bar N on the slots of page N
    if (state.hasElvUI) {
        for (const bar of [2, 6]) {
            for (let index = 1; index <= 12; index++)
                frames.create("CheckButton", `ElvUI_Bar${bar}Button${index}`).action = (bar - 1) * 12 + index;
        }
    }
}

export function installActionBars(state: ClientState, frames: FrameRegistry): void {
    defineNamespace<typeof C_ActionBar>("C_ActionBar", {
        HasAction: (slot) => state.bars[slot] !== undefined || state.barItems[slot] !== undefined || state.barMacros[slot] !== undefined,
        GetActionTexture: (slot) => state.spells[state.bars[slot] ?? 0]?.icon ?? 0,
        // The bar does not answer: the addon then asks the spell
        IsActionInRange: () => undefined,
    });
    defineGlobals({
        GetActionInfo: (slot) => {
            const itemId = state.barItems[slot];
            if (itemId !== undefined) return $multi("item", itemId, undefined, undefined);
            // A macro that shows a spell is given as that spell, as the game does; any other by its number
            const macro = state.barMacros[slot];
            if (macro?.spellId !== undefined) return $multi("macro", macro.spellId, "spell", undefined);
            if (macro !== undefined) return $multi("macro", slot, undefined, undefined);
            const spellId = state.bars[slot];
            if (spellId === undefined) return $multi(undefined, undefined, undefined, undefined);
            return $multi("spell", spellId, undefined, spellId);
        },
        GetTotemInfo: (slot) => {
            const totem = state.totems[slot];
            if (!totem) return $multi(false, "", 0, 0, 0, 0, 0);
            return $multi(true, totem.name, totem.start, totem.duration, 0, 0, 0);
        },
        strtrim: (text: string) => string.match(text, "^%s*(.-)%s*$")[0] ?? "",
        GetMacroSpell: (macro) => state.barMacros[macro as number]?.spellId,
        GetMacroBody: (macro) => state.barMacros[macro as number]?.body,
    });

    // Blizzard's own action buttons: ActionButton1..12, each on its action slot
    for (let slot = 1; slot <= MAIN_BAR_BUTTONS; slot++) {
        frames.create("Button", `ActionButton${slot}`).action = slot;
    }
    // The other bars of Edit Mode (2 to 8): their buttons, on the action slots the game gives each
    for (const [bar, firstSlot] of OTHER_BARS) {
        for (let index = 1; index <= MAIN_BAR_BUTTONS; index++)
            frames.create("Button", `${bar}Button${index}`).action = firstSlot + index - 1;
    }
    // Forever's gamepad bars: a left and a right bar of 8 buttons, deep in the frame of the gamepad mode (action slots 185 on)
    const gamepad = frames.create("Frame", GAMEPAD_BAR);
    for (const [side, firstSlot] of [
        ["Left", 185],
        ["Right", 193],
    ] as const) {
        const unit = frames.create("Frame", `${GAMEPAD_BAR}PageUnit${side}`, gamepad);
        const bar = frames.create("Frame", `${GAMEPAD_BAR}PageUnit${side}CenteredAnchor${side}Bar`, unit);
        for (let index = 1; index <= 8; index++) {
            const button = frames.create("Button", `${GAMEPAD_BAR}PageUnit${side}CenteredAnchor${side}BarActionButton${index}`, bar);
            button.action = firstSlot + index - 1;
            // The right unit's face buttons are round, the left's square, as in the game
            (button as FakeFrame & { activeButtonShape?: string }).activeButtonShape = side === "Right" ? "Circle" : "Square";
        }
    }
    // The class button of the left unit: no action slot (0), the spell it shows in its own field
    const classButton = frames.create(
        "Button",
        `${GAMEPAD_BAR}PageUnitLeftClassAction`,
        frames.all.find((frame) => frame.name === `${GAMEPAD_BAR}PageUnitLeft`),
    );
    classButton.action = 0;
    (classButton as FakeFrame & { activeButtonShape?: string }).activeButtonShape = "Circle";
    (classButton as FakeFrame & { spellID?: number }).spellID = state.gamepadClassSpell;
    installAddonBars(state, frames);
    // The shaman's totem bar: MultiCastActionButton1..4 on the action slots after the main bar's pages
    for (let index = 1; index <= TOTEM_BAR_BUTTONS; index++) {
        frames.create("Button", `MultiCastActionButton${index}`).action = TOTEM_BAR_FIRST_SLOT + index - 1;
    }
}

export function installAuras(state: ClientState): void {
    function toAuraData(aura: FakeAura, isHelpful: boolean): AuraData {
        return {
            auraInstanceID: 0,
            name: aura.name,
            spellId: aura.spellId,
            icon: 0,
            applications: aura.stacks ?? 1,
            duration: 0,
            expirationTime: aura.expirationTime,
            isHelpful,
            sourceUnit: aura.sourceUnit as UnitToken | undefined,
            dispelName: aura.dispelName,
            isStealable: aura.isStealable === true,
        };
    }

    /** What the game lets the addon see of the player's auras: nothing while they are hidden. */
    function listPlayerAuras(): FakeAura[] {
        return state.areAurasHidden ? [] : state.auras;
    }

    /** The buffs or the debuffs of a unit. */
    function listUnitAuras(unit: UnitToken, isHarmful: boolean): FakeAura[] {
        if (unit === "target") return (isHarmful ? state.target?.debuffs : state.target?.buffs) ?? [];
        if (unit === "player") return isHarmful ? state.playerDebuffs : listPlayerAuras();
        return isHarmful ? [] : (findPartyMember(state, unit)?.auras ?? []);
    }

    /** The auras of a unit by filter: buffs ("HELPFUL"), debuffs ("HARMFUL"), the player's own debuffs ("HARMFUL|PLAYER"). */
    function listAurasOf(unit: UnitToken, filter: string | undefined): FakeAura[] {
        const has = (word: string) => filter !== undefined && string.find(filter, word, 1, true)[0] !== undefined;
        const auras = listUnitAuras(unit, has("HARMFUL"));
        return has("PLAYER") ? auras.filter((aura) => aura.sourceUnit === "player") : auras;
    }

    defineNamespace<typeof C_UnitAuras>("C_UnitAuras", {
        GetAuraDataByIndex: (unit, index, filter) => {
            const aura = listAurasOf(unit, filter as string | undefined)[index - 1];
            return aura ? toAuraData(aura, filter !== "HARMFUL" && filter !== "HARMFUL|PLAYER") : undefined;
        },
        GetPlayerAuraBySpellID: (spellId) => {
            const aura = listPlayerAuras().find((candidate) => candidate.spellId === spellId);
            return aura ? toAuraData(aura, true) : undefined;
        },
        GetAuraDataBySpellName: (unit, spellName, filter) => {
            const aura = listAurasOf(unit, (filter as string | undefined) ?? "HELPFUL").find((candidate) => candidate.name === spellName);
            return aura ? toAuraData(aura, filter !== "HARMFUL" && filter !== "HARMFUL|PLAYER") : undefined;
        },
    });
}
