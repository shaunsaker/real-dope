// Resets auth error, if any

export default function authError(new_state, action)
{
    if (new_state.status.authenticationError) {
        new_state.status.authenticationError = false;
        new_state.status.authenticationErrorMessage = null;
        new_state.status.authenticationRedirect = false;
    }

    return new_state;
}