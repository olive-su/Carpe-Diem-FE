import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';

export const addNoti = createAction('ADD');
export const deleteNoti = createAction('DELETE');

const cardsReducer = createReducer([{ text: '앨범 도착!', createdAt: Date.now() }], {
    [addNoti]: (state, action) => {
        state.push({ text: action.payload, createdAt: Date.now() });
    },
    [deleteNoti]: (state, action) => {
        state.filter((noti) => noti.createdAt !== action.payload);
    },
});

export default cardsReducer;
