// Fight

export default function fight(new_state, action, skipTurn)
{
	let userHealth = new_state.currentGame.currentHealth
	let userWeapon = new_state.currentGame.currentWeapon;
	const maxDamage = new_state.game.options.fight.damageFactor.max;
	const minDamage = new_state.game.options.fight.damageFactor.min;
	const recruits = new_state.status.fighting.recruits;
	let enemyHealth = new_state.status.fighting.health;

	// we are going to display news to the user so we may as well set it to active here
	new_state.status.news.active = true;

	// only if we have at least one ammo if our weapon is not fists or baseball bat
	if (userWeapon.name === 0 || userWeapon.name === 1 || userWeapon.ammo > 0) {

		// if we have enough health and they have enough health
		if (userHealth > 0 && enemyHealth > 0) {

			let damage;

			// if we didn't try to run away
			if (!skipTurn) {
				// do damage to theirHealth
				damage =  Math.floor(userWeapon.damage * (Math.random() * (maxDamage - minDamage) + minDamage));
				enemyHealth -= damage;

				// use ammo
				userWeapon.ammo -= recruits;

				if (userWeapon.ammo < 0) {
					userWeapon.ammo = 0;
				}

				// display this info to the user
				new_state.status.news.display = "You did " + damage + " damage!";
			}

			if (enemyHealth > 0) {

				// Limit enemy base damage to 20
				let enemyDamage = userWeapon.damage;
				if (enemyDamage > 20) {
					enemyDamage = 20;
				}

				// they get a turn to do damage based on number of recruits
				damage =  Math.floor(enemyDamage * (Math.random() * (maxDamage - minDamage) + minDamage));

				// do at least 5 damage
				if (damage < 5) {
					damage = 5;
				}

				userHealth -= damage;

				// if we tried to run away
				if (skipTurn) {
					new_state.status.news.display = "You couldn't get away. They did " + damage + " damage!";
				}
				else {
					new_state.status.news.display += " They did " + damage + " damage!";
				}
			}
			else {

				// set newsfeed to mention the win	
				new_state.status.news.display = "Daym son. You capped those fools.";

				// set state so that the duel page knows to reroute to game page
				new_state.status.fighting.active = false;
			}

			// if the user's health is zero or less
			if (userHealth <= 0) {

				// lose all drugs carried
				new_state.currentGame.currentDrugs = [];

				// reset available space
				new_state.currentGame.currentSpace.used = 0;

				// health low around 10 (random)
				const newHealth = Math.floor((Math.random() * (15 - 5) + 5));
				userHealth = newHealth;

				// cash at 25%
				new_state.currentGame.currentFinances.cash = Math.floor(new_state.currentGame.currentFinances.cash * 25 / 100);

				// set newsfeed to mention lost drugs and money	
				new_state.status.news.display = "Sergeant Landman won that one. You lost your drugs, most of your cash and your dignity.";

				// set state so that the duel page knows to reroute to game page
				new_state.status.fighting.active = false;
			}
		}
		new_state.currentGame.currentHealth = userHealth;
		new_state.status.fighting.health = enemyHealth;
	}

	else {
		// display no ammo and switch weapon to fists 
		new_state.status.news.display = "You have no more ammo! Switching to fists.";
		new_state.currentGame.currentWeapon.name = 0;
	}

    return new_state;
}