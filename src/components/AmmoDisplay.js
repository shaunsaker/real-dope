import React from 'react';
import { connect } from 'react-redux';
import BulletIcon from 'react-icons/lib/md/mode-edit';

export class AmmoDisplay extends React.Component
{
	render()
	{
		return (
			<div 
				style={this.props.fighting ? { width: '33.33333333%' } : {} }
				className={ this.props.fighting ? "ammo flex-hz flex-space-between padding-large col-xs-4" : "ammo flex-hz flex-space-between"}>
				<span className="icon"><BulletIcon /></span>
				<p>{this.props.ammo}</p>
			</div>
		)
	}
}

// export the connected class
function mapStateToProps(state){
    return({
        ammo: state.main.currentGame.currentWeapon.ammo,
		fighting: state.main.status.fighting.active,
    });
}
export default connect(mapStateToProps)(AmmoDisplay);