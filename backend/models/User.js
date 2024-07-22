const mongoose = require("mongoose");

// Define the user schema with appropriate fields and validation
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    photoUrl: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
