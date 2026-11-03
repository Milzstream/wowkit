import { createWorld, describe, expect, it, learnSpell, playAs, FORTITUDE, PRIEST, type World } from "@wowkit/test-kit";

/** The game's ID of the Alarm clock 1 sound. */
const ALARM_1 = 18871;

/** A priest with Fortitude missing on the first button, its sound the Alarm clock 1 (and the given repeat). */
function createPriestWorld(styles: Record<string, unknown>): World {
    const world = createWorld(
        (state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            state.bars[1] = FORTITUDE.id;
        },
        { styles },
    );
    world.advance(1);
    return world;
}

describe("the sound of a missing buff", () => {
    it("plays once, as the glow starts, by default", () => {
        const world = createPriestWorld({ buff: { sound: "alarm1" } });
        expect(world.sounds).toEqual([ALARM_1]);
        world.advance(30);
        expect(world.sounds).toEqual([ALARM_1]);
    });

    it("plays again every 10 seconds while the glow is on, once the player chose so", () => {
        const world = createPriestWorld({ buff: { sound: "alarm1", repeat: 10 } });
        expect(world.sounds).toEqual([ALARM_1]);
        // The glow started as the world was made, about 2 seconds ago
        world.advance(7);
        expect(world.sounds).toEqual([ALARM_1]);
        world.advance(2);
        expect(world.sounds).toEqual([ALARM_1, ALARM_1]);
        world.advance(10);
        expect(world.sounds).toEqual([ALARM_1, ALARM_1, ALARM_1]);
    });

    it("stops repeating once the buff is on", () => {
        const world = createPriestWorld({ buff: { sound: "alarm1", repeat: 10 } });
        world.state.auras.push(world.makeAura(FORTITUDE.name, FORTITUDE.id, 1800));
        world.advance(30);
        expect(world.sounds).toEqual([ALARM_1]);
    });

    it("keeps a repeat that is not one of the choices out of the saved look", () => {
        const world = createPriestWorld({ buff: { sound: "alarm1", repeat: 7 } });
        const buff = (world.getSavedSettings()?.styles as { buff?: Record<string, unknown> }).buff!;
        expect(buff.repeat).toBeUndefined();
        world.advance(30);
        expect(world.sounds).toEqual([ALARM_1]);
    });
});

describe("the message of a missing buff", () => {
    it("comes again with the sound that repeats", () => {
        const world = createPriestWorld({ buff: { sound: "alarm1", repeat: 10, isMessageOn: true } });
        expect(world.notice()).toContain("Missing buff");
        // The message is gone after its 10 seconds; the repeat at 10 seconds shows it again
        world.advance(11);
        expect(world.notice()).toContain("Missing buff");
    });

    it("does not come again when the sound does not repeat", () => {
        const world = createPriestWorld({ buff: { sound: "alarm1", isMessageOn: true } });
        expect(world.notice()).toContain("Missing buff");
        world.advance(11);
        expect(world.notice()).not.toContain("Missing buff");
        world.advance(60);
        expect(world.notice()).not.toContain("Missing buff");
    });
});
