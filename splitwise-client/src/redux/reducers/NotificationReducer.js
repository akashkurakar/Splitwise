/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import storage from "redux-persist/lib/storage";

export default function userTransactions(state = [], action) {
  switch (action.type) {
    case "USER_NOTIFICATIONS_SUCCESS":
      return Object.assign(state, action.payload);
    case "LOGOUT_USER":
      storage.removeItem("persist:root");
      return (state = []);
    default:
      return state;
  }
}
