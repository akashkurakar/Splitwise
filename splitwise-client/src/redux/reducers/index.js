/* eslint-disable arrow-body-style */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import alert from './AlertReducers';
import user from './Userreducer';
import dashboard from './DashboardReducers';
import groups from './GroupReducer';
import transactions from './TransactionReducer';
import notifications from './NotificationReducer';
import users from './UsersReducers';

const rootreducer = combineReducers({
  user,
  dashboard,
  alert,
  groups,
  transactions,
  notifications,
  users,
});

const initialState = rootreducer({}, {});

const appReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    Object.assign(state, initialState);
  }

  return rootreducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'alert', 'groups', 'transactions', 'notifications'],
};

export default persistReducer(persistConfig, appReducer);
