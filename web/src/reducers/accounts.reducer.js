import * as types from "../constants/accounts.constants";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  id: null,
  email: null,
  name: null,
  token: null,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case types.AUTHENTICATE_ACCOUNT:
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("token", action.payload.token);

      axios.defaults.headers.common["Authentication"] = action.payload.token;

      return {
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name,
        token: action.payload.token,
      };

    case types.LOGOUT_ACCOUNT:
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("token");

      axios.defaults.headers.common["Authentication"] = null;

      return {
        id: null,
        email: null,
        name: null,
        token: null,
      };

    case types.LOAD_ACCOUNT:
      const id = localStorage.getItem("id");
      const email = localStorage.getItem("email");
      const name = localStorage.getItem("name");
      const token = localStorage.getItem("token");

      const isAuthenticated = id && email && name && token;

      if (isAuthenticated) {
        axios.defaults.headers.common["Authentication"] = token;
        return {
          isAuthenticated: true,
          id: id,
          email: email,
          name: name,
          token: token,
        };
      } else {
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("token");

        axios.defaults.headers.common["Authentication"] = null;

        return {
          isAuthenticated: false,
          id: null,
          email: null,
          name: null,
          token: null,
        };
      }

    default:
      return state;
  }
}
