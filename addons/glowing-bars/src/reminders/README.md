# reminders/

What the addon reminds about, and when: missing buffs, the weapon buff, party members
missing a buff, spells at an old rank, the reagents running low in a town. Plain logic, in the words of [../../../../docs/glossary.md](../../../../docs/glossary.md).

- Never calls the game directly; it asks `packages/@wowkit/wow/src/` (`pnpm check` enforces it).
- Never shows anything; `tick/` shows what these services find.

| File | What it answers |
|---|---|
| `class-buffs.service.ts` | The buff list of the player's class, the switch of each buff, how long a buff lasts. |
| `buff-reminder.service.ts` | Which buffs are missing, and are they on the bars. |
| `party-buffs.service.ts` | Which party members miss one of the player's buffs; the group version when it pays (it asks `ReagentsService`  whether the reagent is there). |
| `outdated-ranks.service.ts` | Which spells on the bars are a lower rank than the highest the player knows. |
| `weapon/` | The weapon buff, in its own folder: `weapon-choice.service.ts` (which buff to keep up: the player's pick or the best learned) and `weapon-reminder.service.ts` (does it need attention), made of `weapon-reading.service.ts` (what the game says), `weapon-memory.service.ts` (the timeline it remembers) and `weapon-reactions.ts` (what to do with a reading). |
| `*.constants.ts`, `*.interface.ts` | The buff lists (data, no logic); their shapes. The spell IDs are in `@wowkit/wow-data`, the reagents in `../reagents/`. Adding a class buff means adding a row to `class-buffs.constants.ts`. |

Only `WeaponReminderService` uses the weapon memory and readings; the rest of the addon asks the reminder.
