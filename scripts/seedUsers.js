const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/user"); // lowercase to match your filename

const seedUsers = async () => {
  await connectDB();

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "user123", role: "user" },
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
