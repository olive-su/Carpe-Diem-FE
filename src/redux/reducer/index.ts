import { combineReducers } from 'redux';
import notiReducer from './notiReducer';
import { albumListReducer, albumReducer } from './albumReducer';

const rootReducer = combineReducers({
    albumList: albumListReducer,
    album: albumReducer,
    noti: notiReducer,
});

export default rootReducer;
