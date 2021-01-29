import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];
const reducers = combineReducers({});

const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middleware)
));

export default store;
