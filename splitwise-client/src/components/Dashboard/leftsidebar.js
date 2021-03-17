/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import { Typography } from '@material-ui/core';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
// import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import PropTypes from 'prop-types';
import photo from '../../static/images/avatar/download.png';

class LeftSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.loadActivity = this.loadActivity.bind(this);
    this.loadDashboard = this.loadDashboard.bind(this);
    this.handleGroupClick = this.handleGroupClick.bind(this);
  }

  loadActivity = (e) => {
    const step = 2;
    this.props.getStep(step);
    e.preventDefault();
  };

  loadDashboard = (e) => {
    const step = 1;
    this.props.getStep(step);
    e.preventDefault();
  };

  loadAllActivity = (e) => {
    const step = 3;
    this.props.getStep(step);
    e.preventDefault();
  };

  loadCreateGroup = (e) => {
    const step = 4;
    this.props.getStep(step);
    e.preventDefault();
  };

  loadAllGroups = (e) => {
    const step = 5;
    this.props.getStep(step);
    e.preventDefault();
  };

  loadAllNotifications = (e) => {
    const step = 7;
    this.props.getStep(step);
    e.preventDefault();
  };

  handleGroupClick = (e) => {
    const step = 6;
    this.props.getStep(step);
    this.props.selectedGroup(this.props.groups.filter((d) => d.status !== 'left')[e]);
  };

  render() {
    return (
      <nav id="sidebar" style={{ width: '100%' }}>
        <div className="sidebar-header">
          <ul className="list-unstyled components">
            <li className="active">
              <img
                src={photo}
                width="15"
                height="15"
                style={{ margin: '5px' }}
                className="d-inline-block align-top"
                alt=""
              />
              <a
                href="/#"
                data-toggle="collapse"
                onClick={this.loadDashboard}
                aria-expanded="false"
              >
                Dashboard
              </a>
            </li>
            <li className="active">
              <AssistantPhotoIcon color="secondary" />
              <a href="/#" data-toggle="collapse" aria-expanded="false" onClick={this.loadActivity}>
                Recent Activity
              </a>
            </li>
            <div className="dropdown-divider" />
            <li className="active">
              <form className="navbar-form" role="search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control input-sm"
                    placeholder="Search"
                    name="srch-term"
                    id="inputsm"
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-default" type="submit">
                      <i className="glyphicon glyphicon-search" />
                    </button>
                  </div>
                </div>
              </form>
            </li>
            <div className="dropdown-divider" />

            <li className="active">
              <NotificationImportantIcon />
              <a
                href="/#"
                data-toggle="collapse"
                aria-expanded="false"
                onClick={this.loadAllNotifications}
              >
                Notifications
              </a>
            </li>
            <div className="dropdown-divider" />
            <li className="active">
              <ListOutlinedIcon />
              <a
                href="/#"
                data-toggle="collapse"
                aria-expanded="false"
                onClick={this.loadAllActivity.bind(this)}
              >
                All Expenses
              </a>
            </li>
            <div className="dropdown-divider" />
            <li className="active">
              <GroupWorkIcon />
              <a
                href="/#"
                data-toggle="collapse"
                aria-expanded="false"
                onClick={this.loadAllGroups}
              >
                My Groups
              </a>
            </li>
            <div>
              <div className="card" style={{ height: '1.5rem', backgroundColor: '#eeeeee' }}>
                <div className="header">
                  <Typography>
                    Groups
                    <a
                      href="/creategroup"
                      className="card-link"
                      style={{ float: 'right', 'font-size': '14px' }}
                    >
                      <GroupAddIcon />
                    </a>
                  </Typography>
                </div>
              </div>
            </div>
            {this.props.groups.length > 0
              ? this.props.groups
                  .filter((r) => r.status === 'active')
                  .map((r, index) => (
                    <li>
                      <div
                        className="card-body"
                        style={{ padding: '0', height: '1rem' }}
                        value={r.grp_name}
                      >
                        <Typography onClick={() => this.handleGroupClick(index)}>
                          {r.image_path !== '' ? (
                            <img
                              src={r.image_path}
                              width="20"
                              height="20"
                              className="img-fluid"
                              alt=""
                            />
                          ) : (
                            <img
                              width="20"
                              height="20"
                              className="img-fluid"
                              alt=""
                              src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
                            />
                          )}
                          &nbsp;
                          {r.grp_name}
                        </Typography>
                      </div>
                      <div className="dropdown-divider" />
                    </li>
                  ))
              : null}
          </ul>
        </div>
      </nav>
    );
  }
}
LeftSideBar.propTypes = {
  getStep: PropTypes.func.isRequired,
  selectedGroup: PropTypes.func.isRequired,
  groups: PropTypes.string.isRequired,
};
const mapStatetoProps = (state) => ({
  user: state.user,
  alert: state.alert,
  groups: state.groups,
});
export default connect(mapStatetoProps)(LeftSideBar);
