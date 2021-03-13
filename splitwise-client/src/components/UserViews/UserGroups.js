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
import ImageIcon from '@material-ui/icons/Image';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SelectGroup from './SelectGroup';
import * as userNotifications from '../../redux/actions/NotificationAction';
import * as groupsActions from '../../redux/actions/GroupsActions';

class UserGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      groups: [],
      selectedGroup: '',
      redirect: null,
    };
  }

  componentDidMount() {
    this.setState({
      groups: this.props.groups,
    });
  }

  handleLeaveGroup = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    const data = {
      user: this.props.user.name,
      group: this.props.selectedGroup,
    };
    axios.post(`http://localhost:3001/api/group/leave`, data).then((response) => {
      if (response.status === 200) {
        const res = response.data;
        if (res === 'Success') {
          // window.location.href = './dashboard';
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

  approveRequest = (grpId) => {
    axios.defaults.withCredentials = true;
    const data = {
      user: this.props.user.name,
      grp_id: grpId,
    };
    axios.post(`http://localhost:3001/api/groups/request`, data).then((response) => {
      if (response.status === 200) {
        this.props.getNotifications(this.props.user.name);
        this.props.getGroups(this.props.user.name);
      } else {
        // error
      }
    });
  };

  handleSelectedGroup = (e) => {
    this.props.selectedGroup(e);
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
                    <h2>My Groups</h2>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <Row>
          <Col md={12}>
            {' '}
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={this.state.groups.map((option) => option.grp_name)}
              onChange={(event, value) => this.handleSelectedGroup(value)}
              renderInput={(params) => (
                <TextField {...params} label="Search Group" margin="normal" />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <List dense className={classes.root}>
              {this.props.groups.filter((r) => r.status !== 'left').length > 0 ? (
                this.props.groups
                  .filter((r) => r.status !== 'left')
                  .map((r) => (
                    <ListItem
                      button
                      onClick={() => r.status === 'active' && this.handleSelectedGroup(r.grp_name)}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={r.grp_name} secondary={r.created_by} />
                      {r.status === 'PENDING' ? (
                        <Button
                          variant="primary"
                          style={{
                            'background-color': '#5bc5a7',
                            'border-color': '#5bc5a7',
                          }}
                          value={r.grp_name}
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
                          onClick={this.handleLeaveGroup}
                        >
                          Leave Group
                        </Button>
                      )}
                    </ListItem>
                  ))
              ) : (
                <ListItem>
                  <ListItemText primary="No groups available" className="header-label" />
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
  notifications: PropTypes.objectOf.isRequired,
};
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    alert: state.alert,
    groups: state.groups,
  };
};

const mapDispatchToProps = {
  getNotifications: userNotifications.getNotifications,
  getGroups: groupsActions.getGroups,
};
export default connect(mapStatetoProps, mapDispatchToProps)(UserGroups);
