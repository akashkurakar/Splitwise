import React from "react";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.Component {
  render() {
    return (
      <header style={{ "max-height": "50px", "background-color": "#5bc5a7" }}>
        <Container>
          <nav
            className="navbar"
            style={{ "max-height": "50px", "align-content": "center" }}
          >
            <a className="navbar-brand" href="/">
              <img
                src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
                width="150"
                height="150"
                className="d-inline-block align-top"
                alt=""
              />
            </a>
            {this.props.user === undefined ? (
              <form className="form-inline my-2 my-lg-0">
                <div>
                  <a
                    size="medium"
                    href="/login"
                    className="nav-link btn-green"
                    type="button"
                  >
                    Login
                  </a>
                </div>
                <div style={{ padding: "10px" }}>
                  <Typography>
                    <h4>or</h4>{" "}
                  </Typography>
                </div>
                <div>
                  <a
                    size="medium"
                    href="/signup"
                    className="nav-link btn-orange"
                    type="submit"
                  >
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
};
export default Header;
