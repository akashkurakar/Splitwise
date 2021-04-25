/* eslint-disable arrow-body-style */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import alert from './AlertReducers';
import user from './Userreducer';
import dashboard from './DashboardReducers';
import groups from './GroupReducer';
import transactions from './TransactionReducer';
import users from './UsersReducers';
import comments from './CommentReducer';
import activities from './ActivityReducer';

const rootreducer = combineReducers({
  user,
  dashboard,
  alert,
  groups,
  transactions,
  users,
  comments,
  activities,
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
};

export default persistReducer(persistConfig, appReducer);
