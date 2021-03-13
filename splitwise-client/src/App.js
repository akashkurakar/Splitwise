import './App.css';
import React from 'react';
import { Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Main from './components/main';
import history from './history';

import Footer from './footer';

const App = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Router history={history}>
    <Container fluid>
      <Main />
    </Container>
    <Footer />
  </Router>
);

export default App;
