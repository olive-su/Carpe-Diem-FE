import {
    CARD_LIST_LOADING_REQUEST,
    CARD_LIST_LOADING_SUCCESS,
    CARD_LIST_LOADING_FAILURE,
    CARD_LOADING_REQUEST,
    CARD_LOADING_SUCCESS,
    CARD_LOADING_FAILURE,
    CARD_UPDATE_REQUEST,
    CARD_UPDATE_SUCCESS,
    CARD_UPDATE_FAILURE,
    CARD_DELETE_REQUEST,
    CARD_DELETE_SUCCESS,
    CARD_DELETE_FAILURE,
    CARD_LIST_FILTER_EXPRESSION,
    CARD_LIST_FILTER_EXPRESSION_SUCCESS,
} from '../types';

const initialState = {
    cardList: [],
    card: [],
};
const expressions = ['happy', 'sad', 'angry', 'disgusted', 'fearful', 'surprised'];
let cardlist;
const cardListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CARD_LIST_LOADING_SUCCESS:
            cardlist = [...action.payload.result];
            return {
                ...state,
                cardList: cardlist?.filter((card: any) => action.payload.checked[expressions.indexOf(card.expressionLabel, 0)] === true),
            };
        default:
            return {
                ...state,
            };
    }
};

const cardReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CARD_LOADING_REQUEST:
        case CARD_LOADING_SUCCESS:
            return {
                ...state,
                card: action.payload,
            };
        case CARD_UPDATE_SUCCESS:
        case CARD_DELETE_SUCCESS:
            return {
                ...state,
                card: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export { cardListReducer, cardReducer };
