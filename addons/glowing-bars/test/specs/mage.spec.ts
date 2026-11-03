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
