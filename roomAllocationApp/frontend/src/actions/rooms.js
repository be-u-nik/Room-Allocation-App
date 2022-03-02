import axios from "axios";
import { GET_ROOM_STATUS } from "./types";
import { returnErrors } from "./errors";

export const getRoomStatus = async () => async (dispatch) => {
  console.log("req sent");
  await axios
    .get(`http://127.0.0.1:8000/api/rooms/`)
    .then((res) => {
      clg(res.status);
      dispatch({
        type: GET_ROOM_STATUS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
  console.log("res recieved");
};
