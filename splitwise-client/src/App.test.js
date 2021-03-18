/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import alert from './redux/reducers/AlertReducers';
import user from './redux/reducers/Userreducer';
import dashboard from './redux/reducers/DashboardReducers';
import groups from './redux/reducers/GroupReducer';
import transactions from './redux/reducers/TransactionReducer';
import notifications from './redux/reducers/NotificationReducer';

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

test('renders learn react link', () => {
  renderWithredux(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
