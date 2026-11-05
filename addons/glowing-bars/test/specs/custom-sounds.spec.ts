import {
    beforeEach,
    createWorld,
    describe,
    expect,
    it,
    learnSpell,
    playAs,
    FORTITUDE,
    PRIEST,
    type FakeFrame,
    type World,
} from "@wowkit/test-kit";
import { findLabel, findRow, readSaved, setUpWarrior, toggleTable } from "./table.helpers";

const MAIN_FOLDER = "GlowingBars_Sounds";
const HORNS_FOLDER = "Horns";
const MAIN_FOLDER_SAVED = (count: number) => ({ customSoundFolders: [{ folder: MAIN_FOLDER, count }] });

describe("the Custom sounds section of the table", () => {
    let world!: World;

    function openTable(saved: Record<string, unknown>): void {
        world = createWorld(setUpWarrior, saved);
        world.advance(1);
        toggleTable();
    }

    /** The boxes of the folders, in the order of the list. */
    function listFolderBoxes(): FakeFrame[] {
        return world.frames.filter(
            (frame) => frame.frameType === "EditBox" && frame.isShown && frame.parent?.isShown === true && frame.width === 200,
        );
    }

    function findCountBox(folderBox: FakeFrame): FakeFrame {
        return world.frames.find((frame) => frame.parent === folderBox.parent && frame.frameType === "EditBox" && frame !== folderBox)!;
    }

    function enterText(box: FakeFrame, text: string): void {
        box.text = text;
        box.scripts.OnEditFocusLost!(box);
    }

    function findButton(text: string, parent?: FakeFrame): FakeFrame | undefined {
        return world.frames.find(
            (frame) =>
                frame.template === "UIPanelButtonTemplate" &&
                frame.text === text &&
                frame.isShown &&
                (parent === undefined || frame.parent === parent),
        );
    }

    function clickAddFolder(): void {
        const button = findButton("Add folder")!;
        button.scripts.OnClick!(button);
    }

    function listSoundLabels(): string[] {
        return world.openMenu(findRow(world, "Recklessness").sound).map((choice) => choice.label);
    }

    beforeEach(() => openTable(MAIN_FOLDER_SAVED(3)));

    it("has one line by default, with the folder filled in and no sounds yet", () => {
        openTable({});
        expect(findLabel(world, "Custom sounds") === undefined).toBe(false);
        const boxes = listFolderBoxes();
        expect(boxes.length).toBe(1);
        expect(boxes[0]!.text).toBe(MAIN_FOLDER);
        expect(findCountBox(boxes[0]!).text).toBe("0");
        expect(listSoundLabels().length).toBe(7);
    });

    it("says to reload after adding a folder, next to its button", () => {
        expect(findLabel(world, "Tip: type /reload after adding a folder.") === undefined).toBe(false);
    });

    it("has no X while there is one line, as a folder has to stay", () => {
        expect(findButton("X", listFolderBoxes()[0]!.parent)).toBeUndefined();
    });

    it("adds as many sounds to the list as typed, after the game's", () => {
        expect(listSoundLabels().slice(7)).toEqual(["Sounds 1", "Sounds 2", "Sounds 3"]);
        enterText(findCountBox(listFolderBoxes()[0]!), "5");
        expect(listSoundLabels().length).toBe(12);
    });

    it("keeps the number when the box is left empty", () => {
        const count = findCountBox(listFolderBoxes()[0]!);
        enterText(count, "");
        expect(count.text).toBe("3");
    });

    it("keeps the folder when the box is left empty, or a path is typed: only a name counts", () => {
        const box = listFolderBoxes()[0]!;
        enterText(box, "   ");
        expect(box.text).toBe(MAIN_FOLDER);
        enterText(box, "Interface\\AddOns\\Horns");
        expect(box.text).toBe(MAIN_FOLDER);
        enterText(box, "Sounds/Horns");
        expect(box.text).toBe(MAIN_FOLDER);
        enterText(box, ` ${HORNS_FOLDER} `);
        expect(box.text).toBe(HORNS_FOLDER);
    });

    it("drops a saved folder that is a path", () => {
        openTable({ customSoundFolders: [{ folder: "Interface\\AddOns\\Horns", count: 2 }] });
        expect(listFolderBoxes()[0]!.text).toBe(MAIN_FOLDER);
    });

    it("makes a long list scroll, not a short one", () => {
        listSoundLabels();
        expect(world.isMenuScrolling()).toBe(false);
        enterText(findCountBox(listFolderBoxes()[0]!), "40");
        expect(listSoundLabels().length).toBe(47);
        expect(world.isMenuScrolling()).toBe(true);
    });

    it("plays the .ogg when picked, and saves it", () => {
        world.state.soundFiles = [`Interface\\AddOns\\${MAIN_FOLDER}\\custom2.ogg`];
        const { sound } = findRow(world, "Recklessness");
        world.pickFromMenu(sound, "Sounds 2");
        expect(world.state.playedSoundFiles).toEqual([`Interface\\AddOns\\${MAIN_FOLDER}\\custom2.ogg`]);
        expect(readSaved(world, "spellStyles")["readyCooldown:Recklessness"]?.sound).toBe(`custom:${MAIN_FOLDER}:2`);
        expect(sound.text).toBe("Sounds 2");
    });

    it("plays the .mp3 when there is no .ogg", () => {
        world.state.soundFiles = [`Interface\\AddOns\\${MAIN_FOLDER}\\custom1.mp3`];
        world.pickFromMenu(findRow(world, "Recklessness").sound, "Sounds 1");
        expect(world.state.playedSoundFiles).toEqual([`Interface\\AddOns\\${MAIN_FOLDER}\\custom1.mp3`]);
    });

    it("plays nothing, and breaks nothing, when the file is missing", () => {
        const { sound } = findRow(world, "Recklessness");
        world.pickFromMenu(sound, "Sounds 3");
        expect(world.state.playedSoundFiles).toEqual([]);
        expect(sound.text).toBe("Sounds 3");
    });

    it("keeps a sound on a row when the number goes down", () => {
        openTable({ ...MAIN_FOLDER_SAVED(1), spellStyles: { "readyCooldown:Recklessness": { sound: `custom:${MAIN_FOLDER}:3` } } });
        expect(findRow(world, "Recklessness").sound.text).toBe("Sounds 3");
        expect(readSaved(world, "spellStyles")["readyCooldown:Recklessness"]?.sound).toBe(`custom:${MAIN_FOLDER}:3`);
    });

    it("goes back to the one line when what is saved makes no sense", () => {
        openTable({ customSoundFolders: "many" });
        expect(listFolderBoxes().length).toBe(1);
        expect(listFolderBoxes()[0]!.text).toBe(MAIN_FOLDER);
    });

    it("lists the sounds of another folder by its name, and plays them from there", () => {
        clickAddFolder();
        const boxes = listFolderBoxes();
        expect(boxes.length).toBe(2);
        enterText(boxes[1]!, HORNS_FOLDER);
        enterText(findCountBox(boxes[1]!), "2");
        expect(listSoundLabels().slice(7)).toEqual(["Sounds 1", "Sounds 2", "Sounds 3", "Horns 1", "Horns 2"]);
        world.state.soundFiles = [`Interface\\AddOns\\${HORNS_FOLDER}\\custom2.ogg`];
        world.pickFromMenu(findRow(world, "Recklessness").sound, "Horns 2");
        expect(world.state.playedSoundFiles).toEqual([`Interface\\AddOns\\${HORNS_FOLDER}\\custom2.ogg`]);
    });

    it("shortens a long folder name in the list, not in the box or on disk", () => {
        clickAddFolder();
        const box = listFolderBoxes()[1]!;
        expect(box.text).toBe("GlowingBars_My_Sounds");
        enterText(findCountBox(box), "1");
        expect(listSoundLabels().slice(10)).toEqual(["My Sounds 1"]);
        world.state.soundFiles = ["Interface\\AddOns\\GlowingBars_My_Sounds\\custom1.ogg"];
        const { sound } = findRow(world, "Recklessness");
        world.pickFromMenu(sound, "My Sounds 1");
        expect(sound.text).toBe("My Sounds 1");
        expect(world.state.playedSoundFiles).toEqual(["Interface\\AddOns\\GlowingBars_My_Sounds\\custom1.ogg"]);
    });

    it("takes a folder out with its X, and its sounds with it", () => {
        clickAddFolder();
        enterText(listFolderBoxes()[1]!, HORNS_FOLDER);
        enterText(findCountBox(listFolderBoxes()[1]!), "2");
        const remove = findButton("X", listFolderBoxes()[0]!.parent)!;
        remove.scripts.OnClick!(remove);
        expect(listFolderBoxes().length).toBe(1);
        expect(listFolderBoxes()[0]!.text).toBe(HORNS_FOLDER);
        expect(listSoundLabels().slice(7)).toEqual(["Horns 1", "Horns 2"]);
    });

    it("does not list a folder twice", () => {
        clickAddFolder();
        enterText(listFolderBoxes()[1]!, MAIN_FOLDER);
        enterText(findCountBox(listFolderBoxes()[1]!), "3");
        expect(listSoundLabels().slice(7)).toEqual(["Sounds 1", "Sounds 2", "Sounds 3"]);
    });
});

describe("a reminder with a sound of the player's own", () => {
    it("plays the file when it starts", () => {
        const world = createWorld(
            (state) => {
                playAs(state, PRIEST);
                learnSpell(state, FORTITUDE);
                state.bars[1] = FORTITUDE.id;
                state.soundFiles = [`Interface\\AddOns\\${MAIN_FOLDER}\\custom2.ogg`];
            },
            { styles: { missingBuff: { sound: `custom:${MAIN_FOLDER}:2` } } },
        );
        world.advance(1);
        expect(world.state.playedSoundFiles).toEqual([`Interface\\AddOns\\${MAIN_FOLDER}\\custom2.ogg`]);
        expect(world.sounds.length).toBe(0);
    });
});
