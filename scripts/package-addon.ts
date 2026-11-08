// Copies the static addon files (TOC, images, ...) from the addon's addon/ to its dist/<AddonName>/, filling in
// @version@ in the TOC, and makes the icon the TOC names (images/logo.tga) from the addon's assets/logo.png.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { convertPngToTga } from "./lib/tga.ts";
import { getAddonDir, readAddonPackageJson } from "./lib/paths.ts";

/** The game wants an icon whose sides are powers of two. */
const ICON_SIZE = 128;

const addonDir = getAddonDir();
const ADDON_DIR = `${addonDir}/addon`;
const pkg = readAddonPackageJson(addonDir);
const outDir = `${addonDir}/dist/${pkg.addon.name}`;
cpSync(ADDON_DIR, outDir, { recursive: true });

for (const file of readdirSync(ADDON_DIR).filter((f) => f.endsWith(".toc"))) {
    const content = readFileSync(`${ADDON_DIR}/${file}`, "utf8").replaceAll("@version@", pkg.version);
    writeFileSync(`${outDir}/${file}`, content);
}

const logo = `${addonDir}/assets/logo.png`;
if (existsSync(logo)) {
    mkdirSync(`${outDir}/images`, { recursive: true });
    writeFileSync(`${outDir}/images/logo.tga`, convertPngToTga(readFileSync(logo), ICON_SIZE));
}
const welcomeHeader = `${addonDir}/assets/welcome-header.png`;
if (existsSync(welcomeHeader)) {
    mkdirSync(`${outDir}/images`, { recursive: true });
    writeFileSync(`${outDir}/images/welcome-header.tga`, convertPngToTga(readFileSync(welcomeHeader), 512, 128));
}
console.log(`Packaged ${outDir}`);
