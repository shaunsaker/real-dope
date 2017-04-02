// News event. Display positive/negative news on randomised drug

import getUnique from '../../helpers/reducers/getUnique';

export default function newsEvent(new_state, action)
{
    // get random drug
    const drugsDisplayed = new_state.status.drugsDisplayed;
    const drugStore = new_state.game.drugs;
    const drug = getUnique(drugsDisplayed, 1)[0];
    let drugPrice;

    // get the price of the drug in the drugStore
    for (let i = 0; i < drugStore.length; i++) {
        if (drug.name === drugStore[i].name) {
            drugPrice = drugStore[i].price;
        }
    }

    let news;
    let positive;

    // Pick random positive/negative effect            
    if (Math.random() >= 0.5) {
        // positive
        positive = true;
        news = "Gangs raid SAPS HQ. " + drug.name + " prices drop to an all time low!";
    }
    else {
        // negative
        positive = false;
        news = "SAPS raids all major drug distributors. " + drug.name + " prices skyrocket!";
    }

    // Set the news in the newsfeed
    new_state.status.news.active = true;
    new_state.status.news.display = news;

    // Use positive to calculate random increase/decrease
    let factor = positive ? Math.random() / 5 : Math.random() * 5;
    
    // if our factor is less than 10%, adjust it to 10%
    if (positive && (factor < 0.1 || factor > 1)) {
        factor = 0.1;
    }

    // else make sure it is at least 2
    else if (!positive && ((factor < 2 && factor > 1) || (factor < 1))) {
        factor = 2;
    }
    
    drug.price = Math.ceil(drugPrice * factor);

    // Set the quantity low or high depending on positive
    const quantity = positive ? Math.floor((Math.random() * (100 - 80) + 80)) : Math.floor((Math.random() * (10 - 1) + 1));
    drug.quantity = quantity;

    for (let i = 0; i < drugsDisplayed.length; i++) {
        if (drugsDisplayed[i].name === drug.name) {
            drugsDisplayed[i].price = drug.price;
            drugsDisplayed[i].quantity = drug.quantity;
            break;
        }
    }

    new_state.status.drugsDisplayed = drugsDisplayed;

    return new_state;
}