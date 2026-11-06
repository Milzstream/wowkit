import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const ROOT = fileURLToPath(new URL("../../", import.meta.url)).replaceAll("\\", "/");
export const ROOT_PACKAGE_JSON = `${ROOT}package.json`;
export const CACHE_DIR = `${ROOT}.cache/wow-ui-source`;
export const DOCS_DIR = `${CACHE_DIR}/Interface/AddOns/Blizzard_APIDocumentationGenerated`;
export const MANUAL_TYPES_DIR = `${ROOT}packages/@wowkit/wow-types`;
export const GENERATED_TYPES_DIR = `${MANUAL_TYPES_DIR}/generated`;

export interface WowUiSource {
    repository: string;
    branch: string;
    commit: string;
}

/** Which commit of Blizzard's API documentation the typings are generated from (pinned in the root package.json). */
export function readWowUiSource(): WowUiSource {
    return (JSON.parse(readFileSync(ROOT_PACKAGE_JSON, "utf8")) as { wowUiSource: WowUiSource }).wowUiSource;
}

/** The package.json of an addon: its name, its version (for the TOC) and the folder name the game loads. */
export interface AddonPackageJson {
    /** The package's name (glowing-bars): its release tags are <name>-v<version>. */
    name: string;
    version: string;
    addon: { name: string };
}

/** Every addon of the repository: the folders under addons/ (as paths from the root, e.g. "addons/buff-reminder"). */
export function listAddons(): string[] {
    return readdirSync(`${ROOT}addons`, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && existsSync(`${ROOT}addons/${entry.name}/package.json`))
        .map((entry) => `addons/${entry.name}`);
}

/** The addon a script builds, tests or deploys: the folder it is started in (pnpm runs a script there). */
export function getAddonDir(): string {
    const dir = process.cwd().replaceAll("\\", "/");
    if (!existsSync(`${dir}/package.json`) || !dir.startsWith(`${ROOT}addons/`)) {
        console.error(`Run this from an addon folder (e.g. addons/buff-reminder), or with pnpm --filter <addon>. Now in ${dir}`);
        process.exit(1);
    }
    return dir;
}

export function readAddonPackageJson(addonDir: string): AddonPackageJson {
    return JSON.parse(readFileSync(`${addonDir}/package.json`, "utf8")) as AddonPackageJson;
}

/** Folders whose files are source code of the project (the packages and the addons), not tests or typings. */
export function listSourceFolders(): string[] {
    return [
        "packages/@wowkit/core/src/",
        "packages/@wowkit/wow/src/",
        "packages/@wowkit/ui/src/",
        "packages/@wowkit/wow-data/src/",
        ...listAddons().map((addon) => `${addon}/src/`),
    ];
}
