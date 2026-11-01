// Buttons of items: a food, a drink or a potion stays on the bars when the last one is gone, and nothing is to be done with it then.
import type { ActionBarsService } from "../action-bars.service";
import { attempt, attemptMulti } from "./protected-call.utils";
import { getReadable, getReadableId } from "./secret-value.utils";

/** Items are looked up among the buttons of the spells, under numbers no spell has. */
const ITEM_BUTTON_KEYS = 1000000000;

/** What the buttons holding an item are found by (see ActionBarsService.findButtonsOf). */
export function getItemButtonKey(itemId: number): number {
    return ITEM_BUTTON_KEYS + itemId;
}

/** Does the client know an item by this ID? */
export function isKnownItem(itemId: number): boolean {
    const [didRead, id] = attemptMulti(() => C_Item.GetItemInfoInstant(itemId));
    return didRead && getReadable(id) !== undefined;
}

/** Does the button hold an item of which the bags have none? Not when the client keeps the count secret. */
export function isOutOfItem(actionBars: ActionBarsService, button: ActionButton): boolean {
    const itemId = findButtonItem(actionBars, button);
    return itemId !== undefined && getReadable(attempt(C_Item.GetItemCount, itemId)) === 0;
}

/** The item the button holds; undefined for anything else, or while the client keeps it secret. */
export function findButtonItem(actionBars: ActionBarsService, button: ActionButton): number | undefined {
    const slot = actionBars.getActionSlot(button);
    if (slot === undefined) return undefined;
    const [didRead, kind, itemId] = attemptMulti(() => GetActionInfo(slot));
    if (!didRead || getReadable(kind) !== "item") return undefined;
    return getReadable(itemId) as number | undefined;
}

/** The spell an item casts when used; undefined when it has none, or the client does not say yet. */
export function findItemUseSpell(itemId: number): number | undefined {
    const [didRead, , spellId] = attemptMulti(() => C_Item.GetItemSpell(itemId));
    return didRead ? getReadableId(spellId) : undefined;
}

/** The name and icon of an item, as the client knows them. */
export function readItemLook(itemId: number): { name: string | undefined; iconId: number | undefined } {
    return { name: getReadable(attempt(C_Item.GetItemNameByID, itemId)), iconId: getReadable(attempt(C_Item.GetItemIconByID, itemId)) };
}
