import {
    createWorld,
    describe,
    expect,
    FORTITUDE,
    HOLY_CANDLE,
    it,
    learnSpell,
    playAs,
    PRAYER_OF_FORTITUDE,
    PRIEST,
    type World,
} from "@wowkit/test-kit";
import { toggleTable } from "./table.helpers";

const globals = _G as unknown as { SPELL_REAGENTS?: string };
const RITUAL = { id: 29893, name: "Ritual of Souls", rank: 1, icon: 136194, isHelpful: true };

function createPriest(reagentName: string, itemName: string | undefined, savedSettings: Record<string, unknown> = {}): World {
    const world = createWorld((state) => {
        playAs(state, PRIEST);
        learnSpell(state, FORTITUDE);
        learnSpell(state, PRAYER_OF_FORTITUDE);
        state.reagentTexts[PRAYER_OF_FORTITUDE.id] = reagentName;
        state.itemNames[HOLY_CANDLE] = itemName;
        state.itemIds[reagentName] = HOLY_CANDLE;
        state.bags[HOLY_CANDLE] = 1;
        state.bars[1] = PRAYER_OF_FORTITUDE.id;
    }, savedSettings);
    world.advance(2);
    return world;
}

describe("a reagent on a client in another language", () => {
    function createWarlock(savedSettings: Record<string, unknown> = {}): World {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, RITUAL);
            state.reagentTexts[RITUAL.id] = "Seelensplitter";
            state.itemIds.Seelensplitter = 6265;
            state.bags[6265] = 2;
            state.isResting = true;
        }, savedSettings);
        world.advance(2);
        return world;
    }

    it("is read from the tooltip by the game's own word for reagents, for a spell the player added", () => {
        globals.SPELL_REAGENTS = "Reagenzien: ";
        const world = createWarlock({ addedSpells: [{ id: RITUAL.id, reminderType: "lowReagent" }] });
        globals.SPELL_REAGENTS = undefined;
        expect(world.notice()).toContain("Running low: Seelensplitter (2)");
    });

    it("can be added as a low reagent, not refused for using none", () => {
        globals.SPELL_REAGENTS = "Reagenzien: ";
        const world = createWarlock();
        toggleTable();
        const box = world.frames.find(
            (frame) =>
                frame.frameType === "EditBox" &&
                !world.frames.some((other) => other.parent === frame.parent && other.frameType === "CheckButton"),
        )!;
        const buttons = world.frames.filter((frame) => frame.parent === box.parent && frame.template === "UIPanelButtonTemplate");
        world.pickFromMenu(buttons[0]!, "Low reagent");
        box.text = `${RITUAL.id}`;
        buttons[1]!.scripts.OnClick!(buttons[1]!);
        globals.SPELL_REAGENTS = undefined;
        expect(world.getSavedSettings()?.addedSpells).toEqual([{ id: RITUAL.id, reminderType: "lowReagent" }]);
    });

    it("glows as soon as the client has loaded the item's name, without a new login", () => {
        const world = createPriest("Heilige Kerze", undefined);
        expect(world.glowsOn(1)).toBe(0);
        world.state.itemNames[HOLY_CANDLE] = "Heilige Kerze";
        world.advance(2);
        expect(world.glowsOn(1)).toBe(1);
    });

    it("still reads the English word where the client has none of its own", () => {
        const world = createPriest("Holy Candle", "Holy Candle");
        expect(world.glowsOn(1)).toBe(1);
    });
});
