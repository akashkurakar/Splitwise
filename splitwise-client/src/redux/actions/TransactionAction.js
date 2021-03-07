import axios from 'axios';
import history from '../../history';

export const getTransaction = (userId) => async (dispatch) => {
    axios.get(`http://localhost:3001/api/transactions/?user=${userId}`)
    .then((res) => {
        dispatch({ type: 'USER_TRANSACTION_SUCCESS', payload: res.data });
        dispatch({ type: 'ALERT_CLEAR', message: '' });
      })
      .catch((error) => {
        dispatch({ type: 'ALERT_ERROR', message: error });
      });
}