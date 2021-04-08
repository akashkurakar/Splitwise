/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import constants from '../../constants/Constants';

export const getTransaction = (userId) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  axios
    .get(`${constants.baseUrl}/api/transactions/?user=${userId}`)
    .then((res) => {
      dispatch({ type: 'USER_TRANSACTION_SUCCESS', payload: res.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
    })
    .catch((error) => {
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};

export const getGroupTransaction = (grpId) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  axios
    .get(`${constants.baseUrl}/api/transactions/?id=${grpId}`)
    .then((res) => {
      dispatch({ type: 'GROUP_TRANSACTION_SUCCESS', payload: res.data.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
    })
    .catch((error) => {
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};
export const getUserBalances = (userID) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  axios.defaults.withCredentials = true;
  axios.get(`${constants.baseUrl}/api/balances/?user=${userID}`).then((response) => {
    if (response.status === 200) {
      dispatch({ type: 'USER_BALANCE_SUCCESS', payload: response.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
    } else {
      dispatch({ type: 'ALERT_ERROR', message: response.message });
    }
  });
};
