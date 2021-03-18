/* eslint-disable arrow-body-style */
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import alert from '../redux/reducers/AlertReducers';
import SignUp from './signup';
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

describe('SignUp', () => {
  it('check header', () => {
    const { getByTestId } = renderWithredux(<SignUp />);
    const elem = getByTestId('header');
    expect(elem.innerHTML).toBe('Hi there! Sign me up!');
  });

  it('check name field', () => {
    renderWithredux(<SignUp />);
    fireEvent.change(screen.getByTestId('name'), { target: { value: 'thomas' } });
    expect(screen.getByTestId('name').value).toBe('thomas');
  });

  it('check email field', () => {
    renderWithredux(<SignUp />);
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'thomas@gmail.com' } });
    expect(screen.getByTestId('email').value).toBe('thomas@gmail.com');
  });

  it('check for password field', () => {
    renderWithredux(<SignUp />);
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'akash' } });
    expect(screen.getByTestId('password').value).toBe('akash');
  });

  it('click signup button', () => {
    const handleClick = jest.fn();
    renderWithredux(<SignUp />);
    fireEvent.click(screen.getByTestId('signup'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
