# 🎬 Instructor Portal — Base Learn LMS

## Overview
The Instructor Portal is focused exclusively on managing recorded video content. Instructors are responsible for uploading, organizing, and scheduling the release of pre-recorded lectures for students.

---

## Access & Login
- Dedicated **Instructor Login** page (separate from Student/Admin/Faculty login)
- Secure authenticated session with Instructor-specific permissions

---

## Dashboard
Instructor dashboard provides an overview of:
- Uploaded lectures by subject and chapter
- Scheduled content release queue
- Content organized by batch and class

---

## Content Management

### Upload Recorded Lectures
- Upload pre-recorded video lecture files
- Supported for all subjects across all batches (Class 8, 9, 10)

### Organize Lectures
- Organize uploaded lectures by:
  - Class (Batch)
  - Subject
  - Chapter

### Schedule Content Release
- Set a release date/time for recorded lectures
- Lectures become visible to students only after the scheduled release time

---

## Course Content Structure

Instructors upload content that fits into the following hierarchy:

```
Class → Subject → Chapter → Lecture Video
```

Each lecture video uploaded by the Instructor will be part of a Chapter that also includes (managed by Faculty or Admin):
- Notes
- Live class notes
- Practice questions
- PYQs

---

## Technical Notes
- Mobile responsive interface
- Secure role-based access (Instructors cannot access Admin, Faculty, or Student controls)
- Fast video upload support for large lecture files
- Scheduled release ensures structured content delivery to students
