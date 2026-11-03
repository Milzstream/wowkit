import { createWorld, describe, expect, it, learnSpell, playAs, WARRIOR, type FakeFrame, type World } from "@wowkit/test-kit";
import { RECKLESSNESS, findLabel, setUpWarrior, toggleTable } from "./table.helpers";

const ADVANCED_ONLY = ["Spell / Item ID", "Glow %", "Repeat", "When", "Glow time", "Animation"];
const BOTH = ["Spell / Item", "Type", "Color", "Message", "Sound", "Below", "Enabled", "Actions"];

function createOpenTable(savedSettings: Record<string, unknown> = {}): World {
    const world = createWorld((state) => {
        setUpWarrior(state);
        playAs(state, WARRIOR);
        learnSpell(state, RECKLESSNESS);
    }, savedSettings);
    world.advance(1);
    toggleTable();
    return world;
}

function findWindow(world: World): FakeFrame {
    return world.findFrame((frame) => frame.name === "GlowingBarsLooks")!;
}

function isHeaderShown(world: World, text: string): boolean {
    const header = findWindow(world).fontStrings.find((other) => other.text === text);
    return header !== undefined && header.isShown !== false;
}

function findViewButton(world: World, text: string): FakeFrame {
    const button = world.frames.find((frame) => frame.parent === findWindow(world) && frame.text === text);
    if (button === undefined) throw new Error(`no ${text} button`);
    return button;
}

/** The controls of a row that are shown, by their frame types. */
function listShown(world: World, label: string, frameType: string): FakeFrame[] {
    const row = findLabel(world, label)!.parent;
    return world.frames.filter((frame) => frame.parent === row && frame.frameType === frameType && frame.isShown);
}

describe("the views of the table", () => {
    it("starts in Basic, with the columns everybody needs", () => {
        const world = createOpenTable();
        for (const text of BOTH) expect(isHeaderShown(world, text)).toBe(true);
        for (const text of ADVANCED_ONLY) expect(isHeaderShown(world, text)).toBe(false);
    });

    it("shows every column in Advanced", () => {
        const world = createOpenTable({ isTableAdvanced: true });
        for (const text of [...BOTH, ...ADVANCED_ONLY]) expect(isHeaderShown(world, text)).toBe(true);
    });

    it("is much narrower in Basic", () => {
        const basic = findWindow(createOpenTable()).width;
        const advanced = findWindow(createOpenTable({ isTableAdvanced: true })).width;
        expect(basic < advanced * 0.7).toBe(true);
    });

    it("hides the boxes and buttons of the other columns from the rows", () => {
        const basic = createOpenTable();
        expect(listShown(basic, "Recklessness", "EditBox").length).toBe(0);
        const advanced = createOpenTable({ isTableAdvanced: true });
        expect(listShown(advanced, "Recklessness", "EditBox").length).toBe(2);
    });

    it("switches with its button, which is saved and says where it leads", () => {
        const world = createOpenTable();
        const button = findViewButton(world, "Advanced");
        button.scripts.OnClick!(button);
        expect(world.getSavedSettings()?.isTableAdvanced).toBe(true);
        expect(button.text).toBe("Basic");
        expect(isHeaderShown(world, "When")).toBe(true);
        expect(listShown(world, "Recklessness", "EditBox").length).toBe(2);
        button.scripts.OnClick!(button);
        expect(world.getSavedSettings()?.isTableAdvanced).toBe(false);
        expect(button.text).toBe("Advanced");
        expect(isHeaderShown(world, "When")).toBe(false);
    });

    function readHeaderTips(world: World): string[] {
        const window = findWindow(world);
        const hovers = world.frames.filter((frame) => frame.parent === window && frame.frameType === "Frame" && frame.isShown);
        return hovers.map((hover) => {
            hover.scripts.OnEnter?.(hover);
            return world.findFrame((frame) => frame.name === "GameTooltip")?.text ?? "";
        });
    }

    it("explains its columns as the mouse comes over their headers: only the ones of the view", () => {
        const basic = readHeaderTips(createOpenTable());
        const advanced = readHeaderTips(createOpenTable({ isTableAdvanced: true }));
        expect(basic.length).toBe(7);
        expect(advanced.length).toBe(13);
        for (const tips of [basic, advanced]) {
            expect(tips.some((tip) => tip.includes("Reset: undoes your changes on this row."))).toBe(true);
            expect(tips.some((tip) => tip.includes("right-click for the one before"))).toBe(true);
        }
    });

    it("has no tooltip on the controls of a row", () => {
        const world = createOpenTable({ isTableAdvanced: true });
        const row = findLabel(world, "Recklessness")!.parent;
        const controls = world.frames.filter((frame) => frame.parent === row);
        expect(controls.length > 5).toBe(true);
        expect(controls.filter((control) => control.scripts.OnEnter !== undefined).length).toBe(0);
    });

    it("keeps applying what was set in a column that is hidden", () => {
        const world = createOpenTable({ styles: { readyCooldown: { when: "always" } } });
        expect(isHeaderShown(world, "When")).toBe(false);
        world.state.isInCombat = false;
        world.advance(1);
        expect(world.glowsOn(2)).toBe(1);
    });
});
