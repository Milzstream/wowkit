# Glowing Bars

A World of Warcraft: Forever addon (TOC `16001`) that lights up your action bars. No window and no bars of its own: the
button you should press anyway glows. It replaces Buff Reminder, Rank Reminder and Reagent Reminder, and retires Know
Your Rotation.

- **Missing buffs**: every missing buff of your class list (Fortitude, Mark of the Wild, aspects, paladin auras,
  armors...) glows on its action button, all at once (one per group). Of a group (one aspect, one aura, one armor) any
  member counts. In combat, when the client hides auras, buffs you saw or cast are remembered.
- **Weapon buffs**: shaman imbues, rogue poisons (per hand) and warlock stones glow when missing or about to run out
  (30 s), with an alarm sound by default.
- **Paladin seals**: in a fight with no seal up, the seal you used last glows (gold), already 1.5 seconds before it runs out. Before you have used one: the seal of your main talent
  tree (Holy Wisdom, Prot Righteousness, Ret Command), else the first on your bars. The game hides auras in combat,
  so a seal counts for its 30 seconds from your cast.
- **Gathering**: a miner or a herbalist with no tracking on sees Find Minerals or Find Herbs glow (turquoise). Any tracking
  counts, so a hunter tracking beasts is left alone.
- **Not on your bars**: a message names missing buffs you have learned but put on no action bar.
- **Party buffs** (out of combat): a group member in range who misses one of your buffs (Fortitude, Mark of the Wild,
  Arcane Intellect for mana users, your blessing) makes its button glow; the message names them (their number past five).
  - **Group versions**: with two or more missing and the reagent in your bags, Prayer of Fortitude, Gift of the Wild or
    Arcane Brilliance glows instead.
  - **Paladins**: each class gets the blessing you last gave it; before that, Wisdom for casters and healers, Kings or
    Might for the rest. A Greater Blessing when two of a class miss it (or one, if you turn that on). In a raid only the
    classes you buffed there.
- **Reagents**: the group buff on your action bar (Prayer of Fortitude, Gift of the Wild...) glows, quietly, while its
  reagent runs low (5 or fewer by default, set on the Settings page), also in a town; on arriving in a town or an inn a message on the screen names the reagents.
- **Ready cooldowns**: in a fight, an important cooldown of your class (Recklessness, Rapid Fire, Adrenaline Rush,
  Innervate...) or of your race (Blood Fury, Stoneform, Desperate Prayer...) glows when it is ready again after you used
  it, or after it was running as the fight began: for 3 seconds by default (2, 5, 10, or until you press it). If you like, the ready
  ones glow as a fight starts too, a reminder to use them. Out of
  combat they glow only if you ask. The list is a default you can switch off spell by spell. When the client hides a
  cooldown in combat, the addon remembers the one it saw or started with a cast.
- **Procs**: a spell glows while the game says it can be used: Overpower, Revenge, Execute, Victory Rush, Riposte,
  Counterattack, Mongoose Bite, Hammer of Wrath.
- **Old ranks**: a spell on your action bars that is a lower rank than the one you know glows, quietly.
- Quiet while dead, mounted, on a taxi, eating, or (optionally) resting in town.
- The glow runs around the button; on the Settings page it can breathe (stand still, slowly fading out and in) or stand
  still, fading in and out only as it comes and goes.
- Each of the eight action bars can be switched off, for example to have the glow only on a big bar of cooldowns next to
  your character. Each of them can also be faded until its buttons glow (50% by default), so such a bar shows only
  what is due.

Every kind of reminder has the same four settings: the **color** of its glow and message, the **opacity** of the glow
(1 to 100 percent), whether a short **message** at the top of the screen says so, and a **sound**. Missing buffs, weapon
buffs, missing tracking and old ranks can also **repeat** their sound every 5, 10, 30 or 60 seconds while the glow is on,
the message coming again with it (off by default). The defaults: missing
buffs blue, weapon buffs orange, ready cooldowns white, procs red, old ranks and low reagents yellow (and a quieter glow
than the others). By default only the old ranks and the reagents show a message; the buff messages (including the ones that name a
buff on no bar and the party members who miss one) are there to switch on. They are set in a table, and every spell of your class can have a look of its own in the same table.
It opens with `/gb` or from the Settings page, and shows only the kinds your character has spells of. Its Enabled column
switches a whole kind or a single spell on and off. There you can also fix the spell ID of a spell of the lists, and add
spells of your own by their ID, as any type but an old rank (those are found for every spell), a seal of Forever too; a kind the game says is
wrong for the spell is refused or put right. To find a spell's ID, switch on the spell IDs in the tooltips on the Settings
page: every spell tooltip then shows its ID, and an elixir's, potion's or food's the spell it casts. Like the other
settings, the looks are kept per character.

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
