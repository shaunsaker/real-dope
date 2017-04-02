// Display user error when user cannot afford to purchase something

export default function userErrorNoFunds(new_state)
{
    new_state.status.userError.active = true;
    new_state.status.userError.display = "Insufficient Funds.";
    
	return new_state;
}