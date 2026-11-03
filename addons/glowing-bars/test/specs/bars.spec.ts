import {
    beforeEach,
    createWorld,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    FORTITUDE,
    GAMEPAD_BAR,
    PALADIN,
    PRIEST,
    type SpellDefinition,
    type World,
} from "@wowkit/test-kit";
import { findLabel, toggleTable } from "./table.helpers";

/** Action Bar 7 starts at this action slot. */
const BAR_7_FIRST_SLOT = 157;

describe("a priest with Fortitude on Action Bar 1 and on Action Bar 7", () => {
    let world!: World;

    beforeEach(() => {
        world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            state.bars[1] = FORTITUDE.id;
            state.bars[BAR_7_FIRST_SLOT] = FORTITUDE.id;
        });
        world.advance(1);
    });

    it("sees the missing buff glow on both bars", () => {
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(1, "MultiBar6")).toBe(1);
    });

    it("sees it only on Action Bar 7 once Action Bar 1 is switched off", () => {
        world.setOption("bar_1", false);
        world.advance(0.5);
        expect(world.glowsOn(1)).toBe(0);
        expect(world.glowsOn(1, "MultiBar6")).toBe(1);
    });

    it("keeps the switch only where the player changed it", () => {
        world.setOption("bar_1", false);
        world.setOption("bar_1", true);
        const barOff = world.getSavedSettings()?.barOff as Record<string, boolean | undefined>;
        expect(barOff["1"]).toBeUndefined();
        world.advance(0.5);
        expect(world.glowsOn(1)).toBe(1);
    });
});

describe("a priest who plays with a gamepad, in Forever's gamepad mode", () => {
    /** The right bar of the gamepad mode starts at this action slot. */
    const RIGHT_BAR_FIRST_SLOT = 193;

    it("sees the missing buff glow on the button of the gamepad bar", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            state.bars[RIGHT_BAR_FIRST_SLOT] = FORTITUDE.id;
        });
        world.advance(1);
        const name = `${GAMEPAD_BAR}PageUnitRightCenteredAnchorRightBarActionButton1`;
        expect(world.glowsOnFrame(name)).toBe(1);
        // Not a child of the button: a frame an addon made there would taint the gamepad bars' code
        const button = world.findFrame((frame) => frame.name === name)!;
        expect(world.frames.some((frame) => frame.parent === button)).toBe(false);
        // It hides with the button, and is back with it
        button.Hide();
        expect(world.glowsOnFrame(name)).toBe(0);
        button.Show();
        expect(world.glowsOnFrame(name)).toBe(1);
    });
});

describe("a paladin with no aura, in Forever's gamepad mode", () => {
    const DEVOTION_AURA: SpellDefinition = { id: 465, name: "Devotion Aura", rank: 1, icon: 135893, isHelpful: true };

    it("sees the aura glow on the class button, which shows the aura picked from its flyout", () => {
        const world = createWorld((state) => {
            playAs(state, PALADIN);
            learnSpell(state, DEVOTION_AURA);
            state.gamepadClassSpell = DEVOTION_AURA.id;
        });
        world.advance(1);
        expect(world.glowsOnFrame(`${GAMEPAD_BAR}PageUnitLeftClassAction`)).toBe(1);
        // A round button: the client's round highlight, not the square spell alert
        const classButton = world.findFrame((frame) => frame.name === `${GAMEPAD_BAR}PageUnitLeftClassAction`);
        expect(world.frames.some((frame) => frame.parent === classButton && frame.template === "ActionButtonSpellAlertTemplate")).toBe(
            false,
        );
    });
});

describe("a priest who chose how the glow moves", () => {
    function findAlert(world: World) {
        const button = world.findFrame((frame) => frame.name === "ActionButton1");
        return world.frames.find((frame) => frame.parent === button && frame.template === "ActionButtonSpellAlertTemplate")!;
    }

    function setUp(state: Parameters<Parameters<typeof createWorld>[0]>[0]): void {
        playAs(state, PRIEST);
        learnSpell(state, FORTITUDE);
        state.bars[1] = FORTITUDE.id;
    }

    it("sees the missing buff glow standing still: Blizzard's glow, without the flash it starts with", () => {
        const world = createWorld(setUp, { styles: { buff: { animation: "still" } } });
        world.advance(1);
        const alert = findAlert(world);
        expect(alert.isShown).toBe(true);
        expect(alert.ProcStartFlipbook!.isShown).toBe(false);
        expect(alert.ProcLoopFlipbook!.isShown).toBe(true);
    });

    it("sees the glow breathing as Blizzard's glow standing still, without the flash", () => {
        const world = createWorld(setUp, { styles: { buff: { animation: "breathing" } } });
        world.advance(1);
        const alert = findAlert(world);
        expect(alert.ProcStartFlipbook!.isShown).toBe(false);
        expect(alert.ProcLoopFlipbook!.isShown).toBe(true);
    });

    it("sees the animation, with its flash, by default", () => {
        const world = createWorld(setUp);
        world.advance(1);
        expect(findAlert(world).ProcStartFlipbook!.isShown).toBe(true);
    });

    it("is chosen in the Animation column of the table, for one spell too", () => {
        const world = createWorld(setUp);
        world.advance(1);
        toggleTable();
        const row = findLabel(world, FORTITUDE.name)!.parent;
        const button = world.frames.find(
            (frame) => frame.parent === row && frame.frameType === "Button" && frame.text === "Circling" && frame.width === 82,
        )!;
        button.scripts.OnClick!(button, "LeftButton");
        expect(button.text).toBe("Breathing");
        button.scripts.OnClick!(button, "LeftButton");
        expect(button.text).toBe("None");
        world.advance(1);
        const buttonFrame = world.findFrame((frame) => frame.name === "ActionButton1");
        const shown = world.frames.find(
            (frame) => frame.parent === buttonFrame && frame.template === "ActionButtonSpellAlertTemplate" && frame.isShown,
        )!;
        expect(shown.ProcStartFlipbook!.isShown).toBe(false);
        const typeRow = findLabel(world, "Missing buff")!.parent;
        expect(world.frames.some((frame) => frame.parent === typeRow && frame.text === "Circling")).toBe(true);
    });

    it("keeps, on the Settings page, only what a circling glow does on a round button: breathing by default", () => {
        const world = createWorld(setUp);
        expect(world.getSavedSettings()?.roundAnimation).toBe("breathing");
        world.setOption("roundAnimation", "still");
        expect(world.getSavedSettings()?.roundAnimation).toBe("still");
        const [hasGlowStyle] = pcall(() => world.setOption("glowStyle", "still"));
        expect(hasGlowStyle).toBe(false);
    });
});

describe("a priest with Action Bar 7 faded until it glows", () => {
    const SMITE: SpellDefinition = { id: 585, name: "Smite", rank: 1, icon: 135924, isHelpful: false };

    function setUp(state: Parameters<Parameters<typeof createWorld>[0]>[0]): void {
        playAs(state, PRIEST);
        learnSpell(state, FORTITUDE);
        learnSpell(state, SMITE);
        state.bars[BAR_7_FIRST_SLOT] = FORTITUDE.id;
        state.bars[BAR_7_FIRST_SLOT + 1] = SMITE.id;
    }

    function readAlpha(world: World, index: number): number {
        return world.findFrame((frame) => frame.name === `MultiBar6Button${index}`)!.alpha;
    }

    it("sees the glowing button in full and the other one faded", () => {
        const world = createWorld(setUp, { barFaded: { "7": true } });
        world.advance(1);
        expect(readAlpha(world, 1)).toBe(1);
        expect(readAlpha(world, 2)).toBe(0.5);
    });

    it("sees the faded opacity the player chose", () => {
        const world = createWorld(setUp, { barFaded: { "7": true }, fadedOpacity: 20 });
        world.advance(1);
        expect(readAlpha(world, 2)).toBe(0.2);
    });

    it("sees the bar in full again once it is no longer faded", () => {
        const world = createWorld(setUp, { barFaded: { "7": true } });
        world.advance(1);
        world.setOption("fade_7", false);
        world.advance(1);
        expect(readAlpha(world, 2)).toBe(1);
    });
});

describe("a priest who fades the main bar until it glows", () => {
    const SMITE: SpellDefinition = { id: 585, name: "Smite", rank: 1, icon: 135924, isHelpful: false };

    it("sees the glowing button in full and the other one faded, once Action Bar 1 is switched to faded", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            learnSpell(state, SMITE);
            state.bars[1] = FORTITUDE.id;
            state.bars[2] = SMITE.id;
        });
        world.setOption("fade_1", true);
        world.advance(1);
        const readAlpha = (index: number) => world.findFrame((frame) => frame.name === `ActionButton${index}`)!.alpha;
        expect(readAlpha(1)).toBe(1);
        expect(readAlpha(2)).toBe(0.5);
    });
});

describe("a priest in a fight, where the client keeps the buttons' size secret", () => {
    it("still sees the missing buff glow, and the next ticks run on", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            state.bars[1] = FORTITUDE.id;
        });
        // No answer about the size: what the client gives for a secret one
        const button = world.findFrame((frame) => frame.name === "ActionButton1")!;
        (button as unknown as { GetWidth: () => undefined; GetHeight: () => undefined }).GetWidth = () => undefined;
        (button as unknown as { GetWidth: () => undefined; GetHeight: () => undefined }).GetHeight = () => undefined;
        world.advance(1);
        expect(world.glowsOn(1)).toBe(1);
        world.advance(2);
        expect(world.glowsOn(1)).toBe(1);
    });
});

describe("a priest who plays with Bartender4", () => {
    /** Bartender4's bar 2 starts at this button (and action slot). */
    const BARTENDER_BAR_2_FIRST = 13;

    function setUp(state: Parameters<Parameters<typeof createWorld>[0]>[0]): void {
        playAs(state, PRIEST);
        learnSpell(state, FORTITUDE);
        state.hasBartender = true;
        state.bars[BARTENDER_BAR_2_FIRST] = FORTITUDE.id;
    }

    it("sees the missing buff glow on Bartender4's button", () => {
        const world = createWorld(setUp);
        world.advance(1);
        expect(world.glowsOn(BARTENDER_BAR_2_FIRST, "BT4")).toBe(1);
    });

    it("sees no glow there once Action Bar 2 is switched off: Bartender4's bar 2 is it", () => {
        const world = createWorld(setUp, { barOff: { "2": true } });
        world.advance(1);
        expect(world.glowsOn(BARTENDER_BAR_2_FIRST, "BT4")).toBe(0);
    });

    it("fades Bartender4's bar 2 with Action Bar 2", () => {
        const world = createWorld(setUp, { barFaded: { "2": true } });
        world.advance(1);
        const other = world.findFrame((frame) => frame.name === `BT4Button${BARTENDER_BAR_2_FIRST + 1}`)!;
        expect(other.alpha).toBe(0.5);
    });
});

describe("a priest who plays with Dominos", () => {
    /** Dominos's bar 2 starts at its button 13 (slot 13); its bar 3 is MultiBarRightActionButton1 (slot 25). */
    const DOMINOS_BAR_2_FIRST = 13;
    const DOMINOS_BAR_3_FIRST = 25;

    function setUp(state: Parameters<Parameters<typeof createWorld>[0]>[0]): void {
        playAs(state, PRIEST);
        learnSpell(state, FORTITUDE);
        state.hasDominos = true;
        state.bars[DOMINOS_BAR_2_FIRST] = FORTITUDE.id;
        state.bars[DOMINOS_BAR_3_FIRST] = FORTITUDE.id;
    }

    it("sees the missing buff glow on Dominos's buttons, its own and the Blizzard-named ones", () => {
        const world = createWorld(setUp);
        world.advance(1);
        expect(world.glowsOnFrame("DominosActionButton13")).toBe(1);
        expect(world.glowsOnFrame("MultiBarRightActionButton1")).toBe(1);
    });

    it("sees no glow on Dominos's bar 3 once Action Bar 3 is switched off", () => {
        const world = createWorld(setUp, { barOff: { "3": true } });
        world.advance(1);
        expect(world.glowsOnFrame("MultiBarRightActionButton1")).toBe(0);
        expect(world.glowsOnFrame("DominosActionButton13")).toBe(1);
    });
});

describe("a priest who plays with EllesmereUI", () => {
    /** EllesmereUI's Action Bar 2 starts at its button 61 (slot 61); its bar 9, of no Blizzard bar, at button 13. */
    const ELLESMERE_BAR_2_FIRST = 61;
    const ELLESMERE_BAR_9_FIRST = 13;

    function setUp(state: Parameters<Parameters<typeof createWorld>[0]>[0]): void {
        playAs(state, PRIEST);
        learnSpell(state, FORTITUDE);
        state.hasEllesmere = true;
        state.bars[ELLESMERE_BAR_2_FIRST] = FORTITUDE.id;
        state.bars[ELLESMERE_BAR_9_FIRST] = FORTITUDE.id;
    }

    it("sees the missing buff glow on EllesmereUI's buttons, made after the login", () => {
        const world = createWorld(setUp);
        world.advance(5);
        expect(world.glowsOn(ELLESMERE_BAR_2_FIRST, "EAB")).toBe(1);
        expect(world.glowsOn(ELLESMERE_BAR_9_FIRST, "EAB")).toBe(1);
    });

    it("sees no glow on EllesmereUI's Action Bar 2 once Action Bar 2 is switched off; its bar 9 still glows", () => {
        const world = createWorld(setUp, { barOff: { "2": true } });
        world.advance(5);
        expect(world.glowsOn(ELLESMERE_BAR_2_FIRST, "EAB")).toBe(0);
        expect(world.glowsOn(ELLESMERE_BAR_9_FIRST, "EAB")).toBe(1);
    });

    it("sees the glow on a bar switched on in EllesmereUI's options while playing", () => {
        const world = createWorld(setUp);
        world.advance(5);
        // EllesmereUI makes its Action Bar 6 (slots 145 to 156) as it is switched on
        const button = CreateFrame("CheckButton", "EABButton145") as unknown as { action: number };
        button.action = 145;
        world.state.bars[145] = FORTITUDE.id;
        world.advance(5);
        expect(world.glowsOn(145, "EAB")).toBe(1);
    });

    it("fades EllesmereUI's Action Bar 2 with Action Bar 2", () => {
        const world = createWorld(setUp, { barFaded: { "2": true } });
        world.advance(5);
        const other = world.findFrame((frame) => frame.name === `EABButton${ELLESMERE_BAR_2_FIRST + 1}`)!;
        expect(other.alpha).toBe(0.5);
    });
});
