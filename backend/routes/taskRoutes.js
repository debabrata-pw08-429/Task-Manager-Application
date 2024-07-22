const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

// @route   GET /api/tasks
// @desc    Get all tasks
// @access  Private
router.get("/", protect, getTasks);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post("/", protect, createTask);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put("/:id", protect, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete("/:id", protect, deleteTask);

module.exports = router;
