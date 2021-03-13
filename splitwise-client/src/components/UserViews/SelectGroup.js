/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';
import Row from 'react-bootstrap/Row';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Col from 'react-bootstrap/Col';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import AddExpenseModal from './AddExpenseModal';
import { converter, convertDate } from '../../constants/commonservice';

class SelectGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      transactions: '',
      errorMessage: '',
    };
  }

  componentDidMount = () => {
    this.getTransaction();
  };

  imageUpload = (e) => {
    const file = e.target.files[0];
    return getBase64(file);
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  handleModal = (modal) => {
    this.setState({ show: modal });
    this.getTransaction();
  };

  handleLeaveGroup = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    const data = {
      user: this.props.user.name,
      group: this.props.selectedGroup,
    };
    axios.post(`http://localhost:3001/api/group/leave`, data).then((response) => {
      if (response.status === 200) {
        const res = response.data;
        if (res.message === 'Group Left Successfully') {
          window.location.href = './dashboard';
        } else if (res.message === 'You cant leave group without clearing dues.') {
          this.setState({
            errorMessage: 'You cant leave group without clearing dues.',
          });
        }
      } else {
        // error
      }
    });
  };

  /* getUser = () => {
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:3001/api/users/`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        this.setState({
          users: data,
        });
      } else {
        // error
      }
    });
  }; */

  getTransaction = () => {
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:3001/api/transactions/?id=${this.props.selectedGroup}`)
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          this.setState({
            transactions: data,
          });
        } else {
          // error
        }
      });
  };

  render() {
    const classes = makeStyles((theme) => ({
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    }));

    return (
      <>
        <Row>
          <div style={{ 'background-color': '#eeeeee', width: '100%' }} className="card">
            <div className="card-body">
              <Row>
                <Col md={2}>
                  <img
                    src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
                    width="80"
                    height="80"
                    className="img-fluid"
                    alt=""
                  />
                  <div>
                    <Fab
                      color="secondary"
                      size="small"
                      component="span"
                      aria-label="add"
                      variant="extended"
                      type="file"
                    >
                      {' '}
                      <AddIcon size="small" />
                    </Fab>
                  </div>
                </Col>
                <Col md={2}>
                  <h2>{this.props.selectedGroup}</h2>
                </Col>
                <Col md={2.5}>
                  <Button
                    variant="primary"
                    className="btn btn-2 btn-success pull-right text-uppercase"
                    style={{
                      'background-color': '#ff652f',
                      'border-color': '#5bc5a7',
                    }}
                    onClick={this.handleLeaveGroup}
                  >
                    Leave Group
                  </Button>
                </Col>
                <Col md={2.5}>
                  <Button
                    variant="primary"
                    style={{
                      'background-color': '#ff652f',
                      'border-color': '#5bc5a7',
                    }}
                    className="btn btn-2 btn-success pull-right text-uppercase"
                    type="submit"
                    id="location"
                    onClick={this.handleModal}
                  >
                    Add Expenses
                  </Button>
                </Col>

                <Col md={2.5}>
                  <Button
                    variant="primary"
                    style={{
                      'background-color': '#5bc5a7',
                      'border-color': '#5bc5a7',
                    }}
                  >
                    SETTLE UP
                  </Button>
                </Col>
              </Row>
            </div>
          </div>

          <Col md={12}>
            {this.state.errorMessage !== '' ? (
              <div className="alert alert-danger" role="alert">
                {this.state.errorMessage}
              </div>
            ) : null}
            <List component="nav" className={classes.root} style={{ width: '100%' }}>
              {this.state.transactions.length > 0 ? (
                this.state.transactions.map((r) => (
                  <ListItem style={{ width: '100%' }} button>
                    <Col md={1.5}>
                      <ListItemAvatar>
                        <div className="date">
                          <img
                            src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                            width="100"
                            height="100"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                      </ListItemAvatar>
                    </Col>
                    <Col md={6}>
                      <ListItemText
                        primary={r.tran_name}
                        secondary={
                          <Typography className="header-label">
                            {convertDate(r.created_on)}
                          </Typography>
                        }
                      />
                    </Col>
                    <Col md={3} style={{ 'text-align': 'end' }}>
                      {r.status === 'PENDING' && (
                        <ListItemText
                          primary=""
                          secondary={
                            r.paid_by === this.props.user.name ? (
                              <Typography
                                style={{
                                  'text-transform': 'uppercase',
                                  color: '#5bc5a7',
                                }}
                              >
                                you paid{' '}
                                {converter(this.props.user.default_currency).format(r.bill_amt)}
                              </Typography>
                            ) : (
                              <Typography
                                style={{
                                  'text-transform': 'uppercase',
                                  color: '#ff652f',
                                }}
                              >
                                {r.paid_by} paid{' '}
                                {converter(this.props.user.default_currency).format(r.bill_amt)}{' '}
                              </Typography>
                            )
                          }
                        />
                      )}
                    </Col>
                    <Col md={3}>
                      <ListItemText
                        primary=""
                        secondary={
                          r.paid_by === this.props.user.name ? (
                            <Typography className="header-label">
                              you will get back{' '}
                              {converter(this.props.user.default_currency).format(
                                r.bill_amt - r.amount
                              )}
                            </Typography>
                          ) : (
                            <Typography className="header-label">
                              you lent {r.paid_by} &nbsp;
                              {converter(this.props.user.default_currency).format(r.amount)}
                            </Typography>
                          )
                        }
                      />
                    </Col>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No transactions!" />
                </ListItem>
              )}
            </List>
          </Col>
        </Row>
        {this.state.show && (
          <AddExpenseModal show={this.handleModal} grp_name={this.props.selectedGroup} />
        )}
      </>
    );
  }
}
SelectGroup.propTypes = {
  user: PropTypes.objectOf.isRequired,
  selectedGroup: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    alert: state.alert,
    transactions: state.transactions,
  };
};
export default connect(mapStatetoProps)(SelectGroup);
