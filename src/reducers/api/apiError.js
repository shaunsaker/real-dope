// Displays any error information from api

export default function apiError(new_state, action)
{
    new_state.status.apiLoading = false;
    new_state.status.apiMessage = action.message;

    return new_state;
}