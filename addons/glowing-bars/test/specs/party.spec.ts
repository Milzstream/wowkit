import {
    beforeEach,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    POWER,
    type ClientState,
    createWorld,
    type World,
    FORTITUDE,
    HOLY_CANDLE,
    PRAYER_OF_FORTITUDE,
    PRIEST,
} from "@wowkit/test-kit";

/** A priest with Fortitude on button 1 and Prayer of Fortitude on button 2, in a party of three. */
function setUpPartyOfThree(state: ClientState, isResting: boolean): void {
    playAs(state, PRIEST);
    learnSpell(state, FORTITUDE);
    learnSpell(state, PRAYER_OF_FORTITUDE);
    state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
    state.bars[1] = FORTITUDE.id;
    state.bars[2] = PRAYER_OF_FORTITUDE.id;
    state.bags[HOLY_CANDLE] = 0;
    state.isResting = isResting;
    state.party = [
        { name: "Bob", classToken: "WARRIOR", power: POWER.Rage, auras: [] },
        { name: "Alice", classToken: "MAGE", power: POWER.Mana, auras: [] },
        { name: "Dead", classToken: "ROGUE", power: POWER.Energy, auras: [], isDead: true },
    ];
}

describe("a priest in a party", () => {
    let world!: World;

    describe("out of town, with no candles", () => {
        beforeEach(() => {
            world = createWorld(
                (state) => {
                    setUpPartyOfThree(state, false);
                    // Another priest's Prayer of Fortitude is on the player
                    state.auras.push({ name: PRAYER_OF_FORTITUDE.name, spellId: PRAYER_OF_FORTITUDE.id, expirationTime: 1000 + 3600 });
                },
                { styles: { missingBuff: { isMessageOn: true } } },
            );
            world.advance(1);
        });

        it("is told to cast the single buff on the members who miss it", () => {
            expect(world.notice()).toContain("Power Word: Fortitude missing on: Bob, Alice");
        });

        it("is not told about members who are dead", () => {
            expect(world.notice()).not.toContain("Dead");
        });

        it("sees the buff glow on its button", () => {
            expect(world.glowsOn(1)).toBe(1);
        });

        it("is told to cast the group version once there are candles", () => {
            world.state.bags[HOLY_CANDLE] = 20;
            world.fire("GROUP_ROSTER_UPDATE");
            world.advance(2);
            expect(world.notice()).toContain("Prayer of Fortitude missing on: Bob, Alice");
        });

        it("sees the group version glow on its button", () => {
            world.state.bags[HOLY_CANDLE] = 20;
            world.fire("GROUP_ROSTER_UPDATE");
            world.advance(2);
            expect(world.glowsOn(2)).toBe(1);
        });

        // The party is read once a second; a change of the roster must not wait for that
        it("is told at once when a member gets the buff from someone else", () => {
            world.state.party[1]?.auras.push(world.makeAura(FORTITUDE.name, FORTITUDE.id, 1800));
            world.fire("GROUP_ROSTER_UPDATE");
            world.advance(0.1);
            expect(world.notice()).toContain("Power Word: Fortitude missing on: Bob");
            expect(world.notice()).not.toContain("Alice");
        });

        it("is told about the single buff again when only one member misses it", () => {
            world.state.bags[HOLY_CANDLE] = 20;
            world.state.party[1]?.auras.push(world.makeAura(FORTITUDE.name, FORTITUDE.id, 1800));
            world.fire("GROUP_ROSTER_UPDATE");
            world.advance(2);
            expect(world.notice()).toContain("Power Word: Fortitude missing on: Bob");
            expect(world.notice()).not.toContain("Alice");
        });

        it("does not look at the party in combat, when the game hides other people's auras", () => {
            // Without candles Prayer of Fortitude would glow as a low reagent, which shows in combat too
            world.state.bags[HOLY_CANDLE] = 20;
            world.state.isInCombat = true;
            world.fire("GROUP_ROSTER_UPDATE");
            world.advance(2);
            expect(world.glowsOn(1)).toBe(0);
            expect(world.glowsOn(2)).toBe(0);
        });
    });
});

describe("a priest alone", () => {
    it("counts another priest's Prayer of Fortitude as Fortitude", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            state.bars[1] = FORTITUDE.id;
            state.auras.push({ name: PRAYER_OF_FORTITUDE.name, spellId: PRAYER_OF_FORTITUDE.id, expirationTime: 1000 + 3600 });
        });
        expect(world.glowsOn(1)).toBe(0);
    });

    // The client names spells in the player's language; the buffs that count for each other must not depend on English
    describe("on a Spanish client", () => {
        const FORTITUDE_ES = { ...FORTITUDE, name: "Palabra de poder: Entereza" };
        const PRAYER_OF_FORTITUDE_ES = { ...PRAYER_OF_FORTITUDE, name: "Rezo de entereza" };

        function createSpanishPriest(hasPrayer: boolean): World {
            return createWorld((state) => {
                playAs(state, PRIEST);
                learnSpell(state, FORTITUDE_ES);
                state.spells[PRAYER_OF_FORTITUDE_ES.id] = PRAYER_OF_FORTITUDE_ES;
                state.bars[1] = FORTITUDE_ES.id;
                if (hasPrayer) {
                    state.auras.push({
                        name: PRAYER_OF_FORTITUDE_ES.name,
                        spellId: PRAYER_OF_FORTITUDE_ES.id,
                        expirationTime: 1000 + 3600,
                    });
                }
            });
        }

        it("counts the group version as the single buff", () => {
            expect(createSpanishPriest(true).glowsOn(1)).toBe(0);
        });

        it("still asks for the buff when neither is up", () => {
            expect(createSpanishPriest(false).glowsOn(1)).toBe(1);
        });
    });
});

describe("a priest in a raid with candles", () => {
    function createRaidWorld(hasOtherFortitude: boolean): World {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, FORTITUDE);
                learnSpell(state, PRAYER_OF_FORTITUDE);
                state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
                state.bags[HOLY_CANDLE] = 20;
                state.auras.push({ name: FORTITUDE.name, spellId: FORTITUDE.id, expirationTime: 1000 + 1800 });
                state.isInRaid = true;
                for (let i = 1; i <= 7; i++) {
                    // Another priest's Fortitude counts as well: two do not stack
                    const auras = hasOtherFortitude
                        ? [{ name: FORTITUDE.name, spellId: FORTITUDE.id, expirationTime: 1000 + 1800, sourceUnit: "raid9" }]
                        : [];
                    state.party.push({ name: `Member${i}`, classToken: "WARRIOR", power: POWER.Rage, auras });
                }
            },
            { styles: { missingBuff: { isMessageOn: true } } },
        );
        world.advance(1);
        return world;
    }

    it("is told to cast the group version on the raid, counting the members rather than naming them", () => {
        expect(createRaidWorld(false).notice()).toContain("Prayer of Fortitude missing on 7 members");
    });

    it("is told nothing when another priest has buffed the raid", () => {
        expect(createRaidWorld(true).notice()).not.toContain("missing on");
    });
});
