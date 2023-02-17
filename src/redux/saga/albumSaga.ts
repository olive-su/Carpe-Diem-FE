import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import config from '../../config';
import { ALBUM_LIST_LOADING_REQUEST, ALBUM_LIST_LOADING_SUCCESS, ALBUM_LIST_LOADING_FAILURE } from '../types';

/** 앨범 리스트 로드 */
// CHECK userId

const userId = 'test';

const albumLoadAPI: any = (data: any) => {
    return axios.get(`http://${config.server.host}:${config.server.port}/album/${userId}`, data);
};

function* albumLoad(): any {
    try {
        const result = yield call(albumLoadAPI);
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

function* watchAlbumLoad() {
    yield takeEvery(ALBUM_LIST_LOADING_REQUEST, albumLoad);
}

export default function* memosaga() {
    yield all([fork(watchAlbumLoad)]);
}
