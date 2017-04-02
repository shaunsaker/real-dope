// Display user error when user requested too much quantity

export default function userErrorQuantity(new_state)
{
    new_state.status.userError.active = true;
    new_state.status.userError.display = "We don't have enough.";
    
	return new_state;
}