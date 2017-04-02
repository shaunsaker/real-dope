import { call, put } from 'redux-saga/effects';

import Auth from '../auth/index';

export function* signUpUser(action) {
    const response = yield call(Auth.signUpUser, action.values);

    // Check if we signed up successfully or return error
    if (response) {
        console.log(response);
        if (response.success) {
            yield put({
                type: 'main.signIn'
            });
        }
        else {
            yield put({
                type: 'main.authError',
                error: response.message
            })
        }
    }
}

export function* signInUser(action) {
    const response = yield call(Auth.signInUser, action.values);

    // Check if we signed in successfully or return error
    if (response) {
        console.log(response, action.values);
        if (response.success) {
            yield put({
                type: 'main.signIn'
            });
        }
        else {
            yield put({
                type: 'main.authError',
                error: response.message
            });
        }
    }
}

export function* signOutUser(action) {
    const response = yield call(Auth.signOutUser, action);

    if (response) {
        if (response.success) {
            yield put({
                type: 'main.signOut'
            });
        }
        else {
            yield put({
                type: 'main.authError',
                error: response.message
            });
        }
    }
}

export function* userAuth(action) {

    const response = yield call(Auth.userAuth, action);

    if (response) {
        if (response.success) {
            yield put({
                type: 'main.signIn',
                uid: response.message.uid
            });
        }
        else {
            yield put({
                type: 'main.signOut'
            });
        }
    } 
}