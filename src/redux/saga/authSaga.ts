import config from '../../config';
import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
    USER_LOADING_REQUEST,
    USER_LOADING_SUCCESS,
    USER_LOADING_FAILURE,
    USIM_LOADING_REQUEST,
    USIM_LOADING_SUCCESS,
    USIM_LOADING_FAILURE,
} from '../types';

// User Loading
const userLoadingAPI = (token: any) => {
    return axios({
        method: 'get',
        url: `http://${config.server.host}:${config.server.port}/auth`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

function* userLoading(action: any): any {
    try {
        const result = yield call(userLoadingAPI, action.payload);
        console.log('유저 정보', result.data);
        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data,
        });
        console.log('유저 로딩');
    } catch (e: any) {
        console.log('유저 로딩 실패');
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchUserLoading() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

// Usim Loading
const usimLoadingAPI = (data: any) => {
    return axios({
        method: 'get',
        url: `http://${config.server.host}:${config.server.port}/camera/usim`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

function* usimLoading(action: any): any {
    try {
        const result = yield call(usimLoadingAPI, action.payload);
        console.log('usim 정보 로드', result.data);
        yield put({
            type: USIM_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e: any) {
        yield put({
            type: USIM_LOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchUsimLoading() {
    yield takeEvery(USIM_LOADING_REQUEST, usimLoading);
}

function* authSaga() {
    yield all([fork(watchUserLoading)]);
}

function* usimSaga() {
    yield all([fork(watchUsimLoading)]);
}

export { authSaga, usimSaga };
