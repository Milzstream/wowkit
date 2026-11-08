// What a message says, by what the player chose for it.
import type { MessageTextChoice } from "../settings/settings.interface";

/** What a line says; `prefix` and `body` are its two halves where it says "Type: name". */
export interface Words {
    words: string;
    prefix?: string;
    body?: string;
}

export function findWords(choice: MessageTextChoice, customText: string | undefined, typeWords: string, name: string | undefined): Words {
    if (choice === "custom") return { words: customText ?? typeWords };
    if (choice === "typeOnly" || name === undefined) return { words: typeWords };
    return choice === "name" ? { words: name } : { words: `${typeWords}: ${name}`, prefix: typeWords, body: name };
}
