// What UNIT_COMBAT says of a hit on a unit: a full block is its action "BLOCK"; a partial block, the usual kind, is a
// "WOUND" whose flag text says "BLOCK_REDUCED" (or "BLOCK"), as Blizzard's own combat text reads it. A value the client keeps
// secret says nothing.
import { isReadable } from "./secret-value.utils";

/** Was the hit blocked, fully or partly? */
export function isBlockedHit(action: unknown, flagText: unknown): boolean {
    if (isReadable(action) && action === "BLOCK") return true;
    return isReadable(flagText) && (flagText === "BLOCK" || flagText === "BLOCK_REDUCED");
}
