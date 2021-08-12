export type SideBarAction = { type: "TOGGLE_SIDEBAR"; payload: boolean };

export const showHideSideBar = (isOpen: boolean): SideBarAction => ({
  type: "TOGGLE_SIDEBAR",
  payload: isOpen,
});
