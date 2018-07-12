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
				payload: err.repsonse.data
			})
		);
};
