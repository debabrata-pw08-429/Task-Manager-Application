const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Initialize Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Define API routes
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Error handling middleware
app.use(errorHandler);

// Start the server and listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
