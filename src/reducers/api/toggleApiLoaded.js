// Toggles api loading indicator

export default function toggleApiLoaded(new_state, action)
{
    new_state.status.apiLoaded = !new_state.status.apiLoaded;
    new_state.status.apiMessage = null;

    return new_state;
}