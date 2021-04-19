/* eslint-disable react/jsx-boolean-value */
import './App.css';
import React from 'react';
import { Router, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import history from './history';
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home';
import Activity from './components/UserViews/UserActivity';
import MainContent from './components/Dashboard/MainContent';
import CreateGroup from './components/UserViews/CreateGroup';
import UserProfile from './components/UserViews/UserProfile';
import SelectGroup from './components/UserViews/SelectGroup';
import { store, persistor } from './redux/configureStore';

import Footer from './footer';

const App = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Router history={history}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {' '}
        <Container fluid>
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={MainContent} />
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/activity" component={Activity} />
          <Route path="/creategroup" component={CreateGroup} />
          <Route path="/userprofile" component={UserProfile} />
          <Route path="/selectgroup" component={SelectGroup} />
        </Container>
        <Footer />
      </PersistGate>
    </Provider>
  </Router>
);

export default App;
