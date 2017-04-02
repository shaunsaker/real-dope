// Buy max drugs that the user can afford

import buyAmmo from './buyAmmo';
import userErrorNoFunds from '../usererrors/userErrorNoFunds';

export default function buyMax(new_state, action)
{
    const price = new_state.game.options.ammo.price;
    const currentCash = new_state.currentGame.currentFinances.cash;

    // First see if we can afford at least one bullet
    if (currentCash >= price) {
        const availableQuantity = new_state.game.options.ammo.quantity;

        let maxQuantity = Math.floor(currentCash / price);

        // Take stock level into account
        if (maxQuantity >= availableQuantity) {
            maxQuantity = availableQuantity;
        }

        // set the quantity on the action
        action = {
            quantityRequested: maxQuantity
        }

        new_state = buyAmmo(new_state, action)
    }
    else {
        new_state = userErrorNoFunds(new_state);
    }

	return new_state;
}