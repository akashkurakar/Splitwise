/* eslint-disable arrow-body-style */
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import alert from '../../redux/reducers/AlertReducers';
import UserGroups from './UserGroups';
import user from '../../redux/reducers/Userreducer';
import dashboard from '../../redux/reducers/DashboardReducers';
import groups from '../../redux/reducers/GroupReducer';
import transactions from '../../redux/reducers/TransactionReducer';
import notifications from '../../redux/reducers/NotificationReducer';
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

describe('SelectGroup', () => {
  let data = {
    grp_id: 1,
    grp_name: 'San Fernando',
    created_by: '3',
    image_path:
      'https://splitwise-bucket.s3.amazonaws.com/8B7FB326-154E-429A-BE19-DDF36953F913.jpeg',
    updated_by: '3',
    updated_on: '2021-03-17T21:27:15.000Z',
    status: 'left',
    id: 1,
    user_name: 3,
  };

  it('finds title', () => {
    const groups = jest.fn();
    const { getByTestId } = renderWithredux(<UserGroups groups={groups} />);
    const elem = getByTestId('header');
    expect(elem.innerHTML).toBe('My Groups');
  });
});

describe('UserGroup', () => {
  const data = [
    {
      grp_id: 1,
      grp_name: 'San Fernando',
      created_by: '3',
      image_path:
        'https://splitwise-bucket.s3.amazonaws.com/8B7FB326-154E-429A-BE19-DDF36953F913.jpeg',
      updated_by: '3',
      updated_on: '2021-03-17T21:27:15.000Z',
      status: 'left',
      id: 1,
      user_name: 3,
    },
  ];

  it('default message check', () => {
    renderWithredux(<UserGroups groups={data} />);
    const elem = screen.getByTestId('default-message');
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveTextContent('No groups available');
  });

  it('Seach box check', () => {
    renderWithredux(<UserGroups groups={data} />);
    expect(screen.getByText('Search Group')).toBeInTheDocument();
  });
});
