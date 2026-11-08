// The slash command that opens the table of looks; /gb changelog opens the What's new window, /gb scan only the scan, /gb welcome the window with its scan.
import type { OnFirstLogin } from "@wowkit/core";
import type { StyleTableService } from "./style-table.service";
import type { WelcomeService } from "./welcome.service";
import type { WhatsNewService } from "./whats-new.service";

const COMMAND = "GLOWINGBARS";

export class TableCommand implements OnFirstLogin {
    constructor(
        private readonly table: StyleTableService,
        private readonly whatsNew: WhatsNewService,
        private readonly welcome: WelcomeService,
    ) {}

    onFirstLogin(): void {
        const globals = _G as unknown as Record<string, unknown>;
        globals[`SLASH_${COMMAND}1`] = "/gb";
        globals[`SLASH_${COMMAND}2`] = "/glowingbars";
        SlashCmdList[COMMAND] = (message) => {
            const word = string.lower(strtrim(message ?? ""));
            if (word === "changelog") this.whatsNew.open();
            else if (word === "scan") this.welcome.scanForChat();
            else if (word === "welcome") this.welcome.open();
            else this.table.toggle();
        };
    }
}
