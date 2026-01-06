const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/user"); // lowercase to match your filename

const seedUsers = async () => {
  await connectDB();

  const users = [
    { username: "teacher1", password: "admin123", role: "teacher" },
    { username: "student1", password: "user123", role: "student" },
     { username: "teacher2", password: "admin234", role: "teacher" },
    { username: "student2", password: "user234", role: "student" },
     { username: "teacher3", password: "admin345", role: "teacher" },
    { username: "student3", password: "user345", role: "student" },
  ];

  for (const u of users) {
    const exists = await User.findOne({ username: u.username });
    if (!exists) {
      await User.create(u);
      console.log(`User ${u.username} created`);
    }
  }

  mongoose.connection.close();
};

seedUsers();
