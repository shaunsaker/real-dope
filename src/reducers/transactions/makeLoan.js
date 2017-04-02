// Make loan

export default function makeLoan(new_state, action)
{
    new_state.currentGame.currentFinances.debt += Math.floor(action.amount);
    new_state.currentGame.currentFinances.cash += Math.floor(action.amount);

    return new_state;
}