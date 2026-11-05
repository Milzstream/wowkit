// A button that opens a dropdown list of its choices, with the game's own menu.

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
            for (const choice of choices) root.CreateRadio(choice.label, choice.isChosen, choice.choose);
        });
    });
}
