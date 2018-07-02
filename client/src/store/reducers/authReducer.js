import * as actionTypes from "../actions/actionTypes";
import isEmpty from "../../validation/is-empty";

const initialState = {
	isAuthenticated: false,
	user: {},
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		default:
			return state;
	}
};

export default reducer;
