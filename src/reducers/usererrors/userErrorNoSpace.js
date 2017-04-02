// Display user error when user does not have enough space to carry

export default function userErrorNoDrugs(new_state)
{
    new_state.status.userError.active = true;
    new_state.status.userError.display = "You don't have enough space for that.";
    
	return new_state;
}