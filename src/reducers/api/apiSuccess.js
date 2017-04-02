// Displays any success information from api

export default function apiSuccess(new_state, action)
{
    new_state.status.apiLoading = false;
    new_state.status.apiMessage = action.message;

    return new_state;
}