// Toggles api loading indicator

export default function toggleLoading(new_state, action)
{
    new_state.status.apiLoading = !new_state.status.apiLoading;
    return new_state;
}