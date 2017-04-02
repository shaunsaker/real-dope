// Buy weapon if the user can afford it

import userErrorNoFunds from '../usererrors/userErrorNoFunds';

export default function buyWeapon(new_state, action)
{
    const currentCash = new_state.currentGame.currentFinances.cash;
    const price = action.weapon.price;
    const damage = action.weapon.damage;

    // check if we have enough money
    if (currentCash >= price) {

        // set state of player.space
        new_state.currentGame.currentWeapon.name = Number(action.weapon.id);
        new_state.currentGame.currentWeapon.damage = damage;
        
        // remove cash
        new_state.currentGame.currentFinances.cash = currentCash - price;

        // reset player ammo
        new_state.currentGame.currentWeapon.ammo = 0;

        new_state.status.userError.active = false;
    } else {
        new_state = userErrorNoFunds(new_state);
    }

	return new_state
}