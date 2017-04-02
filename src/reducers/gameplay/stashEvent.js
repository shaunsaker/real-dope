// Pick up stash event. User gets random drugs of quantity between 1 and 5

import getUnique from '../../helpers/reducers/getUnique';

export default function stashEvent(new_state, action)
{
    // Get random drug
    const drugStore = new_state.game.drugs;
    const drug = getUnique(drugStore, 1)[0];

    // Get random number
    const amount = Math.floor((Math.random() * (5 - 1) + 1));

    let news = "You find " + amount + " x " + drug.name + " along the way.";

    // Check if we have enough space 
    const space = new_state.currentGame.currentSpace;

    if ((space.total - space.used) >= amount) {
        let checker;
        let playerDrugs = new_state.currentGame.currentDrugs;

        for (let i = 0; i < playerDrugs.length; i++) {

            // check if the player owns this drug already
            if (playerDrugs[i] && playerDrugs[i]['name'] === drug.index) {

                // set our checker
                checker = true;

                // increase the drug quantity
                playerDrugs[i]['quantity'] += amount;

                // average out the purchase price
                playerDrugs[i]['price'] = (playerDrugs[i]['price'] + drug.price) / 2;

                break;
            }
        }

        if (!checker) {

            // create the new drug and set the quantity in there
            const newDrug = {
                name: drug.index,
                quantity: amount,
                price: drug.price
            }
            playerDrugs.push(newDrug);
        }

        // Set the new state
        new_state.currentGame.currentDrugs = playerDrugs;
        new_state.currentGame.currentSpace.used += amount;
        new_state.status.news.active = true;
    }
    else {
        news += " But you didn't have enough space."
    }
    new_state.status.news.display = news;

	return new_state;
}