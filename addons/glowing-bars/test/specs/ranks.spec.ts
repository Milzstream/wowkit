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
        world = createWorld((state) => setUpPriest(state, false), { styles: { oldRank: { color: [1, 0, 0] } } });
        world.advance(3);
        expect(world.notice()).toContain("|cffff0000Old spell rank|r");
    });

    it("is told nothing any more once the bar holds the best rank", () => {
        world.state.bars[1] = SMITE_RANK_2.id;
        world.fire("ACTIONBAR_SLOT_CHANGED", 1);
        // The message goes out as soon as there is nothing to say, not when its ten seconds are up
        world.advance(2.5);
        expect(world.notice()).toBe("");
    });

    it("is told nothing when the player muted the addon", () => {
        world = createWorld((state) => setUpPriest(state, false));
        world.setOption("isDisabled", true);
        // The first message went out at login; it is not repeated when muted
        world.advance(45);
        expect(world.notice()).toBe("");
    });

    it("keeps its settings in the character's saved variables", () => {
        expect(world.getSavedSettings()?.shouldStayQuietInTowns).toBe(true);
    });
});

describe("a priest with Smite rank 1 on the bar, who learns rank 2 later", () => {
    it("is told about the old rank once it is learned", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, SMITE_RANK_1);
            state.bars[1] = SMITE_RANK_1.id;
        });
        world.advance(3);
        expect(world.notice() ?? "").toBe("");
        learnSpell(world.state, SMITE_RANK_2);
        world.fire("LEARNED_SPELL_IN_SKILL_LINE", SMITE_RANK_2.id);
        world.advance(3);
        expect(world.notice()).toContain("Old spell rank");
    });
});

describe("a priest who knows Smite rank 2, with a macro for it on the bar", () => {
    function createWithMacro(body: string, spellId?: number): World {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            for (const spell of [SMITE_RANK_1, SMITE_RANK_2]) learnSpell(state, spell);
            state.isFirstRankByName = true;
            state.barMacros[1] = { body, spellId };
        });
        world.advance(3);
        return world;
    }

    for (const body of ["/cast Smite", "/cast Smite(Rank 2)", "#showtooltip\n/cast [harm] Smite(Rank 2)"]) {
        it(`is told nothing for "${body}"`, () => {
            expect(createWithMacro(body).notice() ?? "").toBe("");
        });
    }

    it("is told nothing for a macro the game gives as the spell it shows, and its button glows for that spell", () => {
        const world = createWithMacro("/cast Smite(Rank 1)", SMITE_RANK_1.id);
        expect(world.notice() ?? "").toBe("");
        expect(world.glowsOn(1)).toBe(0);
    });

    it("is told nothing either when the game says the macro casts rank 1", () => {
        expect(createWithMacro("/cast Smite", SMITE_RANK_1.id).notice() ?? "").toBe("");
    });

    it("is told nothing for a macro of a lower rank: that is on purpose", () => {
        expect(createWithMacro("/cast Smite(Rank 1)").notice() ?? "").toBe("");
    });

    it("is still told about rank 1 on another button when no macro names it", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            for (const spell of [SMITE_RANK_1, SMITE_RANK_2]) learnSpell(state, spell);
            state.isFirstRankByName = true;
            state.bars[1] = SMITE_RANK_1.id;
            state.barMacros[2] = { body: "/cast Renew" };
        });
        world.advance(3);
        expect(world.notice()).toContain("Old spell rank");
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
        world.setOption("shouldStayQuietInTowns", false);
        world.advance(3);
        expect(world.notice()).toContain("Old spell rank");
    });
});

describe("the sound of the message", () => {
    it("is silent unless the player picked one", () => {
        const world = createWorld((state) => setUpPriest(state, false));
        world.advance(3);
        expect(world.sounds.length).toBe(0);
    });

    it("is not played when the player picked none", () => {
        const world = createWorld((state) => setUpPriest(state, true), { styles: { oldRank: { sound: "none" } } });
        world.setOption("shouldStayQuietInTowns", false);
        world.advance(3);
        expect(world.sounds.length).toBe(0);
    });

    it("is played when the ranks appear, not each time the message is shown again", () => {
        const world = createWorld((state) => setUpPriest(state, false), { styles: { oldRank: { sound: "alarm1" } } });
        // the message at login played it
        expect(world.sounds.length).toBe(1);
        // no sound comes later on
        world.advance(35);
        expect(world.sounds).toEqual([18871]);
    });
});

describe("a character whose saved sound has gone from the list", () => {
    it("gets the default again: no sound", () => {
        const world = createWorld((state) => setUpPriest(state, false), { styles: { oldRank: { sound: "ping" } } });
        world.advance(3);
        expect((world.getSavedSettings()?.styles as { oldRank?: { sound?: string } } | undefined)?.oldRank?.sound).toBeUndefined();
        expect(world.sounds.length).toBe(0);
    });

    it("keeps a saved sound that is still in the list", () => {
        const world = createWorld((state) => setUpPriest(state, false), { styles: { oldRank: { sound: "raidwarning" } } });
        world.advance(3);
        expect((world.getSavedSettings()?.styles as { oldRank?: { sound?: string } } | undefined)?.oldRank?.sound).toBe("raidwarning");
        expect(world.sounds).toEqual([8959]);
    });
});

describe("the look of the old rank of a spell", () => {
    it("is the one set for the spell as an old rank", () => {
        const world = createWorld((state) => setUpPriest(state, false), { spellStyles: { "oldRank:Smite": { glowPercent: 80 } } });
        world.advance(3);
        expect(world.glowAlphasOn(1)).toEqual([0.8]);
    });

    it("does not change with a look the spell has in another type", () => {
        const world = createWorld((state) => setUpPriest(state, false), { spellStyles: { "missingBuff:Smite": { glowPercent: 90 } } });
        world.advance(3);
        expect(world.glowAlphasOn(1)).toEqual([0.5]);
    });
});
