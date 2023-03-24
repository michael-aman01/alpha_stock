import {createStore, compose} from 'redux'
import SessionReducer  from './session';
import { combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import StocksReducer from './stocks';


const rootReducer = combineReducers({
    session: SessionReducer,
    stocks: StocksReducer
})
let enhancer

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  }
const configureStore = preLoadedState => {
    return createStore(rootReducer, preLoadedState, enhancer)
}

export default configureStore;