// Display user error when user cannot sell drugs at that location

export default function userErrorNoDrugs(new_state)
{
    new_state.status.userError.active = true;
    new_state.status.userError.display = "You can't sell that here.";
    
	return new_state;
}