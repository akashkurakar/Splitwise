import axios from 'axios';
import history from '../../history';

export function loginUserSuccess(user) {
  return { type: 'LOGIN_USER_SUCCESS', user };
}
export function userSignUpSuccess(user) {
  return { type: 'SIGN_UP_SUCCESS', user };
}
export function userProfileSuccess(user) {
  // history.push('/dashboard');
  return { type: 'USER_PROFILE_SUCCESS', user };
}
export function logoutUser(user) {
  history.push('/login');
  return { type: 'LOGOUT_USER', user };
}
export const loginUser = (user) => async (dispatch) => {
  await axios
    .post('http://localhost:3001/api/login', user)
    .then((res) => {
      dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
      history.push('/dashboard');
    })
    .catch((error) => {
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};
export const signupUser = (user) => async (dispatch) => {
  await axios
    .post('http://localhost:3001/api/signup', user)
    .then((res) => {
      dispatch({ type: 'SIGN_UP_SUCCESS', payload: res.data });
      dispatch({ type: 'ALERT_CLEAR', message: res.data.message });
      history.push('/dashboard');
    })
    .catch((error) => {
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};
export const updateUserProfile = (user) => async (dispatch) => {
  await axios
    .post(`http://localhost:3001/api/user/update`, user)
    .then((res) => {
      dispatch({ type: 'USER_PROFILE_SUCCESS', payload: user });
      dispatch({ type: 'ALERT_SUCCESS', message: res.data.message });
    })
    .catch((error) => {
      dispatch({ type: 'USER_PROFILE_FAILURE', payload: error });
      throw error;
    });
};
