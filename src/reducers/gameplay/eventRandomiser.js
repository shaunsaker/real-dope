// Randomise events on travel (news, stash, cop fight)

import newsEvent from './newsEvent.js';
import stashEvent from './stashEvent.js';

export default function eventRandomiser(new_state, action)
{
    const random = Math.random();

    if (random <= 0.33) {

    	// News event
    	new_state = newsEvent(new_state, action);
    }

    else if (random <= 0.66) {

    	// Stash event
    	new_state = stashEvent(new_state, action);
    }

    else {

        // Fight event
        new_state.status.fighting.active = true;
    }

    return new_state;
}