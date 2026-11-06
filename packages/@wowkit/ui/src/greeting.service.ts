// One line in the chat at login (not after a reload or a loading screen). With `isShown`, only while a setting of the
// character's says so: the player may switch it off.
import type { OnLogin } from "@wowkit/core";
import type { MessagesService } from "./messages.service";

/** The setting that switches the greeting on or off. */
export interface GreetingSwitch {
    settings: { get(key: string): unknown };
    key: string;
}

export class GreetingService implements OnLogin {
    constructor(
        private readonly messages: MessagesService,
        private readonly greeting: string,
        private readonly isShown?: GreetingSwitch,
    ) {}

    onLogin(): void {
        if (this.isShown !== undefined && this.isShown.settings.get(this.isShown.key) === false) return;
        this.messages.say(this.greeting);
    }
}
