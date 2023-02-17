import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import notiReducer from './notiReducer';
import albumReducer from './albumReducer';

const rootReducer = combineReducers({
    album: albumReducer,
    cards: cardsReducer,
    noti: notiReducer,
});

export default rootReducer;
