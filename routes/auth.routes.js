const express = require("express");
const router = express.Router();

// Show login page
router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "views" });
});

// Handle login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Dummy check (temporary)
  if (username === "admin" && password === "admin123") {
     req.session.user = {
      username: "admin",
      role: "admin",
    };
    return res.redirect("/dashboard");
  }

  if (username === "user" && password === "user123") {
    req.session.user = {
      username: "user",
      role: "user",
    };
    return res.redirect("/dashboard");
  }
  res.send("Invalid credentials");
});

module.exports = router;
