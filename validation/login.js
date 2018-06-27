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
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name Min and Max length
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  // Name required
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

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
    errors.password = "Password must be at least 6 characters";
  }

  // Password required
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  // Password compare
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  // Password Confirm required
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }

  return { errors, isValid: isEmpty(errors) }; // returns boolean based on errors object being empty or not
};
