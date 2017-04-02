// Buy health
import userErrorNoFunds from '../usererrors/userErrorNoFunds';

export default function buyHealth(new_state, action) {
    const currentCash = new_state.currentGame.currentFinances.cash;
    const price = action.health.price;
    const points = action.health.points;
    const cost = price * points;

    if (cost <= currentCash) {

        // set state of player.health
        new_state.currentGame.currentHealth += points;

        // remove cash
        new_state.currentGame.currentFinances.cash = currentCash - cost;
        new_state.status.userError.active = false;
    }
    else {
        new_state = userErrorNoFunds(new_state);
    }

    return new_state
}