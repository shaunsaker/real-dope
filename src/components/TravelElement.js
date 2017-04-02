import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

export default class TravelElement extends React.Component
{
	static get propTypes()
    {
        return {
        	data: React.PropTypes.string.isRequired,
        	id: React.PropTypes.number.isRequired,
        	handleClick: React.PropTypes.func.isRequired
        };
    }

	render()
	{
		return (
			<div className="travelElement text-center">
	            <Link to="/game">
	              <Button bsStyle="default" onClick={() => this.props.handleClick(this.props.id)} data={this.props.data}>
	                <p className="text-dark">{this.props.data}</p>
	              </Button>
	            </Link>
        	</div>
		)
	}
}