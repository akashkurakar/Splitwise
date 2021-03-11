/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable arrow-body-style */
import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Col from "react-bootstrap/Col";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import PaymentModal from "./PaymentModal";
import photo from "../../static/images/avatar/person.png";
import converter from "../../constants/currency";
import * as transactionActions from "../../redux/actions/TransactionAction";

class DashboardMiddle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useStyles: makeStyles((theme) => ({
        root: {
          "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
          },
          "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
          },
          width: "100%",
          maxWidth: "36ch",
          backgroundColor: theme.palette.background.paper,
          inline: {
            display: "inline",
          },
        },
      })),
      balances: [],
      show: false,
      oweData: [],
      owedData: [],
      modalData: {
        user: "",
        amount: "",
      },
    };
  }

  componentDidMount = () => {
    this.getBalances();
    this.getTotalTransactionByUser();
  };

  handleModal = (e) => {
    if (this.state.oweData.length > 0) {
      this.setState({
        modalData: {
          user: this.state.oweData[0].owed_name,
          amount: this.state.oweData[0].total_amt,
        },
      });
      this.setState({ show: e });
    } else if (this.state.owedData.length > 0) {
      this.setState({
        modalData: {
          user: this.state.owedData[0].paid_by,
          amount: this.state.owedData[0].total_amt,
        },
      });
      this.setState({ show: e });
    } else {
      this.setState({ show: false });
    }
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  getBalances = () => {
    const userId = this.props.user.name;
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:3001/api/balances/?user=${userId}`)
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          this.setState({
            balances: data,
          });
        } else {
          // error
        }
      });
  };

  getTotalTransactionByUser = () => {
    const userId = this.props.user.name;
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:3001/api/transactions/data/?user=${userId}`)
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          this.setState({
            oweData: data.oweData,
            owedData: data.owedData,
          });
        } else {
          // error
        }
      });
  };

  render() {
    const classes = this.state.useStyles;
    return (
      <>
        <Row>
          <Card
            style={{ "background-color": "#eeeeee", width: "100%" }}
            className="card"
          >
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h2>Dashboard</h2>
                </Col>
                <Col md={4} />
                <Col md={4}>
                  <Button
                    style={{
                      "background-color": "#5bc5a7",
                      "border-color": "#5bc5a7",
                    }}
                    type="submit"
                    id="location"
                    onClick={this.handleModal}
                  >
                    Settle Up
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <medium className="text-muted">Total Balance</medium>
                  <h6 style={{ color: "green" }}>
                    {converter(this.props.user.default_currency).format(
                      this.state.balances.balance
                    )}
                  </h6>
                </Col>

                <Col md={4}>
                  <medium className="text-muted">You Owe</medium>
                  <h6 style={{ color: "red" }}>
                    {converter(this.props.user.default_currency).format(
                      this.state.balances.paidAmount
                    )}
                  </h6>
                </Col>
                <Col md={4}>
                  <medium className="text-muted">You are Owed</medium>
                  <h6 style={{ color: "green" }}>
                    {converter(this.props.user.default_currency).format(
                      this.state.balances.owedAmount
                    )}
                  </h6>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <Col style={{ "background-color": "#ffffff" }} md={6}>
            <large
              className="text-muted header-label"
              color="textSecondary"
              display="block"
              variant="caption"
            >
              You owe
            </large>
            <List dense className={classes.root}>
              {this.state.owedData.length > 0 ? (
                this.state.owedData.map((trans) => (
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar alt={`Avatar n°${1}`} src={photo} />
                    </ListItemAvatar>
                    <ListItemText
                      id="item1"
                      primary={trans.paid_by}
                      secondary={
                        this.props.transactions.length > 0
                          ? this.props.transactions
                              .filter(
                                (d) =>
                                  d.owed_name === trans.owed_name &&
                                  d.status === "PENDING"
                              )
                              .map((trans2) => (
                                <div>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    className="header-label"
                                  >
                                    You owe{" "}
                                    {converter(
                                      this.props.user.default_currency
                                    ).format(trans2.amount)}{" "}
                                    for {trans2.grp_name}
                                  </Typography>
                                </div>
                              ))
                          : null
                      }
                    />
                    <Divider light />
                    <ListItemSecondaryAction>
                      <Typography>You owe {trans.grp_name}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    id="item1"
                    className="header-label"
                    primary="You do not owe anything!"
                  />

                  <ListItemSecondaryAction />
                </ListItem>
              )}
            </List>
          </Col>
          <Divider orientation="vertical" flexItem />
          <Col style={{ "background-color": "#ffffff" }} md={5.5}>
            <large className="text-muted header-label">You are owed</large>
            <List dense className={classes.root}>
              {this.state.oweData.length > 0 ? (
                this.state.oweData.map((trans) => (
                  <ListItem alignItems="flex-start" button>
                    <ListItemAvatar>
                      <Avatar alt={`Avatar n°${1}`} src={photo} />
                    </ListItemAvatar>
                    <ListItemText
                      id="item1"
                      primary={trans.owed_name}
                      secondary={
                        this.props.transactions.length > 0
                          ? this.props.transactions
                              .filter(
                                (d) =>
                                  d.owed_name === trans.owed_name &&
                                  d.status === "PENDING"
                              )
                              .map((trans1) => (
                                <div>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    className="header-label"
                                  >
                                    Owes you{" "}
                                    {converter(
                                      this.props.user.default_currency
                                    ).format(trans1.amount)}{" "}
                                    for '{trans1.grp_name}'
                                  </Typography>
                                </div>
                              ))
                          : null
                      }
                    />

                    <Divider />
                    <ListItemSecondaryAction />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    id="item1"
                    className="header-label"
                    primary="You did not owe anything!"
                  />
                  <ListItemSecondaryAction />
                </ListItem>
              )}
            </List>
          </Col>
        </Row>
        {this.state.show && (
          <PaymentModal show={this.handleModal} data={this.state.modalData} />
        )}
      </>
    );
  }
}
DashboardMiddle.propTypes = {
  user: PropTypes.objectOf.isRequired,
  transactions: PropTypes.objectOf.isRequired,
};
const mapStatetoProps = (state) => {
  return {
    user: state.user,
    transactions: state.transactions,
    // dashboard:state.dashboard
  };
};
const mapDispatchToProps = {
  getTransaction: transactionActions.getTransaction,
};
// Export The Main Component
export default connect(mapStatetoProps, mapDispatchToProps)(DashboardMiddle);
