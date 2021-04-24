/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import constants from '../../constants/Constants';
import history from '../../history';
//  import history from '../../history';
import { logoutUser } from './UserAction';

export const updateGroup = (group) => ({ type: 'USER_GROUP_UPDATE', group });

export const getGroups = (userId) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  axios
    .get(`${constants.baseUrl}/api/groups/?id=${userId}`)
    .then((res) => {
      if (res.status === 200) {
        if (res.data.message === 'Group updated successfully!') {
          dispatch({ type: 'USER_GROUPS_SUCCESS', payload: res.data.data });
          dispatch({ type: 'ALERT_SUCCESS', message: res.data.message });
        } else {
          dispatch({ type: 'USER_GROUPS_SUCCESS', payload: res.data.data });
          dispatch({ type: 'ALERT_CLEAR', message: '' });
        }
      }
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};

export const createGroups = (data) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  axios
    .post(`${constants.baseUrl}/api/group/create`, data)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.message === 'Group Created Successfully!') {
          dispatch({ type: 'ALERT_CLEAR', message: '' });
          history.push('/dashboard');
        } else {
          dispatch({ type: 'ALERT_ERROR', message: response.data.message });
        }
      }
    })
    .catch((res) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: res });
    });
};

export const fileUpload = async (formData) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  axios
    .put(
      `${constants.baseUrl}/api/uploadfile/`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
      { responseType: 'blob' }
    )
    .then((res) => res.data.Location)

    .catch((error) => {
      return error;
    });
};

export const editGroup = (data) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  axios.defaults.withCredentials = true;
  axios
    .put(`${constants.baseUrl}/api/group/`, data)
    .then((response) => {
      if (response.status === 200) {
        if (response.data === 'Group updated successfully!') {
          dispatch({ type: 'ALERT_CLEAR', message: '' });
        } else {
          dispatch({ type: 'ALERT_ERROR', message: response.data });
        }
      }
    })
    .catch((res) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: res });
    });
};

export const leaveGroup = (data) => async (dispatch) => {
  await axios.post(`${constants.baseUrl}/api/group/leave`, data).then((response) => {
    if (response.status === 200) {
      const res = response.data;
      if (res.message === 'Group Left Successfully') {
        dispatch({ type: 'ALERT_SUCCESS', message: res.message });
        dispatch(getGroups(data.user));
      } else {
        dispatch({ type: 'ALERT_ERROR', message: res.message });
      }
    } else {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: response });
    }
  });
};
export const approveRequest = (data) => async (dispatch) => {
  await axios.post(`${constants.baseUrl}/api/groups/request`, data).then((response) => {
    if (response.status === 200) {
      dispatch({ type: 'ALERT_SUCCESS', message: response.message });
      dispatch(getGroups(data.user));
    } else {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: response.message });
    }
  });
};
