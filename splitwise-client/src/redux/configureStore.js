/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootreducer from './reducers';

export const store = createStore(rootreducer, compose(applyMiddleware(thunk, logger)));

export const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };
