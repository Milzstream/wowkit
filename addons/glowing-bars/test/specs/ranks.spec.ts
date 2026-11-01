import {
    beforeEach,
    createWorld,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    PRIEST,
    SMITE_RANK_1,
    SMITE_RANK_2,
    type ClientState,
    type World,
} from "@wowkit/test-kit";

/** A priest who knows Smite rank 2 and has rank 1 on the first button. */
function setUpPriest(state: ClientState, isResting: boolean): void {
    playAs(state, PRIEST);
    for (const spell of [SMITE_RANK_1, SMITE_RANK_2]) learnSpell(state, spell);
    state.bars[1] = SMITE_RANK_1.id;
    state.isResting = isResting;
}

describe("a priest with Smite rank 1 on the bar, who knows rank 2", () => {
    let world!: World;

    beforeEach(() => {
        world = createWorld((state) => setUpPriest(state, false));
        world.advance(3);
    });

    it("is told about both ranks", () => {
        expect(world.notice()).toContain("Old spell rank");
    });

    it("sees the message in the yellow of the glow, and the old rank glow quiet", () => {
        expect(world.notice()).toContain("|cffffd933Old spell rank|r");
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowAlphasOn(1)).toEqual([0.5]);
    });

    it("sees the message in the color the player picked for it", () => {
        world = createWorld((state) => setUpPriest(state, false), { styles: { rank: { color: [1, 0, 0] } } });
        world.advance(3);
        expect(world.notice()).toContain("|cffff0000Old spell rank|r");
    });

    it("is told nothing any more once the bar holds the best rank", () => {
        world.state.bars[1] = SMITE_RANK_2.id;
        world.fire("ACTIONBAR_SLOT_CHANGED", 1);
        // The message goes out as soon as there is nothing to say, not when its ten seconds are up
        world.advance(2);
        expect(world.notice()).toBe("");
    });

    it("is told nothing when the player muted the addon", () => {
        world = createWorld((state) => setUpPriest(state, false));
        world.setOption("isMuted", true);
        // The first message went out at login; it is not repeated when muted
        world.advance(45);
        expect(world.notice()).toBe("");
    });

    it("keeps its settings in the character's saved variables", () => {
        expect(world.getSavedSettings()?.hideResting).toBe(true);
    });
});

describe("a priest resting in a town", () => {
    it("is told nothing by default", () => {
        const world = createWorld((state) => setUpPriest(state, true));
        world.advance(3);
        expect(world.notice()).toBe("");
    });

    it("is told when the player switched the quiet mode off", () => {
        const world = createWorld((state) => setUpPriest(state, true));
        world.setOption("hideResting", false);
        world.advance(3);
        expect(world.notice()).toContain("Old spell rank");
    });
});

describe("the sound of the message", () => {
    it("is the alarm clock 1 unless the player picked another", () => {
        const world = createWorld((state) => setUpPriest(state, false));
        world.advance(3);
        expect(world.sounds).toEqual([18871]);
    });

    it("is not played when the player picked none", () => {
        const world = createWorld((state) => setUpPriest(state, true), { styles: { rank: { sound: "none" } } });
        world.setOption("hideResting", false);
        world.advance(3);
        expect(world.sounds.length).toBe(0);
    });

    it("is played when the ranks appear, not each time the message is shown again", () => {
        const world = createWorld((state) => setUpPriest(state, false));
        // the message at login played the default
        expect(world.sounds.length).toBe(1);
        // no sound comes later on
        world.advance(35);
        expect(world.sounds).toEqual([18871]);
    });
});

describe("a character whose saved sound has gone from the list", () => {
    it("gets the default sound again", () => {
        const world = createWorld((state) => setUpPriest(state, false), { styles: { rank: { sound: "ping" } } });
        world.advance(3);
        expect((world.getSavedSettings()?.styles as { rank?: { sound?: string } } | undefined)?.rank?.sound).toBeUndefined();
        expect(world.sounds).toEqual([18871]);
    });

    it("keeps a saved sound that is still in the list", () => {
        const world = createWorld((state) => setUpPriest(state, false), { styles: { rank: { sound: "raidwarning" } } });
        world.advance(3);
        expect((world.getSavedSettings()?.styles as { rank?: { sound?: string } } | undefined)?.rank?.sound).toBe("raidwarning");
        expect(world.sounds).toEqual([8959]);
    });
});

describe("the look of the old rank of a spell", () => {
    it("is the one set for the spell as an old rank", () => {
        const world = createWorld((state) => setUpPriest(state, false), { spellStyles: { "rank:Smite": { opacity: 80 } } });
        world.advance(3);
        expect(world.glowAlphasOn(1)).toEqual([0.8]);
    });

    it("does not change with a look the spell has in another kind", () => {
        const world = createWorld((state) => setUpPriest(state, false), { spellStyles: { "buff:Smite": { opacity: 90 } } });
        world.advance(3);
        expect(world.glowAlphasOn(1)).toEqual([0.5]);
    });
});
