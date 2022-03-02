import { GET_ROOM_STATUS } from "../actions/types";

const initialState = {
  rooms: [],
};

export default function getRoomStatus(state = initialState, action) {
  switch (action.type) {
    case GET_ROOM_STATUS:
      return {
        ...state,
        rooms: [...action.payload],
      };
    default:
      return {
        ...state,
      };
  }
}
