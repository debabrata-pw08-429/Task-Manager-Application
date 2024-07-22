/**
 * Custom error handler middleware for Express.
 * @param {Object} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // If the response status code is 200 (OK), set it to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Set the response status code
  res.status(statusCode);

  // Send a JSON response with the error message and stack trace (if not in production)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
