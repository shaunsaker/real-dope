// Pay loan

import userErrorNoFunds from '../usererrors/userErrorNoFunds';

export default function payLoan(new_state, action)
{
    if (new_state.currentGame.currentFinances.cash >= action.amount) {
        new_state.currentGame.currentFinances.debt -= Math.floor(action.amount);
        new_state.currentGame.currentFinances.cash -= Math.floor(action.amount);
    } else {
        new_state = userErrorNoFunds(new_state);
    }

    return new_state;
}