import * as types from "../constants/users.constants";

const initialState = {
  list: [],
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USERS:
      return {
        ...state,
        list: action.payload.list,
      };

    default:
      return state;
  }
}
