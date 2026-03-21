# 🎓 Base Learn — Complete Project Documentation
### E-Learning Platform · 3 Member Team · Version 1.0

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Recommended Architecture](#2-recommended-architecture)
3. [UI/UX Design Guidelines](#3-uiux-design-guidelines)
4. [File & Folder Structure](#4-file--folder-structure)
5. [Role 1 — Student](#5-role-1--student)
6. [Role 2 — Admin](#6-role-2--admin)
7. [Role 3 — Faculty](#7-role-3--faculty)
8. [Role 4 — Instructor](#8-role-4--instructor)
9. [Authentication System](#9-authentication-system)
10. [Database Schema](#10-database-schema)
11. [API Reference](#11-api-reference)
12. [Deployment Guide](#12-deployment-guide)
13. [GitHub Workflow — 3 Member Team](#13-github-workflow--3-member-team)
14. [Testing Strategy](#14-testing-strategy)
15. [Team Responsibility Split](#15-team-responsibility-split)

---

## 1. Project Overview

| Field          | Details                                              |
|----------------|------------------------------------------------------|
| Platform Name  | **Base Learn**                                       |
| Type           | Full-Stack E-Learning Web Application                |
| Team Size      | 3 Members                                            |
| Total Roles    | 4 — Student, Admin, Faculty, Instructor              |
| Goal           | Enable students to access live classes, recorded sessions, and assignments while giving faculty, instructors, and admins full control over content and student progress |

---

## 2. Recommended Architecture

### System Design

```
Client (React.js)
       │
       ▼
REST API (Node.js + Express)
       │
       ├── Auth (JWT + bcrypt)
       ├── Cloud Storage (Cloudinary / AWS S3)
       ├── Real-time (Socket.io for Live Class)
       └── Database (MongoDB Atlas)
```

### Tech Stack

| Layer        | Technology              | Reason                                        |
|--------------|-------------------------|-----------------------------------------------|
| Frontend     | React.js + Tailwind CSS | Fast UI, component reuse, great ecosystem     |
| Backend      | Node.js + Express       | JavaScript full stack, easy REST APIs         |
| Database     | MongoDB (Atlas)         | Flexible schema for courses, users, content   |
| Auth         | JWT + bcrypt            | Secure, stateless authentication              |
| Video/Files  | Cloudinary / AWS S3     | Scalable media storage                        |
| Real-time    | Socket.io               | Live class chat and notifications             |
| Hosting FE   | Vercel                  | Free tier, instant deploys from GitHub        |
| Hosting BE   | Render / Railway        | Free tier Node.js hosting                     |

---

## 3. UI/UX Design Guidelines

### Design Principles

- **Clean & Minimal** — Avoid clutter; focus on learning content
- **Role-based Dashboards** — Each role gets a unique sidebar and layout
- **Mobile Responsive** — Works on phones, tablets, and laptops
- **Consistent Color System** — One primary brand color throughout

### Color Palette

| Use           | Color      | Hex       |
|---------------|------------|-----------|
| Primary Brand | Deep Blue  | `#1E3A8A` |
| Accent        | Sky Blue   | `#38BDF8` |
| Success       | Green      | `#22C55E` |
| Warning       | Amber      | `#F59E0B` |
| Error         | Red        | `#EF4444` |
| Background    | Off-white  | `#F8FAFC` |
| Text          | Dark Slate | `#1E293B` |

### UX Best Practices

- **Sidebar navigation** for dashboards with role-based menu items
- **Breadcrumbs** for deep navigation (e.g., Admin > Manage Students > View)
- **Loading skeletons** instead of spinners for page loads
- **Toast notifications** for success/error feedback
- **Multi-step forms** for complex inputs, keep forms short
- **Cards** for displaying courses, classes, and student info
- **Progress bars** to show course and assignment completion
- **Badge system** for student achievements and milestones

---

## 4. File & Folder Structure

```
baselearn/
│
├── client/                            ← React Frontend
│   ├── public/
│   └── src/
│       ├── assets/                    ← Images, icons, fonts
│       ├── components/                ← Shared UI components
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── Card.jsx
│       │   ├── Modal.jsx
│       │   └── ProgressBar.jsx
│       ├── pages/
│       │   ├── auth/
│       │   │   ├── Login.jsx
│       │   │   └── Register.jsx
│       │   ├── student/
│       │   │   ├── StudentDashboard.jsx
│       │   │   ├── RecordedClasses.jsx
│       │   │   ├── LiveClass.jsx
│       │   │   ├── Assignments.jsx
│       │   │   └── Progression.jsx
│       │   ├── admin/
│       │   │   ├── AdminDashboard.jsx
│       │   │   ├── ManageStudents.jsx
│       │   │   ├── ManageFaculty.jsx
│       │   │   ├── ManageInstructors.jsx
│       │   │   ├── ManageLiveClasses.jsx
│       │   │   └── ManageRecordedClasses.jsx
│       │   ├── faculty/
│       │   │   ├── FacultyDashboard.jsx
│       │   │   ├── LiveClasses.jsx
│       │   │   ├── RecordedClasses.jsx
│       │   │   ├── Assignments.jsx
│       │   │   └── Tests.jsx
│       │   └── instructor/
│       │       ├── InstructorDashboard.jsx
│       │       ├── ContentPipeline.jsx
│       │       ├── StudentAnalysis.jsx
│       │       └── BatchManagement.jsx
│       ├── context/                   ← Auth context, Role context
│       ├── hooks/                     ← Custom React hooks
│       ├── services/                  ← Axios API call functions
│       │   ├── authService.js
│       │   ├── studentService.js
│       │   ├── adminService.js
│       │   ├── facultyService.js
│       │   └── instructorService.js
│       ├── utils/                     ← Helper functions
│       ├── routes/
│       │   └── ProtectedRoute.jsx     ← Role-based route guards
│       ├── App.jsx
│       └── main.jsx
│
├── server/                            ← Node.js Backend
│   ├── config/
│   │   └── db.js                      ← MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   ├── adminController.js
│   │   ├── facultyController.js
│   │   └── instructorController.js
│   ├── middleware/
│   │   ├── authMiddleware.js          ← JWT verification
│   │   └── roleMiddleware.js          ← Role-based access
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Batch.js
│   │   ├── LiveClass.js
│   │   ├── RecordedClass.js
│   │   ├── Assignment.js
│   │   └── Test.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── facultyRoutes.js
│   │   └── instructorRoutes.js
│   ├── utils/
│   ├── .env
│   └── server.js
│
├── .gitignore
├── README.md
└── baselearn_complete_documentation.md
```

---

## 5. Role 1 — Student

### Features

#### Register / Login
- Register with name, email, password, and student ID
- Login with email and password — JWT token issued on success
- Forgot password with email OTP verification
- Profile page to update personal details and photo

#### Recorded Classes
- Browse recorded class library filtered by subject and course
- Watch via embedded video player (HTML5 or YouTube embed)
- Track watch progress (percentage watched per video)
- Resume playback from last watched position
- Optional download if enabled by faculty

#### Assignments
- View all assigned tasks with titles, descriptions, and deadlines
- Upload submission files (PDF, DOC, image)
- View submission status — Pending / Submitted / Graded
- See marks and faculty feedback after grading

#### Live Classes
- View upcoming live class schedule (date, time, topic, instructor)
- Join live class via embedded meeting link (Google Meet / Zoom)
- Receive reminder notifications before class starts
- Access past live class recordings

#### Progression
- Visual progress dashboard showing overall completion percentage
- Progress breakdown per subject and course
- Assignment completion rate and average grade
- Test score history and trends
- Achievement badges for reaching milestones

### Student Page Flow

```
Register / Login
       │
       ▼
Student Dashboard
       │
       ├── Recorded Classes ──► Watch Video ──► Mark Complete
       ├── Live Classes     ──► Join Link   ──► View Recording
       ├── Assignments      ──► Upload File ──► View Grade & Feedback
       └── My Progression   ──► Charts & Stats & Badges
```

---

## 6. Role 2 — Admin

### Features

#### Admin Login
- Separate admin login (no self-registration — accounts pre-created)
- JWT token with `admin` role claim
- Session timeout for security

#### Manage Students
- View all registered students with search and filter
- View individual student profile and activity
- Activate or deactivate student accounts
- Reset student password
- Export student list as CSV

#### Manage Faculty
- Add new faculty accounts (name, email, department)
- Edit or remove faculty profiles
- View faculty's assigned classes and courses
- Toggle active/inactive status

#### Manage Instructors
- Add new instructor accounts
- Assign instructors to specific courses or student batches
- View instructor workload (number of classes managed)
- Remove or update instructor profiles

#### Manage Live Classes
- Schedule new live classes (title, date, time, link, assigned faculty)
- Edit or cancel existing live classes
- View attendance reports per live class
- Send notifications to students about upcoming classes

#### Manage Recorded Classes
- Upload new recorded class videos (link or file)
- Assign recorded classes to specific courses and subjects
- Edit video title, description, and tags
- Remove outdated recordings

#### Other Admin Features
- Platform analytics dashboard (total users, active sessions, class counts)
- Role-based access management
- Announcement and notice board for all users
- View system logs and error reports

### Admin Page Flow

```
Admin Login
       │
       ▼
Admin Dashboard (Stats Overview)
       │
       ├── Manage Students     ──► View / Edit / Deactivate / Export
       ├── Manage Faculty      ──► Add / Edit / Remove
       ├── Manage Instructors  ──► Add / Edit / Assign to Batch
       ├── Manage Live Classes ──► Schedule / Edit / Attendance Reports
       ├── Manage Recordings   ──► Upload / Assign / Remove
       └── Platform Analytics  ──► Charts & System Health
```

---

## 7. Role 3 — Faculty

### Features

#### Faculty Login
- Dedicated login page (admin creates accounts — no self-registration)
- JWT authentication with role `faculty`
- Persistent session with remember-me option

#### Manage Live Classes
- Create a new live class with title, subject, date, time, duration, meeting link, and target batch
- Edit or cancel scheduled live classes
- View per-student attendance details for each class

**Live Class Attendance Detail Table:**

| Student Name | Student ID | Attended | Join Time  | Duration Stayed | Status    |
|--------------|------------|----------|------------|-----------------|-----------|
| Arjun R.     | ST001      | ✅ Yes   | 10:02 AM   | 48 min          | Completed |
| Priya S.     | ST002      | ❌ No    | —          | —               | Absent    |

#### Manage Recorded Classes
- Upload or link recorded videos (URL or direct file via Cloudinary)
- Add title, description, subject tag, and thumbnail
- Organize by subject and week/module
- View per-student watch details

**Recorded Class Watch Detail Table:**

| Student Name | Watched  | Watch % | Last Watched          | Rewatches |
|--------------|----------|---------|-----------------------|-----------|
| Arjun R.     | ✅ Yes   | 87%     | 2024-03-10  9:00 AM   | 2         |
| Priya S.     | ✅ Yes   | 45%     | 2024-03-11  3:00 PM   | 1         |
| Rahul M.     | ❌ No    | 0%      | —                     | 0         |

#### Manage Assignments
- Create assignments with title, description, deadline, allowed file types, and max marks
- View per-student submission details
- Grade submissions with marks and text feedback
- Bulk download all submissions as ZIP

**Assignment Submission Detail Table:**

| Student Name | Status    | Submitted On         | Marks | Feedback         |
|--------------|-----------|----------------------|-------|------------------|
| Arjun R.     | Submitted | 2024-03-08 11:30 AM  | 18/20 | Good work!       |
| Priya S.     | Late      | 2024-03-09  9:00 AM  | 12/20 | Late submission  |
| Rahul M.     | Pending   | —                    | —     | —                |

#### Manage Tests
- Create MCQ or short-answer tests with time limit, total marks, and scheduled window
- View per-student test results

**Test Result Detail Table:**

| Student Name | Attempted | Score  | Time Taken | Percentage |
|--------------|-----------|--------|------------|------------|
| Arjun R.     | ✅ Yes    | 16/20  | 22 min     | 80%        |
| Priya S.     | ✅ Yes    | 11/20  | 30 min     | 55%        |
| Rahul M.     | ❌ No     | —      | —          | —          |

### Faculty Page Flow

```
Faculty Login
       │
       ▼
Faculty Dashboard
       │
       ├── Live Classes
       │      ├── Create / Edit / Cancel
       │      └── View Student Attendance Detail
       ├── Recorded Classes
       │      ├── Upload / Link / Organize
       │      └── View Student Watch Detail
       ├── Assignments
       │      ├── Create / Manage
       │      ├── Grade Submissions
       │      └── View Student Submission Detail
       └── Tests
              ├── Create Test
              └── View Student Result Detail
```

---

## 8. Role 4 — Instructor

### Features

#### Instructor Login
- Dedicated login page (admin creates accounts)
- JWT authentication with role `instructor`
- Separate dashboard from faculty and admin

#### Move Recorded Classes (Faculty → Student)
- View all recorded classes uploaded by faculty
- Assign or publish recordings to specific student batches or individuals
- Set visibility — Draft / Published / Archived
- Schedule a publish date for timed content release
- Track which recordings are assigned and to whom

**Content Pipeline:**

```
Faculty Uploads Recording
         │
         ▼
Instructor Reviews & Approves
         │
         ▼
Instructor Assigns to Batch / Student
         │
         ▼
Student Sees Recording in Dashboard
```

**Content Pipeline Table:**

| Recording Title         | Uploaded By  | Status    | Assigned To     | Publish Date  |
|-------------------------|--------------|-----------|-----------------|---------------|
| Intro to Algorithms     | Dr. Meena    | Published | Batch A & B     | Mar 10, 2024  |
| Data Structures - Trees | Dr. Meena    | Draft     | Not assigned    | —             |
| Web Dev Basics          | Prof. Rajan  | Published | Batch C         | Mar 12, 2024  |

#### Analyse Each Student
- View individual student profile with full learning data:
  - Live class attendance history
  - Recorded class watch progress
  - Assignment submission rate and average grade
  - Test scores and trends over time
- Compare student performance against batch average
- Flag at-risk students (low attendance or missing assignments)
- Add instructor notes per student
- Generate downloadable progress summary report (PDF/CSV)

**Student Analysis Card Example:**

```
Student: Arjun R. (ST001) — Batch A
──────────────────────────────────────
Live Class Attendance:     9/12  (75%)
Avg Recorded Watch:        85%
Assignment Submission:     8/10 submitted
Avg Assignment Grade:      17.5 / 20
Test Average Score:        78%

Status: 🟡 Good — Monitor attendance
```

#### Other Useful Features
- **Batch Management** — Group students into batches for organized content delivery
- **Notification System** — Send targeted messages to students or entire batches
- **Content Calendar** — Visual calendar of all scheduled classes and deadlines
- **Progress Reports** — Generate and download batch-level performance summaries
- **Escalation Alerts** — Notify faculty when a student's performance drops below threshold

### Instructor Page Flow

```
Instructor Login
       │
       ▼
Instructor Dashboard
       │
       ├── Content Pipeline
       │      ├── View Faculty Uploads
       │      ├── Assign to Batches / Students
       │      └── Manage Published Content
       ├── Student Analysis
       │      ├── Search & View Student Profile
       │      ├── Full Stats & Trends
       │      ├── Add Notes / Flag At-Risk
       │      └── Download Progress Report
       ├── Batch Management
       │      ├── Create / Edit Batches
       │      └── Assign Students to Batches
       └── Notifications & Alerts
              ├── Send Message to Student / Batch
              └── View At-Risk Student Alerts
```

---

## 9. Authentication System

### How JWT Auth Works

```
User submits email + password
         │
         ▼
Server verifies credentials via bcrypt
         │
         ▼
Issues JWT Token  { userId, role, email, exp }
         │
         ▼
Client stores token (localStorage)
         │
         ▼
Every API request → Authorization: Bearer <token>
         │
         ▼
Middleware verifies token + checks role → allow or deny
```

### Role Access Matrix

| Role       | JWT Role Value | Accessible Routes   |
|------------|----------------|---------------------|
| Student    | `student`      | /api/student/*      |
| Admin      | `admin`        | /api/admin/*        |
| Faculty    | `faculty`      | /api/faculty/*      |
| Instructor | `instructor`   | /api/instructor/*   |

### Auth Middleware Code

```javascript
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role, email }
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { protect, authorizeRoles };
```

---

## 10. Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String,
  email: { type: String, unique: true },
  password: String,                          // bcrypt hashed
  role: { type: String, enum: ['student', 'admin', 'faculty', 'instructor'] },
  studentId: String,                         // students only
  department: String,                        // faculty / instructor
  profilePhoto: String,                      // URL
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
}
```

### Batch Model

```javascript
{
  _id: ObjectId,
  name: String,                              // e.g. "Batch A 2024"
  students: [{ type: ObjectId, ref: 'User' }],
  instructor: { type: ObjectId, ref: 'User' },
  course: { type: ObjectId, ref: 'Course' },
  createdAt: Date
}
```

### Live Class Model

```javascript
{
  _id: ObjectId,
  title: String,
  subject: String,
  faculty: { type: ObjectId, ref: 'User' },
  batch: { type: ObjectId, ref: 'Batch' },
  meetingLink: String,
  scheduledAt: Date,
  duration: Number,                          // minutes
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed', 'cancelled'] },
  attendance: [
    {
      student: { type: ObjectId, ref: 'User' },
      attended: Boolean,
      joinTime: Date,
      leaveTime: Date
    }
  ],
  createdAt: Date
}
```

### Recorded Class Model

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  subject: String,
  videoUrl: String,                          // Cloudinary or YouTube URL
  thumbnail: String,
  faculty: { type: ObjectId, ref: 'User' },
  status: { type: String, enum: ['draft', 'published', 'archived'] },
  assignedTo: [{ type: ObjectId, ref: 'Batch' }],
  publishedAt: Date,
  watchProgress: [
    {
      student: { type: ObjectId, ref: 'User' },
      watchPercentage: Number,
      lastWatchedAt: Date,
      rewatchCount: Number
    }
  ],
  createdAt: Date
}
```

### Assignment Model

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  subject: String,
  faculty: { type: ObjectId, ref: 'User' },
  batch: { type: ObjectId, ref: 'Batch' },
  deadline: Date,
  maxMarks: Number,
  allowedFileTypes: [String],                // ['pdf', 'doc', 'jpg']
  submissions: [
    {
      student: { type: ObjectId, ref: 'User' },
      fileUrl: String,
      submittedAt: Date,
      isLate: Boolean,
      marks: Number,
      feedback: String,
      gradedAt: Date
    }
  ],
  createdAt: Date
}
```

### Test Model

```javascript
{
  _id: ObjectId,
  title: String,
  subject: String,
  faculty: { type: ObjectId, ref: 'User' },
  batch: { type: ObjectId, ref: 'Batch' },
  totalMarks: Number,
  duration: Number,                          // minutes
  startTime: Date,
  endTime: Date,
  questions: [
    {
      questionText: String,
      type: { type: String, enum: ['mcq', 'short'] },
      options: [String],
      correctAnswer: String,
      marks: Number
    }
  ],
  attempts: [
    {
      student: { type: ObjectId, ref: 'User' },
      score: Number,
      timeTaken: Number,
      submittedAt: Date,
      answers: [{ questionId: ObjectId, answer: String, isCorrect: Boolean }]
    }
  ],
  createdAt: Date
}
```

---

## 11. API Reference

### Auth Routes

| Method | Endpoint                     | Access  | Description               |
|--------|------------------------------|---------|---------------------------|
| POST   | /api/auth/register           | Public  | Student self-registration |
| POST   | /api/auth/login              | Public  | Login — all roles         |
| POST   | /api/auth/forgot-password    | Public  | Send OTP to email         |
| POST   | /api/auth/reset-password     | Public  | Reset password with OTP   |
| GET    | /api/auth/me                 | All     | Get current user profile  |

### Student Routes

| Method | Endpoint                                    | Description                      |
|--------|---------------------------------------------|----------------------------------|
| GET    | /api/student/dashboard                      | Dashboard summary                |
| GET    | /api/student/recorded-classes               | All accessible recordings        |
| PATCH  | /api/student/recorded-classes/:id/progress  | Update watch progress            |
| GET    | /api/student/live-classes                   | Upcoming and past live classes   |
| GET    | /api/student/assignments                    | All student assignments          |
| POST   | /api/student/assignments/:id/submit         | Submit assignment file           |
| GET    | /api/student/tests                          | Available tests                  |
| POST   | /api/student/tests/:id/attempt              | Submit test answers              |
| GET    | /api/student/progression                    | Full progress report             |

### Admin Routes

| Method | Endpoint                          | Description                      |
|--------|-----------------------------------|----------------------------------|
| GET    | /api/admin/dashboard              | Platform stats                   |
| GET    | /api/admin/students               | List all students                |
| GET    | /api/admin/students/:id           | View specific student            |
| PATCH  | /api/admin/students/:id/status    | Activate / deactivate student    |
| DELETE | /api/admin/students/:id           | Remove student                   |
| POST   | /api/admin/faculty                | Create faculty account           |
| GET    | /api/admin/faculty                | List all faculty                 |
| PATCH  | /api/admin/faculty/:id            | Update faculty profile           |
| DELETE | /api/admin/faculty/:id            | Remove faculty                   |
| POST   | /api/admin/instructors            | Create instructor account        |
| GET    | /api/admin/instructors            | List all instructors             |
| GET    | /api/admin/live-classes           | View all live classes            |
| GET    | /api/admin/recorded-classes       | View all recorded classes        |

### Faculty Routes

| Method | Endpoint                                         | Description                        |
|--------|--------------------------------------------------|------------------------------------|
| GET    | /api/faculty/dashboard                           | Faculty summary                    |
| POST   | /api/faculty/live-classes                        | Create live class                  |
| GET    | /api/faculty/live-classes                        | List faculty's live classes        |
| PATCH  | /api/faculty/live-classes/:id                    | Edit live class                    |
| DELETE | /api/faculty/live-classes/:id                    | Cancel live class                  |
| GET    | /api/faculty/live-classes/:id/attendance         | Per-student attendance             |
| POST   | /api/faculty/recorded-classes                    | Upload / link recording            |
| GET    | /api/faculty/recorded-classes                    | List faculty's recordings          |
| GET    | /api/faculty/recorded-classes/:id/watch-details  | Per-student watch progress         |
| POST   | /api/faculty/assignments                         | Create assignment                  |
| GET    | /api/faculty/assignments/:id/submissions         | All submissions                    |
| PATCH  | /api/faculty/assignments/:id/grade/:studentId    | Grade a submission                 |
| POST   | /api/faculty/tests                               | Create test                        |
| GET    | /api/faculty/tests/:id/results                   | Per-student test results           |

### Instructor Routes

| Method | Endpoint                                        | Description                        |
|--------|-------------------------------------------------|------------------------------------|
| GET    | /api/instructor/dashboard                       | Instructor summary                 |
| GET    | /api/instructor/recorded-classes/pending        | Unassigned faculty uploads         |
| PATCH  | /api/instructor/recorded-classes/:id/assign     | Assign recording to batch          |
| GET    | /api/instructor/students                        | List all students in scope         |
| GET    | /api/instructor/students/:id/analysis           | Full student analysis              |
| POST   | /api/instructor/students/:id/notes              | Add notes to student               |
| GET    | /api/instructor/batches                         | List batches                       |
| POST   | /api/instructor/batches                         | Create batch                       |
| PATCH  | /api/instructor/batches/:id/students            | Add or remove batch students       |
| POST   | /api/instructor/notifications                   | Send notification                  |

---

## 12. Deployment Guide

### Environment Variables (.env)

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/baselearn
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=https://baselearn.vercel.app
```

### Deploy Backend — Render (Free)

1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repository
3. Set Root Directory: `server`, Build Command: `npm install`, Start Command: `node server.js`
4. Add all `.env` variables in the Render dashboard
5. Deploy → Backend URL: `https://baselearn-api.onrender.com`

### Deploy Frontend — Vercel (Free)

1. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
2. Set Root Directory: `client`, Build Command: `npm run build`, Output: `dist`
3. Add environment variable: `VITE_API_URL=https://baselearn-api.onrender.com`
4. Deploy → Frontend URL: `https://baselearn.vercel.app`

### MongoDB Atlas Setup

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Create free M0 cluster
2. Create database user with password
3. Whitelist IP: `0.0.0.0/0` (allow all for cloud hosting)
4. Copy connection string → paste into `MONGO_URI` in `.env`

### CORS Configuration

```javascript
// server.js
const cors = require('cors');
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

### Quick Reference — URLs

| Environment | URL                                          |
|-------------|----------------------------------------------|
| Local Dev   | `http://localhost:5000/api`                  |
| Production  | `https://baselearn-api.onrender.com/api`     |
| Frontend    | `https://baselearn.vercel.app`               |

---

## 13. GitHub Workflow — 3 Member Team

### Step 1: Repository Setup (One Time)

**Team Lead creates the repo, all members clone:**

```bash
git clone https://github.com/your-org/baselearn.git
cd baselearn
```

### Step 2: Branch Strategy

```
main           ← Production-ready code only
  └── develop  ← Integration branch (merge features here first)
        ├── feature/student-dashboard       ← Member 1
        ├── feature/admin-panel             ← Member 1
        ├── feature/faculty-module          ← Member 2
        ├── feature/instructor-module       ← Member 2
        └── feature/api-database            ← Member 3
```

**Creating your feature branch:**

```bash
git checkout develop
git pull origin develop
git checkout -b feature/faculty-module
```

### Step 3: Daily Git Workflow

```bash
# Start of day — sync latest
git checkout develop
git pull origin develop
git checkout feature/faculty-module
git merge develop

# Work on your feature, then commit
git add .
git commit -m "feat: add faculty live class management page"
git push origin feature/faculty-module
```

### Step 4: Commit Message Convention

| Prefix      | When to Use                            | Example                                        |
|-------------|----------------------------------------|------------------------------------------------|
| `feat:`     | New feature added                      | `feat: add student assignment upload`          |
| `fix:`      | Bug fix                                | `fix: resolve login redirect issue`            |
| `chore:`    | Setup, config, dependencies            | `chore: install axios and react-router`        |
| `style:`    | UI/CSS changes only                    | `style: update faculty dashboard card color`   |
| `refactor:` | Restructured code, no behavior change  | `refactor: simplify auth middleware`           |
| `docs:`     | Documentation update                   | `docs: update README with setup steps`         |
| `test:`     | Adding or updating tests               | `test: add unit tests for login API`           |

### Step 5: Pull Request (PR) Process

1. Push feature branch to GitHub
2. Click **Compare & Pull Request** on GitHub
3. Set base branch as `develop` (never `main` directly)
4. Write a clear PR description:

```
Title: feat: Faculty Module — Live Class Management

- Added live class creation form
- View all scheduled live classes
- Per-student attendance detail table
- API calls connected to /api/faculty/live-classes

Tested: ✅ Manually tested locally
Screenshots: [attach UI screenshots]
```

5. Request review from at least 1 teammate
6. After approval → **Squash and Merge** into `develop`

### Step 6: Handling Merge Conflicts

```bash
git checkout feature/faculty-module
git merge develop

# Fix conflict markers in the file:
<<<<<<< HEAD
  your code here
=======
  teammate's code here
>>>>>>> develop

# After fixing:
git add conflicted-file.js
git commit -m "fix: resolve merge conflict in faculty routes"
git push origin feature/faculty-module
```

### Step 7: Branch Protection Rules (GitHub Settings)

Go to: **Repository → Settings → Branches → Add Rule** for `main`:

- ✅ Require pull request reviews before merging
- ✅ Require at least 1 approving review
- ✅ Dismiss stale reviews when new commits are pushed
- ✅ Do not allow direct pushes to main

### Step 8: GitHub Project Board

Use **GitHub Projects** (Kanban):

```
Backlog → In Progress → In Review → Done
```

Each feature = one GitHub Issue. Link issues to PRs using `Closes #12` in the PR description.

### Step 9: .gitignore

```
node_modules/
.env
.env.local
dist/
build/
.DS_Store
Thumbs.db
.vscode/
```

### Step 10: Weekly Sync Checklist

Every week the team should:

- [ ] Merge all approved PRs into `develop`
- [ ] Demo completed features to the team
- [ ] Assign new Issues for the next week
- [ ] Resolve any blockers or dependency conflicts
- [ ] Merge stable `develop` into `main` when milestone is done

---

## 14. Testing Strategy

### Manual Testing Checklist

**Authentication:**
- [ ] Register as student — receives JWT
- [ ] Login as each role — gets correct dashboard
- [ ] Access another role's route — should return 403 Forbidden
- [ ] Use expired token — should return 401 Unauthorized

**Student:**
- [ ] View recorded classes list
- [ ] Update watch progress
- [ ] Submit assignment file
- [ ] View progression stats

**Admin:**
- [ ] Add faculty account
- [ ] Deactivate a student
- [ ] Schedule a live class

**Faculty:**
- [ ] Create and view live class
- [ ] See per-student attendance table
- [ ] Grade an assignment submission

**Instructor:**
- [ ] Assign recording to batch
- [ ] View student analysis card
- [ ] Add notes to a student

### API Testing with Postman / Thunder Client

**Environment Variables:**

```
BASE_URL = https://baselearn-api.onrender.com
TOKEN    = (paste JWT after login)
```

**Auth header for all protected routes:**

```
Authorization: Bearer {{TOKEN}}
```

**Recommended Test Collection Structure:**

```
Base Learn API
│
├── Auth          → register, login (all roles), /me
├── Student       → dashboard, recordings, assignments, tests, progression
├── Admin         → students, faculty, instructors, live/recorded classes
├── Faculty       → live classes, recordings, assignments, tests
└── Instructor    → pipeline, student analysis, batches, notifications
```

---

## 15. Team Responsibility Split

| Area                    | Member 1                         | Member 2                          | Member 3                          |
|-------------------------|----------------------------------|-----------------------------------|-----------------------------------|
| Architecture & Setup    | Tech stack, folder structure     | —                                 | Server setup, DB connection       |
| UI/UX Design            | Design system, wireframes        | Faculty & Instructor UI           | —                                 |
| Student Module          | All student pages & services     | —                                 | Student API & DB                  |
| Admin Module            | All admin pages & services       | —                                 | Admin API & DB                    |
| Faculty Module          | —                                | All faculty pages & services      | Faculty API & DB                  |
| Instructor Module       | —                                | All instructor pages & services   | Instructor API & DB               |
| Authentication          | Frontend auth flow & route guard | —                                 | JWT middleware, auth API          |
| Database                | —                                | —                                 | All MongoDB models & schemas      |
| File Uploads            | Upload UI components             | —                                 | Cloudinary integration            |
| Deployment              | Vercel (frontend deploy)         | —                                 | Render (backend) + MongoDB Atlas  |
| GitHub Workflow         | Repo setup, branch protection    | Branch strategy, PR process       | .gitignore, environment config    |
| Testing                 | Student & Admin test cases       | Faculty & Instructor test cases   | API collection, auth test cases   |

---

*Base Learn · Complete Documentation · 3 Member Team · Version 1.0*
