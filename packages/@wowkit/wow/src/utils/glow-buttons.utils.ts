/** Does the glow already light exactly these buttons? */
export function isSameButtons(glowing: LuaSet<ActionButton>, buttons: ActionButton[]): boolean {
    const wanted = new LuaSet<ActionButton>();
    for (const button of buttons) {
        if (!glowing.has(button)) return false;
        wanted.add(button);
    }
    // Every wanted button glows already; none glows that is not wanted
    for (const button of glowing) if (!wanted.has(button)) return false;
    return true;
}
