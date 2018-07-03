import * as actionTypes from "../actions/actionTypes";
import isEmpty from "../../validation/is-empty";

const initialState = {
	isAuthenticated: false,
	user: {},
	//TODO:
	redirectURL: "/dashboard",
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_SET_CURRENT_USER:
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
