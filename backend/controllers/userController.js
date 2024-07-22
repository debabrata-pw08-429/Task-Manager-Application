const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Registers a new user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the created user or an error message
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, photoUrl } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      photoUrl,
    });

    // Return the created user
    res.status(201).json(user);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

/**
 * Logs in a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the token and user data or an error message
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the token and user data
    res.status(200).json({ token, user });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

/**
 * Deletes a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with a success message or an error message
 */
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.user;

    // Delete the user
    await User.deleteOne({ email });

    // Return a success message
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: error.message,
      customMessage: "Error in deleteUser controller",
    });
  }
};
