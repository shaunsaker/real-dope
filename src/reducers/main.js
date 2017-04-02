import { reducerCall } from './index';
import initialState from './initialState';

// Auth reducers
import signIn from './auth/signIn';
import signOut from './auth/signOut';
import authError from './auth/authError';
import resetAuthError from './auth/resetAuthError';

// Api reducers
import toggleLoading from './api/toggleLoading';
import apiSuccess from './api/apiSuccess';
import apiError from './api/apiError';
import apiLoadGame from './api/apiLoadGame';
import toggleApiLoaded from './api/toggleApiLoaded';

// Gameplay reducers
import newGame from './gameplay/newGame';
import playable from './gameplay/playable';
import eventRandomiser from './gameplay/eventRandomiser';
import nomad from './gameplay/nomad';
import setBattle from './gameplay/setBattle';
import travelSuburb from './gameplay/travelSuburb';
import travelCity from './gameplay/travelCity';
import fight from './gameplay/fight';
import run from './gameplay/run';

// Transaction reducers
import buyClothing from './transactions/buyClothing';
import buyHealth from './transactions/buyHealth';
import buyWeapon from './transactions/buyWeapon';
import buyAmmo from './transactions/buyAmmo';
import buyMaxAmmo from './transactions/buyMaxAmmo';
import buyDrugs from './transactions/buyDrugs';
import buyMax from './transactions/buyMax';
import sellMax from './transactions/sellMax';
import payBank from './transactions/payBank';
import payLoan from './transactions/payLoan';
import makeLoan from './transactions/makeLoan';

// User error reducers
import userErrorNoFunds from './usererrors/userErrorNoFunds';
import userErrorNoDrugs from './usererrors/userErrorNoDrugs';
import userErrorBlank from './usererrors/userErrorBlank';
import userErrorNegative from './usererrors/userErrorNegative';
import userErrorNoSpace from './usererrors/userErrorNoSpace';
import userErrorQuantity from './usererrors/userErrorQuantity';
import resetUserError from './usererrors/resetUserError';

export default function main(state = initialState, action) {
    return reducerCall(state, action, reducerClass);
}

/**
 * Reducer static class
 */
class reducerClass {

    static toggleLoading(new_state, action) {

        // toggles loading state
        new_state = toggleLoading(new_state, action);

        return new_state;
    }

    static apiSuccess(new_state, action) {

        new_state = apiSuccess(new_state, action);

        return new_state;
    }

    static apiError(new_state, action) {

        new_state = apiError(new_state, action);

        return new_state;
    }

    static apiLoadGame(new_state, action) {

        new_state = apiLoadGame(new_state, action);

        return new_state;
    } 

    static toggleApiLoaded(new_state, action) {

        new_state = toggleApiLoaded(new_state, action);

        return new_state;
    }

    static signIn(new_state, action) {

        // sign in user
        new_state = signIn(new_state, action);

        return new_state;
    }

    static signOut(new_state, action) {

        // sign out user
        new_state = signOut(new_state, action);

        return new_state;
    }

    static authError(new_state, action) {

        // display error message to user
        new_state = authError(new_state, action);

        return new_state;
    }

    static resetAuthError(new_state, action) {

        // reset error message if any
        new_state = resetAuthError(new_state, action);

        return new_state;
    }

    static newGame(new_state, action) {
        new_state = newGame(new_state, action);

        return new_state;
    }

    static playable(new_state, action) {

        // randomise drug quantities and prices after travelling
        new_state = playable(new_state, action);

        if (!action.newGame) {

            // randomise events after travelling
            new_state = eventRandomiser(new_state, action);
        }

        return new_state;
    }

    static nomad(new_state, action) {

        // increase debt on travel and set travel false, newsfeed blank
            // check if our daysLeft is up, if so set game status
        new_state = nomad(new_state, action);

        return new_state;
    }

    static resetDays(new_state, action) {

        // continue game so reset the days left
        new_state.currentGame.daysLeft = 30;
        new_state.status.travelled = false;
        new_state.status.gameEnd.active = false;

        return new_state;
    }

    static resetGame(new_state, action) {

        new_state.status.gameEnd.active = false;

        return new_state;
    }

    static resetUserError(new_state) {

        // reset user error
        new_state = resetUserError(new_state);

        return new_state;
    }

    static userErrorBlank(new_state) {

        // display user error on blank input field
        new_state = userErrorBlank(new_state);

        return new_state;
    }

    static userErrorNoFunds(new_state) {

        // display user error when user cannot afford to purchase something
        new_state = userErrorNoFunds(new_state);

        return new_state;
    }

    static userErrorNoDrugs(new_state) {

        // display user error when user cannot sell drugs at that location
        new_state = userErrorNoDrugs(new_state);

        return new_state;
    } 

    static userErrorNoSpace(new_state) {

        // display user error when user does not have enough space
        new_state = userErrorNoSpace(new_state);

        return new_state;
    } 

    static userErrorQuantity(new_state) {

        // display user error when game does not have enough of a drug
        new_state = userErrorQuantity(new_state);

        return new_state;
    } 

    static userErrorNegative(new_state) {

        // display user error when user attempted to buy/sell negative amount
        new_state = userErrorNegative(new_state);

        return new_state;
    } 

    static setBattle(new_state, action) {

        // Set the state before a cop fight is to take place
        new_state = setBattle(new_state, action);

        return new_state;
    }

    static fight(new_state, action) {

        new_state = fight(new_state, action);

        return new_state;
    }

    static run(new_state, action) {

        new_state = run(new_state, action);

        return new_state;
    }

    static buyClothing(new_state, action) {

        // Buy clothing if the user can afford it
        buyClothing(new_state, action);

        return new_state;
    }

    static buyWeapon(new_state, action) {

        // Buy weapon if the user can afford it
        buyWeapon(new_state, action);

        return new_state;
    }

    static buyAmmo(new_state, action) {

        // Buy ammo if the user can afford it
        buyAmmo(new_state, action);

        return new_state;
    }

    static buyMaxAmmo(new_state, action) {

        // Buy max ammo
        buyMaxAmmo(new_state, action);

        return new_state;
    }

    static buyHealth(new_state, action) {

        // Buy health if the user can afford it
        buyHealth(new_state, action);

        return new_state;
    }

    static buyDrugs(new_state, action) {

        new_state = buyDrugs(new_state, action);

        return new_state;
    }

    static buyMax(new_state, action) {

        // buy max drugs that the user can afford
        new_state = buyMax(new_state, action);

        return new_state;
    }

    static sellMax(new_state, action) {

        // sell max drugs
        new_state = sellMax(new_state, action);

        return new_state;
    }

    static payBank(new_state, action) {

        new_state = payBank(new_state, action);

        return new_state;
    }

    static payLoan(new_state, action) {

        new_state = payLoan(new_state, action);

        return new_state;
    }

    static makeLoan(new_state, action) {

        new_state = makeLoan(new_state, action);

        return new_state;
    }

    static travelSuburb(new_state, action) {

        new_state = travelSuburb(new_state, action);

        return new_state;
    }

    static travelCity(new_state, action) {

        new_state = travelCity(new_state, action);

        return new_state;
    }
}
