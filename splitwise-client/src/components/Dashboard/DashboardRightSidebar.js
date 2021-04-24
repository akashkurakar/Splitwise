/* eslint-disable no-return-assign */
/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { converter } from '../../constants/CommonService';
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
                {this.props.data.paidAmount
                  ? converter(this.props.user.default_currency).format(
                      parseFloat(this.props.data.paidAmount)
                    )
                  : converter(this.props.user.default_currency).format(parseFloat(0))}
              </Typography>
            </li>
            <li className="active">
              <Typography style={{ color: 'red' }}> You are Owed</Typography>
              <Typography style={{ color: 'red' }}>
                {' '}
                {this.props.data.owedAmount
                  ? converter(this.props.user.default_currency).format(
                      parseFloat(this.props.data.owedAmount)
                    )
                  : converter(this.props.user.default_currency).format(parseFloat(0))}
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
});
const mapDispatchToProps = {
  getTransaction: transactionActions.getTransaction,
};

export default connect(mapStatetoProps, mapDispatchToProps)(DashboardRightSideBar);
