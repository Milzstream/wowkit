// The tooltip of a section header in the table of looks: an area over the header that shows it on hover. Made once, then
// moved to where the header is drawn this time.
import { HEADER_HEIGHT } from "./style-table.constants";

/** The hover area made for each table content (one header there has a tooltip of this kind). */
const areas = new LuaMap<Frame, Frame>();

/** Shows the tooltip `getText` says over the header at `top` of `content`, on hover. */
export function showHeaderTip(content: Frame, top: number, getText: (this: void) => string): void {
    let area = areas.get(content);
    if (area === undefined) {
        const made = CreateFrame("Frame", undefined, content);
        made.SetSize(300, HEADER_HEIGHT);
        made.EnableMouse(true);
        made.SetScript("OnEnter", () => {
            GameTooltip.SetOwner(made, "ANCHOR_RIGHT");
            GameTooltip.SetText(getText(), 1, 1, 1, 1, true);
            GameTooltip.Show();
        });
        made.SetScript("OnLeave", () => GameTooltip.Hide());
        areas.set(content, made);
        area = made;
    }
    area.ClearAllPoints();
    area.SetPoint("TOPLEFT", content, "TOPLEFT", 0, -top);
}
