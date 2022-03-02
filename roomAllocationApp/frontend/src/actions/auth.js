import axios from "axios";
import { returnErrors } from "./errors";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

//check token and load
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });

  //send request using token
  axios
    .get("api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//login user
export const login = (email, password) => (dispatch) => {
  //headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  axios
    .post("api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//register user
export const register =
  ({ first_name, last_name, email, rollNumber, phoneNumber, password }) =>
  (dispatch) => {
    //headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      rollNumber,
      phoneNumber,
      password,
    });

    axios
      .post("api/auth/register", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

//Logout user
export const logout = () => (dispatch, getState) => {
  //send request using token
  axios
    .post("api/auth/logout", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  //headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //if token is found, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
