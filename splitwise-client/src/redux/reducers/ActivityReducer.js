/* eslint-disable no-param-reassign */
export default function comment(state = [], action) {
  switch (action.type) {
    case 'ACTIVITIES_USER_GET_SUCCESS':
      state = [];
      return Object.assign(state, { ...action.payload });
    case 'ACTIVITIES_GROUP_GET_SUCCESS':
      state = [];
      return Object.assign((state, { ...action.payload }));
    case 'COMMENTS_GET_SUCCESS':
      state = [];
      return Object.assign(state, { ...action.payload });
    default:
      return state;
  }
}
