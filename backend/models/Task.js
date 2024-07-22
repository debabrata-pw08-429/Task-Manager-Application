const mongoose = require("mongoose");

// Define the task schema with appropriate fields and validation
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
      default: "TODO",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Middleware to update the updatedAt field before saving a task
taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Task model from the schema
const Task = mongoose.model("Task", taskSchema);

// Export the Task model
module.exports = Task;
