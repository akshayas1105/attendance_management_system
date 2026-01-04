const express = require("express");
const router = express.Router();
const attendanceRecords = [];

const isAuthenticated = require("../middleware/auth.middleware");
const isTeacher = require("../middleware/isTeacher");
const isAdmin = require("../middleware/role.middleware");

router.post("/mark", isAuthenticated, isAdmin, (req, res) => {
  const { studentName, status } = req.body;

  attendanceRecords.push({
    studentName,
    status,
  });

  res.send("Attendance marked successfully");
});

router.get("/view", isAuthenticated, (req, res) => {
  const username = req.session.user.username;

  const studentAttendance = attendanceRecords.filter(
    record => record.studentName === username
  );

  res.json(studentAttendance);
});

module.exports = router;

