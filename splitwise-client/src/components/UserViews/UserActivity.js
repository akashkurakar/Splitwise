/* eslint-disable react/no-did-update-set-state */
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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import { Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TablePagination from '@material-ui/core/TablePagination';
import { convertDate } from '../../constants/CommonService';
import * as activityActions from '../../redux/actions/ActivitiyAction';

class UserActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: this.props.activities.data,
      selectedGroup: '',
      selectedSort: 'First',
      page: 0,
      rows: 2,
      totalRows: this.props.activities.totalRows,
    };
  }

  componentDidMount = async () => {
    await this.props
      .getRecentActivitiesByUser(this.props.user._id, this.state.page, this.state.rows)
      .then(() => {
        this.setState({
          activities: this.props.activities.data,
          totalRows: this.props.activities.totalRows,
        });
      });
  };

  componentDidUpdate = () => {
    if (JSON.stringify(this.state.activities) !== JSON.stringify(this.props.activities.data)) {
      this.setState({
        activities: this.props.activities.data,
        totalRows: this.props.activities.totalRows,
      });
    }
  };

  handleSelectedGrp = async (e) => {
    this.setState({
      selectedGroup: e.target.value,
    });
    if (e.target.value === 'ALL') {
      await this.props
        .getRecentActivitiesByUser(this.props.user._id, this.state.page, this.state.rows)
        .then(() => {
          this.setState({
            activities: this.props.activities.data,
            totalRows: this.props.activities.totalRows,
          });
        });
    } else {
      this.setState({
        page: 0,
      });
      await this.props
        .getRecentActivitiesByGroup(
          this.props.user._id,
          e.target.value,
          this.state.page,
          this.state.rows
        )
        .then(() => {
          this.setState({
            activities: this.props.activities.data,
            totalRows: this.props.activities.totalRows,
          });
        });
    }
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

  handleChangePage = (e, newpage) => {
    e.preventDefault();
    if (this.selectedGroup === undefined) {
      this.setState({ page: newpage }, async () => {
        await this.props
          .getRecentActivitiesByUser(this.props.user._id, this.state.page, this.state.rows)
          .then(() => {
            this.setState({
              activities: this.props.activities.data,
              totalRows: this.props.activities.totalRows,
            });
          });
      });
    } else {
      this.setState({ page: newpage }, async () => {
        this.getRecentActivitiesByGroup(
          this.props.user._id,
          this.selectedGroup,
          this.state.page,
          this.state.rows
        ).then(() => {
          this.setState({
            activities: this.props.activities.data,
            totalRows: this.props.activities.totalRows,
          });
        });
      });
    }
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rows: parseInt(event.target.value, 10), page: 0 }, async () => {
      if (this.selectedGroup === undefined) {
        await this.props
          .getRecentActivitiesByUser(this.props.user._id, this.state.page, this.state.rows)
          .then(() => {
            if (this.props.alert.message === '')
              this.setState({
                activities: this.props.activities.data,
                totalRows: this.props.activities.totalRows,
              });
          });
      } else {
        await this.props
          .getRecentActivitiesByGroup(
            this.props.user._id,
            this.selectedGroup,
            this.state.page,
            this.state.rows
          )
          .then(() => {
            if (this.props.alert.message === '')
              this.setState({
                activities: this.props.activities.data,
                totalRows: this.props.activities.totalRows,
              });
          });
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
                              <option value={grp._id}>{grp.grp_name}</option>
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
                      secondary={convertDate(trans.createdAt)}
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
        <TablePagination
          component="div"
          count={this.state.totalRows}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          rowsPerPage={this.state.rows}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          rowsPerPageOptions={[2, 5, 10]}
        />
      </>
    );
  }
}
UserActivity.propTypes = {
  user: PropTypes.objectOf.isRequired,
  groups: PropTypes.objectOf.isRequired,
  getRecentActivitiesByUser: PropTypes.func.isRequired,
  getRecentActivitiesByGroup: PropTypes.func.isRequired,
  alert: PropTypes.objectOf.isRequired,
  activities: PropTypes.objectOf.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    groups: state.groups.groups,
    alert: state.alert,
    activities: state.activities,
  };
};
const mapDispatchToProps = {
  getRecentActivitiesByUser: activityActions.getRecentActivitiesByUser,
  getRecentActivitiesByGroup: activityActions.getRecentActivitiesByGroup,
};
export default connect(mapStatetoProps, mapDispatchToProps)(UserActivity);
