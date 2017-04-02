import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router";
import { Button } from 'react-bootstrap';

import Header from '../components/Header';
import FinancesDisplay from '../components/FinancesDisplay';
import UserError from '../components/UserError';
import FinancesElement from '../components/FinancesElement';

// Home page component
export class Finances extends React.Component {

  constructor(props) {
    super(props);

    this.payLoanMax = false;

    this.payBank = this.payBank.bind(this);
    this.withdrawBank = this.withdrawBank.bind(this);
    this.payBankAll = this.payBankAll.bind(this);
    this.payLoan = this.payLoan.bind(this);
    this.payLoanAll = this.payLoanAll.bind(this);
    this.makeLoan = this.makeLoan.bind(this);
  }

  static get propTypes() {
    return {
      finances: React.PropTypes.object.isRequired,
      userError: React.PropTypes.bool.isRequired
    };
  }


  componentWillMount() {
    if (this.props.userError) {
      this.props.dispatch({
        type: 'main.resetUserError'
      });
    }
  }

  handleFinances(action, amount, max) {

    // Only dispatch action if we have a value, ie. field has not been left blank and val not 0
    if (amount) {
      if (amount !== 0) {
        if (max) {

          // Only withdraw what we have in the bank
          if (Math.abs(amount) <= this.props.finances.bank) {
            this.props.dispatch({
              type: "main." + action,
              amount: amount,
              withdraw: max
            });
            this.props.dispatch({
              type: 'main.resetUserError'
            });
          }
          else {
            this.props.dispatch({
              type: 'main.userErrorNoFunds'
            });
          }

          // reset form inputs
          [...document.getElementsByTagName("input")].forEach(function (input) {
            input.value = "";
          });
        }
        else {
          this.props.dispatch({
            type: "main." + action,
            amount: amount
          });
          this.props.dispatch({
            type: 'main.resetUserError'
          });

          // reset form inputs
          [...document.getElementsByTagName("input")].forEach(function (input) {
            input.value = "";
          });
        }
      }
    }
  }

  payBank(event, amount) {
    const inputAmount = event ? Number(event.target.previousSibling.value) : amount;
    if (inputAmount > 0) {
      this.handleFinances("payBank", inputAmount);
    }
    else {
      this.props.dispatch({
        type: 'main.userErrorNegative'
      });

      // reset form inputs
      [...document.getElementsByTagName("input")].forEach(function (input) {
        input.value = "";
      });
    }
  }

  withdrawBank(event, amount) {

    const inputAmount = event ? Number(event.target.previousSibling.previousSibling.value) : amount;
    if (inputAmount > 0) {
      this.handleFinances("payBank", inputAmount * -1, true);
    }
    else {
      this.props.dispatch({
        type: 'main.userErrorNegative'
      });

      // reset form inputs
      [...document.getElementsByTagName("input")].forEach(function (input) {
        input.value = "";
      });
    }
  }

  payBankAll() {
    const amount = this.props.finances.cash;
    this.payBank(null, amount);
  }

  payLoan(event, amount) {
    const inputAmount = event ? Number(event.target.previousSibling.value) : amount;
    if (inputAmount > 0) {
      this.handleFinances("payLoan", inputAmount);
    }
    else {
      this.props.dispatch({
        type: 'main.userErrorNegative'
      });

      // reset form inputs
      [...document.getElementsByTagName("input")].forEach(function (input) {
        input.value = "";
      });
    }
  }

  payLoanAll() {
    const amount = this.payLoanMax ? this.props.finances.cash : this.props.finances.debt;
    this.handleFinances("payLoan", amount);
  }

  makeLoan(event) {
    const inputAmount = Number(event.target.previousSibling.value);
    if (inputAmount > 0) {
      this.handleFinances("makeLoan", inputAmount);
    }
    else {
      this.props.dispatch({
        type: 'main.userErrorNegative'
      });

      // reset form inputs
      [...document.getElementsByTagName("input")].forEach(function (input) {
        input.value = "";
      });
    }
  }

  render() {
    this.payLoanMax =
      this.props.finances.cash < this.props.finances.debt
        ?
        true
        :
        false;

    return (
      <div className="page finances-page bg-primary">
        <div className="flex-vt flex-stretch flex-space-between">
          <Header class='headerGame position-relative flex-hz flex-space-between'>
            <p>Finances</p>
          </Header>
          <div className="row">
            <div className="info-container">
              <FinancesDisplay />
              <UserError />
            </div>
          </div>
          <FinancesElement title="Bank" subtitle="Deposit" handleClick={this.payBank} handleWithdraw={this.withdrawBank} handlePayAll={this.payBankAll} />
          <FinancesElement title="Loan Repayment" subtitle="Pay" payLoanMax={this.payLoanMax} handleClick={this.payLoan} handlePayAll={this.payLoanAll} />
          <FinancesElement title="Make Loan" subtitle="Loan" handleClick={this.makeLoan} />
          <Link to="/game" className="page-footer flex-vt-normal flex-center">
            <Button bsSize="sm" bsStyle="primary">
              <p className="text-secondary text-light">Back</p>
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

// export the connected class
function mapStateToProps(state) {
  return {
    finances: state.main.currentGame.currentFinances,
    userError: state.main.status.userError.active
  }
}
export default connect(mapStateToProps)(Finances);