// Reset api message

export default function apiSuccess(new_state, action)
{
    new_state.status.apiMessage = "";

    return new_state;
}