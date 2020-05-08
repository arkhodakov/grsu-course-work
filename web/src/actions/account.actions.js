import * as types from "../constants";
import axios from "axios";

export const logout = () => ({
  type: types.LOGOUT_USER
})

export const authenticate = (email, name, token) => ({
  type: types.AUTHENTICATE_USER,
  payload: {
    email: email,
    name: name,
    token: token,
  },
});
