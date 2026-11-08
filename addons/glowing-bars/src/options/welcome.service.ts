// The welcome window, once for each character, as its settings are the character's; What's new waits for it: the one setting a new player trips
// over, and a scan that lights each action button it finds, in the colors of a rainbow. /gb scan runs it again.
import { OnGameEvent, type OnLogin } from "@wowkit/core";
import type { ButtonSearchResult, ButtonSearchService, ClockService, GlowService, PlayerService } from "@wowkit/wow";
import { RAINBOW, RAINBOW_LAST_SECONDS, RAINBOW_STEP_SECONDS } from "../glows/rainbow.constants";
import type { MessagesService } from "@wowkit/ui";
import type { AddonLocale } from "../locale/locale.interface";
import type { AddonSettingsService } from "../settings/settings.interface";
import type { ScanReport } from "./scan-report";
import { WelcomeWindow } from "./welcome-window";
import type { WhatsNewService } from "./whats-new.service";

/** After login, like What's new. */
const OPEN_DELAY = 3;
const GLOW_KEY = "scan";

export class WelcomeService implements OnLogin {
    private readonly window: WelcomeWindow;
    private isWaitingForPeace = false;
    private isScanning = false;
    /** The scan was asked for with /gb scan: its result goes in the chat, not in the window. */
    private isResultForChat = false;

    constructor(
        private readonly search: ButtonSearchService,
        private readonly glow: GlowService,
        private readonly clock: ClockService,
        private readonly player: PlayerService,
        private readonly locale: AddonLocale,
        private readonly settings: AddonSettingsService,
        private readonly whatsNew: WhatsNewService,
        private readonly messages: MessagesService,
        private readonly report: ScanReport,
    ) {
        this.window = new WelcomeWindow(locale, {
            isQuiet: () => settings.get("shouldStayQuietInTowns"),
            setQuiet: (isQuiet) => settings.change("shouldStayQuietInTowns", isQuiet),
            isAfkRainbow: () => settings.get("isAfkRainbowOn"),
            setAfkRainbow: (isOn) => settings.change("isAfkRainbowOn", isOn),
            scan: () => this.scan(),
            noteClosed: () => this.whatsNew.openAfterWelcome(),
        });
    }

    onLogin(): void {
        if (this.settings.get("isWelcomeDone")) return;
        this.whatsNew.useWelcomeFirst();
        this.clock.runAfter(OPEN_DELAY, () => this.openWhenAtPeace());
    }

    /** /gb scan: the buttons light up, and the chat says what was found. */
    scanForChat(): void {
        this.isResultForChat = true;
        this.scan();
    }

    /** The window, and its scan: the first time, /gb welcome and the Settings page. */
    open(): void {
        this.settings.change("isWelcomeDone", true);
        this.window.open();
        this.scan();
    }

    @OnGameEvent("PLAYER_REGEN_ENABLED")
    openAfterFight(): void {
        if (!this.isWaitingForPeace) return;
        this.isWaitingForPeace = false;
        this.open();
    }

    private openWhenAtPeace(): void {
        if (this.player.isInCombat()) this.isWaitingForPeace = true;
        else this.open();
    }

    private scan(): void {
        if (this.isScanning) return;
        this.isScanning = true;
        this.window.showResult(this.locale.getText("WELCOME_SCANNING"), "");
        this.search.findButtons((result) => this.showNextGlow(result, this.search.listBars(), 0));
    }

    /** On every bar at once, one button further from its start, each staying lit until the end; then what was found. */
    private showNextGlow(result: ButtonSearchResult, bars: ActionButton[][], step: number): void {
        let isAnyLeft = false;
        for (const bar of bars) {
            const button = bar[step];
            if (button === undefined) continue;
            isAnyLeft = true;
            this.glow.showButtonGlow(GLOW_KEY, button, RAINBOW[step % RAINBOW.length]!, "circling");
        }
        if (isAnyLeft) this.clock.runAfter(RAINBOW_STEP_SECONDS, () => this.showNextGlow(result, bars, step + 1));
        else this.clock.runAfter(RAINBOW_LAST_SECONDS, () => this.showScanResult(result));
    }

    private showScanResult(result: ButtonSearchResult): void {
        for (const button of result.buttons) this.glow.clearButtonGlow(GLOW_KEY, button);
        this.isScanning = false;
        if (this.isResultForChat) this.messages.say(this.describe(result));
        else this.window.showResult(this.describe(result), this.report.buildReport(result));
        this.isResultForChat = false;
    }

    private describe(result: ButtonSearchResult): string {
        if (result.buttons.length === 0) return this.locale.getText("WELCOME_NO_BUTTONS");
        return string.format(this.locale.getText("WELCOME_FOUND"), result.buttons.length, result.found.length, result.hiddenCount);
    }
}
