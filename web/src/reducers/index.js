import { combineReducers } from "redux";

import accountReducer from "./accounts.reducer";

const initialState = {
  host: "127.0.0.1",
};

function rootReducer(state = initialState, action) {
  return state;
}

export default combineReducers({
  root: rootReducer,
  account: accountReducer,
});
