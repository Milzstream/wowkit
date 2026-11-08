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
    ARCANE_INTELLECT,
    MAGE,
    type SpellDefinition,
} from "@wowkit/test-kit";

describe("a mage in a party", () => {
    let world!: World;

    beforeEach(() => {
        world = createWorld(
            (state) => {
                playAs(state, MAGE);
                learnSpell(state, ARCANE_INTELLECT);
                state.auras.push({ name: ARCANE_INTELLECT.name, spellId: ARCANE_INTELLECT.id, expirationTime: 1000 + 1800 });
                state.bars[1] = ARCANE_INTELLECT.id;
                state.party = [
                    { name: "Bob", classToken: "WARRIOR", power: POWER.Rage, auras: [] },
                    { name: "Alice", classToken: "PRIEST", power: POWER.Mana, auras: [] },
                    { name: "Far", classToken: "DRUID", power: POWER.Mana, auras: [], isOutOfRange: true },
                ];
            },
            { styles: { missingBuff: { isMessageOn: true } } },
        );
    });

    it("is told to buff a member who uses mana", () => {
        expect(world.notice()).toContain("Arcane Intellect missing on: Alice");
    });

    it("is not told about a member who uses rage", () => {
        expect(world.notice()).not.toContain("Bob");
    });

    it("is not told about a member who is out of range", () => {
        expect(world.notice()).not.toContain("Far");
    });
});

const FROST_ARMOR: SpellDefinition = { id: 168, name: "Frost Armor", rank: 1, icon: 135843, isHelpful: true };
const FROST_ARMOR_3: SpellDefinition = { ...FROST_ARMOR, id: 7301, rank: 3 };
const ICE_ARMOR: SpellDefinition = { id: 7302, name: "Ice Armor", rank: 1, icon: 135843, isHelpful: true };
const ICE_ARMOR_3: SpellDefinition = { ...ICE_ARMOR, id: 10219, rank: 3 };

/** A mage who knows both armors (Ice Armor in its higher ranks), each on a bar, with the given armor on them. */
function createArmorWorld(armor: SpellDefinition | undefined): World {
    return createWorld((state) => {
        playAs(state, MAGE);
        for (const spell of [FROST_ARMOR, FROST_ARMOR_3, ICE_ARMOR, ICE_ARMOR_3]) learnSpell(state, spell);
        state.bars[1] = FROST_ARMOR_3.id;
        state.bars[2] = ICE_ARMOR_3.id;
        if (armor !== undefined) state.auras.push({ name: armor.name, spellId: armor.id, expirationTime: 1000 + 1800 });
    });
}

describe("a mage with Frost Armor and Ice Armor on the bars", () => {
    it("is told to put on one armor when none is on", () => {
        const world = createArmorWorld(undefined);
        expect(world.glowsOn(1) + world.glowsOn(2)).toBe(1);
    });

    it("sees no glow with Ice Armor on, whatever its rank", () => {
        const world = createArmorWorld(ICE_ARMOR_3);
        expect([world.glowsOn(1), world.glowsOn(2)]).toEqual([0, 0]);
    });

    it("sees no glow with Frost Armor on, whatever its rank", () => {
        const world = createArmorWorld(FROST_ARMOR_3);
        expect([world.glowsOn(1), world.glowsOn(2)]).toEqual([0, 0]);
    });
});
