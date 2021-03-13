/* eslint-disable no-return-assign */
/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { converter } from '../../constants/commonservice';
import * as transactionActions from '../../redux/actions/TransactionAction';

class RightSideBar extends React.Component {
  constructor() {
    super();
    this.state = { owsSum: '', owedSum: '' };
  }

  componentDidMount() {
    let owsSum = 0;
    let owedSum = 0;
    this.props.transactions
      .filter((tran) => tran.paid_by === this.props.user.name && tran.status === 'PENDING')
      .map((r) => (owsSum += r.bill_amt - r.amount));
    this.props.transactions
      .filter((tran) => tran.owed_name === this.props.user.name && tran.status === 'PENDING')
      .map((r) => (owedSum += r.bill_amt - r.amount));
    this.setState({ owsSum, owedSum });
  }

  render() {
    return (
      <nav>
        <div className="sidebar-header">
          <ul className="list-unstyled components">
            <h6 style={{ color: 'green' }}> YOUR TOTAL BALANCE</h6>
            <li className="active">
              <h6 style={{ color: 'gree' }}> You Owe</h6>
              <h3 style={{ color: 'green' }}>
                {converter(this.props.user.default_currency).format(this.state.owsSum)}
              </h3>
            </li>
            <li className="active">
              <h6 style={{ color: 'red' }}> You are Owed</h6>
              <h3 style={{ color: 'red' }}>
                {' '}
                {converter(this.props.user.default_currency).format(this.state.owedSum)}
              </h3>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
RightSideBar.propTypes = {
  user: PropTypes.objectOf.isRequired,
  transactions: PropTypes.objectOf.isRequired,
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

export default connect(mapStatetoProps, mapDispatchToProps)(RightSideBar);
