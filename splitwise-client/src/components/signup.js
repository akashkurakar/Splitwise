/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Header from '../header';
import * as userActions from '../redux/actions/UserAction';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  // username change handler to update state variable with the text entered by the user
  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  // password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSignUp = async (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signupUser(data);
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { errorMessage } = this.state;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <>
        {' '}
        <Header />
        <Container>
          <Row>
            <Col md={4}>
              <div className="home-logo">
                <img
                  src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
                  width="200"
                  height="200"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </Col>
            <Col md={6}>
              {' '}
              {this.props.alert.message && this.props.alert.message.response !== undefined ? (
                <div className="alert alert-danger" role="alert">
                  {this.props.alert.message.response.data.message}
                </div>
              ) : null}
              <div id="card-body" className="card-body">
                <Typography>
                  <h3 className="card-title text-center">Hi there! Sign me up!</h3>
                  <form className="form-signin" onSubmit={this.handleSignUp}>
                    {errorMessage && <p>User already present! Please sign in</p>}
                    <div className="form-label-group">
                      <Typography>My name is</Typography>
                      <input
                        type="name"
                        onChange={this.nameChangeHandler}
                        id="name"
                        className="form-control"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="form-label-group">
                      <Typography>Heres my email address</Typography>
                      <input
                        type="email"
                        id="email"
                        onChange={this.emailChangeHandler}
                        className="form-control"
                        placeholder="email"
                        required
                      />
                    </div>
                    <Typography>And heres my password</Typography>
                    <input
                      type="password"
                      id="password"
                      onChange={this.passwordChangeHandler}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <div>
                      <button
                        className="nav-link button-green-submit text-uppercase"
                        type="submit"
                        id="location"
                      >
                        Sign me up!
                      </button>
                    </div>
                  </form>
                </Typography>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
SignUp.propTypes = {
  alert: PropTypes.objectOf.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    alert: state.alert,
  };
};
const mapDispatchToProps = {
  signupUser: userActions.signupUser,
};

export default connect(mapStatetoProps, mapDispatchToProps)(SignUp);
