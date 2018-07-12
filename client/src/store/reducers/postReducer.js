import * as actionTypes from "../actions/actionTypes";

const initialState = {
	posts: [],
	post: {},
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.POST_LOADING:
			return {
				...state,
				loading: true
			};
		case actionTypes.POST_GET_ALL:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case actionTypes.POST_ADD:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		default:
			return {
				...state
			};
	}
};

export default reducer;
