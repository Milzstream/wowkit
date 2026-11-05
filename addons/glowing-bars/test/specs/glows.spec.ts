import {
    beforeEach,
    createWorld,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    WARRIOR,
    type ClientState,
    type SpellDefinition,
    type World,
} from "@wowkit/test-kit";

const OVERPOWER: SpellDefinition = { id: 7384, name: "Overpower", rank: 1, icon: 132223, maxRange: 5, isHarmful: true };
const REVENGE: SpellDefinition = { id: 6572, name: "Revenge", rank: 1, icon: 132353, maxRange: 5, isHarmful: true };
const RECKLESSNESS: SpellDefinition = { id: 1719, name: "Recklessness", rank: 1, icon: 132109, cooldownSeconds: 300, isHelpful: true };

/** A warrior with Overpower on button 1 and Recklessness on button 2. */
function setUpWarrior(state: ClientState): void {
    playAs(state, WARRIOR);
    for (const spell of [OVERPOWER, RECKLESSNESS]) learnSpell(state, spell);
    state.bars[1] = OVERPOWER.id;
    state.bars[2] = RECKLESSNESS.id;
    state.unusableSpells[OVERPOWER.id] = true;
}

describe("a warrior in a stance where Overpower and Revenge cannot be used", () => {
    let world!: World;

    beforeEach(() => {
        world = createWorld((state) => {
            setUpWarrior(state);
            learnSpell(state, REVENGE);
            state.bars[3] = REVENGE.id;
            state.unusableSpells[REVENGE.id] = true;
        });
        world.advance(1);
    });

    it("sees Overpower glow while the combo point of a dodge is up, and stop once it goes", () => {
        world.state.comboPoints = 1;
        world.fire("UNIT_POWER_UPDATE", "player", "COMBO_POINTS");
        world.advance(0.1);
        expect(world.glowsOn(1)).toBe(1);
        world.state.comboPoints = 0;
        world.fire("UNIT_POWER_UPDATE", "player", "COMBO_POINTS");
        world.advance(0.1);
        expect(world.glowsOn(1)).toBe(0);
    });

    for (const [action, flagText] of [
        ["DODGE", ""],
        ["PARRY", ""],
        ["BLOCK", ""],
        ["WOUND", "BLOCK"],
    ]) {
        it(`sees Revenge glow after "${action} ${flagText}", for five seconds`, () => {
            world.fire("UNIT_COMBAT", "player", action, flagText, 0, 1);
            world.advance(0.1);
            expect(world.glowsOn(3)).toBe(1);
            world.advance(5.5);
            expect(world.glowsOn(3)).toBe(0);
        });
    }

    it("sees no Revenge glow when the target dodges, or when the player is only hit", () => {
        world.fire("UNIT_COMBAT", "target", "DODGE", "", 0, 1);
        world.fire("UNIT_COMBAT", "player", "WOUND", "", 120, 1);
        world.advance(0.6);
        expect(world.glowsOn(3)).toBe(0);
    });

    it("loses the Revenge glow once it is cast", () => {
        world.fire("UNIT_COMBAT", "player", "PARRY", "", 0, 1);
        world.advance(0.1);
        world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-1", REVENGE.id);
        world.advance(0.6);
        expect(world.glowsOn(3)).toBe(0);
    });
});

describe("a warrior with Overpower and Recklessness on the bars", () => {
    let world!: World;

    beforeEach(() => {
        world = createWorld(setUpWarrior);
        world.advance(1);
    });

    it("sees no glow on Overpower until the game says it can be used", () => {
        expect(world.glowsOn(1)).toBe(0);
        world.state.unusableSpells[OVERPOWER.id] = undefined;
        world.advance(0.5);
        expect(world.glowsOn(1)).toBe(1);
    });

    it("loses the glow of Overpower when it goes on cooldown", () => {
        world.state.unusableSpells[OVERPOWER.id] = undefined;
        world.advance(0.5);
        world.state.cooldowns[OVERPOWER.id] = { start: 0, duration: 99999 };
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("does not light Recklessness in combat before it has been used in the fight", () => {
        world.state.isInCombat = true;
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("lights Recklessness in combat once it is back after it was used in the fight", () => {
        world.state.isInCombat = true;
        world.state.cooldowns[RECKLESSNESS.id] = { start: 0, duration: 99999 };
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(0);
        world.state.cooldowns[RECKLESSNESS.id] = undefined;
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("lights Recklessness in combat when it comes back from a cooldown it was on as the fight started", () => {
        world.state.cooldowns[RECKLESSNESS.id] = { start: 0, duration: 99999 };
        world.advance(0.5);
        world.state.isInCombat = true;
        world.fire("PLAYER_REGEN_DISABLED");
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(0);
        world.state.cooldowns[RECKLESSNESS.id] = undefined;
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("glows for 3 seconds once Recklessness is back, not until it is pressed", () => {
        world.state.isInCombat = true;
        world.state.cooldowns[RECKLESSNESS.id] = { start: 0, duration: 99999 };
        world.advance(0.5);
        world.state.cooldowns[RECKLESSNESS.id] = undefined;
        world.advance(2.5);
        expect(world.glowsOn(2)).toBe(1);
        world.advance(1);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("glows for 1 second once Recklessness is back, when the player chose the shortest", () => {
        world = createWorld(setUpWarrior, { styles: { readyCooldown: { glowTime: 1 } } });
        world.state.isInCombat = true;
        world.state.cooldowns[RECKLESSNESS.id] = { start: 0, duration: 99999 };
        world.advance(0.5);
        world.state.cooldowns[RECKLESSNESS.id] = undefined;
        world.advance(0.6);
        expect(world.glowsOn(2)).toBe(1);
        world.advance(1);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("glows until it is pressed when the player chose so", () => {
        world = createWorld(setUpWarrior, { styles: { readyCooldown: { glowTime: 0 } } });
        world.state.isInCombat = true;
        world.state.cooldowns[RECKLESSNESS.id] = { start: 0, duration: 99999 };
        world.advance(0.5);
        world.state.cooldowns[RECKLESSNESS.id] = undefined;
        world.advance(30);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("lights the ready Recklessness as the fight starts when the player asked for it, for the glow time", () => {
        world.setOption("showCooldownsAtFightStart", true);
        world.state.isInCombat = true;
        world.fire("PLAYER_REGEN_DISABLED");
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(1);
        world.advance(3);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("does not light the ready Recklessness as the fight starts by default", () => {
        world.state.isInCombat = true;
        world.fire("PLAYER_REGEN_DISABLED");
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("forgets the cooldowns of the last fight when a new one starts", () => {
        world.state.isInCombat = true;
        world.state.cooldowns[RECKLESSNESS.id] = { start: 0, duration: 99999 };
        world.advance(0.5);
        world.state.cooldowns[RECKLESSNESS.id] = undefined;
        world.advance(0.5);
        world.state.isInCombat = false;
        world.fire("PLAYER_REGEN_ENABLED");
        world.advance(0.5);
        world.state.isInCombat = true;
        world.fire("PLAYER_REGEN_DISABLED");
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("lights Recklessness out of combat when the player chose it to show always", () => {
        world = createWorld(setUpWarrior, { styles: { readyCooldown: { when: "always" } } });
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("puts the glow out while Recklessness is on cooldown", () => {
        world.state.isInCombat = true;
        world.state.cooldowns[RECKLESSNESS.id] = { start: 0, duration: 99999 };
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("puts the glow out at the cast, before the client tells the cooldown", () => {
        world.state.isInCombat = true;
        world.advance(0.5);
        world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-1", RECKLESSNESS.id);
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("has the glow back when the cooldown is over", () => {
        world.state.isInCombat = true;
        world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-1", RECKLESSNESS.id);
        world.state.cooldowns[RECKLESSNESS.id] = { start: 0, duration: 99999 };
        world.advance(1);
        expect(world.glowsOn(2)).toBe(0);
        world.state.cooldowns[RECKLESSNESS.id] = undefined;
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("lights no cooldown the player switched off", () => {
        world = createWorld(setUpWarrior, { enabledSpells: { "1719": false } });
        world.advance(1);
        world.state.isInCombat = true;
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("lights no cooldown when the player switched the cooldown glows off", () => {
        world = createWorld(setUpWarrior, { isReadyCooldownEnabled: false });
        world.advance(1);
        world.state.isInCombat = true;
        world.advance(0.5);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("lights nothing when the player disabled the addon on this character", () => {
        world.setOption("isDisabled", true);
        world.state.isInCombat = true;
        world.state.unusableSpells[OVERPOWER.id] = undefined;
        world.advance(0.5);
        expect(world.glowsOn(1) + world.glowsOn(2)).toBe(0);
    });
});

describe("an orc warrior with Blood Fury on the bars", () => {
    const BLOOD_FURY: SpellDefinition = { id: 20572, name: "Blood Fury", rank: 1, icon: 135726, cooldownSeconds: 120, isHelpful: true };

    it("sees Blood Fury glow when it is back in a fight, like the cooldowns of the class", () => {
        const world = createWorld((state) => {
            playAs(state, WARRIOR);
            learnSpell(state, BLOOD_FURY);
            state.bars[3] = BLOOD_FURY.id;
            state.isInCombat = true;
        });
        world.state.cooldowns[BLOOD_FURY.id] = { start: 0, duration: 99999 };
        world.advance(0.5);
        expect(world.glowsOn(3)).toBe(0);
        world.state.cooldowns[BLOOD_FURY.id] = undefined;
        world.advance(0.5);
        expect(world.glowsOn(3)).toBe(1);
    });
});

describe("a warrior who added Recklessness as a cooldown and as a proc", () => {
    it("still has the page in the Settings panel", () => {
        const world = createWorld((state) => playAs(state, WARRIOR), {
            addedSpells: [
                { id: 1719, reminderType: "readyCooldown" },
                { id: 1719, reminderType: "proc" },
            ],
        });
        expect(world.proxySettings["GlowingBars_isDisabled"]).toBeDefined();
    });
});

describe("a warrior who saved a glow time", () => {
    it("keeps one of the choices after a reload, and drops another", () => {
        const world = createWorld(setUpWarrior, { styles: { readyCooldown: { glowTime: 1 }, missingBuff: { glowTime: 7 } } });
        const styles = world.getSavedSettings()?.styles as Record<string, { glowTime?: number } | undefined>;
        expect(styles.readyCooldown?.glowTime).toBe(1);
        expect(styles.missingBuff?.glowTime).toBeUndefined();
    });
});
