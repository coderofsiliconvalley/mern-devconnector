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
		})
		.catch(err =>
			dispatch({
				type: actions.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set logged in user
export const setCurrentUser = decodedToken => {
	console.log("set current user dispatched: ", decodedToken);
	return {
		type: actions.AUTH_SET_CURRENT_USER,
		payload: decodedToken
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
		}
	};
};
