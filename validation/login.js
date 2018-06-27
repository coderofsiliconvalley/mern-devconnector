/*
  LOGIN/SIGN IN FORM VALIDATION
*/

const Validator = require("validator");
const isEmpty = require("./is-empty");

// NOTE: All validation is string-based
module.exports = validateLoginInput = data => {
  let errors = {};

  // Convert empty object properties to empty string, and
  // Gracefully error out in case form is not submitted as
  // x-www-form-urlencoded
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email regex
  if (!Validator.isEmail(data.email)) {
    errors.email = "Not a valid email address";
  }

  // Email required
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // Password Min and Max length
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Invalid Password";
  }

  // Password required
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return { errors, isValid: isEmpty(errors) }; // returns boolean based on errors object being empty or not
};
