import { createWorld, describe, expect, it, learnSpell, playAs, FORTITUDE, PRIEST } from "@wowkit/test-kit";

describe("a priest who plays with ElvUI", () => {
    /** ElvUI's bar 6 is on the slots of page 6 (61 to 72): Action Bar 2. Its bar 2 (page 2, slots 13 to 24) is of no Blizzard bar. */
    const ELVUI_BAR_6_FIRST = 61;
    const ELVUI_BAR_2_FIRST = 13;

    function setUp(state: Parameters<Parameters<typeof createWorld>[0]>[0]): void {
        playAs(state, PRIEST);
        learnSpell(state, FORTITUDE);
        state.hasElvUI = true;
        state.bars[ELVUI_BAR_6_FIRST] = FORTITUDE.id;
        state.bars[ELVUI_BAR_2_FIRST] = FORTITUDE.id;
    }

    it("sees the missing buff glow on ElvUI's buttons", () => {
        const world = createWorld(setUp);
        world.advance(1);
        expect(world.glowsOnFrame("ElvUI_Bar6Button1")).toBe(1);
        expect(world.glowsOnFrame("ElvUI_Bar2Button1")).toBe(1);
    });

    it("sees no glow on ElvUI's bar 6 once Action Bar 2 is switched off; its bar 2, of no Blizzard bar, still glows", () => {
        const world = createWorld(setUp, { barsThatGlow: { "2": false } });
        world.advance(1);
        expect(world.glowsOnFrame("ElvUI_Bar6Button1")).toBe(0);
        expect(world.glowsOnFrame("ElvUI_Bar2Button1")).toBe(1);
    });

    it("fades ElvUI's bar 6 with Action Bar 2", () => {
        const world = createWorld(setUp, { fadedBars: { "2": true } });
        world.advance(1);
        expect(world.findFrame((frame) => frame.name === "ElvUI_Bar6Button2")!.alpha).toBe(0.5);
    });
});
