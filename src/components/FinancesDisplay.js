import React from 'react';
import { connect } from 'react-redux';
import DollarIcon from 'react-icons/lib/md/attach-money';
import BankIcon from 'react-icons/lib/md/account-balance';
import CreditIcon from 'react-icons/lib/md/credit-card';

export class FinancesDisplay extends React.Component
{

	static get propTypes()
    {
        return {
            cash: React.PropTypes.number.isRequired,
            bank: React.PropTypes.number.isRequired,
            debt: React.PropTypes.number.isRequired
        };
    }

	render()
	{
		return (
			<div className="finances">
                <p className="finances-element flex-hz col-xs-4 flex-space-between padding-large">
                    <span className="icon"><DollarIcon /></span>
                    {"R" + this.props.cash}
                </p>
                <p className="finances-element flex-hz col-xs-4 flex-space-between padding-large">
                    <span className="icon"><BankIcon /></span>
                    {"R" + this.props.bank}
                </p>
                <p className="finances-element flex-hz col-xs-4 flex-space-between padding-large">
                    <span className="icon"><CreditIcon /></span>
                    {"R" + (Math.round(Math.floor(this.props.debt) / 10 ) * 10 )}
                </p>
        	</div>
		)
	}
}

// export the connected class
function mapStateToProps(state){
	const finances = state.main.currentGame.currentFinances; 
    return({
        cash: finances.cash,
        bank: finances.bank,
        debt: finances.debt
    });
}
export default connect(mapStateToProps)(FinancesDisplay);