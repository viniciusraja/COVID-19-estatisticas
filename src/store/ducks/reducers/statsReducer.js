import {
  FETCH_COVIDSTATS_PENDING,
  FETCH_COVIDSTATS_SUCCESS,
  FETCH_COVIDSTATS_ERROR,
  TRANSLATE_COVIDSTATS_COUNTRY_NAME,
  GET_SPECIFIC_COUNTRY_STATS
} from '../actions/types';
import countriesDataPt from '../../data/countriesDataPt.json';

const initialState = {
  pending: false,
  COVIDStats: [],
  COVIDStatsTranslated: [],
  CountryStats:[],
  error: false,
};

const COVIDStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSLATE_COVIDSTATS_COUNTRY_NAME:
      return {
        ...state,
        COVIDStatsTranslated: [
          ...action.payload.map((country, index) => {
            let item={}
            let name=''
            for (let i = 0; i < countriesDataPt.length; i++) {
              if (countriesDataPt[i].id == country.countryInfo._id) {
                item=country;
                name=countriesDataPt[i].name
              }
              
            }
            return{
              ...item,
              country:name
            }
          }),
        ],
      };
    case FETCH_COVIDSTATS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_COVIDSTATS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: false,
        COVIDStats: [...action.payload],
      };
    case FETCH_COVIDSTATS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case GET_SPECIFIC_COUNTRY_STATS:
      return {
        ...state,
        CountryStats:action.payload
      }
      
    default:
      return state;
  }
};

export default COVIDStatsReducer;
