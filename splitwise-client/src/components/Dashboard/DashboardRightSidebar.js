/* eslint-disable no-return-assign */
/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { converter } from '../../constants/commonservice';
import * as transactionActions from '../../redux/actions/TransactionAction';

class DashboardRightSideBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <nav>
        <div className="sidebar-header">
          <ul className="list-unstyled components">
            <h6 className="header-label"> YOUR TOTAL BALANCE</h6>
            <li className="active">
              <Typography style={{ color: 'gree' }}> You Owe</Typography>
              <Typography style={{ color: 'green' }}>
                {converter(this.props.user.default_currency).format(this.props.data.paidAmount)}
              </Typography>
            </li>
            <li className="active">
              <Typography style={{ color: 'red' }}> You are Owed</Typography>
              <Typography style={{ color: 'red' }}>
                {' '}
                {converter(this.props.user.default_currency).format(this.props.data.owedAmount)}
              </Typography>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
DashboardRightSideBar.propTypes = {
  user: PropTypes.objectOf.isRequired,
  data: PropTypes.objectOf.isRequired,
};
const mapStatetoProps = (state) => ({
  user: state.user,
  transactions: state.transactions,
  // dashboard:state.dashboard
});
const mapDispatchToProps = {
  getTransaction: transactionActions.getTransaction,
};
// Export The Main Component

export default connect(mapStatetoProps, mapDispatchToProps)(DashboardRightSideBar);
