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
connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    <p>Welcome ${username}</p>
    <p>Role: ${role}</p>
  `;

  // Admin-only options
  if (role === "admin") {
    content += `
      <h3>Admin Options</h3>
      <a href="/admin">Admin Panel</a><br/>
    `;
  }

  // User-only options
  if (role === "user") {
    content += `
      <h3>User Options</h3>
      <a href="/attendance/view">View My Attendance</a><br/>
    `;
  }

  content += `
    <br/>
    <a href="/logout">Logout</a>
  `;

  res.send(content);
});




app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/admin", isAuthenticated, isAdmin, (req, res) => {
  res.send(`
    <h2>Admin Panel</h2>
    <p>You have special access</p>

    <h3>Attendance</h3>

    <form method="POST" action="/attendance/mark">
      <input name="studentName" placeholder="Student name" />
      <select name="status">
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
      <button type="submit">Mark Attendance</button>
    </form>

    <br/>
    <a href="/dashboard">Back to Dashboard</a>
  `);
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
