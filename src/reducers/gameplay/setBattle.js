// Set the state before a cop fight is to take place

export default function setBattle(new_state, action)
{
	const max = new_state.game.options.fight.recruits.max;
	const min = new_state.game.options.fight.recruits.min;
	const recruitHealth = new_state.game.options.fight.recruitHealth;

    const recruits = Math.floor((Math.random() * (max - min) + min));
    
    new_state.status.fighting.recruits = recruits;
    new_state.status.fighting.health = recruits * recruitHealth;
    new_state.status.news.display = "What you gonna do?";

    return new_state;
}