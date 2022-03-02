import { combineReducers } from "redux";
import errors from "./errors";
import auth from "./auth";
import messages from "./messages";
import rooms from "./rooms";

export default combineReducers({
  errors,
  auth,
  messages,
  rooms,
});
