/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import constants from '../../constants/Constants';
import history from '../../history';
// import { getGroups } from './GroupsActions';
import { logoutUser } from './UserAction';

export const getTransaction = (userId) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  axios
    .get(`${constants.baseUrl}/api/transactions/?user=${userId}`)
    .then((res) => {
      dispatch({ type: 'USER_TRANSACTION_SUCCESS', payload: res.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
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
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};
export const getUserBalances = (userID) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  axios.defaults.withCredentials = true;
  axios
    .get(`${constants.baseUrl}/api/balances/?user=${userID}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: 'USER_BALANCE_SUCCESS', payload: response.data });
        dispatch({ type: 'ALERT_CLEAR', message: response.data.message });
      } else {
        dispatch({ type: 'ALERT_ERROR', message: response.data.message });
      }
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};

export const addExpense = (data) => async (dispatch) => {
  await axios
    .post(`${constants.baseUrl}/api/transactions`, data)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.message === 'Expenses added successfully!') {
          dispatch({ type: 'ALERT_SUCCESS', message: response.data.message });
          dispatch(getGroupTransaction(data.grpId));
        } else {
          dispatch({ type: 'ALERT_ERROR', message: response.data.message });
        }
      }
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};

export const editExpense = (data, grpId) => async (dispatch) => {
  await axios
    .post(`${constants.baseUrl}/api/transactions/update`, data)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.message === 'Expenses added successfully!') {
          dispatch({ type: 'ALERT_SUCCESS', message: response.data.message });
          dispatch(this.getGroupTransaction(grpId));
        } else {
          dispatch({ type: 'ALERT_ERROR', message: response.data.message });
        }
      } else {
        dispatch({ type: 'ALERT_ERROR', message: response.data.message });
      }
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};

export const settleExpense = (data) => async (dispatch) => {
  axios.defaults.withCredentials = true;
  axios
    .post(`${constants.baseUrl}/api/transactions/settle`, data)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.message === 'Transaction Settled') {
          dispatch({ type: 'ALERT_SUCCESS', message: response.data.message });
          getTransaction(data.user1);
        } else {
          dispatch({ type: 'ALERT_ERROR', message: response.data.message });
        }
      }
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};

export const getTotalTransactionByUser = (userId) => async (dispatch) => {
  axios
    .get(`${constants.baseUrl}/api/transactions/data/?user=${userId}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: 'ALERT_SUCCESS', message: response.data.message });
      } else {
        dispatch({ type: 'ALERT_ERROR', message: response.data.message });
      }
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};
