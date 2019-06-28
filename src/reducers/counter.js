import { UPDATE_COMPLETE } from "../actions/counterAction";

const initialState = 0;

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMPLETE:
      return state + action.payload;

    default:
      return state;
  }
};
