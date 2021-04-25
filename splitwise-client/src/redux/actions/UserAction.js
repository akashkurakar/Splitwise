/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import storage from 'redux-persist/lib/storage';
import jwt_decode from 'jwt-decode';
import history from '../../history';
import constants from '../../constants/Constants';

export function loginUserSuccess(user) {
  return { type: 'LOGIN_USER_SUCCESS', user };
}
export function userSignUpSuccess(user) {
  return { type: 'SIGN_UP_SUCCESS', user };
}
export function userProfileSuccess(user) {
  return { type: 'USER_PROFILE_SUCCESS', user };
}
export function clearAlert() {
  return { type: 'ALERT_CLEAR', message: '' };
}

export const logoutUser = () => async (dispatch) => {
  storage.removeItem('persist:root');
  dispatch({ type: 'ALERT_CLEAR', message: '' });
  dispatch({ type: 'LOGOUT_USER', data: '' });
  localStorage.removeItem('token');
  clearAlert();
  history.push('/login');
};

export const loginUser = (user) => async (dispatch) => {
  await axios
    .post(`${constants.baseUrl}/api/login`, user)
    .then((res) => {
      try {
        const decoded = jwt_decode(res.data.token.split(' ')[1], { payload: true });
        localStorage.setItem('user_id', decoded.user_id);
        if (decoded) {
          localStorage.setItem('token', res.data.token);
          dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data.data });
          history.push('/dashboard');
          dispatch({ type: 'ALERT_CLEAR', message: '' });
        } else {
          dispatch({ type: 'ALERT_ERROR', message: res.data.message });
        }
      } catch (e) {
        dispatch({ type: 'ALERT_ERROR', message: res.data.message });
      }
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};

export const getUser = (id) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  await axios
    .get(`${constants.baseUrl}/api/user/id?id=${id}`)
    .then((res) => {
      dispatch({ type: 'USER_SUCCESS', payload: res.data.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};

export const signupUser = (user) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  await axios
    .put(`${constants.baseUrl}/api/signup`, user)
    .then((res) => {
      try {
        const decoded = jwt_decode(res.data.token.split(' ')[1], { payload: true });
        if (decoded) {
          localStorage.setItem('token', res.data.token);
          dispatch({ type: 'SIGN_UP_SUCCESS', payload: res.data });
          dispatch({ type: 'ALERT_CLEAR', message: res.data.message });
          history.push('/dashboard');
        }
      } catch (e) {
        dispatch({ type: 'ALERT_ERROR', message: res.data.message });
      }
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};

export const updateUserProfile = (user) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  await axios
    .post(`${constants.baseUrl}/api/user/update`, user)
    .then((res) => {
      dispatch({ type: 'USER_PROFILE_SUCCESS', payload: user });
      dispatch({ type: 'ALERT_SUCCESS', message: res.data.message });
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'USER_PROFILE_FAILURE', payload: error });
      throw error;
    });
};
