const express = require("express");
const router = express.Router();
const Attendance=require("../models/attendance");

const isAuthenticated = require("../middleware/auth.middleware");
const isTeacher = require("../middleware/isTeacher");
const path = require("path");


//Marking done by teachers
router.post("/mark", isAuthenticated, isTeacher, async(req, res) => {
  const { studentName, status } = req.body;
try {
    const record = await Attendance.create({ studentName, status });
    res.send(`Attendance marked for ${record.studentName} as ${record.status}`);
  } catch (err) {
    console.error(err);
    res.send("Error marking attendance");
  }
 
  });

  
//View attendance(for students)
router.get("/data", isAuthenticated, async(req, res) => {
  const { username, role } = req.session.user;
  
  // ✅ Step 1: Always define filter first
  let filter = {};

  // ✅ Step 2: If student → restrict data
  if (role === "student") {
    filter.studentName = username;
  }

  // ✅ Step 3: If date is passed → apply date filter
  if (req.query.date) {
    const selectedDate = new Date(req.query.date);

    const start = new Date(selectedDate);
    start.setHours(0,0,0,0)
    const end = new Date(selectedDate);
    end.setHours(23, 59, 59, 999);

    filter.date = { $gte: start, $lte: end };
  }

  try {
    const records = await Attendance.find(filter).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.send("Error fetching attendance");
  }
});


// Serve mark attendance form
router.get("/mark-form", isAuthenticated, isTeacher, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/markAttendance.html"));
});

// Serve view attendance page
router.get("/view", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/viewAttendance.html"));
});


module.exports = router;

