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
const RECKLESSNESS: SpellDefinition = { id: 1719, name: "Recklessness", rank: 1, icon: 132109, cooldownSeconds: 300, isHelpful: true };

/** A warrior in combat with Overpower (a proc, ready) on button 1 and Recklessness (a cooldown, ready) on button 2. */
function setUpWarrior(state: ClientState): void {
    playAs(state, WARRIOR);
    for (const spell of [OVERPOWER, RECKLESSNESS]) learnSpell(state, spell);
    state.bars[1] = OVERPOWER.id;
    state.bars[2] = RECKLESSNESS.id;
    state.isInCombat = true;
}

/** Recklessness is used in the fight and comes back: the moment it glows in combat. */
function useAndRecoverRecklessness(world: World): void {
    world.state.cooldowns[RECKLESSNESS.id] = { start: 0, duration: 99999 };
    world.advance(0.5);
    world.state.cooldowns[RECKLESSNESS.id] = undefined;
    world.advance(0.5);
}

function start(savedSettings?: Record<string, unknown>): World {
    const world = createWorld(setUpWarrior, savedSettings);
    world.advance(1);
    useAndRecoverRecklessness(world);
    return world;
}

describe("the glow % of a reminder", () => {
    it("is full unless the player changed it", () => {
        const world = start();
        expect(world.glowAlphasOn(1)).toEqual([1]);
        expect(world.glowAlphasOn(2)).toEqual([1]);
    });

    it("follows the percent the player set for the type", () => {
        const world = start({ styles: { proc: { glowPercent: 30 } } });
        expect(world.glowAlphasOn(1)).toEqual([0.3]);
        expect(world.glowAlphasOn(2)).toEqual([1]);
    });

    it("follows the percent the player set for the spell, over the one of the type", () => {
        const world = start({ styles: { proc: { glowPercent: 30 } }, spellStyles: { "proc:Overpower": { glowPercent: 70 } } });
        expect(world.glowAlphasOn(1)).toEqual([0.7]);
    });

    it("is kept between 1 and 100 percent", () => {
        const world = start({ styles: { proc: { glowPercent: 500 }, readyCooldown: { glowPercent: -4 } } });
        expect(world.glowAlphasOn(1)).toEqual([1]);
        expect(world.glowAlphasOn(2)).toEqual([0.01]);
    });
});

describe("the message of a reminder", () => {
    it("is off for a proc and a cooldown unless the player switched it on", () => {
        const world = start();
        expect(world.notice()).toBe("");
    });

    it("is in the color of the glow when the player switched it on for the type", () => {
        const world = start({ styles: { proc: { isMessageOn: true } } });
        expect(world.notice()).toBe("|cffff1f14Proc|r");
    });

    it("is in the color the player picked for the spell", () => {
        const world = start({ styles: { proc: { isMessageOn: true } }, spellStyles: { "proc:Overpower": { color: [0, 1, 0] } } });
        expect(world.notice()).toBe("|cff00ff00Proc|r");
    });

    it("can be off for one spell although the type has it on", () => {
        const world = start({ styles: { proc: { isMessageOn: true } }, spellStyles: { "proc:Overpower": { isMessageOn: false } } });
        expect(world.notice()).toBe("");
    });

    it("can be on for one spell although the type has it off", () => {
        const world = start({ spellStyles: { "readyCooldown:Recklessness": { isMessageOn: true } } });
        expect(world.notice()).toBe("|cffffffffCooldown ready|r");
    });
});

describe("the sound of a reminder", () => {
    let world!: World;

    beforeEach(() => {
        world = createWorld(
            (state) => {
                setUpWarrior(state);
                state.unusableSpells[OVERPOWER.id] = true;
            },
            {
                styles: { proc: { sound: "alarm1" } },
                spellStyles: { "proc:Overpower": { sound: "raidwarning" }, "readyCooldown:Recklessness": { sound: "alarm3" } },
            },
        );
        world.advance(1);
        useAndRecoverRecklessness(world);
    });

    it("is the sound of the spell, over the one of the type", () => {
        // Recklessness is ready in combat; Overpower is not usable yet
        expect(world.sounds).toEqual([12889]);
        world.state.unusableSpells[OVERPOWER.id] = undefined;
        world.advance(0.5);
        expect(world.sounds).toEqual([12889, 8959]);
    });
});

describe("a saved look that is wrong", () => {
    it("is put right: the part that cannot be used is dropped, the rest stays", () => {
        const world = start({ styles: { proc: { sound: "ping", glowPercent: 40, color: "red" } } });
        const proc = (world.getSavedSettings()?.styles as { proc?: Record<string, unknown> }).proc!;
        expect(proc.sound).toBeUndefined();
        expect(proc.color).toBeUndefined();
        expect(proc.glowPercent).toBe(40);
    });
});
