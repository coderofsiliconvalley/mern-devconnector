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

// Get All Posts
export const getPost = postId => dispatch => {
	// Start the spinner
	dispatch(setPostLoading());

	axios
		.get(`/api/posts/${postId}`)
		// Return a single post payload
		.then(res =>
			dispatch({
				type: actionTypes.POST_GET,
				payload: res.data
			})
		)
		// Return null otherwise
		.catch(err =>
			dispatch({
				type: actionTypes.POST_GET,
				payload: null
			})
		);
};

// Delete Post By Id
export const deletePostById = postId => dispatch => {
	axios
		.delete(`/api/posts/${postId}`)
		.then(res =>
			dispatch({
				type: actionTypes.POST_DELETE,
				payload: postId // Send the post id for removing form local store
			})
		)
		.catch(err =>
			dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Add Like
export const addLike = postId => dispatch => {
	axios
		.post(`/api/posts/like/${postId}`)
		.then(res =>
			// Just return all the posts
			dispatch(getPostsAll())
		)
		.catch(err =>
			dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Delete Like
export const delLike = postId => dispatch => {
	axios
		.post(`/api/posts/unlike/${postId}`)
		.then(res =>
			// Just return all the posts
			dispatch(getPostsAll())
		)
		.catch(err =>
			dispatch({
				type: actionTypes.GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set loading state
export const setPostLoading = () => {
	return {
		type: actionTypes.POST_LOADING
	};
};

// Reply to a post
export const addComment = (postId, commentData) => dispatch => {
	axios
		.post(`/api/posts/comment/${postId}`, commentData)
		.then(res =>
			dispatch({
				type: actionTypes.POST_GET, // Refresh the post - comments are sub-array
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

// Reply to a post
export const delComment = (postId, commentId) => dispatch => {
	axios
		.delete(`/api/posts/comment/${postId}/${commentId}`)
		.then(res =>
			dispatch({
				type: actionTypes.POST_GET, // Refresh the post - comments are a sub-array
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
