import * as actionTypes from "../actions/actionTypes";
//import isEmpty from "../../validation/is-empty";

const initialState = {
	profile: null,
	profiles: null,
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PROFILE_LOADING:
			return {
				...state,
				loading: true
			};
		case actionTypes.PROFILE_GET:
			return {
				...state,
				profile: action.payload,
				loading: false
			};
		case actionTypes.PROFILE_CLEAR_CURRENT:
			return {
				...state,
				profile: null
			};
		case actionTypes.PROFILE_ADD_EXPERIENCE:
			return {
				...state
			};
		case actionTypes.PROFILE_ADD_EXPERIENCE:
			return {
				...state
			};
		default:
			return state;
	}
};

export default reducer;
