/* eslint-disable no-param-reassign */
import storage from "redux-persist/lib/storage";

export default function userTransactions(state = [], action) {
  switch (action.type) {
    case "USER_TRANSACTION_SUCCESS":
      return Object.assign(state, action.payload);
    case "LOGOUT_USER":
      storage.removeItem("persist:root");
      // eslint-disable-next-line no-return-assign
      return (state = []);
    default:
      return state;
  }
}
