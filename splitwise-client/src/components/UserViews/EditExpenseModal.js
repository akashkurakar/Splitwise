/* eslint-disable arrow-body-style */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { converter } from '../../constants/CommonService';
import * as transactionActions from '../../redux/actions/TransactionAction';
import * as groupsActions from '../../redux/actions/GroupsActions';

class EditExpenseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.showEditExpense,
      description: this.props.transaction.tran_name,
      amount: this.props.transaction.bill_amt,
      errorMessage: '',
    };
  }

  componentDidMount = () => {};

  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
    this.handleClose = this.handleClose.bind(this);
  };

  handleAmount = (e) => {
    this.setState({
      amount: e.target.value.substr(1),
    });
  };

  handleClose = () => {
    this.props.showEditExpense(false);
  };

  handleEditExpenses = async () => {
    axios.defaults.withCredentials = true;
    const data = {
      transaction_id: this.props.transaction.transaction_id,
      bill_amt: this.state.amount,
      tran_name: this.state.description,
    };
    await this.props.editExpense(data, this.props.selectedGroup).then(() => {
      if (this.props.alert.message === 'Transaction Updated') {
        this.setState({
          show: false,
        });
        this.props.showEditExpense(false);
      }
    });
    /* await axios.post(`${constants.baseUrl}/api/transactions/update`, data).then((response) => {
      if (response.status === 200) {
        if (response.data.message === 'Expenses added successfully!') {
          this.setState({
            show: false,
          });
          this.props.getGroups(this.props.user._id);
          this.handleClose();
        } else {
          this.setState({
            show: true,
            errorMessage: response.data.message,
          });
        }
      }
    }); */
  };

  render() {
    return (
      <Modal
        data-testid="add-expense"
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ 'background-color': '#5bc5a7' }} closeButton>
          <Modal.Title style={{ color: 'white' }}>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.errorMessage !== '' && (
            <div className="alert alert-danger" role="alert">
              {this.state.errorMessage}
            </div>
          )}

          <Container>
            <Row>
              <Col md={3}>
                <img
                  src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                  width="100"
                  height="100"
                  className="img-fluid"
                  alt=""
                />
              </Col>
              <Col md={8}>
                <div className="clearfix">
                  <TextField
                    id="standard-basic"
                    placeholder="Enter Description"
                    onChange={this.handleDescription}
                    value={this.props.transaction.tran_name}
                  />
                </div>
                <div className="clearfix">
                  <TextField
                    id="standard-basic"
                    onChange={this.handleAmount}
                    placeholder=""
                    defaultValue={converter(this.props.user.default_currency).format(
                      this.props.transaction.bill_amt
                    )}
                  />
                </div>
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
            onClick={this.handleEditExpenses}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditExpenseModal.propTypes = {
  showEditExpense: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
  transaction: PropTypes.objectOf.isRequired,
  alert: PropTypes.string.isRequired,
  editExpense: PropTypes.func.isRequired,
  selectedGroup: PropTypes.string.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    transactions: state.transactions,
    alert: state.alert,
  };
};

const mapDispatchToProps = {
  getTransaction: transactionActions.getTransaction,
  getGroups: groupsActions.getGroups,
  editExpense: transactionActions.editExpense,
};

export default connect(mapStatetoProps, mapDispatchToProps)(EditExpenseModal);
