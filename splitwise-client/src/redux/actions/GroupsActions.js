/* eslint-disable arrow-body-style */
import axios from 'axios';
import constants from '../../constants/Constants';
import history from '../../history';

export const updateGroup = (group) => ({ type: 'USER_GROUP_UPDATE', group });

export const getGroups = (userId) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  axios
    .get(`${constants.baseUrl}/api/groups/?id=${userId}`)
    .then((res) => {
      dispatch({ type: 'USER_GROUPS_SUCCESS', payload: res.data.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
    })
    .catch((error) => {
      dispatch({ type: 'ALERT_ERROR', message: error });
      dispatch({ type: 'LOGOUT_USER', message: error });
      history.push('./login');
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
          window.location.href = './dashboard';
        } else {
          dispatch({ type: 'ALERT_ERROR', message: response.data.message });
        }
      }
    })
    .catch((res) => {
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
      dispatch({ type: 'ALERT_ERROR', message: res });
    });
};

export const getBalances = (grpId) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  const data = { grp_id: grpId };
  axios.post(`${constants.baseUrl}/api/transactions/groupbalances/`, data).then((response) => {
    if (response.status === 200) {
      dispatch({ type: 'GROUP_BALANCE_UPDATE', payload: response.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
    } else {
      dispatch({ type: 'ALERT_ERROR', message: response.data.message });
    }
  });
};
