/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import axios from 'axios';

export const getUsers = () => async (dispatch) => {
  axios
    .get(`http://localhost:3001/api/users/`)
    .then((res) => {
      dispatch({ type: 'USER_LIST_SUCCESS', payload: res.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
    })
    .catch((error) => {
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};
