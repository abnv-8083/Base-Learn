# 🎓 Base Learn — E-Learning Platform
### Member 1 Document · Project Overview · Architecture · UI/UX · Student & Admin Roles

---

## 📌 Project Overview

**Platform Name:** Base Learn
**Type:** E-Learning Web Application
**Team Size:** 3 Members
**Total Roles:** 4 (Student, Admin, Faculty, Instructor)

Base Learn is a full-stack e-learning platform that enables students to access live classes, recorded sessions, and assignments — while giving administrators, faculty, and instructors complete control over content delivery and student progression tracking.

---

## 🧱 Recommended Architecture

### Frontend + Backend Split (Full Stack — Recommended for 3-member teams)

```
Client (React.js) ──► REST API (Node.js + Express) ──► Database (MongoDB)
                                │
                         Auth (JWT)
                                │
                    Cloud Storage (AWS S3 / Cloudinary)
                                │
                    Real-time (Socket.io for Live Class)
```

### Why This Stack?

| Layer        | Technology            | Reason                                      |
|--------------|-----------------------|---------------------------------------------|
| Frontend     | React.js + Tailwind   | Fast UI, component reuse, great ecosystem   |
| Backend      | Node.js + Express     | JavaScript full stack, easy REST APIs       |
| Database     | MongoDB (Atlas)       | Flexible schema for courses, users, content |
| Auth         | JWT + bcrypt          | Secure, stateless authentication            |
| Video/Files  | Cloudinary / AWS S3   | Scalable media storage                      |
| Real-time    | Socket.io             | Live class chat and notifications           |
| Hosting      | Vercel (FE) + Render/Railway (BE) | Free tiers available           |

---

## 🎨 UI/UX Design Guidelines

### Design Principles

- **Clean & Minimal** — Avoid clutter; focus on learning content
- **Role-based Dashboards** — Each role gets a unique sidebar and layout
- **Mobile Responsive** — Works on phones, tablets, laptops
- **Consistent Color System** — One primary brand color throughout

### Suggested Color Palette

| Use            | Color       | Hex       |
|----------------|-------------|-----------|
| Primary Brand  | Deep Blue   | `#1E3A8A` |
| Accent         | Sky Blue    | `#38BDF8` |
| Success        | Green       | `#22C55E` |
| Warning        | Amber       | `#F59E0B` |
| Error          | Red         | `#EF4444` |
| Background     | Off-white   | `#F8FAFC` |
| Text           | Dark Slate  | `#1E293B` |

### UX Best Practices

- Use **sidebar navigation** for dashboards (role-based menu items)
- Use **breadcrumbs** for deep navigation (e.g., Admin > Manage Students > View)
- Add **loading skeletons** instead of spinners for page loads
- Use **toast notifications** for success/error feedback
- Keep **forms short** — multi-step forms for complex inputs
- Use **cards** for displaying courses, classes, and student info

---

## 📁 File & Folder Structure

```
baselearn/
│
├── client/                        ← React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/                ← Images, icons, fonts
│   │   ├── components/            ← Shared UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Modal.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── student/
│   │   │   │   ├── StudentDashboard.jsx
│   │   │   │   ├── RecordedClasses.jsx
│   │   │   │   ├── LiveClass.jsx
│   │   │   │   ├── Assignments.jsx
│   │   │   │   └── Progression.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── ManageStudents.jsx
│   │   │       ├── ManageFaculty.jsx
│   │   │       ├── ManageInstructors.jsx
│   │   │       ├── ManageLiveClasses.jsx
│   │   │       └── ManageRecordedClasses.jsx
│   │   ├── context/               ← Auth context, Role context
│   │   ├── hooks/                 ← Custom React hooks
│   │   ├── services/              ← Axios API calls
│   │   │   ├── authService.js
│   │   │   ├── studentService.js
│   │   │   └── adminService.js
│   │   ├── utils/                 ← Helper functions
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx ← Role-based route guards
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                        ← Node.js Backend
│   ├── config/
│   │   └── db.js                  ← MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js      ← JWT verification
│   │   └── roleMiddleware.js      ← Role-based access
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── LiveClass.js
│   │   ├── RecordedClass.js
│   │   └── Assignment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── docs/                          ← Project documentation
    ├── member1_overview_architecture_student_admin.md
    ├── member2_faculty_instructor_github.md
    └── member3_api_database_deployment.md
```

---

## 👨‍🎓 Role 1 — Student

### Features

#### 1. Register / Login
- Student registers with name, email, password, and student ID
- Login with email and password (JWT token issued)
- Forgot password with email OTP
- Profile page to update details and photo

#### 2. Recorded Classes
- Browse recorded class library filtered by subject/course
- Watch embedded video player (HTML5 or YouTube embed)
- Track watch progress (percentage watched)
- Resume from where you left off
- Download option (if enabled by faculty)

#### 3. Assignments
- View all assigned tasks with deadlines
- Upload submission (PDF, DOC, image)
- View submission status: Pending / Submitted / Graded
- See marks and faculty feedback after grading

#### 4. Live Classes
- View upcoming live class schedule (date, time, topic, instructor)
- Join live class via embedded meeting link (Google Meet / Zoom)
- Get reminder notifications before class starts
- View past live class recordings

#### 5. Progression
- Visual progress dashboard (overall completion percentage)
- Progress per subject / course
- Assignment completion stats
- Test scores summary
- Achievement badges for milestones

### Student Page Flow

```
Register/Login
     │
     ▼
Student Dashboard (Home)
     │
     ├── Recorded Classes ──► Watch Video ──► Mark Complete
     ├── Live Classes     ──► Join Link  ──► View Recording
     ├── Assignments      ──► Upload     ──► View Grade
     └── My Progression   ──► Charts & Stats
```

---

## 🔐 Role 2 — Admin

### Features

#### 1. Admin Login
- Separate admin login page (no registration — accounts pre-created)
- JWT token with admin role claim
- Session timeout for security

#### 2. Manage Students
- View list of all registered students with search and filter
- View individual student profile and activity
- Activate / Deactivate student accounts
- Reset student password
- Export student list as CSV

#### 3. Manage Faculty
- Add new faculty accounts (name, email, department)
- Edit or remove faculty profiles
- View faculty's assigned classes and courses
- Toggle faculty active/inactive status

#### 4. Manage Instructors
- Add new instructor accounts
- Assign instructors to specific courses or student groups
- View instructor workload (how many classes managed)
- Remove or update instructor profiles

#### 5. Manage Live Classes
- Schedule new live classes (title, date, time, link, faculty)
- Edit or cancel existing live classes
- View attendance reports per live class
- Send notifications to students about upcoming classes

#### 6. Manage Recorded Classes
- Upload new recorded class videos (link or file)
- Assign recorded classes to specific courses/subjects
- Edit video title, description, tags
- Remove outdated recordings

#### 7. Other Admin Features
- Platform analytics dashboard (total users, active sessions, class counts)
- Role-based access management
- Announcement/notice board for all users
- View system logs and error reports

### Admin Page Flow

```
Admin Login
     │
     ▼
Admin Dashboard (Stats Overview)
     │
     ├── Manage Students    ──► View / Edit / Deactivate
     ├── Manage Faculty     ──► Add / Edit / Remove
     ├── Manage Instructors ──► Add / Edit / Assign
     ├── Manage Live Classes──► Schedule / Edit / Reports
     ├── Manage Recordings  ──► Upload / Assign / Remove
     └── Platform Analytics ──► Charts & System Stats
```

---

## ✅ Member 1 Responsibility Summary

| Area                  | Tasks                                              |
|-----------------------|----------------------------------------------------|
| Project Architecture  | Define tech stack, folder structure, system design |
| UI/UX Design          | Wireframes, design system, color palette           |
| Student Module        | Register, Login, Dashboard, Classes, Assignments   |
| Admin Module          | All admin pages and management features            |
| Shared Components     | Navbar, Sidebar, Cards, Modals, Route Guards       |

---

*Base Learn · Member 1 Document · Version 1.0*
