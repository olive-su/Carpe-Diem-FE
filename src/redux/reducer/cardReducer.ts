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
    CARD_LIST_FILTER_DATE,
    CARD_LIST_FILTER_EXPRESSION,
    CARD_LIST_FILTER_EXPRESSION_SUCCESS,
} from '../types';

const initialState = {
    cardList: [],
    card: [],
};
const expressions = ['happy', 'sad', 'angry', 'disgusted', 'fearful', 'surprised'];

const cardListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        /**
         * 카드 리스트 조회 시 해당 case를 같이 써주게 되면 cardList 변수의 타입 변경으로(number) 카드 리스트가 보이지 않게되는 이슈가 있음
         * 해당 case를 주석 처리해도 현재는 카드 리스트를 불러오는데 혹시 몰라서 주석으로 처리해놓았습니다.
         * case CARD_LIST_LOADING_REQUEST:
         */
        case CARD_LIST_LOADING_SUCCESS:
        case CARD_LIST_FILTER_EXPRESSION_SUCCESS:
            return {
                ...state,
                cardList: [...state.cardList, ...action.payload],
            };
        case CARD_LIST_FILTER_EXPRESSION:
            console.log('cardReducer', action.payload);
            console.log('state.cardList');
            console.log(state.cardList.filter((card: any) => action.payload[expressions.indexOf(card.expressionLabel, 0)] === true));
            return {
                ...state,
                cardList: state.cardList.filter((card: any) => action.payload[expressions.indexOf(card.expressionLabel, 0)] === true),
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
