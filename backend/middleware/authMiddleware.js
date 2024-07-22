const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware to protect routes by verifying JWT token.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header is present and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID and exclude the password field
      req.user = await User.findById(decoded.id).select("-password");

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle token verification errors
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // Handle missing token error
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
