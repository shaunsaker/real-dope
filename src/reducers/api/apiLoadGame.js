// Takes user data from api and loads it into state

export default function apiLoadGame(new_state, action)
{
    new_state.currentGame = action.data.currentGame;
    new_state.status.apiLoading = false;
    new_state.status.apiLoaded = true;

    return new_state;
}