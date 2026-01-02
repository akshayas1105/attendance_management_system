const express = require("express");
const session = require("express-session");

const authRoutes = require("./routes/auth.routes");
const isAuthenticated = require("./middleware/auth.middleware");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "attendance_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use(authRoutes);

// Protected dashboard
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.send(`Welcome ${req.session.user}, this is the dashboard`);
});

app.get("/", (req, res) => {
  res.redirect("/login");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
