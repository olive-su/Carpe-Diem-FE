import axios from 'axios';
import { useSelector } from 'react-redux';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import config from '../../config';
import {
    ALBUM_LIST_LOADING_REQUEST,
    ALBUM_LIST_LOADING_SUCCESS,
    ALBUM_LIST_LOADING_FAILURE,
    ALBUM_LOADING_REQUEST,
    ALBUM_LOADING_SUCCESS,
    ALBUM_LOADING_FAILURE,
} from '../types';

/** 앨범 리스트 로드 */
// CHECK userId

const albumListLoadAPI: any = (data: any) => {
    return axios({
        method: 'get',
        url: `http://${config.server.host}:${config.server.port}/album`,
        withCredentials: true,
    });
};

function* albumListload(): any {
    try {
        const result = yield call(albumListLoadAPI);
        yield put({
            type: ALBUM_LIST_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e: any) {
        yield put({
            type: ALBUM_LIST_LOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchAlbumListLoad() {
    yield takeEvery(ALBUM_LIST_LOADING_REQUEST, albumListload);
}

/* 앨범 정보 로드 */
const albumLoadAPI: any = (data: any) => {
    return axios({
        method: 'get',
        url: `http://${config.server.host}:${config.server.port}/album/${data}`,
        withCredentials: true,
    });
};

function* albumLoad(action: any): any {
    try {
        const result = yield call(albumLoadAPI, action.payload);
        yield put({
            type: ALBUM_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e: any) {
        yield put({
            type: ALBUM_LOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchAlbumLoad() {
    yield takeEvery(ALBUM_LOADING_REQUEST, albumLoad);
}

function* albumListSaga() {
    yield all([fork(watchAlbumListLoad)]);
}

function* albumSaga() {
    yield all([fork(watchAlbumLoad)]);
}

export { albumListSaga, albumSaga };
