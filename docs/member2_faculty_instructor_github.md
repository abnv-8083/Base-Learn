# 🎓 Base Learn — E-Learning Platform
### Member 2 Document · Faculty Role · Instructor Role · GitHub Workflow

---

## 📌 Member 2 Overview

This document covers the **Faculty** and **Instructor** role implementations, along with the complete **GitHub collaboration workflow** for the 3-member team. Member 2 is responsible for building the Faculty and Instructor dashboards and setting up the team's Git practices.

---

## 👩‍🏫 Role 3 — Faculty

### What is Faculty?

Faculty members are the **content owners and teachers**. They create and manage live classes, recorded classes, assignments, and tests. They can see detailed activity for every student in their courses.

---

### Features

#### 1. Faculty Login
- Dedicated login page (no self-registration — admin creates accounts)
- JWT authentication with role: `faculty`
- Persistent session with remember-me option
- Secure logout and session expiry

#### 2. Manage Live Classes
- Create new live class with:
  - Title, subject, date, time, duration
  - Meeting link (Google Meet / Zoom URL)
  - Target student group or batch
- Edit or cancel scheduled live classes
- View each student's live class details:
  - Attended or not
  - Join time and leave time
  - Participation notes

**Live Class Student Detail Table (Per Class):**

| Student Name | Student ID | Attended | Join Time | Duration Stayed | Status     |
|--------------|------------|----------|-----------|-----------------|------------|
| Arjun R.     | ST001      | ✅ Yes   | 10:02 AM  | 48 min          | Completed  |
| Priya S.     | ST002      | ❌ No    | —         | —               | Absent     |

#### 3. Manage Recorded Classes
- Upload or link recorded class videos
  - Via URL (YouTube/Vimeo) or direct file upload (Cloudinary/S3)
  - Add title, description, subject tag, and thumbnail
- Organize recordings by subject and week/module
- See per-student recorded class details:
  - Watched or not
  - Watch percentage
  - Last watched timestamp
  - Number of times rewatched

**Recorded Class Student Detail Table (Per Recording):**

| Student Name | Watched | Watch % | Last Watched         | Rewatches |
|--------------|---------|---------|----------------------|-----------|
| Arjun R.     | ✅ Yes  | 87%     | 2024-03-10 9:00 AM   | 2         |
| Priya S.     | ✅ Yes  | 45%     | 2024-03-11 3:00 PM   | 1         |
| Rahul M.     | ❌ No   | 0%      | —                    | 0         |

#### 4. Manage Assignments
- Create new assignments with:
  - Title, description, subject
  - Deadline date and time
  - Allowed file types (PDF, DOC, image)
  - Maximum marks
- View per-student assignment details:
  - Submission status (Pending / Submitted / Late)
  - Submission date and file
  - Grade and feedback given
- Grade submissions inline with marks and text feedback
- Bulk download all submissions as ZIP

**Assignment Student Detail Table:**

| Student Name | Status      | Submitted On        | Marks | Feedback         |
|--------------|-------------|---------------------|-------|------------------|
| Arjun R.     | Submitted   | 2024-03-08 11:30 AM | 18/20 | Good work!       |
| Priya S.     | Late        | 2024-03-09 9:00 AM  | 12/20 | Late submission  |
| Rahul M.     | Pending     | —                   | —     | —                |

#### 5. Manage Tests
- Create online tests with:
  - MCQ or short-answer questions
  - Time limit, total marks, attempt limit
  - Scheduled start and end time
- View per-student test details:
  - Attempted or not
  - Score and percentage
  - Time taken
  - Correct vs incorrect answers breakdown

**Test Student Detail Table:**

| Student Name | Attempted | Score    | Time Taken | Percentage |
|--------------|-----------|----------|------------|------------|
| Arjun R.     | ✅ Yes    | 16/20    | 22 min     | 80%        |
| Priya S.     | ✅ Yes    | 11/20    | 30 min     | 55%        |
| Rahul M.     | ❌ No     | —        | —          | —          |

---

### Faculty Page Flow

```
Faculty Login
     │
     ▼
Faculty Dashboard (Summary Cards)
     │
     ├── Live Classes
     │      ├── Create New Class
     │      ├── View All Classes
     │      └── View Student Details per Class
     │
     ├── Recorded Classes
     │      ├── Upload / Link Video
     │      ├── Manage Recordings
     │      └── View Student Watch Details
     │
     ├── Assignments
     │      ├── Create Assignment
     │      ├── View Submissions
     │      ├── Grade Submissions
     │      └── View Student Assignment Details
     │
     └── Tests
            ├── Create Test
            ├── View Results
            └── View Student Test Details
```

---

## 🧑‍💻 Role 4 — Instructor

### What is an Instructor?

Instructors are **support staff** who assist faculty. They manage the flow of recorded content from faculty to students and help monitor individual student progress and performance.

---

### Features

#### 1. Instructor Login
- Dedicated login page (admin creates instructor accounts)
- JWT authentication with role: `instructor`
- Separate dashboard from faculty and admin

#### 2. Move Recorded Classes (Faculty ➜ Student)
- View all recorded classes uploaded by faculty
- Assign / publish recordings to specific student groups or individual students
- Set visibility (draft / published / archived)
- Schedule publish date for timed content release
- Track which recordings are assigned and to whom

**Content Pipeline View:**

```
Faculty Uploads Recording
         │
         ▼
Instructor Reviews Content
         │
         ▼
Instructor Assigns to Student Group / Individual
         │
         ▼
Student Can Now View Recording in Dashboard
```

| Recording Title          | Uploaded By  | Status    | Assigned To        | Publish Date  |
|--------------------------|--------------|-----------|--------------------|---------------|
| Intro to Algorithms      | Dr. Meena    | Published | Batch A & B        | Mar 10, 2024  |
| Data Structures - Trees  | Dr. Meena    | Draft     | Not assigned yet   | —             |
| Web Dev Basics           | Prof. Rajan  | Published | Batch C            | Mar 12, 2024  |

#### 3. Analyse Each Student
- View individual student profile with full learning data:
  - Live class attendance history
  - Recorded class watch progress
  - Assignment submission rate and average grade
  - Test scores and trends over time
- Compare student performance against batch average
- Flag students who are at risk (low attendance, missing assignments)
- Add instructor notes or observations per student
- Generate a student progress summary report (downloadable PDF/CSV)

**Student Analysis Dashboard:**

```
Student: Arjun R. (ST001)
─────────────────────────────────────
Live Class Attendance:    9/12 (75%)
Recorded Class Progress:  85% avg watch
Assignment Submission:    8/10 submitted
Average Assignment Grade: 17.5/20
Test Average Score:       78%

Status: 🟡 Good — Watch attendance rate
```

#### 4. Other Useful Features
- **Batch Management:** Group students into batches for organized content delivery
- **Notification System:** Send targeted messages to individual students or batches
- **Content Calendar:** Visual calendar view of all scheduled classes and deadlines
- **Progress Reports:** Generate and download batch-level performance summaries
- **Escalation Alerts:** Notify faculty when a student's performance drops below threshold

---

### Instructor Page Flow

```
Instructor Login
     │
     ▼
Instructor Dashboard
     │
     ├── Recorded Class Pipeline
     │      ├── View Faculty Uploads
     │      ├── Assign to Students / Batches
     │      └── Manage Published Content
     │
     ├── Student Analysis
     │      ├── Search Student
     │      ├── View Full Profile & Stats
     │      ├── Add Notes / Flag Students
     │      └── Download Progress Report
     │
     ├── Batch Management
     │      ├── Create / Edit Batches
     │      └── Assign Students to Batches
     │
     └── Notifications & Alerts
            ├── Send Message to Student/Batch
            └── View At-Risk Student Alerts
```

---

## 🐙 GitHub Workflow — 3 Member Team

### Step 1: Repository Setup (Do This Once)

**Member 1 (Team Lead) creates the repo:**

```bash
# 1. Create repo on GitHub (set to Public or Private)
# 2. Clone locally
git clone https://github.com/your-org/baselearn.git
cd baselearn

# 3. Create initial project structure
# 4. Push to main
git add .
git commit -m "chore: initial project setup"
git push origin main
```

**All Members clone the repo:**

```bash
git clone https://github.com/your-org/baselearn.git
cd baselearn
```

---

### Step 2: Branch Strategy

Use the **Feature Branch Workflow**. Never commit directly to `main`.

```
main                  ← Production-ready code only
  └── develop         ← Integration branch (merge features here first)
        ├── feature/student-dashboard     ← Member 1
        ├── feature/admin-panel           ← Member 1
        ├── feature/faculty-module        ← Member 2
        ├── feature/instructor-module     ← Member 2
        └── feature/api-database          ← Member 3
```

**Creating your branch:**

```bash
# Always branch off develop, never main
git checkout develop
git pull origin develop
git checkout -b feature/faculty-module
```

---

### Step 3: Daily Git Workflow

```bash
# Start of each day — sync latest code
git checkout develop
git pull origin develop
git checkout feature/faculty-module
git merge develop          # Bring in teammates' latest changes

# Work on your feature...

# Stage and commit your changes
git add .
git commit -m "feat: add faculty live class management page"

# Push your branch to GitHub
git push origin feature/faculty-module
```

---

### Step 4: Commit Message Convention

Use **Conventional Commits** so history is clean and readable:

| Prefix     | When to use                               | Example                                      |
|------------|-------------------------------------------|----------------------------------------------|
| `feat:`    | New feature added                         | `feat: add student assignment upload`        |
| `fix:`     | Bug fix                                   | `fix: resolve login redirect issue`          |
| `chore:`   | Setup, config, dependencies               | `chore: install axios and react-router`      |
| `style:`   | UI/CSS changes only                       | `style: update faculty dashboard card color` |
| `refactor:`| Code restructured, no behavior change     | `refactor: simplify auth middleware`         |
| `docs:`    | Documentation update                      | `docs: update README with setup steps`       |
| `test:`    | Adding or updating tests                  | `test: add unit tests for login API`         |

---

### Step 5: Pull Requests (PR) Process

1. Push your feature branch to GitHub
2. Go to GitHub → click **"Compare & Pull Request"**
3. Set base branch as `develop` (not `main`)
4. Write a clear PR title and description:

```
Title: feat: Faculty Module — Live Class Management

Description:
- Added faculty live class creation form
- View all scheduled live classes
- Per-student attendance detail table
- API calls connected to /api/faculty/live-classes

Tested: ✅ Manually tested on local
Screenshots: [attach UI screenshots]
```

5. Request review from at least 1 teammate
6. Reviewer checks code, approves, or requests changes
7. After approval → **Squash and Merge** into `develop`

---

### Step 6: Handling Merge Conflicts

```bash
# When a conflict occurs during merge:
git checkout feature/faculty-module
git merge develop

# Git will show conflict markers in files:
<<<<<<< HEAD
  your code here
=======
  teammate's code here
>>>>>>> develop

# Manually fix the conflict in the file
# Then:
git add conflicted-file.js
git commit -m "fix: resolve merge conflict in faculty routes"
git push origin feature/faculty-module
```

---

### Step 7: Branch Protection Rules (GitHub Settings)

Go to: **Repository → Settings → Branches → Add Rule**

For `main` branch:
- ✅ Require pull request reviews before merging
- ✅ Require at least 1 approving review
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Do not allow direct pushes

---

### Step 8: GitHub Project Board (Task Management)

Use **GitHub Projects** (free) to track tasks:

```
Backlog → In Progress → Review → Done
```

Each feature or task = one GitHub Issue.

**Creating an Issue:**

```
Title: [Member 2] Build Faculty Assignment Grading Page

Labels: feature, member-2
Assignee: @member2
Milestone: Sprint 1

Description:
- Grade submitted assignments inline
- Add marks and text feedback
- Connect to PATCH /api/faculty/assignments/:id/grade
```

Link the Issue to your PR using: `Closes #12` in the PR description.

---

### Step 9: .gitignore File

```
# Node
node_modules/
npm-debug.log*

# Environment
.env
.env.local
.env.production

# Build
dist/
build/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

---

### Step 10: Weekly Sync Checklist (Team Practice)

Every week, the team should:

- [ ] Merge all approved PRs from `feature/*` into `develop`
- [ ] Do a quick demo of completed features
- [ ] Assign new Issues for the coming week
- [ ] Resolve any blockers or dependency conflicts
- [ ] Keep `main` updated: merge `develop` into `main` when stable

---

## ✅ Member 2 Responsibility Summary

| Area                 | Tasks                                                      |
|----------------------|------------------------------------------------------------|
| Faculty Module       | Login, Live Classes, Recorded Classes, Assignments, Tests  |
| Instructor Module    | Login, Content Pipeline, Student Analysis, Batch Mgmt      |
| GitHub Workflow      | Branch strategy, PR process, commit conventions, board     |
| Per-student Tables   | Detail views for all faculty-managed content               |

---

*Base Learn · Member 2 Document · Version 1.0*
