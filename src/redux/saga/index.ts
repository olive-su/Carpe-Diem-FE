import { all, fork } from 'redux-saga/effects';

import { authSaga } from './authSaga';
import { albumListSaga, albumSaga } from './albumSaga';

export default function* rootSaga() {
    yield all([fork(authSaga), fork(albumListSaga), fork(albumSaga)]);
}
