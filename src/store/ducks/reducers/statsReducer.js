import {FETCH_COVIDSTATS_PENDING, FETCH_COVIDSTATS_SUCCESS, FETCH_COVIDSTATS_ERROR} from './actions';

const initialState = {
    pending: false,
    COVIDStats: [],
    error: null
}

export function COVIDStatsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_COVIDSTATS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_COVIDSTATS_SUCCESS:
            return {
                ...state,
                pending: false,
                COVIDStats: action.payload
            }
        case FETCH_COVIDSTATS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }
        default: 
            return state;
    }
}

export const getCOVIDStats = state => state.COVIDStats;
export const getCOVIDStatsPending = state => state.pending;
export const getCOVIDStatsError = state => state.error;