const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true },
  date: { type: Date, default: Date.now }, // track when attendance was marked
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;
