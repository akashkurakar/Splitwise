/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import Header from '../header';
import * as userActions from '../redux/actions/UserAction';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    if (this.props.user.name !== undefined) {
      window.location.href = './dashboard';
    }
  }

  componentWillUnmount() {}

  emailChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      email: e.target.value,
    });
  };

  passwordChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(data);
  };

  render() {
    const classes = makeStyles((theme) => ({
      margin: {
        margin: theme.spacing(1),
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
    }));

    return (
      <>
        <Header />
        <Container>
          <Row>
            <Col md={3} />
            <Col md={3}>
              <img
                src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
                width="200"
                height="200"
                className="img-fluid"
                alt=""
              />
            </Col>
            <Col md={3}>
              <h5 className="card-title text-center" style={{ 'font-size': '16px', color: '#999' }}>
                WELCOME TO SPLITWISE
              </h5>
              <form className="form-signin" onSubmit={this.handleLogin}>
                {this.props.alert.message && this.props.alert.message.response !== undefined ? (
                  <div className="alert alert-danger" role="alert">
                    {this.props.alert.message.response.data.message}
                  </div>
                ) : null}

                <div className="clearfix">
                  <Typography>Email Address</Typography>
                  <input
                    type="email"
                    id="email"
                    onChange={this.emailChangeHandler}
                    className="form-control"
                    placeholder="email"
                    required
                  />
                </div>
                <div className="clearfix">
                  <Typography>Password</Typography>
                  <input
                    type="password"
                    id="password"
                    onChange={this.passwordChangeHandler}
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="clearfix">
                  <Button
                    size="medium"
                    className={classes.margin}
                    type="submit"
                    style={{
                      float: 'left',
                      'background-color': '#ff652f',
                      color: 'white',
                      width: '90px',
                      'font-size': '18px',
                      margin: '10px 0px 0px 0px',
                    }}
                  >
                    Login
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

Login.propTypes = {
  alert: PropTypes.objectOf.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    alert: state.alert,
  };
};
const mapDispatchToProps = {
  loginUser: userActions.loginUser,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Login);
