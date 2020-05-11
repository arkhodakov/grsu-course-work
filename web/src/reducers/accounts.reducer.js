import * as types from "../constants/account.constants";

const initialState = {
  isAuthenticated: false,
  email: null,
  name: null,
  token: null,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case types.AUTHENTICATE_ACCOUNT:
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("token", action.payload.token);

      return {
        email: action.payload.email,
        name: action.payload.name,
        token: action.payload.token,
      };

    case types.LOGOUT_ACCOUNT:
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("token");

      return {
        email: null,
        name: null,
        token: null,
      };

    case types.LOAD_ACCOUNT:
      const email = localStorage.getItem("email");
      const name = localStorage.getItem("name");
      const token = localStorage.getItem("token");

      const isAuthenticated = email && name && token;

      if (isAuthenticated) {
        return { isAuthenticated: true, email: email, name: name, token: token };
      } else {
        return { isAuthenticated: false, email: null, name: null, token: null };
      }

    default:
      return state;
  }
}
