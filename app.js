const express = require("express");
const session = require("express-session");

//Middlewares
const isAdmin = require("./middleware/role.middleware");
const isAuthenticated = require("./middleware/auth.middleware");

//Routes
const authRoutes = require("./routes/auth.routes");
const attendanceRoutes = require("./routes/attendance.controller");

//Mongodb connection
const connectDB = require("./config/db");
const isTeacher = require("./middleware/isTeacher");
connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//session middleware
app.use(
  session({
    secret: "attendance_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use(authRoutes);
app.use("/attendance", attendanceRoutes);

// Protected dashboard
app.get("/dashboard", isAuthenticated, (req, res) => {
  const { username, role } = req.session.user;

  let content = `
    <h2>Dashboard</h2>
    <p>Welcome <strong>${username}</strong></p>
    <p>Role: <strong>${role}</strong></p>
     <div style="margin-top:20px;">
  `;

  // Admin-only options
  if (role === "teacher") {
    content += `
      <h3>Admin Options</h3>
       <a href="/attendance/mark-form">Mark Attendance</a><br/>
       <a href="/attendance/view">View All Attendance</a><br/>
    `;
  }

  // User-only options
  if (role === "student") {
    content += `
      <h3>User Options</h3>
      <a href="/attendance/view">View My Attendance</a><br/>
    `;
  }

  content += `
    <br/>
    <a href="/logout">Logout</a>
    </div>
  `;

  res.send(content);
});




app.get("/", (req, res) => {
  res.redirect("/login");
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
