// ESLint: the standard TypeScript rules, plus the limits and names that keep the code easy to read.
// `npm run check` runs it; `npm run lint -- --fix` fixes what can be fixed by itself.
//
// What it does not check (scripts/check-names.ts and scripts/check-boundary.ts do): that a function
// name starts with a verb, and that only the game-facing folders touch the Blizzard API.
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

/** A boolean reads as a question: isFound, hasArrived, shouldRecheckDrop, showBuff. */
const QUESTION_WORDS = ["is", "has", "can", "should", "does", "did", "was", "will", "are", "had", "show", "hide"];

export default defineConfig(
    { ignores: ["dist/**", "dist-test/**", ".cache/**", "node_modules/**", "packages/@wowkit/wow-types/**", "**/*.generated.ts"] },
    {
        files: [
            "packages/@*/*/src/**/*.ts",
            "packages/@*/*/test/**/*.ts",
            "addons/*/src/**/*.ts",
            "addons/*/test/**/*.ts",
            "scripts/**/*.ts",
        ],
        extends: [js.configs.recommended, tseslint.configs.recommended, tseslint.configs.stylistic],
        languageOptions: {
            parserOptions: {
                project: [
                    "./addons/*/tsconfig.json",
                    "./addons/*/tsconfig.test.json",
                    "./packages/@*/*/tsconfig.test.json",
                    "./tsconfig.scripts.json",
                ],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            eqeqeq: "error",
            // One import per module: the type and the value names of a module go in the same statement
            "no-duplicate-imports": "error",
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            // The Lua tables of this addon are index signatures and `{ [key: string]: T }` reads fine
            "@typescript-eslint/consistent-indexed-object-style": "off",

            // Size limits: a file, a function and the number of branches in a function stay small
            "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
            "max-lines-per-function": ["error", { max: 60, skipBlankLines: true, skipComments: true }],
            complexity: ["error", 12],
        },
    },
    {
        // The names in the packages and the addons are ours (the test kit mirrors the game, so it is left out). The scripts mirror Blizzard's data and Node's option names.
        // Object literal properties are left out for the same reason (`{ recursive: true }`).
        files: [
            "packages/@wowkit/core/src/**/*.ts",
            "packages/@wowkit/wow/src/**/*.ts",
            "packages/@wowkit/ui/src/**/*.ts",
            "packages/@wowkit/wow-data/src/**/*.ts",
            "addons/*/src/**/*.ts",
        ],
        rules: {
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: ["variable", "parameter", "typeProperty", "classProperty", "accessor"],
                    types: ["boolean"],
                    format: ["PascalCase"],
                    prefix: QUESTION_WORDS,
                },
            ],
        },
    },
    {
        // The ID tables are literals only, one ID per line: their length is not complexity.
        files: ["packages/@wowkit/wow-data/src/**/*.ts"],
        rules: {
            "max-lines": "off",
        },
    },
    {
        // A describe block holds all the tests of a topic, so it is long by nature. The fake game
        // takes the game's loosely typed callbacks (scripts, event handlers) as they are.
        files: ["addons/*/test/**/*.ts", "packages/@*/*/test/**/*.ts", "packages/@wowkit/test-kit/src/**/*.ts"],
        rules: {
            "max-lines-per-function": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
);
