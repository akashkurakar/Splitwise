import axios from 'axios';

const getTotalBalances = (user) => async (dispatch) => {
  await axios
    .get(`http://localhost:3001/api/transactions/data/?user=${user}`)
    .then((res) => {
      dispatch({ type: 'DASHBOARD_TOTAL_BALANCE_SUCCESS', payload: res.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
      // history.push('/dashboard');
    })
    .catch((error) => {
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};
export default getTotalBalances;
