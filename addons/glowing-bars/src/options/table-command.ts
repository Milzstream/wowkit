// The slash command that opens the table of looks; /gb changelog opens the What's new window.
import type { OnFirstLogin } from "@wowkit/core";
import type { StyleTableService } from "./style-table.service";
import type { WhatsNewService } from "./whats-new.service";

const COMMAND = "GLOWINGBARS";

export class TableCommand implements OnFirstLogin {
    constructor(
        private readonly table: StyleTableService,
        private readonly whatsNew: WhatsNewService,
    ) {}

    onFirstLogin(): void {
        const globals = _G as unknown as Record<string, unknown>;
        globals[`SLASH_${COMMAND}1`] = "/gb";
        globals[`SLASH_${COMMAND}2`] = "/glowingbars";
        SlashCmdList[COMMAND] = (message) => {
            if (string.lower(strtrim(message ?? "")) === "changelog") this.whatsNew.open();
            else this.table.toggle();
        };
    }
}
