import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import * as actions from "./actions/index";

const initialState = {};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

if (localStorage.jwtToken) {
	// Set auth token header
	setAuthToken(localStorage.jwtToken);

	// Decode and set user info and expiration
	const decodedToken = jwt_decode(localStorage.jwtToken);
	store.dispatch(actions.setCurrentUser(decodedToken));
}

export default store;
