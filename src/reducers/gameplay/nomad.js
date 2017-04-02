// Increases debt on traveland set travel false, newsfeed blank and sets the game status to win or lose if days left is 0
export default function nomad(new_state, action)
{
	if (new_state.status.travelled && new_state.currentGame.daysLeft <= 0) {
		new_state.status.gameEnd.active = true;
		if (Math.floor(new_state.currentGame.currentFinances.debt > 0)) {

			// round down in case we have some spare change we don't care about
			new_state.status.gameEnd.win = false;
		}
		else {
			new_state.status.gameEnd.win = true;
		}
	}
	else {
	    if (new_state.status.travelled) {
			
	    	// increase debt if has debt
			if (new_state.currentGame.currentFinances.debt > 0) {
	        	new_state.currentGame.currentFinances.debt += Math.floor(new_state.currentGame.currentFinances.debt * new_state.game.options.finances.debtFactor);
			}

	        // randomise ammo quantity and price in case a user attempts to purchase
	        new_state.game.options.ammo.quantity = Math.floor((Math.random() * (100 - 1) + 1));
	        new_state.game.options.ammo.price = Math.floor((Math.random() * (100 - 10) + 10)); 
	    }	
	    new_state.status.travelled = false;
    }

    return new_state;
}