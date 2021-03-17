/* eslint-disable arrow-body-style */
import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddExpenseModal from './AddExpenseModal';
import * as userNotifications from '../../redux/actions/NotificationAction';
import * as groupsActions from '../../redux/actions/GroupsActions';
import constants from '../../constants/Constants';

class Notifications extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  handleModal = (modal) => {
    this.setState({ show: modal });
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
    axios.post(`${constants.baseUrl}/api/groups/request`, data).then((response) => {
      if (response.status === 200) {
        this.props.getNotifications(this.props.user);
        this.props.getGroups(this.props.user);
      } else {
        // error
      }
    });
  };

  componentDidMount = () => {
    this.props.getNotifications(this.props.user);
  };

  render() {
    const classes = makeStyles((theme) => ({
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    }));
    return (
      <>
        <Row>
          <div style={{ 'background-color': '#eeeeee', width: '100%' }} className="card">
            <div className="card-body">
              <table style={{ width: '100%' }}>
                <tr>
                  <td style={{ width: '50%' }}>
                    <h2>Notifications</h2>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="row" style={{ width: '100%' }}>
            <List component="nav" className={classes.root} style={{ width: '100%' }}>
              {this.props.notifications !== undefined && this.props.notifications.length > 0 ? (
                this.props.notifications.map((r) => (
                  <ListItem>
                    <ListItemAvatar>
                      <div className="date">
                        <img
                          src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                          width="100"
                          height="100"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </ListItemAvatar>
                    <ListItemText
                      primary={r.grp_name}
                      secondary={r.created_by}
                      style={{ margin: '1rem' }}
                    />
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
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No Notifications!" />
                </ListItem>
              )}
            </List>
          </div>
        </Row>
        {this.state.show && <AddExpenseModal show={this.handleModal} />}
      </>
    );
  }
}
Notifications.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
  notifications: PropTypes.objectOf.isRequired,
};

const mapDispatchToProps = {
  getNotifications: userNotifications.getNotifications,
  getGroups: groupsActions.getGroups,
};
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    notifications: state.notifications.data,
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Notifications);
