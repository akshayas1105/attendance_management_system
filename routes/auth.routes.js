const express = require("express");
const router = express.Router();
const User = require("../models/user"); 

// Show login page
router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "views" });
});

// Handle login
router.post("/login", async(req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.send("Invalid credentials");
    }

    req.session.user = {
      username: user.username,
      role: user.role,
    };

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.send("Something went wrong");
  }
  
});

module.exports = router;
