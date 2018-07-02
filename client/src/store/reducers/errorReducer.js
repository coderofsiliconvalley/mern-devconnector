import * as actions from "../actions/actionTypes";

const initialState = {
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.GET_ERRORS:
			return action.payload;
		default:
			return state;
	}
};

export default reducer;
