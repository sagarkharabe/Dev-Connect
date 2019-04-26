const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = validatePostInput = data => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is Required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
