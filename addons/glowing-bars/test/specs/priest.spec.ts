import {
    beforeEach,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    createWorld,
    type World,
    FORTITUDE,
    INNER_FIRE,
    PRIEST,
    SMITE_RANK_1,
    SMITE_RANK_2,
} from "@wowkit/test-kit";
import { switchInTable } from "./table.helpers";

describe("a priest", () => {
    let world!: World;

    // Fortitude is on the first button, Smite rank 1 on the second; Inner Fire is learned but on no bar.
    // The old rank of Smite plays no sound here, so the sounds are the buffs' own.
    beforeEach(() => {
        world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                for (const spell of [FORTITUDE, INNER_FIRE, SMITE_RANK_1, SMITE_RANK_2]) learnSpell(state, spell);
                state.bars[1] = FORTITUDE.id;
                state.bars[2] = SMITE_RANK_2.id;
            },
            { styles: { rank: { sound: "none" }, buff: { isMessageOn: true } } },
        );
    });

    describe("at login", () => {
        it("greets in the chat", () => {
            expect(world.chat[0]).toContain("Loaded. Type /gb");
        });

        it("keeps its settings in the character's saved variables", () => {
            expect(world.getSavedSettings()?.showBuff).toBe(true);
        });

        it("adds its page to the options", () => {
            expect(world.proxySettings["GlowingBars_isMuted"]).toBeDefined();
        });
    });

    describe("a missing buff", () => {
        it("glows on its action button", () => {
            expect(world.glowsOn(1)).toBe(1);
        });

        it("leaves the other buttons alone", () => {
            expect(world.glowsOn(2)).toBe(0);
        });

        it("is named when it is on no action bar", () => {
            expect(world.notice()).toContain("(not on your action bars): Inner Fire");
        });

        it("makes no sound unless the player picked one", () => {
            expect(world.sounds.length).toBe(0);
        });
    });

    describe("once the buff is on the player", () => {
        beforeEach(() => {
            world.state.auras.push(world.makeAura(FORTITUDE.name, FORTITUDE.id, 1800));
            world.fire("UNIT_AURA", "player");
            world.advance(1);
        });

        it("the glow goes out", () => {
            expect(world.glowsOn(1)).toBe(0);
        });

        it("the buff still counts in combat, while the game hides the auras", () => {
            world.state.isInCombat = true;
            world.state.areAurasHidden = true;
            world.advance(1);
            expect(world.glowsOn(1)).toBe(0);
        });
    });

    // In combat the game hides the player's auras; the addon remembers the cast instead
    describe("a buff cast in combat", () => {
        it("counts although the game hides the auras", () => {
            world.state.isInCombat = true;
            world.state.areAurasHidden = true;
            world.fire("UNIT_SPELLCAST_SUCCEEDED", "player", "cast-guid", FORTITUDE.id);
            world.advance(1);
            expect(world.glowsOn(1)).toBe(0);
        });
    });

    describe("the switch of a buff in the table", () => {
        it("is saved when the player switches the buff off", () => {
            switchInTable(world, "Inner Fire", false);
            const enabledBuffs = world.getSavedSettings()?.enabledBuffs as Record<string, boolean | undefined>;
            expect(enabledBuffs.InnerFire).toBe(false);
        });

        it("is not stored when it is back at its default", () => {
            switchInTable(world, "Inner Fire", false);
            switchInTable(world, "Inner Fire", true);
            const enabledBuffs = world.getSavedSettings()?.enabledBuffs as Record<string, boolean | undefined>;
            expect(enabledBuffs.InnerFire).toBeUndefined();
        });
    });

    it("stays quiet while resting in town", () => {
        world.state.isResting = true;
        world.fire("PLAYER_UPDATE_RESTING");
        world.advance(1);
        expect(world.glowsOn(1)).toBe(0);
    });
});

describe("a priest who eats or drinks", () => {
    it("still sees its missing buff glow", () => {
        for (const name of ["Food", "Drink", "Nutritious Food", "Nutritious Drink"]) {
            const world = createWorld((state) => {
                playAs(state, PRIEST);
                learnSpell(state, FORTITUDE);
                state.bars[1] = FORTITUDE.id;
                state.auras.push({ name, spellId: 433, expirationTime: 1000 + 30 });
            });
            expect(world.glowsOn(1)).toBe(1);
        }
    });
});

describe("the message of a missing buff", () => {
    it("is off unless the player switched it on: the glow is the reminder", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            for (const spell of [FORTITUDE, INNER_FIRE]) learnSpell(state, spell);
            state.bars[1] = FORTITUDE.id;
        });
        expect(world.glowsOn(1)).toBe(1);
        expect(world.notice()).toBe("");
    });
});
