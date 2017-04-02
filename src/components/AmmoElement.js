import React from 'react';
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

import DealElement from './DealElement';

export default class AmmoElement extends React.Component
{

	static get propTypes()
    {
        return {
        	name: React.PropTypes.string.isRequired,
        	ammo: React.PropTypes.object.isRequired,
        	handleClick: React.PropTypes.func.isRequired,
        	handleBuyMax: React.PropTypes.func.isRequired
        };
    }

	render()
	{
		return (
			<div className="ammoElement flex-hz flex-space-between padding-small">
				<div className="flex-2">
					<p id="ammoQuantity">{this.props.ammo.quantity}</p>
				</div>
				<div className="flex-1">
					<p id="ammoPrice">{this.props.ammo.price}</p>
				</div>
				<div className="flex-1">TEST</div>
				<DealElement 
					title="Buy"
					handleClick={this.props.handleClick} 
					handleBuyMax={this.props.handleBuyMax}
					drug={this.props.name}
				/>
        	</div>
		)
	}
}