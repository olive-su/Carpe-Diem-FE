import { all, fork } from 'redux-saga/effects';

import { authSaga, usimSaga } from './authSaga';
import { albumListSaga, albumSaga } from './albumSaga';

export default function* rootSaga() {
    yield all([fork(authSaga), fork(usimSaga), fork(albumListSaga), fork(albumSaga)]);
}
