// Deposit cash into the bank

import userErrorNoFunds from '../usererrors/userErrorNoFunds';

export default function payBank(new_state, action) {
    if (action.withdraw) {
        new_state.currentGame.currentFinances.bank += Math.floor(action.amount);
        new_state.currentGame.currentFinances.cash -= Math.floor(action.amount);
    }
    else {
        if (new_state.currentGame.currentFinances.cash >= action.amount) {
            new_state.currentGame.currentFinances.bank += Math.floor(action.amount);
            new_state.currentGame.currentFinances.cash -= Math.floor(action.amount);
        } else {
            new_state = userErrorNoFunds(new_state);
        }
    }

    return new_state;
}