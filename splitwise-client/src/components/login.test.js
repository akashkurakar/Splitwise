/* eslint-disable arrow-body-style */
import { render, fireEvent, wait } from '@testing-library/react';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { combineReducers } from 'redux';
import alert from '../redux/reducers/AlertReducers';
import Login from './login';
import user from '../redux/reducers/Userreducer';
import dashboard from '../redux/reducers/DashboardReducers';
import groups from '../redux/reducers/GroupReducer';
import transactions from '../redux/reducers/TransactionReducer';
import notifications from '../redux/reducers/NotificationReducer';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

const rootreducer = combineReducers({
  user,
  dashboard,
  alert,
  groups,
  transactions,
  notifications,
});

const initialReducerState = rootreducer({}, {});
function reducer(state = initialReducerState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, initialReducerState };
    default:
      return state;
  }
}
function renderWithredux(
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return { ...render(<Provider store={store}>{component}</Provider>) };
}

describe('Login', () => {
  it('finds title', () => {
    const { getByTestId } = renderWithredux(<Login />);
    const elem = getByTestId('header');
    expect(elem.innerHTML).toBe('WELCOME TO SPLITWISE');
  });
});
