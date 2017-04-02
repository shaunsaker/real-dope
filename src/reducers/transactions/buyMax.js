// Buy max drugs that the user can afford

import buyDrugs from './buyDrugs';
import userErrorNoFunds from '../usererrors/userErrorNoFunds';
import userErrorNoSpace from '../usererrors/userErrorNoSpace';

export default function buyMax(new_state, action)
{
    const drugPrice = action.price;
    const currentCash = new_state.currentGame.currentFinances.cash;

    // First see if we can afford at least one drug
    if (currentCash >= drugPrice) {
        const availableQuantity = action.quantity;

        // Check our available space first
        const space = new_state.currentGame.currentSpace;
        const availableSpace = Number(space.total) - Number(space.used);

        let maxQuantity = Math.floor(currentCash / drugPrice);

        // Take stock level into account
        if (maxQuantity >= availableQuantity) {
            maxQuantity = availableQuantity;
        }

        // If our affordable quantity is greater than the space available
        if (maxQuantity > availableSpace) {
            maxQuantity = availableSpace;
        } 

        // If we have no space, display error / TODO: This should be done at the top 
        if (maxQuantity === 0) {
            new_state = userErrorNoSpace(new_state);
        }
        else {

            // set the quantity on the action
            action = {
                name: action.name,
                quantity: maxQuantity
            }

            new_state = buyDrugs(new_state, action);
        }
    }
    else {
        new_state = userErrorNoFunds(new_state);
    }

	return new_state;
}