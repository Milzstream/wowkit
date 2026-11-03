import {
    beforeEach,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    createWorld,
    type World,
    BLESSING_OF_KINGS,
    PALADIN,
    type SpellDefinition,
} from "@wowkit/test-kit";
import { switchInTable } from "./table.helpers";

const RIGHTEOUSNESS: SpellDefinition = { id: 20154, name: "Seal of Righteousness", rank: 1, icon: 132325, isHelpful: true };
const CRUSADER: SpellDefinition = { id: 21082, name: "Seal of the Crusader", rank: 1, icon: 135924, isHelpful: true };
const JUDGEMENT: SpellDefinition = { id: 20271, name: "Judgement", rank: 1, icon: 135959, isHelpful: false };

describe("a paladin with two seals on the bars", () => {
    let world!: World;

    function cast(spell: SpellDefinition): void {
        world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-guid", spell.id);
        world.advance(0.5);
    }

    // In a fight the game hides the auras: the addon goes by the casts
    function startFight(): void {
        world.state.isInCombat = true;
        world.state.areAurasHidden = true;
        world.fire("PLAYER_REGEN_DISABLED");
        world.advance(1);
    }

    beforeEach(() => {
        world = createWorld((state) => {
            playAs(state, PALADIN);
            for (const spell of [RIGHTEOUSNESS, CRUSADER, JUDGEMENT]) learnSpell(state, spell);
            state.bars[1] = RIGHTEOUSNESS.id;
            state.bars[2] = CRUSADER.id;
            state.bars[3] = JUDGEMENT.id;
        });
        world.advance(1);
    });

    it("sees no seal glow out of combat", () => {
        expect(world.glowsOn(1)).toBe(0);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("sees the first seal on the bars glow in a fight before using one, with no talent points to go by", () => {
        startFight();
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("sees the seal of the main talent tree glow before using one: Retribution wants Seal of Righteousness here", () => {
        world.state.talentPoints = [0, 5, 31];
        world.state.bars[1] = CRUSADER.id;
        world.state.bars[2] = RIGHTEOUSNESS.id;
        world.fire("ACTIONBAR_SLOT_CHANGED", 1);
        world.fire("ACTIONBAR_SLOT_CHANGED", 2);
        startFight();
        world.advance(1);
        expect(world.glowsOn(2)).toBe(1);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("sees no seal glow once one is cast, until its 30 seconds are over", () => {
        startFight();
        cast(CRUSADER);
        expect(world.glowsOn(1)).toBe(0);
        expect(world.glowsOn(2)).toBe(0);
        world.advance(31);
        // The seal used last is the one to put on again
        expect(world.glowsOn(2)).toBe(1);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("sees the seal glow a global cooldown before it runs out, to cast the next one in time", () => {
        startFight();
        cast(CRUSADER);
        // 27.5 seconds after the cast: 2.5 left
        world.advance(27);
        expect(world.glowsOn(2)).toBe(0);
        // 29 seconds after the cast: 1 left
        world.advance(1.5);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("keeps the seal up after a Judgement: in Forever it does not use the seal up", () => {
        startFight();
        cast(RIGHTEOUSNESS);
        cast(JUDGEMENT);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("sees no seal glow once the seals are switched off in the table", () => {
        switchInTable(world, "Missing seal", false);
        startFight();
        cast(RIGHTEOUSNESS);
        world.advance(31);
        expect(world.glowsOn(1)).toBe(0);
    });
});

describe("a paladin who cancels an aura in a fight", () => {
    const DEVOTION_AURA: SpellDefinition = { id: 465, name: "Devotion Aura", rank: 1, icon: 135893, isHelpful: true };
    let world!: World;

    beforeEach(() => {
        world = createWorld((state) => {
            playAs(state, PALADIN);
            learnSpell(state, DEVOTION_AURA);
            learnSpell(state, BLESSING_OF_KINGS);
            state.bars[1] = DEVOTION_AURA.id;
            state.auras.push({ name: DEVOTION_AURA.name, spellId: DEVOTION_AURA.id, expirationTime: 99999 });
            state.auras.push({ name: BLESSING_OF_KINGS.name, spellId: BLESSING_OF_KINGS.id, expirationTime: 99999 });
        });
        world.advance(1);
        world.state.isInCombat = true;
        world.fire("PLAYER_REGEN_DISABLED");
        world.advance(1);
    });

    it("sees it glow when the game shows the auras and it is gone", () => {
        expect(world.glowsOn(1)).toBe(0);
        world.state.auras = world.state.auras.filter((aura) => aura.name !== DEVOTION_AURA.name);
        world.fire("UNIT_AURA", "player");
        world.advance(1);
        expect(world.glowsOn(1)).toBe(1);
    });

    it("still counts it while the game hides the auras", () => {
        world.state.areAurasHidden = true;
        world.fire("UNIT_AURA", "player");
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
    });
});

describe("a paladin who added a seal of Forever by its ID", () => {
    const SEAL_OF_THE_DAWN: SpellDefinition = { id: 1310500, name: "Seal of the Dawn", rank: 1, icon: 135924, isHelpful: true };
    let world!: World;

    beforeEach(() => {
        world = createWorld(
            (state) => {
                playAs(state, PALADIN);
                learnSpell(state, SEAL_OF_THE_DAWN);
                state.bars[1] = SEAL_OF_THE_DAWN.id;
            },
            { addedSpells: [{ id: SEAL_OF_THE_DAWN.id, reminderType: "seal" }] },
        );
        world.state.isInCombat = true;
        world.state.areAurasHidden = true;
        world.fire("PLAYER_REGEN_DISABLED");
        world.advance(1);
    });

    it("sees it glow 30 seconds after it is cast", () => {
        // The only seal on the bars: it glows before it is cast too
        expect(world.glowsOn(1)).toBe(1);
        world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-guid", SEAL_OF_THE_DAWN.id);
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
        world.advance(30);
        expect(world.glowsOn(1)).toBe(1);
    });
});

describe("a paladin who uses Swift Judgement in a fight", () => {
    const SWIFT_JUDGEMENT: SpellDefinition = {
        id: 1310994,
        name: "Swift Judgement",
        rank: 1,
        icon: 135959,
        cooldownSeconds: 60,
        isHelpful: true,
    };
    const JUDGEMENT_SPELL: SpellDefinition = { id: 20271, name: "Judgement", rank: 1, icon: 135959, cooldownSeconds: 10, isHelpful: false };
    let world!: World;

    function cast(spell: SpellDefinition): void {
        world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-guid", spell.id);
        world.advance(0.5);
    }

    beforeEach(() => {
        world = createWorld((state) => {
            playAs(state, PALADIN);
            for (const spell of [SWIFT_JUDGEMENT, JUDGEMENT_SPELL]) learnSpell(state, spell);
            state.bars[1] = SWIFT_JUDGEMENT.id;
            state.bars[2] = JUDGEMENT_SPELL.id;
            state.isInCombat = true;
        });
        world.fire("PLAYER_REGEN_DISABLED");
        world.advance(1);
    });

    it("has its cooldown start with the next Judgement, however long that takes, while the game hides the cooldowns", () => {
        world.state.areCooldownsHidden = true;
        cast(SWIFT_JUDGEMENT);
        // No Judgement for two minutes: the buff waits, so the cooldown has not even started
        world.advance(120);
        expect(world.glowsOn(1)).toBe(0);
        cast(JUDGEMENT_SPELL);
        world.advance(58);
        expect(world.glowsOn(1)).toBe(0);
        // A minute after the Judgement it is back
        world.advance(2);
        expect(world.glowsOn(1)).toBe(1);
    });

    it("does not take the game's word that it is ready while it waits for the Judgement", () => {
        // The cooldown has not started, so the game shows none
        cast(SWIFT_JUDGEMENT);
        world.advance(2);
        expect(world.glowsOn(1)).toBe(0);
    });
});

describe("a paladin who cancels the aura out of combat, with a target", () => {
    const DEVOTION_AURA: SpellDefinition = { id: 465, name: "Devotion Aura", rank: 1, icon: 135893, isHelpful: true };

    it("sees the aura glow: the game shows the auras out of combat, an empty list is no aura", () => {
        const world = createWorld((state) => {
            playAs(state, PALADIN);
            learnSpell(state, DEVOTION_AURA);
            state.bars[1] = DEVOTION_AURA.id;
            state.auras.push({ name: DEVOTION_AURA.name, spellId: DEVOTION_AURA.id, expirationTime: 0 });
            state.target = { name: "Training Dummy", isEnemy: true } as never;
        });
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
        world.state.auras = [];
        world.fire("UNIT_AURA", "player");
        world.advance(1);
        expect(world.glowsOn(1)).toBe(1);
    });
});
