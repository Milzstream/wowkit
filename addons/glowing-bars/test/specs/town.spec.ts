import {
    beforeEach,
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
    SMITE_RANK_1,
    SMITE_RANK_2,
    type ClientState,
    type World,
} from "@wowkit/test-kit";
import { findLabel, switchInTable } from "./table.helpers";

/** A priest who knows Prayer of Fortitude, which costs a Holy Candle, and has none in the bags. */
function setUpPriest(state: ClientState, isResting: boolean): void {
    playAs(state, PRIEST);
    learnSpell(state, FORTITUDE);
    learnSpell(state, PRAYER_OF_FORTITUDE);
    state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
    state.bags[HOLY_CANDLE] = 0;
    state.isResting = isResting;
}

describe("a priest who arrives in a town", () => {
    let world!: World;

    beforeEach(() => {
        world = createWorld((state) => setUpPriest(state, true), { styles: { reagent: { isTextOn: true } } });
    });

    it("is told on the screen which reagents run low", () => {
        expect(world.notice()).toContain("Reagents running low: Holy Candle (0)");
    });

    it("is told nothing in the chat", () => {
        expect(world.chat.join("\n")).not.toContain("Reagents running low");
    });

    it("is told nothing when the player muted the addon", () => {
        world = createWorld((state) => setUpPriest(state, false));
        world.setOption("isMuted", true);
        world.state.isResting = true;
        world.fire("PLAYER_UPDATE_RESTING");
        expect(world.notice()).not.toContain("Reagents running low");
    });

    it("keeps its settings in the character's saved variables", () => {
        expect(world.getSavedSettings()?.isMuted).toBe(false);
    });
});

describe("the reagent message on the screen", () => {
    it("is on unless the player switched it off", () => {
        expect(createWorld((state) => setUpPriest(state, true)).notice()).toContain("Reagents running low");
        const world = createWorld((state) => setUpPriest(state, true), { styles: { reagent: { isTextOn: false } } });
        expect(world.notice()).not.toContain("Reagents running low");
    });
});

describe("a priest who is not in a town", () => {
    it("is told nothing", () => {
        const world = createWorld((state) => setUpPriest(state, false));
        expect(world.notice()).not.toContain("Reagents running low");
    });

    it("is told nothing when the candles are in the bags", () => {
        const world = createWorld((state) => {
            setUpPriest(state, true);
            state.bags[HOLY_CANDLE] = 20;
        });
        expect(world.notice()).not.toContain("Reagents running low");
    });
});

describe("the sound of the reminder", () => {
    it("is not played unless the player picked one", () => {
        const world = createWorld((state) => setUpPriest(state, true));
        expect(world.sounds.length).toBe(0);
    });

    it("is played when the glow appears", () => {
        const world = createWorld((state) => setUpPriest(state, false), { styles: { reagent: { sound: "raidwarning" } } });
        world.state.bars[1] = PRAYER_OF_FORTITUDE.id;
        world.fire("ACTIONBAR_SLOT_CHANGED", 1);
        world.advance(2);
        expect(world.sounds).toEqual([8959]);
    });
});

describe("the group buff on the bar of a priest low on candles", () => {
    let world!: World;

    beforeEach(() => {
        world = createWorld((state) => {
            setUpPriest(state, false);
            state.bars[1] = PRAYER_OF_FORTITUDE.id;
        });
        world.advance(2);
    });

    it("glows, quietly", () => {
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowAlphasOn(1)).toEqual([0.5]);
    });

    it("stops glowing once there are candles", () => {
        world.state.bags[HOLY_CANDLE] = 20;
        world.fire("BAG_UPDATE");
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("does not glow in combat", () => {
        world.state.isInCombat = true;
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("does not glow when the player switched the reagent reminder off", () => {
        switchInTable(world, "Low reagent", false);
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("glows in a town too, although the other reminders keep quiet there", () => {
        world.state.isResting = true;
        world.fire("PLAYER_UPDATE_RESTING");
        world.advance(1);
        expect(world.glowsOn(1)).toBe(1);
    });
});

describe("the reagents of a priest in the table", () => {
    function arriveInTown(world: World): void {
        world.state.isResting = true;
        world.fire("PLAYER_UPDATE_RESTING");
    }

    it("have a row for the group buff of the class, and none for the group buffs of another class", () => {
        const world = createWorld((state) => setUpPriest(state, false));
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        expect(findLabel(world, "Prayer of Fortitude (Holy Candle)")).toBeDefined();
        expect(findLabel(world, "Prayer of Fortitude (Sacred Candle)")).toBeDefined();
        expect(findLabel(world, "Gift of the Wild")).toBeUndefined();
    });

    it("silence the message of a reagent that is switched off", () => {
        const world = createWorld((state) => setUpPriest(state, false), { styles: { reagent: { isTextOn: true } } });
        switchInTable(world, "Prayer of Fortitude (Holy Candle)", false);
        arriveInTown(world);
        expect(world.notice()).not.toContain("Reagents running low");
    });

    it("are stored only where they differ from the default", () => {
        const world = createWorld((state) => setUpPriest(state, false));
        switchInTable(world, "Prayer of Fortitude (Holy Candle)", false);
        const reagentOn = world.getSavedSettings()?.reagentOn as Record<string, boolean | undefined>;
        expect(reagentOn["17028"]).toBe(false);
        switchInTable(world, "Prayer of Fortitude (Holy Candle)", true);
        const afterwards = world.getSavedSettings()?.reagentOn as Record<string, boolean | undefined>;
        expect(afterwards["17028"]).toBeUndefined();
    });
});

describe("a character whose saved sound has gone from the list", () => {
    it("gets the default sound again", () => {
        const world = createWorld((state) => setUpPriest(state, true), { styles: { reagent: { sound: "coin" } } });
        expect((world.getSavedSettings()?.styles as { reagent?: { sound?: string } } | undefined)?.reagent?.sound).toBeUndefined();
    });
});

describe("a priest with an old rank on the bar who arrives in a town", () => {
    it("keeps the reagent message, although the message of the old rank goes out in town", () => {
        const world = createWorld(
            (state) => {
                setUpPriest(state, false);
                for (const spell of [SMITE_RANK_1, SMITE_RANK_2]) learnSpell(state, spell);
                state.bars[3] = SMITE_RANK_1.id;
            },
            { styles: { reagent: { isTextOn: true } } },
        );
        world.advance(3);
        expect(world.notice()).toContain("Old spell rank");
        world.state.isResting = true;
        world.fire("PLAYER_UPDATE_RESTING");
        world.advance(1);
        expect(world.notice()).toContain("Reagents running low");
        expect(world.notice()).not.toContain("Old spell rank");
    });
});

describe("a priest who knows both ranks of Prayer of Fortitude", () => {
    it("is told about the candle of the higher rank only: the lower one is not cast any more", () => {
        const world = createWorld((state) => {
            setUpPriest(state, true);
            const rank2 = { ...PRAYER_OF_FORTITUDE, id: 21564, rank: 2 };
            learnSpell(state, rank2);
            state.reagentTexts[rank2.id] = "Sacred Candle";
        });
        expect(world.notice()).toContain("Sacred Candle (0)");
        expect(world.notice()).not.toContain("Holy Candle");
    });
});
