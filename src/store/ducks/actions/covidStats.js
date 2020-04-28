import {
  FETCH_COVIDSTATS_PENDING,
  FETCH_COVIDSTATS_SUCCESS,
  FETCH_COVIDSTATS_ERROR,
  TRANSLATE_COVIDSTATS_COUNTRY_NAME,
} from '../actions/types';
import api from '../../../services/api';

export default function fetchCOVIDStats(req) {
  return (dispatch) => {
    if (req === 'all') {
      dispatch(fetchCOVIDStatsPending())
      api
        .get(req)
        .then((resWolrd) => {
          dispatch(fetchCOVIDStatsSuccess(resWolrd.data));
        })
        .catch((error) => {
          dispatch(fetchCOVIDStatsError(error));
        });
    }else{
      dispatch(fetchCOVIDStatsPending())
    api
      .get(req)
      .then((resCountry) => {
        dispatch(fetchCOVIDStatsTranslated(resCountry.data));
      })
      .catch((error) => {
        dispatch(fetchCOVIDStatsError(error));
      });
  }
}
}

function fetchCOVIDStatsPending() {
  return {
    type: FETCH_COVIDSTATS_PENDING,
  };
}

function fetchCOVIDStatsSuccess(COVIDStats) {
  return {
    type: FETCH_COVIDSTATS_SUCCESS,
    payload: COVIDStats,
  };
}

function fetchCOVIDStatsError(error) {
  return {
    type: FETCH_COVIDSTATS_ERROR,
    payload: { error },
  };
}

function fetchCOVIDStatsTranslated(COVIDStats) {
  return {
    type: TRANSLATE_COVIDSTATS_COUNTRY_NAME,
    payload: COVIDStats,
  };
}
