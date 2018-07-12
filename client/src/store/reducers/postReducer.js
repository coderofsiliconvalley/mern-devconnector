import * as actionTypes from "../actions/actionTypes";

const initialState = {
	posts: [],
	post: {},
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.POST_ADD:
			return {
				...state,
				post: action.payload
			};
		default:
			return {
				...state
			};
	}
};

export default reducer;
