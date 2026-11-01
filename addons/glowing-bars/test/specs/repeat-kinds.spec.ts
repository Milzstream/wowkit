import {
    createWorld,
    describe,
    expect,
    FORTITUDE,
    HOLY_CANDLE,
    it,
    learnSpell,
    playAs,
    PRAYER_OF_FORTITUDE,
    PRIEST,
    WARRIOR,
    type SpellDefinition,
} from "@wowkit/test-kit";

const RECKLESSNESS: SpellDefinition = { id: 1719, name: "Recklessness", rank: 1, icon: 132109, cooldownSeconds: 300, isHelpful: true };

describe("the repeat of a sound", () => {
    it("has its button on every row of the table", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
        });
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        const buttons = world.frames.filter((frame) => frame.frameType === "Button" && frame.text === "Off");
        expect(buttons.length > 0).toBe(true);
        expect(buttons.filter((button) => !button.isShown).length).toBe(0);
    });

    function createLowOnCandles(reagent: Record<string, unknown>, isResting: boolean) {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, FORTITUDE);
                learnSpell(state, PRAYER_OF_FORTITUDE);
                state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
                state.bags[HOLY_CANDLE] = 0;
                state.bars[1] = PRAYER_OF_FORTITUDE.id;
                state.isResting = isResting;
            },
            { styles: { reagent } },
        );
        world.advance(2);
        return world;
    }

    it("plays again for a low reagent in a town", () => {
        const world = createLowOnCandles({ sound: "raidwarning", repeat: 5 }, true);
        const first = world.sounds.length;
        expect(first > 0).toBe(true);
        world.advance(5);
        expect(world.sounds.length > first).toBe(true);
    });

    it("plays once for a low reagent out of a town", () => {
        const world = createLowOnCandles({ sound: "raidwarning", repeat: 5 }, false);
        const first = world.sounds.length;
        expect(first).toBe(1);
        world.advance(11);
        expect(world.sounds.length).toBe(first);
    });

    it("shows the message of a low reagent again in a town, with what is left by then", () => {
        const world = createLowOnCandles({ isTextOn: true, repeat: 10 }, true);
        expect(world.notice()).toContain("Reagents running low: Holy Candle (0)");
        world.state.bags[HOLY_CANDLE] = 3;
        world.advance(4);
        expect(world.notice()).toContain("Holy Candle (0)");
        world.advance(7);
        expect(world.notice()).toContain("Reagents running low: Holy Candle (3)");
    });

    it("never says only that a reagent is low", () => {
        expect(createLowOnCandles({ isTextOn: true, repeat: 10 }, true).notice()).not.toContain("Low reagent");
    });

    it("shows no message of a low reagent out of a town", () => {
        const world = createLowOnCandles({ isTextOn: true, repeat: 10 }, false);
        world.advance(11);
        expect(world.notice()).not.toContain("Reagents running low");
    });

    it("shows no message of a low reagent with the text off", () => {
        const world = createLowOnCandles({ isTextOn: false, repeat: 10 }, true);
        world.advance(11);
        expect(world.notice()).not.toContain("Reagents running low");
    });

    it("does not show the message again without a repeat", () => {
        const world = createLowOnCandles({ isTextOn: true }, true);
        world.state.bags[HOLY_CANDLE] = 3;
        world.advance(11);
        expect(world.notice()).not.toContain("Holy Candle (3)");
    });

    it("plays again for a cooldown that glows until it is pressed", () => {
        const world = createWorld(
            (state) => {
                playAs(state, WARRIOR);
                learnSpell(state, RECKLESSNESS);
                state.bars[1] = RECKLESSNESS.id;
            },
            { styles: { cooldown: { sound: "raidwarning", repeat: 5 } }, cooldownGlowSeconds: 0 },
        );
        world.advance(1);
        world.state.isInCombat = true;
        world.state.cooldowns[RECKLESSNESS.id] = { start: 0, duration: 99999 };
        world.advance(0.5);
        world.state.cooldowns[RECKLESSNESS.id] = undefined;
        world.advance(1);
        const first = world.sounds.length;
        expect(first > 0).toBe(true);
        world.advance(5);
        expect(world.sounds.length > first).toBe(true);
    });
});
