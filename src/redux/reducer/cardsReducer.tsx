import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import { cardData } from '../../types/type';

export const setCard: any = createAction('SET');
export const filterOn: any = createAction('ON');
export const filterOut: any = createAction('OUT');

let allCard: any = [];
const cardsReducer = createReducer([], {
    [setCard]: (state, action) => {
        allCard = action.payload;
        return action.payload;
    },
    [filterOn]: (state, action) => {
        state.concat(allCard.filter((card: cardData) => card.expressionLabel === action.payload));
        // console.log(allCard.expressionLabel);
        // console.log(action.payload);
        // console.log(allCard.filter((card: cardData) => card.expressionLabel === action.payload));
    },
    [filterOut]: (state, action) => {
        state.filter((card: cardData) => card.expressionLabel !== action.payload);
    },
});

export default cardsReducer;
