import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthTokenRequestHeader from "../../utils/setAuthToken";

import * as actions from "./actionTypes";

// Register user
export const registerUser = (userData, history) => dispatch => {
	axios
		.post("/api/users/register", userData)
		.then(result => {
			// Redirect
			// TODO: URL Recdirect from login page
			history.push("/login");
		})
		.catch(err =>
			dispatch({
				type: actions.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Login and store user token
export const loginUser = userData => dispatch => {
	axios
		.post("/api/users/login", userData)
		.then(result => {
			// Save token to loacal storage
			const { token } = result.data;
			localStorage.setItem("jwtToken", token);

			// Set Auth header to new token
			setAuthTokenRequestHeader(token);

			// Decode token and extract user data
			const decodedToken = jwt_decode(token);
			dispatch(setCurrentUser(decodedToken)); // User info in auth redux state
			dispatch(setAuthTimeout(decodedToken)); // Begin countdown to expired token
		})
		.catch(err =>
			dispatch({
				type: actions.GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const logoutUser = history => dispatch => {
	// Remove the token localStorage if it exists
	localStorage.removeItem("jwtToken");

	// Remove token from auth header
	setAuthTokenRequestHeader(false);

	// Clear authenticated state and user info from auth store
	dispatch(setCurrentUser({}));
};

// Set logged in user
export const setCurrentUser = decodedToken => {
	return {
		type: actions.AUTH_SET_CURRENT_USER,
		payload: decodedToken
	};
};

// Authentication is automatically removed based on the
// jwt token exp property set by the server.
export const setAuthTimeout = decodedToken => {
	return dispatch => {
		//let expirationInMilliseconds = 3600000; // default to an hour is no exp property is found in token

		const currentTimestamp = new Date().getTime();
		const expirationTimestamp = new Date(decodedToken.exp) * 1000;

		// If token has not expired, then start countdown
		if (expirationTimestamp >= currentTimestamp) {
			const expirationInMilliseconds = expirationTimestamp - currentTimestamp; // * 1000;

			//console.log("token has not expired. starting count down...", expirationInMilliseconds);

			setTimeout(() => {
				dispatch(logoutUser());
			}, expirationInMilliseconds);
		} else {
			// Otherwise, token has expired Logout right away
			dispatch(logoutUser());
		}
	};
};

// Check for token persistance in local Storage
export const checkAuthentication = () => {
	return dispatch => {
		if (localStorage.jwtToken) {
			// Set auth token to request headers
			setAuthTokenRequestHeader(localStorage.jwtToken);

			// Decode token and set auth.user state and start token expiration countdown
			const decodedToken = jwt_decode(localStorage.jwtToken);
			dispatch(setCurrentUser(decodedToken));
			dispatch(setAuthTimeout(decodedToken));
		} else {
			dispatch(logoutUser());
		}
	};
};
