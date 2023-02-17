import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import cardsReducer from '../reducers/cardsReducer';
import notiReducer from '../reducers/notiReducer';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    cardsReducer,
    notiReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

//sagaMiddleware.run(rootSaga);

export default store;
