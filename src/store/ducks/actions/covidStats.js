import {FETCH_COVIDSTATS_PENDING, FETCH_COVIDSTATS_SUCCESS, FETCH_COVIDSTATS_ERROR} from './types'
import api from '../../../services/api'

function fetchCOVIDStats(req) {
    return dispatch => {
        dispatch(fetchCOVIDStatsPending());

        api
        .get(req)
        .then(res => {
            dispatch(fetchCOVIDStatsSuccess(res.data))
        })
        .catch(error => {
            dispatch(fetchCOVIDStatsError(error));
        })
    }
}

export default fetchCOVIDStats;




function fetchCOVIDStatsPending() {
    return {
        type: FETCH_COVIDSTATS_PENDING
    }
}

function fetchCOVIDStatsSuccess(COVIDStats) {
    return {
        type: FETCH_COVIDSTATS_SUCCESS,
        payload:{...COVIDStats}
    }
}

function fetchCOVIDStatsError(error) {
    return {
        type: FETCH_COVIDSTATS_ERROR,
        payload: {error}
    }
}


