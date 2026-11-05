import {
    beforeEach,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    createWorld,
    type World,
    LIGHTNING_SHIELD,
    ROCKBITER_WEAPON,
    SHAMAN,
    type ClientState,
} from "@wowkit/test-kit";

const MAIN_HAND = 16;
/** The game's ID of the Alarm clock 2 sound. */
const ALARM_SOUND = 12867;
const ONE_HOUR_MS = 3600 * 1000;

describe("a shaman", () => {
    let world!: World;

    // Rockbiter is on button 3, Lightning Shield on button 4; a weapon is equipped and nothing is on it.
    // The world is two seconds into the session: a missing weapon buff must hold for a moment to count.
    function setUpShaman(state: ClientState): void {
        playAs(state, SHAMAN);
        learnSpell(state, ROCKBITER_WEAPON);
        learnSpell(state, LIGHTNING_SHIELD);
        state.bars[3] = ROCKBITER_WEAPON.id;
        state.bars[4] = LIGHTNING_SHIELD.id;
        state.equippedItems[MAIN_HAND] = 1234;
    }

    beforeEach(() => {
        world = createWorld(setUpShaman);
        world.advance(2);
    });

    describe("without a weapon buff or a shield", () => {
        it("sees the weapon buff glow", () => {
            expect(world.glowsOn(3)).toBe(1);
        });

        it("sees the shield glow too", () => {
            expect(world.glowsOn(4)).toBe(1);
        });

        it("hears no sound by default", () => {
            world.advance(2);
            expect(world.sounds.length).toBe(0);
        });

        it("hears a sound the player picked, once", () => {
            const withSound = createWorld(setUpShaman, { styles: { weaponBuff: { sound: "alarm2" } } });
            withSound.advance(4);
            expect(withSound.sounds).toEqual([ALARM_SOUND]);
        });
    });

    describe("casting the shield", () => {
        beforeEach(() => {
            world.state.auras.push(world.makeAura(LIGHTNING_SHIELD.name, LIGHTNING_SHIELD.id, 600));
            world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-guid", LIGHTNING_SHIELD.id);
            world.advance(0.5);
        });

        it("puts the shield glow out", () => {
            expect(world.glowsOn(4)).toBe(0);
        });

        // A cast of another spell must not be taken for putting on the weapon buff
        it("leaves the weapon glow on", () => {
            expect(world.glowsOn(3)).toBe(1);
        });
    });

    describe("the weapon buff", () => {
        // The game reads the enchant a moment after the cast: the cast alone must put the glow out
        it("puts the glow out at the cast, before the enchant shows on the weapon", () => {
            world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-guid", ROCKBITER_WEAPON.id);
            world.advance(0.5);
            expect(world.glowsOn(3)).toBe(0);
        });

        it("puts the glow out when the game says the enchant changed, before the weapon shows it", () => {
            world.fire("WEAPON_ENCHANT_CHANGED");
            world.advance(1);
            expect(world.glowsOn(3)).toBe(0);
        });

        it("puts the glow out once it is on the weapon", () => {
            world.state.enchants[MAIN_HAND] = { enchantID: 1, remainingTimeMs: ONE_HOUR_MS };
            world.fire("WEAPON_ENCHANT_CHANGED");
            world.advance(1);
            expect(world.glowsOn(3)).toBe(0);
        });

        it("makes the glow come back when it is about to run out", () => {
            world.state.enchants[MAIN_HAND] = { enchantID: 1, remainingTimeMs: ONE_HOUR_MS };
            world.fire("WEAPON_ENCHANT_CHANGED");
            world.advance(1);
            world.state.enchants[MAIN_HAND] = { enchantID: 1, remainingTimeMs: 20 * 1000 };
            world.advance(1);
            expect(world.glowsOn(3)).toBe(1);
        });

        it("has no glow when the player switched the weapon reminder off", () => {
            world = createWorld(setUpShaman, { isWeaponBuffEnabled: false });
            world.advance(2);
            expect(world.glowsOn(3)).toBe(0);
        });
    });

    // The timeline of what the addon believes: a cast starts a grace time, a seen buff counts until it
    // should run out, and a "missing" reading must hold for a moment before it is believed
    describe("the weapon buff, over time", () => {
        function putOnTheWeapon(): void {
            world.state.enchants[MAIN_HAND] = { enchantID: 1, remainingTimeMs: ONE_HOUR_MS };
            world.fire("WEAPON_ENCHANT_CHANGED");
            world.advance(1);
        }

        function takeOffTheWeapon(): void {
            world.state.enchants[MAIN_HAND] = undefined;
        }

        it("comes back after the grace time when the cast put nothing on the weapon", () => {
            world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-guid", ROCKBITER_WEAPON.id);
            world.advance(0.5);
            expect(world.glowsOn(3)).toBe(0);
            world.advance(5);
            expect(world.glowsOn(3)).toBe(1);
        });

        it("waits a moment before believing that the buff is gone", () => {
            putOnTheWeapon();
            takeOffTheWeapon();
            world.advance(0.6);
            expect(world.glowsOn(3)).toBe(0);
        });

        it("is believed to be gone once the reading has held", () => {
            putOnTheWeapon();
            takeOffTheWeapon();
            world.advance(3.2);
            expect(world.glowsOn(3)).toBe(1);
        });

        // The game says the enchant changed, long after our own cast: someone took it off
        it("is believed to be gone at once when the game says the enchant changed", () => {
            putOnTheWeapon();
            world.advance(10);
            takeOffTheWeapon();
            world.fire("WEAPON_ENCHANT_CHANGED");
            world.advance(0.3);
            expect(world.glowsOn(3)).toBe(1);
        });

        it("is trusted for as long as it should last when the client gives no answer", () => {
            putOnTheWeapon();
            world.state.areEnchantReadsBroken = true;
            world.advance(5);
            expect(world.glowsOn(3)).toBe(0);
        });

        it("is asked for when the client gives no answer and nothing is known", () => {
            world.state.areEnchantReadsBroken = true;
            world.advance(2);
            expect(world.glowsOn(3)).toBe(1);
        });

        it("is forgotten when a different weapon is equipped", () => {
            putOnTheWeapon();
            world.advance(10);
            takeOffTheWeapon();
            world.state.equippedItems[MAIN_HAND] = 9999;
            world.fire("PLAYER_EQUIPMENT_CHANGED", MAIN_HAND, false);
            world.advance(0.3);
            expect(world.glowsOn(3)).toBe(1);
        });
    });
});

describe("a shaman whose saved weapon sound has gone from the list", () => {
    it("gets the default weapon sound again", () => {
        const world = createWorld((state) => playAs(state, SHAMAN), { styles: { weaponBuff: { sound: "ping" } } });
        expect((world.getSavedSettings()?.styles as { weaponBuff?: { sound?: string } } | undefined)?.weaponBuff?.sound).toBeUndefined();
    });
});

describe("a shaman who switched Flametongue off in the table", () => {
    const FLAMETONGUE = { id: 8024, name: "Flametongue Weapon", rank: 1, icon: 135814, isHelpful: true };

    it("sees Rockbiter glow in its place", () => {
        const world = createWorld(
            (state) => {
                playAs(state, SHAMAN);
                learnSpell(state, FLAMETONGUE);
                learnSpell(state, ROCKBITER_WEAPON);
                state.bars[2] = FLAMETONGUE.id;
                state.bars[3] = ROCKBITER_WEAPON.id;
                state.equippedItems[MAIN_HAND] = 1234;
            },
            { enabledSpells: { [String(FLAMETONGUE.id)]: false } },
        );
        world.advance(2);
        expect(world.glowsOn(3)).toBe(1);
        expect(world.glowsOn(2)).toBe(0);
    });
});

describe("a shaman with Flametongue and Windfury on the bars", () => {
    const FLAMETONGUE = { id: 8024, name: "Flametongue Weapon", rank: 1, icon: 135814, isHelpful: true };
    const WINDFURY = { id: 8232, name: "Windfury Weapon", rank: 1, icon: 136018, isHelpful: true };

    function createShamanWorld(talentPoints: number[], savedSettings?: Record<string, unknown>): World {
        const world = createWorld((state) => {
            playAs(state, SHAMAN);
            state.talentPoints = talentPoints;
            learnSpell(state, FLAMETONGUE);
            learnSpell(state, WINDFURY);
            state.bars[2] = FLAMETONGUE.id;
            state.bars[3] = WINDFURY.id;
            state.equippedItems[MAIN_HAND] = 1234;
        }, savedSettings);
        world.advance(2);
        return world;
    }

    it("sees Flametongue glow with no talents, the first of the automatic order", () => {
        expect(createShamanWorld([0, 0, 0]).glowsOn(2)).toBe(1);
    });

    it("sees Windfury glow as an Enhancement shaman", () => {
        const world = createShamanWorld([5, 31, 15]);
        expect(world.glowsOn(3)).toBe(1);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("sees the weapon buff put on last glow, over the talent tree's", () => {
        const world = createShamanWorld([5, 31, 15], { lastBuffs: { "weapon:main": FLAMETONGUE.id } });
        expect(world.glowsOn(2)).toBe(1);
        expect(world.glowsOn(3)).toBe(0);
    });
});
