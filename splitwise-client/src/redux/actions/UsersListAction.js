/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import constants from '../../constants/Constants';
import history from '../../history';
import { logoutUser } from './UserAction';

export const getUsers = () => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  axios
    .get(`${constants.baseUrl}/api/users/`)
    .then((res) => {
      dispatch({ type: 'USER_LIST_SUCCESS', payload: res.data.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};
