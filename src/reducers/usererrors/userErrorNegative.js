// Display user error when user attempted buy/sell negative amount

export default function userErrorNegative(new_state, player)
{
    new_state.status.userError.active = true;
    new_state.status.userError.display = "You can't use a negative amount.";
    
	return new_state;
}