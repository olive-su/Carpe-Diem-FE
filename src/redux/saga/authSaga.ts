import config from '../../config';
import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { USER_LOADING_REQUEST, USER_LOADING_SUCCESS, USER_LOADING_FAILURE } from '../types';

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
// Usim Loading
// const usimLoadingAPI = (token: any) => {
//     const config = {
//         withCredentials: true,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     };
//     return axios.get('/auth', config);
// };

function* userLoading(action: any): any {
    try {
        const result = yield call(userLoadingAPI, action.payload);
        console.log('결과', result.data);
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

function* watchuserLoading() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

function* authSaga() {
    yield all([fork(watchuserLoading)]);
}

export { authSaga };
