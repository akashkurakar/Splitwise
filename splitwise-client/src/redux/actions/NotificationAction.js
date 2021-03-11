/* eslint-disable arrow-body-style */
import axios from 'axios';

export const updateNotifications = (group) => ({
  type: 'USER_NOTFICATION_UPDATE',
  group,
});

export const getNotifications = (userId) => async (dispatch) => {
  axios
    .get(`http://localhost:3001/api/notifications/?user=${userId.name}`)
    .then((res) => {
      dispatch({ type: 'USER_NOTIFICATIONS_SUCCESS', payload: res });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
    })
    .catch((error) => {
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};
