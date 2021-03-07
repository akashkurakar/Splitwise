import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import alert from './AlertReducers';
import user from './userreducer';
import dashboard from './DashboardReducers';
import groups from './GroupReducer';

const rootreducer = combineReducers({
  user,
  dashboard,
  alert,
  groups,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'alert','groups'],
};

export default persistReducer(persistConfig, rootreducer);
