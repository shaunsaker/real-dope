// Signs a user in

export default function signIn(new_state, action)
{
    new_state.status.authenticated = true;
    new_state.status.apiLoading = false;
    new_state.status.uid = action.uid;

    return new_state;
}