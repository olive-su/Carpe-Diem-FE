import {
    ALBUM_LIST_LOADING_REQUEST,
    ALBUM_LIST_LOADING_SUCCESS,
    ALBUM_LIST_LOADING_FAILURE,
    ALBUM_LOADING_REQUEST,
    ALBUM_LOADING_SUCCESS,
    ALBUM_LOADING_FAILURE,
} from '../types';

const initialState = {
    albumList: [],
    album: [],
};

const albumListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ALBUM_LIST_LOADING_REQUEST:
        case ALBUM_LIST_LOADING_SUCCESS:
            return {
                ...state,
                albumList: action.payload,
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
        default:
            return {
                ...state,
            };
    }
};

export { albumListReducer, albumReducer };
