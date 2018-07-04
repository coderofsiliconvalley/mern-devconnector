import axios from "axios";

import * as actionTypes from "../actions/actionTypes";

// Profile loading status
export const setProfileLoading = () => {
	return {
		type: actionTypes.PROFILE_LOADING
	};
};

// Clear profile
export const clearCurrentProfile = () => {
	return {
		type: actionTypes.PROFILE_CLEAR_CURRENT
	};
};

// Get current user profile
export const getCurrentProfile = () => dispatch => {
	// Begin the profile retrieval process - get that spinner rolling
	dispatch(setProfileLoading());

	// Retrieving profile from server
	axios
		.get("/api/profile")
		.then(result =>
			dispatch({
				type: actionTypes.PROFILE_GET,
				payload: result.data
			})
		)
		.catch(err =>
			dispatch({
				type: actionTypes.PROFILE_GET,
				payload: {}
			})
		);
};
