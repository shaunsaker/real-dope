import React from 'react';
import { connect } from 'react-redux';
import AlarmIcon from 'react-icons/lib/md/alarm';

export class Days extends React.Component
{

	static get propTypes()
    {
        return {
            daysLeft: React.PropTypes.number.isRequired,
        };
    }

	render()
	{
		return (
			<div className="days flex-hz">
				<span className="icon"><AlarmIcon /></span>
	        	<p>{this.props.daysLeft + ' days left'}</p>
        	</div>
		)
	}
}

// export the connected class
function mapStateToProps(state){
	const daysLeft = state.main.currentGame.daysLeft;
    return({
        daysLeft
    });
}
export default connect(mapStateToProps)(Days);