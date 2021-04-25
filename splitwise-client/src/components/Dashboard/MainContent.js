/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import LeftSideBar from './LeftSidebar';
import Activity from '../UserViews/UserActivity';
import UserDashboard from '../UserViews/UserDashboard';
import CreateGroup from '../UserViews/CreateGroup';
import UserGroups from '../UserViews/UserGroups';
import SelectGroup from '../UserViews/SelectGroup';
import Notification from '../UserViews/Notifications';
import * as userActions from '../../redux/actions/UserAction';
import * as transactionAction from '../../redux/actions/TransactionAction';
import * as groupsActions from '../../redux/actions/GroupsActions';
import UserProfile from '../UserViews/UserProfile';
import constants from '../../constants/Constants';
import UserHeader from './UserHeader';
import * as activityAction from '../../redux/actions/ActivitiyAction';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      selectedGroup: '',
      transactions: [],
      balances: [],
    };
    this.handleCallback = this.handleCallback.bind(this);
    if (localStorage.getItem('token') === null) {
      window.location.href = './login';
    }
  }

  componentDidMount = async () => {
    // this.props.getUser(localStorage.getItem('user_id'));
    this.props.getTransaction(this.props.user._id);
    this.props.getGroups(this.props.user._id);
    this.getBalances(this.props.user._id);
    this.props.getRecentActivitiesByUser(this.props.user._id, 0, 2);

    // this.props.getRecentActivitiesByUser(this.props.user._id, this.state.page, this.state.rows);
  };

  handleCallback = (childData) => {
    this.setState({ step: childData });
  };

  handleSelectedGroup = (selectedGroup) => {
    this.setState({ step: 6 });
    this.setState({ selectedGroup });
    this.props.getGroupTransaction(selectedGroup._id);
    this.props.getBalances(selectedGroup._id);
  };

  getBalances = () => {
    const userId = this.props.user._id;
    axios.defaults.withCredentials = true;
    axios.get(`${constants.baseUrl}/api/balances/?user=${userId}`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        this.setState({
          balances: data,
        });
      } else {
        // error
      }
    });
  };

  render() {
    return (
      <>
        <UserHeader />
        <div>
          <Container>
            {this.state.step !== 8 && this.state.step !== 9 ? (
              <Row>
                <Col style={{ 'background-color': '#ffffff' }} md={3}>
                  <LeftSideBar
                    getStep={this.handleCallback}
                    selectedGroup={this.handleSelectedGroup}
                  />
                </Col>
                <Col md={9}>
                  {this.state.step === 1 ? <UserDashboard balances={this.state.balances} /> : null}
                  {this.state.step === 2 ? (
                    <Activity transactions={this.state.transactions} />
                  ) : null}
                  {this.state.step === 4 ? <CreateGroup /> : null}
                  {this.state.step === 5 ? (
                    <UserGroups selectedGroup={this.handleSelectedGroup} />
                  ) : null}
                  {this.state.step === 6 ? (
                    <SelectGroup selectedGroup={this.state.selectedGroup} />
                  ) : null}
                  {this.state.step === 7 && <Notification />}
                </Col>
              </Row>
            ) : (
              <Row>
                <Col md={12}>
                  {this.state.step === 8 && <UserProfile />}
                  {this.state.step === 9 && <CreateGroup />}
                </Col>
              </Row>
            )}
          </Container>
        </div>
      </>
    );
  }
}
MainContent.propTypes = {
  getGroups: PropTypes.func.isRequired,
  getGroupTransaction: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
  getTransaction: PropTypes.func.isRequired,
  getBalances: PropTypes.func.isRequired,
  getRecentActivitiesByUser: PropTypes.func.isRequired,
  // getUser: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    groups: state.groups.groups,
  };
};
const mapDispatchToProps = {
  loginUser: userActions.loginUser,
  // getUser: userActions.getUser,
  getGroups: groupsActions.getGroups,
  getGroupTransaction: transactionAction.getGroupTransaction,
  getTransaction: transactionAction.getGroupTransaction,
  getBalances: transactionAction.getBalances,
  getUserBalances: transactionAction.getUserBalances,
  getRecentActivitiesByUser: activityAction.getRecentActivitiesByUser,
};

export default connect(mapStatetoProps, mapDispatchToProps)(MainContent);
