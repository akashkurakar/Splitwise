/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootreducer from './reducers';

export const store = createStore(
  rootreducer,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ latency: 0 })
  )
);

export const persistor = persistStore(store);

export default { store, persistor };
