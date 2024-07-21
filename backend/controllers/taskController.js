const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    console.log("req.body", req.body);

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    const task = await Task.create({ title, description, status });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status, updatedAt: Date.now() },
      { new: true }
    );

    await task.save();

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const Alltasks = await Task.find();

    res.status(200).json(Alltasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
