import { createWorld, describe, expect, it, learnSpell, playAs, FORTITUDE, PRIEST, type FakeFrame, type World } from "@wowkit/test-kit";

function createPlayer(isWelcomeDone: boolean, account?: Record<string, unknown>): World {
    return createWorld(
        (state) => {
            playAs(state, PRIEST);
            learnSpell(state, FORTITUDE);
            state.bars[1] = FORTITUDE.id;
            state.accountSaved = account;
        },
        { isWelcomeDone },
    );
}

function findWindow(world: World): FakeFrame | undefined {
    return world.findFrame((frame) => frame.name === "GlowingBarsWelcome");
}

describe("the welcome window", () => {
    it("opens once for a character that never saw it, on an old account too", () => {
        const world = createPlayer(false, { lastVersion: "2.7.0" });
        world.advance(4);
        expect(findWindow(world)?.isShown).toBe(true);
        expect(world.getSavedSettings()?.isWelcomeDone).toBe(true);
    });

    it("stays closed for a character that saw it", () => {
        const world = createPlayer(true);
        world.advance(4);
        expect(findWindow(world)?.isShown ?? false).toBe(false);
    });

    it("says what it found when the scan is over", () => {
        const world = createPlayer(false);
        world.advance(400);
        const window = findWindow(world)!;
        const report = world.frames.find((frame) => frame.parent === window && frame.frameType === "EditBox");
        expect(report?.text).toContain("buttons");
        expect(report?.text).toContain("PRIEST");
        expect(report?.text).toContain("no bar addon");
        expect(report?.text).toContain("spellbook");
        expect(report?.text).toContain("macros read");
    });

    it("scans with /gb scan, without the window, and says so in the chat", () => {
        const world = createPlayer(true);
        world.advance(1);
        SlashCmdList["GLOWINGBARS"]!("scan", undefined as never);
        world.advance(400);
        expect(findWindow(world)?.isShown ?? false).toBe(false);
        expect(world.chat.join("\n")).toContain("buttons");
    });
});

describe("/gb welcome", () => {
    it("opens the window and scans", () => {
        const world = createPlayer(true);
        world.advance(1);
        SlashCmdList["GLOWINGBARS"]!("welcome", undefined as never);
        expect(findWindow(world)?.isShown).toBe(true);
        world.advance(400);
        const window = findWindow(world)!;
        const report = world.frames.find((frame) => frame.parent === window && frame.frameType === "EditBox");
        expect(report?.text).toContain("buttons");
    });
});

describe("What's new with the welcome window", () => {
    it("waits until the welcome window is closed", () => {
        const world = createPlayer(false, { lastVersion: "1.0.0" });
        world.advance(4);
        const whatsNew = () => world.findFrame((frame) => frame.name === "GlowingBarsWhatsNew");
        expect(whatsNew()?.isShown ?? false).toBe(false);
        const window = findWindow(world)!;
        const ok = world.frames.find((frame) => frame.parent === window && frame.text === "OK")!;
        ok.scripts.OnClick!(ok);
        world.advance(0.5);
        expect(whatsNew()?.isShown).toBe(true);
    });
});
