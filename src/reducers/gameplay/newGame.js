// Reset currentGame state to newGame state

export default function newGame(new_state, action)
{
    new_state.currentGame = new_state.newGame;
    new_state.status.drugsDisplayed = null;
    new_state.status.travelled = false;  
    new_state.status.gameEnd.active = false;
	return new_state;
}