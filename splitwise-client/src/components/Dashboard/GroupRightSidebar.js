/* eslint-disable no-return-assign */
/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import { converter } from '../../constants/commonservice';

class GroupRightSideBar extends React.Component {
  constructor() {
    super();
    this.state = { userSummary: [] };
  }

  componentDidMount() {
    this.getBalances();
  }

  getBalances = () => {
    axios.defaults.withCredentials = true;
    const data = { grp_id: this.props.data };
    axios.post(`http://localhost:3001/api/transactions/groupbalances/`, data).then((response) => {
      if (response.status === 200) {
        const res = response.data;
        this.setState({
          userSummary: res,
        });
      } else {
        // error
      }
    });
  };

  render() {
    return (
      <Row>
        <Col md={12}>
          <List dense>
            <Typography className="header-label">GROUP BALANCES</Typography>
            {this.state.userSummary.length && this.props.refresh === true > 0 ? (
              this.state.userSummary.map(
                (trans) =>
                  trans.total !== 0 && (
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${1}`}
                          src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                        />
                      </ListItemAvatar>

                      <ListItemText
                        id="item1"
                        primary={this.props.users
                          .filter((us) => us.id === trans.user)
                          .map((r1) => {
                            return r1.name;
                          })}
                        secondary={
                          trans.total > 0 ? (
                            <Typography style={{ color: 'green' }}>
                              gets back{' '}
                              {converter(this.props.user.default_currency).format(trans.total)}
                            </Typography>
                          ) : (
                            <Typography style={{ color: 'red' }}>
                              owes{' '}
                              {converter(this.props.user.default_currency).format(0 - trans.total)}
                            </Typography>
                          )
                        }
                      />

                      <ListItemSecondaryAction />
                    </ListItem>
                  )
              )
            ) : (
              <ListItem button>
                <ListItemText id="item1" primary="No Transactions" />
                <ListItemSecondaryAction />
              </ListItem>
            )}
          </List>
        </Col>
      </Row>
    );
  }
}
GroupRightSideBar.propTypes = {
  data: PropTypes.string.isRequired,
  user: PropTypes.objectOf.isRequired,
  users: PropTypes.objectOf.isRequired,
  refresh: PropTypes.bool.isRequired,
};
const mapStatetoProps = (state) => ({
  user: state.user,
  transactions: state.transactions,
  users: state.users,
  // dashboard:state.dashboard
});
const mapDispatchToProps = {};
// Export The Main Component

export default connect(mapStatetoProps, mapDispatchToProps)(GroupRightSideBar);
