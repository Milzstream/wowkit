// What the account has seen of the addon's releases, kept in the account's saved data (## SavedVariables): the last
// version it logged in with, and whether the What's new window may open by itself. After an update, at login, the window
// opens once if a release since then has something new, out of combat; a new player is told nothing (everything is new
// to them).
import { OnGameEvent, type OnAddonLoaded, type OnLogin } from "@wowkit/core";
import type { ClockService, PlayerService, SavedVariablesService } from "@wowkit/wow";
import { ADDON_VERSION, RELEASE_NOTES } from "../changelog/release-notes.generated";
import type { AddonLocale } from "../locale/locale.interface";
import { WhatsNewWindow } from "./whats-new-window";

/** The window waits this long after login, for the screen to settle. */
const OPEN_DELAY = 3;

/** What the account keeps. */
interface AccountData {
    /** The version the account last logged in with. */
    lastVersion?: string;
    /** The player ticked the box: the window does not open by itself. */
    isWhatsNewOff?: boolean;
}

/** Is version `a` newer than `b`? Their numbers compared one by one. */
export function isNewerVersion(a: string, b: string): boolean {
    const [partsA, partsB] = [string.gsub(a, "[^%d.]", "")[0], string.gsub(b, "[^%d.]", "")[0]];
    const numbersA: number[] = [];
    const numbersB: number[] = [];
    for (const [part] of string.gmatch(partsA, "(%d+)")) numbersA.push(tonumber(part) ?? 0);
    for (const [part] of string.gmatch(partsB, "(%d+)")) numbersB.push(tonumber(part) ?? 0);
    for (let index = 0; index < math.max(numbersA.length, numbersB.length); index++) {
        const difference = (numbersA[index] ?? 0) - (numbersB[index] ?? 0);
        if (difference !== 0) return difference > 0;
    }
    return false;
}

export class WhatsNewService implements OnAddonLoaded, OnLogin {
    private data: AccountData = {};
    private readonly window: WhatsNewWindow;
    /** The window is due, and waits for the fight to end. */
    private isWaitingForPeace = false;

    constructor(
        private readonly saved: SavedVariablesService,
        locale: AddonLocale,
        private readonly clock: ClockService,
        private readonly player: PlayerService,
    ) {
        this.window = new WhatsNewWindow(locale, { isOff: () => this.isOff(), setOff: (isOff) => this.setOff(isOff) });
    }

    /** Opens the window on a version's notes (the newest by default). */
    open(version?: string): void {
        this.window.open(version);
    }

    onAddonLoaded(): void {
        this.data = this.saved.loadTable<AccountData>() ?? {};
        this.saved.bindTable(this.data);
    }

    /** At login: the window, if a release since the last login has something new; the version is noted either way. */
    onLogin(): void {
        const last = this.data.lastVersion;
        this.data.lastVersion = ADDON_VERSION;
        if (last === undefined || this.data.isWhatsNewOff === true) return;
        const hasNew = RELEASE_NOTES.some(
            (note) => note.hasNew && isNewerVersion(note.version, last) && !isNewerVersion(note.version, ADDON_VERSION),
        );
        if (hasNew) this.clock.runAfter(OPEN_DELAY, () => this.openWhenAtPeace());
    }

    isOff(): boolean {
        return this.data.isWhatsNewOff === true;
    }

    setOff(isOff: boolean): void {
        this.data.isWhatsNewOff = isOff;
    }

    /** A fight that ends opens the window that waited for it. */
    @OnGameEvent("PLAYER_REGEN_ENABLED")
    openAfterFight(): void {
        if (!this.isWaitingForPeace) return;
        this.isWaitingForPeace = false;
        this.window.open();
    }

    private openWhenAtPeace(): void {
        if (this.player.isInCombat()) this.isWaitingForPeace = true;
        else this.window.open();
    }
}
