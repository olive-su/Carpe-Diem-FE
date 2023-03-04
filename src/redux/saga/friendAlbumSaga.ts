import axios from 'axios';
import { useSelector } from 'react-redux';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import config from '../../config';
import {
    FRIEND_ALBUM_LIST_LOADING_SUCCESS,
    FRIEND_ALBUM_LIST_LOADING_FAILURE,
    FRIEND_ALBUM_LOADING_REQUEST,
    FRIEND_ALBUM_LIST_LOADING_REQUEST,
    FRIEND_ALBUM_LOADING_SUCCESS,
    FRIEND_ALBUM_LOADING_FAILURE,
} from '../types';

/* 앨범 리스트 로드 */
const friendAlbumListLoadAPI: any = (data: any) => {
    return axios({
        method: 'get',
        url: `/album/albumList/${data}`,
        withCredentials: true,
    });
};

function* friendAlbumListload(): any {
    try {
        const result = yield call(friendAlbumListLoadAPI);
        yield put({
            type: FRIEND_ALBUM_LIST_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e: any) {
        yield put({
            type: FRIEND_ALBUM_LIST_LOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchAlbumListLoad() {
    yield takeEvery(FRIEND_ALBUM_LIST_LOADING_REQUEST, friendAlbumListload);
}

/* 앨범 정보 로드 */
const friendAlbumLoadAPI: any = (data: any) => {
    return axios({
        method: 'get',
        url: `/album/singleAlbum/${data}/${data.album_id}`,
        withCredentials: true,
    });
};

function* friendAlbumLoad(action: any): any {
    try {
        const result = yield call(friendAlbumLoadAPI, action.payload);
        yield put({
            type: FRIEND_ALBUM_LOADING_SUCCESS,
            payload: result.data,
        });
    } catch (e: any) {
        yield put({
            type: FRIEND_ALBUM_LOADING_FAILURE,
            payload: e.response,
        });
    }
}

function* watchAlbumLoad() {
    yield takeEvery(FRIEND_ALBUM_LOADING_REQUEST, friendAlbumLoad);
}

function* friendAlbumListSaga() {
    yield all([fork(watchAlbumListLoad)]);
}

function* friendAlbumSaga() {
    yield all([fork(watchAlbumLoad)]);
}

export { friendAlbumListSaga, friendAlbumSaga };
