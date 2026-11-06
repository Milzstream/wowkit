// Spell info and spell resolution.
//
// Forever remaps many spell IDs, so a spell of the buff lists is resolved to the ID the player
// knows: by ID, by override, and finally by name through the spellbook index.
import { type EventBus, OnEvent, type OnFirstLogin, trimText } from "@wowkit/core";
import { type SpellBookService, isJunkSpellName } from "./spell-book.service";
import { attempt, attemptMulti, tryCall } from "./utils/protected-call.utils";
import { getReadable, isReadable } from "./utils/secret-value.utils";
import { SPELL_NAME_HINT } from "@wowkit/wow-data";

declare module "@wowkit/core/event-bus" {
    interface AppEvents {
        /** Spell lookups were invalidated (new spells learned, talents changed). */
        "spells.invalidated": [];
        /** The spellbook index was rebuilt (one frame after "spellbook.built"). */
        "spellbook.indexed": [];
    }
}

export class SpellsService implements OnFirstLogin {
    /** spell ID -> the ID the player knows, or false when not known (cached until invalidated). */
    private readonly resolveCache = new LuaMap<number, number | false>();
    /** The ID the client knows a spell by, when the player gave it another one (see useIdAlias). */
    private findAlias: (this: void, spellId: number) => number = (spellId) => spellId;

    constructor(
        private readonly book: SpellBookService,
        private readonly bus: EventBus,
    ) {}

    /** The spells are read once, at the first login. */
    onFirstLogin(): void {
        this.invalidateSpells(true);
        this.rebuildSpellBook(false);
    }

    @OnEvent("spellbook.built")
    noteSpellBookBuilt(): void {
        this.invalidateSpells(false);
        // One frame later, so the index build and the next tick never share a frame
        C_Timer.After(0, () => this.bus.emit("spellbook.indexed"));
    }

    /**
     * The addon's player may give a spell of a list another ID (one the client knows it by): from then on every question
     * about the spell is asked of that ID. `alias` returns the ID itself for every other spell.
     */
    useIdAlias(alias: (this: void, spellId: number) => number): void {
        this.findAlias = alias;
    }

    /** The answer for one spell is asked again: its ID was given another one. */
    forgetResolved(spellId: number): void {
        this.resolveCache.delete(spellId);
    }

    getSpellInfo(spellId: number | undefined): SpellInfo | undefined {
        if (spellId === undefined) return undefined;
        return attempt(C_Spell.GetSpellInfo, this.findAlias(spellId));
    }

    getSpellName(spellId: number | undefined): string | undefined {
        const info = this.getSpellInfo(spellId);
        return info ? getReadable(info.name) : undefined;
    }

    /** Rebuilds the spellbook index (see SpellBookService.rebuild). */
    rebuildSpellBook(isImmediate: boolean): void {
        this.book.rebuild(isImmediate);
    }

    /** The ID of a spell given by name (a cast name, a poison name). */
    resolveFromName(name: string | undefined): number | undefined {
        if (name === undefined || name === "" || isJunkSpellName(name)) return undefined;
        return this.findPlayerSpellByName(name) ?? this.lookUpSpellId(name);
    }

    /** The English spellbook name of a spell, for IDs the client does not name. */
    getHintName(spellId: number | undefined): string | undefined {
        // Read where it is, without a list: every label asks for it
        const hint = spellId !== undefined ? SPELL_NAME_HINT[spellId] : undefined;
        return type(hint) === "string" ? (hint as string) : (hint as string[] | undefined)?.[0];
    }

    /** Every English spellbook name a spell may have (a renamed spell has two). */
    getHintNames(spellId: number | undefined): string[] {
        const hint = spellId !== undefined ? SPELL_NAME_HINT[spellId] : undefined;
        if (hint === undefined) return [];
        return type(hint) === "string" ? [hint as string] : (hint as string[]);
    }

    getSpellLabel(spellId: number): string | undefined {
        return this.getSpellName(spellId) ?? this.getHintName(spellId);
    }

    /**
     * Forgets cached lookups. `shouldDropSpellBook` also drops the spellbook index; otherwise only
     * failed lookups are forgotten, so a newly learned rank resolves.
     */
    invalidateSpells(shouldDropSpellBook: boolean): void {
        for (const [id, resolved] of this.resolveCache) {
            if (shouldDropSpellBook || resolved === false) this.resolveCache.delete(id);
        }
        if (shouldDropSpellBook) this.book.invalidate();
        this.bus.emit("spells.invalidated");
    }

    /** The spell ID the player knows for this spell (by ID, override, name and spellbook). */
    resolve(spellId: number | undefined): number | undefined {
        if (spellId === undefined) return undefined;
        const cached = this.resolveCache.get(spellId);
        if (cached !== undefined) return cached === false ? undefined : cached;
        const id = this.findKnownId(this.findAlias(spellId));
        this.resolveCache.set(spellId, id ?? false);
        return id;
    }

    /** The ID the player knows for this spell, or the ID itself when none is known. */
    resolveOrSame(spellId: number): number {
        return this.resolve(spellId) ?? spellId;
    }

    isLearned(spellId: number | undefined): boolean {
        return this.resolve(spellId) !== undefined;
    }

    /**
     * Can the spell be cast right now (power, form, ...)? Undefined when the client gives no readable
     * answer. Battle Shout with 0 rage: false.
     */
    isCastable(spellId: number): boolean | undefined {
        const [didSucceed, isUsable] = attemptMulti(() => C_Spell.IsSpellUsable(this.findAlias(spellId)));
        if (!didSucceed || !isReadable(isUsable)) return undefined;
        return isUsable === true;
    }

    /** The texts of the spell's tooltip; undefined when the client has none. */
    getSpellTooltipTexts(spellId: number): string[] | undefined {
        const tooltip = attempt(C_TooltipInfo.GetSpellByID, this.findAlias(spellId));
        if (tooltip === undefined || type(tooltip) !== "table") return undefined;
        const texts: string[] = [];
        for (const line of tooltip.lines ?? []) {
            for (const text of [getReadable(line.leftText), getReadable(line.rightText)]) {
                if (text !== undefined) texts.push(text);
            }
        }
        return texts;
    }

    /** What the reagent line of a spell's tooltip lists, found by the client's own word for reagents; English where it has none. */
    readTooltipReagents(spellId: number): string | undefined {
        const word = (_G as unknown as { SPELL_REAGENTS?: unknown }).SPELL_REAGENTS;
        // The game's text may go on with a color or a placeholder
        const own = type(word) === "string" ? trimText(string.match(word as string, "^([^%%|]*)")[0] ?? "") : "";
        const labels = own !== "" ? [own, "Reagents:", "Reagent:"] : ["Reagents:", "Reagent:"];
        for (const text of this.getSpellTooltipTexts(spellId) ?? []) {
            for (const label of labels) if (string.sub(text, 1, label.length) === label) return string.sub(text, label.length + 1);
        }
        return undefined;
    }

    /** One spell ID of each spell in the player's spell book (and the pet's); empty until the book is read. */
    listSpellBookIds(): number[] {
        return this.book.listSpellIds();
    }

    /** The rank number from the spell's subtext ("Rank 2"); undefined without a rank or text. */
    getSpellRank(spellId: number): number | undefined {
        const text = getReadable(attempt(C_Spell.GetSpellSubtext, this.findAlias(spellId)));
        if (text === undefined) return undefined;
        const [digits] = string.match(text, "(%d+)");
        return digits !== undefined ? tonumber(digits) : undefined;
    }

    /** A spell was just learned (LEARNED_SPELL_IN_SKILL_LINE): add it to the ranks of its name. */
    noteLearnedSpell(spellId: number | undefined): void {
        const id = getReadable(spellId);
        const name = this.getSpellName(id);
        if (id !== undefined && name !== undefined && name !== "") this.book.noteLearned(id, name);
    }

    /** The highest learned rank of a spell (by name, from the spellbook index). */
    getHighestRank(spellId: number): number | undefined {
        const name = this.getSpellName(spellId);
        if (name === undefined || name === "") return undefined;
        let best: number | undefined;
        for (const id of this.book.getRanksByName(name)) {
            const rank = this.getSpellRank(id);
            if (rank !== undefined && (best === undefined || rank > best)) best = rank;
        }
        return best;
    }

    /** The ID the client gives a spell name; also for spells the player has not learned. */
    private lookUpSpellId(name: string): number | undefined {
        if (isJunkSpellName(name)) return undefined;
        const info = attempt(C_Spell.GetSpellInfo, name);
        if (!info) return undefined;
        const id = getReadable(info.spellID);
        const got = getReadable(info.name);
        if (id !== undefined && (got === undefined || got === name) && !isJunkSpellName(got ?? name)) return id;
        return undefined;
    }

    /** Learned, or in the spellbook (with overrides). */
    private isKnownToPlayer(id: number): boolean {
        return attempt(C_SpellBook.IsSpellKnown, id) === true || attempt(C_SpellBook.IsSpellInSpellBook, id) === true;
    }

    private findPlayerSpellByName(name: string): number | undefined {
        if (this.book.isReady()) return this.book.findSpellIdByName(name);
        // Before the index exists: the cheap name lookup, which also answers for spells not learned
        // yet, so ask whether it is known. Then warm the index in the background.
        const fromApi = this.lookUpSpellId(name);
        if (fromApi !== undefined && this.isKnownToPlayer(fromApi)) return fromApi;
        if (!this.book.isBuilding()) this.book.rebuild(false);
        return undefined;
    }

    /** The spell the client currently shows in place of this one (a form, a talent); the same ID when none. */
    private findOverride(spellId: number): number {
        const [didSucceed, override] = tryCall(C_Spell.GetOverrideSpell, spellId);
        return didSucceed && isReadable(override) && type(override) === "number" ? override! : spellId;
    }

    /** The names a spell goes by, without repeats: the client's name first, then the English hints. */
    private listSpellNames(spellId: number, overrideId: number): string[] {
        const names: string[] = [];
        for (const name of [
            this.getSpellName(overrideId) ?? this.getSpellName(spellId),
            ...this.getHintNames(spellId),
            ...this.getHintNames(overrideId),
        ]) {
            if (name !== undefined && name !== "" && !names.includes(name)) names.push(name);
        }
        return names;
    }

    /** The ID of a known spell with one of these names: by the name table, then by the spellbook. */
    private findKnownIdByNames(names: string[]): number | undefined {
        for (const name of names) {
            const fromName = this.lookUpSpellId(name);
            if (fromName !== undefined && this.isKnownToPlayer(fromName)) return fromName;
            const bookId = this.findPlayerSpellByName(name);
            if (bookId !== undefined) return bookId;
        }
        return undefined;
    }

    private findKnownId(spellId: number): number | undefined {
        const id = this.findOverride(spellId);
        if (this.isKnownToPlayer(id)) return id;
        if (id !== spellId && this.isKnownToPlayer(spellId)) return spellId;
        return this.findKnownIdByNames(this.listSpellNames(spellId, id));
    }
}
