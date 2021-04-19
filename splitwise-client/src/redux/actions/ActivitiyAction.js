/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import constants from '../../constants/Constants';
import history from '../../history';
import { logoutUser } from './UserAction';

export const getRecentActivitiesByUser = (userId, page, rows) => async (dispatch) => {
  axios
    .get(`${constants.baseUrl}/api/activities?user=${userId}&page=${page}&rows=${rows}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: 'ACTIVITIES_USER_GET_SUCCESS', payload: response.data });
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

export const getRecentActivitiesByGroup = (userId, groupId, page, rows) => async (dispatch) => {
  axios
    .get(
      `${constants.baseUrl}/api/activities/group/?userid=${userId}&&groupid=${groupId}&page=${page}&rows=${rows}`
    )
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: 'ACTIVITIES_GROUP_GET_SUCCESS', payload: response.data });
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
