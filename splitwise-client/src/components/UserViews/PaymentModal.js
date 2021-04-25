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
      user: this.props.users.filter((user) => user._id === this.props.data[0].user)[0].name,
      amount: this.props.data[0].amount,
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
    this.props.data.forEach((element) => {
      userData.push(this.props.users.filter((usr) => usr._id === element.user)[0].name);
    });
    this.setState({
      users: userData,
    });
  };

  handleUser = (e) => {
    const payeeId = this.props.users.filter((usr) => usr.name === e)[0]._id;
    const payeeName = this.props.users.filter((usr) => usr.name === e)[0].name;

    this.setState({
      user: payeeName,
      amount: this.props.data.filter((usr) => usr.user === payeeId)[0].amount,
    });
  };

  handleAddExpenses = async (e) => {
    e.preventDefault();
    const data = {
      user1: this.props.user._id,
      user2: this.props.users.filter((usr) => usr.name === this.state.user)[0]._id,
    };
    this.handleClose(false);
    await this.props.settleExpense(data);

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
                  value={this.state.user}
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
                    Math.abs(this.state.amount)
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
