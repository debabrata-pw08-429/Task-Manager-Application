const express = require("express");
const router = express.Router();
const {
  register,
  login,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", register);

// @route   POST /api/users/login
// @desc    Authenticate user and get token
// @access  Public
router.post("/login", login);

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get("/me", protect, (req, res) => {
  res.send(req.user);
});

// @route   DELETE /api/users/delete
// @desc    Delete current user
// @access  Private
router.delete("/delete", protect, deleteUser);

module.exports = router;
