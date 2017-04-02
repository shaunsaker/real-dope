import React from 'react';
import { connect } from 'react-redux';
import UserIcon from 'react-icons/lib/fa/user';

export class Clothing extends React.Component
{

	static get propTypes()
    {
        return {
            clothing: React.PropTypes.string.isRequired,
        };
    }

	render()
	{
		return (
			<div className="clothing flex-hz col-xs-4 padding-large">
				<span className="icon"><UserIcon /></span>
	        	<p>{this.props.clothing}</p>
        	</div>
		)
	}
}

// export the connected class
function mapStateToProps(state){
	const clothingIndex = state.main.currentGame.currentSpace.clothing;
	const clothing = state.main.game.clothing[clothingIndex].name;
    return({
        clothing
    });
}
export default connect(mapStateToProps)(Clothing);