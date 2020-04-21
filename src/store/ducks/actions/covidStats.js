import './types'
import api from '../../../services/api'

function fetchCOVIDStats() {
    return dispatch => {
        dispatch(fetchCOVIDStatsPending());

        api
        .get('total/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchCOVIDStatsSuccess(res.COVIDStats))
            return res.COVIDStats;
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


