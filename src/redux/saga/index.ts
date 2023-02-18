import { all, fork } from 'redux-saga/effects';

import { albumListSaga, albumSaga } from './albumSaga';

export default function* rootSaga() {
    yield all([fork(albumListSaga), fork(albumSaga)]);
}
