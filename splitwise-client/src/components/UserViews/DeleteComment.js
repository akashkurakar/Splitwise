/* eslint-disable arrow-body-style */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import * as commentActions from '../../redux/actions/CommentAction';

class AddExpenseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
    };
  }

  handleClose = () => {
    this.props.show(false);
  };

  removeComments = async () => {
    await this.props.removeComments(this.props.transaction, this.props.index);
    this.props.show(false);
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
          <Modal.Title style={{ color: 'white' }}>Delete Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown.Divider />
          <Container>
            <Row>
              <Typography>Are you sure you want to delete this comment?</Typography>
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
            onClick={this.removeComments}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddExpenseModal.propTypes = {
  show: PropTypes.func.isRequired,
  removeComments: PropTypes.func.isRequired,
  transaction: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    transactions: state.transactions,
    alert: state.alert,
  };
};

const mapDispatchToProps = {
  removeComments: commentActions.removeComments,
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddExpenseModal);
