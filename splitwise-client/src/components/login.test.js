/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import alert from '../redux/reducers/AlertReducers';
import Login from './login';
import user from '../redux/reducers/Userreducer';
import dashboard from '../redux/reducers/DashboardReducers';
import groups from '../redux/reducers/GroupReducer';
import transactions from '../redux/reducers/TransactionReducer';
import notifications from '../redux/reducers/NotificationReducer';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// the component to test
// declare which API requests to mock
const server = setupServer(
  rest.get('/api/login', (req, res, ctx) => res(ctx.json({ message: 'login succesfull' })))
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());
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
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
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

  it('click password field', () => {
    renderWithredux(<Login />);
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'akash' } });
    expect(screen.getByTestId('password').value).toBe('akash');
  });
});
