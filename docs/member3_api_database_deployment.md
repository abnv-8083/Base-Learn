# 🎓 Base Learn — E-Learning Platform
### Member 3 Document · API Design · Database Schema · Deployment · Testing

---

## 📌 Member 3 Overview

This document covers the **backend API design**, **database schema**, **authentication system**, **deployment guide**, and **testing strategy** for Base Learn. Member 3 is responsible for setting up the server, designing APIs, managing the database, and deploying the platform.

---

## 🔐 Authentication System

### How It Works

```
User Login (email + password)
         │
         ▼
Server verifies credentials
         │
         ▼
Issues JWT Token  { userId, role, email }
         │
         ▼
Client stores token (localStorage / cookie)
         │
         ▼
Every API request sends: Authorization: Bearer <token>
         │
         ▼
Middleware verifies token + checks role
```

### User Roles & Route Access

| Role       | Value in JWT     | Can Access                                           |
|------------|------------------|------------------------------------------------------|
| Student    | `student`        | /api/student/*                                       |
| Admin      | `admin`          | /api/admin/*                                         |
| Faculty    | `faculty`        | /api/faculty/*                                       |
| Instructor | `instructor`     | /api/instructor/*                                    |

### JWT Middleware (authMiddleware.js)

```javascript
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // { userId, role, email }
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Role-based middleware
const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { protect, authorizeRoles };
```

---

## 🗄️ Database Schema (MongoDB)

### 1. User Model

```javascript
// models/User.js
{
  _id: ObjectId,
  name: String,
  email: { type: String, unique: true },
  password: String,           // bcrypt hashed
  role: {
    type: String,
    enum: ['student', 'admin', 'faculty', 'instructor'],
    default: 'student'
  },
  studentId: String,          // for students only
  department: String,         // for faculty/instructor
  profilePhoto: String,       // URL
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Course / Subject Model

```javascript
// models/Course.js
{
  _id: ObjectId,
  title: String,
  description: String,
  subject: String,
  faculty: { type: ObjectId, ref: 'User' },
  batches: [{ type: ObjectId, ref: 'Batch' }],
  createdAt: Date
}
```

### 3. Batch Model

```javascript
// models/Batch.js
{
  _id: ObjectId,
  name: String,              // e.g. "Batch A 2024"
  students: [{ type: ObjectId, ref: 'User' }],
  instructor: { type: ObjectId, ref: 'User' },
  course: { type: ObjectId, ref: 'Course' },
  createdAt: Date
}
```

### 4. Live Class Model

```javascript
// models/LiveClass.js
{
  _id: ObjectId,
  title: String,
  subject: String,
  faculty: { type: ObjectId, ref: 'User' },
  batch: { type: ObjectId, ref: 'Batch' },
  meetingLink: String,
  scheduledAt: Date,
  duration: Number,          // in minutes
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
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

### 5. Recorded Class Model

```javascript
// models/RecordedClass.js
{
  _id: ObjectId,
  title: String,
  description: String,
  subject: String,
  videoUrl: String,          // Cloudinary or YouTube URL
  thumbnail: String,
  faculty: { type: ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
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

### 6. Assignment Model

```javascript
// models/Assignment.js
{
  _id: ObjectId,
  title: String,
  description: String,
  subject: String,
  faculty: { type: ObjectId, ref: 'User' },
  batch: { type: ObjectId, ref: 'Batch' },
  deadline: Date,
  maxMarks: Number,
  allowedFileTypes: [String],  // ['pdf', 'doc', 'jpg']
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

### 7. Test Model

```javascript
// models/Test.js
{
  _id: ObjectId,
  title: String,
  subject: String,
  faculty: { type: ObjectId, ref: 'User' },
  batch: { type: ObjectId, ref: 'Batch' },
  totalMarks: Number,
  duration: Number,          // in minutes
  startTime: Date,
  endTime: Date,
  questions: [
    {
      questionText: String,
      type: { type: String, enum: ['mcq', 'short'] },
      options: [String],     // for MCQ
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
      answers: [
        {
          questionId: ObjectId,
          answer: String,
          isCorrect: Boolean
        }
      ]
    }
  ],
  createdAt: Date
}
```

---

## 🌐 API Reference

### Auth Routes

| Method | Endpoint                     | Role      | Description               |
|--------|------------------------------|-----------|---------------------------|
| POST   | /api/auth/register           | Public    | Student self-registration |
| POST   | /api/auth/login              | Public    | Login (all roles)         |
| POST   | /api/auth/forgot-password    | Public    | Send OTP to email         |
| POST   | /api/auth/reset-password     | Public    | Reset password with OTP   |
| GET    | /api/auth/me                 | All roles | Get current user profile  |

---

### Student Routes

| Method | Endpoint                              | Description                        |
|--------|---------------------------------------|------------------------------------|
| GET    | /api/student/dashboard                | Dashboard summary cards            |
| GET    | /api/student/recorded-classes         | All accessible recorded classes    |
| PATCH  | /api/student/recorded-classes/:id/progress | Update watch progress         |
| GET    | /api/student/live-classes             | Upcoming and past live classes     |
| GET    | /api/student/assignments              | All assignments for the student    |
| POST   | /api/student/assignments/:id/submit   | Submit assignment file             |
| GET    | /api/student/tests                    | Available tests                    |
| POST   | /api/student/tests/:id/attempt        | Submit test answers                |
| GET    | /api/student/progression              | Full progress report               |

---

### Admin Routes

| Method | Endpoint                              | Description                        |
|--------|---------------------------------------|------------------------------------|
| GET    | /api/admin/dashboard                  | Platform stats overview            |
| GET    | /api/admin/students                   | List all students                  |
| GET    | /api/admin/students/:id               | Get specific student               |
| PATCH  | /api/admin/students/:id/status        | Activate / deactivate student      |
| DELETE | /api/admin/students/:id               | Remove student account             |
| POST   | /api/admin/faculty                    | Create faculty account             |
| GET    | /api/admin/faculty                    | List all faculty                   |
| PATCH  | /api/admin/faculty/:id                | Update faculty profile             |
| DELETE | /api/admin/faculty/:id                | Remove faculty account             |
| POST   | /api/admin/instructors                | Create instructor account          |
| GET    | /api/admin/instructors                | List all instructors               |
| GET    | /api/admin/live-classes               | View all live classes              |
| GET    | /api/admin/recorded-classes           | View all recorded classes          |

---

### Faculty Routes

| Method | Endpoint                                          | Description                          |
|--------|---------------------------------------------------|--------------------------------------|
| GET    | /api/faculty/dashboard                            | Faculty summary dashboard            |
| POST   | /api/faculty/live-classes                         | Create a live class                  |
| GET    | /api/faculty/live-classes                         | List faculty's live classes          |
| PATCH  | /api/faculty/live-classes/:id                     | Edit live class details              |
| DELETE | /api/faculty/live-classes/:id                     | Cancel a live class                  |
| GET    | /api/faculty/live-classes/:id/attendance          | Per-student attendance for a class   |
| POST   | /api/faculty/recorded-classes                     | Upload / link a recorded class       |
| GET    | /api/faculty/recorded-classes                     | List faculty's recordings            |
| GET    | /api/faculty/recorded-classes/:id/watch-details   | Per-student watch progress           |
| POST   | /api/faculty/assignments                          | Create an assignment                 |
| GET    | /api/faculty/assignments/:id/submissions          | All submissions for assignment       |
| PATCH  | /api/faculty/assignments/:id/grade/:studentId     | Grade a student's submission         |
| POST   | /api/faculty/tests                                | Create a test                        |
| GET    | /api/faculty/tests/:id/results                    | Per-student test results             |

---

### Instructor Routes

| Method | Endpoint                                          | Description                           |
|--------|---------------------------------------------------|---------------------------------------|
| GET    | /api/instructor/dashboard                         | Instructor summary                    |
| GET    | /api/instructor/recorded-classes/pending          | Faculty uploads not yet assigned      |
| PATCH  | /api/instructor/recorded-classes/:id/assign       | Assign recording to batch/students    |
| GET    | /api/instructor/students                          | List all students in instructor scope |
| GET    | /api/instructor/students/:id/analysis             | Full analysis of a student            |
| POST   | /api/instructor/students/:id/notes                | Add instructor notes to student       |
| GET    | /api/instructor/batches                           | List batches                          |
| POST   | /api/instructor/batches                           | Create a batch                        |
| PATCH  | /api/instructor/batches/:id/students              | Add/remove students from batch        |
| POST   | /api/instructor/notifications                     | Send notification to student/batch    |

---

## 🚀 Deployment Guide

### Step 1: Setup Environment Variables

Create `.env` in the `server/` folder:

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

---

### Step 2: Deploy Backend (Render — Free Tier)

1. Go to [render.com](https://render.com) → New → **Web Service**
2. Connect your GitHub repository
3. Set:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. Add all environment variables from `.env`
5. Click **Deploy**

Your backend URL: `https://baselearn-api.onrender.com`

---

### Step 3: Deploy Frontend (Vercel — Free Tier)

1. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
2. Set:
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add environment variable:
   - `VITE_API_URL=https://baselearn-api.onrender.com`
4. Click **Deploy**

Your frontend URL: `https://baselearn.vercel.app`

---

### Step 4: Update CORS in Backend

```javascript
// server.js
const cors = require('cors');
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

---

### Step 5: MongoDB Atlas Setup

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free **M0 cluster**
3. Create a database user with password
4. Whitelist IP: **0.0.0.0/0** (allow all — for cloud hosting)
5. Get connection string → paste into `MONGO_URI` in `.env`

---

## 🧪 Testing Strategy

### Manual Testing Checklist

Before merging any feature branch, test:

**Authentication:**
- [ ] Register as student — receives JWT
- [ ] Login as each role — gets correct dashboard
- [ ] Access another role's route — should get 403 Forbidden
- [ ] Expired token — should get 401 Unauthorized

**Student:**
- [ ] View recorded classes
- [ ] Update watch progress
- [ ] Submit assignment file
- [ ] View progression stats

**Admin:**
- [ ] Add faculty account
- [ ] Deactivate a student
- [ ] Schedule a live class

**Faculty:**
- [ ] Create and view live class
- [ ] See per-student attendance
- [ ] Grade an assignment

**Instructor:**
- [ ] Assign recording to batch
- [ ] View student analysis
- [ ] Add notes to student

---

### API Testing with Thunder Client / Postman

**Import this sample test structure:**

```
Base Learn API Tests
│
├── Auth
│   ├── POST /api/auth/register
│   ├── POST /api/auth/login (student)
│   ├── POST /api/auth/login (admin)
│   └── GET  /api/auth/me
│
├── Student
│   ├── GET  /api/student/dashboard
│   ├── GET  /api/student/assignments
│   └── POST /api/student/assignments/:id/submit
│
├── Faculty
│   ├── POST /api/faculty/live-classes
│   └── GET  /api/faculty/live-classes/:id/attendance
│
└── Admin
    ├── GET  /api/admin/students
    └── POST /api/admin/faculty
```

**Set environment variable in Postman:**
```
BASE_URL = https://baselearn-api.onrender.com
TOKEN = (paste JWT after login)
```

**Auth header for all protected requests:**
```
Authorization: Bearer {{TOKEN}}
```

---

## ✅ Member 3 Responsibility Summary

| Area               | Tasks                                                              |
|--------------------|--------------------------------------------------------------------|
| Authentication     | JWT setup, role middleware, login/register API                     |
| Database           | All MongoDB models, relationships, indexing                        |
| API Design         | All REST endpoints for 4 roles                                     |
| File Uploads       | Cloudinary integration for videos and assignment files             |
| Deployment         | Render (backend), Vercel (frontend), MongoDB Atlas                 |
| Environment Config | .env setup, CORS, production configuration                         |
| Testing            | API test collection, manual testing checklist                      |

---

## 📋 Quick Reference — API Base URLs

| Environment | Base URL                                    |
|-------------|---------------------------------------------|
| Local Dev   | `http://localhost:5000/api`                 |
| Production  | `https://baselearn-api.onrender.com/api`    |
| Frontend    | `https://baselearn.vercel.app`              |

---

*Base Learn · Member 3 Document · Version 1.0*
