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
    ALBUM_CREATE_REQUEST,
    ALBUM_CREATE_SUCCESS,
    ALBUM_CREATE_FAILURE,
    ALBUM_UPDATE_REQUEST,
    ALBUM_UPDATE_SUCCESS,
    ALBUM_UPDATE_FAILURE,
    ALBUM_DELETE_REQUEST,
    ALBUM_DELETE_SUCCESS,
    ALBUM_DELETE_FAILURE,
} from '../types';

/* 앨범 리스트 로드 */
const albumListLoadAPI: any = (data: any) => {
    return axios({
        method: 'get',
        url: `http://${config.server.host}:${config.server.port}/album?page=${data}`,
        withCredentials: true,
    });
};

function* albumListload(action: any): any {
    try {
        const result = yield call(albumListLoadAPI, action.payload);
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
/* 앨범 생성 */
const albumCreateAPI = (data: any) => {
    return axios({
        method: 'post',
        url: `http://${config.server.host}:${config.server.port}/album`,
        withCredentials: true,
        data: data,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

function* albumCreate(action: any): any {
    try {
        const result = yield call(albumCreateAPI, action.payload);
        console.log(result.data);

        yield put({
            type: ALBUM_CREATE_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: ALBUM_CREATE_FAILURE,
            payload: e,
        });
    }
}

function* watchAlbumCreate() {
    yield takeEvery(ALBUM_CREATE_REQUEST, albumCreate);
}

/* 앨범 수정 */
const albumUpdateAPI = (data: any) => {
    return axios({
        method: 'put',
        url: `http://${config.server.host}:${config.server.port}/album/${data.album_id}`,
        withCredentials: true,
        data: data,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

function* albumUpdate(action: any): any {
    try {
        const result = yield call(albumUpdateAPI, action.payload);

        yield put({
            type: ALBUM_UPDATE_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: ALBUM_UPDATE_FAILURE,
            payload: e,
        });
    }
}

function* watchAlbumUpdate() {
    yield takeEvery(ALBUM_UPDATE_REQUEST, albumUpdate);
}

/* 앨범 삭제 */
const albumDeleteAPI = (data: any) => {
    return axios({
        method: 'delete',
        url: `http://${config.server.host}:${config.server.port}/album/${data.album_id}`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

function* albumDelete(action: any): any {
    try {
        const result = yield call(albumDeleteAPI, action.payload);
        yield put({
            type: ALBUM_DELETE_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: ALBUM_DELETE_FAILURE,
            payload: e,
        });
    }
}

function* watchAlbumeDelete() {
    yield takeEvery(ALBUM_DELETE_REQUEST, albumDelete);
}

function* albumListSaga() {
    yield all([fork(watchAlbumListLoad)]);
}

function* albumSaga() {
    yield all([fork(watchAlbumLoad), fork(watchAlbumCreate), fork(watchAlbumUpdate), fork(watchAlbumeDelete)]);
}

export { albumListSaga, albumSaga };
