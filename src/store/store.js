import { createStore } from 'redux';
import cardsReducer from '../reducer/cardsReducer';
import notiReducer from '../reducer/notiReducer';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    cardsReducer,
    notiReducer,
});

const store = createStore(rootReducer);

export default store;
