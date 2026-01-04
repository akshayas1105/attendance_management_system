const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/attendance_db");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed", error);
  }
};

module.exports = connectDB;
