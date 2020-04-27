import {
    GET_SPECIFIC_COUNTRY_STATS,
  } from '../actions/types';
  
/* export default function getSpecificCountryStats(countryStats) {
    return (dispatch) => {
      dispatch(getCountryStats(countryStats))
  } 
} */
export default function getSpecificCountryStats(countryStats) {
    return {
      type: GET_SPECIFIC_COUNTRY_STATS,
      payload: countryStats
    };
  }
