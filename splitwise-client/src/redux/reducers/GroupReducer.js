export default function userGroups(
  state = {
    groups: [],
    balances: [],
  },
  action
) {
  switch (action.type) {
    case 'USER_GROUPS_SUCCESS':
      return Object.assign(state, { groups: action.payload });
    case 'USER_GROUP_UPDATE':
      return Object.assign([state], [...action.payload]);
    case 'GROUP_BALANCE_UPDATE':
      return Object.assign(state, { balances: action.payload });
    default:
      return state;
  }
}
