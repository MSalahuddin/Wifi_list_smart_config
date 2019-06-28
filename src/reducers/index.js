import { combineReducers } from "redux";
import { counterReducer } from "./counter";
import register from "./register";
export const rootReducer = combineReducers({
  counterReducer,
  register
});
