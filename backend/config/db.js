const mongoose = require("mongoose");

/**
 * Connect to MongoDB database.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
