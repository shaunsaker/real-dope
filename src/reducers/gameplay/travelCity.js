// Travel to another city

export default function travelCity(new_state, action)
{
    const cities = new_state.game.locations;
    const suburbs = cities[action.city].suburbs;

    new_state.currentGame.currentLocation.city = action.city;
    new_state.currentGame.currentLocation.suburb = 0;
    new_state.currentGame.daysLeft = new_state.currentGame.daysLeft -= 1;
    new_state.status.travelled = true;

    return new_state;
}