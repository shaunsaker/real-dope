// Displays any error information from authenticating a user during signup or signin

export default function authError(new_state, action)
{
    new_state.status.authenticationError = true;
    if (action.error === 'The email address is already in use by another account.') {
        new_state.status.authenticationErrorMessage = action.error;
        new_state.status.authenticationRedirect = true;
    }
    else if (action.error === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        new_state.status.authenticationErrorMessage = "It does not look like you've signed up.";
        new_state.status.authenticationRedirect = true;
    }
    else {
        new_state.status.authenticationErrorMessage = action.error;
    }

    return new_state;
}