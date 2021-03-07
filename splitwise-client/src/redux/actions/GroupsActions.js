import axios from 'axios';
export const updateGroup = (group) => {
  return { type: 'USER_GROUP_UPDATE', group };
}
export const getGroups = (userId)  => async (dispatch) => {
    axios.get(`http://localhost:3001/api/groups/?id=${userId}`)
    .then((res) => {
        dispatch({ type: 'USER_GROUPS_SUCCESS', payload:res.data });
        dispatch({ type: 'ALERT_CLEAR', message: '' });
      })
      .catch((error) => {
        dispatch({ type: 'ALERT_ERROR', message: error });
      });
  }