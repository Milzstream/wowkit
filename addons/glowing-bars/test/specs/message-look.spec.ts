import {
    createWorld,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    WARRIOR,
    type FakeFrame,
    type SpellDefinition,
    type World,
} from "@wowkit/test-kit";
import { findLabel, findRow, toggleTable } from "./table.helpers";

const OVERPOWER: SpellDefinition = { id: 7384, name: "Overpower", rank: 1, icon: 132223, maxRange: 5, isHarmful: true };
const REVENGE: SpellDefinition = { id: 6572, name: "Revenge", rank: 1, icon: 132353, maxRange: 5, isHarmful: true };
const MESSAGE_ON = { isMessageOn: true };

function createWarrior(saved: Record<string, unknown>): World {
    const world = createWorld((state) => {
        playAs(state, WARRIOR);
        for (const spell of [OVERPOWER, REVENGE]) learnSpell(state, spell);
        state.bars[1] = OVERPOWER.id;
        state.bars[2] = REVENGE.id;
    }, saved);
    world.advance(1);
    return world;
}

function findGear(world: World, label: string): FakeFrame | undefined {
    const row = findLabel(world, label)!.parent;
    return world.frames.find(
        (frame) => frame.parent === row && frame.frameType === "Button" && frame.template === undefined && frame.width === 20,
    );
}

describe("what a message says", () => {
    function createWith(look: Record<string, unknown>, saved: Record<string, unknown> = {}): World {
        return createWarrior({ styles: { proc: { ...MESSAGE_ON, ...look } }, ...saved });
    }

    it("is the type alone by default, once for both procs", () => {
        expect(createWith({}).notice()).toBe("|cffff1f14Proc|r");
    });

    it("can be the type and the spell", () => {
        expect(createWith({ messageTextChoice: "typeAndName" }).notice()).toBe("|cffff1f14Proc: Overpower|r\n|cffff1f14Proc: Revenge|r");
    });

    it("can be the spell alone", () => {
        expect(createWith({ messageTextChoice: "name" }).notice()).toBe("|cffff1f14Overpower|r\n|cffff1f14Revenge|r");
    });

    it("can be the player's own words, with nothing added to them", () => {
        const world = createWith({}, { spellStyles: { "proc:Overpower": { messageTextChoice: "custom", messageText: "SWITCH NOW" } } });
        expect(world.notice()).toContain("SWITCH NOW");
        expect(world.notice()).not.toContain("Overpower");
    });

    it("comes in the row's own color", () => {
        const world = createWith({ messageTextChoice: "name" }, { spellStyles: { "proc:Overpower": { messageColor: [0, 1, 0] } } });
        expect(world.notice()).toContain("|cff00ff00Overpower|r");
    });

    it("shares a line with its type when the player asks", () => {
        const world = createWith({ messageTextChoice: "name" }, { isOneLinePerType: true });
        expect(world.notice()).toBe("|cffff1f14Overpower,|r |cffff1f14Revenge|r");
    });

    it("says the type once on a shared line", () => {
        const world = createWith({ messageTextChoice: "typeAndName" }, { isOneLinePerType: true });
        expect(world.notice()).toBe("|cffff1f14Proc: Overpower,|r |cffff1f14Revenge|r");
    });
});

describe("the gear of a message", () => {
    function openTable(isAdvanced: boolean): World {
        const world = createWarrior({ isTableAdvanced: isAdvanced });
        toggleTable();
        return world;
    }

    it("is not in the Basic view, and the check box is", () => {
        const world = openTable(false);
        expect(findGear(world, "Overpower")?.isShown ?? false).toBe(false);
        expect(findRow(world, "Overpower").message.isShown).toBe(true);
    });

    it("is in the Advanced view, beside the check box", () => {
        const world = openTable(true);
        expect(findGear(world, "Overpower")?.isShown).toBe(true);
        expect(findRow(world, "Overpower").message.isShown).toBe(true);
    });

    it("opens a window that saves the words for the row", () => {
        const world = openTable(true);
        const gear = findGear(world, "Overpower")!;
        gear.scripts.OnClick!(gear);
        const window = world.findFrame((frame) => frame.name === "GlowingBarsMessage")!;
        expect(window.isShown).toBe(true);
        const box = world.frames.find((frame) => frame.parent === window && frame.frameType === "EditBox")!;
        box.text = "SWITCH NOW";
        box.scripts.OnEditFocusLost!(box);
        const saved = world.getSavedSettings()?.spellStyles as Record<string, { messageText?: string } | undefined>;
        expect(saved["proc:Overpower"]?.messageText).toBe("SWITCH NOW");
    });

    it("forgets the words when they are emptied", () => {
        const world = createWarrior({ isTableAdvanced: true, spellStyles: { "proc:Overpower": { messageText: "OLD" } } });
        toggleTable();
        const gear = findGear(world, "Overpower")!;
        gear.scripts.OnClick!(gear);
        const window = world.findFrame((frame) => frame.name === "GlowingBarsMessage")!;
        const box = world.frames.find((frame) => frame.parent === window && frame.frameType === "EditBox")!;
        box.text = "";
        box.scripts.OnEditFocusLost!(box);
        const saved = world.getSavedSettings()?.spellStyles as Record<string, unknown>;
        expect(saved["proc:Overpower"]).toBeUndefined();
    });
});

describe("how long a message stays", () => {
    function createWith(look: Record<string, unknown>): World {
        return createWarrior({ styles: { proc: { ...MESSAGE_ON, ...look } } });
    }

    it("is 10 seconds by default, while the glow goes on", () => {
        const world = createWith({});
        world.advance(11);
        expect(world.notice()).toBe("");
        expect(world.glowsOn(1)).toBe(1);
    });

    it("can be shorter", () => {
        const world = createWith({ messageShowFor: 5 });
        world.advance(0.5);
        expect(world.notice()).toContain("Proc");
        world.advance(6);
        expect(world.notice()).toBe("");
    });

    it("can be longer", () => {
        const world = createWith({ messageShowFor: 20 });
        world.advance(15);
        expect(world.notice()).toContain("Proc");
        world.advance(7);
        expect(world.notice()).toBe("");
    });

    it("can follow the glow, and goes with it", () => {
        const world = createWith({ messageShowFor: 0 });
        world.advance(60);
        expect(world.notice()).toContain("Proc");
        world.state.unusableSpells[OVERPOWER.id] = true;
        world.state.unusableSpells[REVENGE.id] = true;
        world.advance(2);
        expect(world.notice()).toBe("");
    });

    it("follows the glow's own time too", () => {
        const world = createWith({ messageShowFor: 0, glowTime: 3 });
        world.advance(1);
        expect(world.notice()).toContain("Proc");
        world.advance(4);
        expect(world.notice()).toBe("");
    });
});

describe("the Reset of the message window", () => {
    it("forgets what the window set, and nothing else of the row", () => {
        const world = createWarrior({
            isTableAdvanced: true,
            spellStyles: { "proc:Overpower": { messageTextChoice: "custom", messageText: "OLD", messageShowFor: 20, glowPercent: 40 } },
        });
        toggleTable();
        const gear = findGear(world, "Overpower")!;
        gear.scripts.OnClick!(gear);
        const window = world.findFrame((frame) => frame.name === "GlowingBarsMessage")!;
        const reset = world.frames.find((frame) => frame.parent === window && frame.text === "Reset")!;
        reset.scripts.OnClick!(reset);
        const saved = world.getSavedSettings()?.spellStyles as Record<string, unknown>;
        expect(saved["proc:Overpower"]).toEqual({ glowPercent: 40 });
    });
});

describe("a sample message", () => {
    it("shows when a slider moves with nothing on screen, and goes again", () => {
        const world = createWarrior({});
        expect(world.notice()).toBe("");
        world.setOption("messageTop", 300);
        expect(world.notice()).toBe("Sample message");
        world.advance(4);
        expect(world.notice()).toBe("");
    });

    it("does not take the place of a message on screen", () => {
        const world = createWarrior({ styles: { proc: MESSAGE_ON } });
        world.setOption("messageSize", 150);
        expect(world.notice()).toContain("Proc");
        expect(world.notice()).not.toContain("Sample");
    });

    for (const key of ["isMessageZoomInOn", "isMessageZoomOutOn", "isMessageFadePulseOn", "isMessageSizePulseOn"]) {
        it(`shows when ${key} changes too`, () => {
            const world = createWarrior({});
            world.setOption(key, key === "isMessageFadePulseOn" || key === "isMessageSizePulseOn");
            expect(world.notice()).toBe("Sample message");
        });
    }

    it("shows two messages for One line per type, as the setting says", () => {
        const world = createWarrior({});
        world.setOption("isOneLinePerType", true);
        expect(world.notice()).toBe("Sample message, Second message");
        world.setOption("isOneLinePerType", false);
        expect(world.notice()).toBe("Sample message\nSecond message");
    });

    it("goes sooner for Zoom out, so its going is seen", () => {
        const world = createWarrior({});
        world.setOption("isMessageZoomOutOn", false);
        expect(world.notice()).toBe("Sample message");
        world.advance(1.5);
        expect(world.notice()).toBe("");
    });

    it("does not show for a setting of something else", () => {
        const world = createWarrior({});
        world.setOption("isDisabled", true);
        expect(world.notice()).toBe("");
    });
});
