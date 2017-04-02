// Buy clothing if the user can afford it

import userErrorNoFunds from '../usererrors/userErrorNoFunds';

export default function buyClothing(new_state, action)
{

    // assign this to new_state
    const currentCash = new_state.currentGame.currentFinances.cash;

    const price = new_state.game.clothing[action.clothing.id].price;

    // check if we have enough money
    if (currentCash >= price) {  
        
        // get the total space available from game data
        const totalSpace = new_state.game.clothing[action.clothing.id].space;

        // set state of player.space
        new_state.currentGame.currentSpace.clothing = Number(action.clothing.id);
        new_state.currentGame.currentSpace.total = totalSpace;

        // remove cash
        new_state.currentGame.currentFinances.cash = currentCash - price;

        // remove user error in case there was one
        new_state.status.userError.active = false;

    } else {
        new_state = userErrorNoFunds(new_state);
    }

	return new_state
}