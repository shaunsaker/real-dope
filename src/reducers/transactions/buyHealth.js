// Buy health
	// No need to check if a user can afford it, this is done in the view

export default function buyHealth(new_state, action)
{
	const currentCash = new_state.currentGame.currentFinances.cash;
	const price = action.health.price;

    // set state of player.health
    new_state.currentGame.currentHealth += action.health.points;
    // remove cash
    new_state.currentGame.currentFinances.cash = currentCash - (price * action.health.points);
    new_state.status.userError.active = false;

	return new_state
}