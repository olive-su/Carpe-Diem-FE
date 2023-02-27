import { combineReducers } from 'redux';
import notiReducer from './notiReducer';
import { authReducer, usimReducer } from './authReducer';
import { albumListReducer, albumReducer } from './albumReducer';
import { cardListReducer, cardReducer } from './cardReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    usim: usimReducer,
    albumList: albumListReducer,
    album: albumReducer,
    cardList: cardListReducer,
    card: cardReducer,
    noti: notiReducer,
});

export default rootReducer;
