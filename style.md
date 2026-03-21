# 🎨 Base Learn — Style Guide
### Complete Design System · CSS Documentation · Component Reference

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Typography](#2-typography)
3. [Color System](#3-color-system)
4. [Spacing & Layout](#4-spacing--layout)
5. [Border Radius & Shadows](#5-border-radius--shadows)
6. [CSS Variables Reference](#6-css-variables-reference)
7. [Layout & App Shell](#7-layout--app-shell)
8. [Sidebar](#8-sidebar)
9. [Topbar](#9-topbar)
10. [Buttons](#10-buttons)
11. [Forms & Inputs](#11-forms--inputs)
12. [Cards](#12-cards)
13. [Stat Cards](#13-stat-cards)
14. [Tables](#14-tables)
15. [Badges & Status Pills](#15-badges--status-pills)
16. [Progress Bars](#16-progress-bars)
17. [Tabs](#17-tabs)
18. [Modal](#18-modal)
19. [Toast Notifications](#19-toast-notifications)
20. [Auth Pages](#20-auth-pages)
21. [Role-specific Components](#21-role-specific-components)
22. [Animations](#22-animations)
23. [Responsive Breakpoints](#23-responsive-breakpoints)
24. [Utility Classes](#24-utility-classes)

---

## 1. Design Philosophy

Base Learn uses a **refined, professional aesthetic** built around clarity and focus. The design language avoids visual noise and keeps the student's learning content front and center.

**Core Principles:**

- **Hierarchy First** — Typography weight, size, and color carry the structure. No element competes for the wrong level of attention.
- **Role-aware Color** — Each of the 4 roles has a dedicated accent color so users always know where they are in the system.
- **Subtle Depth** — Layering is done with shadows and border tints, never harsh outlines or block borders.
- **Motion with Purpose** — Animations are used only where they reinforce feedback or orientation (entering modals, success toasts, page load staggering).
- **Responsive by default** — Every component is built mobile-first and tested at 3 breakpoints.

**Aesthetic Direction:** Deep navy command + electric cyan spark. Clean, trustworthy, modern — not corporate gray, not playful pastel.

---

## 2. Typography

### Font Stack

| Role     | Font Family    | Usage                                      |
|----------|----------------|--------------------------------------------|
| Heading  | **Sora**       | All headings, page titles, card titles, sidebar logo |
| Body     | **DM Sans**    | All body text, labels, buttons, form inputs |
| Mono     | **DM Mono**    | Student IDs, code, API references, tags    |

### Import (in HTML head or main CSS)

```css
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
```

### Type Scale

| Token       | Size     | px   | Usage                                  |
|-------------|----------|------|----------------------------------------|
| `--text-xs`   | 0.75rem  | 12px | Labels, captions, badge text, metadata |
| `--text-sm`   | 0.875rem | 14px | Body text, table cells, form text      |
| `--text-base` | 1rem     | 16px | Default body, button labels            |
| `--text-lg`   | 1.125rem | 18px | Card titles, secondary headings        |
| `--text-xl`   | 1.25rem  | 20px | Section headings, modal titles         |
| `--text-2xl`  | 1.5rem   | 24px | h3, card feature headings              |
| `--text-3xl`  | 1.875rem | 30px | h2, page secondary headings            |
| `--text-4xl`  | 2.25rem  | 36px | h1, page primary headings              |
| `--text-5xl`  | 3rem     | 48px | Hero headings, auth illustration text  |

### Font Weights

| Token           | Value | Usage                          |
|-----------------|-------|--------------------------------|
| `--fw-light`    | 300   | Decorative subheadings         |
| `--fw-regular`  | 400   | Body text, descriptions        |
| `--fw-medium`   | 500   | Navigation items, subtle labels|
| `--fw-semibold` | 600   | Form labels, card subtitles    |
| `--fw-bold`     | 700   | Card titles, section headings  |
| `--fw-extrabold`| 800   | Page titles, stat values, h1   |

### Heading Defaults

All `h1–h6` tags automatically use:
- Font: `Sora`
- `letter-spacing: -0.02em` (tighter for display legibility)
- `line-height: 1.2`

---

## 3. Color System

### Brand Colors

| Token                  | Value     | Swatch | Usage                              |
|------------------------|-----------|--------|------------------------------------|
| `--color-primary`      | `#0F2D6B` | 🟦     | Primary CTAs, nav active, headings |
| `--color-primary-light`| `#1A3F8F` | 🔵     | Hover states, gradients            |
| `--color-primary-dark` | `#091E4A` | 🔷     | Shadows, deep backgrounds          |
| `--color-accent`       | `#00C2FF` | 🩵     | Links, active indicators, glows    |
| `--color-accent-glow`  | `rgba(0,194,255,0.18)` | — | Focus rings, glows     |
| `--color-accent-subtle`| `rgba(0,194,255,0.08)` | — | Hover backgrounds      |

### Role Colors

Each role has a dedicated color used for stat card top borders, badges, and role-specific UI accents.

| Role       | Token                   | Value     | Swatch |
|------------|-------------------------|-----------|--------|
| Student    | `--color-student`       | `#6366F1` | 🟣     |
| Admin      | `--color-admin`         | `#EF4444` | 🔴     |
| Faculty    | `--color-faculty`       | `#10B981` | 🟢     |
| Instructor | `--color-instructor`    | `#F59E0B` | 🟡     |

### Neutral Palette

| Token                    | Value     | Usage                               |
|--------------------------|-----------|-------------------------------------|
| `--color-bg`             | `#F0F4FF` | Page background (soft lavender-white) |
| `--color-surface`        | `#FFFFFF` | Cards, modals, panels               |
| `--color-surface-raised` | `#FAFCFF` | Card footers, nested surfaces       |
| `--color-border`         | `#E2E8F8` | Dividers, input outlines            |
| `--color-border-strong`  | `#C7D2EC` | Focused borders, hover outlines     |

### Text Colors

| Token                   | Value     | Usage                          |
|-------------------------|-----------|--------------------------------|
| `--color-text-primary`  | `#0D1B3E` | Headings, strong labels        |
| `--color-text-secondary`| `#4A5680` | Body paragraphs, descriptions  |
| `--color-text-muted`    | `#8492B4` | Placeholder, captions, metadata|
| `--color-text-inverse`  | `#FFFFFF` | Text on dark backgrounds       |

### Semantic Colors

| Token                  | Value     | Light Token               | Usage                        |
|------------------------|-----------|---------------------------|------------------------------|
| `--color-success`      | `#22C55E` | `--color-success-light`   | Submitted, completed, active |
| `--color-warning`      | `#F59E0B` | `--color-warning-light`   | Pending, at-risk, draft      |
| `--color-error`        | `#EF4444` | `--color-error-light`     | Failed, absent, late         |
| `--color-info`         | `#3B82F6` | `--color-info-light`      | Informational states         |

---

## 4. Spacing & Layout

### Spacing Scale

All spacing uses a consistent 4px base unit (`--space-1 = 4px`):

| Token       | Value   | px   |
|-------------|---------|------|
| `--space-1` | 0.25rem | 4px  |
| `--space-2` | 0.5rem  | 8px  |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem    | 16px |
| `--space-5` | 1.25rem | 20px |
| `--space-6` | 1.5rem  | 24px |
| `--space-8` | 2rem    | 32px |
| `--space-10`| 2.5rem  | 40px |
| `--space-12`| 3rem    | 48px |
| `--space-16`| 4rem    | 64px |

### Grid System

Use `.dashboard-grid` variants for page layouts:

```html
<!-- 2-column equal grid -->
<div class="dashboard-grid"> ... </div>

<!-- 3-column equal grid -->
<div class="dashboard-grid--3"> ... </div>

<!-- Sidebar aside layout: main + 340px right column -->
<div class="dashboard-grid--aside"> ... </div>
```

---

## 5. Border Radius & Shadows

### Border Radius

| Token          | Value  | Usage                              |
|----------------|--------|------------------------------------|
| `--radius-sm`  | 6px    | Tags, small buttons, inputs        |
| `--radius-md`  | 10px   | Buttons, nav items, dropdowns      |
| `--radius-lg`  | 16px   | Cards, modals, filter zones        |
| `--radius-xl`  | 24px   | Page cards, main panels            |
| `--radius-2xl` | 32px   | Hero sections, full-width panels   |
| `--radius-full`| 9999px | Pills, avatars, badges, chips      |

### Shadow Scale

| Token          | Value                                  | Usage                     |
|----------------|----------------------------------------|---------------------------|
| `--shadow-xs`  | `0 1px 3px rgba(15,45,107,0.06)`       | Subtle lift (table rows)  |
| `--shadow-sm`  | `0 2px 8px rgba(15,45,107,0.08)`       | Cards, default            |
| `--shadow-md`  | `0 4px 20px rgba(15,45,107,0.10)`      | Hovered cards             |
| `--shadow-lg`  | `0 8px 40px rgba(15,45,107,0.14)`      | Modals, dropdowns         |
| `--shadow-xl`  | `0 16px 64px rgba(15,45,107,0.18)`     | Toasts, elevated panels   |
| `--shadow-accent`| `0 4px 24px rgba(0,194,255,0.22)`   | Accent buttons, glow      |

---

## 6. CSS Variables Reference

All design tokens are defined as CSS custom properties on `:root`. Import once and use everywhere.

```css
/* Access any token */
background: var(--color-primary);
font-size: var(--text-lg);
padding: var(--space-4) var(--space-6);
border-radius: var(--radius-xl);
box-shadow: var(--shadow-md);
transition: all var(--transition-base);
```

### Transitions

| Token                 | Value                               | Usage                    |
|-----------------------|-------------------------------------|--------------------------|
| `--transition-fast`   | `150ms ease`                        | Hover color changes      |
| `--transition-base`   | `250ms ease`                        | Sidebar, modal open      |
| `--transition-slow`   | `400ms ease`                        | Progress bar fill        |
| `--transition-bounce` | `300ms cubic-bezier(0.34,1.56,0.64,1)` | Playful micro-interactions |

---

## 7. Layout & App Shell

### HTML Structure

Every authenticated page uses this shell:

```html
<div class="app-layout">

  <!-- Sidebar (fixed left) -->
  <aside class="sidebar"> ... </aside>

  <!-- Main content area -->
  <div class="main-content">

    <!-- Sticky top bar -->
    <header class="topbar"> ... </header>

    <!-- Page content -->
    <main class="page-body">
      <div class="page-header"> ... </div>
      <!-- Page-specific content here -->
    </main>

  </div>
</div>
```

Sidebar width is `260px` on desktop, collapses off-screen on mobile with class `.sidebar.open` toggled via JavaScript.

---

## 8. Sidebar

```html
<aside class="sidebar">

  <!-- Logo -->
  <a href="/dashboard" class="sidebar-logo">
    <div class="sidebar-logo-icon">🎓</div>
    <span class="sidebar-logo-text">Base<span>Learn</span></span>
  </a>

  <!-- Navigation -->
  <nav class="sidebar-nav">

    <span class="sidebar-section-label">Main Menu</span>

    <a href="/dashboard" class="nav-item active">
      <svg class="nav-item-icon"> ... </svg>
      Dashboard
    </a>

    <a href="/classes" class="nav-item">
      <svg class="nav-item-icon"> ... </svg>
      Live Classes
      <span class="nav-badge">3</span>
    </a>

  </nav>

  <!-- User info at bottom -->
  <a href="/profile" class="sidebar-user">
    <img src="avatar.jpg" class="sidebar-avatar" alt="User" />
    <div class="sidebar-user-info">
      <div class="sidebar-user-name">Arjun Raj</div>
      <div class="sidebar-user-role">Student</div>
    </div>
  </a>

</aside>
```

**Active state:** Add `.active` class to the current page's `.nav-item`.
**Badge:** Add `.nav-badge` span inside `.nav-item` for notification counts.

---

## 9. Topbar

```html
<header class="topbar">
  <div class="topbar-left">
    <nav class="topbar-breadcrumb">
      <a href="/dashboard">Dashboard</a>
      <span class="separator">/</span>
      <span class="current">Assignments</span>
    </nav>
  </div>

  <div class="topbar-right">
    <!-- Search -->
    <div class="topbar-search">
      <svg class="topbar-search-icon"> ... </svg>
      <input type="text" placeholder="Search..." />
    </div>

    <!-- Notification Bell -->
    <button class="icon-btn">
      🔔
      <span class="notification-dot"></span>
    </button>

    <!-- Profile -->
    <button class="icon-btn">👤</button>
  </div>
</header>
```

---

## 10. Buttons

### Variants

```html
<!-- Primary — main actions -->
<button class="btn btn-primary">Save Changes</button>

<!-- Accent — highest emphasis CTA -->
<button class="btn btn-accent">Join Live Class</button>

<!-- Secondary — supporting actions -->
<button class="btn btn-secondary">Cancel</button>

<!-- Ghost — tertiary / text-like actions -->
<button class="btn btn-ghost">View Details</button>

<!-- Danger — destructive actions -->
<button class="btn btn-danger">Delete Student</button>

<!-- Success — positive confirmations -->
<button class="btn btn-success">Mark as Complete</button>
```

### Sizes

```html
<button class="btn btn-primary btn-xs">Tiny</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-xl">Extra Large</button>
<button class="btn btn-primary btn-block">Full Width</button>
```

### With Icons

```html
<button class="btn btn-primary">
  <svg>...</svg>
  Add Student
</button>

<!-- Icon-only button -->
<button class="btn btn-secondary btn-icon">
  <svg>...</svg>
</button>
```

### States

```html
<!-- Disabled -->
<button class="btn btn-primary" disabled>Disabled</button>

<!-- Loading -->
<button class="btn btn-primary loading">Saving...</button>
```

---

## 11. Forms & Inputs

### Basic Input

```html
<div class="form-group">
  <label class="form-label">
    Email Address
    <span class="required">*</span>
  </label>
  <input type="email" class="form-input" placeholder="you@example.com" />
  <span class="form-helper">We'll send your login link here.</span>
</div>
```

### Input with Icon

```html
<div class="form-group">
  <label class="form-label">Search Students</label>
  <div class="input-group">
    <svg class="input-group-icon">...</svg>
    <input type="text" class="form-input" placeholder="Search by name or ID" />
  </div>
</div>
```

### Select Dropdown

```html
<div class="form-group">
  <label class="form-label">Assign to Batch</label>
  <select class="form-select">
    <option value="">Select a batch...</option>
    <option value="a">Batch A</option>
    <option value="b">Batch B</option>
  </select>
</div>
```

### Textarea

```html
<div class="form-group">
  <label class="form-label">Assignment Description</label>
  <textarea class="form-textarea" placeholder="Write instructions..."></textarea>
</div>
```

### Error State

```html
<input type="email" class="form-input error" value="invalid" />
<span class="form-error">⚠ Please enter a valid email address.</span>
```

### File Upload Zone

```html
<div class="file-upload-zone">
  <div class="file-upload-icon">📁</div>
  <div class="file-upload-text">
    <strong>Click to upload</strong> or drag and drop
  </div>
  <div class="file-upload-hint">PDF, DOC, JPG up to 10MB</div>
</div>
```

---

## 12. Cards

### Basic Card

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Recent Assignments</h3>
    <button class="btn btn-ghost btn-sm">View All</button>
  </div>
  <div class="card-body">
    <!-- Content -->
  </div>
  <div class="card-footer">
    <!-- Footer actions -->
  </div>
</div>
```

### Course / Recording Card

```html
<div class="course-card">
  <div class="course-card-thumb">
    <img src="thumbnail.jpg" alt="Class Thumbnail" />
    <span class="course-card-badge">48 min</span>
    <div class="course-card-play">▶</div>
  </div>
  <div class="course-card-body">
    <span class="course-card-subject">Data Structures</span>
    <h4 class="course-card-title">Introduction to Binary Trees</h4>
    <div class="course-card-meta">
      <span class="course-card-meta-item">📅 Mar 10</span>
      <span class="course-card-meta-item">👩‍🏫 Dr. Meena</span>
    </div>
  </div>
  <div class="course-card-progress">
    <div class="progress-bar-wrap">
      <div class="progress-bar-label">
        <span>Progress</span>
        <span>87%</span>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width: 87%"></div>
      </div>
    </div>
  </div>
</div>
```

---

## 13. Stat Cards

Used in all role dashboards for KPI summaries.

```html
<div class="stats-grid">

  <div class="stat-card stat-card--accent">
    <div class="stat-card-header">
      <div class="stat-card-icon">📚</div>
      <div class="stat-card-trend up">↑ 12%</div>
    </div>
    <div>
      <div class="stat-card-value">24</div>
      <div class="stat-card-label">Recorded Classes</div>
    </div>
  </div>

  <div class="stat-card stat-card--success">
    <div class="stat-card-header">
      <div class="stat-card-icon">✅</div>
      <div class="stat-card-trend up">↑ 5%</div>
    </div>
    <div>
      <div class="stat-card-value">8/10</div>
      <div class="stat-card-label">Assignments Submitted</div>
    </div>
  </div>

</div>
```

**Color modifiers:** `.stat-card--student` `.stat-card--admin` `.stat-card--faculty` `.stat-card--warning` `.stat-card--success` `.stat-card--accent`

---

## 14. Tables

```html
<div class="table-wrap">
  <table class="table">
    <thead>
      <tr>
        <th>Student</th>
        <th>Attended</th>
        <th>Join Time</th>
        <th class="sortable">Duration ↕</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="table-user">
            <div class="table-avatar avatar-sm">AR</div>
            <div>
              <div class="table-user-name">Arjun Raj</div>
              <div class="table-user-email">ST001</div>
            </div>
          </div>
        </td>
        <td>✅ Yes</td>
        <td>10:02 AM</td>
        <td>48 min</td>
        <td><span class="badge badge-completed">Completed</span></td>
        <td>
          <button class="btn btn-ghost btn-xs">View</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 15. Badges & Status Pills

```html
<!-- Generic -->
<span class="badge badge-success">Active</span>
<span class="badge badge-error">Inactive</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-muted">Draft</span>

<!-- With dot indicator -->
<span class="badge badge-success">
  <span class="badge-dot"></span>
  Online
</span>

<!-- Assignment statuses -->
<span class="badge badge-submitted">Submitted</span>
<span class="badge badge-pending">Pending</span>
<span class="badge badge-graded">Graded</span>
<span class="badge badge-late">Late</span>

<!-- Live class statuses -->
<span class="badge badge-upcoming">Upcoming</span>
<span class="badge badge-completed">Completed</span>
<span class="badge badge-cancelled">Cancelled</span>

<!-- Recording statuses -->
<span class="badge badge-published">Published</span>
<span class="badge badge-draft">Draft</span>
<span class="badge badge-archived">Archived</span>
```

---

## 16. Progress Bars

```html
<!-- Basic -->
<div class="progress-bar-wrap">
  <div class="progress-bar-label">
    <span>Course Progress</span>
    <span>65%</span>
  </div>
  <div class="progress-bar-track">
    <div class="progress-bar-fill" style="width: 65%"></div>
  </div>
</div>

<!-- Large -->
<div class="progress-bar-track progress-bar-track--lg">
  <div class="progress-bar-fill" style="width: 80%"></div>
</div>

<!-- Colored variants -->
<div class="progress-bar-fill progress-bar-fill--success" style="width: 90%"></div>
<div class="progress-bar-fill progress-bar-fill--warning" style="width: 45%"></div>
<div class="progress-bar-fill progress-bar-fill--error"   style="width: 20%"></div>
```

---

## 17. Tabs

### Pill Tabs (default)

```html
<div class="tabs">
  <button class="tab active">All Classes</button>
  <button class="tab">Live</button>
  <button class="tab">Recorded</button>
  <button class="tab">Assignments</button>
</div>
```

### Underline Tabs

```html
<div class="tabs-underline">
  <button class="tab-underline active">Submissions</button>
  <button class="tab-underline">Grades</button>
  <button class="tab-underline">Analytics</button>
</div>
```

---

## 18. Modal

```html
<!-- Overlay -->
<div class="modal-overlay">
  <div class="modal modal--lg">

    <div class="modal-header">
      <h3 class="modal-title">Create Assignment</h3>
      <button class="modal-close">✕</button>
    </div>

    <div class="modal-body">
      <!-- Form content here -->
    </div>

    <div class="modal-footer">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Create Assignment</button>
    </div>

  </div>
</div>
```

**Size modifiers:** `.modal--sm` (400px) · `.modal` (540px default) · `.modal--lg` (720px) · `.modal--xl` (960px)

---

## 19. Toast Notifications

```html
<div class="toast-container">

  <div class="toast toast-success">
    <svg class="toast-icon">...</svg>
    <div class="toast-content">
      <div class="toast-title">Assignment Graded</div>
      <div class="toast-message">Arjun Raj received 18/20 marks.</div>
    </div>
  </div>

  <div class="toast toast-error">
    <svg class="toast-icon">...</svg>
    <div class="toast-content">
      <div class="toast-title">Upload Failed</div>
      <div class="toast-message">File size exceeds the 10MB limit.</div>
    </div>
  </div>

</div>
```

**Variants:** `.toast-success` `.toast-error` `.toast-warning` `.toast-info`

---

## 20. Auth Pages

```html
<div class="auth-layout">

  <!-- Left panel — illustration (hidden on mobile) -->
  <div class="auth-illustration">
    <div class="auth-illustration-content">
      <div class="auth-illustration-logo">...</div>
      <h1 class="auth-illustration-heading">
        Learn Without<br><span>Limits</span>
      </h1>
      <p class="auth-illustration-sub">
        Base Learn brings live classes, recorded content,
        and assignments to one focused platform.
      </p>
      <div class="auth-features">
        <div class="auth-feature-item">
          <div class="auth-feature-check">✓</div>
          Track your learning progress in real time
        </div>
        <div class="auth-feature-item">
          <div class="auth-feature-check">✓</div>
          Join live classes from any device
        </div>
        <div class="auth-feature-item">
          <div class="auth-feature-check">✓</div>
          Submit and receive graded assignments instantly
        </div>
      </div>
    </div>
  </div>

  <!-- Right panel — form -->
  <div class="auth-form-panel">
    <div class="auth-form-wrap">

      <!-- Role selector -->
      <div class="role-tabs">
        <button class="role-tab active">Student</button>
        <button class="role-tab">Admin</button>
        <button class="role-tab">Faculty</button>
        <button class="role-tab">Instructor</button>
      </div>

      <h2 class="auth-form-heading">Welcome Back</h2>
      <p class="auth-form-sub">Sign in to continue to Base Learn</p>

      <!-- Form fields -->
      <div class="form-group"> ... </div>
      <div class="form-group"> ... </div>

      <button class="btn btn-primary btn-block btn-lg">Sign In</button>

      <p class="auth-footer-text">
        Don't have an account? <a href="/register">Register here</a>
      </p>

    </div>
  </div>

</div>
```

---

## 21. Role-specific Components

### Live Class Banner (Student Dashboard)

```html
<div class="live-banner">
  <div class="live-banner-content">
    <div class="live-badge">
      <span class="live-dot"></span>
      LIVE NOW
    </div>
    <h3 class="live-banner-title">Introduction to Algorithms</h3>
    <p class="live-banner-meta">Dr. Meena · Started 5 minutes ago · 28 students joined</p>
  </div>
  <button class="btn btn-accent btn-lg">Join Class →</button>
</div>
```

### Student Analysis Card (Instructor)

```html
<div class="analysis-card">
  <div class="analysis-header">
    <img src="avatar.jpg" class="avatar avatar-lg" alt="Student" />
    <div class="analysis-info">
      <div class="analysis-name">Arjun Raj</div>
      <div class="analysis-id">ST001 · Batch A</div>
    </div>
    <div class="analysis-status good">🟢 Good Standing</div>
  </div>

  <div class="analysis-stats">
    <div class="analysis-stat-item">
      <div class="analysis-stat-label">Live Attendance</div>
      <div class="analysis-stat-value">75%</div>
    </div>
    <div class="analysis-stat-item">
      <div class="analysis-stat-label">Avg Watch Progress</div>
      <div class="analysis-stat-value">85%</div>
    </div>
    <div class="analysis-stat-item">
      <div class="analysis-stat-label">Assignments Submitted</div>
      <div class="analysis-stat-value">8/10</div>
    </div>
    <div class="analysis-stat-item">
      <div class="analysis-stat-label">Test Average</div>
      <div class="analysis-stat-value">78%</div>
    </div>
  </div>
</div>
```

### Filter Bar with Chips

```html
<div class="filter-bar">
  <div class="input-group">
    <svg class="input-group-icon">...</svg>
    <input type="text" class="form-input" placeholder="Search..." />
  </div>
  <select class="form-select" style="width: 160px">
    <option>All Subjects</option>
    <option>Data Structures</option>
  </select>
  <div class="filter-chips">
    <div class="chip active">All</div>
    <div class="chip">Submitted</div>
    <div class="chip">Pending</div>
    <div class="chip">Late</div>
  </div>
</div>
```

---

## 22. Animations

### Built-in Keyframes

| Name           | Effect                              | Usage                            |
|----------------|-------------------------------------|----------------------------------|
| `fadeIn`       | Opacity 0 → 1                       | Modal overlay, page transitions  |
| `slideUp`      | Opacity + translate Y               | Modal panel, drawers             |
| `slideInRight` | Opacity + translate X               | Toast notifications              |
| `scaleIn`      | Opacity + scale 0.92 → 1            | Dropdown menus                   |
| `pulse`        | Scale + opacity loop                | Live dot indicator               |
| `fadeInUp`     | Opacity + translateY for cards      | Page load staggering             |
| `shimmer`      | Moving gradient                     | Skeleton loaders                 |

### Staggered Page Load

```html
<div class="animate-in">Card 1</div>
<div class="animate-in delay-1">Card 2</div>
<div class="animate-in delay-2">Card 3</div>
<div class="animate-in delay-3">Card 4</div>
<div class="animate-in delay-4">Card 5</div>
```

Delays: `delay-1` (60ms) → `delay-2` (120ms) → `delay-3` (180ms) → `delay-4` (240ms) → `delay-5` (300ms)

---

## 23. Responsive Breakpoints

| Breakpoint | Width       | Behavior                                                     |
|------------|-------------|--------------------------------------------------------------|
| Desktop    | > 1024px    | Full sidebar (260px), all grids active                       |
| Tablet     | ≤ 1024px    | Reduced sidebar (220px), 2-col grids collapse to 1-col       |
| Mobile     | ≤ 768px     | Sidebar off-screen (open with `.sidebar.open`), all grids 1-col |
| Small      | ≤ 480px     | Stats grid goes 1-col, toasts use full width                 |

### Mobile Sidebar Toggle (JS)

```javascript
const menuBtn = document.querySelector('.mobile-menu-btn');
const sidebar = document.querySelector('.sidebar');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
```

---

## 24. Utility Classes

### Typography
`.text-xs` `.text-sm` `.text-base` `.text-lg` `.text-xl` `.text-2xl` `.text-3xl`
`.fw-light` `.fw-regular` `.fw-medium` `.fw-semibold` `.fw-bold`
`.text-primary` `.text-secondary` `.text-muted` `.text-accent` `.text-success` `.text-warning` `.text-error`

### Layout
`.flex` `.flex-col` `.items-center` `.items-start` `.justify-between` `.justify-center`
`.flex-1` `.flex-wrap`
`.gap-2` `.gap-3` `.gap-4` `.gap-6` `.gap-8`
`.grid` `.grid-2` `.grid-3` `.grid-4`
`.w-full` `.h-full` `.min-h-screen`

### Spacing
`.p-4` `.p-6` `.p-8`
`.mt-2` `.mt-4` `.mt-6`
`.mb-4` `.mb-6` `.mb-8`
`.ml-auto`

### Visual
`.rounded-sm` `.rounded-md` `.rounded-lg` `.rounded-xl` `.rounded-full`
`.shadow-sm` `.shadow-md` `.shadow-lg`
`.bg-surface` `.bg-primary` `.bg-accent`
`.overflow-hidden` `.truncate`

### Accessibility
`.sr-only` — Visually hides elements while keeping them accessible to screen readers.

---

## Quick Component Index

| Component           | Class(es)                                    | Where Used                         |
|---------------------|----------------------------------------------|------------------------------------|
| App Shell           | `.app-layout` `.main-content` `.page-body`   | Every authenticated page           |
| Sidebar             | `.sidebar` `.nav-item` `.nav-badge`          | All dashboards                     |
| Topbar              | `.topbar` `.topbar-search` `.icon-btn`       | All dashboards                     |
| Page Header         | `.page-header` `.page-title` `.page-subtitle`| Top of every page                  |
| Stat Cards          | `.stats-grid` `.stat-card`                   | All dashboard home pages           |
| Card                | `.card` `.card-header` `.card-body`          | Content sections                   |
| Course Card         | `.course-card`                               | Recorded class grid                |
| Table               | `.table-wrap` `.table`                       | All list/data views                |
| Badge               | `.badge` `.badge-*`                          | Status columns, labels             |
| Button              | `.btn` `.btn-*`                              | Every interactive action           |
| Form Input          | `.form-input` `.form-group`                  | All forms                          |
| Progress Bar        | `.progress-bar-wrap` `.progress-bar-fill`    | Student progression, courses       |
| Tabs                | `.tabs` `.tab`                               | Dashboard section switching        |
| Modal               | `.modal-overlay` `.modal`                    | Create/edit/confirm actions        |
| Toast               | `.toast-container` `.toast`                  | Feedback on every user action      |
| Auth Layout         | `.auth-layout` `.auth-illustration`          | Login, Register pages              |
| Live Banner         | `.live-banner` `.live-badge`                 | Student dashboard                  |
| Analysis Card       | `.analysis-card` `.analysis-stats`           | Instructor student view            |
| Filter Bar          | `.filter-bar` `.chip`                        | All list views with filtering      |
| Skeleton            | `.skeleton` `.skeleton-card`                 | Loading states                     |
| Empty State         | `.empty-state`                               | No data views                      |

---

*Base Learn · Style Guide · Version 1.0*
