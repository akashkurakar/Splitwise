/* eslint-disable arrow-body-style */
import React from 'react';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as userActions from './redux/actions/UserAction';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.Component {
  constructor() {
    super();
    this.state = { isLogout: true };
  }

  handleLogout = () => {
    this.props.logoutUser(this.props.user);
    this.props.user = [];
    this.setState({ isLogout: true });
    this.forceUpdate();
  };

  render() {
    return (
      <header style={{ 'max-height': '50px', 'background-color': '#5bc5a7' }}>
        <Container>
          <nav className="navbar" style={{ 'max-height': '50px', 'align-content': 'center' }}>
            <a className="navbar-brand" href="/">
              <img
                src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
                width="150"
                height="150"
                className="d-inline-block align-top"
                alt=""
              />
            </a>
            {this.state.isLogout ? (
              <form className="form-inline my-2 my-lg-0">
                <div>
                  <a size="medium" href="/login" className="nav-link btn-green" type="button">
                    Login
                  </a>
                </div>
                <div style={{ padding: '10px' }}>
                  <Typography>
                    <h4>or</h4>{' '}
                  </Typography>
                </div>
                <div>
                  <a size="medium" href="/signup" className="nav-link btn-orange" type="submit">
                    Sign Up
                  </a>
                </div>
              </form>
            ) : null}
          </nav>
        </Container>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.objectOf.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  user: state.user,
  alert: state.alert,
});

const mapDispatchToProps = {
  logoutUser: userActions.logoutUser,
};
export default connect(mapStatetoProps, mapDispatchToProps)(Header);
