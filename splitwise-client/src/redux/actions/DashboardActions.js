/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import constants from '../../constants/Constants';
import history from '../../history';
import { logoutUser } from './UserAction';

const getTotalBalances = (user) => async (dispatch) => {
  axios.defaults.headers.common.authorization = localStorage.getItem('token');

  await axios
    .get(`${constants.baseUrl}/api/transactions/data/?user=${user}`)
    .then((res) => {
      dispatch({ type: 'DASHBOARD_TOTAL_BALANCE_SUCCESS', payload: res.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
      // history.push('/dashboard');
    })
    .catch((error) => {
      dispatch(logoutUser());
      history.push('/login');
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};
export default getTotalBalances;
