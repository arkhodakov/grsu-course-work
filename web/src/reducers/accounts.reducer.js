import * as types from "../constants/account.constants";

const initialState = {
  email: null,
  name: null,
  token: null,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case types.AUTHENTICATE_USER:
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("token", action.payload.token);

      return {
        email: action.payload.email,
        name: action.payload.name,
        token: action.payload.token,
      };

    case types.LOGOUT_USER:
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("token");

      return {
        email: null,
        name: null,
        token: null,
      };

    default:
      return state;
  }
}
