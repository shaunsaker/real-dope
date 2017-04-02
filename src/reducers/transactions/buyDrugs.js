// Buy Drugs

import userErrorNoDrugs from '../usererrors/userErrorNoDrugs';
import userErrorNoFunds from '../usererrors/userErrorNoFunds';
import userErrorNoSpace from '../usererrors/userErrorNoSpace';
import userErrorQuantity from '../usererrors/userErrorQuantity';

export default function buyDrugs(new_state, action)
{
    let foundDrug = false;
    let i;

    const drugsDisplayed = new_state.status.drugsDisplayed;

    // Check our available space first
    const space = new_state.currentGame.currentSpace;
    const availableSpace = space.total - space.used;

    // If our available space is less the quantity purchased, display an error
    if (availableSpace < action.quantity) {
        new_state = userErrorNoSpace(new_state);
    }

    else {
        for (i = 0; i < drugsDisplayed.length; i++) {

            console.log('Reducer names', drugsDisplayed[i]['name'], drugsDisplayed[i]['index'], action.name)

            if (drugsDisplayed[i].name === action.name || Number(drugsDisplayed[i].index) === Number(action.name)) {

                console.log('Quantities', action.quantity, drugsDisplayed[i]['quantity'])

                // Check if the input amount is less than the quantity on offer
                if (action.quantity <= drugsDisplayed[i]['quantity']) {
                    foundDrug = true;

                    const drugPrice = drugsDisplayed[i]['price'];

                    // Check if we can afford the quantity of drugs at the price here
                    const affordable = ((action.quantity * drugPrice) <= new_state.currentGame.currentFinances.cash) ? true : false;

                    if (action.quantity <= drugsDisplayed[i]['quantity'] && affordable) {

                        // remove the quantity from the displayed drugs
                        drugsDisplayed[i]['quantity'] -= action.quantity;

                        const playerDrugs = new_state.currentGame.currentDrugs;
                        let checker = false; // we'll use this to see if the player owns the drug

                        // Find the index of the drug from the drugStore
                        let drugIndex;
                        const drugStore = new_state.game.drugs;
                        drugStore.forEach((value, index) => {
                            if (value.name === action.name) {
                                drugIndex = index;
                            }
                        });

                        for (let i = 0; i < playerDrugs.length; i++) {

                            // check if the player owns this drug already
                            if (playerDrugs[i] && playerDrugs[i]['name'] === drugIndex) {
                                
                                // set our checker
                                checker = true;

                                // increase the drug quantity
                                playerDrugs[i]['quantity'] += action.quantity;

                                // average out the purchase price
                                playerDrugs[i]['price'] = Math.floor((playerDrugs[i]['price'] + drugPrice) / 2);

                                break;
                            }
                        }

                        if (!checker) {

                              // create the new drug and set the quantity in there
                            const newDrug = {
                                name: drugIndex,
                                quantity: action.quantity,
                                price: drugPrice
                            }
                            playerDrugs.push(newDrug);
                        }

                        // Now we'll check if a playerDrug has 0 quantity, if so, we'll remove it
                        let index;
                        let needsRemoval = false;

                        for (let i = 0; i < playerDrugs.length; i++) {
                            if (playerDrugs[i]['quantity'] === 0) {
                                index = i;
                                needsRemoval = true;
                                break;
                            }
                        }

                        if (needsRemoval) {
                            playerDrugs.splice(index, 1);
                            needsRemoval = false;
                        }

                        // set playerDrugs on new_state
                        new_state.currentGame.currentDrugs = playerDrugs;

                        // set the space on new_state
                        new_state.currentGame.currentSpace.used += action.quantity;

                        // set drugsDisplayed on new_state
                        new_state.status.drugsDisplayed = drugsDisplayed;

                        // set the player's cash on new_state
                        new_state.currentGame.currentFinances.cash -= action.quantity * drugPrice;

                        break;
                    } else {

                        // display error with insufficient funds
                       new_state = userErrorNoFunds(new_state);
                    }
                }
                else {
                    new_state = userErrorQuantity(new_state);
                }
            }
            else if (!foundDrug && i === drugsDisplayed.length + 1) {

                // display error 
                new_state = userErrorNoDrugs(new_state);
            }
        }
    }

	return new_state;
}