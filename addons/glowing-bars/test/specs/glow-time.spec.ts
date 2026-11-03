import {
    createWorld,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    FORTITUDE,
    HOLY_CANDLE,
    PRAYER_OF_FORTITUDE,
    PRIEST,
    WARRIOR,
    type ClientState,
    type FakeFrame,
    type World,
} from "@wowkit/test-kit";
import { findLabel, RECKLESSNESS, setUpWarrior, toggleTable, useAndRecoverRecklessness } from "./table.helpers";

/** A priest missing Fortitude, which sits on button 1. */
function startPriest(buff: Record<string, unknown>): World {
    const world = createWorld(
        (state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            state.bars[1] = FORTITUDE.id;
        },
        { styles: { buff } },
    );
    world.advance(0.5);
    return world;
}

describe("a missing buff with a glow time", () => {
    it("glows for that long, then keeps quiet while it is still missing", () => {
        const world = startPriest({ glowSeconds: 3 });
        expect(world.glowsOn(1)).toBe(1);
        world.advance(3);
        expect(world.glowsOn(1)).toBe(0);
        world.advance(60);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("glows longer with a longer glow time", () => {
        const world = startPriest({ glowSeconds: 10 });
        world.advance(5);
        expect(world.glowsOn(1)).toBe(1);
        world.advance(6);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("glows again for that long with each repeat", () => {
        const world = startPriest({ glowSeconds: 3, repeat: 10 });
        world.advance(4);
        expect(world.glowsOn(1)).toBe(0);
        world.advance(6);
        expect(world.glowsOn(1)).toBe(1);
        world.advance(3.5);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("has its message and sound come and go with the glow", () => {
        const world = startPriest({ glowSeconds: 3, repeat: 10, isTextOn: true, sound: "raidwarning" });
        expect(world.notice()).toContain("Missing buff");
        expect(world.sounds.length).toBe(1);
        world.advance(4);
        expect(world.notice()).not.toContain("Missing buff");
        expect(world.sounds.length).toBe(1);
        world.advance(6);
        expect(world.notice()).toContain("Missing buff");
        expect(world.sounds.length).toBe(2);
    });

    it("starts over once the buff was cast and runs out again", () => {
        const world = startPriest({ glowSeconds: 3 });
        world.advance(5);
        world.state.auras.push(world.makeAura(FORTITUDE.name, FORTITUDE.id, 1800));
        world.fire("UNIT_AURA", "player");
        world.advance(1);
        world.state.auras = [];
        world.fire("UNIT_AURA", "player");
        world.advance(0.5);
        expect(world.glowsOn(1)).toBe(1);
    });
});

describe("a missing buff glowing until done, by default", () => {
    it("glows the whole time it is missing", () => {
        const world = startPriest({});
        world.advance(120);
        expect(world.glowsOn(1)).toBe(1);
    });
});

describe("a ready cooldown with a repeat", () => {
    it("glows for its 3 seconds once back, and again with each repeat while it waits", () => {
        const world = createWorld(
            (state) => {
                playAs(state, WARRIOR);
                learnSpell(state, RECKLESSNESS);
                state.bars[2] = RECKLESSNESS.id;
                state.isInCombat = true;
            },
            { styles: { cooldown: { repeat: 10 } } },
        );
        world.advance(0.5);
        useAndRecoverRecklessness(world);
        expect(world.glowsOn(2)).toBe(1);
        world.advance(4);
        expect(world.glowsOn(2)).toBe(0);
        world.advance(6);
        expect(world.glowsOn(2)).toBe(1);
    });
});

describe("a low reagent with a glow time and Alert in town", () => {
    function setUp(state: ClientState): void {
        playAs(state, PRIEST);
        learnSpell(state, PRAYER_OF_FORTITUDE);
        state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
        state.bags[HOLY_CANDLE] = 0;
        state.bars[1] = PRAYER_OF_FORTITUDE.id;
    }

    it("glows for that long out of town, and again for that long on arriving in one", () => {
        const world = createWorld(setUp, { styles: { reagent: { glowSeconds: 3 } } });
        world.advance(1);
        expect(world.glowsOn(1)).toBe(1);
        world.advance(5);
        expect(world.glowsOn(1)).toBe(0);
        world.state.isResting = true;
        world.fire("PLAYER_UPDATE_RESTING");
        world.advance(0.5);
        expect(world.glowsOn(1)).toBe(1);
        world.advance(4);
        expect(world.glowsOn(1)).toBe(0);
    });
});

describe("the Glow time column of the table", () => {
    function findGlowTimeButton(world: World, label: string): FakeFrame {
        const row = findLabel(world, label)?.parent;
        if (row === undefined) throw new Error(`no row for ${label}`);
        const texts = ["Until done", "1 s", "2 s", "3 s", "5 s", "10 s"];
        return world.frames.find(
            (frame) => frame.parent === row && frame.frameType === "Button" && texts.includes(frame.text ?? "") && frame.width === 72,
        )!;
    }

    it("shows Until done for a buff and 3 s for a cooldown, and goes through the choices", () => {
        const world = createWorld((state) => {
            playAs(state, WARRIOR);
            learnSpell(state, RECKLESSNESS);
        });
        world.advance(0.5);
        toggleTable();
        expect(findGlowTimeButton(world, "Ready cooldown").text).toBe("3 s");
        const button = findGlowTimeButton(world, "Missing buff");
        const seen: string[] = [];
        for (let i = 0; i < 6; i++) {
            seen.push(button.text!);
            button.scripts.OnClick!(button, "LeftButton");
        }
        expect(seen).toEqual(["Until done", "1 s", "2 s", "3 s", "5 s", "10 s"]);
        button.scripts.OnClick!(button, "RightButton");
        expect(button.text).toBe("10 s");
    });
});

describe("a ready cooldown that shows always, with the fight start reminder on", () => {
    it("glows again as a fight starts, though its glow time ran out before it", () => {
        const world = createWorld(
            (state) => {
                setUpWarrior(state);
                state.isInCombat = false;
            },
            { styles: { cooldown: { when: "always" } }, showCooldownsAtFightStart: true },
        );
        world.advance(5);
        expect(world.glowsOn(2)).toBe(0);
        world.state.isInCombat = true;
        world.fire("PLAYER_REGEN_DISABLED");
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(1);
    });
});
