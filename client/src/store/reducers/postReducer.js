import * as actionTypes from "../actions/actionTypes";

const initialState = {
	posts: [],
	post: {},
	loading: false
};

export default (render = (state = initialState, action) => {
	switch (action.type) {
		default:
			return {
				...state
			};
	}
});
