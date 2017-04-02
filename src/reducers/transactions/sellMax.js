// Sell max drugs

import buyDrugs from './buyDrugs';

export default function sellMax(new_state, action)
{
    // loop through carred drugs, find the correct drug and set the maxQuantity to quantity carried
    const drugsCarried = new_state.currentGame.currentDrugs;
    let maxQuantity;

    for (let i = 0; i < drugsCarried.length; i++) {
        if (drugsCarried[i]['name'] === Number(action.id)) {
            maxQuantity = drugsCarried[i]['quantity'] * -1;
            break;
        }
    }

    // set the quantity on the action
    action = {
        name: action.name,
        quantity: maxQuantity
    }

    new_state = buyDrugs(new_state, action, true);

	return new_state;
}