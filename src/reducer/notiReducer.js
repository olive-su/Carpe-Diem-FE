import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';

export const addNoti = createAction('ADD');
export const deleteNoti = createAction('DELETE');

const cardsReducer = createReducer([{ text: '앨범 도착했습니다!', createdAt: Date.now() },{ text: '앨범 도착했습니다!', createdAt: Date.now() }], {
    [addNoti]: (state, action) => {
        state.push({ text: '앨범이 도착했습니다!', createdAt: action.payload });
    },
    [deleteNoti]: (state, action) => {
        return state.filter((noti) => noti.createdAt !== action.payload);
    },
});

export default cardsReducer;
