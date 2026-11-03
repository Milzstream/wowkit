import {
    createWorld,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    targetEnemy,
    FORTITUDE,
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
const WHEN_LABELS = ["Always", "In combat", "Out of combat", "Enemy targeted", "In town", "Message in town"];

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
    const settings = { styles: { buff: { when: "combat" } } };

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
        expect(startPriest({ styles: { buff: { when: "noCombat" } } }, (state) => (state.isInCombat = true)).glowsOn(1)).toBe(0);
    });
});

describe("a missing buff that shows only with an enemy targeted", () => {
    const settings = { styles: { buff: { when: "target" } } };

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
    it("goes by its own, while the kind keeps the default", () => {
        const world = startPriest();
        toggleTable();
        const button = findWhenButton(world, FORTITUDE.name);
        expect(button.text).toBe("Always");
        button.scripts.OnClick!(button, "LeftButton");
        world.advance(0.5);
        expect(button.text).toBe("In combat");
        expect(world.glowsOn(1)).toBe(0);
        expect(readSaved(world, "styles").buff).toBeUndefined();
        expect(findWhenButton(world, "Missing buff").text).toBe("Always");
    });
});

describe("the When button of the table", () => {
    it("goes through the four choices, and back with a right click", () => {
        const world = startPriest();
        toggleTable();
        const button = findWhenButton(world, "Missing buff");
        const seen: string[] = [];
        for (let i = 0; i < 4; i++) {
            seen.push(button.text!);
            button.scripts.OnClick!(button, "LeftButton");
        }
        expect(seen).toEqual(["Always", "In combat", "Out of combat", "Enemy targeted"]);
        expect(button.text).toBe("Always");
        button.scripts.OnClick!(button, "RightButton");
        expect(button.text).toBe("Enemy targeted");
    });

    it("has In town, Message in town and Always for the low reagents, Message in town by default", () => {
        const world = startPriest();
        toggleTable();
        const button = findWhenButton(world, "Low reagent");
        const seen: string[] = [];
        for (let i = 0; i < 3; i++) {
            seen.push(button.text!);
            button.scripts.OnClick!(button, "LeftButton");
        }
        expect(seen).toEqual(["Message in town", "Always", "In town"]);
        expect(button.text).toBe("Message in town");
    });
});

describe("a When saved that the kind does not have", () => {
    it("is the kind's default again", () => {
        const world = startPriest({ styles: { buff: { when: "town" }, reagent: { when: "combat" } } });
        expect(readSaved(world, "styles").buff?.when).toBeUndefined();
        expect(readSaved(world, "styles").reagent?.when).toBeUndefined();
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
        expect(startPaladin({ styles: { seal: { when: "always" } } }).glowsOn(1)).toBe(1);
    });
});

describe("a low stock", () => {
    function arriveInTown(world: World): void {
        world.state.isResting = true;
        world.fire("PLAYER_UPDATE_RESTING");
        world.advance(1);
    }

    it("that shows in town glows and tells nothing out of one, both in one", () => {
        const world = createArcher(12, { styles: { stock: { when: "town" } } });
        expect(world.glowsOn(1)).toBe(0);
        expect(world.notice()).not.toContain("Running low");
        arriveInTown(world);
        expect(world.glowsOn(1)).toBe(1);
        expect(world.notice()).toContain("Running low: Rough Arrow (12)");
    });

    it("that shows its message in town glows anywhere, and tells only in one", () => {
        const world = createArcher(12, { styles: { stock: { when: "townText" } } });
        expect(world.glowsOn(1)).toBe(1);
        expect(world.notice()).not.toContain("Running low");
        arriveInTown(world);
        expect(world.notice()).toContain("Running low: Rough Arrow (12)");
    });

    it("has every choice of the When column", () => {
        const world = createArcher(12);
        toggleTable();
        const button = findWhenButton(world, "Low stock");
        const seen: string[] = [];
        for (let i = 0; i < 6; i++) {
            seen.push(button.text!);
            button.scripts.OnClick!(button, "LeftButton");
        }
        expect(seen).toEqual(["Always", "In combat", "Out of combat", "Enemy targeted", "In town", "Message in town"]);
    });
});
