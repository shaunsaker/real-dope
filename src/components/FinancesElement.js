import React from 'react';
import { Link } from 'react-router';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

export default class FinancesElement extends React.Component {

	static get propTypes() {
		return {
			title: React.PropTypes.string.isRequired,
			subtitle: React.PropTypes.string.isRequired,
			handleClick: React.PropTypes.func.isRequired,
			handlePayAll: React.PropTypes.func
		};
	}

	render() {
		return (
			<div className="section-group flex-1 flex-vt-normal flex-center row">
				<p className="text-center text-dark section-header">{this.props.title}</p>
				<FormGroup className="flex-hz">
					<FormControl type="text" placeholder="..." />
					<Button bsStyle="default" bsSize="small" onClick={this.props.handleClick}>
						<p className="text-secondary text-dark">{this.props.subtitle}</p>
					</Button>
					{
						this.props.handleWithdraw ? 
							<Button bsStyle="default" bsSize="small" onClick={this.props.handleWithdraw}>
								<p className="text-secondary text-dark">Withdraw</p>
							</Button>
							:
							<div></div>
					}
					{
						this.props.handlePayAll ?
							<Button bsStyle="primary" bsSize="small" onClick={this.props.handlePayAll}>
								<p className="text-secondary text-light">{ this.props.payLoanMax ? 'Max' : 'All'}</p>
							</Button>
							:
							<div></div>
					}
				</FormGroup>
			</div>
		)
	}
}