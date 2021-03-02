import {Route} from 'react-router-dom';
import React from 'react';

import Signup from "./signup";
import Login from "./login";
import Home from "./home";
import Activity from "./UserViews/UserActivity";
import MainContent from './Dashboard/MainContent';
import CreateGroup from './UserViews/CreateGroup';
import UserProfile from './UserViews/UserProfile';
class Main extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
   
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" component={MainContent}/>
                <Route  exact path="/" component={Home}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/activity" component={Activity}/>
                <Route path="/creategroup" component={CreateGroup}/>
                <Route path="/userprofile" component={UserProfile}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;