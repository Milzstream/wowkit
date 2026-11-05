// What the addon says and plays: chat lines in its name, and the alert sounds the player can pick.
import type { NoticeService } from "@wowkit/wow";
import { SOUNDS, findCustomSound, type SoundKey } from "./sounds.constants";

export class MessagesService {
    constructor(
        private readonly notice: NoticeService,
        /** The addon's name as the player sees it; every chat line starts with it. */
        private readonly title: string,
    ) {}

    playAlertSound(key: SoundKey): void {
        const custom = findCustomSound(key);
        if (custom !== undefined) {
            this.notice.playSoundFile(string.format("Interface\\AddOns\\%s\\custom%d", custom.folder, custom.soundNumber));
            return;
        }
        const choice = SOUNDS.find((sound) => sound.key === key);
        if (choice?.id === undefined) return;
        this.notice.playSound(choice.kit, choice.id);
    }

    /** A line in the chat window, in the addon's name. */
    say(message: string): void {
        this.notice.printToChat(`|cff66ccff${this.title}|r: ${message}`);
    }
}
