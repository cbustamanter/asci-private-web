import { SideBarAction } from "../actions/sideBarActions";

export interface SideBarState {
  isSideBarOpen: boolean;
}
const initialState = {
  isSideBarOpen: true,
};
export const sideBarReducer = (
  state: SideBarState = initialState,
  action: SideBarAction
) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR": {
      state.isSideBarOpen = !action.payload;
      return state;
    }
    default:
      return state;
  }
};
