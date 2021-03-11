export default function userLogin(state = [], action) {
  switch (action.type) {
    case "DASHBOARD_TOTAL_BALANCE_SUCCESS":
      return Object.assign(state, { ...action.payload });
    default:
      return state;
  }
}
