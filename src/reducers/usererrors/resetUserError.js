// Reset user error

export default function resetUserError(new_state)
{
    new_state.status.userError.active = false;

    return new_state;
}