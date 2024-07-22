const Task = require("../models/Task");

/**
 * Creates a new task.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the created task or an error message
 */
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Log the request body for debugging purposes
    console.log("req.body", req.body);

    // Check for required fields
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // Create the task
    const task = await Task.create({ title, description, status });

    // Return the created task
    res.status(201).json(task);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves all tasks.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with an array of tasks or an error message
 */
exports.getTasks = async (req, res) => {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.find();

    // Return the tasks
    res.status(200).json(tasks);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

/**
 * Updates a task by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with the updated tasks or an error message
 */
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Find the task by ID and update it
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status, updatedAt: Date.now() },
      { new: true }
    );

    // Save the updated task
    await task.save();

    // If the task is not found, return a 404 error
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Fetch all tasks from the database to return the updated list
    const allTasks = await Task.find();

    // Return the updated list of tasks
    res.status(200).json(allTasks);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};

/**
 * Deletes a task by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with a success message or an error message
 */
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the task by ID and delete it
    const task = await Task.findByIdAndDelete(id);

    // If the task is not found, return a 404 error
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Return a success message
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
};
