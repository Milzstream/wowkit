import {
    beforeEach,
    createWorld,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    type FakeColorPicker,
    type SpellDefinition,
    type World,
    PRIEST,
    SMITE_RANK_1,
    SMITE_RANK_2,
} from "@wowkit/test-kit";
import { useAndRecoverRecklessness, setUpWarrior, findLabel, findRow, toggleTable, readSaved } from "./table.helpers";
describe("the table of looks", () => {
    let world!: World;

    beforeEach(() => {
        world = createWorld(setUpWarrior);
        world.advance(1);
        useAndRecoverRecklessness(world);
        toggleTable();
    });

    it("opens with /gb, a row for each type and for each spell of the class", () => {
        const window = world.findFrame((frame) => frame.name === "GlowingBarsLooks");
        expect(window?.isShown).toBe(true);
        for (const label of ["Missing buff", "Ready cooldown", "Proc", "Recklessness"]) {
            expect(findLabel(world, label)).toBeDefined();
        }
    });

    it("shows no type the character has no spell of: a warrior has no weapon buff and no reagent", () => {
        expect(findLabel(world, "Weapon buff")).toBeUndefined();
        expect(findLabel(world, "Low reagent")).toBeUndefined();
    });

    it("switches a cooldown off in the On column, and its glow goes out", () => {
        const row = findRow(world, "Recklessness");
        expect(row.enabled.isChecked).toBe(true);
        row.enabled.isChecked = false;
        row.enabled.scripts.OnClick!(row.enabled);
        expect((world.getSavedSettings()?.enabledSpells as Record<string, boolean>)["1719"]).toBe(false);
        expect(world.glowsOn(2)).toBe(0);
    });

    it("switches a whole type off in the On column", () => {
        const row = findRow(world, "Ready cooldown");
        row.enabled.isChecked = false;
        row.enabled.scripts.OnClick!(row.enabled);
        expect(world.getSavedSettings()?.isReadyCooldownEnabled).toBe(false);
        // The spells of the type are faded: they will not glow, whatever their own box says
        expect(findLabel(world, "Recklessness")!.parent!.alpha).toBe(0.4);
    });

    it("keeps its size on a screen it fits on", () => {
        world.findFrame((frame) => frame.name === "UIParent")!.width = 2000;
        toggleTable();
        toggleTable();
        expect(world.findFrame((frame) => frame.name === "GlowingBarsLooks")!.scale).toBe(1);
    });

    it("shrinks to fit a screen too narrow for it, and grows back on a wider one", () => {
        const screen = world.findFrame((frame) => frame.name === "UIParent")!;
        const window = world.findFrame((frame) => frame.name === "GlowingBarsLooks")!;
        screen.width = 800;
        toggleTable();
        toggleTable();
        expect(window.scale < 1).toBe(true);
        expect(window.width * window.scale <= 800).toBe(true);
        screen.width = 2000;
        toggleTable();
        toggleTable();
        expect(window.scale).toBe(1);
    });

    it("leaves out the Reset and X column while no row shows one of its buttons", () => {
        const window = world.findFrame((frame) => frame.name === "GlowingBarsLooks")!;
        const narrow = window.width;
        const row = findRow(world, "Recklessness");
        row.glowPercent.text = "40";
        row.glowPercent.scripts.OnEditFocusLost!(row.glowPercent);
        expect(window.width).toBe(narrow + 72);
        findRow(world, "Recklessness").reset.scripts.OnClick!(findRow(world, "Recklessness").reset);
        expect(window.width).toBe(narrow);
    });

    it("closes with /gb again", () => {
        toggleTable();
        expect(world.findFrame((frame) => frame.name === "GlowingBarsLooks")?.isShown).toBe(false);
    });

    it("changes the glow % of a spell when a percent is typed, and the glow follows", () => {
        const row = findRow(world, "Recklessness");
        row.glowPercent.text = "40";
        row.glowPercent.scripts.OnEnterPressed!(row.glowPercent);
        expect(readSaved(world, "spellStyles")["readyCooldown:Recklessness"]?.glowPercent).toBe(40);
        expect(world.glowAlphasOn(2)).toEqual([0.4]);
    });

    it("changes the glow % of a type for all of its spells", () => {
        const row = findRow(world, "Ready cooldown");
        row.glowPercent.text = "60";
        row.glowPercent.scripts.OnEnterPressed!(row.glowPercent);
        expect(readSaved(world, "styles").readyCooldown?.glowPercent).toBe(60);
        expect(world.glowAlphasOn(2)).toEqual([0.6]);
    });

    it("switches the message of a spell on", () => {
        const row = findRow(world, "Recklessness");
        row.message.isChecked = true;
        row.message.scripts.OnClick!(row.message);
        expect(readSaved(world, "spellStyles")["readyCooldown:Recklessness"]?.isMessageOn).toBe(true);
        expect(world.notice()).toContain("Cooldown ready");
    });

    it("takes the next sound on a click and plays it", () => {
        const row = findRow(world, "Recklessness");
        row.sound.scripts.OnClick!(row.sound, "LeftButton");
        expect(readSaved(world, "spellStyles")["readyCooldown:Recklessness"]?.sound).toBe("raidwarning");
        expect(world.sounds).toEqual([8959]);
    });

    it("takes the color the game's picker gives", () => {
        const row = findRow(world, "Recklessness");
        row.swatch.scripts.OnClick!(row.swatch);
        const picker = ColorPickerFrame as unknown as FakeColorPicker;
        picker.pickedColor = [1, 0, 0];
        picker.info!.swatchFunc();
        expect(readSaved(world, "spellStyles")["readyCooldown:Recklessness"]?.color).toEqual([1, 0, 0]);
    });

    it("keeps the saved percent when Escape is pressed in the box", () => {
        const row = findRow(world, "Recklessness");
        row.glowPercent.text = "40";
        row.glowPercent.scripts.OnEscapePressed!(row.glowPercent);
        // Letting go of the box saves what it shows
        row.glowPercent.scripts.OnEditFocusLost!(row.glowPercent);
        expect(row.glowPercent.text).toBe("100");
        expect(readSaved(world, "spellStyles")["readyCooldown:Recklessness"]).toBeUndefined();
    });

    it("keeps no change that is the same as what the spell inherits", () => {
        const row = findRow(world, "Recklessness");
        row.glowPercent.text = "100";
        row.glowPercent.scripts.OnEnterPressed!(row.glowPercent);
        expect(readSaved(world, "spellStyles")["readyCooldown:Recklessness"]).toBeUndefined();
    });

    it("forgets what the player changed for a spell on Reset", () => {
        const row = findRow(world, "Recklessness");
        row.glowPercent.text = "40";
        row.glowPercent.scripts.OnEnterPressed!(row.glowPercent);
        row.reset.scripts.OnClick!(row.reset);
        expect(readSaved(world, "spellStyles")["readyCooldown:Recklessness"]).toBeUndefined();
        expect(world.glowAlphasOn(2)).toEqual([1]);
    });
});

describe("the ranked spells of the table", () => {
    const MIND_BLAST: SpellDefinition = { id: 8092, name: "Mind Blast", rank: 1, icon: 136224, castTimeMs: 1500, isHarmful: true };

    it("are all the spells of the book that have ranks, on a bar or not", () => {
        const world = createWorld((state) => {
            playAs(state, PRIEST);
            for (const spell of [SMITE_RANK_1, SMITE_RANK_2, MIND_BLAST]) learnSpell(state, spell);
            state.bars[1] = SMITE_RANK_1.id;
        });
        world.advance(1);
        toggleTable();
        expect(findLabel(world, "Smite")).toBeDefined();
        expect(findLabel(world, "Mind Blast")).toBeDefined();
    });
});

describe("the table of looks and the Escape key", () => {
    it("closes on Escape by itself, not through the game's list of windows (that would taint the game's Escape)", () => {
        const world = createWorld(setUpWarrior);
        world.state.isInCombat = false;
        toggleTable();
        const window = world.findFrame((frame) => frame.name === "GlowingBarsLooks")!;
        expect(window.isShown).toBe(true);
        window.scripts.OnKeyDown!(window, "A");
        expect(window.isShown).toBe(true);
        window.scripts.OnKeyDown!(window, "ESCAPE");
        expect(window.isShown).toBe(false);
        expect((UISpecialFrames as string[]).includes("GlowingBarsLooks")).toBe(false);
    });
});
