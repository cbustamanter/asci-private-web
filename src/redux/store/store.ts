import { createStore } from "redux";
import { sideBarReducer } from "../reducers/sidebar";

export const store = createStore(sideBarReducer);
