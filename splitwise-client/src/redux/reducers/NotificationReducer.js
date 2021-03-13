export default function userTransactions(state = [], action) {
  switch (action.type) {
    case 'USER_NOTIFICATIONS_SUCCESS':
      return Object.assign(state, action.payload);
    default:
      return state;
  }
}
