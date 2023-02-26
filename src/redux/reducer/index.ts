import { combineReducers } from 'redux';
import notiReducer from './notiReducer';
import { albumListReducer, albumReducer } from './albumReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    albumList: albumListReducer,
    album: albumReducer,
    noti: notiReducer,
});

export default rootReducer;
