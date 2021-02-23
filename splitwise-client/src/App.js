import './App.css';

import Main from "./components/main.js"
import React from 'react';
import UserHeader from "./components/Dashboard/userheader"
import { BrowserRouter } from 'react-router-dom';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLoggedIn:false
    }

    
  }
render(){
  return (
    <BrowserRouter>
        <Main/>
    </BrowserRouter>
  );
}
}

export default App;
