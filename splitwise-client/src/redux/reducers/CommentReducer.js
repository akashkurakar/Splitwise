/* eslint-disable no-param-reassign */
export default function comment(state = [], action) {
  switch (action.type) {
    case 'COMMENT_ADD_SUCCESS':
      state = [];
      return Object.assign(state, { ...action.payload });
    case 'COMMENTS_REMOVE_SUCCESS':
      state = [];
      return Object.assign((state, { ...action.payload }));
    case 'COMMENTS_GET_SUCCESS':
      state = [];
      return Object.assign(state, { ...action.payload });
    default:
      return state;
  }
}
