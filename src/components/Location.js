import React from 'react';
import { connect } from 'react-redux';
import PlaceIcon from 'react-icons/lib/md/place';

export class Location extends React.Component
{

	static get propTypes()
    {
        return {
            city: React.PropTypes.string.isRequired,
            suburb: React.PropTypes.string.isRequired
        };
    }

	render()
	{
		return (
			<div className="location text-center padding-small flex-hz flex-center">
                <span className="icon"><PlaceIcon /></span>
	        	<p>{this.props.suburb + ", " + this.props.city}</p>
        	</div>
		)
	}
}

// export the connected class
function mapStateToProps(state){
	const cityIndex = state.main.currentGame.currentLocation.city;
    const suburbIndex = state.main.currentGame.currentLocation.suburb;
    const city = state.main.game.locations[cityIndex].city;
    const suburb = state.main.game.locations[cityIndex].suburbs[suburbIndex];
    return({
        city,
        suburb
    });
}
export default connect(mapStateToProps)(Location);