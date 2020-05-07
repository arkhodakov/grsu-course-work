import * as types from "../constants/account.constants";

const initialState = {
  id: "",
  email: "",
  name: "",
  token: "",
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOGIN:
      return {
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name,
        token: action.payload.token,
      };

    default:
      return state;
  }
}
