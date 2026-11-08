import { createWorld, describe, expect, it, playAs, PRIEST, type World } from "@wowkit/test-kit";

/** A priest on an account that last logged in with `lastVersion` (undefined: the account's first run). */
function createAccountWorld(account?: Record<string, unknown>, isInCombat = false): World {
    const world = createWorld((state) => {
        playAs(state, PRIEST);
        state.accountSaved = account !== undefined ? { isWelcomeDone: true, ...account } : undefined;
        state.isInCombat = isInCombat;
    });
    world.advance(5);
    return world;
}

function isWindowShown(world: World): boolean {
    return world.findFrame((frame) => frame.name === "GlowingBarsWhatsNew")?.isShown === true;
}

describe("the What's new window", () => {
    it("stays closed on the account's first run, and notes the version it started with", () => {
        const world = createAccountWorld();
        expect(isWindowShown(world)).toBe(false);
        expect(world.getAccountSaved()?.lastVersion).toBeDefined();
    });

    it("opens once after an update with something new in it", () => {
        const world = createAccountWorld({ lastVersion: "1.0.0" });
        expect(isWindowShown(world)).toBe(true);
    });

    it("stays closed when nothing changed since the last login", () => {
        const current = createAccountWorld().getAccountSaved()?.lastVersion;
        expect(isWindowShown(createAccountWorld({ lastVersion: current }))).toBe(false);
    });

    it("stays closed for a player who ticked the box", () => {
        const world = createAccountWorld({ lastVersion: "1.0.0", isWhatsNewOff: true });
        expect(isWindowShown(world)).toBe(false);
    });

    it("waits for the fight to end", () => {
        const world = createAccountWorld({ lastVersion: "1.0.0" }, true);
        expect(isWindowShown(world)).toBe(false);
        world.state.isInCombat = false;
        world.fire("PLAYER_REGEN_ENABLED");
        expect(isWindowShown(world)).toBe(true);
    });

    it("opens with /gb changelog, while /gb alone still opens the table", () => {
        const world = createAccountWorld();
        SlashCmdList["GLOWINGBARS"]!("changelog", undefined as never);
        expect(isWindowShown(world)).toBe(true);
        expect(world.findFrame((frame) => frame.name === "GlowingBarsLooks")?.isShown === true).toBe(false);
    });

    it("has the same choice on the Settings page, the other way round", () => {
        const world = createAccountWorld({ lastVersion: "1.0.0" });
        const setting = world.proxySettings["GlowingBars_showWhatsNew"]!;
        expect(setting.get()).toBe(true);
        setting.set(false);
        expect(world.getAccountSaved()?.isWhatsNewOff).toBe(true);
    });

    it("keeps the ticked box for the whole account", () => {
        const world = createAccountWorld({ lastVersion: "1.0.0" });
        const box = world.frames.find((frame) => frame.frameType === "CheckButton" && frame.parent?.name === "GlowingBarsWhatsNew")!;
        box.isChecked = true;
        box.scripts.OnClick!(box);
        expect(world.getAccountSaved()?.isWhatsNewOff).toBe(true);
    });
});
