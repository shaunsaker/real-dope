// Randomise drugs displayed, their quantities and prices

import getUnique from '../../helpers/reducers/getUnique';

export default function playable(new_state, action)
{
    const allDrugs = JSON.parse(action.drugStore);
    let newDrugs = getUnique(allDrugs);

    for (let i = 0; i < newDrugs.length; i++) { 
        const newQuantity = Math.floor(Math.random() * 100);
        newDrugs[i]['quantity'] = newQuantity === 0 ? 10 : newQuantity;
        const max = newDrugs[i].price * 2;
        const min = newDrugs[i].price / 2;
        const newPrice = Math.floor((Math.random() * (max - min) + min) / 10) * 10;
        newDrugs[i].price = newPrice === 0 ? newDrugs[i].price : newPrice;
    }

    new_state.status.drugsDisplayed = newDrugs;

    return new_state;
}