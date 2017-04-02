import React from 'react';
import { connect } from 'react-redux';
import HealthIcon from 'react-icons/lib/fa/heart';

export class Health extends React.Component
{

	static get propTypes()
    {
        return {
            health: React.PropTypes.number.isRequired,
        };
    }

	render()
	{
		return (
			<div className="health flex-hz flex-space-between padding-large col-xs-4">
				<span className="icon"><HealthIcon /></span>
	        	<p>{this.props.health}</p>
        	</div>
		)
	}
}

// export the connected class
function mapStateToProps(state){
	const health = state.main.currentGame.currentHealth; 
    return({
        health
    });
}
export default connect(mapStateToProps)(Health);