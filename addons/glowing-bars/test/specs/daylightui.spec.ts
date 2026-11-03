import { createWorld, describe, expect, it, learnSpell, playAs, FORTITUDE, PRIEST } from "@wowkit/test-kit";

describe("a priest who plays with DaylightUI", () => {
    /** DaylightUI's bar 2 is Action Bar 2: slots 61 to 72. */
    const DAYLIGHT_BAR_2_FIRST = 61;

    function setUp(state: Parameters<Parameters<typeof createWorld>[0]>[0]): void {
        playAs(state, PRIEST);
        learnSpell(state, FORTITUDE);
        state.hasDaylight = true;
        state.bars[DAYLIGHT_BAR_2_FIRST] = FORTITUDE.id;
    }

    it("sees the missing buff glow on DaylightUI's button", () => {
        const world = createWorld(setUp);
        world.advance(1);
        expect(world.glowsOnFrame("DaylightUIBar2Button1")).toBe(1);
    });

    it("sees no glow there once Action Bar 2 is switched off: DaylightUI's bar 2 is it", () => {
        const world = createWorld(setUp, { barsThatGlow: { "2": false } });
        world.advance(1);
        expect(world.glowsOnFrame("DaylightUIBar2Button1")).toBe(0);
    });

    it("shows the glowing button in full on a bar DaylightUI faded, and the others faded with it", () => {
        // DaylightUI fades a bar's holder, the buttons' parent
        const world = createWorld(setUp);
        world.advance(1);
        const findButton = (index: number) => world.findFrame((frame) => frame.name === `DaylightUIBar2Button${index}`)!;
        expect(findButton(1).isIgnoringParentAlpha).toBe(true);
        expect(findButton(2).isIgnoringParentAlpha).toBe(false);
        world.state.auras.push({ name: FORTITUDE.name, spellId: FORTITUDE.id, expirationTime: 99999 });
        world.fire("UNIT_AURA", "player");
        world.advance(1);
        expect(findButton(1).isIgnoringParentAlpha).toBe(false);
    });

    it("fades DaylightUI's bar 2 with Action Bar 2", () => {
        const world = createWorld(setUp, { fadedBars: { "2": true } });
        world.advance(1);
        expect(world.findFrame((frame) => frame.name === "DaylightUIBar2Button2")!.alpha).toBe(0.5);
    });
});
