import {
    ALBUM_LIST_LOADING_REQUEST,
    ALBUM_LIST_LOADING_SUCCESS,
    ALBUM_LIST_LOADING_FAILURE,
    ALBUM_LOADING_REQUEST,
    ALBUM_LOADING_SUCCESS,
    ALBUM_LOADING_FAILURE,
    ALBUM_CREATE_REQUEST,
    ALBUM_CREATE_SUCCESS,
    ALBUM_CREATE_FAILURE,
    ALBUM_UPDATE_REQUEST,
    ALBUM_UPDATE_SUCCESS,
    ALBUM_UPDATE_FAILURE,
    ALBUM_DELETE_REQUEST,
    ALBUM_DELETE_SUCCESS,
    ALBUM_DELETE_FAILURE,
} from '../types';

const initialState = {
    albumList: [],
    album: [],
};

const albumListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ALBUM_LIST_LOADING_SUCCESS:
            return {
                ...state,
                albumList: [...state.albumList, ...action.payload],
            };
        default:
            return {
                ...state,
            };
    }
};

const albumReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ALBUM_LOADING_REQUEST:
        case ALBUM_LOADING_SUCCESS:
            return {
                ...state,
                album: action.payload,
            };
        case ALBUM_CREATE_SUCCESS:
        case ALBUM_UPDATE_SUCCESS:
        case ALBUM_DELETE_SUCCESS:
            return {
                ...state,
                album: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export { albumListReducer, albumReducer };
