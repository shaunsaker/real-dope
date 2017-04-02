import React from 'react';
import { Link } from 'react-router';
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

import DealElement from './DealElement';

export default class DrugElement extends React.Component
{

	static get propTypes()
    {
        return {
        	drug: React.PropTypes.object.isRequired,
        	deal: React.PropTypes.bool,
        	handleClick: React.PropTypes.func,
			handleBuyMax: React.PropTypes.func,
			handleSellMax: React.PropTypes.func
        };
    }

	render()
	{
		return (
			<div className="drugElement padding-small flex-hz">
				{
					this.props.deal ?
					(
						<div></div>
					)
					:
					(
						<div className='flex-2'>
							<p>{this.props.drug.name}</p>
						</div>
					)
				}
				<div className='flex-1'>
					<p>{this.props.drug.quantity}</p>
				</div>
				<div className='flex-1'>
					<p>{this.props.drug.price}</p>
				</div>
				{
					this.props.deal ?
						<DealElement 
							title={this.props.button} 
							handleClick={this.props.handleClick} 
							handleBuyMax={this.props.handleBuyMax}
							handleSellMax={this.props.handleSellMax}
							drug={this.props.drug}
						/>
					:

					<Button bsSize="xs" bsStyle="primary" className='flex-1 action-button' 
						data-action={this.props.button} 
						data-id={this.props.drug.index}
						data-name={this.props.drug.name} 
						data-quantity={this.props.drug.quantity}
						data-price={this.props.drug.price}
						disabled={!this.props.present}  
						onClick={this.props.handleClick}>
						{this.props.button}
					</Button>
				}
        	</div>
		)
	}
}		