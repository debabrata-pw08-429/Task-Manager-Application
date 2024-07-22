/**
 * Custom error class for handling HTTP errors.
 * @extends Error
 */
class ErrorResponse extends Error {
  /**
   * Create an error response.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code.
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
