import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import alert from './AlertReducers';
import user from './userreducer';
import dashboard from './DashboardReducers';

const rootreducer = combineReducers({
  user,
  dashboard,
  alert,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'alert'],
};

export default persistReducer(persistConfig, rootreducer);
