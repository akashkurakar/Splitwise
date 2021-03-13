export default function userTransactions(state = [], action) {
  switch (action.type) {
    case 'USER_TRANSACTION_SUCCESS':
      return Object.assign(state, action.payload);
    default:
      return state;
  }
}
