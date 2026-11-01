// Which spell sits on which action button: every button is read (its slot, what it casts, its icon) and mapped by
// spell ID, name and icon.
//
// Forever rules: never call C_TooltipInfo.GetAction while mapping the bars (tooltips froze the
// client when many slots updated after a quest turn-in), and map the bars a few buttons per frame.
// The client's own bars are mapped (Blizzard's, and the gamepad bars Forever draws in its gamepad mode), and Bartender4's,
// Dominos's and EllesmereUI's: their buttons keep their action slot where Blizzard's do.
import { type EventBus, type OnFirstLogin, trimText } from "@wowkit/core";
import type { ButtonRegistryService, ButtonShape } from "./button-registry.service";
import type { ClockService } from "./clock.service";
import { attempt, attemptMulti } from "./utils/protected-call.utils";
import { getReadableId, isReadable } from "./utils/secret-value.utils";
import type { SpellsService } from "./spells.service";
import { BARS, findBarNumber, listAddonButtonNames } from "./bar-names";
import { listGamepadButtons } from "./gamepad-buttons";

declare module "@wowkit/core/event-bus" {
    interface AppEvents {
        /** The action bars were mapped again. */
        "bars.mapped": [];
    }
}

/** Buttons mapped per frame. */
const MAP_BUDGET = 20;
/** Mapping is skipped when the last one is more recent than this (unless forced). */
const MAP_THROTTLE = 2;
/** An icon on more buttons than this is a generic one, not a particular spell's. */
const MAX_BUTTONS_PER_ICON = 4;

/**
 * A button to map: an action button (by its slot), a stance (by its index), or a button of the gamepad bars that shows a
 * spell of its own (the paladin's aura, picked from a flyout: no action slot, the spell in its `spellID`).
 */
type QueueEntry = { button: ActionButton } | { stance: number; button: ActionButton | undefined } | { spellButton: ActionButton };

export class ActionBarsService implements OnFirstLogin {
    private readonly buttonsBySpell = new LuaMap<number, ActionButton[]>();
    private readonly buttonsByName = new LuaMap<string, ActionButton[]>();
    private readonly buttonsByNameKey = new LuaMap<string, ActionButton[]>();
    private readonly buttonsByIcon = new LuaMap<number | string, ActionButton[]>();
    /** The action slot each mapped button shows. */
    private readonly slotByButton = new LuaMap<ActionButton, number>();
    private lastMapAt = 0;
    private mapGeneration = 0;
    /** When the player last changed the bars (a form, a stance, a page, a slot); the map is old until it is mapped again. */
    private barsChangedAt = -10;

    constructor(
        private readonly clock: ClockService,
        private readonly spells: SpellsService,
        private readonly bus: EventBus,
        private readonly registry: ButtonRegistryService,
    ) {}

    /** The bars are mapped once, at the first login. */
    onFirstLogin(): void {
        this.mapBars(true);
    }

    noteBarsChanged(): void {
        this.barsChangedAt = this.clock.getCurrentTime();
    }

    getSecondsSinceBarsChanged(): number {
        return this.clock.getCurrentTime() - this.barsChangedAt;
    }

    /** Maps every action button, a few per frame. `isForced` ignores the throttle. */
    mapBars(isForced: boolean): void {
        if (!isForced && this.lastMapAt > 0 && this.clock.getCurrentTime() - this.lastMapAt < MAP_THROTTLE) return;
        this.clear(this.buttonsBySpell);
        this.clear(this.buttonsByName);
        this.clear(this.buttonsByNameKey);
        this.clear(this.buttonsByIcon);
        this.clear(this.slotByButton);
        this.lastMapAt = this.clock.getCurrentTime();

        const queue = this.listButtonsToMap();

        this.mapGeneration += 1;
        const generation = this.mapGeneration;
        let next = 0;
        const mapNextButtons = () => {
            if (generation !== this.mapGeneration) return;
            for (let budget = MAP_BUDGET; next < queue.length && budget > 0; budget--) {
                const entry = queue[next++]!;
                if ("spellButton" in entry) {
                    this.addSpell((entry.spellButton as { spellID?: unknown }).spellID, entry.spellButton);
                } else if (!("stance" in entry)) {
                    this.addButton(entry.button);
                } else if (entry.button) {
                    const [didSucceed, , , , spellId] = attemptMulti(() => GetShapeshiftFormInfo(entry.stance));
                    if (didSucceed) this.addSpell(spellId, entry.button);
                }
            }
            if (next < queue.length) C_Timer.After(0, mapNextButtons);
            else this.bus.emit("bars.mapped");
        };
        mapNextButtons();
    }

    /**
     * The action bar a button is on, numbered as the game's Edit Mode numbers them: 1 is the main bar, 2 to 8 the others.
     * Undefined for the buttons of no numbered bar (the totem bar, the stance bar).
     */
    getBarNumber(button: ActionButton): number | undefined {
        if (this.registry.isRegistered(button)) return this.registry.findBar(button);
        return findBarNumber(button.GetName() ?? "");
    }

    /** Did another addon register the button? */
    isRegistered(button: ActionButton): boolean {
        return this.registry.isRegistered(button);
    }

    /**
     * The shape of a button: the one it was registered with (another addon's), else the one it says itself (the gamepad
     * bars of Forever keep it in `activeButtonShape`); undefined for the others, which are square.
     */
    getButtonShape(button: ActionButton): ButtonShape | undefined {
        return this.registry.findShape(button) ?? (button as { activeButtonShape?: ButtonShape }).activeButtonShape;
    }

    /** The buttons a spell sits on: by ID, resolved ID and name; by its (rarely shared) icon only when none is found so. */
    findButtonsOf(spellId: number | undefined): ActionButton[] {
        const out: ActionButton[] = [];
        const seen = new LuaSet<ActionButton>();
        const take = (list: ActionButton[] | undefined) => {
            for (const button of list ?? []) {
                if (!seen.has(button)) {
                    seen.add(button);
                    out.push(button);
                }
            }
        };
        const id = getReadableId(spellId);
        const resolved = getReadableId(this.spells.resolve(spellId));
        if (id !== undefined) take(this.buttonsBySpell.get(id));
        if (resolved !== undefined && resolved !== id) take(this.buttonsBySpell.get(resolved));
        const name = this.getReadableSpellName(id) ?? this.getReadableSpellName(resolved);
        if (name !== undefined) {
            take(this.buttonsByName.get(name));
            const key = this.buildButtonKey(name);
            if (key !== undefined) take(this.buttonsByNameKey.get(key));
        }
        // The icon is the last resort: a button found by the spell or its name is the one (the ranks of a poison share
        // one icon, and only the one rank asked for glows)
        if (out.length === 0) for (const list of this.listIconButtons(id, resolved)) take(list);
        return out;
    }

    /** The buttons that show the spell's icon, where few do (an icon many buttons share tells nothing). */
    private listIconButtons(id: number | undefined, resolved: number | undefined): ActionButton[][] {
        const icons = new LuaSet<number | string>();
        this.addIconKeys(id, icons);
        this.addIconKeys(resolved ?? id, icons);
        const lists: ActionButton[][] = [];
        for (const key of icons) {
            const list = this.buttonsByIcon.get(key);
            if (list && list.length > 0 && list.length <= MAX_BUTTONS_PER_ICON) lists.push(list);
        }
        return lists;
    }

    /** The action slot of a button the spell sits on (for the client's range check); undefined when none. */
    findSlotOf(spellId: number | undefined): number | undefined {
        for (const button of this.findButtonsOf(spellId)) {
            const slot = this.slotByButton.get(button);
            if (slot !== undefined) return slot;
        }
        return undefined;
    }

    /** Have the bars been mapped at least once? */
    isMapped(): boolean {
        return this.lastMapAt > 0;
    }

    isOnBars(spellId: number | undefined): boolean {
        return this.findButtonsOf(spellId).length > 0;
    }

    /** The IDs of the spells that sit on at least one button. */
    listSpellIdsOnBars(): number[] {
        const ids: number[] = [];
        for (const [id] of this.buttonsBySpell) ids.push(id);
        return ids;
    }

    private getReadableSpellName(spellId: number | undefined): string | undefined {
        const id = getReadableId(spellId);
        if (id === undefined) return undefined;
        const name = this.spells.getSpellInfo(id)?.name;
        return name !== undefined && isReadable(name) && name !== "" ? name : undefined;
    }

    private addSpellName(name: string, button: ActionButton): void {
        this.push(this.buttonsByName, name, button);
        const key = this.buildButtonKey(name);
        if (key !== undefined) this.push(this.buttonsByNameKey, key, button);
    }

    private addSpell(spellId: unknown, button: ActionButton): void {
        const id = getReadableId(spellId);
        if (id === undefined) return;
        this.push(this.buttonsBySpell, id, button);
        const name = this.getReadableSpellName(id);
        if (name !== undefined) this.addSpellName(name, button);
    }

    private addIcons(button: ActionButton, slot: number): void {
        const add = (value: unknown) => {
            const key = this.getTextureKey(value);
            if (key !== undefined) this.push(this.buttonsByIcon, key, button);
        };
        add(attempt(C_ActionBar.GetActionTexture, slot));
        const name = button.GetName();
        const icon = button.icon ?? button.Icon ?? (name !== undefined ? this.getGlobal<Texture>(`${name}Icon`) : undefined);
        if (icon) add(attempt(() => icon.GetTexture()));
    }

    /** Spells named on the cast lines of a macro (#showtooltip, /cast ...). */
    private addMacroSpells(macro: number | string, button: ActionButton): void {
        const body = attempt(GetMacroBody, macro);
        if (body === undefined || !isReadable(body)) return;
        for (const [line] of string.gmatch(body, "[^\r\n]+")) {
            let [command] = string.match(line!, "^%s*#showtooltip%s+(.+)$");
            if (command === undefined) [command] = string.match(line!, "^%s*/%S+%s+(.+)$");
            if (command !== undefined) {
                // Drop [conditions], then read each "Spell, Other Spell; Third"
                const [cleaned] = string.gsub(command, "%b[]", " ");
                for (const [rawToken] of string.gmatch(cleaned, "[^,;]+")) this.addMacroToken(rawToken!, button);
            }
        }
    }

    private addMacroToken(rawToken: string, button: ActionButton): void {
        let [token] = string.gsub(strtrim(rawToken), "^!", "");
        [token] = string.gsub(token, "%s*%([^)]*%)%s*$", "");
        if (token === "") return;
        const info = attempt(C_Spell.GetSpellInfo, token);
        if (info === undefined || type(info) !== "table") return;
        this.addSpellName(isReadable(info.name) && info.name !== "" ? info.name : token, button);
        this.addSpell(info.spellID, button);
    }

    private addButton(button: ActionButton): void {
        const slot = this.getActionSlot(button);
        let [kind, id] = this.getButtonAction(button, slot);
        if (kind === "macro" && id !== undefined) {
            const macro = id as number | string;
            const macroSpell = getReadableId(attempt(GetMacroSpell, macro));
            if (macroSpell !== undefined) [kind, id] = ["spell", macroSpell];
            this.addMacroSpells(macro, button);
        }
        if (slot !== undefined) this.slotByButton.set(button, slot);
        if (slot !== undefined && this.hasAction(slot)) this.addIcons(button, slot);
        if (kind === "spell" && id !== undefined) {
            this.addSpell(getReadableId(this.spells.getSpellInfo(getReadableId(id))?.spellID) ?? getReadableId(id), button);
        }
    }

    private addIconKeys(spellId: number | undefined, keys: LuaSet<number | string>): void {
        if (spellId === undefined) return;
        const add = (value: unknown) => {
            const key = this.getTextureKey(value);
            if (key !== undefined) keys.add(key);
        };
        add(attempt(() => C_Spell.GetSpellTexture(spellId)));
        const info = this.spells.getSpellInfo(spellId);
        if (info) {
            add(info.iconID);
            add(info.originalIconID);
        }
    }

    private push<K extends AnyNotNil>(map: LuaMap<K, ActionButton[]>, key: K, button: ActionButton): void {
        const list = map.get(key);
        if (list) list.push(button);
        else map.set(key, [button]);
    }

    private clear<K extends AnyNotNil, V>(map: LuaMap<K, V>): void {
        for (const [key] of map) map.delete(key);
    }

    /**
     * Every button to map: the bars' (Blizzard's, the totem bar, Bartender4's, Dominos's, EllesmereUI's, ElvUI's, DaylightUI's,
     * the ones other addons registered, the gamepad bars), then the stances.
     */
    private listButtonsToMap(): QueueEntry[] {
        const queue: QueueEntry[] = [];
        const add = (name: string) => {
            const button = this.getGlobal<ActionButton>(name);
            if (button) queue.push({ button });
        };
        for (const bar of BARS) for (let i = 1; i <= 12; i++) add(`${bar}Button${i}`);
        // The shaman's totem bar: its buttons are action buttons too
        for (let i = 1; i <= 12; i++) add(`MultiCastActionButton${i}`);
        for (const name of listAddonButtonNames()) add(name);
        for (const button of listGamepadButtons()) {
            queue.push(this.getActionSlot(button) === undefined ? { spellButton: button } : { button });
        }
        const forms = attempt(GetNumShapeshiftForms) ?? 0;
        // The stance bar: Blizzard's, and Bartender4's, Dominos's and ElvUI's, whose buttons stand for the same forms (a
        // paladin's auras too)
        for (let i = 1; i <= forms; i++) {
            for (const name of [`StanceButton${i}`, `BT4StanceButton${i}`, `DominosStanceButton${i}`, `ElvUI_StanceBarButton${i}`])
                queue.push({ stance: i, button: this.getGlobal<ActionButton>(name) });
        }
        queue.push(...this.listRegisteredToMap(forms));
        return queue;
    }

    /** The buttons other addons registered: the action buttons, and the stance buttons of the stances there are. */
    private listRegisteredToMap(forms: number): QueueEntry[] {
        const queue: QueueEntry[] = this.registry.listActionButtons().map((button) => ({ button }));
        for (const [button, stance] of this.registry.listStanceButtons()) if (stance <= forms) queue.push({ stance, button });
        return queue;
    }

    private getGlobal<T>(name: string): T | undefined {
        return (_G as unknown as { [name: string]: T | undefined })[name];
    }

    /** A value equal to `expected`; secret values never are (comparing them would raise an error). */
    private isToken(value: unknown, expected: string): boolean {
        return isReadable(value) && value === expected;
    }

    /** A texture key: a readable file ID or a lowercase path. */
    private getTextureKey(value: unknown): number | string | undefined {
        if (!isReadable(value) || value === 0 || value === "") return undefined;
        if (type(value) === "number" && (value as number) > 0) return value as number;
        if (type(value) === "string") return string.lower(value as string);
        return undefined;
    }

    /**
     * The slot the button shows now. A Blizzard action button keeps the paged slot in GetPagedID /
     * `action` (a druid form or warrior stance pages the main bar, e.g. bear form to 73-84), while
     * its "action" attribute is the base slot 1-12, so the attribute comes last.
     */
    private getActionSlot(button: ActionButton): number | undefined {
        const getValidSlot = (slot: unknown) => (slot !== undefined && slot !== 0 ? (slot as number) : undefined);
        return (
            getValidSlot(button.GetPagedID ? attempt(() => button.GetPagedID!()) : undefined) ??
            getValidSlot(button.CalculateAction ? attempt(() => button.CalculateAction!()) : undefined) ??
            getValidSlot(button.action) ??
            getValidSlot(tonumber(attempt(() => button.GetAttribute("action"))))
        );
    }

    private hasAction(slot: number): boolean {
        return attempt(C_ActionBar.HasAction, slot) === true;
    }

    /** The spell an item casts (a poison, a warlock stone): that is what the reminders name. */
    private findItemSpell(actionId: unknown): number | undefined {
        const itemId = getReadableId(actionId);
        const [didReadItemSpell, , itemSpell] = attemptMulti(() => C_Item.GetItemSpell(itemId));
        return didReadItemSpell ? getReadableId(itemSpell) : undefined;
    }

    /** What an action slot holds: "spell" with a spell ID, "macro" with a macro, or nothing known. */
    private getSlotAction(slot: number): LuaMultiReturn<[kind: string | undefined, id: unknown]> {
        const [didSucceed, kind, actionId, , spellFromAction] = attemptMulti(() => GetActionInfo(slot));
        if (!didSucceed) return $multi(undefined, undefined);
        if (this.isToken(kind, "spell")) return $multi("spell", getReadableId(spellFromAction) ?? getReadableId(actionId));
        if (this.isToken(kind, "macro")) return $multi("macro", actionId);
        const itemSpell = this.isToken(kind, "item") ? this.findItemSpell(actionId) : undefined;
        if (itemSpell !== undefined) return $multi("spell", itemSpell);
        return $multi(undefined, undefined);
    }

    /** What the button casts: "spell" with a spell ID, "macro" with a macro, or nothing known. */
    private getButtonAction(button: ActionButton, slot: number | undefined): LuaMultiReturn<[kind: string | undefined, id: unknown]> {
        const attrType = attempt(() => button.GetAttribute("type"));
        if (attrType === "spell" || attrType === "macro")
            return $multi(
                attrType,
                attempt(() => button.GetAttribute(attrType)),
            );
        if (attrType !== undefined && attrType !== "action") return $multi(attrType, undefined);
        if (slot === undefined || !this.hasAction(slot)) return $multi(attrType, undefined);
        const [kind, id] = this.getSlotAction(slot);
        return $multi(kind ?? attrType, id);
    }

    /**
     * The form button names are matched in: lowercase, only a trailing "(...)" removed, trimmed; undefined when nothing
     * is left. Names from macros keep inner parentheses.
     */
    private buildButtonKey(name: string): string | undefined {
        const [stripped] = string.gsub(name, "%s*%([^)]*%)%s*$", "");
        const key = trimText(string.lower(stripped));
        return key !== "" ? key : undefined;
    }
}
