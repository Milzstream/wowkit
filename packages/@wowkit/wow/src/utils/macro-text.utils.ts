// What the text of a macro names.

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
