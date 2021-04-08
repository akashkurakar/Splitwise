/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable arrow-body-style */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Col from 'react-bootstrap/Col';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import PaymentModal from './PaymentModal';
import { converter } from '../../constants/CommonService';
import * as transactionActions from '../../redux/actions/TransactionAction';
import RightSideBar from '../Dashboard/DashboardRightSidebar';
import * as userListAction from '../../redux/actions/UsersListAction';
import * as userActions from '../../redux/actions/UserAction';
import constants from '../../constants/Constants';

class DashboardMiddle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balances: [],
      show: false,
      owedList: [],
      oweList: [],
      modalData: {
        user: '',
        amount: '',
      },
    };
  }

  componentDidMount = () => {
    this.getBalances(this.props.user._id);
    this.props.getUsers(this.props.user._id);
    this.getTotalTransactionByUser();
    this.props.getUser(this.props.user._id);
  };

  handleModal = (e) => {
    if (this.state.owedList.length > 0) {
      if (this.state.oweList.length > 0) {
        const amt = this.state.oweList.filter(
          (data) => data.owed_name === this.state.owedList[0].paid_by
        )[0].total_amt;
        this.setState({
          modalData: {
            user: this.state.owedList[0].paid_by,
            amount: parseFloat(amt - this.state.owedList[0].total_amt),
          },
        });
        this.setState({ show: e });
      } else {
        this.setState({
          modalData: {
            user: this.state.owedList[0].paid_by,
            amount: parseFloat(this.state.owedList[0].total_amt),
          },
        });
      }
      this.setState({ show: e });
    } else if (this.state.oweList.length > 0) {
      if (this.state.owedList.length > 0) {
        const amt = this.state.owedList.filter(
          (data) => data.paid_by === this.state.oweList[0].owed_name
        )[0].total_amt;
        this.setState({
          modalData: {
            user: this.state.oweList[0].owed_name,
            amount: this.state.oweList[0].total_amt + amt,
          },
        });
        this.setState({ show: e });
      } else {
        this.setState({
          modalData: {
            user: this.state.oweList[0].owed_name,
            amount: this.state.oweList[0].total_amt,
          },
        });
        this.setState({ show: e });
      }
    } else {
      this.setState({ show: false });
    }
    this.getTotalTransactionByUser();
    this.getBalances(this.props.user._id);
    this.props.getTransaction(this.props.user._id);
  };

  handleClose = () => {
    this.setState({ show: false });
    this.getBalances(this.props.user._id);
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

  getTotalTransactionByUser = () => {
    const userId = this.props.user._id;
    axios.defaults.withCredentials = true;
    axios.get(`${constants.baseUrl}/api/transactions/data/?user=${userId}`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        this.setState({
          owedList: data.owedList,
          oweList: data.oweList,
        });

        // let oweTotal = 0;
        // this.state.oweList.forEach((element) => {
        //  oweTotal += element.total_amt;
        // });
        // let owedTotal = 0;
        // this.state.owedList.forEach((element) => {
        //  owedTotal += element.total_amt;
        // });
        // this.setState({
        // oweTotal,
        // owedTotal,
        // });
      } else {
        // error
      }
    });
  };

  render() {
    return (
      <>
        <Row>
          <Col md={12}>
            <Row>
              <Col md={9}>
                <Row>
                  <Card style={{ 'background-color': '#eeeeee', width: '100%' }} className="card">
                    <Card.Body>
                      <Row>
                        <Col md={4}>
                          <h2 data-testid="header">Dashboard</h2>
                        </Col>
                        <Col md={4} />
                        <Col md={4}>
                          <Button
                            style={{
                              'background-color': '#5bc5a7',
                              'border-color': '#5bc5a7',
                            }}
                            type="submit"
                            id="location"
                            onClick={this.handleModal}
                          >
                            Settle Up
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <medium className="text-muted">Total Balance</medium>
                          <h6 style={{ color: 'green' }} data-testid="balance">
                            {converter(this.props.user.default_currency).format(
                              parseFloat(this.state.balances.balance)
                            )}
                          </h6>
                        </Col>

                        <Col md={4}>
                          <medium className="text-muted">You Owe</medium>
                          <h6 style={{ color: 'red' }} data-testid="paidAmount">
                            {converter(this.props.user.default_currency).format(
                              this.state.balances.paidAmount
                            )}
                          </h6>
                        </Col>
                        <Col md={4}>
                          <medium className="text-muted">You are Owed</medium>
                          <h6 style={{ color: 'green' }} data-testid="owedAmount">
                            {converter(this.props.user.default_currency).format(
                              this.state.balances.owedAmount
                            )}
                          </h6>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Row>
                <Row>
                  <Col style={{ 'background-color': '#ffffff' }} md={5}>
                    <large
                      className="text-muted header-label"
                      color="textSecondary"
                      display="block"
                      variant="caption"
                    >
                      You owe
                    </large>
                    <List dense>
                      {this.state.oweList.length > 0 ? (
                        this.state.oweList.map((trans) => (
                          <ListItem button>
                            <ListItemAvatar>
                              <Avatar
                                alt={`Avatar n°${trans.user}`}
                                src={this.props.users
                                  .filter((us) => us._id === trans.paid_by)
                                  .map((r1) => {
                                    return r1.image_path;
                                  })}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              id="item1"
                              primary={this.props.users
                                .filter((us) => us._id === trans.owed_name)
                                .map((r) => {
                                  return r.name;
                                })}
                              secondary={
                                <ul>
                                  <Typography>
                                    Owe you&nbsp;
                                    {converter(this.props.user.default_currency).format(
                                      parseFloat(trans.total_amt)
                                    )}
                                  </Typography>
                                  {this.state.oweList.length > 0
                                    ? this.state.oweList
                                        .filter((grp) => grp.paid_by === trans.paid_by)
                                        .map((trans1) => (
                                          <li>
                                            <div>
                                              <Typography
                                                component="span"
                                                variant="body2"
                                                className="header-label"
                                              >
                                                You owe&nbsp;
                                                {converter(this.props.user.default_currency).format(
                                                  trans1.total_amt
                                                )}
                                                &nbsp; for '{' '}
                                                {
                                                  this.props.groups.filter(
                                                    (grp) => grp._id === trans1.grp_id
                                                  )[0].grp_name
                                                }
                                                '
                                              </Typography>
                                            </div>
                                          </li>
                                        ))
                                    : null}
                                </ul>
                              }
                            />
                            <Divider light />
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText
                            id="item1"
                            className="header-label"
                            primary="You do not owe anything!"
                          />

                          <ListItemSecondaryAction />
                        </ListItem>
                      )}
                    </List>
                  </Col>

                  <Divider orientation="vertical" flexItem />

                  <Col style={{ 'background-color': '#ffffff' }} md={5}>
                    <large className="text-muted header-label">You are owed</large>
                    <List dense>
                      {this.state.owedList.length > 0 ? (
                        this.state.owedList.map((user) => (
                          <ListItem alignItems="flex-start" button>
                            <ListItemAvatar>
                              <Avatar
                                alt={`Avatar n°${user.user}`}
                                src={this.props.users
                                  .filter((us) => us._id === user.paid_by)
                                  .map((r1) => {
                                    return r1.image_path;
                                  })}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              id="item1"
                              primary={this.props.users
                                .filter((us) => us._id === user.paid_by)
                                .map((r) => {
                                  return r.name;
                                })}
                              secondary={
                                <ul>
                                  <Typography>
                                    Owes you&nbsp;
                                    {converter(this.props.user.default_currency).format(
                                      user.total_amt
                                    )}
                                  </Typography>
                                  {this.state.owedList.length > 0
                                    ? this.state.owedList
                                        .filter((grp) => grp.owed_name === user.owed_name)
                                        .map((trans1) => (
                                          <li>
                                            <div>
                                              <Typography
                                                component="span"
                                                variant="body2"
                                                className="header-label"
                                              >
                                                Owes you &nbsp;
                                                {converter(this.props.user.default_currency).format(
                                                  trans1.total_amt
                                                )}
                                                &nbsp; for '
                                                {
                                                  this.props.groups.filter(
                                                    (grp) => grp._id === trans1.grp_id
                                                  )[0].grp_name
                                                }
                                                '
                                              </Typography>
                                            </div>
                                          </li>
                                        ))
                                    : null}
                                </ul>
                              }
                            />

                            <Divider />
                            <ListItemSecondaryAction />
                          </ListItem>
                        ))
                      ) : (
                        <ListItem>
                          <ListItemText
                            id="item1"
                            className="header-label"
                            primary="You did not owe anything!"
                          />
                          <ListItemSecondaryAction />
                        </ListItem>
                      )}
                    </List>
                  </Col>
                </Row>
              </Col>
              <Col md={3}>
                <RightSideBar data={this.state.balances} screen="dashboard" />
              </Col>
            </Row>
            {this.state.show && (
              <PaymentModal show={this.handleModal} data={this.state.modalData} />
            )}
          </Col>
        </Row>
      </>
    );
  }
}
DashboardMiddle.propTypes = {
  user: PropTypes.objectOf.isRequired,
  getTransaction: PropTypes.func.isRequired,
  users: PropTypes.objectOf.isRequired,
  getUsers: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  groups: PropTypes.objectOf.isRequired,
};
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    transactions: state.transactions,
    groups: state.groups.groups,
    users: state.users,
    // dashboard:state.dashboard
  };
};
const mapDispatchToProps = {
  getTransaction: transactionActions.getTransaction,
  getUsers: userListAction.getUsers,
  getUser: userActions.getUser,
};
// Export The Main Component
export default connect(mapStatetoProps, mapDispatchToProps)(DashboardMiddle);
