import axios from "axios";

// Load Redux actions
import * as actionTypes from "../actions/actionTypes";

// Add new post
export const addPost = postData => dispatch => {
	axios
		.post("/api/posts", postData)
		.then(res =>
			dispatch({
				type: actionTypes.POST_ADD,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Get All Posts
export const getPostsAll = () => dispatch => {
	// Start the spinner
	dispatch(setPostLoading());

	axios
		.get("/api/posts")
		.then(res =>
			dispatch({
				type: actionTypes.POST_GET_ALL,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: actionTypes.POST_GET_ALL,
				payload: null
			})
		);
};

// Set loading state
export const setPostLoading = () => {
	return {
		type: actionTypes.POST_LOADING
	};
};
