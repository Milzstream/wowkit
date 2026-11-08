import {
    createWorld,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    targetEnemy,
    WARRIOR,
    type FakeFrame,
    type SpellDefinition,
    type World,
} from "@wowkit/test-kit";
import { findLabel, findRow } from "./table.helpers";

const EXECUTE: SpellDefinition = { id: 5308, name: "Execute", rank: 1, icon: 135358, maxRange: 5, isHarmful: true };
const DEFENSIVE_STANCE: SpellDefinition = { id: 71, name: "Defensive Stance", rank: 0, icon: 132341, isHelpful: true };
const BATTLE_STANCE = 2457;
const ROW_LABEL = "Execute (Defensive Stance) (alpha)";

/** A warrior in this stance, Execute on button 1 and unusable as the game says, an enemy at this health in a fight. */
function createExecuteWorld(stance: number, health: number, saved?: Record<string, unknown>): World {
    const world = createWorld((state) => {
        playAs(state, WARRIOR);
        learnSpell(state, EXECUTE);
        state.spells[DEFENSIVE_STANCE.id] = DEFENSIVE_STANCE;
        state.bars[1] = EXECUTE.id;
        state.unusableSpells[EXECUTE.id] = true;
        state.stances = [BATTLE_STANCE, DEFENSIVE_STANCE.id];
        state.activeStance = stance;
        state.isInCombat = true;
        targetEnemy(state, { health });
    }, saved);
    world.advance(1);
    return world;
}

describe("Execute in Defensive Stance", () => {
    it("is lit on a low target", () => {
        expect(createExecuteWorld(DEFENSIVE_STANCE.id, 15).glowAlphasOn(1)).toEqual([1]);
    });

    it("is lit but unseen on a healthy target", () => {
        expect(createExecuteWorld(DEFENSIVE_STANCE.id, 80).glowAlphasOn(1)).toEqual([0]);
    });

    it("shows at the row's glow percent", () => {
        const world = createExecuteWorld(DEFENSIVE_STANCE.id, 15, { spellStyles: { "proc:-5308": { glowPercent: 50 } } });
        expect(world.glowAlphasOn(1)).toEqual([0.5]);
    });

    it("is not lit in another stance, where the normal glow is the game's to give", () => {
        expect(createExecuteWorld(BATTLE_STANCE, 15).glowsOn(1)).toBe(0);
    });

    it("is not lit when the row is switched off", () => {
        expect(createExecuteWorld(DEFENSIVE_STANCE.id, 15, { enabledSpells: { "-5308": false } }).glowsOn(1)).toBe(0);
    });

    it("follows the When of its row", () => {
        const world = createExecuteWorld(DEFENSIVE_STANCE.id, 15, { spellStyles: { "proc:-5308": { when: "outOfCombat" } } });
        expect(world.glowsOn(1)).toBe(0);
    });

    it("has a row of its own beside Execute", () => {
        const world = createExecuteWorld(DEFENSIVE_STANCE.id, 15);
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        expect(findLabel(world, ROW_LABEL)).toBeDefined();
    });
});

describe("the row of Execute in Defensive Stance", () => {
    /** The controls of a row that say why they cannot be used. */
    function listTips(world: World, label: string): FakeFrame[] {
        const row = findLabel(world, label)!.parent;
        return world.frames.filter((frame) => frame.parent === row && frame.scripts.OnEnter !== undefined);
    }

    function openWorld(): World {
        const world = createExecuteWorld(DEFENSIVE_STANCE.id, 15);
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        return world;
    }

    it("fades Sound, Repeat and Glow time, and says why", () => {
        const world = openWorld();
        expect(listTips(world, ROW_LABEL).length).toBe(4);
        expect(findRow(world, ROW_LABEL).sound.alpha).toBe(0.4);
        expect(findRow(world, ROW_LABEL).message.alpha).toBe(1);
    });

    it("leaves the row of Execute as it is", () => {
        const world = openWorld();
        expect(listTips(world, "Execute").length).toBe(0);
        expect(findRow(world, "Execute").message.alpha).toBe(1);
    });
});

describe("the Spell ID of the row of Execute in Defensive Stance", () => {
    function findIdBox(world: World, label: string): FakeFrame {
        const row = findLabel(world, label)!.parent;
        return world.frames.filter((frame) => frame.parent === row && frame.frameType === "EditBox" && frame.isShown)[1]!;
    }

    function openWorld(): World {
        const world = createExecuteWorld(DEFENSIVE_STANCE.id, 15, { isTableAdvanced: true });
        world.state.spells[20662] = { ...EXECUTE, id: 20662, rank: 5 };
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        return world;
    }

    it("is the one of Execute", () => {
        expect(findIdBox(openWorld(), ROW_LABEL).text).toBe("5308");
    });

    it("changes for both rows together", () => {
        const world = openWorld();
        const box = findIdBox(world, ROW_LABEL);
        box.text = "20662";
        box.scripts.OnEditFocusLost!(box);
        expect(world.getSavedSettings()?.idOverrides).toEqual({ "5308": 20662 });
        expect(findIdBox(world, ROW_LABEL).text).toBe("20662");
        expect(findIdBox(world, "Execute").text).toBe("20662");
    });
});

describe("the message of Execute in Defensive Stance", () => {
    /** The frame of a text on the screen, with no table open. */
    function findText(world: World, text: string): FakeFrame | undefined {
        return world.frames.find((frame) => frame.fontStrings.some((font) => font.text?.includes(text) === true));
    }

    const MESSAGE_ON = { spellStyles: { "proc:-5308": { isMessageOn: true } } };

    it("is off by default", () => {
        expect(findText(createExecuteWorld(DEFENSIVE_STANCE.id, 15), "Execute")).toBeUndefined();
    });

    it("shows the spell's name on a low target, and is unseen on a healthy one", () => {
        expect(findText(createExecuteWorld(DEFENSIVE_STANCE.id, 15, MESSAGE_ON), "Execute")?.alpha).toBe(1);
        expect(findText(createExecuteWorld(DEFENSIVE_STANCE.id, 80, MESSAGE_ON), "Execute")?.alpha).toBe(0);
    });

    it("says the player's own words", () => {
        const world = createExecuteWorld(DEFENSIVE_STANCE.id, 15, {
            spellStyles: { "proc:-5308": { isMessageOn: true, messageTextChoice: "custom", messageText: "SWITCH" } },
        });
        expect(findText(world, "SWITCH")).toBeDefined();
    });

    it("goes when the stance changes", () => {
        const world = createExecuteWorld(DEFENSIVE_STANCE.id, 15, MESSAGE_ON);
        world.state.activeStance = BATTLE_STANCE;
        world.advance(1);
        expect(findText(world, "Execute")?.isShown).toBe(false);
    });
});
