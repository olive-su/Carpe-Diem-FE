import { all, fork } from 'redux-saga/effects';

import { authSaga, usimSaga } from './authSaga';
import { albumListSaga, albumSaga } from './albumSaga';
import { friendAlbumListSaga, friendAlbumSaga } from './friendAlbumSaga';

export default function* rootSaga() {
    yield all([fork(authSaga), fork(usimSaga), fork(albumListSaga), fork(albumSaga), fork(friendAlbumListSaga), fork(friendAlbumSaga)]);
}
