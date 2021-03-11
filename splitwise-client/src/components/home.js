/* eslint-disable react/jsx-filename-extension */
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Typography } from "@material-ui/core";
import Header from "../header";

const Home = () => (
  <div>
    <Header />
    <Row>
      <Col md={2} />
      <Col md={4}>
        <div className="card card-signin my-5">
          <div id="card-body" className="card-body">
            <Typography>
              <div>
                <h2>Less stress when sharing expenses with anyone</h2>
              </div>
              <div>
                <h5>
                  Keep track of your shared expenses and balances with
                  housemates, trips, groups, friends, and family.
                </h5>
              </div>
            </Typography>
            <form className="form-signin">
              <div>
                <a
                  className="btn btn-lg btn-success btn-block text-uppercase"
                  href="/signup"
                >
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </Col>
      <Col md={5}>
        {" "}
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
      <Col md={2} />
    </Row>
    <div maxWidth="xl" id="home">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto" />
      </div>
    </div>
  </div>
);

export default Home;
