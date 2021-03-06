import * as types from "../constants";

export const logout = () => ({
  type: types.LOGOUT_ACCOUNT
})

export const authenticate = (id, email, name, token) => ({
  type: types.AUTHENTICATE_ACCOUNT,
  payload: {
    id: id,
    email: email,
    name: name,
    token: token,
  },
});

export const load = () => ({
  type: types.LOAD_ACCOUNT
})