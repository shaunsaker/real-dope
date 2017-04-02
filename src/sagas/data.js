import { call, put } from 'redux-saga/effects';

import ApiData from '../api/index';

export function* saveGame(action) {

    const response = yield call(ApiData.saveUserGame, action);

    if (response) {
        console.log(response);
        if (response.success) {
            yield put({
                type: 'main.apiSuccess',
                message: 'Game saved.'
            });
        }
        else {
            yield put({
                type: 'main.apiError',
                message: response.message
            });
        }
    } 
}

export function* loadGame(action) {

    const response = yield call(ApiData.loadUserGame, action);

    if (response) {
        console.log(response, action);
        if (response.success) {
            yield put({
                type: 'main.apiLoadGame',
                data: response.message
            });
        }
        else {
            yield put({
                type: 'main.apiError',
                message: response.message
            });
        }
    } 
}