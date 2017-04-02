// Travel to another suburb

export default function travelSuburb(new_state, action)
{
    new_state.currentGame.currentLocation.suburb = action.suburb;
    new_state.currentGame.daysLeft = new_state.currentGame.daysLeft -= 1;
    new_state.status.travelled = true;

    return new_state;
}