import React from 'react';
import { Button } from 'react-bootstrap';

export default class WeaponElement extends React.Component
{

	static get propTypes()
    {
        return {
        	weapon: React.PropTypes.object
        };
    }

	render()
	{
		return (
			<div className="weaponElement flex-hz flex-space-between padding-small">
				<div className="flex-2">
					<p>{this.props.name}</p>
				</div>
				<div className="flex-1">
					<p>{this.props.damage}</p>
				</div>
				<div className="flex-1">
					<p>{this.props.price}</p>
				</div>
				<Button bsSize="xs" bsStyle="primary" className="flex-1" data-name={this.props.name} data-damage={this.props.damage} data-price={this.props.price} data-id={this.props.id} onClick={this.props.handleClick}>
					<p className="text-secondary text-light">Buy</p>
				</Button>
        	</div>
		)
	}
}