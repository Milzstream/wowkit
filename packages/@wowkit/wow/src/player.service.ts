// The player: combat, the states that keep reminders quiet (dead, mounted, eating, in town), the
// class and the equipped weapons.

import { Consumable } from "@wowkit/wow-data";
import { attempt, attemptMulti, tryCall } from "./utils/protected-call.utils";
import { getReadable, isReadable } from "./utils/secret-value.utils";
import { OFF_HAND_SLOT, RANGED_SLOT } from "./wow.constants";

/** A point in the world: yards on the map, and the map's ID. */
export interface WorldPosition {
    x: number;
    y: number;
    mapId: number;
}

/** The main talent tree is read again after this many seconds: it reads every talent, and rarely changes. */
const MAIN_TREE_REUSE = 3;

export class PlayerService {
    /** The lowercase names of the eating and drinking buffs, in the client's language. */
    private eatingNames: LuaSet<string> | undefined;
    private mainTree: number | undefined;
    private mainTreeAt = 0;

    isInCombat(): boolean {
        const [didSucceed, isFighting] = tryCall(UnitAffectingCombat, "player");
        if (!didSucceed) return false;
        if (isReadable(isFighting)) return isFighting === true;
        // A secret answer: only comparing with nil is allowed
        return isFighting !== undefined;
    }

    /** In a town or an inn. */
    isResting(): boolean {
        return attempt(IsResting) === true;
    }

    isSwimming(): boolean {
        return attempt(IsSwimming) === true;
    }

    isDead(): boolean {
        return attempt(UnitIsDeadOrGhost, "player") === true;
    }

    isOnTaxi(): boolean {
        return attempt(UnitOnTaxi, "player") === true;
    }

    /** Has the player a target? */
    hasTarget(): boolean {
        return attempt(UnitExists, "target") === true;
    }

    /** Is the player's target a living enemy, one the player can attack? A hidden answer counts as no. */
    hasEnemyTarget(): boolean {
        return (
            this.hasTarget() &&
            getReadable(attempt(UnitCanAttack, "player", "target")) === true &&
            attempt(UnitIsDeadOrGhost, "target") !== true
        );
    }

    isMounted(): boolean {
        return attempt(IsMounted) === true;
    }

    /** The player's class token ("PRIEST"). */
    /**
     * The talent tree with the most points, by its place (1 to 3: a paladin's Holy, Protection, Retribution); undefined
     * with no points, or when the client does not say. Forever keeps the three classic trees side by side in one tree of
     * the trait system, each a third of its width, so a talent's tree is the third its position falls in.
     */
    findMainTalentTree(): number | undefined {
        const now = GetTime();
        if (this.mainTreeAt > 0 && now - this.mainTreeAt < MAIN_TREE_REUSE) return this.mainTree;
        this.mainTreeAt = now;
        this.mainTree = this.readMainTalentTree();
        return this.mainTree;
    }

    private readMainTalentTree(): number | undefined {
        const nodes = this.listTalentNodes();
        if (nodes.length === 0) return undefined;
        let left = math.huge;
        let right = -math.huge;
        for (const node of nodes) {
            left = math.min(left, node.posX);
            right = math.max(right, node.posX);
        }
        const width = (right - left) / 3;
        const points = [0, 0, 0];
        for (const node of nodes) {
            const tree = width > 0 ? math.min(2, math.floor((node.posX - left) / width)) : 0;
            points[tree] = points[tree]! + node.rank;
        }
        const best = math.max(points[0]!, points[1]!, points[2]!);
        return best > 0 ? points.indexOf(best) + 1 : undefined;
    }

    /** The talents of the active talent setup: where each sits in the tree, and its rank. */
    private listTalentNodes(): { posX: number; rank: number }[] {
        const configId = attempt(() => C_ClassTalents.GetActiveConfigID());
        const treeId = configId !== undefined ? attempt(() => C_Traits.GetConfigInfo(configId)?.treeIDs[0]) : undefined;
        if (configId === undefined || treeId === undefined) return [];
        const nodes: { posX: number; rank: number }[] = [];
        for (const nodeId of attempt(() => C_Traits.GetTreeNodes(treeId)) ?? []) {
            const info = attempt(() => C_Traits.GetNodeInfo(configId, nodeId));
            const posX = info !== undefined ? tonumber(getReadable(info.posX)) : undefined;
            if (posX !== undefined) nodes.push({ posX, rank: tonumber(getReadable(info!.currentRank)) ?? 0 });
        }
        return nodes;
    }

    getClassToken(): string | undefined {
        const [, classFile] = UnitClass("player");
        if (classFile !== undefined && isReadable(classFile)) return string.upper(classFile);
        const [base] = UnitClassBase("player");
        if (base !== undefined && isReadable(base)) return string.upper(base);
        return undefined;
    }

    /** The item ID in an equipment slot; undefined when the slot is empty. */
    getEquippedItemId(slot: number): number | undefined {
        const itemId = attempt(GetInventoryItemID, "player", slot);
        return type(itemId) === "number" ? itemId : undefined;
    }

    /** Is a weapon (not a shield or a held item) in the off-hand slot? */
    isOffhandWeaponEquipped(): boolean {
        const itemId = this.getEquippedItemId(OFF_HAND_SLOT);
        if (itemId === undefined) return false;
        const [, , , , , classId] = C_Item.GetItemInfoInstant(itemId);
        return classId === Enum.ItemClass.Weapon;
    }

    /** The name of the spell being cast now; undefined when none, or when the client hides it. */
    getCastingSpellName(): string | undefined {
        const [didSucceed, name] = attemptMulti(() => UnitCastingInfo("player"));
        return didSucceed && isReadable(name) && type(name) === "string" ? name : undefined;
    }

    /** The name of the spell being channeled now; undefined when none, or when the client hides it. */
    getChannelingSpellName(): string | undefined {
        const [didSucceed, name] = attemptMulti(() => UnitChannelInfo("player"));
        return didSucceed && isReadable(name) && type(name) === "string" ? name : undefined;
    }

    /** Seconds left on the cast or channel in progress; 0 when none or when the client hides it. */
    getCastRemaining(): number {
        const cast = this.readCastEnd(() => UnitCastingInfo("player") as LuaMultiReturn<unknown[]>);
        return cast > 0 ? cast : this.readCastEnd(() => UnitChannelInfo("player") as LuaMultiReturn<unknown[]>);
    }

    /**
     * Combo points: the highest readable of the player's power (modern) and the points on the target (Classic); one
     * source may read 0 while the other has the real value. Undefined when neither is readable.
     */
    readComboPoints(): number | undefined {
        const power = getReadable(attempt(UnitPower, "player", Enum.PowerType.ComboPoints));
        const onTarget = getReadable(attempt(GetComboPoints, "player", "target"));
        if (type(power) !== "number" && type(onTarget) !== "number") return undefined;
        return math.max(type(power) === "number" ? power! : 0, type(onTarget) === "number" ? onTarget! : 0);
    }

    /** Where the player stands; undefined when the client hides it (instances). */
    getPosition(): WorldPosition | undefined {
        const [didSucceed, x, y, , mapId] = attemptMulti(() => UnitPosition("player"));
        if (!didSucceed || !isReadable(x) || !isReadable(y) || type(x) !== "number" || type(y) !== "number") return undefined;
        return { x: x!, y: y!, mapId: getReadable(mapId) ?? 0 };
    }

    /** Seconds between two Auto Shots; undefined when hidden (in combat). */
    getRangedSpeed(): number | undefined {
        const [didSucceed, speed] = attemptMulti(() => UnitRangedDamage("player"));
        const seconds = didSucceed && isReadable(speed) ? tonumber(speed) : undefined;
        return seconds !== undefined && seconds > 0.4 ? seconds : undefined;
    }

    /** The "Speed" of the ranged weapon from its tooltip; undefined when not found. */
    getRangedWeaponSpeed(): number | undefined {
        const tooltip = attempt(C_TooltipInfo.GetInventoryItem, "player", RANGED_SLOT);
        if (tooltip === undefined || type(tooltip) !== "table") return undefined;
        for (const line of tooltip.lines ?? []) {
            const text = getReadable(line.rightText);
            if (text !== undefined && string.find(string.lower(text), "speed", 1, true)[0] !== undefined) {
                const [digits] = string.match(text, "(%d+%.?%d*)");
                const speed = tonumber(digits);
                if (speed !== undefined && speed > 0.4) return speed;
            }
        }
        return undefined;
    }

    /** The forms on the stance bar (druid forms, warrior stances): each spell, and whether it is active (undefined: hidden). */
    listShapeshiftForms(): { spellId: number; isActive: boolean | undefined }[] {
        const count = getReadable(attempt(GetNumShapeshiftForms));
        const forms: { spellId: number; isActive: boolean | undefined }[] = [];
        if (type(count) !== "number") return forms;
        for (let index = 1; index <= count!; index++) {
            const [didSucceed, , isActive, , spellId] = attemptMulti(() => GetShapeshiftFormInfo(index));
            if (didSucceed && isReadable(spellId) && spellId !== undefined) {
                forms.push({ spellId, isActive: isReadable(isActive) ? isActive === true || (isActive as unknown) === 1 : undefined });
            }
        }
        return forms;
    }

    /** Is the player eating or drinking (a food or drink buff)? */
    isEating(): boolean {
        for (let i = 1; i <= 40; i++) {
            const aura = attempt(C_UnitAuras.GetAuraDataByIndex, "player", i, "HELPFUL");
            if (!aura) return false;
            const name = getReadable(aura.name);
            if (name !== undefined && this.getEatingNames().has(string.lower(name))) return true;
        }
        return false;
    }

    /** Seconds until the end time of a cast read (results: name first, end time in milliseconds fifth). */
    private readCastEnd(read: (this: void) => LuaMultiReturn<unknown[]>): number {
        const results = [...(pcall(read) as unknown as LuaMultiReturn<unknown[]>)];
        if (results[0] !== true || results[1] === undefined || !isReadable(results[1])) return 0;
        let endTime = isReadable(results[5]) ? tonumber(results[5]) : undefined;
        if (endTime === undefined) return 0;
        if (endTime > 100000) endTime = endTime / 1000;
        return math.max(endTime - GetTime(), 0);
    }

    private getEatingNames(): LuaSet<string> {
        if (this.eatingNames) return this.eatingNames;
        const names = new LuaSet<string>();
        for (const [spellId, english] of [
            [Consumable.Food, "food"],
            [Consumable.Drink, "drink"],
            [Consumable.NutritiousFood, "nutritious food"],
            [Consumable.NutritiousDrink, "nutritious drink"],
        ] as const) {
            // The English name too, for a client that does not name the spell
            names.add(english);
            const name = getReadable(attempt(C_Spell.GetSpellInfo, spellId)?.name);
            if (name !== undefined && name !== "") names.add(string.lower(name));
        }
        this.eatingNames = names;
        return names;
    }
}
