import React from 'react';
import { Button } from 'react-bootstrap';

export default class ClothingElement extends React.Component
{

	static get propTypes()
    {
        return {
        	clothing: React.PropTypes.object
        };
    }

	render()
	{
		return (
			<div className="clothingElement flex-hz flex-space-between padding-small">
				<div className="flex-2">
					<p className="text-light">{this.props.name}</p>
				</div>
				<div className="flex-1">
					<p className="text-light">{this.props.space}</p>
				</div>
				<div className="flex-1">
					<p className="text-light">{this.props.price}</p>
				</div>
				<Button bsSize="xs" bsStyle="primary" className="flex-1" data-name={this.props.name} data-space={this.props.space} data-price={this.props.price} data-id={this.props.id} onClick={this.props.handleClick}>
					<p className="text-light">Buy</p>
				</Button>
        	</div>
		)
	}
}