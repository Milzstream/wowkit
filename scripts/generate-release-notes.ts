// Writes the release notes of an addon (its release-notes/<version>.md) into its source, for the What's new window:
// src/changelog/release-notes.generated.ts, newest first. The Markdown becomes the game's text: a "### New" heading
// gold, a "- item" a bullet, **bold** and `code` plain words. The date of each is its release tag's (<package name>-v<version>),
// today's for a version not tagged yet.
//
//   node ../../scripts/generate-release-notes.ts      (from the addon's folder, as its build does)
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { getAddonDir, readAddonPackageJson } from "./lib/paths.ts";

/** The gold of the game's own headings. */
const HEADING_COLOR = "ffd100";

const addonDir = getAddonDir();
const notesDir = `${addonDir}/release-notes`;
const outDir = `${addonDir}/src/changelog`;
const pkg = readAddonPackageJson(addonDir);

/** "2.10.1" after "2.9.0": the version's numbers compared one by one, the newest first. */
function compareVersions(a: string, b: string): number {
    const [pa, pb] = [a.split(".").map(Number), b.split(".").map(Number)];
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const difference = (pb[i] ?? 0) - (pa[i] ?? 0);
        if (difference !== 0) return difference;
    }
    return 0;
}

/** The day a version was released (2026-11-06): its tag's, or today's when it has none yet. */
function findReleaseDate(version: string): string {
    try {
        const date = execFileSync("git", ["log", "-1", "--format=%as", `${pkg.name}-v${version}`], {
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
        }).trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    } catch {
        // No such tag: a version not released yet
    }
    return new Date().toISOString().slice(0, 10);
}

/** One line of Markdown as the game shows it; undefined for the title line ("## Glowing Bars 2.4.1"). */
function convertLine(line: string): string | undefined {
    if (/^##\s/.test(line)) return undefined;
    const plain = line.replaceAll("**", "").replaceAll("`", "").replaceAll("|", "||");
    const heading = /^###\s+(.*)$/.exec(plain);
    if (heading !== null) return `|cff${HEADING_COLOR}${heading[1]}|r`;
    return plain.replace(/^-\s+/, "• ");
}

const notes = existsSync(notesDir)
    ? readdirSync(notesDir)
          .filter((file) => /^\d+\.\d+\.\d+\.md$/.test(file))
          .map((file) => {
              const version = file.replace(/\.md$/, "");
              const markdown = readFileSync(`${notesDir}/${file}`, "utf8");
              const lines = markdown.split(/\r?\n/).map(convertLine);
              const text = lines
                  .filter((line): line is string => line !== undefined)
                  .join("\n")
                  .trim();
              return { version, date: findReleaseDate(version), hasNew: /^###\s+New\s*$/m.test(markdown), text };
          })
          .sort((a, b) => compareVersions(a.version, b.version))
    : [];

const entries = notes.map(
    (note) =>
        `    { version: ${JSON.stringify(note.version)}, date: ${JSON.stringify(note.date)}, hasNew: ${note.hasNew}, text: ${JSON.stringify(note.text)} },`,
);
const source = `// Written by scripts/generate-release-notes.ts from release-notes/*.md, at each build: not to be edited by hand.

/** The version of the addon this build is. */
export const ADDON_VERSION = ${JSON.stringify(pkg.version)};

export interface ReleaseNote {
    version: string;
    /** The day it was released (2026-11-06). */
    date: string;
    /** Has it a "New" section: is it worth telling the player about? */
    hasNew: boolean;
    /** The notes as the game shows them. */
    text: string;
}

/** Every release, the newest first. */
export const RELEASE_NOTES: ReleaseNote[] = [
${entries.join("\n")}
];
`;
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/release-notes.generated.ts`, source);
console.log(`Wrote ${notes.length} release notes to ${outDir}/release-notes.generated.ts`);
