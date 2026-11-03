import { beforeEach, createWorld, describe, expect, it, playAs, PRIEST, type World } from "@wowkit/test-kit";

type Saved = Record<string, unknown>;

/** What 1.9.1 saved for a character who changed its settings. Every value is saved, the unchanged ones too. */
const SAVED_BY_1_9_1: Saved = {
    isMuted: false,
    hideResting: false,
    glowStyle: "still",
    roundGlowStyle: "still",
    showBuff: false,
    showWeapon: true,
    partyGroupMin: 3,
    raidGroupMin: 1,
    showRanks: false,
    showReagents: true,
    showCooldownsOutOfCombat: true,
    cooldownGlowSeconds: 5,
    reagentLow: 9,
    stockLow: 50,
    showStock: true,
    lowAt: { "stock:2512": 100, "reagent:17028": 7, "reagent:spell21562": 3 },
    styles: { buff: { isTextOn: true, opacity: 40, sound: "raidwarning" }, proc: { opacity: 60 } },
    spellStyles: { "cooldown:Recklessness": { isTextOn: true }, "buff:1248401": { opacity: 30 } },
    buffOn: { Fortitude: false },
    barOff: { "2": true },
    barFaded: { "3": true },
    customCues: [
        { id: 2512, kind: "stock" },
        { id: 1248401, kind: "buff" },
    ],
    reagentOn: { "17028": false },
    rankOff: { Smite: true },
    glowOn: { "1719": false },
};

function load(saved: Saved): { world: World; settings: Saved } {
    const world = createWorld((state) => playAs(state, PRIEST), saved);
    world.advance(1);
    return { world, settings: world.getSavedSettings() as Saved };
}

describe("the settings saved by 1.9.1", () => {
    let settings!: Saved;
    let styles!: Record<string, Saved>;
    let spellStyles!: Record<string, Saved>;

    beforeEach(() => {
        settings = load(SAVED_BY_1_9_1).settings;
        styles = settings.styles as Record<string, Saved>;
        spellStyles = settings.spellStyles as Record<string, Saved>;
    });

    it("keep the switches under their new names", () => {
        expect(settings.shouldStayQuietInTowns).toBe(false);
        expect(settings.isMissingBuffEnabled).toBe(false);
        expect(settings.isOldRankEnabled).toBe(false);
        expect(settings.partyGroupFrom).toBe(3);
        expect(settings.enabledBuffs).toEqual({ Fortitude: false });
        expect(settings.enabledReagents).toEqual({ "17028": false });
        expect(settings.enabledSpells).toEqual({ "1719": false });
        expect(settings.fadedBars).toEqual({ "3": true });
    });

    it("keep what is off, which is false now", () => {
        expect(settings.enabledRanks).toEqual({ Smite: false });
        expect(settings.barsThatGlow).toEqual({ "2": false });
    });

    it("keep the look of a type", () => {
        expect(styles.missingBuff?.isMessageOn).toBe(true);
        expect(styles.missingBuff?.glowPercent).toBe(40);
        expect(styles.missingBuff?.sound).toBe("raidwarning");
        expect(styles.proc?.glowPercent).toBe(60);
    });

    it("keep the look of a spell, and of a food by its ID", () => {
        expect(spellStyles["readyCooldown:Recklessness"]?.isMessageOn).toBe(true);
        expect(spellStyles["missingBuff:1248401"]?.glowPercent).toBe(30);
    });

    it("keep the spells and items that were added", () => {
        expect(settings.addedSpells).toEqual([
            { id: 2512, reminderType: "lowStock" },
            { id: 1248401, reminderType: "missingBuff" },
        ]);
    });

    it("warn at the same count: or fewer is one more below", () => {
        expect(settings.reagentBelow).toBe(10);
        expect(settings.stockBelow).toBe(51);
        expect(settings.belowLimits).toEqual({ "lowStock:2512": 101, "lowReagent:17028": 8, "lowReagent:spell21562": 4 });
    });

    it("turn the settings of all glows and cooldowns into looks", () => {
        for (const reminderType of ["missingBuff", "proc", "lowStock"]) expect(styles[reminderType]?.animation).toBe("none");
        expect(settings.roundAnimation).toBe("none");
        expect(styles.readyCooldown?.when).toBe("always");
        expect(styles.readyCooldown?.glowTime).toBe(5);
    });

    it("leave no old name behind", () => {
        for (const name of [
            "isMuted",
            "hideResting",
            "glowStyle",
            "roundGlowStyle",
            "showBuff",
            "reagentLow",
            "lowAt",
            "customCues",
            "glowOn",
            "barOff",
        ]) {
            expect(settings[name]).toBeUndefined();
        }
        expect(styles.buff).toBeUndefined();
        expect(spellStyles["cooldown:Recklessness"]).toBeUndefined();
    });
});

describe("the settings of 1.9.1 left at their defaults", () => {
    it("take the new defaults", () => {
        const { settings } = load({
            reagentLow: 5,
            stockLow: 20,
            cooldownGlowSeconds: 3,
            glowStyle: "circling",
            showCooldownsOutOfCombat: false,
            lowAt: {},
        });
        expect(settings.reagentBelow).toBe(10);
        expect(settings.stockBelow).toBe(20);
        const styles = settings.styles as Record<string, Saved | undefined>;
        expect(styles.readyCooldown).toBeUndefined();
        expect(styles.missingBuff).toBeUndefined();
    });
});

describe("settings already under the new names", () => {
    it("stay as they are, loaded again and again", () => {
        const first = load(SAVED_BY_1_9_1).settings;
        const second = load(first).settings;
        expect(second.reagentBelow).toBe(10);
        expect(second.belowLimits).toEqual(first.belowLimits);
        expect(second.addedSpells).toEqual(first.addedSpells);
        expect(second.enabledRanks).toEqual({ Smite: false });
        expect((second.styles as Record<string, Saved>).missingBuff?.glowPercent).toBe(40);
    });
});
