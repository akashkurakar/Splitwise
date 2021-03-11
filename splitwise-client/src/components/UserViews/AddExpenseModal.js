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
import converter from '../../constants/currency';

class AddExpenseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      user: this.props.user,
      amount: '',
    };
  }

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
      user: this.state.user.name,
      grpName: this.props.grp_name,
      description: this.state.description,
      amount: this.state.amount,
    };
    axios.post(`http://localhost:3001/api/transactions`, data).then((response) => {
      if (response.status === 200) {
        this.setState({
          show: false,
        });
      } else {
        this.setState({
          show: true,
        });
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
          <div>
            <Typography>
              With you and:
              <Chip
                avatar={<Avatar>&nbsp;</Avatar>}
                label={this.props.grp_name}
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
  grp_name: PropTypes.string.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStatetoProps)(AddExpenseModal);
