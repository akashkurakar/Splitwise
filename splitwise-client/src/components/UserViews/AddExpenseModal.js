/* eslint-disable arrow-body-style */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { converter } from '../../constants/CommonService';
import * as transactionActions from '../../redux/actions/TransactionAction';
import * as groupsActions from '../../redux/actions/GroupsActions';

class AddExpenseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      user: this.props.user,
      amount: '',
      errorMessage: '',
      successMessage: '',
      group: this.props.group,
    };
  }

  componentDidMount = () => {
    this.setState({ group: this.props.group });
  };

  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
    this.handleClose = this.handleClose.bind(this);
  };

  handleAmount = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  handleClose = () => {
    this.props.show(false);
  };

  handleAddExpenses = async () => {
    axios.defaults.withCredentials = true;
    const data = {
      user: this.state.user._id,
      grpId: this.props.group._id,
      grpName: this.props.group.grp_name,
      description: this.state.description,
      amount: this.state.amount,
    };
    await this.props.addExpense(data);
    if (this.props.alert.message === 'Expenses added successfully!') {
      this.setState({
        show: false,
        successMessage: this.props.alert.message,
      });
      this.props.show(false);
      this.props.getTransaction(this.props.user._id);
    } else {
      this.setState({
        show: true,
        errorMessage: this.props.alert.message,
      });
    }
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
          <Modal.Title style={{ color: 'white' }}>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.errorMessage !== '' && (
            <div className="alert alert-danger" role="alert">
              {this.state.errorMessage}
            </div>
          )}
          {this.state.successMessage !== '' && (
            <div className="alert alert-success" role="alert">
              {this.state.errorMessage}
            </div>
          )}
          <div>
            <Typography>
              With you and:
              <Chip
                avatar={<Avatar src={this.state.group.image_path} />}
                label={this.state.group.grp_name}
                variant="outlined"
              />
            </Typography>
          </div>

          <Dropdown.Divider />
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
                  />
                </div>
                <div className="clearfix">
                  <TextField
                    id="standard-basic"
                    onChange={this.handleAmount}
                    placeholder={converter(this.props.user.default_currency).format(
                      this.state.amount
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
            onClick={this.handleAddExpenses}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddExpenseModal.propTypes = {
  show: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
  group: PropTypes.objectOf.isRequired,
  addExpense: PropTypes.func.isRequired,
  alert: PropTypes.objectOf.isRequired,
  getTransaction: PropTypes.func.isRequired,
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
  addExpense: transactionActions.addExpense,
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddExpenseModal);
