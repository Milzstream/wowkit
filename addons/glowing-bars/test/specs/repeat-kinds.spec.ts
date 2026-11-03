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
    WARRIOR,
    type World,
    type SpellDefinition,
} from "@wowkit/test-kit";
import { findLabel, findRow, toggleTable } from "./table.helpers";

const RECKLESSNESS: SpellDefinition = { id: 1719, name: "Recklessness", rank: 1, icon: 132109, cooldownSeconds: 300, isHelpful: true };

describe("the repeat of a sound", () => {
    it("has its button on every row of the table", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
        });
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        const buttons = world.frames.filter((frame) => frame.frameType === "Button" && frame.text === "Off");
        expect(buttons.length > 0).toBe(true);
        expect(buttons.filter((button) => !button.isShown).length).toBe(0);
    });

    function createLowOnCandles(reagent: Record<string, unknown>, isResting: boolean) {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, FORTITUDE);
                learnSpell(state, PRAYER_OF_FORTITUDE);
                state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
                state.bags[HOLY_CANDLE] = 0;
                state.bars[1] = PRAYER_OF_FORTITUDE.id;
                state.isResting = isResting;
            },
            { styles: { lowReagent: reagent } },
        );
        world.advance(2);
        return world;
    }

    it("plays again for a low reagent in a town", () => {
        const world = createLowOnCandles({ sound: "raidwarning", repeat: 5 }, true);
        const first = world.sounds.length;
        expect(first > 0).toBe(true);
        world.advance(5);
        expect(world.sounds.length > first).toBe(true);
    });

    it("plays nothing for a low reagent out of a town by default: its sound waits for a town", () => {
        const world = createLowOnCandles({ sound: "raidwarning", repeat: 5 }, false);
        expect(world.sounds.length).toBe(0);
        world.advance(11);
        expect(world.sounds.length).toBe(0);
    });

    it("repeats for a low reagent out of a town when the player chose it to show always", () => {
        const world = createLowOnCandles({ sound: "raidwarning", repeat: 5, when: "always" }, false);
        expect(world.sounds.length).toBe(1);
        world.advance(11);
        expect(world.sounds.length).toBe(3);
    });

    it("shows the message of a low reagent again in a town, with what is left by then", () => {
        const world = createLowOnCandles({ isMessageOn: true, repeat: 10 }, true);
        expect(world.notice()).toContain("Running low: Holy Candle (0)");
        world.state.bags[HOLY_CANDLE] = 3;
        world.advance(11);
        expect(world.notice()).toContain("Running low: Holy Candle (3)");
    });

    it("never says only that a reagent is low", () => {
        expect(createLowOnCandles({ isMessageOn: true, repeat: 10 }, true).notice()).not.toContain("Low reagent");
    });

    it("shows no message of a low reagent out of a town", () => {
        const world = createLowOnCandles({ isMessageOn: true, repeat: 10 }, false);
        world.advance(11);
        expect(world.notice()).not.toContain("Running low");
    });

    it("shows no message of a low reagent with the text off", () => {
        const world = createLowOnCandles({ isMessageOn: false, repeat: 10 }, true);
        world.advance(11);
        expect(world.notice()).not.toContain("Running low");
    });

    it("does not show the message again without a repeat", () => {
        const world = createLowOnCandles({ isMessageOn: true }, true);
        world.state.bags[HOLY_CANDLE] = 3;
        world.advance(11);
        expect(world.notice()).not.toContain("Holy Candle (3)");
    });

    it("plays again for a cooldown that glows until it is pressed", () => {
        const world = createWorld(
            (state) => {
                playAs(state, WARRIOR);
                learnSpell(state, RECKLESSNESS);
                state.bars[1] = RECKLESSNESS.id;
            },
            { styles: { readyCooldown: { sound: "raidwarning", repeat: 5, glowTime: 0 } } },
        );
        world.advance(1);
        world.state.isInCombat = true;
        world.state.cooldowns[RECKLESSNESS.id] = { start: 0, duration: 99999 };
        world.advance(0.5);
        world.state.cooldowns[RECKLESSNESS.id] = undefined;
        world.advance(1);
        const first = world.sounds.length;
        expect(first > 0).toBe(true);
        world.advance(5);
        expect(world.sounds.length > first).toBe(true);
    });
});

describe("the message of a low reagent that repeats in a town", () => {
    function createPriest(candles: number, savedSettings: Record<string, unknown>) {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            learnSpell(state, PRAYER_OF_FORTITUDE);
            state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
            state.bags[HOLY_CANDLE] = candles;
            state.bars[1] = PRAYER_OF_FORTITUDE.id;
            state.isResting = true;
        }, savedSettings);
        world.advance(2);
        return world;
    }

    it("goes by the repeat and the text set on the reagent's own row", () => {
        const world = createPriest(0, {
            styles: { lowReagent: { isMessageOn: false } },
            spellStyles: { [`lowReagent:${PRAYER_OF_FORTITUDE.name}`]: { isMessageOn: true, repeat: 5 } },
        });
        world.state.bags[HOLY_CANDLE] = 3;
        world.advance(6);
        expect(world.notice()).toContain("Running low: Holy Candle (3)");
    });

    it("comes also when the reagent ran low after the arrival, where no first message came", () => {
        const world = createPriest(100, { styles: { lowReagent: { isMessageOn: true, repeat: 5 } } });
        expect(world.notice()).not.toContain("Running low");
        world.state.bags[HOLY_CANDLE] = 3;
        world.advance(2);
        expect(world.notice()).toContain("Running low: Holy Candle (3)");
    });

    it("comes also when its text was off on arrival and is switched on later", () => {
        const world = createPriest(0, { styles: { lowReagent: { isMessageOn: false, repeat: 5 } } });
        expect(world.notice()).not.toContain("Running low");
        switchMessageOn(world);
        world.advance(2);
        expect(world.notice()).toContain("Running low: Holy Candle (0)");
    });
});

function switchMessageOn(world: World): void {
    toggleTable();
    const message = findRow(world, "Low reagent").message;
    message.isChecked = true;
    message.scripts.OnClick!(message);
}

describe("the tooltip of a low reagent's row", () => {
    function readTip(world: World, label: string, part: "hover" | "message"): string | undefined {
        const row = findLabel(world, label)!.parent;
        const parts = world.frames.filter((frame) => frame.parent === row);
        const frame = part === "hover" ? parts.find((other) => other.frameType === "Frame")! : findRow(world, label).message;
        const tooltip = world.findFrame((other) => other.name === "GameTooltip")!;
        tooltip.text = "";
        frame.scripts.OnEnter?.(frame);
        return tooltip.text;
    }

    function createOpenTable(): World {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            learnSpell(state, PRAYER_OF_FORTITUDE);
            state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
            state.bags[HOLY_CANDLE] = 100;
        });
        world.advance(1);
        toggleTable();
        return world;
    }

    it("is on its name and type, and says where it works", () => {
        expect(readTip(createOpenTable(), "Low reagent", "hover")).toContain("in a town or an inn");
    });

    it("is not on the message box any more", () => {
        expect(readTip(createOpenTable(), "Low reagent", "message")).toBe("");
    });

    it("is not on a row of another type", () => {
        expect(readTip(createOpenTable(), "Missing buff", "hover")).toBe("");
    });
});

describe("the town message of a reagent spell the player added", () => {
    const RITUAL = { id: 29893, name: "Ritual of Souls", rank: 1, icon: 136194, isHelpful: true };

    function createWarlock(savedSettings: Record<string, unknown> = {}) {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, RITUAL);
                state.reagentTexts[RITUAL.id] = "Soul Shard";
                state.itemIds["Soul Shard"] = 6265;
                state.bags[6265] = 2;
                state.isResting = true;
            },
            { addedSpells: [{ id: RITUAL.id, reminderType: "lowReagent" }], ...savedSettings },
        );
        world.advance(2);
        return world;
    }

    it("names its reagent on arriving, on a bar or not", () => {
        expect(createWarlock().notice()).toContain("Running low: Soul Shard (2)");
    });

    it("leaves it out when its row is switched off", () => {
        expect(createWarlock({ enabledSpells: { [`${RITUAL.id}`]: false } }).notice()).not.toContain("Soul Shard");
    });

    it("names a reagent of the addon's list only once", () => {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, FORTITUDE);
                learnSpell(state, PRAYER_OF_FORTITUDE);
                state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
                state.itemIds["Holy Candle"] = HOLY_CANDLE;
                state.bags[HOLY_CANDLE] = 1;
                state.isResting = true;
            },
            { addedSpells: [{ id: PRAYER_OF_FORTITUDE.id, reminderType: "lowReagent" }] },
        );
        world.advance(2);
        expect(world.notice()).toContain("Running low: Holy Candle (1)");
        expect(world.notice()).not.toContain("Holy Candle (1), Holy Candle");
    });
});

describe("a reagent that runs low after the town message came", () => {
    const RITUAL = { id: 29893, name: "Ritual of Souls", rank: 1, icon: 136194, isHelpful: true };

    it("brings the message again, once, naming it too", () => {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, FORTITUDE);
                learnSpell(state, PRAYER_OF_FORTITUDE);
                learnSpell(state, RITUAL);
                state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
                state.reagentTexts[RITUAL.id] = "Soul Shard";
                state.itemIds["Soul Shard"] = 6265;
                state.bags[HOLY_CANDLE] = 1;
                state.bags[6265] = 100;
                state.isResting = true;
            },
            { addedSpells: [{ id: RITUAL.id, reminderType: "lowReagent" }] },
        );
        world.advance(2);
        expect(world.notice()).toContain("Running low: Holy Candle (1)");
        expect(world.notice()).not.toContain("Soul Shard");
        world.state.bags[6265] = 2;
        world.advance(2);
        expect(world.notice()).toContain("Holy Candle (1), Soul Shard (2)");
        world.advance(11);
        expect(world.notice()).not.toContain("Soul Shard");
        world.advance(60);
        expect(world.notice()).not.toContain("Soul Shard");
    });
});
