import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import {thunk} from 'redux-thunk'; // Corrected import
import rootReducer from '../Reducers/index'; // Ensure this matches your file system

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer, // Corrected variable name
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
