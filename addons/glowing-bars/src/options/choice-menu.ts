// A button that opens a dropdown list of its choices, with the game's own menu.

/** How long a list may be before it scrolls, in lines; a line of the game's menu is 20 high. */
const MOST_LINES = 16;
const LINE_HEIGHT = 20;

/** One line of the list. */
export interface MenuChoice {
    label: string;
    isChosen: (this: void) => boolean;
    choose: (this: void) => void;
}

/** A click on the button lists the choices; picking one closes the list. */
export function connectChoiceMenu(button: Button, listChoices: () => MenuChoice[]): void {
    button.SetScript("OnClick", () => {
        const choices = listChoices();
        if (choices.length === 0) return;
        MenuUtil.CreateContextMenu(button, (_owner, root) => {
            if (choices.length > MOST_LINES) root.SetScrollMode(MOST_LINES * LINE_HEIGHT);
            for (const choice of choices) root.CreateRadio(choice.label, choice.isChosen, choice.choose);
        });
    });
}
