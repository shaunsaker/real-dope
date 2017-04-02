// Buy ammo if the user can afford it

import userErrorNoFunds from '../usererrors/userErrorNoFunds';
import userErrorQuantity from '../usererrors/userErrorQuantity';

export default function buyAmmo(new_state, action)
{
    // get our variable from the action
    const quantityRequested = action.quantityRequested;

    const quantityAvailable = new_state.game.options.ammo.quantity; 
    const price = new_state.game.options.ammo.price; 

    // check if we have enough money
    const currentCash = new_state.currentGame.currentFinances.cash;

    if (quantityRequested <= quantityAvailable) {
        if (currentCash >= (price * quantityRequested)) {
            new_state.currentGame.currentWeapon.ammo += quantityRequested;

            // remove cash
            new_state.currentGame.currentFinances.cash = currentCash - (price * quantityRequested);
            new_state.status.userError.active = false;

            // set the ammo quantity
            new_state.game.options.ammo.quantity -= quantityRequested;

        } else {
            new_state = userErrorNoFunds(new_state);
        }
    }
    else {
        new_state = userErrorQuantity(new_state);
    }

	return new_state
}