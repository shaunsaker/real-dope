import React from 'react';
import { connect } from 'react-redux';
import BoltIcon from 'react-icons/lib/fa/bolt';
import BullseyeIcon from 'react-icons/lib/fa/bullseye';

// Components
import AmmoDisplay from './AmmoDisplay';

export class WeaponDisplay extends React.Component
{

	static get propTypes()
    {
        return {
            weapon: React.PropTypes.string.isRequired,
            damage: React.PropTypes.number.isRequired
        };
    }

	render()
	{
		return (
			<div className="weapons">
				<div className="col-xs-4 text-center flex-hz flex-space-between padding-large">
					<span className="icon"><BoltIcon /></span>
					<p>{this.props.weapon}</p>
				</div>
				<div className="col-xs-4 text-center flex-hz flex-space-between padding-large">
					<span className="icon"><BullseyeIcon /></span>
					<p>{this.props.damage}</p>
				</div>
				<div className="col-xs-4 text-center flex-hz flex-space-between padding-large">
					<AmmoDisplay />
				</div>
        	</div>
		)
	}
}

// export the connected class
function mapStateToProps(state){
	const weaponIndex = state.main.currentGame.currentWeapon.name;
	const weaponName = state.main.game.weapons[weaponIndex].name;
    const damage = state.main.currentGame.currentWeapon.damage;

    return({
        weapon: weaponName,
        damage
    });
}
export default connect(mapStateToProps)(WeaponDisplay);