![Attendance System](https://img.shields.io/badge/Attendance-System-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=flat&logo=mongodb)


# Attendance_Management_System
A web-based Attendance Management System designed to simplify attendance tracking and management.  
This project is being developed in phases, starting with core system setup and basic functionality.
   
---

# Project Overview

The Attendance Management System is a web application designed to allow teachers to mark and view student attendance and for students to view their own attendance records. The system uses role-based access, ensuring teachers and students have access to appropriate functionalities. The application features a modern, user-friendly interface with responsive design and real-time feedback.

---

## Features

- **Role-based login:** Admin/Teacher & Student  
- **Secure login:** Passwords are hashed with bcrypt  
- **Attendance marking:** Admin/teacher can mark attendance for students  
- **Attendance view:** Students can view their own attendance; teachers see all records  
- **Date filter:** View attendance by specific dates  
- **Persistent database:** MongoDB stores users and attendance  
- **Frontend forms:** HTML forms to mark and view attendance  
- **Basic styling:** Clean and readable UI with CSS  

---

## Project Structure

attendance-system/<br>
│<br>
├── app.js # Main server file<br>
├── package.json # Node.js dependencies<br>
├── .gitignore<br>
│<br>
├── config/<br>
│ └── db.js # MongoDB connection setup<br>
│<br>
├── models/<br>
│ ├── user.js # User schema<br>
│ └── attendance.js # Attendance schema<br>
│<br>
├── routes/<br>
│ ├── auth.routes.js # Login/register routes<br>
│ └── attendance.controller.js # Attendance routes<br>
│<br>
├── middleware/<br>
│ ├── auth.middleware.js<br>
│ └── role.middleware.js<br>
│ └── isTeacher.js<br>
|<br>
├── templates/<br>
│ ├── markAttendance.html<br>
│ └── viewAttendance.html<br>
| └── dashboard.html<br>
| └── login.html<br>
│<br>
├── scripts/<br>
│ └── seedUsers.js # Initial users for DB<br>
│<br>
├── public/<br>
│ └── style.css # Styling for forms and dashboard<br>
└── README.md<br>


---
## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (v9.x or higher) or **yarn**
- **MongoDB** (v6.x or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

---

### Installation

1. Clone the repo:

```bash
git clone <your-repo-url>
cd attendance-system
```
---
2. Install dependencies:

```bash
npm install
```
---
3.Seed initial users:

```bash
node scripts/seedUsers.js
```
---
4.Start the server:

```bash
node app.js
```
---
5.Open your browser:

```bash
http://localhost:3000/login
```
---
## Usage
- Login as Teacher to mark and view attendance
- Login as Student to view personal attendance records
- Filter attendance using the date picker
---
## Future Enhancements

- **Dashboard with summary statistics**
- **Charts for attendance trends)**
- **Responsive UI for mobile devices**
- **Role-based CRUD for students**
- **Export attendance to CSV/Excel**

---
