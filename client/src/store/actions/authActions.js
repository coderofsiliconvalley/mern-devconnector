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
			history.push("/login");

			// Clear errors - all is good
			// TODO: Add dispatch to clear errors
			// this.setState({ errors: {} });
		})
		.catch(err =>
			dispatch({
				type: actions.GET_ERRORS,
				payload: err.response.data
			})
		);
	// return {
	// 	type: actions.TEST_DISPATCH,
	// 	payload: userData
	// };
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
	return {
		type: actions.SET_CURRENT_USER,
		payload: decodedToken
	};
};
