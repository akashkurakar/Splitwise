/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable arrow-body-style */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import { Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { convertDate } from '../../constants/CommonService';
import constants from '../../constants/Constants';

class UserActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: {},
      selectedGroup: '',
      selectedSort: 'First',
    };
  }

  componentDidMount() {
    this.getRecentActivitiesByUser();
  }

  handleSelectedGrp = (e) => {
    const grpid = this.props.groups.filter((grp) => grp.grp_name === e.target.value)[0].grp_id;
    this.setState({
      selectedGroup: e.target.value,
    });
    this.getRecentActivitiesByGroup(grpid);
  };

  handleSelectedSort = (e) => {
    this.setState({
      selectedSort: e.target.value,
    });
    if (this.state.activities.length > 0) {
      const reverseData = this.state.activities.reverse();
      this.setState({ activities: reverseData });
    }
  };

  getRecentActivitiesByUser = () => {
    const userId = this.props.user.id;
    axios.defaults.withCredentials = true;
    axios.get(`${constants.baseUrl}/api/activities?user=${userId}`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        this.setState({
          activities: data,
        });
      } else {
        // error
      }
    });
  };

  getRecentActivitiesByGroup = (groupId) => {
    axios.defaults.withCredentials = true;
    axios
      .get(
        `${constants.baseUrl}/api/activities/group/?userid=${this.props.user.id}&&groupid=${groupId}`
      )
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          this.setState({
            activities: data,
          });
        } else {
          // error
        }
      });
  };

  getRecentActivitiesLastByUser = () => {
    const userId = this.props.user.id;
    axios.defaults.withCredentials = true;
    axios.get(`${constants.baseUrl}/api/activities/?user=${userId}`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        this.setState({
          activities: data,
        });
      } else {
        // error
      }
    });
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
          <Col md={12}>
            <div style={{ 'background-color': '#eeeeee', width: '100%' }} className="card">
              <div className="card-body">
                <table style={{ width: '100%' }}>
                  <tr>
                    <td style={{ width: '33%' }}>
                      <Typography>Recent Activity</Typography>
                    </td>
                    <td style={{ width: '33%' }}>
                      <FormControl className={classes.margin}>
                        <InputLabel htmlFor="demo-customized-select-native">Filter</InputLabel>
                        <NativeSelect
                          id="demo-customized-select-native"
                          value={this.state.selectedGroup}
                          onChange={this.handleSelectedGrp}
                        >
                          <option aria-label="None" value="ALL">
                            All
                          </option>
                          {this.props.groups
                            .filter((entry) => entry.status === 'active')
                            .map((grp) => (
                              <option value={grp.grp_name}>{grp.grp_name}</option>
                            ))}
                        </NativeSelect>
                      </FormControl>
                    </td>
                    <td>
                      <FormControl className={classes.margin}>
                        <InputLabel htmlFor="demo-customized-select-native">Sort</InputLabel>
                        <NativeSelect
                          id="demo-customized-select-native"
                          value={this.state.selectedSort}
                          onChange={this.handleSelectedSort}
                        >
                          <option value="First">Most recent First</option>
                          <option value="Last">Most recent Last</option>
                        </NativeSelect>
                      </FormControl>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <List dense className={classes.root}>
              {this.state.activities.length > 0 ? (
                this.state.activities.map((trans) => (
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${1}`}
                        src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                      />
                    </ListItemAvatar>

                    <ListItemText
                      id="item1"
                      primary={trans.description}
                      secondary={convertDate(trans.created_on)}
                    />

                    <ListItemSecondaryAction />
                  </ListItem>
                ))
              ) : (
                <ListItem button>
                  <ListItemText
                    id="item1"
                    clasName="header-label"
                    primary="No Activitites at this moment"
                  />
                  <ListItemSecondaryAction />
                </ListItem>
              )}
            </List>
          </Col>
        </Row>
      </>
    );
  }
}
UserActivity.propTypes = {
  user: PropTypes.objectOf.isRequired,
  groups: PropTypes.objectOf.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    groups: state.groups,
  };
};
export default connect(mapStatetoProps)(UserActivity);
