/*
  PROFILE FORM VALIDATION
*/

const Validator = require("validator");
const isEmpty = require("./is-empty");

// NOTE: All validation is string-based
module.exports = validateProfileInput = data => {
	let errors = {};

	// Convert empty object properties and form fields to empty string, and
	// Gracefully error out in case form is not submitted as
	// x-www-form-urlencoded
	data.handle = !isEmpty(data.handle) ? data.handle : "";
	data.status = !isEmpty(data.status) ? data.status : "";
	data.skills = !isEmpty(data.skills) ? data.skills : "";

	// Handle min and max length
	if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
		errors.handle = "Handle must be between 2 and 40 characters";
	}

	// Handle alphanumeric
	if (!Validator.isAlphanumeric(data.handle)) {
		errors.handle = "Handle can only contain numbers and leters";
	}
	// Handle required
	if (Validator.isEmpty(data.handle)) {
		errors.handle = "Profile handle is required";
	}

	// Status required
	if (Validator.isEmpty(data.status)) {
		errors.status = "Status is required";
	}

	// Skills required
	if (Validator.isEmpty(data.skills)) {
		errors.skills = "Skills are required";
	}

	// Web Site - Not required
	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = "Not a valid URL";
		}
	}

	// Social YouTube - Not Required
	if (!isEmpty(data.youtube)) {
		if (!Validator.isURL(data.youtube)) {
			errors.youtube = "Not a valid YouTube URL";
		}
	}

	// Social Twitter - Not Required
	if (!isEmpty(data.twitter)) {
		if (!Validator.isURL(data.twitter)) {
			errors.twitter = "Not a valid Twitter URL";
		}
	}

	// Social Facebook - Not Required
	if (!isEmpty(data.facebook)) {
		if (!Validator.isURL(data.facebook)) {
			errors.facebook = "Not a valid Facebook URL";
		}
	}

	// Social LinkedIn - Not Required
	if (!isEmpty(data.linkedin)) {
		if (!Validator.isURL(data.linkedin)) {
			errors.linkedin = "Not a valid LinkedIn URL";
		}
	}

	// Social Instagram - Not Required
	if (!isEmpty(data.instagram)) {
		if (!Validator.isURL(data.instagram)) {
			errors.instagram = "Not a valid Instagram URL";
		}
	}

	return {
		errors,
		isValid: isEmpty(errors) // returns boolean based on errors object being empty or not
	};
};
