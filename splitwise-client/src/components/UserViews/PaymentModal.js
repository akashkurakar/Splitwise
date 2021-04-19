/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Avatar from '@material-ui/core/Avatar';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { converter } from '../../constants/CommonService';
import * as transactionActions from '../../redux/actions/TransactionAction';

class PaymentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      users: [],
    };
    this.handleAddExpenses = this.handleAddExpenses.bind(this);
  }

  componentDidMount = () => {
    this.getUsers();
  };

  handleClose = () => {
    this.props.show(false);
  };

  getUsers = () => {
    const userData = [];
    this.props.transactions.forEach((element) => {
      const paidUser = this.props.users.filter((user) => user.id === element.paid_by)[0].name;
      const owedUser = this.props.users.filter((user) => user.id === element.owed_name)[0].name;
      if (!userData.includes(owedUser) && element.owed_name !== this.props.user.id) {
        userData.push(owedUser);
      } else if (!userData.includes(paidUser) && element.paid_by !== this.props.user.id) {
        userData.push(paidUser);
      }
    });
    this.setState({
      users: userData,
    });
  };

  handleUser = (e) => {
    this.props.data.user = e;
  };

  handleAddExpenses = (e) => {
    e.preventDefault();
    const data = {
      user1: this.props.user._id,
      user2: this.props.data.user,
    };

    this.props.settleExpense(data).then(() => {
      if (this.props.alert.message === 'Transaction Settled') {
        this.handleClose(false);
      }
    });
    /* axios.defaults.withCredentials = true;
    axios.post(`${constants.baseUrl}/api/transactions/settle`, data).then((response) => {
      if (response.status === 200) {
        if (response.data.message === 'Transaction Settled') {
          this.props.getTransaction(this.props.user.id);
        } else if (response.data === 'Invalid Credentials!') {
          // error
        }
      }
    }); */
  };

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
        <Modal.Header style={{ 'background-color': '#5bc5a7' }} closeButton>
          <Modal.Title style={{ color: 'white' }}>Add Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={4}>
                {' '}
                <Chip
                  avatar={<Avatar>&nbsp;</Avatar>}
                  label={this.props.user.name}
                  variant="outlined"
                />
              </Col>
              <Col md={2}>
                <ArrowForwardIcon />
              </Col>
              <Col md={5}>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  value={
                    this.props.users.filter((user) => user._id === this.props.data.user)[0].name
                  }
                  options={this.state.users.map((option) => option)}
                  onChange={(event, value) => this.handleUser(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      margin="normal"
                      InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                  )}
                />
              </Col>
            </Row>
            <Row>
              {' '}
              <Col md={3} />{' '}
              <Col md={4}>
                <TextField
                  id="standard-basic"
                  value={converter(this.props.user.default_currency).format(
                    this.props.data.amount < 0
                      ? this.props.data.amount * -1
                      : this.props.data.amount
                  )}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            style={{ 'background-color': '#5bc5a7', 'border-color': '#5bc5a7' }}
            onClick={this.handleAddExpenses}
          >
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
PaymentModal.propTypes = {
  show: PropTypes.func.isRequired,
  transactions: PropTypes.objectOf.isRequired,
  data: PropTypes.objectOf.isRequired,
  user: PropTypes.objectOf.isRequired,
  getTransaction: PropTypes.func.isRequired,
  users: PropTypes.objectOf.isRequired,
  settleExpense: PropTypes.func.isRequired,
  alert: PropTypes.string.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    transactions: state.transactions,
    users: state.users,
    alert: state.alert,
  };
};

const mapDispatchToProps = {
  getTransaction: transactionActions.getTransaction,
  settleExpense: transactionActions.settleExpense,
};
export default connect(mapStatetoProps, mapDispatchToProps)(PaymentModal);
