/* eslint-disable react/no-did-update-set-state */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Divider from '@material-ui/core/Divider';
import Container from 'react-bootstrap/Container';
import CommentBox from './CommentBox';
import AddExpenseModal from './AddExpenseModal';
import EditExpenseModal from './EditExpenseModal';
import { converter, convertDate } from '../../constants/CommonService';
import EditGroupModal from './EditGroupModal';
import * as groupsActions from '../../redux/actions/GroupsActions';
import * as transactionsActions from '../../redux/actions/TransactionAction';

class SelectGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      errorMessage: '',
      showEdit: false,
      showEditExpense: false,
      transaction: [],
      selectedGroup: '',
      panel: '',
      transactions: '',
      // showAddModal: false,
      // comments: '',
    };
  }

  componentDidMount = () => {
    this.props.getBalances(this.props.selectedGroup._id);
    this.props.getGroupTransaction(this.props.selectedGroup._id);
    this.setState({
      selectedGroup: this.props.selectedGroup,
      transactions: this.props.transactions,
    });
  };

  componentDidUpdate() {
    if (JSON.stringify(this.props.transactions) !== JSON.stringify(this.state.transactions)) {
      this.setState({ transactions: this.props.transactions });
    }
  }

  nameFieldChangeHandler = (e) => {
    e.preventDefault();
    document.getElementById('name').disabled = !document.getElementById('name').disabled;
  };

  handleModal = () => {
    this.setState({ show: !this.state.show });
    this.props.getGroupTransaction(this.props.selectedGroup._id);
    this.props.getBalances(this.props.selectedGroup._id);
  };

  handleEditModal = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const modal = !this.state.showEdit;
    this.setState({ showEdit: modal });
    // this.getTransaction();
  };

  handleEditExpenseModal = (index) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const modal = !this.state.showEditExpense;
    this.setState({
      showEditExpense: modal,
      transaction: index.trans,
    });
  };

  handleChange = (r) => () => {
    // const expanded = !this.state.expanded;
    this.setState({
      panel: r,
    });
    // this.getComments(tranId);
  };

  render() {
    return (
      <>
        <Row>
          <Col md={8}>
            <Row>
              <div style={{ 'background-color': '#eeeeee', width: '100%' }} className="card">
                <div className="card-body">
                  <Row>
                    <Col md={2}>
                      <form onSubmit={this.onFileUpload} encType="multipart/form-data">
                        {this.state.selectedGroup.image_path !== '' ? (
                          <Avatar
                            src={this.props.selectedGroup.image_path}
                            className="img-fluid"
                            alt={
                              this.props.groups.filter(
                                (grp) => grp.grp_name === this.props.selectedGroup
                              ).image_path
                            }
                            onChange={this.onFileChange}
                          />
                        ) : (
                          <Avatar
                            width="100"
                            height="100"
                            className="img-fluid"
                            alt=""
                            src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
                          />
                        )}
                      </form>
                    </Col>
                    <Col md={3}>
                      <div className="form-label-group">
                        <Typography data-testid="header" onChange={this.loadBalances}>
                          {this.props.selectedGroup.grp_name}
                        </Typography>
                      </div>
                    </Col>

                    <Col md={4}>
                      <Button
                        variant="primary"
                        style={{
                          'background-color': '#ff652f',
                          'border-color': '#5bc5a7',
                        }}
                        className="btn btn-2 btn-success pull-right text-uppercase"
                        type="submit"
                        id="location"
                        onClick={this.handleModal}
                      >
                        Add Expenses
                      </Button>
                    </Col>
                    <Col md={3}>
                      <Button
                        style={{
                          'background-color': '#5bc5a7',
                          'border-color': '#5bc5a7',
                        }}
                        type="submit"
                        id="location"
                        onClick={this.handleEditModal}
                        data-testid="edit group"
                      >
                        Edit Group
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <Row>
                <Col md={12}>
                  {this.state.errorMessage !== '' ? (
                    <div className="alert alert-danger" role="alert">
                      {this.state.errorMessage}
                    </div>
                  ) : null}
                  {this.state.transactions.length > 0 ? (
                    this.state.transactions.map((r) => (
                      <Accordion
                        expanded={this.state.panel === r.trans.transaction_id}
                        id={r.trans.transaction_id}
                        onChange={this.handleChange(r.trans.transaction_id)}
                      >
                        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                          <Col md={1.5}>
                            <Avatar src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png" />
                          </Col>
                          <Col md={5}>
                            <Typography>{r.trans.tran_name}</Typography>
                            <Typography className="header-label">
                              {' '}
                              {convertDate(r.trans.createdAt)}
                            </Typography>
                          </Col>
                          <Col md={3} style={{ 'text-align': 'end' }}>
                            {' '}
                            {r.trans.status === 'PENDING' &&
                              (r.trans.paid_by === this.props.user._id ? (
                                <Typography
                                  style={{
                                    color: '#5bc5a7',
                                  }}
                                >
                                  You paid{' '}
                                  {converter(this.props.user.default_currency).format(
                                    r.trans.bill_amt
                                  )}
                                </Typography>
                              ) : (
                                <Typography
                                  style={{
                                    color: '#ff652f',
                                  }}
                                >
                                  {this.props.users
                                    .filter((us) => us._id === r.trans.paid_by)
                                    .map((r1) => {
                                      return r1.name;
                                    })}{' '}
                                  paid{' '}
                                  {converter(this.props.user.default_currency).format(
                                    r.trans.bill_amt
                                  )}{' '}
                                </Typography>
                              ))}
                          </Col>
                          <Col md={4}>
                            {r.trans.paid_by === this.props.user._id ? (
                              <Typography className="header-label">
                                You will get back{' '}
                                {converter(this.props.user.default_currency).format(
                                  r.trans.bill_amt - r.trans.amount
                                )}
                              </Typography>
                            ) : (
                              <Typography className="header-label">
                                you owe{' '}
                                {this.props.users
                                  .filter((us) => us._id === r.trans.paid_by)
                                  .map((r1) => {
                                    return r1.name;
                                  })}{' '}
                                &nbsp;
                                {converter(this.props.user.default_currency).format(r.trans.amount)}
                              </Typography>
                            )}
                          </Col>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Container>
                            <Row>
                              <Col md={1.5}>
                                <Avatar src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png" />
                              </Col>
                              <Col md={7}>
                                <Typography>{r.trans.tran_name}</Typography>
                                <Typography>
                                  {' '}
                                  {converter(this.props.user.default_currency).format(
                                    r.trans.bill_amt
                                  )}
                                </Typography>
                                <Typography
                                  className="header-label"
                                  styles={{ 'font-size': '12px' }}
                                >
                                  Added by{' '}
                                  {this.props.users
                                    .filter((us) => us._id === r.trans.paid_by)
                                    .map((r1) => {
                                      return r1.name;
                                    })}{' '}
                                  on {convertDate(r.trans.createdAt)}
                                </Typography>
                                <Button
                                  variant="primary"
                                  style={{
                                    'background-color': '#ff652f',
                                    'border-color': '#5bc5a7',
                                  }}
                                  className="btn btn-2 btn-success pull-right text-uppercase"
                                  type="submit"
                                  id="location"
                                  onClick={() => this.handleEditExpenseModal(r)}
                                >
                                  Edit Expense
                                </Button>
                              </Col>
                            </Row>
                            <Divider />
                            <Row>
                              {this.state.panel === r.trans.transaction_id && (
                                <CommentBox
                                  transaction={r.trans.transaction_id}
                                  group={this.props.selectedGroup._id}
                                />
                              )}
                            </Row>
                          </Container>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  ) : (
                    <Typography className="header-label">NO Transactions</Typography>
                  )}
                </Col>
              </Row>
            </Row>
          </Col>
          <Col md={4}>
            <List dense>
              <Typography className="header-label">GROUP BALANCES</Typography>
              {this.props.balances.length > 0 ? (
                this.props.balances.map(
                  (trans) =>
                    trans.total !== 0 && (
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar
                            alt={`Avatar n°${trans.user}`}
                            src={this.props.users
                              .filter((us) => us._id === trans.user)
                              .map((r1) => {
                                return r1.image_path;
                              })}
                          />
                        </ListItemAvatar>

                        <ListItemText
                          id="item1"
                          primary={this.props.users
                            .filter((us) => us._id === trans.user)
                            .map((r1) => {
                              return r1.name;
                            })}
                          secondary={
                            trans.total > 0 ? (
                              <Typography style={{ color: 'red' }}>
                                owes{' '}
                                {converter(this.props.user.default_currency).format(trans.total)}
                              </Typography>
                            ) : (
                              <Typography style={{ color: 'green' }}>
                                gets back{' '}
                                {converter(this.props.user.default_currency).format(
                                  0 - trans.total
                                )}
                              </Typography>
                            )
                          }
                        />

                        <ListItemSecondaryAction />
                      </ListItem>
                    )
                )
              ) : (
                <ListItem button>
                  <ListItemText id="item1" primary="No Transactions" />
                  <ListItemSecondaryAction />
                </ListItem>
              )}
            </List>
          </Col>
        </Row>
        {this.state.show && (
          <AddExpenseModal show={this.handleModal} group={this.props.selectedGroup} />
        )}
        {this.state.showEdit && (
          <EditGroupModal showEdit={this.handleEditModal} group={this.props.selectedGroup} />
        )}
        {this.state.showEditExpense && (
          <EditExpenseModal
            showEditExpense={this.handleEditExpenseModal}
            transaction={this.state.transaction}
          />
        )}
      </>
    );
  }
}
SelectGroup.propTypes = {
  user: PropTypes.objectOf.isRequired,
  selectedGroup: PropTypes.func.isRequired,
  getBalances: PropTypes.func.isRequired,
  getGroupTransaction: PropTypes.func.isRequired,
  groups: PropTypes.objectOf.isRequired,
  balances: PropTypes.objectOf.isRequired,
  users: PropTypes.func.isRequired,
  transactions: PropTypes.objectOf.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    alert: state.alert,
    groups: state.groups.groups,
    transactions: state.transactions.group,
    users: state.users,
    balances: state.groups.balances,
  };
};
const mapDispatchToProps = {
  getGroups: groupsActions.getGroups,
  getBalances: transactionsActions.getBalances,
  getGroupTransaction: transactionsActions.getGroupTransaction,
};
export default connect(mapStatetoProps, mapDispatchToProps)(SelectGroup);
