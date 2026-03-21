# 🎓 Student Portal — Base Learn LMS

## Overview
The Student Portal is the primary learning interface for students enrolled in Base Learn. Students can access all learning content, attend live classes, practice questions, and track their own progress.

---

## Registration
Students must register before accessing any course content.

### Registration Form Fields
- Student Name
- Date of Birth
- Country Code
- Mobile Number
- Email Address
- District

---

## Login
Students can log in using:
- **Mobile Number** + Password
- **Email Address** + Password

---

## Dashboard
After login, students see:
- Batch details (Class 8 / 9 / 10)
- Faculty details assigned to their batch
- Subject details for their enrolled batch

> Reference design: Xylem Website

---

## Payment & Enrollment
- Students must complete payment before accessing course materials
- Supported payment methods:
  - UPI
  - Razorpay
  - Debit / Credit Card
  - Net Banking

---

## Course Structure
Content is organized in the following hierarchy:

```
Class → Subject → Chapter → Content
```

### Each Chapter includes:
- 🎥 Lecture Video (Recorded)
- 📄 Notes
- 📋 Live Class Notes
- ✏️ Practice Questions (Daily Practice Problems)
- 📚 Previous Year Questions (PYQs)

---

## Learning Content

### Recorded Classes
- Video lectures uploaded by Instructors
- Organized by subject and chapter
- Available on-demand

### Live Classes
- Scheduled live sessions conducted by Faculty
- Student can see Faculty; Faculty can see all Students
- Attendance is tracked automatically

### Notes
- Recorded class notes
- Live class notes
- Previous Year Question (PYQ) notes

---

## Practice & Assessment

### Practice Questions
- Chapter-wise practice questions
- Daily Practice Problems (DPP)

### Previous Year Questions (PYQs)
- Chapter-wise PYQ sets for exam preparation

---

## FAQ Section
- Frequently Asked Questions
- Common academic doubts answered

---

## Technical Notes
- Mobile responsive design
- Fast video streaming
- Secure login
- Notifications for new content, live class schedules
- Progress tracking across all subjects and chapters
