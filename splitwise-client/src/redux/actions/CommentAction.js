/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import constants from '../../constants/Constants';
import history from '../../history';
import { logoutUser } from './UserAction';

export const getComments = (transaction) => async (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.get(`${constants.baseUrl}/api/comments/?id=${transaction}`).then((response) => {
    if (response.status === 200) {
      dispatch({ type: 'COMMENTS_GET_SUCCESS', payload: response.data.data });
      dispatch({ type: 'ALERT_SUCCESS', message: '' });
    } else {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: response.data.message });
    }
  });
};

export const addComments = (data) => async (dispatch) => {
  axios.post(`${constants.baseUrl}/api/comment/post`, data).then((response) => {
    if (response.status === 200) {
      const res = response.data;
      if (res.message === 'Comment added successfully!') {
        dispatch({ type: 'COMMENTS_ADD_SUCCESS', payload: res.data });
        dispatch(getComments(data.transaction_id));
        dispatch({ type: 'ALERT_SUCCESS', message: '' });
      }
    } else {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: response.data.message });
    }
  });
};

export const removeComments = (transaction, index) => async (dispatch) => {
  axios.defaults.withCredentials = true;

  axios.get(`${constants.baseUrl}/api/comment/delete?id=${index}`).then((response) => {
    if (response.status === 200) {
      dispatch({ type: 'COMMENTS_REMOVE_SUCCESS', payload: response.data });
      dispatch(getComments(transaction));
      dispatch({ type: 'ALERT_SUCCESS', message: response.data.message });
    } else {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: response.data.message });
    }
  });
};
