import {Route} from 'react-router-dom';
import React from 'react';

import Signup from "./signup";
import Login from "./login";
import Home from "./home";
import Activity from "./UserViews/useractivity";
import MainContent from './Dashboard/mainContent';
import CreateGroup from './UserViews/creategroup';
import UserProfile from './UserViews/userprofile';
class Main extends React.Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" component={MainContent}/>
                <Route path="/home" component={Home}/>
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