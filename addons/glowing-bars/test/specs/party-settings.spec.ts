import {
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    POWER,
    type ClientState,
    createWorld,
    type World,
    BLESSING_OF_KINGS,
    FORTITUDE,
    GREATER_BLESSING_OF_KINGS,
    HOLY_CANDLE,
    PALADIN,
    PRAYER_OF_FORTITUDE,
    PRIEST,
    SYMBOL_OF_KINGS,
} from "@wowkit/test-kit";

/** A priest with Fortitude on button 1 and Prayer of Fortitude on button 2, candles in the bags, and two others. */
function setUp(state: ClientState, isPlayerBuffed: boolean, isInRaid = false): void {
    playAs(state, PRIEST);
    learnSpell(state, FORTITUDE);
    learnSpell(state, PRAYER_OF_FORTITUDE);
    state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
    state.bars[1] = FORTITUDE.id;
    state.bars[2] = PRAYER_OF_FORTITUDE.id;
    state.bags[HOLY_CANDLE] = 20;
    state.isInRaid = isInRaid;
    if (isPlayerBuffed) state.auras.push({ name: FORTITUDE.name, spellId: FORTITUDE.id, expirationTime: 1000 + 1800 });
    state.party = [
        { name: "Bob", classToken: "WARRIOR", power: POWER.Rage, auras: [] },
        { name: "Alice", classToken: "MAGE", power: POWER.Mana, auras: [] },
    ];
}

function start(isPlayerBuffed: boolean, settings: Record<string, unknown> = {}, isInRaid = false): World {
    const world = createWorld((state) => setUp(state, isPlayerBuffed, isInRaid), { styles: { buff: { isTextOn: true } }, ...settings });
    world.advance(1);
    return world;
}

describe("a priest who switched the party buffs off", () => {
    it("is told about no one in a party, but still sees its own missing buff", () => {
        const world = start(false, { showPartyBuffs: false });
        expect(world.notice()).not.toContain("missing on");
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("is told nothing when someone else's Fortitude is on it", () => {
        const world = createWorld(
            (state) => {
                setUp(state, false);
                state.auras.push({ name: FORTITUDE.name, spellId: FORTITUDE.id, expirationTime: 1000 + 1800, sourceUnit: "party1" });
            },
            { showPartyBuffs: false },
        );
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("is still told about the raid", () => {
        expect(start(true, { showPartyBuffs: false }, true).notice()).toContain("Prayer of Fortitude missing on: Bob, Alice");
    });
});

describe("a priest who switched the raid buffs off", () => {
    it("is told about no one in a raid", () => {
        expect(start(true, { showRaidBuffs: false }, true).notice()).not.toContain("missing on");
    });

    it("is still told about the party", () => {
        expect(start(true, { showRaidBuffs: false }).notice()).toContain("Prayer of Fortitude missing on: Bob, Alice");
    });
});

describe("the number of members missing a buff its group version waits for", () => {
    it("is two in a party by default, the player not counted while buffed", () => {
        expect(start(true).notice()).toContain("Prayer of Fortitude missing on: Bob, Alice");
    });

    it("counts the player: three missing with the player make the group version, in place of the player's own Fortitude", () => {
        const world = start(false, { partyGroupMin: 3 });
        expect(world.notice()).toContain("Prayer of Fortitude missing on: Bob, Alice");
        expect(world.glowsOn(2)).toBe(1);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("asks for the single buff when fewer miss it than the player wants", () => {
        const world = start(true, { partyGroupMin: 3 });
        expect(world.notice()).toContain("Power Word: Fortitude missing on: Bob, Alice");
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(0);
    });

    for (const [place, isInRaid, settings] of [
        ["a party set to one", false, { partyGroupMin: 1 }],
        ["a raid", true, {}],
    ] as const) {
        it(`never asks for the group version for the player alone, in ${place}: the single buff glows, naming no one`, () => {
            const world = createWorld(
                (state) => {
                    setUp(state, false, isInRaid);
                    for (const member of state.party)
                        member.auras.push({ name: FORTITUDE.name, spellId: FORTITUDE.id, expirationTime: 99999 });
                },
                { styles: { buff: { isTextOn: true } }, ...settings },
            );
            world.advance(1);
            expect(world.glowsOn(1)).toBe(1);
            expect(world.glowsOn(2)).toBe(0);
            expect(world.notice()).not.toContain("missing on");
        });
    }

    it("is one in a raid by default", () => {
        const world = createWorld(
            (state) => {
                setUp(state, true, true);
                state.party[1]!.auras.push({ name: FORTITUDE.name, spellId: FORTITUDE.id, expirationTime: 99999 });
            },
            { styles: { buff: { isTextOn: true } } },
        );
        world.advance(1);
        expect(world.notice()).toContain("Prayer of Fortitude missing on: Bob");
    });

    it("can be set from the Settings page", () => {
        const world = start(true);
        world.setOption("partyGroupMin", "3");
        world.fire("GROUP_ROSTER_UPDATE");
        world.advance(2);
        expect(world.notice()).toContain("Power Word: Fortitude missing on: Bob, Alice");
    });
});

describe("a character that saved the old switch of a Greater Blessing for one member", () => {
    it("has it as a party group version from one member", () => {
        const world = createWorld((state) => setUp(state, true), { showGreaterForOne: true });
        world.advance(1);
        expect(world.getSavedSettings()?.partyGroupMin).toBe(1);
        expect(world.getSavedSettings()?.showGreaterForOne).toBeUndefined();
    });

    it("keeps the default without it, and a number it no longer knows is the default again", () => {
        const world = createWorld((state) => setUp(state, true), { showGreaterForOne: false, raidGroupMin: 9 });
        world.advance(1);
        expect(world.getSavedSettings()?.partyGroupMin).toBe(2);
        expect(world.getSavedSettings()?.raidGroupMin).toBe(1);
    });
});

describe("a paladin in a raid", () => {
    function setUpPaladin(state: ClientState): void {
        playAs(state, PALADIN);
        learnSpell(state, BLESSING_OF_KINGS);
        learnSpell(state, GREATER_BLESSING_OF_KINGS);
        state.reagentTexts[GREATER_BLESSING_OF_KINGS.id] = "Symbol of Kings";
        state.bags[SYMBOL_OF_KINGS] = 10;
        state.bars[1] = BLESSING_OF_KINGS.id;
        state.bars[2] = GREATER_BLESSING_OF_KINGS.id;
        state.isInRaid = true;
    }

    it("sees the single blessing when only its own is missing: a Greater one would overwrite the other paladin's", () => {
        const world = createWorld((state) => {
            setUpPaladin(state);
            state.party = [
                {
                    name: "OtherPala",
                    classToken: "PALADIN",
                    power: POWER.Mana,
                    auras: [{ name: "Blessing of Might", spellId: 19740, expirationTime: 99999, sourceUnit: "raid9" }],
                },
            ];
        });
        world.advance(1);
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("forgets the classes it buffed on leaving the raid, also with the party buffs switched off", () => {
        const world = createWorld(
            (state) => {
                setUpPaladin(state);
                state.auras.push({ name: BLESSING_OF_KINGS.name, spellId: BLESSING_OF_KINGS.id, expirationTime: 99999 });
                state.party = [{ name: "Healer", classToken: "PRIEST", power: POWER.Mana, auras: [] }];
            },
            { styles: { buff: { isTextOn: true } }, showPartyBuffs: false },
        );
        world.advance(1);
        const healer = world.state.party[0]!;
        healer.auras.push({ name: BLESSING_OF_KINGS.name, spellId: BLESSING_OF_KINGS.id, expirationTime: 99999, sourceUnit: "player" });
        world.fire("UNIT_AURA", "raid1");
        world.advance(2);
        healer.auras = [];
        world.state.isInRaid = false;
        world.fire("GROUP_ROSTER_UPDATE");
        world.advance(2);
        world.state.isInRaid = true;
        world.fire("GROUP_ROSTER_UPDATE");
        world.advance(2);
        expect(world.notice()).not.toContain("missing on");
    });
});
