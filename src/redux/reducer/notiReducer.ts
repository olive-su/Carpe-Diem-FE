import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import { ADD_NOTI, DELETE_NOTI } from '../types';

export const addNoti = (message: any) => ({ type: ADD_NOTI, message });
export const deleteNoti = (id: any) => ({ type: DELETE_NOTI, id });

const saveNotifications = (notifications: any) => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
};
const loadNotifications = () => {
    const notifications = localStorage.getItem('notifications');
    return notifications ? JSON.parse(notifications) : [];
};
const initialState = {
    notifications: loadNotifications(),
};

const notiReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_NOTI:
            // eslint-disable-next-line no-case-declarations
            if (state.notifications.length >= 6) {
                state.notifications.shift();
                console.log('삭제', state.notifications);
            }
            // eslint-disable-next-line no-case-declarations
            const newNoti = { id: Date.now(), message: action.message };
            saveNotifications([...state.notifications, newNoti]);
            return {
                ...state,
                notifications: [...state.notifications, newNoti],
            };
        case DELETE_NOTI:
            // eslint-disable-next-line no-case-declarations
            const newNotifications = state.notifications.filter((notification: any) => notification.id !== action.id);
            saveNotifications(newNotifications);
            return {
                ...state,
                notifications: newNotifications,
            };
        default:
            return state;
    }
};

export default notiReducer;
