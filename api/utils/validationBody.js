const { validationResult } = require("express-validator");

module.exports = (req) => {
  const errors = validationResult(req).array();
  if (errors.length) {
    const error = new Error(`${errors[0].path} ${errors[0].msg}`);
    error.statusCode = 422;
    throw error;
  }
};
