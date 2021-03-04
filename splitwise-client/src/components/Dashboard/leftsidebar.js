import React from 'react';
import photo from '../../static/images/avatar/download.png';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

class LeftSideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: []
        }
        this.loadActivity = this.loadActivity.bind(this);
        this.loadDashboard = this.loadDashboard.bind(this);
        this.handleGroupClick = this.handleGroupClick.bind(this);
    }

    loadActivity = (e) => {
        let step = 2;
        this.props.getStep(step)
        e.preventDefault();
    }
    loadDashboard = (e) => {
        console.log(this.props);
        let step = 1;
        this.props.getStep(step);
        e.preventDefault();
    }
    loadAllActivity = (e) => {
        let step = 3;
        this.props.getStep(step)
        e.preventDefault();
    }
    loadCreateGroup = (e) => {
        let step = 4;
        this.props.getStep(step)
        e.preventDefault();
    }
    loadAllGroups = (e) => {
        let step = 5;
        this.props.getStep(step);
        e.preventDefault();
    }
    loadAllNotifications= (e) => {
        let step = 7;
        this.props.getStep(step);
        e.preventDefault();
    }
    handleGroupClick = (e,index) => {
        let step = 6;
        this.props.getStep(step);
        console.log(this.props.groups[e].grp_name);
        this.props.selectedGroup(this.props.groups[e].grp_name.toString());
    }
    render() {
        return (

            <nav id="sidebar" style={{ width: "fit-content" }}>
                <div className="sidebar-header">
                    <ul className="list-unstyled components">
                        <li className="active">
                            <img src={photo} width="15" height="15" style={{'margin':"5px"}} className="d-inline-block align-top" alt=""></img>
                            <a href="/#" data-toggle="collapse" onClick={this.loadDashboard} aria-expanded="false">Dashboard</a>
                        </li>
                        <li className="active">
                        <AssistantPhotoIcon color="secondary"/>
                            <a href="/#" data-toggle="collapse" aria-expanded="false" onClick={this.loadActivity}>Recent Activity</a>
                        </li>
                        <div class="dropdown-divider"></div>
                        <li className="active">
                            <form class="navbar-form" role="search">
                                <div class="input-group">
                                    <input type="text" class="form-control input-sm" placeholder="Search" name="srch-term" id="inputsm" />
                                    <div class="input-group-btn">
                                        <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                                    </div>
                                </div>
                            </form>
                        </li>
                        <div class="dropdown-divider"></div>
                     
                        <li className="active">
                        <NotificationImportantIcon/>    
                            <a href="/#" data-toggle="collapse" aria-expanded="false" onClick={this.loadAllNotifications}>Notifications</a>
                        </li>
                        <div class="dropdown-divider"></div>
                        <li className="active">
                        <ListOutlinedIcon/>
                            <a href="/#" data-toggle="collapse" aria-expanded="false" onClick={this.loadAllActivity}>All Expenses</a>
                        </li>
                        <div class="dropdown-divider"></div>
                        <div>
                            <div class="card" style={{ "height": '1.5rem', backgroundColor: "#eeeeee" }}>
                                <div class="header">
                                    <label style={{ 'font-size': "14px" }}>Groups</label>
                                    <a href="/creategroup" className="card-link" style={{ 'float': 'right', 'font-size': "14px" }}><GroupAddIcon/></a>
                                </div>
                            </div>
                        </div>
                        {this.props.groups.map((r, index) => (
                            <li>
                                <div className="card-body" style={{ 'padding': '0', 'height': '1rem' }} value={r.grp_name}>
                                <SupervisedUserCircleIcon color="primary"/>
                                    <label onClick={()=>this.handleGroupClick(index)} >{r.grp_name}</label>
                                </div>
                                <div class="dropdown-divider"></div>
                            </li>
                            
                        ))}

                     
                        <li className="active">
                        <GroupWorkIcon/>    
                            <a href="/#" data-toggle="collapse" aria-expanded="false" onClick={this.loadAllGroups}>All Groups</a>
                        </li>
                        
                    </ul>

                </div>

            </nav>)
    }
}
export default LeftSideBar; 