/* eslint-disable arrow-body-style */
import axios from 'axios';
import constants from '../../constants/Constants';

export const updateGroup = (group) => ({ type: 'USER_GROUP_UPDATE', group });

export const getGroups = (userId) => async (dispatch) => {
  axios
    .get(`${constants.baseUrl}/api/groups/?id=${userId}`)
    .then((res) => {
      dispatch({ type: 'USER_GROUPS_SUCCESS', payload: res.data.data });
      dispatch({ type: 'ALERT_CLEAR', message: '' });
    })
    .catch((error) => {
      dispatch({ type: 'ALERT_ERROR', message: error });
    });
};
