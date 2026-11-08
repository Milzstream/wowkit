# Glowing Bars

A World of Warcraft: Forever addon (TOC `16001`) that lights up your action bars. No window and no bars of its own: the
button you should press anyway glows. It replaces Buff Reminder, Rank Reminder and Reagent Reminder, and retires Know
Your Rotation.

**Works with your bars:** Blizzard's, Bartender4, Dominos, ElvUI, EllesmereUI and DaylightUI, and other bar addons are detected automatically. Not sure it sees yours? Type `/gb welcome`.

**Shape your messages:** choose what each message says, its color, size and position, and how it appears.

**New here?** The welcome window shows the two places for settings: Esc > Options > AddOns and `/gb`.

- **Missing buffs**: every missing buff of your class list (Fortitude, Mark of the Wild, aspects, paladin auras,
  armors...) glows on its action button, all at once (one per group). Of a group (one aspect, one aura, one armor) any
  member counts. In combat, when the client hides auras, buffs you saw or cast are remembered.
- **Weapon buffs**: shaman imbues, rogue poisons (per hand) and warlock stones glow when missing or about to run out
  (30 s).
- **Paladin seals**: in a fight (by default) with no seal up, the seal you used last glows (gold), already 1.5 seconds before it runs out. Before you have used one: the seal of your main talent
  tree (Holy Wisdom, Prot Righteousness, Ret Command), else the first on your bars. The game hides auras in combat,
  so a seal counts for its 30 seconds from your cast.
- **Gathering**: a miner or a herbalist with no tracking on sees Find Minerals or Find Herbs glow (turquoise), and a
  dwarf Find Treasure. Any tracking
  counts, so a hunter tracking beasts is left alone.
- **Not on your bars**: a message names missing buffs you have learned but put on no action bar.
- **Party buffs** (out of combat): a group member in range who misses one of your buffs (Fortitude, Mark of the Wild,
  Arcane Intellect for mana users, your blessing) makes its button glow; the message names them (their number past five).
  - **Party and raid**: each has its own switch. Off, only your own buffs are watched (a buff someone else cast on you
    counts).
  - **Group versions**: when enough miss the buff (you counted, but never you alone) and the reagent is in your bags, Prayer of Fortitude,
    Gift of the Wild or Arcane Brilliance glows instead. How many is yours to set, 1 to 5, for a party (2 by default)
    and for a raid (1 by default).
  - **Paladins**: each class gets the blessing you last gave it; before that, Wisdom for casters and healers, Kings or
    Might for the rest. A Greater Blessing when enough of a class miss it, by the same setting. In a raid only the
    classes you buffed there.
- **Reagents**: the group buff on your action bar (Prayer of Fortitude, Gift of the Wild...) glows, quietly, while its
  reagent runs low (below 10 by default, set in the Below column of the table); in a town or an inn a message on the
  screen names the reagents. Its When can also keep the glow to a town, or bring the message anywhere.
- **Low stock**: add any item by its Item ID (arrows, drinks, candles) as `Low stock` in the table. Below 20 (set in the Below column,
  for all items or for each one) a message on the screen says how many are left, and if the item is on a bar, its button glows too, even at none.
- **Ready cooldowns**: in a fight, an important cooldown of your class (Recklessness, Rapid Fire, Adrenaline Rush,
  Innervate...) or of your race (Blood Fury, Stoneform, Desperate Prayer...) glows when it is ready again after you used
  it, or after it was running as the fight began: for 3 seconds by default (its Glow time in the table: 1, 2, 5, 10 seconds, or until you press it). If you like, the ready
  ones glow as a fight starts too, a reminder to use them. Out of
  combat they glow only if you set their When to Always or Out of combat. The list is a default you can switch off spell by spell. When the client hides a
  cooldown in combat, the addon remembers the one it saw or started with a cast.
- **Procs**: Overpower and Revenge glow in any stance; the others glow while the game says they can be used: Overpower, Revenge, Execute, Victory Rush, Riposte,
  Counterattack, Mongoose Bite, Hammer of Wrath.
- **Old ranks**: a spell on your action bars that is a lower rank than the one you know glows, quietly. A spell in a macro doesn't count.
- Quiet while dead, mounted, on a taxi, or (unless switched off) resting in town.
- The glow runs around the button; in the table's Animation column, for each type or spell, it can be a clean line
  running around it instead (Blizzard's art of its rotation helper), breathe (stand still, as Blizzard's glow or its soft frame of a stealable buff,
  slowly fading out and in) or stand still, fading in and out only as it comes and goes. A round button cannot have a
  glow running around it: there circling breathes, or stands still, as the Settings page says.
- Each of the eight action bars can be switched off, for example to have the glow only on a big bar of cooldowns next to
  your character. Each of them can also be faded until its buttons glow (50% by default), so such a bar shows only
  what is due.

Every type of reminder has the same four settings: the **color** of its glow and message, the **glow %**
(1 to 100 percent), whether a short **message** at the top of the screen says so, and a **sound**. Each also has a **glow time**: how long the glow and the message show once it is due
(1, 2, 3, 5 or 10 seconds; until done, the default, keeps them until you cast the buff or press the cooldown; the ready
cooldowns 3 seconds). And each can **repeat** every 5, 10, 30 or 60 seconds: the glow, the message and the sound come
again, for the glow time (off by default). And **when** it shows: Always, In combat, Out of combat, or only with a
living Enemy targeted (a shaman's shield glowing as you target a mob before the pull, say). The low reagents and the low
stock can also be Alert in town, the low reagents' default: the glow anywhere, the message and the sound only in a town or an inn. Everything else shows always by default, but the ready cooldowns and the seals only in combat. The defaults: missing
buffs blue, weapon buffs orange, ready cooldowns white, procs red, old ranks and low reagents yellow (and a quieter glow
than the others), low stock a quieter red. By default only the old ranks, the reagents and the low stock show a message; the buff messages (including the ones that name a
buff on no bar and the party members who miss one) are there to switch on. They are set in a table, and every spell of your class can have a look of its own in the same table.
It opens with `/gb` or from the Settings page, in a Basic view with the main columns (the Advanced button at the top shows them all), and shows only the types your character has spells of. The Below column appears only when a row has a limit to set. Its Enabled column
switches a whole type or a single spell on and off. There you can also fix the spell ID of a spell of the lists, and add
spells of your own by their ID, as any type but an old rank (those are found for every spell), a seal of Forever too; a type the game says is
wrong for the spell is refused or put right. To find a spell's ID, switch on the spell IDs in the tooltips on the Settings
page: every spell tooltip then shows its ID, and an elixir's, potion's, food's or drink's the spell it casts. Added as a missing buff, such an item glows only on its own button, under its own name in the table, and not when none is left; a food or drink stops glowing once you have its Well Fed buff. Like the other
settings, the looks are kept per character.

**Custom sounds**: make a folder in `Interface\AddOns`, next to the addon's folder (the name `GlowingBars_Sounds` is filled in for you), and put your files in it,
named `custom1`, `custom2` and so on, as `.ogg` or `.mp3`. In the Custom sounds section of the table, enter how many there are: they are in the Sound list
as Sounds 1, Sounds 2 and so on. `Add folder` adds more folders in `AddOns`, whose sounds go by the folder's name (`Horns` is `Horns 1`, `GlowingBars_My_Sounds` is `My Sounds 1`). A short sound works best.

Settings (per character): *Options > AddOns > Glowing Bars*: the button that opens the table of looks, the spell IDs in
the tooltips (off by default), the action bars that glow, the party buff message, the weapon buff to keep up, when the
cooldowns glow, and a Help section with links to report problems. Blizzard's own action bars are supported, Forever's
gamepad bars, and Bartender4's, Dominos's, EllesmereUI's, ElvUI's and DaylightUI's bars (their bar N counts as Action Bar N;
EllesmereUI's bars 9 and 10 and ElvUI's bars of no Blizzard bar glow, but have no switch of their own).

**For UI addons** ([the whole guide](../../docs/glowing-bars-api.md)): an addon with action buttons of its own registers them with `GlowingBars.RegisterButton(button, bar)`,
`bar` being the Action Bar (1 to 8) the button counts as, for its switch and its fading, or `nil` for none. The button
keeps its action slot where Blizzard's do (`action`, as buttons made from `ActionBarButtonTemplate` or
LibActionButton-1.0 have it). A stance button has no slot: `GlowingBars.RegisterStanceButton(button, stance)` says
which stance (1 the first form, or a paladin's first aura) it stands for. A round button (a gamepad addon's) passes
`"Circle"` as a third argument to either, and gets a round glow instead of the square one. List `GlowingBars` in `## OptionalDeps`, so
the API is there when your addon loads:

```lua
if GlowingBars then
    for i = 1, 12 do GlowingBars.RegisterButton(_G["MyBarButton" .. i], 2) end
    for i = 1, GetNumShapeshiftForms() do GlowingBars.RegisterStanceButton(_G["MyStanceButton" .. i], i) end
end
```

How the code is organised: [src/](src/addon.ts), and [docs/architecture.md](../../docs/architecture.md). The old
addons are in the history, at the tags `buff-reminder-v1.0.2`, `rank-reminder-v1.0.2`, `reagent-reminder-v1.0.2` and
`know-your-rotation-v1.0.2`.
