import {
    FRIEND_ALBUM_LIST_LOADING_REQUEST,
    FRIEND_ALBUM_LIST_LOADING_SUCCESS,
    FRIEND_ALBUM_LOADING_REQUEST,
    FRIEND_ALBUM_LOADING_SUCCESS,
} from '../types';

const initialState = {
    friendAlbumList: [],
    friendAlbum: [],
};

const friendAlbumListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FRIEND_ALBUM_LIST_LOADING_REQUEST:
        case FRIEND_ALBUM_LIST_LOADING_SUCCESS:
            return {
                ...state,
                friendAlbumList: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

const friendAlbumReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FRIEND_ALBUM_LOADING_REQUEST:
        case FRIEND_ALBUM_LOADING_SUCCESS:
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

export { friendAlbumListReducer, friendAlbumReducer };
