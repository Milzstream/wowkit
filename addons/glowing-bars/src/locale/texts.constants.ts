// English only: every player-facing string of the addon.
export const TEXTS = {
    TITLE: "Glowing Bars",
    INIT: "Loaded. Type /gb to customize your reminders.",

    HDR_ABOUT: "Help",
    INFO_GITHUB: "GitHub",
    INFO_ISSUES: "Report an issue",
    INFO_COPY: "Copy",
    INFO_COPIED: "The link is in your chat box. Press Ctrl+C to copy it.",

    HDR_CHARACTER: "This character",
    OPT_DISABLE: "Disable on this character",
    TIP_DISABLE: "Turns off all glows, sounds and messages on this character. Your other characters aren't affected.",
    OPT_STAY_QUIET_IN_TOWNS: "Stay quiet in towns and inns",
    TIP_STAY_QUIET_IN_TOWNS:
        "No glows or messages while resting in a town or inn (out of combat). Turn this off to get reminders there too.",

    HDR_BARS: "Action bars that glow",
    OPT_BAR: "Action Bar %d",
    TIP_BAR:
        "Buttons on this bar can glow. Turn a bar off to keep it quiet, e.g. if you have the same spells on a cooldown bar next to your character.",

    HDR_FADED: "Faded until they glow",
    TIP_FADE: "The buttons of this bar are faded while they don't glow; a glowing one shows in full.",
    OPT_FADED_OPACITY: "Faded opacity",
    TIP_FADED_OPACITY: "How visible the buttons of a faded bar are while they don't glow.",
    OPT_PERCENT: "%d%%",

    HDR_BUFFS: "Buffs",
    OPT_PARTY_BUFFS: "Party members missing your buffs",
    TIP_PARTY_BUFFS:
        "Out of combat, in a party, lists members in range who are missing one of your buffs, and the buff's button glows. Off: only your own buffs are watched.",
    OPT_RAID_BUFFS: "Raid members missing your buffs",
    TIP_RAID_BUFFS:
        "Out of combat, in a raid, lists members in range who are missing one of your buffs, and the buff's button glows. Your blessings only on the classes you gave one there. Off: only your own buffs are watched.",
    OPT_GROUP_FROM: "Group version from",
    TIP_PARTY_GROUP_MIN:
        "In a party, how many missing a buff (you counted, but never you alone) make the group version glow instead: Prayer of Fortitude, Gift of the Wild, Arcane Brilliance, or a Greater Blessing (counting one class). It needs its reagent in your bags.",
    TIP_RAID_GROUP_MIN:
        "In a raid, how many missing a buff (you counted, but never you alone) make the group version glow instead: Prayer of Fortitude, Gift of the Wild, Arcane Brilliance, or a Greater Blessing (counting one class). It needs its reagent in your bags.",
    OPT_MEMBER_MISSING: "%d member missing",
    OPT_MEMBERS_MISSING: "%d members missing",

    HDR_WEAPON: "Weapon buff",
    OPT_WEAPON_PICK: "Weapon buff to keep up",
    OPT_WEAPON_PICK_MAIN: "Main-hand poison",
    OPT_WEAPON_PICK_OFF: "Off-hand poison",
    TIP_WEAPON_PICK: "Automatic picks the best weapon buff you've learned (it changes as you level). Only learned buffs are listed.",
    OPT_AUTOMATIC: "Automatic",

    HDR_COOLDOWNS: "Ready cooldowns",
    OPT_COOLDOWNS_FIGHT_START: "Also at the start of a fight",
    TIP_COOLDOWNS_FIGHT_START:
        "When a fight starts, every ready cooldown glows too, as a reminder to use it (Berserking, Recklessness...).",

    HDR_REMINDERS: "Reminders",
    OPT_TABLE: "Colors, sounds and on/off per spell",
    TIP_TABLE: "Set the color, glow, message and sound of each reminder type and each spell, and turn them on or off. Also /gb.",
    BTN_OPEN: "Open",
    OPT_ROUND_ANIMATION: "Circling on round buttons (alpha)",
    TIP_ROUND_ANIMATION:
        "A round button (the gamepad bars, or another addon's round buttons) cannot have a glow running around it. Where the table's Animation column says Circling, a round button breathes instead, or stands still.",
    ANIMATION_CIRCLING: "Circling",
    ANIMATION_BREATHING: "Breathing",
    ANIMATION_NONE: "None",
    BTN_RESET: "Reset",
    TABLE_TITLE: "Glowing Bars",
    HDR_TABLE_DEFAULTS: "Defaults",
    HDR_TABLE_SPELLS: "Spells (override the defaults)",
    COL_SPELL_ITEM: "Spell / Item",
    COL_TYPE: "Type",
    COL_SPELL_ITEM_ID: "Spell / Item ID",
    COL_ENABLED: "Enabled",
    TIP_ENABLED_TYPE: "Turns this reminder type on or off. While it's off, none of its spells glow and their rows are grayed out.",
    TIP_ID_EDIT:
        "The spell ID the addon looks for. Change it if the game uses a different ID for this spell, e.g. after a patch the addon hasn't caught up with yet.",
    TIP_ADD_ID:
        "Add a spell the addon doesn't know yet by its ID, e.g. a new or changed spell of Forever. Pick its type with the button next to it. To see a spell's ID in its tooltip, turn on \"Show spell and item IDs in tooltips\" in the Settings (Options > AddOns > Glowing Bars).",
    TIP_ADD_ITEM:
        'Add an item to watch by its ID, e.g. arrows or drinks. To see an item\'s ID in its tooltip, turn on "Show spell and item IDs in tooltips" in the Settings (Options > AddOns > Glowing Bars).',
    TIP_ID_RANK: "Old ranks are checked using the spells on your action bars and in your spellbook, so this ID can't be changed.",
    TIP_ENABLED_SPELL: "Turns the reminder for this spell on or off.",
    TIP_ENABLED_ITEM: "Turns the reminder for this item on or off.",
    TIP_ENABLED_TYPE_ITEM: "Turns this reminder type on or off. While it's off, none of its items glow and their rows are grayed out.",
    HDR_TABLE_ADD: "Add spell/item by ID",
    OPT_TOOLTIP_IDS: "Show spell and item IDs in tooltips",
    TIP_TOOLTIP_IDS:
        "Shows the Spell ID on spell tooltips and the Item ID on item tooltips. If an item has a use (an elixir, a potion, food, a drink), it also shows the ID of the spell it casts. Handy for adding a spell or item in the table.",
    TOOLTIP_SPELL_ID: "Spell ID: %d",
    TOOLTIP_USE_SPELL_ID: "Use spell ID: %d",
    TOOLTIP_ITEM_ID: "Item ID: %d",
    BTN_ADD: "Add",
    MSG_UNKNOWN_SPELL: "No spell found with ID %d.",
    MSG_ALREADY_LISTED: "%s is already in the list.",
    MSG_FOOD_IS_BUFF: "%s is a food or drink, add it as Missing buff.",
    MSG_NO_COOLDOWN: "%s has no cooldown, pick another type.",
    MSG_NO_REAGENT: "%s uses no reagent, pick another type.",
    COL_COLOR: "Color",
    COL_GLOW_PERCENT: "Glow %",
    COL_MESSAGE: "Message",
    COL_BELOW: "Below",
    TIP_BELOW: "Reminds you when you have fewer than this.",
    TIP_BELOW_TYPE:
        "Reminds you when you have fewer than this. Used for every row of this type, unless you set a different number on the row.",
    TIP_ID_ITEM: "The ID of the item. To watch another item, remove this row and add that one.",
    MSG_UNKNOWN_ITEM: "No item found with ID %d.",
    TIP_TYPE_LOW_REAGENT:
        "By default (Alert in town) it glows anywhere, and its message and sound come only in a town or an inn. You can change this in its When column.",
    COL_SOUND: "Sound",
    COL_REPEAT: "Repeat",
    REPEAT_OFF: "Off",
    REPEAT_SECONDS: "%d s",
    TIP_REPEAT:
        "Every so many seconds, the glow, the message and the sound come again, for the glow time (with Until done the glow stays, and the sound and the message come again). Off shows them once, as the reminder starts. Click for the next choice, right-click for the one before.",
    COL_ANIMATION: "Animation",
    TIP_ANIMATION:
        "How the glow moves. Circling: it runs around the button. Breathing: it stands still and slowly fades out and in. None: it stands still, fading in and out only as it comes and goes. Round buttons cannot circle: there Circling does what the Settings page says (Breathing by default). Click for the next choice, right-click for the one before.",
    COL_GLOW_TIME: "Glow time",
    GLOW_UNTIL_DONE: "Until done",
    TIP_GLOW_TIME:
        "How long the glow and the message show once the reminder is due, and again with each repeat. Until done: the whole time, until you cast the buff, press the cooldown... Click for the next choice, right-click for the one before.",
    COL_WHEN: "When",
    COL_ACTIONS: "Actions",
    BTN_ADVANCED: "Advanced",
    BTN_BASIC: "Basic",
    WHEN_ALWAYS: "Always",
    WHEN_IN_COMBAT: "In combat",
    WHEN_OUT_OF_COMBAT: "Out of combat",
    WHEN_ENEMY_TARGETED: "Enemy targeted",
    WHEN_TOWN_ALERT: "Alert in town",
    TIP_WHEN:
        "When the reminder may show: always, only in combat, only out of combat, or only while a living enemy is targeted. Click for the next choice, right-click for the one before.",
    TIP_WHEN_TOWN_ALERT:
        "When the reminder may show: always, only in combat, only out of combat, or only while a living enemy is targeted. Alert in town: the button glows anywhere, and the message and the sound come only in a town or an inn. Click for the next choice, right-click for the one before.",
    NO_COLOR_PICKER: "No color picker available on this client.",
    TYPE_MISSING_BUFF: "Missing buff",
    TYPE_WEAPON_BUFF: "Weapon buff",
    TYPE_MISSING_SEAL: "Missing seal",
    TYPE_MISSING_TRACKING: "Missing tracking",
    TYPE_READY_COOLDOWN: "Ready cooldown",
    TYPE_PROC: "Proc",
    TYPE_OLD_RANK: "Old rank",
    TYPE_LOW_REAGENT: "Low reagent",
    TYPE_LOW_STOCK: "Low stock",
    TEXT_BUFF: "Missing buff",
    TEXT_WEAPON: "Weapon buff",
    TEXT_SEAL: "Missing seal",
    TEXT_TRACKING: "Missing tracking",
    TEXT_COOLDOWN: "Cooldown ready",
    TEXT_PROC: "Proc",
    TEXT_RANK: "Old spell rank",
    NOTICE_NOT_ON_BAR: "Missing buff (not on your action bars): %s",
    NOTICE_PARTY: "%s missing on: %s",
    NOTICE_PARTY_COUNT: "%s missing on %d members",
    NOTICE_REAGENTS_LOW: "Running low: %s",
    NOTICE_STOCK_LOW: "Running low: %s (%d)",

    BLOCKED_ACTION: "The game blocked an action from this addon (%s). Please report it.",
};

export type TextKey = keyof typeof TEXTS;
