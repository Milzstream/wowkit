// The door of the test kit: the runner (describe / it / expect) and the fake game.
export * from "./config";
export * from "./runner";
export * from "./world/client-state";
export * from "./world/world";
export * from "./fixtures";
export * from "./world/basic-game";
export { GAMEPAD_BAR, TOTEM_BAR_FIRST_SLOT } from "./world/install-bars-and-auras";
export type { FakeColorPicker } from "./world/install-ui";
export { fakeFlipbooks, type FakeFrame } from "./world/frames";
export type { TooltipKind } from "./world/install-tooltips";
