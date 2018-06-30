/*
  POSTS FORM VALIDATION
*/

const Validator = require("validator");
const isEmpty = require("./is-empty");

// NOTE: All validation is string-based
module.exports = validatePostInput = data => {
	let errors = {};

	// Convert empty object properties to empty string, and
	// Gracefully error out in case form is not submitted as
	// x-www-form-urlencoded
	data.text = !isEmpty(data.text) ? data.text : "";
	// data.name = !isEmpty(data.name) ? data.name : "";
	// data.avatar = !isEmpty(data.avatar) ? data.avatar : "";

	// Text length
	if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
		errors.text = "Post must be between 10 and 300 characters";
	}

	// Text required
	if (Validator.isEmpty(data.text)) {
		errors.text = "Text field is required";
	}

	// // Name required
	// if (Validator.isEmpty(data.name)) {
	// 	errors.name = "Name is required";
	// }

	// // Avatar required
	// if (Validator.isEmpty(data.avatar)) {
	// 	errors.avatar = "Avatar is required";
	// }

	return { errors, isValid: isEmpty(errors) }; // returns boolean based on errors object being empty or not
};
