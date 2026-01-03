const express = require("express");
const session = require("express-session");
const isAdmin = require("./middleware/role.middleware");

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
   res.send(`<h2>Dashboard</h2>
    <p>Welcome ${req.session.user.username}</p>
    <p>Role: ${req.session.user.role}</p>
    <a href="/admin">Admin Page</a><br/>
    <a href="/logout">Logout</a>
  
`);});

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/admin", isAuthenticated, isAdmin, (req, res) => {
  res.send("Welcome Admin! You have special access.");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
