import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

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
			setAuthToken(token);

			// Decode token and extract user data
			const decodedToken = jwt_decode(token);
			dispatch(setCurrentUser(decodedToken));
			dispatch(setAuthTimeout(decodedToken));
		})
		.catch(err =>
			dispatch({
				type: actions.GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const logoutUser = () => {
	// Remove the token localStorage if it exists
	if (localStorage.jwtToken) {
		localStorage.removeItem("jwtToken");
	}

	return {
		type: actions.AUTH_LOGOUT_USER
	};
};

// Set logged in user
export const setCurrentUser = decodedToken => {
	return {
		type: actions.AUTH_SET_CURRENT_USER,
		payload: decodedToken
	};
};

// Authentication is automatically removed based on the
// token exp and iat properties set by the server.
export const setAuthTimeout = decodedToken => {
	return dispatch => {
		let expirationInMilliseconds = 3600000; // default to an hour

		if (decodedToken.exp) {
			expirationInMilliseconds = (new Date(decodedToken.exp) - new Date(decodedToken.iat)) * 1000;
		}

		//console.log("token expiration: ", expirationInMilliseconds);
		setTimeout(() => {
			dispatch(logoutUser());
		}, expirationInMilliseconds);
	};
};

// Check for token persistance in local Storage
export const checkAuthentication = () => {
	return dispatch => {
		if (localStorage.jwtToken) {
			// Set auth token header
			setAuthToken(localStorage.jwtToken);

			// Decode and set user info and expiration
			const decodedToken = jwt_decode(localStorage.jwtToken);
			dispatch(setCurrentUser(decodedToken));
			dispatch(setAuthTimeout(decodedToken));
		} else {
			dispatch(logoutUser());
		}
	};
};
