# Glowing Bars

**Your action bars light up for what you forgot.** No window, no bars of its own: the button you should press glows, right where you would press it anyway. Made for World of Warcraft: Forever.

[**Video**](https://www.youtube.com/watch?v=SRTQNBTOY_A)

## 🎮 Now with gamepad support (alpha)

Play with a controller? The glows also show on **Forever's own gamepad bars**, the class button included. Round buttons get a round glow of their own, with their own animation setting. It's new, so please tell me what you see.

## 🧩 Works with the following UI addons

**Bartender4**, **Dominos**, **EllesmereUI**, **ElvUI** and **DaylightUI**: the glows show on their buttons too, their stance bar included. Their bar 1 to 8 counts as Action Bar 1 to 8, so the bar switches and the faded bars work on them as well.

## What glows

*   **Missing buffs** – Fortitude, Mark of the Wild, Arcane Intellect, aspects, paladin auras, armors… Of a group (one aspect, one aura) any one counts. In combat, when the game hides your buffs, the ones you saw or cast are remembered.
*   **Party buffs** – out of combat, a group member in range who misses your buff makes its button glow.
    *   **Party and raid**: each has its own switch.
    *   **Group versions**: when enough miss the buff (you counted, but never you alone) and the reagent is in your bags, Prayer of Fortitude, Gift of the Wild or Arcane Brilliance glows instead. You set how many, 1 to 5: 2 by default in a party, 1 in a raid.
    *   **Paladins**: each class gets the blessing you last gave it; before that, Wisdom for casters and healers, Kings or Might for the rest. A Greater Blessing when enough of a class miss it, by the same setting. In a raid only the classes you buffed there.
*   **Weapon buffs** – shaman imbues, rogue poisons (per hand) and warlock stones, when missing or about to run out.
*   **Paladin seals** – in a fight with no seal up, the seal you used last glows gold, already a moment before it runs out. Before your first seal, the one of your talent tree.
*   **Gathering** – a miner or a herbalist with no tracking on sees Find Minerals or Find Herbs glow. Any tracking counts, so a hunter tracking beasts is left alone.
*   **Low reagents** – the group buff on your bar glows quietly while its reagent runs low (5 or fewer, or the limit you set), so you remember it in town.
*   **Cooldowns that are back** – in a fight, an important cooldown of your class or your race (Recklessness, Rapid Fire, Adrenaline Rush, Innervate, Swift Judgement, Blood Fury, Stoneform, Desperate Prayer…) glows for a few seconds when it is ready again. If you like, the ready ones also glow as a fight starts.
*   **Procs** – Overpower, Revenge, Execute, Victory Rush, Riposte, Counterattack, Mongoose Bite and Hammer of Wrath glow while you can use them.
*   **Old ranks** – a spell on your bars at a lower rank than the one you know glows quietly, and a short message tells you.

It stays quiet while you are dead, mounted, on a taxi or eating, and (if you like) while you rest in a town.

## Make it yours

Type **/gb** to open the table. Every reminder type has the same settings, and every spell of your class can have its own:

*   **Color** of the glow and of the message
*   **Glow opacity**, 1 to 100 %
*   **Message** at the top of the screen, on or off
*   **Sound**, from a short list of game sounds
*   **Repeat** (missing buffs, weapon buffs, tracking, old ranks): the sound plays again every 5, 10, 30 or 60 seconds while the glow is on, and the message with it (off by default)
*   **Enabled**: turn a whole type, or one spell, on or off

In the same table you can **add your own spells by their ID**, as any type, or fix the ID of a listed spell if the game uses another one. A new spell of Forever the addon doesn't know yet is a few clicks away. To find a spell's ID, turn on **Spell IDs in tooltips**.

The defaults: buffs blue, weapon buffs orange, seals gold, gathering turquoise, cooldowns white, procs red, old ranks and low reagents a quieter yellow. Only the old ranks and the low reagents (in a town) show a message by default; the glow is the reminder.

On the Settings page (_Options > AddOns > Glowing Bars_):

*   **Glow animation**: circling (Blizzard's own), breathing, or none
*   **Action bars that glow**: turn any of the eight bars off (your UI addon's bars too)
*   **Faded until they glow**: any of the eight bars stays faint until one of their buttons glows, so a bar in the middle of your screen shows only what's due
*   **Spell IDs in tooltips** (off by default): every spell's tooltip shows its ID, and an elixir's, potion's or food's the spell it casts
*   The weapon buff to keep up, the party and raid buffs with their group version counts, when cooldowns glow, and how few reagents are low

All settings are kept per character.

## Good to know

*   Works with Blizzard's own action bars, Forever's gamepad bars and the UI addons above.
*   Making a UI addon? Your action buttons can glow too: register them as the [Glowing Bars API](https://vattiss.github.io/wowkit/glowing-bars-api) page shows.
*   In combat the game hides some things from addons (your auras, some cooldowns). Glowing Bars remembers what it saw and what you cast, so it keeps working, but if something does not glow when it should, please tell me.

## Feedback

Found a bug or want a spell on a list? Leave a comment here or open an issue on [GitHub](https://github.com/vattiss/wowkit/issues).