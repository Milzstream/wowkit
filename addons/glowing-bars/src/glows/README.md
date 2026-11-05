# glows/

The spells that glow because they are ready, not because something is missing. Plain logic, like `reminders/`; `tick/`
shows what these services find.

| File | What it answers |
|---|---|
| `glow-cues.constants.ts` | The important cooldowns and the procs of each class (data; the IDs are in `@wowkit/wow-data`). Adding one means adding an ID to the class. |
| `glow-cues.service.ts` | Which of them glow now: learned, on a button, switched on, and ready (a cooldown over, or a proc the game says is usable). |
| `stance-procs.service.ts` | Overpower and Revenge in any stance: the game calls them usable only in their own stance, so their openings are found from the warrior's combo point (Overpower) and the player's blocks, dodges and parries (Revenge). |
| `cooldown-tracker.service.ts` | Seconds left on a spell's cooldown. The client hides cooldowns in combat, so one read while readable is remembered, and a cast starts the spell's base cooldown. |
