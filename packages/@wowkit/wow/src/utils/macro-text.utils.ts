// What the text of a macro names.
import { attempt, attemptMulti } from "./protected-call.utils";
import { getReadable, getReadableId, isReadable } from "./secret-value.utils";

/** The spells and items named on the cast lines of a macro (#showtooltip, /cast ...), without conditions and ranks. */
export function listMacroTokens(body: string): string[] {
    const tokens: string[] = [];
    for (const [line] of string.gmatch(body, "[^\r\n]+")) {
        let [command] = string.match(line!, "^%s*#showtooltip%s+(.+)$");
        if (command === undefined) [command] = string.match(line!, "^%s*/%S+%s+(.+)$");
        if (command === undefined) continue;
        // Drop [conditions], then read each "Spell, Other Spell; Third"
        const [cleaned] = string.gsub(command, "%b[]", " ");
        for (const [rawToken] of string.gmatch(cleaned, "[^,;]+")) {
            let [token] = string.gsub(strtrim(rawToken!), "^!", "");
            [token] = string.gsub(token, "%s*%([^)]*%)%s*$", "");
            if (token !== "") tokens.push(token);
        }
    }
    return tokens;
}

/**
 * The macro on an action slot, by its name. Of a macro that shows an item the game gives a number that is not the macro's,
 * so its text cannot be read by it.
 */
export function findMacroOfSlot(slot: number): number | undefined {
    const name = getReadable(attempt(GetActionText, slot));
    if (name === undefined || name === "") return undefined;
    const index = getReadable(attempt(GetMacroIndexByName, name));
    return index !== undefined && index > 0 ? index : undefined;
}

/** What a macro names, as far as the game can tell. */
export interface MacroSpells {
    /** Of the spells: the names they go by. */
    names: string[];
    /** Of the spells and of what the items cast. */
    spellIds: unknown[];
    /** Does it use something the game could not name: an item the player may not have yet? */
    hasUnknownUse: boolean;
    /** The weapon it puts something on (/use 16 or /use 17). */
    handSlot?: number;
}

/** The spells of the cast lines of a macro (#showtooltip, /cast ...), and the items of its /use lines. */
export function readMacroSpells(macro: number | string): MacroSpells {
    const found: MacroSpells = { names: [], spellIds: [], hasUnknownUse: false };
    const body = attempt(GetMacroBody, macro);
    if (body === undefined || !isReadable(body)) return found;
    const isUsing = string.find(string.lower(body), "/use", 1, true)[0] !== undefined;
    found.handSlot = findHandSlot(body);
    // A number is an inventory slot (/use 17), not a spell
    for (const token of listMacroTokens(body)) if (tonumber(token) === undefined) readToken(token, isUsing, found);
    return found;
}

function findHandSlot(body: string): number | undefined {
    for (const [line] of string.gmatch(body, "[^\r\n]+")) {
        const [digits] = string.match(string.lower(line!), "^%s*/use%s+(1[67])%s*$");
        if (digits !== undefined) return tonumber(digits);
    }
    return undefined;
}

function readToken(token: string, isUsing: boolean, found: MacroSpells): void {
    const info = attempt(C_Spell.GetSpellInfo, token);
    if (info !== undefined && type(info) === "table") {
        found.names.push(isReadable(info.name) && info.name !== "" ? info.name : token);
        found.spellIds.push(info.spellID);
        return;
    }
    // A poison or a stone: the game names the spell it casts only of what is in the bags
    const [didRead, , spellId] = attemptMulti(() => C_Item.GetItemSpell(token));
    const id = didRead ? getReadableId(spellId) : undefined;
    if (id !== undefined) found.spellIds.push(id);
    else if (isUsing) found.hasUnknownUse = true;
}
