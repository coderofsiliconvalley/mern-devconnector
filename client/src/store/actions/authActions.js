import * as actions from "./actionTypes";
import axios from "axios";

// Register user
export const registerUser = userData => dispatch => {
	axios
		.post("/api/users/register", userData)
		.then(result => {
			console.log(result.data);

			// Clear errors - all is good
			this.setState({ errors: {} });
		})
		.catch(err =>
			dispatch({
				type: actions.GET_ERRORS,
				payload: err.response.data
			})
		);
	// return {
	// 	type: actions.TEST_DISPATCH,
	// 	payload: userData
	// };
};

// NOTE: Test submit - to be moved to Redux reducer
// 		i.e. this.props.onSubmitForm
