/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

export default function userLogin(state = [], action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return Object.assign(...state, action.payload);
    case 'LOGIN_REQUEST':
      return Object.assign(...state, action.payload);
    case 'LOGIN_USER_SUCCESS':
      return Object.assign(...state, action.payload);
    case 'LOGIN_USER_FAILURE':
      return Object.assign(...state, action.payload);
    case 'SIGN_UP_SUCCESS':
      return Object.assign(...state, action.payload);
    case 'SIGN_UP_FAILURE':
      return Object.assign(...state, action.payload);
    case 'USER_PROFILE_SUCCESS':
      return Object.assign(state, action.payload);
    case 'USER_PROFILE_FAILURE':
      return Object.assign(...state, action.payload);
    default:
      return state;
  }
}
