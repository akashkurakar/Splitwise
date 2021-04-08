export default function userTransactions(state = [], action) {
  switch (action.type) {
    case 'USER_TRANSACTION_SUCCESS':
      return Object.assign(state, [...action.payload]);
    case 'GROUP_TRANSACTION_SUCCESS':
      return Object.assign(state, { group: [...action.payload] });
    case 'USER_BALANCE_SUCCESS':
      return Object.assign(state, { balances: action.payload });
    default:
      return state;
  }
}
