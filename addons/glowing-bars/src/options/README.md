# options/

The addon's page in the game's Settings panel: one main page with every control, and a Help section at the bottom. Like
`packages/@wowkit/wow/src/`, this folder may call the game, because the Settings panel API is the game's.

| File | What it builds |
|---|---|
| `reminders.page.ts`, `weapon.section.ts`, `reagents.section.ts`, `glows.section.ts` | The page (an `OptionsPage` of `@wowkit/ui`): the switches per feature and per buff; its weapon buff, reagents, and cooldown and proc parts. |
| `style-table.service.ts`, `style-rows.service.ts`, `table-command.ts` | The table of looks (`/gb`): a window with a row for each type of reminder and each spell of the class: color, glow %, message, sound. The rows are plain lists; the window draws them. |
| `id-tooltip.service.ts` | The spell IDs in the spell and item tooltips (off by default; a switch under the table's button), to add a spell by its ID in the table. |
| `reminder-controls.service.ts` | The controls every reminder has, in this addon's words: a switch. Built on the controls of `@wowkit/ui`. |

The registration of the page, the Help section and the checkboxes, dropdowns and swatches are in `@wowkit/ui`; `addon.ts`
makes them with this addon's texts.

The page only reads and changes settings (`change`); whoever cares reacts to `setting.changed`.
