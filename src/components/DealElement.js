import React from 'react';
import { Link } from 'react-router';
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

export default class DealElement extends React.Component {

	static get propTypes() {
		return {
			title: React.PropTypes.string.isRequired,
			handleClick: React.PropTypes.func.isRequired,
			handleBuyMax: React.PropTypes.func
		};
	}

	render() {
		return (
			<div className="dealElement flex-3">
				<FormGroup className="flex-hz flex-space-between">
					<FormControl type="text" placeholder="..." />
					<Button bsStyle="default"
						onClick={this.props.handleClick}
						data-action={this.props.drug.action}
						data-name={this.props.drug.name}
						data-id={this.props.drug.index}
					>
						<p className="text-secondary text-dark">{this.props.title}</p>
					</Button>
					{
						this.props.handleBuyMax || this.props.handleSellMax ?

							<Button bsStyle="primary"
								onClick={this.props.handleBuyMax || this.props.handleSellMax}
								data-action={this.props.drug.action}
								data-name={this.props.drug.name}
								data-id={this.props.drug.index}
							>
								<p className="text-secondary text-light">Max</p>
							</Button>

							:

							<div></div>
					}
				</FormGroup>
			</div>
		)
	}
}