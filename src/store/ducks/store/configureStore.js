import { createStore, combineReducers, applyMiddleware } from 'redux';
import playerReducer from '../reducers/playerReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  playerReducer,
});

const configureStore = () =>
  createStore(rootReducer, initialState, applyMiddleware(thunk));

export default configureStore;
