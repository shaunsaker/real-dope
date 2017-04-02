// Run

import fight from './fight';

export default function run(new_state, action)
{
	// Based on a random factor - fight or go back to /game
	const factor = Math.random();

	if (factor <= 0.5) {

		// got away, go back to the game
		new_state.status.fighting.active = false;

		// set newsfeed to mention the win	
		new_state.status.news.active = true;
		new_state.status.news.display = "Sjoe, you got away.";
	}
	else {		
		
		// didn't get away, call fight and skip user turn
		const skipTurn = true;
		fight(new_state, action, skipTurn);
	}

    return new_state;
}