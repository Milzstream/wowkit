# tick/

The reminder loop. A *tick* looks at the game and shows what is due, in two stages:

1. `find-reminders.service.ts` finds everything that is due and returns a `Reminders` value (shows nothing).
2. `show-reminders.service.ts` shows it: sounds for what is new, the notice (`notices.service.ts`), the glows.

| Service | What it does |
|---|---|
| `tick.service.ts` | One tick, every 0.5 seconds (`@Interval(500)`). A tick makes as few new tables as it can: the reminders go into lists used again at every tick, and what changes only with an event (the added spells, the cooldown lists, the reagents and the stock, the old ranks) is kept until that event. |
| `refresh.service.ts` | When to look sooner: merges the requests that event bursts cause into one tick. The spells and the bars keep themselves fresh (`@wowkit/wow`); this asks for a tick when they say they changed. |
| `display.service.ts` | Redraws when the spell book, the bars or a setting changed (`@OnEvent`). |

The order in `addon.ts` is the order the lifecycle hooks run in (the spells and the action bars of `@wowkit/wow` read
the game at the first login, before a tick may run). Other features only use `RefreshService`, to ask the
tick to look sooner. Services say with decorators which game events they react to (see
[core/](../../../../packages/@wowkit/core/README.md)); search for an event name to find who reacts.
