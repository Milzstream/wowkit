// Putting the addon together: every service is made here, with the services it needs, dependencies first.
// The order of the lines is also the order the lifecycle hooks run in. The wiring is split in stages: Lua 5.1 lets a
// function reach at most 60 outer names, and one function naming every service would reach more.
import { Addon } from "@wowkit/core";
import {
    AboutSection,
    ControlsService,
    GreetingService,
    LocaleService,
    MessagesService,
    OptionsService,
    SettingsService,
    WidgetsService,
} from "@wowkit/ui";
import {
    ActionBarsService,
    AurasService,
    BagsService,
    BarFadeService,
    BarRefreshService,
    ButtonRegistryService,
    ClockService,
    CooldownsService,
    GlowService,
    NoticeService,
    PartyService,
    PlayerService,
    SavedVariablesService,
    SpellBookService,
    SpellCastService,
    SpellDetailsService,
    SpellRefreshService,
    SpellsService,
    TooltipService,
    WeaponEnchantsService,
} from "@wowkit/wow";
import { registerPublicApi } from "./api/public-api";
import { AuraWatchService } from "./character/aura-watch.service";
import { BlockedActionService } from "./character/blocked-action.service";
import { BuffMemoryService } from "./character/buff-memory.service";
import { BuffStateService } from "./character/buff-state.service";
import { EquipmentService } from "./character/equipment.service";
import { IdleService } from "./character/idle.service";
import { RosterService } from "./character/roster.service";
import { CooldownTrackerService } from "./glows/cooldown-tracker.service";
import { CustomCuesService } from "./glows/custom-cues.service";
import { GlowCuesService } from "./glows/glow-cues.service";
import { BuffKnowledgeService } from "./knowledge/buff-knowledge.service";
import { TEXTS } from "./locale/texts.constants";
import { BarsSection } from "./options/bars.section";
import { GlowStyleSection } from "./options/glow-style.section";
import { GlowsSection } from "./options/glows.section";
import { ReagentsSection } from "./options/reagents.section";
import { IdTooltipService } from "./options/id-tooltip.service";
import { ReminderControlsService } from "./options/reminder-controls.service";
import { StyleChoicesService } from "./options/style-choices.service";
import { StyleEditsService } from "./options/style-edits.service";
import { StyleRowsService } from "./options/style-rows.service";
import { StyleTableService } from "./options/style-table.service";
import { StyleWindowService } from "./options/style-window.service";
import { TableCommand } from "./options/table-command";
import { RemindersPage } from "./options/reminders.page";
import { WeaponSection } from "./options/weapon.section";
import { ReagentsService } from "./reagents/reagents.service";
import { BuffReminderService } from "./reminders/buff-reminder.service";
import { ClassBuffsService } from "./reminders/class-buffs.service";
import { CustomRemindersService } from "./reminders/custom-reminders.service";
import { OutdatedRanksService } from "./reminders/outdated-ranks.service";
import { SealReminderService } from "./reminders/seal-reminder.service";
import { TrackingReminderService } from "./reminders/tracking-reminder.service";
import { PartyBuffsService } from "./reminders/party-buffs.service";
import { TownVisitService } from "./reminders/town-visit.service";
import { WeaponChoiceService } from "./reminders/weapon/weapon-choice.service";
import { WeaponMemoryService } from "./reminders/weapon/weapon-memory.service";
import { WeaponReadingService } from "./reminders/weapon/weapon-reading.service";
import { WeaponReminderService } from "./reminders/weapon/weapon-reminder.service";
import { SAVED_VARIABLES_NAME, createDefaultSettings, repairSettings } from "./settings/settings.constants";
import type { AddonSettings } from "./settings/settings.interface";
import { StyleService } from "./settings/style.service";
import { SwitchesService } from "./settings/switches.service";
import { DisplayService } from "./tick/display.service";
import { FindRemindersService } from "./tick/find-reminders.service";
import { NoticesService } from "./tick/notices.service";
import { RefreshService } from "./tick/refresh.service";
import { ShowRemindersService } from "./tick/show-reminders.service";
import { TickService } from "./tick/tick.service";

export function startAddon(addonName: string): void {
    const addon = new Addon(addonName);
    const game = makeGame(addon, addonName);
    const texts = makeTexts(addon, game);
    const buffs = makeBuffs(addon, game, texts);
    const reminders = makeReminders(addon, addonName, game, texts, buffs);
    makeTick(addon, addonName, game, texts, buffs, reminders);
    makeOptions(addon, addonName, game, texts, buffs, reminders);
    addon.start();
}

/** The game's door. */
function makeGame(addon: Addon, addonName: string) {
    const clock = addon.register(new ClockService());
    const player = addon.register(new PlayerService());
    const party = addon.register(new PartyService());
    const bags = addon.register(new BagsService());
    const savedVariables = addon.register(new SavedVariablesService(SAVED_VARIABLES_NAME));
    const spellBook = addon.register(new SpellBookService(addon.events));
    const spells = addon.register(new SpellsService(spellBook, addon.events));
    addon.register(new SpellCastService(player, spells, addon.events));
    addon.register(new SpellRefreshService(spells, clock, addon.events));
    const spellDetails = addon.register(new SpellDetailsService());
    const cooldowns = addon.register(new CooldownsService());
    const auras = addon.register(new AurasService(spells));
    const buttonRegistry = addon.register(new ButtonRegistryService());
    registerPublicApi(buttonRegistry);
    const actionBars = addon.register(new ActionBarsService(clock, spells, addon.events, buttonRegistry));
    const barRefresh = addon.register(new BarRefreshService(actionBars, clock, buttonRegistry));
    const weaponEnchants = addon.register(new WeaponEnchantsService());
    const glow = addon.register(new GlowService(actionBars));
    const barFade = addon.register(new BarFadeService(glow, buttonRegistry));
    const notice = addon.register(new NoticeService(addonName));
    const tooltips = addon.register(new TooltipService());
    return {
        clock,
        player,
        party,
        bags,
        savedVariables,
        spells,
        spellDetails,
        cooldowns,
        auras,
        actionBars,
        barRefresh,
        weaponEnchants,
        glow,
        barFade,
        notice,
        tooltips,
    };
}
type Game = ReturnType<typeof makeGame>;

/** Settings, texts and messages. */
function makeTexts(addon: Addon, game: Game) {
    const settings = addon.register(
        new SettingsService<AddonSettings>(game.savedVariables, addon.events, createDefaultSettings, repairSettings),
    );
    const locale = addon.register(new LocaleService(TEXTS));
    const messages = addon.register(new MessagesService(game.notice, locale.getText("TITLE")));
    addon.register(new GreetingService(messages, locale.getText("INIT")));
    const styles = addon.register(new StyleService(game.spells, settings));
    return { settings, locale, messages, styles };
}
type Texts = ReturnType<typeof makeTexts>;

/** What the addon knows about the player's buffs. */
function makeBuffs(addon: Addon, game: Game, texts: Texts) {
    const idle = addon.register(new IdleService(game.player));
    const classBuffs = addon.register(new ClassBuffsService(game.player, game.spells, texts.settings));
    const knowledge = addon.register(new BuffKnowledgeService(classBuffs, game.spells));
    const memory = addon.register(new BuffMemoryService(game.spells, game.clock, knowledge));
    const state = addon.register(new BuffStateService(game.auras, game.spells, game.player, memory, knowledge));
    return { idle, classBuffs, state };
}
type Buffs = ReturnType<typeof makeBuffs>;

/** What the addon reminds about. */
function makeReminders(addon: Addon, addonName: string, game: Game, texts: Texts, buffs: Buffs) {
    const { settings } = texts;
    const buff = addon.register(
        new BuffReminderService(buffs.state, game.spells, game.player, game.actionBars, buffs.classBuffs, settings),
    );
    const reagents = addon.register(new ReagentsService(game.bags, game.spells, settings));
    const party = addon.register(
        new PartyBuffsService(buffs.state, game.spells, game.clock, game.party, game.player, buffs.classBuffs, reagents, settings, buff),
    );
    const weaponChoice = addon.register(new WeaponChoiceService(game.player, game.spells, settings, game.actionBars, game.bags));
    const weaponMemory = addon.register(new WeaponMemoryService());
    const weaponReading = addon.register(new WeaponReadingService(buffs.state, game.weaponEnchants, weaponChoice));
    const weapon = addon.register(new WeaponReminderService(game.clock, game.weaponEnchants, weaponChoice, weaponMemory, weaponReading));
    const outdatedRanks = addon.register(new OutdatedRanksService(game.actionBars, game.spells, settings));
    const customCues = addon.register(new CustomCuesService(game.spells, settings, game.cooldowns, reagents));
    // A spell the player gave another ID is asked of that ID everywhere: buffs, weapon buffs, reagents, cooldowns, procs
    game.spells.useIdAlias((spellId) => customCues.getEffectiveId(spellId));
    const tracker = addon.register(new CooldownTrackerService(game.spells, game.cooldowns, game.clock));
    const glowCues = addon.register(
        new GlowCuesService(game.player, game.spells, game.spellDetails, game.actionBars, tracker, game.clock, settings, customCues),
    );
    // Its own block of the shared notice: the tick clearing its lines must not take the town message with them
    const townNotice = addon.register(new NoticeService(`${addonName}-town`));
    addon.register(new TownVisitService(game.player, reagents, settings, townNotice, texts.locale, texts.styles));
    const custom = addon.register(
        new CustomRemindersService(
            customCues,
            game.spells,
            game.actionBars,
            buffs.state,
            game.weaponEnchants,
            game.bags,
            settings,
            reagents,
        ),
    );
    const seal = addon.register(new SealReminderService(game.spells, game.actionBars, buffs.state, game.player, settings, customCues));
    const tracking = addon.register(new TrackingReminderService(game.spells, game.actionBars, buffs.state, settings, customCues));
    return { buff, reagents, party, weaponChoice, weapon, outdatedRanks, glowCues, customCues, custom, seal, tracking };
}
type Reminders = ReturnType<typeof makeReminders>;

/** The tick: find what is due, show it, look again sooner when something changed; and what happens to the player. */
function makeTick(addon: Addon, addonName: string, game: Game, texts: Texts, buffs: Buffs, reminders: Reminders) {
    const { settings, locale, messages, styles } = texts;
    const finder = addon.register(
        new FindRemindersService(
            game.actionBars,
            buffs.idle,
            game.player,
            game.spells,
            reminders.buff,
            reminders.party,
            reminders.weapon,
            reminders.outdatedRanks,
            reminders.glowCues,
            reminders.reagents,
            reminders.custom,
            reminders.seal,
            reminders.tracking,
            settings,
        ),
    );
    const notices = addon.register(new NoticesService(game.actionBars, game.clock, game.notice, game.spells, locale, styles));
    const shower = addon.register(
        new ShowRemindersService(game.glow, messages, settings, notices, styles, game.actionBars, game.barFade, game.clock),
    );
    const tick = addon.register(new TickService(finder, shower));
    const refresh = addon.register(new RefreshService(tick, shower, buffs.state, game.clock, game.barRefresh));
    addon.register(new DisplayService(shower, tick));
    addon.register(new EquipmentService(refresh, game.player, game.weaponEnchants, reminders.weapon));
    addon.register(new AuraWatchService(refresh, buffs.state, reminders.weapon));
    addon.register(new RosterService(refresh, reminders.party));
    addon.register(new BlockedActionService(addonName, game.player, messages, locale));
}

/** The table of looks (/gb), and its command. */
function makeTable(addon: Addon, addonName: string, game: Game, texts: Texts, buffs: Buffs, reminders: Reminders) {
    const { locale, messages, styles } = texts;
    const rows = addon.register(
        new StyleRowsService(
            game.player,
            game.spells,
            buffs.classBuffs,
            reminders.weaponChoice,
            reminders.reagents,
            locale,
            styles,
            reminders.glowCues,
            reminders.customCues,
            reminders.seal,
            reminders.tracking,
        ),
    );
    const choices = addon.register(new StyleChoicesService(locale, styles, messages));
    const windows = addon.register(new StyleWindowService(locale));
    const switches = addon.register(new SwitchesService(game.spells, buffs.classBuffs, reminders.reagents, texts.settings));
    const tableNotice = addon.register(new NoticeService(`${addonName}-table`));
    const edits = addon.register(new StyleEditsService(locale, reminders.customCues, tableNotice, switches, rows, styles));
    const table = addon.register(new StyleTableService(locale, styles, rows, messages, choices, windows, edits));
    addon.register(new TableCommand(table));
    return table;
}

/** The Settings panel. */
function makeOptions(addon: Addon, addonName: string, game: Game, texts: Texts, buffs: Buffs, reminders: Reminders) {
    const { settings, locale, messages } = texts;
    const controls = addon.register(new ControlsService<AddonSettings>(settings, messages, addonName));
    const widgets = addon.register(
        new WidgetsService(messages, { copy: locale.getText("INFO_COPY"), copied: locale.getText("INFO_COPIED") }),
    );
    const reminderControls = addon.register(new ReminderControlsService(controls, locale, settings));
    addon.register(new IdTooltipService(game.tooltips, settings, locale));
    const weaponSection = addon.register(
        new WeaponSection(locale, game.spells, reminders.weaponChoice, settings, controls, reminderControls),
    );
    const glowsSection = addon.register(new GlowsSection(locale, settings, controls, reminderControls, reminders.glowCues));
    const reagentsSection = addon.register(
        new ReagentsSection(locale, settings, controls, reminderControls, game.player, reminders.reagents, reminders.customCues),
    );
    const table = makeTable(addon, addonName, game, texts, buffs, reminders);
    const barsSection = addon.register(new BarsSection(locale, settings, controls, reminderControls));
    const glowStyleSection = addon.register(new GlowStyleSection(locale, settings, controls));
    const about = addon.register(
        new AboutSection(
            widgets,
            {
                header: locale.getText("HDR_ABOUT"),
                githubLabel: locale.getText("INFO_GITHUB"),
                issuesLabel: locale.getText("INFO_ISSUES"),
            },
            "https://github.com/vattiss/wowkit",
        ),
    );
    const page = addon.register(
        new RemindersPage(
            locale,
            buffs.classBuffs,
            settings,
            controls,
            reminderControls,
            weaponSection,
            glowsSection,
            reagentsSection,
            about,
            widgets,
            table,
            barsSection,
            glowStyleSection,
        ),
    );
    addon.register(new OptionsService(messages, locale.getText("TITLE"), page));
}
