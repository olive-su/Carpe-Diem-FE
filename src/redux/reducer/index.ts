import { combineReducers } from 'redux';
import notiReducer from './notiReducer';
import { albumListReducer, albumReducer } from './albumReducer';
import { authReducer, usimReducer } from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    usim: usimReducer,
    albumList: albumListReducer,
    album: albumReducer,
    noti: notiReducer,
});

export default rootReducer;
