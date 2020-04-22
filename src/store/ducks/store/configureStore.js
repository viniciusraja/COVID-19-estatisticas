import { createStore, combineReducers, applyMiddleware } from 'redux';
import COVIDStatsReducer from '../reducers/statsReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  COVIDStatsReducer,
});

const configureStore = () =>
  createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
