import {
    GET_DISPLAYED_STATS,
  } from '../actions/types';
  
export default function getDisplayedStats(stats) {
    return {
      type: GET_DISPLAYED_STATS,
      payload: stats
    };
  }
