/*
  Experience FORM VALIDATION
*/

const Validator = require("validator");
const isEmpty = require("./is-empty");

// NOTE: All validation is string-based
module.exports = validateExperienceInput = data => {
	let errors = {};

	// Convert empty object properties to empty string, and
	// Gracefully error out in case form is not submitted as
	// x-www-form-urlencoded
	data.title = !isEmpty(data.title) ? data.title : "";
	data.company = !isEmpty(data.company) ? data.company : "";
	data.from = !isEmpty(data.from) ? data.from : "";

	// Job Title required
	if (Validator.isEmpty(data.title)) {
		errors.title = "Job title is required";
	}

	// Company name required
	if (Validator.isEmpty(data.company)) {
		errors.company = "Company name is required";
	}

	// From Date required
	if (Validator.isEmpty(data.from)) {
		errors.from = "From Date is required";
	}

	return { errors, isValid: isEmpty(errors) }; // returns boolean based on errors object being empty or not
};
