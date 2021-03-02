import './App.css';
import Main from "./components/main.js"
import React from 'react';
import { Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import history from './history';

import Footer from "./footer"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }


  }
  render() {


    return (
      <Router history={history}>
      
        
          <Container>
            <Main />
          </Container>
          <Footer />
       
      </Router>
    );
  }
}

export default App;
