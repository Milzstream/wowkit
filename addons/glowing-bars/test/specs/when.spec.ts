import {
    createWorld,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    targetEnemy,
    FORTITUDE,
    HOLY_CANDLE,
    PRAYER_OF_FORTITUDE,
    PALADIN,
    PRIEST,
    type ClientState,
    type FakeFrame,
    type SpellDefinition,
    type World,
} from "@wowkit/test-kit";
import { findLabel, readSaved, toggleTable } from "./table.helpers";
import { createArcher } from "./low-stock.helpers";

const RIGHTEOUSNESS: SpellDefinition = { id: 20154, name: "Seal of Righteousness", rank: 1, icon: 132325, isHelpful: true };
const WHEN_LABELS = ["Always", "In combat", "Out of combat", "Enemy targeted", "Alert in town"];

/** A priest missing Fortitude, which sits on button 1. */
function setUpPriest(state: ClientState): void {
    playAs(state, PRIEST);
    learnSpell(state, FORTITUDE);
    state.bars[1] = FORTITUDE.id;
}

function startPriest(savedSettings?: Record<string, unknown>, setUp?: (state: ClientState) => void): World {
    const world = createWorld((state) => {
        setUpPriest(state);
        setUp?.(state);
    }, savedSettings);
    world.advance(1);
    return world;
}

/** The When button of the row with this label in the open table. */
function findWhenButton(world: World, label: string): FakeFrame {
    const row = findLabel(world, label)?.parent;
    if (row === undefined) throw new Error(`no row for ${label}`);
    return world.frames.find((frame) => frame.parent === row && frame.frameType === "Button" && WHEN_LABELS.includes(frame.text ?? ""))!;
}

describe("a missing buff that shows always, by default", () => {
    it("glows out of combat and in combat", () => {
        expect(startPriest().glowsOn(1)).toBe(1);
        expect(startPriest(undefined, (state) => (state.isInCombat = true)).glowsOn(1)).toBe(1);
    });
});

describe("a missing buff that shows only in combat", () => {
    const settings = { styles: { missingBuff: { when: "inCombat" } } };

    it("does not glow out of combat", () => {
        expect(startPriest(settings).glowsOn(1)).toBe(0);
    });

    it("glows as a fight starts", () => {
        const world = startPriest(settings);
        world.state.isInCombat = true;
        world.fire("PLAYER_REGEN_DISABLED");
        world.advance(0.1);
        expect(world.glowsOn(1)).toBe(1);
    });
});

describe("a missing buff that shows only out of combat", () => {
    it("does not glow in combat", () => {
        expect(startPriest({ styles: { missingBuff: { when: "outOfCombat" } } }, (state) => (state.isInCombat = true)).glowsOn(1)).toBe(0);
    });
});

describe("a missing buff that shows only with an enemy targeted", () => {
    const settings = { styles: { missingBuff: { when: "enemyTargeted" } } };

    it("does not glow with no target, not even in combat", () => {
        expect(startPriest(settings, (state) => (state.isInCombat = true)).glowsOn(1)).toBe(0);
    });

    it("glows as soon as the player targets an enemy, out of combat too", () => {
        const world = startPriest(settings);
        targetEnemy(world.state);
        world.fire("PLAYER_TARGET_CHANGED");
        world.advance(0.1);
        expect(world.glowsOn(1)).toBe(1);
    });

    it("does not glow on a dead enemy, nor on a friend", () => {
        expect(startPriest(settings, (state) => targetEnemy(state, { isDead: true })).glowsOn(1)).toBe(0);
        expect(startPriest(settings, (state) => targetEnemy(state, { isEnemy: false })).glowsOn(1)).toBe(0);
    });

    it("goes out when the target is cleared", () => {
        const world = startPriest(settings, (state) => targetEnemy(state));
        expect(world.glowsOn(1)).toBe(1);
        world.state.target = undefined;
        world.fire("PLAYER_TARGET_CHANGED");
        world.advance(0.1);
        expect(world.glowsOn(1)).toBe(0);
    });
});

describe("a spell with a When of its own", () => {
    it("goes by its own, while the type keeps the default", () => {
        const world = startPriest();
        toggleTable();
        const button = findWhenButton(world, FORTITUDE.name);
        expect(button.text).toBe("Always");
        world.pickFromMenu(button, "In combat");
        world.advance(0.5);
        expect(button.text).toBe("In combat");
        expect(world.glowsOn(1)).toBe(0);
        expect(readSaved(world, "styles").buff).toBeUndefined();
        expect(findWhenButton(world, "Missing buff").text).toBe("Always");
    });
});

describe("the When button of the table", () => {
    it("lists the four choices, and shows the one picked", () => {
        const world = startPriest();
        toggleTable();
        const button = findWhenButton(world, "Missing buff");
        expect(world.openMenu(button).map((choice) => choice.label)).toEqual(["Always", "In combat", "Out of combat", "Enemy targeted"]);
        world.pickFromMenu(button, "Enemy targeted");
        expect(button.text).toBe("Enemy targeted");
    });

    it("has every choice for the low reagents, as for the low stock, Alert in town by default", () => {
        const world = startPriest();
        toggleTable();
        const button = findWhenButton(world, "Low reagent");
        expect(button.text).toBe("Alert in town");
        expect(world.openMenu(button).map((choice) => choice.label)).toEqual([
            "Always",
            "In combat",
            "Out of combat",
            "Enemy targeted",
            "Alert in town",
        ]);
        expect(button.text).toBe("Alert in town");
    });
});

describe("a When saved that the type does not have", () => {
    it("is the type's default again", () => {
        const world = startPriest({ styles: { missingBuff: { when: "town" }, lowReagent: { when: "sometimes" } } });
        expect(readSaved(world, "styles").missingBuff?.when).toBeUndefined();
        expect(readSaved(world, "styles").lowReagent?.when).toBeUndefined();
        expect(world.glowsOn(1)).toBe(1);
    });
});

describe("a paladin's missing seal", () => {
    function startPaladin(savedSettings?: Record<string, unknown>, isInCombat = false): World {
        const world = createWorld((state) => {
            playAs(state, PALADIN);
            learnSpell(state, RIGHTEOUSNESS);
            state.bars[1] = RIGHTEOUSNESS.id;
            state.isInCombat = isInCombat;
        }, savedSettings);
        world.advance(1);
        return world;
    }

    it("glows only in combat by default", () => {
        expect(startPaladin().glowsOn(1)).toBe(0);
        expect(startPaladin(undefined, true).glowsOn(1)).toBe(1);
    });

    it("glows out of combat too when the player chose it to show always", () => {
        expect(startPaladin({ styles: { missingSeal: { when: "always" } } }).glowsOn(1)).toBe(1);
    });
});

describe("a low stock", () => {
    function arriveInTown(world: World): void {
        world.state.isResting = true;
        world.fire("PLAYER_UPDATE_RESTING");
        world.advance(1);
    }

    it("glows and tells anywhere by default, on a bar or not", () => {
        const world = createArcher(12, {}, true, false);
        expect(world.glowsOn(1)).toBe(1);
        expect(world.notice()).toContain("Running low: Rough Arrow (12)");
        expect(createArcher(12, {}, false, false).notice()).toContain("Running low: Rough Arrow (12)");
    });

    it("that alerts in town glows anywhere, and tells only in a town", () => {
        const world = createArcher(12, { styles: { lowStock: { when: "townAlert" } } }, true, false);
        expect(world.glowsOn(1)).toBe(1);
        expect(world.notice()).not.toContain("Running low");
        arriveInTown(world);
        expect(world.notice()).toContain("Running low: Rough Arrow (12)");
    });

    it("has every choice of the When column, Always by default", () => {
        const world = createArcher(12);
        toggleTable();
        const button = findWhenButton(world, "Low stock");
        expect(button.text).toBe("Always");
        expect(world.openMenu(button).map((choice) => choice.label)).toEqual([
            "Always",
            "In combat",
            "Out of combat",
            "Enemy targeted",
            "Alert in town",
        ]);
    });
});

describe("arriving in a town with an Alert in town and no repeat", () => {
    function arriveInTown(world: World): void {
        world.state.isResting = true;
        world.fire("PLAYER_UPDATE_RESTING");
        world.advance(1);
    }

    it("plays the low stock's sound and shows its message on arriving, and no more while there", () => {
        const world = createArcher(12, { styles: { lowStock: { sound: "raidwarning", when: "townAlert" } } }, true, false);
        expect(world.sounds.length).toBe(0);
        expect(world.notice()).not.toContain("Running low");
        arriveInTown(world);
        expect(world.sounds.length).toBe(1);
        expect(world.notice()).toContain("Running low: Rough Arrow (12)");
        world.advance(60);
        expect(world.sounds.length).toBe(1);
        expect(world.notice()).not.toContain("Running low");
    });

    it("plays the low reagent's sound and shows its message on arriving, and again on the next visit", () => {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, PRAYER_OF_FORTITUDE);
                state.reagentTexts[PRAYER_OF_FORTITUDE.id] = "Holy Candle";
                state.bags[HOLY_CANDLE] = 0;
                state.bars[1] = PRAYER_OF_FORTITUDE.id;
            },
            { styles: { lowReagent: { sound: "raidwarning" } } },
        );
        world.advance(2);
        expect(world.sounds.length).toBe(0);
        arriveInTown(world);
        expect(world.sounds.length).toBe(1);
        expect(world.notice()).toContain("Running low: Holy Candle (0)");
        world.advance(60);
        expect(world.sounds.length).toBe(1);
        world.state.isResting = false;
        world.fire("PLAYER_UPDATE_RESTING");
        world.advance(5);
        arriveInTown(world);
        expect(world.sounds.length).toBe(2);
    });
});
