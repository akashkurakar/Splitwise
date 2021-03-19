/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import alert from '../redux/reducers/AlertReducers';
import Login from './login';
import user from '../redux/reducers/Userreducer';
import dashboard from '../redux/reducers/DashboardReducers';
import groups from '../redux/reducers/GroupReducer';
import transactions from '../redux/reducers/TransactionReducer';
import notifications from '../redux/reducers/NotificationReducer';
import '@testing-library/jest-dom/extend-expect';

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

  it('click edit button', () => {
    renderWithredux(<Login />);
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'akash@gmail.com' } });
    expect(screen.getByTestId('email').value).toBe('akash@gmail.com');
  });

  it('click edit button', () => {
    renderWithredux(<Login />);
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'akash' } });
    expect(screen.getByTestId('password').value).toBe('akash');
  });
});
