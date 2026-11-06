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
    type FakeFrame,
    type SpellDefinition,
    type World,
    PRIEST,
    SMITE_RANK_1,
    SMITE_RANK_2,
} from "@wowkit/test-kit";
import { RECKLESSNESS, findLabel, toggleTable } from "./table.helpers";

describe("the spells of the table, fixed and added by the player", () => {
    const RECKLESSNESS_ELSEWHERE: SpellDefinition = {
        id: 777001,
        name: "Recklessness",
        rank: 1,
        icon: 132109,
        cooldownSeconds: 300,
        isHelpful: true,
    };
    const SHIELD_BASH: SpellDefinition = { id: 72, name: "Shield Bash", rank: 1, icon: 132357, cooldownSeconds: 12, isHarmful: true };
    let world!: World;

    /** The widgets of the row at the end of the table that adds a spell. */
    function findAddRow(): { box: FakeFrame; reminderType: FakeFrame; add: FakeFrame } {
        const box = world.frames.find(
            (frame) =>
                frame.frameType === "EditBox" &&
                !world.frames.some((other) => other.parent === frame.parent && other.frameType === "CheckButton"),
        )!;
        const buttons = world.frames.filter((frame) => frame.parent === box.parent && frame.template === "UIPanelButtonTemplate");
        return { box, reminderType: buttons[0]!, add: buttons[1]! };
    }

    function findIdBox(label: string): FakeFrame {
        const row = findLabel(world, label)!.parent;
        return world.frames.filter((frame) => frame.parent === row && frame.frameType === "EditBox")[1]!;
    }

    function state(): ClientState {
        return world.state;
    }

    function readSettings(): Record<string, unknown> {
        return world.getSavedSettings() as Record<string, unknown>;
    }

    beforeEach(() => {
        world = createWorld((state) => {
            playAs(state, WARRIOR);
            learnSpell(state, RECKLESSNESS);
            learnSpell(state, SHIELD_BASH);
            state.spells[RECKLESSNESS_ELSEWHERE.id] = RECKLESSNESS_ELSEWHERE;
            state.bars[2] = RECKLESSNESS.id;
            state.bars[4] = SHIELD_BASH.id;
        });
        world.advance(1);
        toggleTable();
    });

    it("shows the ID of a cooldown in its row", () => {
        const box = findIdBox("Recklessness");
        expect(box.text).toBe("1719");
    });

    it("lists the types, and shows the one picked", () => {
        const { reminderType: kind } = findAddRow();
        expect(world.openMenu(kind).map((choice) => choice.label)).toEqual([
            "Ready cooldown",
            "Proc",
            "Missing buff",
            "Weapon buff",
            "Low reagent",
            "Low stock",
            "Missing seal",
            "Missing tracking",
        ]);
        world.pickFromMenu(kind, "Missing tracking");
        expect(kind.text).toBe("Missing tracking");
        const chosen = world.openMenu(kind).filter((choice) => choice.isChosen());
        expect(chosen.map((choice) => choice.label)).toEqual(["Missing tracking"]);
    });

    it("says what to enter over the heading of the add row, not on its box", () => {
        const { box } = findAddRow();
        expect(box.scripts.OnEnter).toBeUndefined();
        const hover = world.frames.find((frame) => frame.parent === box.parent && frame.frameType === "Frame")!;
        hover.scripts.OnEnter!(hover);
        const tip = world.findFrame((frame) => frame.name === "GameTooltip")?.text;
        expect(tip).toContain("Low stock needs an Item ID, every other type a Spell ID.");
    });

    it("takes a fixed ID for a cooldown of the list", () => {
        const box = findIdBox("Recklessness");
        box.text = "777001";
        box.scripts.OnEditFocusLost!(box);
        expect((readSettings().idOverrides as Record<string, number>)["1719"]).toBe(777001);
        expect(findIdBox("Recklessness").text).toBe("777001");
    });

    it("keeps the ID and says so when the client knows no spell by the new one", () => {
        const box = findIdBox("Recklessness");
        box.text = "999999";
        box.scripts.OnEditFocusLost!(box);
        expect((readSettings().idOverrides as Record<string, number>)["1719"]).toBeUndefined();
        expect(world.notice()).toContain("No spell found with ID 999999.");
        expect(box.text).toBe("1719");
    });

    it("adds a spell by its ID as a cooldown, which then glows when it is back in a fight", () => {
        const { box, add } = findAddRow();
        box.text = "72";
        add.scripts.OnClick!(add);
        expect(readSettings().addedSpells).toEqual([{ id: 72, reminderType: "readyCooldown" }]);
        expect(findLabel(world, "Shield Bash")).toBeDefined();
        world.state.isInCombat = true;
        world.state.cooldowns[SHIELD_BASH.id] = { start: 0, duration: 99999 };
        world.advance(0.5);
        world.state.cooldowns[SHIELD_BASH.id] = undefined;
        world.advance(0.5);
        expect(world.glowsOn(4)).toBe(1);
    });

    it("adds a spell as a proc once Proc is picked", () => {
        const { box, reminderType, add } = findAddRow();
        world.pickFromMenu(reminderType, "Proc");
        box.text = "72";
        add.scripts.OnClick!(add);
        expect(readSettings().addedSpells).toEqual([{ id: 72, reminderType: "proc" }]);
    });

    it("does not add a spell that is in the list already, and says so", () => {
        const { box, add } = findAddRow();
        box.text = "1719";
        add.scripts.OnClick!(add);
        expect(readSettings().addedSpells).toEqual([]);
        expect(world.notice()).toContain("Recklessness is already in the list.");
    });

    it("does not add a spell with no cooldown as a cooldown, and says so", () => {
        const { box, add } = findAddRow();
        state().spells[687] = { id: 687, name: "Demon Skin", rank: 1, icon: 136185, isHelpful: true };
        box.text = "687";
        add.scripts.OnClick!(add);
        expect(readSettings().addedSpells).toEqual([]);
        expect(world.notice()).toContain("Demon Skin has no cooldown, pick another type.");
    });

    it("does not add a spell as another type than the one picked, even one with a reagent", () => {
        const { box, reminderType, add } = findAddRow();
        const picked = reminderType.text;
        state().spells[29893] = { id: 29893, name: "Ritual of Souls", rank: 1, icon: 136194, isHelpful: true };
        state().reagentTexts[29893] = "Soul Shard";
        box.text = "29893";
        add.scripts.OnClick!(add);
        expect(readSettings().addedSpells).toEqual([]);
        expect(world.notice()).toContain("Ritual of Souls has no cooldown, pick another type.");
        expect(reminderType.text).toBe(picked);
        expect(box.text).toBe("29893");
    });

    it("does not add a spell with a cooldown and no reagent as a low reagent, and says so", () => {
        const { box, reminderType, add } = findAddRow();
        world.pickFromMenu(reminderType, "Low reagent");
        box.text = "72";
        add.scripts.OnClick!(add);
        expect(readSettings().addedSpells).toEqual([]);
        expect(world.notice()).toContain("Shield Bash uses no reagent, pick another type.");
    });

    it("takes out an added spell with its X button", () => {
        const { box, add } = findAddRow();
        box.text = "72";
        add.scripts.OnClick!(add);
        const row = findLabel(world, "Shield Bash")!.parent;
        const remove = world.frames.filter((frame) => frame.parent === row && frame.template === "UIPanelButtonTemplate")[2]!;
        remove.scripts.OnClick!(remove);
        expect(readSettings().addedSpells).toEqual([]);
    });
});

describe("the spells of other types a player adds", () => {
    const DEMON_SKIN: SpellDefinition = { id: 687, name: "Demon Skin", rank: 1, icon: 136185, isHelpful: true };
    const SHARPEN: SpellDefinition = { id: 2828, name: "Sharpen Blade", rank: 1, icon: 135248, isHelpful: true };
    const RITUAL: SpellDefinition = { id: 29893, name: "Ritual of Souls", rank: 1, icon: 136194, isHelpful: true };
    let world!: World;

    /** Adds a spell in the table as this type. */
    function addAs(spellId: number, type: string): void {
        const box = world.frames.find(
            (frame) =>
                frame.frameType === "EditBox" &&
                !world.frames.some((other) => other.parent === frame.parent && other.frameType === "CheckButton"),
        )!;
        const [reminderType, add] = world.frames.filter(
            (frame) => frame.parent === box.parent && frame.template === "UIPanelButtonTemplate",
        );
        world.pickFromMenu(reminderType!, type);
        box.text = string.format("%d", spellId);
        add!.scripts.OnClick!(add!);
        world.advance(0.5);
    }

    beforeEach(() => {
        world = createWorld((state) => {
            playAs(state, WARRIOR);
            for (const spell of [DEMON_SKIN, SHARPEN, RITUAL]) learnSpell(state, spell);
            state.bars[1] = DEMON_SKIN.id;
            state.bars[2] = SHARPEN.id;
            state.bars[3] = RITUAL.id;
            state.reagentTexts[RITUAL.id] = "Soul Shard";
            state.itemIds["Soul Shard"] = 6265;
            state.bags[6265] = 1;
        });
        world.advance(1);
        toggleTable();
    });

    it("lights an added buff that is not on the player, and not once it is", () => {
        addAs(DEMON_SKIN.id, "Missing buff");
        expect(world.glowsOn(1)).toBe(1);
        world.state.auras.push(world.makeAura(DEMON_SKIN.name, DEMON_SKIN.id, 1800));
        world.fire("UNIT_AURA", "player");
        world.advance(0.5);
        expect(world.glowsOn(1)).toBe(0);
    });

    it("lights an added weapon buff while the weapon has no temporary enchant", () => {
        addAs(SHARPEN.id, "Weapon buff");
        expect(world.glowsOn(2)).toBe(1);
    });

    it("lights an added spell whose reagent, named in its tooltip, runs low, in a town", () => {
        world.state.isResting = true;
        addAs(RITUAL.id, "Low reagent");
        expect(world.glowsOn(3)).toBe(1);
        world.state.bags[6265] = 20;
        world.fire("BAG_UPDATE_DELAYED");
        world.advance(0.5);
        expect(world.glowsOn(3)).toBe(0);
    });
});

describe("the old rank of a spell, switched off in the table", () => {
    it("is not reminded of any more", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            for (const spell of [SMITE_RANK_1, SMITE_RANK_2]) learnSpell(state, spell);
            state.bars[1] = SMITE_RANK_1.id;
        });
        world.advance(3);
        expect(world.glowsOn(1)).toBe(1);
        toggleTable();
        const row = findLabel(world, "Smite")!.parent;
        const enabled = world.frames.filter((frame) => frame.parent === row && frame.frameType === "CheckButton")[1]!;
        enabled.isChecked = false;
        enabled.scripts.OnClick!(enabled);
        world.advance(0.5);
        expect(world.glowsOn(1)).toBe(0);
        expect((world.getSavedSettings()?.enabledRanks as Record<string, boolean>).Smite).toBe(false);
    });
});

describe("a buff of the list whose ID the player fixed", () => {
    it("is looked for by the new ID: its button glows", () => {
        const INNER_FIRE_HERE: SpellDefinition = { id: 999588, name: "Inner Fire", rank: 1, icon: 135926, isHelpful: true };
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, INNER_FIRE_HERE);
                state.bars[3] = INNER_FIRE_HERE.id;
            },
            { isTableAdvanced: true },
        );
        world.advance(1);
        expect(world.glowsOn(3)).toBe(0);
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        // The buff of the list (588); the learned spell of the same name has a row of its own, as an old rank may
        const boxes = world.frames.filter((frame) => frame.frameType === "EditBox" && frame.isShown && frame.text === "588");
        expect(boxes.length).toBe(1);
        const box = boxes[0]!;
        box.text = "999588";
        box.scripts.OnEditFocusLost!(box);
        world.advance(1);
        expect(world.glowsOn(3)).toBe(1);
    });
});

describe("the IDs that cannot be changed in the table", () => {
    it("are the ranks: the box shows the ID, and a new one is not taken", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, { id: 585, name: "Smite", rank: 1, icon: 135924, isHelpful: false });
            learnSpell(state, { id: 591, name: "Smite", rank: 2, icon: 135924, isHelpful: false });
        });
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        const row = findLabel(world, "Smite")!.parent;
        const box = world.frames.filter((frame) => frame.parent === row && frame.frameType === "EditBox")[1]!;
        box.text = "585";
        box.scripts.OnEditFocusLost!(box);
        expect(world.getSavedSettings()?.idOverrides).toEqual({});
        expect(findLabel(world, "Smite")).toBeDefined();
    });

    it("are those of a spell listed on another row: it would take that row's place", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            learnSpell(state, { id: 588, name: "Inner Fire", rank: 1, icon: 135926, isHelpful: true });
            learnSpell(state, { id: 1243, name: "Power Word: Fortitude", rank: 1, icon: 135987, isHelpful: true });
        });
        SlashCmdList["GLOWINGBARS"]!("", undefined as never);
        const row = findLabel(world, "Inner Fire")!.parent;
        const box = world.frames.filter((frame) => frame.parent === row && frame.frameType === "EditBox")[1]!;
        box.text = "1243";
        box.scripts.OnEditFocusLost!(box);
        expect(world.getSavedSettings()?.idOverrides).toEqual({});
        expect(world.notice()).toContain("Power Word: Fortitude is already in the list.");
        expect(box.text).toBe("588");
    });
});
