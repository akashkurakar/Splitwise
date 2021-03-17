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
import { converter } from '../../constants/commonservice';
import * as transactionActions from '../../redux/actions/TransactionAction';

class AddExpenseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      user: this.props.user,
      amount: '',
      errorMessage: '',
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

  handleAddExpenses = () => {
    axios.defaults.withCredentials = true;
    const data = {
      user: this.state.user.id,
      grpId: this.props.group.grp_id,
      grpName: this.props.group.grp_name,
      description: this.state.description,
      amount: this.state.amount,
    };
    axios.post(`http://localhost:3001/api/transactions`, data).then((response) => {
      if (response.status === 200) {
        if (response.data.message === 'Expenses added successfully!') {
          this.setState({
            show: false,
          });
          this.props.getTransaction(this.props.user.id);
          this.handleClose();
        } else {
          this.setState({
            show: true,
            errorMessage: response.data.message,
          });
        }
      }
    });
  };

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
        <Modal.Header style={{ 'background-color': '#5bc5a7' }} closeButton>
          <Modal.Title style={{ color: 'white' }}>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.errorMessage !== '' && (
            <div className="alert alert-danger" role="alert">
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
  getTransaction: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    transactions: state.transactions,
  };
};

const mapDispatchToProps = {
  getTransaction: transactionActions.getTransaction,
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddExpenseModal);
