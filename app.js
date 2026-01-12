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

  let cards = "";

  // Teacher dashboard
  if (role === "teacher") {
    cards = `
      <div class="card">
        <h3>Mark Attendance</h3>
        <p>Record student attendance</p>
        <a href="/attendance/mark-form">Go</a>
      </div>

      <div class="card">
        <h3>View Attendance</h3>
        <p>View all attendance records</p>
        <a href="/attendance/view">Go</a>
      </div>
    `;
  }

  // Student dashboard
  if (role === "student") {
    cards = `
      <div class="card student">
        <h3>My Attendance</h3>
        <p>View your attendance history</p>
        <a href="/attendance/view">View</a>
      </div>
    `;
  }

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Dashboard</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>

      <div class="dashboard-container">
        <div class="dashboard-header">
          <h2>Dashboard</h2>
          
          <div class="user-info">
            User: <span>${username}</span> |
            Role: <span>${role}</span>
          </div>
        </div>

        <div class="cards">
          ${cards}
        </div>

        <div class="logout">
          <a href="/logout">Logout</a>
        </div>
      </div>

    </body>
    </html>
  `);
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
