export default function userList(state = [], action) {
  switch (action.type) {
    case 'USER_LIST_SUCCESS':
      return Object.assign(state, action.payload);
    default:
      return state;
  }
}
