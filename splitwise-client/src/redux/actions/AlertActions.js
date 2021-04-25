function success(message) {
  return { type: 'ALERT_SUCCESS', message };
}

function error(message) {
  return { type: 'ALERT_ERROR', message };
}

export function clear() {
  return { type: 'ALERT_CLEAR' };
}
const alertActions = {
  success,
  error,
  clear,
};
export default alertActions;
