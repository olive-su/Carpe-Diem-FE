import {
    USER_LOADING_REQUEST,
    USER_LOADING_SUCCESS,
    USER_LOADING_FAILURE,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,
    USIM_LOADING_REQUEST,
    USIM_LOADING_SUCCESS,
    USIM_LOADING_FAILURE,
} from '../types';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    errorMsg: '',
    successMsg: '',
    userId: '',
    email: '',
    nickname: '',
    usim: [],
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_LOADING_REQUEST:
            return {
                ...state,
                errorMsg: '',
                isLoading: true,
            };

        case USER_LOADING_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.user_id,
                email: action.payload.email,
                nickname: action.payload.nickname,
            };

        case USER_LOGOUT_REQUEST:
        case USER_LOGOUT_SUCCESS:
        case USER_LOADING_FAILURE:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLoading: false,
            };
        default:
            return state;
    }
};

const usimReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USIM_LOADING_REQUEST:
        case USIM_LOADING_SUCCESS:
            return {
                ...state,
                usim: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export { authReducer, usimReducer };
