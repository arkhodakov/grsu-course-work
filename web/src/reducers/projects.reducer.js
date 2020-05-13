import * as types from "../constants/projects.constants";

const initialState = {
  list: [],
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_PROJECTS:
      return {
        ...state,
        list: action.payload.list,
      };

    default:
      return state;
  }
}
