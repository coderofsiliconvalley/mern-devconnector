import axios from "axios";

import { logoutUser } from "./authActions";

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

// Create a new profile
export const createProfile = (profileData, history) => dispatch => {
	axios
		.post("/api/profile", profileData)
		.then(result => history.push("/dashboard"))
		.catch(err => {
			dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const deleteAccount = () => dispatch => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		axios
			.delete("/api/profile")
			.then(res => {
				// Profile and User collections we're succesfully removed
				// Now logout to clear all the user and profile store properties
				dispatch(logoutUser());
			})
			.catch(err =>
				dispatch({
					type: actionTypes.GET_ERRORS,
					payload: err.response.data
				})
			);
	}
};

// Add Experience entry to the user's stored profile
export const addExperience = (expData, history) => dispatch => {
	axios
		.post("/api/profile/experience", expData)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Delete Experience entry from the user's stored profile
export const deleteExperience = expId => dispatch => {
	axios
		.delete(`/api/profile/experience/${expId}`)
		.then(res =>
			// Get the new user profile from the server
			dispatch({
				type: actionTypes.PROFILE_GET,
				payload: res.data
			})
		)
		.catch(err =>
			// Errors? Pass them on
			dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Add and Education entry to the user's stored profile
export const addEducation = (eduData, history) => dispatch => {
	axios
		.post("/api/profile/education", eduData)
		.then(res => history.push("/dashboard"))
		.catch(err =>
			dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Delete Education entry from the user's stored profile
export const deleteEducation = eduId => dispatch => {
	axios
		.delete(`/api/profile/education/${eduId}`)
		.then(res =>
			// Get the new user profile from the server
			dispatch({
				type: actionTypes.PROFILE_GET,
				payload: res.data
			})
		)
		.catch(err =>
			// Errors? Pass them on
			dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data
			})
		);
};
