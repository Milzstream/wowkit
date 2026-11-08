// A rogue's poisons and stones in macros and rows of their own, and without a weapon.
import { createWorld, describe, expect, it, playAs, ROGUE, type World } from "@wowkit/test-kit";
import { findLabel } from "./table.helpers";

const MAIN_HAND = 16;
const OFF_HAND = 17;
const DEADLY_ENCHANT = 7;

function poisonLasting(enchantID: number, seconds: number): { enchantID: number; remainingTimeMs: number } {
    return { enchantID, remainingTimeMs: seconds * 1000 };
}

describe("a rogue with Instant Poison II in a macro, and a When on the row of Instant Poison", () => {
    const MACRO = "#showtooltip\n/use [button:1] Instant Poison II; [button:2] Coarse Weightstone\n/use 17";

    function createMacroWorld(isInCombat: boolean): World {
        const world = createWorld(
            (state) => {
                playAs(state, ROGUE);
                state.spells[8679] = { id: 8679, name: "Instant Poison", rank: 1, icon: 132273, isHelpful: true };
                state.spells[8686] = { id: 8686, name: "Instant Poison II", rank: 1, icon: 132273, isHelpful: true };
                state.itemUseSpells[6949] = 8686;
                state.itemIds["Instant Poison II"] = 6949;
                state.bags[6949] = 5;
                state.barMacros[1] = { body: MACRO };
                state.equippedItems[MAIN_HAND] = 1234;
                // The macro is for the off-hand: that is the weapon with nothing on it
                state.equippedItems[OFF_HAND] = 5678;
                state.enchants[MAIN_HAND] = poisonLasting(323, 3600);
                state.isInCombat = isInCombat;
            },
            { spellStyles: { "weaponBuff:Instant Poison": { when: "inCombat" } } },
        );
        world.advance(5);
        return world;
    }

    it("sees the macro glow in combat", () => {
        expect(createMacroWorld(true).glowsOn(1)).toBe(1);
    });

    it("sees no glow out of combat, as the row says", () => {
        expect(createMacroWorld(false).glowsOn(1)).toBe(0);
    });
});

describe("a rogue who added a sharpening stone by the spell it casts, as a weapon buff", () => {
    function createStoneWorld(count: number): World {
        const world = createWorld(
            (state) => {
                playAs(state, ROGUE);
                state.spells[2828] = { id: 2828, name: "Sharpen Blade", rank: 1, icon: 135248, isHelpful: true };
                state.itemUseSpells[2862] = 2828;
                state.barItems[1] = 2862;
                state.bags[2862] = count;
                state.equippedItems[MAIN_HAND] = 1234;
            },
            { addedSpells: [{ id: 2828, reminderType: "weaponBuff" }] },
        );
        world.advance(2);
        return world;
    }

    it("sees the stone glow while the main hand has nothing on it", () => {
        expect(createStoneWorld(5).glowsOn(1)).toBe(1);
    });

    it("sees no glow once the main hand has something on it", () => {
        const world = createStoneWorld(5);
        world.state.enchants[MAIN_HAND] = poisonLasting(40, 3600);
        world.advance(2);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("sees no glow with no stone left", () => {
        expect(createStoneWorld(0).glowsOn(1)).toBe(0);
    });
});

describe("the table of a rogue who added a sharpening stone", () => {
    function openTable(barItem: number | undefined, saved: Record<string, unknown> = {}): World {
        const world = createWorld(
            (state) => {
                playAs(state, ROGUE);
                state.spells[2828] = { id: 2828, name: "Sharpen Blade", rank: 1, icon: 135248, isHelpful: true };
                state.itemUseSpells[2862] = 2828;
                state.itemNames[2862] = "Rough Sharpening Stone";
                state.barItems[1] = barItem;
                state.bags[2862] = 5;
                state.equippedItems[MAIN_HAND] = 1234;
            },
            { addedSpells: [{ id: 2828, reminderType: "weaponBuff" }], ...saved },
        );
        world.advance(2);
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        return world;
    }

    it("names the row after the stone on the bar", () => {
        const world = openTable(2862);
        expect(findLabel(world, "Rough Sharpening Stone")).toBeDefined();
        expect(findLabel(world, "Sharpen Blade")).toBeUndefined();
    });

    it("keeps the stone's name when it has left the bars", () => {
        expect(findLabel(openTable(undefined, { fedItems: { "2828": 2862 } }), "Rough Sharpening Stone")).toBeDefined();
    });

    it("goes by the spell's name until the stone has been on a bar", () => {
        expect(findLabel(openTable(undefined), "Sharpen Blade")).toBeDefined();
    });
});

describe("a rogue with a macro for a poison that is not in the bags yet", () => {
    it("sees the macro glow once the poison is there", () => {
        const world = createWorld((state) => {
            playAs(state, ROGUE);
            state.spells[8679] = { id: 8679, name: "Instant Poison", rank: 1, icon: 132273, isHelpful: true };
            state.spells[8686] = { id: 8686, name: "Instant Poison II", rank: 1, icon: 132273, isHelpful: true };
            state.itemUseSpells[6949] = 8686;
            state.itemIds["Instant Poison II"] = 6949;
            state.barMacros[1] = { body: "#showtooltip\n/use Instant Poison II\n/use 16" };
            state.equippedItems[MAIN_HAND] = 1234;
        });
        world.advance(3);
        expect(world.glowsOn(1)).toBe(0);
        world.state.bags[6949] = 5;
        world.fire("BAG_UPDATE_DELAYED");
        world.advance(3);
        expect(world.glowsOn(1)).toBe(1);
    });
});

describe("a rogue with a macro the game gives as the item it shows", () => {
    it("sees the macro glow, read by its name", () => {
        const world = createWorld((state) => {
            playAs(state, ROGUE);
            state.spells[8679] = { id: 8679, name: "Instant Poison", rank: 1, icon: 132273, isHelpful: true };
            state.spells[8686] = { id: 8686, name: "Instant Poison II", rank: 1, icon: 132273, isHelpful: true };
            state.itemUseSpells[6949] = 8686;
            state.itemIds["Instant Poison II"] = 6949;
            state.bags[6949] = 5;
            state.barMacros[5] = { body: "#showtooltip\n/use Instant Poison II\n/use 16", name: "test", isShowingItem: true };
            state.equippedItems[MAIN_HAND] = 1234;
        });
        world.advance(3);
        expect(world.glowsOn(5)).toBe(1);
    });
});

describe("an unarmed rogue with a poison on the bars", () => {
    it("sees no glow until a weapon is in the hand", () => {
        const world = createWorld((state) => {
            playAs(state, ROGUE);
            state.spells[8679] = { id: 8679, name: "Instant Poison", rank: 1, icon: 132273, isHelpful: true };
            state.itemUseSpells[6947] = 8679;
            state.barItems[1] = 6947;
            state.bags[6947] = 5;
        });
        world.advance(3);
        expect(world.glowsOn(1)).toBe(0);
        world.state.equippedItems[MAIN_HAND] = 1234;
        world.advance(3);
        expect(world.glowsOn(1)).toBe(1);
    });
});

describe("a rogue with a macro of Deadly Poison for each weapon", () => {
    function createTwoMacros(coated: number | undefined): World {
        const world = createWorld((state) => {
            playAs(state, ROGUE);
            state.spells[2824] = { id: 2824, name: "Deadly Poison II", rank: 1, icon: 132290, isHelpful: true };
            state.itemUseSpells[2893] = 2824;
            state.itemIds["Deadly Poison II"] = 2893;
            state.bags[2893] = 5;
            state.barMacros[1] = { body: "#showtooltip\n/use Deadly Poison II\n/use 16", name: "main", isShowingItem: true };
            state.barMacros[2] = { body: "#showtooltip\n/use Deadly Poison II\n/use 17", name: "off", isShowingItem: true };
            state.equippedItems[MAIN_HAND] = 1234;
            state.equippedItems[OFF_HAND] = 5678;
            if (coated !== undefined) state.enchants[coated] = poisonLasting(DEADLY_ENCHANT, 3600);
        });
        world.advance(5);
        return world;
    }

    it("lights the macro of the main hand when that one is bare", () => {
        const world = createTwoMacros(OFF_HAND);
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("lights the macro of the off-hand when that one is bare", () => {
        const world = createTwoMacros(MAIN_HAND);
        expect(world.glowsOn(1)).toBe(0);
        expect(world.glowsOn(2)).toBe(1);
    });
});

describe("a rogue who added a stone, with a macro for each weapon", () => {
    function createStoneMacros(coated: number): World {
        const world = createWorld(
            (state) => {
                playAs(state, ROGUE);
                state.spells[2829] = { id: 2829, name: "Sharpen Blade II", rank: 1, icon: 135249, isHelpful: true };
                state.itemUseSpells[2863] = 2829;
                state.itemIds["Coarse Sharpening Stone"] = 2863;
                state.bags[2863] = 5;
                state.barMacros[1] = { body: "#showtooltip\n/use Coarse Sharpening Stone\n/use 16", name: "main", isShowingItem: true };
                state.barMacros[2] = { body: "#showtooltip\n/use Coarse Sharpening Stone\n/use 17", name: "off", isShowingItem: true };
                state.equippedItems[MAIN_HAND] = 1234;
                state.equippedItems[OFF_HAND] = 5678;
                state.enchants[coated] = poisonLasting(DEADLY_ENCHANT, 3600);
            },
            { addedSpells: [{ id: 2829, reminderType: "weaponBuff" }] },
        );
        world.advance(3);
        return world;
    }

    it("lights the macro of the bare off-hand only", () => {
        const world = createStoneMacros(MAIN_HAND);
        expect(world.glowsOn(1)).toBe(0);
        expect(world.glowsOn(2)).toBe(1);
    });

    it("lights the macro of the bare main hand only", () => {
        const world = createStoneMacros(OFF_HAND);
        expect(world.glowsOn(1)).toBe(1);
        expect(world.glowsOn(2)).toBe(0);
    });
});

describe("a rogue who added a stone, with the stone itself on the bar", () => {
    function createStoneOnBar(coated: number[]): World {
        const world = createWorld(
            (state) => {
                playAs(state, ROGUE);
                state.spells[2829] = { id: 2829, name: "Sharpen Blade II", rank: 1, icon: 135249, isHelpful: true };
                state.itemUseSpells[2863] = 2829;
                state.barItems[1] = 2863;
                state.bags[2863] = 5;
                state.equippedItems[MAIN_HAND] = 1234;
                state.equippedItems[OFF_HAND] = 5678;
                for (const slot of coated) state.enchants[slot] = poisonLasting(DEADLY_ENCHANT, 3600);
            },
            { addedSpells: [{ id: 2829, reminderType: "weaponBuff" }] },
        );
        world.advance(3);
        return world;
    }

    it("glows while the off-hand is bare, with the main hand coated", () => {
        expect(createStoneOnBar([MAIN_HAND]).glowsOn(1)).toBe(1);
    });

    it("glows while the main hand is bare, with the off-hand coated", () => {
        expect(createStoneOnBar([OFF_HAND]).glowsOn(1)).toBe(1);
    });

    it("goes dark with both weapons coated", () => {
        expect(createStoneOnBar([MAIN_HAND, OFF_HAND]).glowsOn(1)).toBe(0);
    });
});
