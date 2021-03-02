import { combineReducers } from "redux"
import alert from './AlertReducers';
import user from "./userreducer";
import {persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage"



const rootreducer = combineReducers({
   user,
   alert
})
const persistConfig = {
    key:'root',
    storage,
    whitelist:['user','alert']
}

export default persistReducer(persistConfig,rootreducer);