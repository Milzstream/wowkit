import { createWorld, describe, expect, it, playAs, FORTITUDE, PRIEST, type World } from "@wowkit/test-kit";

/** An elixir of the fake game: item 13452 casts the spell 17538 when it is used. */
const ELIXIR_ITEM = 13452;
const ELIXIR_SPELL = 17538;

function createPriestWorld(savedSettings?: Record<string, unknown>): World {
    return createWorld((state) => {
        playAs(state, PRIEST);
        state.itemUseSpells[ELIXIR_ITEM] = ELIXIR_SPELL;
    }, savedSettings);
}

describe("the spell IDs in the tooltips", () => {
    it("are off by default", () => {
        const world = createPriestWorld();
        expect(world.tooltipLines("spell", FORTITUDE.id)).toEqual([]);
        expect(world.tooltipLines("item", ELIXIR_ITEM)).toEqual([]);
    });

    it("show the ID of a spell and the spell an item casts once switched on in the Settings", () => {
        const world = createPriestWorld();
        world.setOption("showTooltipIds", true);
        expect(world.tooltipLines("spell", FORTITUDE.id)).toEqual([`Spell ID: ${FORTITUDE.id}`]);
        expect(world.tooltipLines("item", ELIXIR_ITEM)).toEqual([`Item ID: ${ELIXIR_ITEM}`, `Use spell ID: ${ELIXIR_SPELL}`]);
    });

    it("stay on for a character who switched them on", () => {
        const world = createPriestWorld({ showTooltipIds: true });
        expect(world.tooltipLines("spell", FORTITUDE.id)).toEqual([`Spell ID: ${FORTITUDE.id}`]);
    });

    it("add only the ID to an item with no use, and nothing to a tooltip with no ID", () => {
        const world = createPriestWorld({ showTooltipIds: true });
        expect(world.tooltipLines("item", 17028)).toEqual(["Item ID: 17028"]);
        expect(world.tooltipLines("spell", undefined)).toEqual([]);
    });

    it("go away again once switched off", () => {
        const world = createPriestWorld({ showTooltipIds: true });
        world.setOption("showTooltipIds", false);
        expect(world.tooltipLines("spell", FORTITUDE.id)).toEqual([]);
    });
});
