/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Avatar from "@material-ui/core/Avatar";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import TextField from "@material-ui/core/TextField";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import converter from "../../constants/currency";

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
      if (
        !userData.includes(element.owed_name) &&
        element.name !== this.props.user.name
      ) {
        userData.push(element.name);
      } else if (
        !userData.includes(element.paid_by) &&
        element.name !== this.props.user.name
      ) {
        userData.push(element.name);
      }
    });
  };

  handleUser = (e) => {
    e.preventDefault();
  };

  handleAddExpenses = (e) => {
    e.preventDefault();
    const data = {
      user1: this.props.user.name,
      user2: this.props.data.user,
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3001/api/transactions/settle", data)
      .then((response) => {
        if (response.status === 200) {
          if (response.data === "Successful Login") {
            this.props.getTransactions();
            this.props.show(false);
          } else if (response.data === "Invalid Credentials!") {
            // error
          }
        }
      });
  };

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ "background-color": "#5bc5a7" }} closeButton>
          <Modal.Title style={{ color: "white" }}>Add Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={4}>
                {" "}
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
                  value={this.props.data.user}
                  options={this.state.users.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      margin="normal"
                      InputProps={{ ...params.InputProps, type: "search" }}
                    />
                  )}
                />
              </Col>
            </Row>
            <Row>
              {" "}
              <Col md={3} />{" "}
              <Col md={4}>
                <TextField
                  id="standard-basic"
                  value={converter(this.props.user.default_currency).format(
                    this.props.data.amount
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
            style={{ "background-color": "#5bc5a7", "border-color": "#5bc5a7" }}
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
  getTransactions: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    transactions: state.transactions,
  };
};
export default connect(mapStatetoProps)(PaymentModal);
