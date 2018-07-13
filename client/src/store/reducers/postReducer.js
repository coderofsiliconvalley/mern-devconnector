import * as actionTypes from "../actions/actionTypes";

const initialState = {
	posts: [],
	post: {},
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.POST_LOADING: // Start the spinner
			return {
				...state,
				loading: true
			};
		case actionTypes.POST_GET_ALL: // Get all posts TODO: inifinte scrolling
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case actionTypes.POST_GET: // Get single post
			return {
				...state,
				post: action.payload,
				loading: false
			};
		case actionTypes.POST_ADD: // Add a post
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		case actionTypes.POST_DELETE: // Delete a post
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload)
			};
		default:
			return {
				...state
			};
	}
};

export default reducer;
