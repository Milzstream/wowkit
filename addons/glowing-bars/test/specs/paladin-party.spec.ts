import {
    beforeEach,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    POWER,
    createWorld,
    type World,
    BLESSING_OF_KINGS,
    GREATER_BLESSING_OF_KINGS,
    PALADIN,
    SYMBOL_OF_KINGS,
    type SpellDefinition,
} from "@wowkit/test-kit";

const BLESSING_OF_MIGHT_ID = 19740;

describe("a paladin in a party", () => {
    let world!: World;

    beforeEach(() => {
        world = createWorld(
            (state) => {
                playAs(state, PALADIN);
                learnSpell(state, BLESSING_OF_KINGS);
                learnSpell(state, GREATER_BLESSING_OF_KINGS);
                state.reagentTexts[GREATER_BLESSING_OF_KINGS.id] = "Symbol of Kings";
                state.bags[SYMBOL_OF_KINGS] = 10;
                state.auras.push({ name: BLESSING_OF_KINGS.name, spellId: BLESSING_OF_KINGS.id, expirationTime: 1000 + 300 });
                state.party = [
                    { name: "Tank", classToken: "WARRIOR", power: POWER.Rage, auras: [] },
                    // Another paladin's blessing is not the player's, so Kings is still missing on this member
                    {
                        name: "Dps",
                        classToken: "WARRIOR",
                        power: POWER.Rage,
                        auras: [{ name: "Blessing of Might", spellId: BLESSING_OF_MIGHT_ID, expirationTime: 1300, sourceUnit: "party4" }],
                    },
                    {
                        name: "Healer",
                        classToken: "PRIEST",
                        power: POWER.Mana,
                        auras: [
                            { name: BLESSING_OF_KINGS.name, spellId: BLESSING_OF_KINGS.id, expirationTime: 1300, sourceUnit: "player" },
                        ],
                    },
                    { name: "Caster", classToken: "MAGE", power: POWER.Mana, auras: [] },
                ];
            },
            { styles: { buff: { isTextOn: true } } },
        );
    });

    it("is told to cast the Greater Blessing when two members of one class miss the blessing", () => {
        expect(world.notice()).toContain("Greater Blessing of Kings missing on: Tank, Dps");
    });

    it("is told to cast the single blessing when only one member of a class misses it", () => {
        expect(world.notice()).toContain("Blessing of Kings missing on: Caster");
    });

    it("counts the player's own blessing on a member", () => {
        expect(world.notice()).not.toContain("Healer");
    });
});

describe("a paladin in a party who knows Might and Wisdom", () => {
    const BLESSING_OF_MIGHT: SpellDefinition = {
        id: BLESSING_OF_MIGHT_ID,
        name: "Blessing of Might",
        rank: 1,
        icon: 135906,
        isHelpful: true,
    };
    const BLESSING_OF_WISDOM: SpellDefinition = { id: 19742, name: "Blessing of Wisdom", rank: 1, icon: 135970, isHelpful: true };
    let world!: World;

    function createPaladinWorld(spells: SpellDefinition[]): World {
        return createWorld(
            (state) => {
                playAs(state, PALADIN);
                for (const spell of spells) learnSpell(state, spell);
                state.party = [
                    { name: "Caster", classToken: "MAGE", power: POWER.Mana, auras: [] },
                    { name: "Tank", classToken: "WARRIOR", power: POWER.Rage, auras: [] },
                ];
            },
            { styles: { buff: { isTextOn: true } } },
        );
    }

    /** The player's blessing on the mage, then gone again. */
    function giveAndLose(name: string, spellId: number): void {
        world.state.party[0]!.auras.push({ name, spellId, expirationTime: 99999, sourceUnit: "player" });
        world.fire("UNIT_AURA", "party1");
        world.advance(2);
        world.state.party[0]!.auras = [];
        world.fire("UNIT_AURA", "party1");
        world.advance(2);
    }

    beforeEach(() => {
        world = createPaladinWorld([BLESSING_OF_MIGHT, BLESSING_OF_WISDOM]);
    });

    it("is asked for Wisdom on a class with mana and Might on the others before giving them one", () => {
        expect(world.notice()).toContain("Blessing of Wisdom missing on: Caster");
        expect(world.notice()).toContain("Blessing of Might missing on: Tank");
    });

    it("is asked for Kings on the ones with no mana once it is learned, still Wisdom on the others", () => {
        world = createPaladinWorld([BLESSING_OF_MIGHT, BLESSING_OF_WISDOM, BLESSING_OF_KINGS]);
        expect(world.notice()).toContain("Blessing of Wisdom missing on: Caster");
        expect(world.notice()).toContain("Blessing of Kings missing on: Tank");
    });

    it("is asked for the blessing last given to the class", () => {
        giveAndLose("Blessing of Might", BLESSING_OF_MIGHT_ID);
        expect(world.notice()).toContain("Blessing of Might missing on: Caster, Tank");
    });

    it("counts a Greater Blessing given to the class as its blessing", () => {
        giveAndLose("Greater Blessing of Might", 25782);
        expect(world.notice()).toContain("Blessing of Might missing on: Caster, Tank");
    });

    it("is asked for nothing on a member who has the player's Greater Blessing of Light: one blessing of the player each", () => {
        world.state.party[0]!.auras.push({
            name: "Greater Blessing of Light",
            spellId: 25890,
            expirationTime: 99999,
            sourceUnit: "player",
        });
        world.fire("UNIT_AURA", "party1");
        world.advance(2);
        expect(world.notice()).not.toContain("Caster");
    });
});

describe("a paladin with Might and Wisdom on the bars, and no blessing", () => {
    const MIGHT: SpellDefinition = { id: BLESSING_OF_MIGHT_ID, name: "Blessing of Might", rank: 1, icon: 135906, isHelpful: true };
    const WISDOM: SpellDefinition = { id: 19742, name: "Blessing of Wisdom", rank: 1, icon: 135970, isHelpful: true };
    const GREATER_WISDOM: SpellDefinition = { id: 25894, name: "Greater Blessing of Wisdom", rank: 1, icon: 135912, isHelpful: true };
    let world!: World;

    beforeEach(() => {
        world = createWorld((state) => {
            playAs(state, PALADIN);
            for (const spell of [MIGHT, WISDOM, GREATER_WISDOM]) learnSpell(state, spell);
            state.bars[1] = MIGHT.id;
            state.bars[2] = WISDOM.id;
        });
        world.advance(1);
    });

    it("keeps its own blessing when it gives a Greater Blessing to another class", () => {
        expect(world.glowsOn(1)).toBe(1);
        world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-guid", GREATER_WISDOM.id);
        world.advance(1);
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("goes by the blessing it had on itself", () => {
        world.state.auras.push({ name: WISDOM.name, spellId: WISDOM.id, expirationTime: 99999, sourceUnit: "player" });
        world.fire("UNIT_AURA", "player");
        world.advance(1);
        world.state.auras = [];
        world.fire("UNIT_AURA", "player");
        world.advance(1);
        expect(world.glowsOn(2)).toBe(1);
        expect(world.glowsOn(1)).toBe(0);
    });
});

describe("a paladin in a raid", () => {
    const MIGHT: SpellDefinition = { id: BLESSING_OF_MIGHT_ID, name: "Blessing of Might", rank: 1, icon: 135906, isHelpful: true };
    const WISDOM: SpellDefinition = { id: 19742, name: "Blessing of Wisdom", rank: 1, icon: 135970, isHelpful: true };
    let world!: World;

    beforeEach(() => {
        world = createWorld(
            (state) => {
                playAs(state, PALADIN);
                for (const spell of [MIGHT, WISDOM]) learnSpell(state, spell);
                state.isInRaid = true;
                state.party = [
                    { name: "Healer", classToken: "PRIEST", power: POWER.Mana, auras: [] },
                    { name: "Tank", classToken: "WARRIOR", power: POWER.Rage, auras: [] },
                ];
            },
            { styles: { buff: { isTextOn: true } } },
        );
        world.advance(1);
    });

    it("is asked for nothing on a class it has given no blessing: another paladin's", () => {
        expect(world.notice()).not.toContain("missing on");
    });

    it("is asked for the blessing it gave the class, once it is gone", () => {
        world.state.party[0]!.auras.push({ name: WISDOM.name, spellId: WISDOM.id, expirationTime: 99999, sourceUnit: "player" });
        world.fire("UNIT_AURA", "raid1");
        world.advance(2);
        expect(world.notice()).not.toContain("missing on");
        world.state.party[0]!.auras = [];
        world.fire("UNIT_AURA", "raid1");
        world.advance(2);
        expect(world.notice()).toContain("Blessing of Wisdom missing on: Healer");
        expect(world.notice()).not.toContain("Tank");
    });

    it("is asked for the Greater Blessing for one member, with the reagent in the bags", () => {
        const greater: SpellDefinition = { id: 25894, name: "Greater Blessing of Wisdom", rank: 1, icon: 135912, isHelpful: true };
        world = createWorld(
            (state) => {
                playAs(state, PALADIN);
                for (const spell of [MIGHT, WISDOM, greater]) learnSpell(state, spell);
                state.reagentTexts[greater.id] = "Symbol of Kings";
                state.bags[SYMBOL_OF_KINGS] = 10;
                state.isInRaid = true;
                state.party = [{ name: "Healer", classToken: "PRIEST", power: POWER.Mana, auras: [] }];
            },
            { styles: { buff: { isTextOn: true } } },
        );
        world.advance(1);
        world.state.party[0]!.auras.push({ name: WISDOM.name, spellId: WISDOM.id, expirationTime: 99999, sourceUnit: "player" });
        world.fire("UNIT_AURA", "raid1");
        world.advance(2);
        world.state.party[0]!.auras = [];
        world.fire("UNIT_AURA", "raid1");
        world.advance(2);
        expect(world.notice()).toContain("Greater Blessing of Wisdom missing on: Healer");
    });
});

describe("a paladin's party blessings, by class and by group", () => {
    const MIGHT: SpellDefinition = { id: BLESSING_OF_MIGHT_ID, name: "Blessing of Might", rank: 1, icon: 135906, isHelpful: true };
    const WISDOM: SpellDefinition = { id: 19742, name: "Blessing of Wisdom", rank: 1, icon: 135970, isHelpful: true };
    const GREATER_WISDOM: SpellDefinition = { id: 25894, name: "Greater Blessing of Wisdom", rank: 1, icon: 135912, isHelpful: true };

    function createPaladinWorld(classToken: string): World {
        const world = createWorld(
            (state) => {
                playAs(state, PALADIN);
                for (const spell of [MIGHT, WISDOM, GREATER_WISDOM]) learnSpell(state, spell);
                state.reagentTexts[GREATER_WISDOM.id] = "Symbol of Kings";
                state.bags[SYMBOL_OF_KINGS] = 10;
                state.party = [{ name: "Friend", classToken, power: POWER.Mana, auras: [] }];
            },
            { styles: { buff: { isTextOn: true } } },
        );
        world.advance(1);
        return world;
    }

    it("asks Might for a hunter: mana, but a weapon fighter", () => {
        expect(createPaladinWorld("HUNTER").notice()).toContain("Blessing of Might missing on: Friend");
    });

    it("asks the single blessing for one member of a class, unless the player wants the Greater one from one member", () => {
        const world = createPaladinWorld("PRIEST");
        expect(world.notice()).toContain("Blessing of Wisdom missing on: Friend");
        expect(world.notice()).not.toContain("Greater");
        world.setOption("partyGroupMin", "1");
        world.fire("GROUP_ROSTER_UPDATE");
        world.advance(2);
        expect(world.notice()).toContain("Greater Blessing of Wisdom missing on: Friend");
    });

    it("forgets the blessings given in the party once in a raid: there they are shared out again", () => {
        const world = createPaladinWorld("PRIEST");
        world.state.party[0]!.auras.push({ name: WISDOM.name, spellId: WISDOM.id, expirationTime: 99999, sourceUnit: "player" });
        world.fire("UNIT_AURA", "party1");
        world.advance(2);
        world.state.party[0]!.auras = [];
        world.state.isInRaid = true;
        world.fire("GROUP_ROSTER_UPDATE");
        world.advance(2);
        expect(world.notice()).not.toContain("missing on");
    });
});
