import * as types from "../constants";
import * as config from "../api/configuration";
import axios from "axios";

export const authAccount = (email, password) => {
  console.log("AUTH")
  return (dispatch) => {
    return axios
      .post(config.HOST + "api/v1/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        var data = response.json();
        console.log(data);

        localStorage.setItem("account", data);
        dispatch(loginUser(data.id, data.email, data.name, data.token));
      })
      .catch((error) => {
        console.log("ERROR")
        console.log(error);
      });
  };
};

export const signUpAccount = (email, name, password) => {
  return (dispatch) => {
    return axios
      .post(config.HOST + "api/v1/signup", {
        email: email,
        name: name,
        password: password,
      })
      .then((response) => {
        var data = response.json();
        console.log(data);

        localStorage.setItem("account", data);
        dispatch(loginUser(data.id, data.email, data.name, data.token));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const loginUser = (id, email, name, token) => ({
  type: types.USER_LOGIN,
  payload: {
    id: id,
    email: email,
    name: name,
    token: token,
  },
});
