import React from "react";
import cookie from 'react-cookies';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import * as userActions from "../../redux/actions/userAction";
import {connect} from "react-redux";

class UserHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            user:this.props.user
        }
    }
    handleLogout = (e) => {
        e.preventDefault();
        cookie.remove("cookie")
    }
    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    };
    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    };

    handleLogout =()=>{
        this.props.logoutUser(this.state.user);
    }

    render() {
        const open = Boolean(this.state.anchorEl);
        let user = null;
        if (cookie.load("cookie")) {
            user = cookie.load("cookie");
        }
        return (
            <>
                <header style={{ 'max-height': '50px', 'background-color': '#5bc5a7' }}>
                    <div className="container mx-auto">
                        <nav className="navbar" style={{ 'max-height': '50px', 'align-content': 'center' }}>
                            <a className="navbar-brand" href="/">
                                <img src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg" width="150" height="150" className="d-inline-block align-top" alt="" />
                            </a>


                            <div>
                                <form className="form-inline my-2 my-lg-0">
                                    <div>
                                        <Link to="/dashboard">
                                            Home
        </Link>
                                    </div>

                                    <div>
                                        <Dropdown>
                                            <Dropdown.Toggle className="header-user" id="dropdown-basic">
                                                {this.state.user.name}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="/userprofile">My Profile</Dropdown.Item>
                                                <Dropdown.Item href="creategroup">Create Group</Dropdown.Item>
                                                <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </form>
                            </div>

                        </nav>
                    </div>
                </header>
            </>
        )
    }
}
const mapStatetoProps=(state)=>{
    return {
     user : state.user
    }
 }
 const mapDispatchToProps ={
    logoutUser : userActions.logoutUser
}

 export default connect(mapStatetoProps,mapDispatchToProps)(UserHeader);