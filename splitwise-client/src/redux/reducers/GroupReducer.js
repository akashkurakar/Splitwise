export default function userGroups(state = [], action) {
  switch (action.type) {
    case 'USER_GROUPS_SUCCESS':
      return Object.assign(state, action.payload);
    case 'USER_GROUP_UPDATE':
      return Object.assign([state], [...action.payload]);
    default:
      return state;
  }
}
