import React from 'react';
import { connect } from 'react-redux';
import SpaceIcon from 'react-icons/lib/fa/street-view';

export class Space extends React.Component
{

	static get propTypes()
    {
        return {
	        spaceAvailable: React.PropTypes.number.isRequired,
	        spaceTotal: React.PropTypes.number.isRequired
        };
    }

	render()
	{
		return (
			<div className="space flex-hz col-xs-4 flex-space-between padding-large">
				<span className="icon"><SpaceIcon /></span>
	        	<p>{this.props.spaceAvailable + "/" + this.props.spaceTotal}</p>
        	</div>
		)
	}
}

// export the connected class
function mapStateToProps(state){
	const space = state.main.currentGame.currentSpace.used;
	const currentClothing = state.main.currentGame.currentSpace.clothing;
	const totalSpace = state.main.game.clothing[currentClothing].space;
    return({
        spaceAvailable: totalSpace - space,
        spaceTotal: totalSpace
    });
}
export default connect(mapStateToProps)(Space);