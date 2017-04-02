// Signs a user in

export default function signOut(new_state, action)
{
    new_state.status.authenticated = false;
    new_state.status.authenticationRedirect = true;
    return new_state;
}