/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LeftSideBar from './LeftSidebar';
import Activity from '../UserViews/UserActivity';
import UserDashboard from '../UserViews/UserDashboard';
import CreateGroup from '../UserViews/CreateGroup';
import UserGroups from '../UserViews/UserGroups';
import SelectGroup from '../UserViews/SelectGroup';
import UserHeader from './UserHeader';
import Notification from '../UserViews/Notifications';
import * as userActions from '../../redux/actions/UserAction';
import * as transactionAction from '../../redux/actions/TransactionAction';
import * as groupsActions from '../../redux/actions/GroupsActions';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      selectedGroup: '',
      transactions: [],
      balances: [],
    };
    this.props.getGroups(this.props.user.id);
    this.handleCallback = this.handleCallback.bind(this);
    if (this.props.user.name === undefined) {
      window.location.href = './login';
    }
  }

  componentDidMount() {
    this.props.getTransaction(this.props.user.id);
  }

  handleCallback = (childData) => {
    this.setState({ step: childData });
  };

  handleSelectedGroup = (selectedGroup) => {
    this.setState({ step: 6 });
    this.setState({ selectedGroup });
  };

  render() {
    return (
      <>
        <UserHeader />
        <div>
          <Container>
            <Row>
              <Col style={{ 'background-color': '#ffffff' }} md={3}>
                <LeftSideBar
                  getStep={this.handleCallback}
                  selectedGroup={this.handleSelectedGroup}
                />
              </Col>
              <Col md={9}>
                {this.state.step === 1 ? <UserDashboard balances={this.state.balances} /> : null}
                {this.state.step === 2 ? <Activity transactions={this.state.transactions} /> : null}
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
          </Container>
        </div>
      </>
    );
  }
}
MainContent.propTypes = {
  getGroups: PropTypes.func.isRequired,
  getTransaction: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    groups: state.groups,
  };
};
const mapDispatchToProps = {
  loginUser: userActions.loginUser,
  getGroups: groupsActions.getGroups,
  getTransaction: transactionAction.getTransaction,
};

export default connect(mapStatetoProps, mapDispatchToProps)(MainContent);
