// Entry of the test bundle: luajit dist-test/tests.lua dist/GlowingBars/GlowingBars.lua
import { config, runAll } from "@wowkit/test-kit";
import "./specs";

const [addonPath] = [...$vararg] as string[];
if (addonPath === undefined) {
    print("usage: luajit tests.lua <path to the addon's .lua file>");
    os.exit(2);
}
config.addonPath = addonPath;
// The file is named after the addon, as the game wants
const [addonName] = string.match(addonPath, "([^/\\]+)%.lua$");
config.addonName = addonName ?? "";
config.savedVariables = `${config.addonName}CharDB`;
config.accountVariables = `${config.addonName}DB`;
os.exit(runAll() ? 0 : 1);
