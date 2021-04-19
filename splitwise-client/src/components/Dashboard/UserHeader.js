/* eslint-disable arrow-body-style */
import React from 'react';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import * as userActions from '../../redux/actions/UserAction';
import history from '../../history';

class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  handleLogout = () => {
    this.props.logoutUser(this.state.user);
    cookie.remove('cookie');
  };

  handleProfilelick = (e) => {
    e.preventDefault();
    history.push('/userprofile');
  };

  handleGroupClick = (e) => {
    e.preventDefault();
    history.push('/creategroup');
  };

  handleHome = (e) => {
    e.preventDefault();
    history.push('/dashboard');
  };

  render() {
    return (
      <>
        <header style={{ 'max-height': '50px', 'background-color': '#5bc5a7' }}>
          <div className="container mx-auto">
            <nav className="navbar" style={{ 'max-height': '50px', 'align-content': 'center' }}>
              <a className="navbar-brand" href="/">
                <img
                  src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
                  width="150"
                  height="150"
                  className="d-inline-block align-top"
                  alt=""
                />
              </a>
              <div>
                <form className="form-inline my-2 my-lg-0">
                  <div>
                    <Link to="/dashboard" style={{ color: 'white' }}>
                      <Typography onClick={this.handleHome}>Home</Typography>
                    </Link>
                  </div>

                  <div>
                    <Dropdown>
                      <Dropdown.Toggle className="header-user" id="dropdown-basic">
                        {this.state.user.name}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={this.handleProfilelick}>My Profile</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleGroupClick}>Create Group</Dropdown.Item>
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
    );
  }
}

UserHeader.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  logoutUser: userActions.logoutUser,
};

export default connect(mapStatetoProps, mapDispatchToProps)(UserHeader);
