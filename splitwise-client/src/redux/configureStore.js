import { applyMiddleware, createStore } from "redux"

import {compose} from "redux";
import rootreducer from "./reducers";
import thunk from 'redux-thunk'
import {logger} from "redux-logger"
import {persistStore} from 'redux-persist';


export const store = createStore(rootreducer,compose(applyMiddleware(thunk,logger),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({latency:0})));

export const persistor = persistStore(store)

export default {store,persistor};