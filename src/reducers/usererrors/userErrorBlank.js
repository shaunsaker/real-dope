// Display user error on blank input field

export default function userErrorBlank(new_state)
{
    new_state.status.userError.active = true;
    new_state.status.userError.display = "Please provide a value that is not blank.";

    return new_state;
}