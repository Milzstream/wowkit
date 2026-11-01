import {
    createWorld,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    FORTITUDE,
    PALADIN,
    PRIEST,
    type SpellDefinition,
    type World,
} from "@wowkit/test-kit";

interface GlowingBarsApi {
    RegisterButton: (this: void, button: unknown, bar?: number, shape?: unknown) => void;
    RegisterStanceButton: (this: void, button: unknown, stance: number, shape?: unknown) => void;
}

/** The slot of the first button of Action Bar 2. */
const BAR_2_FIRST = 61;

/** A priest with Fortitude on the slot of a button of a bar addon nobody knows, which registers it once the addons load. */
function setUpWithButton(options?: Parameters<typeof createWorld>[1], bar?: number, shape?: unknown, ownShape?: string): World {
    const world = createWorld((state) => {
        playAs(state, PRIEST);
        learnSpell(state, FORTITUDE);
        state.bars[BAR_2_FIRST] = FORTITUDE.id;
    }, options);
    const button = CreateFrame("CheckButton", "MyBarsButton1") as unknown as { action: number; activeButtonShape?: string };
    button.action = BAR_2_FIRST;
    button.activeButtonShape = ownShape;
    (_G as unknown as { GlowingBars: GlowingBarsApi }).GlowingBars.RegisterButton(button, bar, shape);
    // The bar addons' buttons are counted every two seconds
    world.advance(3);
    return world;
}

/** Is Blizzard's square spell alert lit on the button? */
function hasSquareAlert(world: World, name: string): boolean {
    const button = world.findFrame((frame) => frame.name === name);
    return world.frames.some((frame) => frame.parent === button && frame.template === "ActionButtonSpellAlertTemplate" && frame.isShown);
}

describe("a bar addon that registers its buttons", () => {
    it("has the missing buff glow on its button", () => {
        expect(setUpWithButton(undefined, 2).glowsOnFrame("MyBarsButton1")).toBe(1);
    });

    it("has its button follow the switch of the bar it said it counts as", () => {
        expect(setUpWithButton({ barOff: { "2": true } }, 2).glowsOnFrame("MyBarsButton1")).toBe(0);
    });

    it("has its button faded with that bar", () => {
        const world = setUpWithButton({ barFaded: { "2": true } }, 2);
        world.state.bars[BAR_2_FIRST] = 0;
        world.fire("ACTIONBAR_SLOT_CHANGED", BAR_2_FIRST);
        world.advance(3);
        expect(world.findFrame((frame) => frame.name === "MyBarsButton1")!.alpha).toBe(0.5);
    });

    it("has a button of no bar glow whatever the bar switches", () => {
        expect(setUpWithButton({ barOff: { "2": true } }).glowsOnFrame("MyBarsButton1")).toBe(1);
    });

    it("has its round button glow round: the client's round highlight, not the square spell alert", () => {
        const world = setUpWithButton(undefined, undefined, "Circle");
        expect(world.glowsOnFrame("MyBarsButton1")).toBe(1);
        expect(hasSquareAlert(world, "MyBarsButton1")).toBe(false);
    });

    it("has its button glow square when it says square, or a shape the glow does not know", () => {
        for (const shape of ["Square", "Hexagon", 7]) {
            const world = setUpWithButton(undefined, undefined, shape);
            expect(world.glowsOnFrame("MyBarsButton1")).toBe(1);
            expect(hasSquareAlert(world, "MyBarsButton1")).toBe(true);
        }
    });

    it("has a button that says it is round itself glow as one registered round: on the button, and in full on a faded bar", () => {
        const world = setUpWithButton(undefined, undefined, undefined, "Circle");
        expect(world.glowsOnFrame("MyBarsButton1")).toBe(1);
        expect(hasSquareAlert(world, "MyBarsButton1")).toBe(false);
        expect(world.findFrame((frame) => frame.name === "MyBarsButton1")!.isIgnoringParentAlpha).toBe(true);
    });

    it("has its button glow square on the button when it says square, whatever the button says itself", () => {
        const world = setUpWithButton(undefined, undefined, "Square", "Circle");
        expect(hasSquareAlert(world, "MyBarsButton1")).toBe(true);
    });

    it("is ignored when it registers something that is no button, and the bars glow as before", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            state.bars[1] = FORTITUDE.id;
        });
        (_G as unknown as { GlowingBars: GlowingBarsApi }).GlowingBars.RegisterButton("MyBarsButton1", 2);
        world.advance(3);
        expect(world.glowsOn(1)).toBe(1);
    });
});

describe("a bar addon that registers its stance buttons", () => {
    const DEVOTION_AURA: SpellDefinition = { id: 465, name: "Devotion Aura", rank: 1, icon: 135893, isHelpful: true };

    it("has a missing paladin aura glow on the button of its stance", () => {
        const world = createWorld((state) => {
            playAs(state, PALADIN);
            learnSpell(state, DEVOTION_AURA);
            state.stances = [DEVOTION_AURA.id];
        });
        const api = (_G as unknown as { GlowingBars: GlowingBarsApi }).GlowingBars;
        api.RegisterStanceButton(CreateFrame("CheckButton", "MyBarsStanceButton1"), 1);
        // A stance that is not there is left out
        api.RegisterStanceButton(CreateFrame("CheckButton", "MyBarsStanceButton2"), 2);
        world.advance(3);
        expect(world.glowsOnFrame("MyBarsStanceButton1")).toBe(1);
        expect(world.glowsOnFrame("MyBarsStanceButton2")).toBe(0);
    });

    it("has the aura glow round on a round stance button", () => {
        const world = createWorld((state) => {
            playAs(state, PALADIN);
            learnSpell(state, DEVOTION_AURA);
            state.stances = [DEVOTION_AURA.id];
        });
        const api = (_G as unknown as { GlowingBars: GlowingBarsApi }).GlowingBars;
        api.RegisterStanceButton(CreateFrame("CheckButton", "MyBarsStanceButton1"), 1, "Circle");
        world.advance(3);
        expect(world.glowsOnFrame("MyBarsStanceButton1")).toBe(1);
        expect(hasSquareAlert(world, "MyBarsStanceButton1")).toBe(false);
    });
});
