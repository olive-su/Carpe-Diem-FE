import { ALBUM_LIST_LOADING_REQUEST, ALBUM_LIST_LOADING_SUCCESS, ALBUM_LIST_LOADING_FAILURE } from '../types';

const initialState = {
    albumList: [],
    // albums:
};

const albumReducer = (state = initialState, action: any) => {
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

export default albumReducer;
