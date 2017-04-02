// Display user error when user requested too much quantity

export default function userErrorQuantity(new_state, player)
{
    new_state.status.userError.active = true;
    new_state.status.userError.display = player ? "You don't have enough of that." : "We don't have enough.";
    
	return new_state;
}