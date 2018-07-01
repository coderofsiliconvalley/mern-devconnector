import * as actions from "../actions/actionTypes";

const initialState = {
	// isAuthenticated: false,
	// user: {},
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.GET_ERRORS:
			return {
				...state
				//user: action.payload
			};
		default:
			return state;
	}
};

export default reducer;
