import React from 'react';
import LeftSideBar from './leftsidebar';
import RightSideBar from './rightsidebar';
import Activity from "../UserViews/useractivity";
import UserDashboard from "../UserViews/userdashboard";
import CreateGroup from "../UserViews/creategroup";
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import Footer from "../../footer"
import UserHeader from './userheader';
class MainContent extends React.Component {
   constructor(props){
       super(props);
       this.state={
           step:1,
           redirect:null
       }
       this.handleCallback = this.handleCallback.bind(this);
   }
    componentDidMount(){
       
    }
    handleCallback = (childData) =>{
        console.log(childData);
        this.setState({step: childData})
    }
    render(){
        let {redirect} = this.state;
        if(cookie.load('cookie')){
            redirect=false;
        }else{
            redirect=null;
        }
        console.log(cookie.load('cookie'))
        return(
            <>
            <UserHeader/>
            <div>
                {/*Render Different Component based on Route*/} 
                <div className="container">
                    <div className="row">
                    <div className="col-3" style={{'background-color':'#ffffff'}}>
                            <LeftSideBar getStep = {this.handleCallback.bind(this)}/>
                            </div>
                        <div className="col-6">
                           {this.state.step=== 1 ? <UserDashboard/>:null}

                           {this.state.step=== 2?<Activity/>:null}
                           {this.state.step=== 4?<CreateGroup/>:null}
                        </div>
                        <div className="col-3" style={{'background-color':'#ffffff'}}>
                            <RightSideBar />
                        </div>
                    </div>
                </div>
                {redirect==null && <Redirect to="/login" />}
           </div>
           <Footer />
            </>
        )
    }
}
//Export The Main Component
export default MainContent;