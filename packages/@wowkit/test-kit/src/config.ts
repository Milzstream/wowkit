// Set by the addon's run.ts from the command line before the first test runs.
export const config = {
    /** The built addon: dist/BuffReminder/BuffReminder.lua */
    addonPath: "",
    /** The addon's name: its folder name in the game, which the game gives its files as `...`. */
    addonName: "",
    /** The global the TOC saves per character. By convention the addon's name and CharDB. */
    savedVariables: "",
    /** The global of the account's saved data (## SavedVariables), when the addon has one. */
    accountVariables: "",
};
