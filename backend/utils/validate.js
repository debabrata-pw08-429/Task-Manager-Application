const { validationResult } = require("express-validator");

/**
 * Middleware function to validate request data.
 * Uses express-validator to check if there are any validation errors.
 * If errors are found, responds with a 400 status code and the errors in JSON format.
 * If no errors are found, proceeds to the next middleware or route handler.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const validate = (req, res, next) => {
  // Retrieve validation results from the request
  const errors = validationResult(req);

  // Check if there are any validation errors
  if (!errors.isEmpty()) {
    // Respond with a 400 status code and a JSON object containing the validation errors
    return res.status(400).json({ errors: errors.array() });
  }

  // If no validation errors, proceed to the next middleware or route handler
  next();
};

module.exports = validate;
