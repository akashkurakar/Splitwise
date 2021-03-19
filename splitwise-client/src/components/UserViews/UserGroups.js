/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import SelectGroup from './SelectGroup';
import * as userNotifications from '../../redux/actions/NotificationAction';
import * as groupsActions from '../../redux/actions/GroupsActions';
import constants from '../../constants/Constants';

class UserGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      selectedGroup: '',
      redirect: null,
      groups: this.props.groups,
      errorMessage: '',
    };
  }

  componentDidMount() {}

  handleLeaveGroup = async (grpid) => {
    axios.defaults.withCredentials = true;
    const data = {
      user: this.props.user.id,
      group: grpid,
    };
    await axios.post(`${constants.baseUrl}/api/group/leave`, data).then((response) => {
      if (response.status === 200) {
        const res = response.data;
        if (res.message === 'Group Left Successfully') {
          this.props.getNotifications(this.props.user.id);
          this.props.getGroups(this.props.user.id);
        } else {
          this.setState({
            errorMessage: res.message,
          });
        }
      } else {
        // error
      }
    });
  };

  handleApprove = (e) => {
    e.preventDefault();
    this.approveRequest(e.target.value);
  };

  approveRequest = async (grpId) => {
    axios.defaults.withCredentials = true;
    const data = {
      user: this.props.user.id,
      grp_id: grpId,
    };
    await axios.post(`${constants.baseUrl}/api/groups/request`, data).then((response) => {
      if (response.status === 200) {
        this.props.getNotifications(this.props.user.id);
        this.props.getGroups(this.props.user.id);
      } else {
        // error
      }
    });
  };

  handleSelectedGroup = (e) => {
    this.props.selectedGroup(e);
  };

  handleSearchGroup = (e) => {
    if (e.target.value !== '') {
      const searchedGroups = this.props.groups.filter((grp) =>
        grp.grp_name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      this.setState({ groups: searchedGroups });
    } else {
      this.setState({ groups: this.props.groups });
    }

    // this.props.selectedGroup(e);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const classes = makeStyles((theme) => ({
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    }));
    return (
      <>
        <div className="row">
          <div style={{ 'background-color': '#eeeeee', width: '100%' }} className="card">
            <div className="card-body">
              <table style={{ width: '100%' }}>
                <tr>
                  <td style={{ width: '50%' }}>
                    <h2 data-testid="header">My Groups</h2>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <Row>
          <Col md={12}>
            {this.state.errorMessage !== '' && (
              <div className="alert alert-danger" role="alert">
                {this.state.errorMessage}
              </div>
            )}{' '}
            <TextField
              data-testid="seach-box"
              label="Search Group"
              margin="normal"
              placeholder="Search Group"
              onChange={(event) => this.handleSearchGroup(event)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <List dense className={classes.root}>
              {this.state.groups.filter((r) => r.status !== 'left').length > 0 ? (
                this.state.groups
                  .filter((r) => r.status !== 'left')
                  .map((r) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          {r.image_path !== '' ? (
                            <img src={r.image_path} className="img-fluid" alt="" />
                          ) : (
                            <img
                              src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
                              className="img-fluid"
                              alt=""
                            />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        data-testid="grp_name"
                        primary={<Typography>{r.grp_name}</Typography>}
                        secondary={
                          <Typography className="header-label">
                            Created by:
                            {
                              this.props.users.filter(
                                (user) => user.id === parseInt(r.created_by, 10)
                              )[0].name
                            }
                          </Typography>
                        }
                        onClick={() => r.status === 'active' && this.handleSelectedGroup(r)}
                      />
                      {r.status === 'PENDING' ? (
                        <Button
                          variant="primary"
                          style={{
                            'background-color': '#5bc5a7',
                            'border-color': '#5bc5a7',
                          }}
                          value={r.grp_id}
                          onClick={this.handleApprove}
                        >
                          Accept
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          style={{
                            'background-color': '#ff652f',
                            'border-color': '#5bc5a7',
                          }}
                          onClick={() => this.handleLeaveGroup(r.grp_id)}
                        >
                          Leave Group
                        </Button>
                      )}
                    </ListItem>
                  ))
              ) : (
                <ListItem>
                  <ListItemText
                    data-testid="default-message"
                    primary="No groups available"
                    className="header-label"
                  />
                </ListItem>
              )}
            </List>
          </Col>
        </Row>
        {this.state.navigate && <SelectGroup grp_name={this.state.selectedGroup} />}
      </>
    );
  }
}
UserGroups.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  groups: PropTypes.objectOf.isRequired,
  selectedGroup: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  users: PropTypes.objectOf.isRequired,
};
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    alert: state.alert,
    groups: state.groups,
    users: state.users,
  };
};

const mapDispatchToProps = {
  getNotifications: userNotifications.getNotifications,
  getGroups: groupsActions.getGroups,
};
export default connect(mapStatetoProps, mapDispatchToProps)(UserGroups);
