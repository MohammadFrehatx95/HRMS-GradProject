# Frontend Project Structure and Code


## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\index.html


```html

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Kawadir â€” HR Management System</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/png" href="/kawadir-logo.png?v=2">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body class="mat-typography">
  <app-root></app-root>
</body>
</html>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\main.ts


```ts

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// ØªØ´ØºÙŠÙ„ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\styles.css


```css

@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CSS VARIABLES â€” Light Mode Defaults
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
:root {
  --color-bg:            #f8f9fb;
  --color-bg-dot:        rgba(0, 0, 0, 0.09);
  --color-surface:       #ffffff;
  --color-surface-2:     #f2f3f5;
  --color-surface-3:     #e5e7eb;
  --color-border:        #e5e7eb;
  --color-text:          #111111;
  --color-text-sub:      #4b5563;
  --color-text-muted:    #6b7280;
  --color-text-label:    #9ca3af;
  --color-link:          #5f6368;
  --color-link-icon:     #7f838a;
  --color-link-hover-bg: #e5e7eb;
  --color-link-hover:    #111111;
  --color-avatar-bg:     #d1d5db;
  --color-avatar-text:   #111111;
  --color-logout-border: #d1d5db;
  --color-logout-text:   #4b5563;
  --color-input-bg:      #ffffff;
  --color-table-head-bg: #f8f9fa;
  --color-table-td:      #111111;
  --color-table-th:      #6c757d;
  --color-table-hover:   #f5f6f7;
  --color-card-bg:       #ffffff;
  --color-modal-bg:      #ffffff;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CSS VARIABLES â€” Dark Mode Overrides
   These cascade into ALL Angular components automatically
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode {
  --color-bg:            #1a1d23;
  --color-bg-dot:        rgba(255, 255, 255, 0.04);
  --color-surface:       #22252b;
  --color-surface-2:     #282c34;
  --color-surface-3:     #2d3139;
  --color-border:        #333333;
  --color-text:          #ffffff;
  --color-text-sub:      #e0e0e0;
  --color-text-muted:    #94a3b8;
  --color-text-label:    #adb5bd;
  --color-link:          #adb5bd;
  --color-link-icon:     #adb5bd;
  --color-link-hover-bg: rgba(102, 126, 234, 0.15);
  --color-link-hover:    #ffffff;
  --color-avatar-bg:     #333333;
  --color-avatar-text:   #f8f9fa;
  --color-logout-border: #444444;
  --color-logout-text:   #adb5bd;
  --color-input-bg:      #2d3139;
  --color-table-head-bg: #282c34;
  --color-table-td:      #e0e0e0;
  --color-table-th:      #adb5bd;
  --color-table-hover:   #2d3139;
  --color-card-bg:       #22252b;
  --color-modal-bg:      #22252b;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   BASE STYLES
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
html, body { height: 100%; }

body {
  margin: 0;
  font-family: 'Inter', Roboto, "Helvetica Neue", sans-serif;
  background-color: var(--color-bg);
  background-image: radial-gradient(var(--color-bg-dot) 2px, transparent 2px);
  background-size: 24px 24px;
  color: var(--color-text);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DARK MODE â€” Global Text & Element Rules
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

/* Force ALL text colour to inherit from parent in dark mode */
body.dark-mode * { color: inherit; }

/* Headings */
body.dark-mode h1,
body.dark-mode h2,
body.dark-mode h3,
body.dark-mode h4,
body.dark-mode h5,
body.dark-mode h6 { color: var(--color-text) !important; }

/* Paragraphs */
body.dark-mode p { color: var(--color-text-sub) !important; }

/* Labels */
body.dark-mode label { color: var(--color-text-sub) !important; }

/* Small / helper text */
body.dark-mode small,
body.dark-mode .small { color: var(--color-text-muted) !important; }

/* Bootstrap text utilities */
body.dark-mode .text-dark      { color: var(--color-text)       !important; }
body.dark-mode .text-secondary { color: var(--color-text-label) !important; }
body.dark-mode .text-muted     { color: var(--color-text-muted) !important; }
body.dark-mode .fw-bold        { color: var(--color-text)       !important; }
body.dark-mode .text-uppercase { color: var(--color-text-label) !important; }

/* Layout */
body.dark-mode .wrapper        { background-color: var(--color-bg) !important; }
body.dark-mode .page-container { color: var(--color-text); }

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   NAVBAR / HEADER
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode .navbar,
body.dark-mode .header-bar {
  background-color: var(--color-surface) !important;
  border-color: var(--color-border) !important;
}
body.dark-mode .navbar *,
body.dark-mode .header-bar * { color: var(--color-text) !important; }

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SIDEBAR
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode .sidebar {
  background: linear-gradient(180deg, #1e2128 0%, #16181d 100%) !important;
  border-right-color: var(--color-border) !important;
}

body.dark-mode .sidebar-brand-name { color: var(--color-text)       !important; }
body.dark-mode .sidebar-brand-sub  { color: var(--color-text-label) !important; }
body.dark-mode .section-title      { color: var(--color-text-label) !important; }
body.dark-mode .sidebar-logo-wrap  { background-color: var(--color-surface-2) !important; }

body.dark-mode .sidebar-nav a   { color: var(--color-link)      !important; }
body.dark-mode .sidebar-nav a i { color: var(--color-link-icon) !important; }

body.dark-mode .sidebar-nav a.active,
body.dark-mode .sidebar-nav a:hover {
  color: var(--color-link-hover) !important;
  background-color: var(--color-link-hover-bg) !important;
}
body.dark-mode .sidebar-nav a.active i,
body.dark-mode .sidebar-nav a:hover i { color: var(--color-link-hover) !important; }

body.dark-mode .sidebar-footer    { border-top-color: var(--color-border) !important; }
body.dark-mode .user-info .name   { color: var(--color-text)       !important; }
body.dark-mode .user-info .status { color: var(--color-text-label) !important; }
body.dark-mode .user-profile:hover { background-color: var(--color-surface-3) !important; }

body.dark-mode .avatar-initials {
  background: var(--color-avatar-bg)   !important;
  color:      var(--color-avatar-text) !important;
}

body.dark-mode .btn-logout {
  border-color: var(--color-logout-border) !important;
  color:        var(--color-logout-text)   !important;
}
body.dark-mode .btn-logout:hover {
  background-color: rgba(220, 38, 38, 0.1) !important;
  color:            #f87171                !important;
  border-color:     rgba(220, 38, 38, 0.3) !important;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CARDS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode .card {
  background-color: var(--color-card-bg) !important;
  border-color:     var(--color-border)  !important;
  color:            var(--color-text)    !important;
}
body.dark-mode .card-header,
body.dark-mode .card-footer {
  background-color: var(--color-surface-2) !important;
  border-color:     var(--color-border)    !important;
  color:            var(--color-text)      !important;
}
body.dark-mode .card *    { color: inherit; }

/* Dashboard specific cards */
body.dark-mode .info-card,
body.dark-mode .activity-card,
body.dark-mode .chart-card,
body.dark-mode .sales-stats {
  background-color: var(--color-card-bg) !important;
  color:            var(--color-text)    !important;
}
body.dark-mode .info-card *,
body.dark-mode .activity-card *,
body.dark-mode .chart-card * { color: inherit; }

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   TABLES
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode .table {
  --bs-table-bg:         var(--color-surface);
  --bs-table-color:      var(--color-table-td);
  --bs-table-hover-bg:   var(--color-table-hover);
  --bs-table-striped-bg: var(--color-surface-2);
  color:        var(--color-table-td) !important;
  border-color: var(--color-border)   !important;
}
body.dark-mode .table thead,
body.dark-mode .table thead th {
  background-color: var(--color-table-head-bg) !important;
  color:            var(--color-table-th)       !important;
  border-color:     var(--color-border)         !important;
}
body.dark-mode .table tbody td,
body.dark-mode .table tbody tr {
  color:        var(--color-table-td) !important;
  border-color: var(--color-border)   !important;
}
body.dark-mode .table-hover tbody tr:hover {
  background-color: var(--color-table-hover) !important;
}
body.dark-mode .table td span,
body.dark-mode .table td p,
body.dark-mode .table td a { color: var(--color-table-td) !important; }

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FORMS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode .form-control,
body.dark-mode .form-select {
  background-color: var(--color-input-bg) !important;
  border-color:     #444                  !important;
  color:            var(--color-text)     !important;
}
body.dark-mode .form-control::placeholder { color: #6c757d !important; }
body.dark-mode .form-control:focus,
body.dark-mode .form-select:focus {
  border-color: #667eea !important;
  box-shadow:   0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
}
body.dark-mode .form-label { color: var(--color-text-sub) !important; }
body.dark-mode .input-group-text {
  background-color: var(--color-input-bg)    !important;
  border-color:     #444                     !important;
  color:            var(--color-text-label)  !important;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MODALS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode .modal-content {
  background-color: var(--color-modal-bg) !important;
  border-color:     var(--color-border)   !important;
  color:            var(--color-text)     !important;
}
body.dark-mode .modal-header,
body.dark-mode .modal-footer { border-color: var(--color-border) !important; }
body.dark-mode .modal-title  { color: var(--color-text) !important; }
body.dark-mode .modal-body * { color: var(--color-text) !important; }

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DROPDOWNS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode .dropdown-menu {
  background-color: var(--color-surface) !important;
  border-color:     var(--color-border)  !important;
}
body.dark-mode .dropdown-item       { color: var(--color-text) !important; }
body.dark-mode .dropdown-item:hover { background-color: var(--color-surface-3) !important; }

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   BUTTONS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode .btn-light {
  background-color: var(--color-surface-3) !important;
  border-color:     #444                   !important;
  color:            var(--color-text)      !important;
}
body.dark-mode .btn-outline-secondary {
  border-color: #555                   !important;
  color:        var(--color-text-label) !important;
}
body.dark-mode .btn-outline-secondary:hover {
  background-color: #333  !important;
  color:            #fff  !important;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   UTILITY CLASSES
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode .bg-light      { background-color: var(--color-surface-2) !important; }
body.dark-mode .bg-white      { background-color: var(--color-surface)   !important; }
body.dark-mode .border-bottom { border-color: var(--color-border) !important; }
body.dark-mode .border        { border-color: var(--color-border) !important; }
body.dark-mode .badge         { opacity: 0.95; }

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   STATUS BADGES
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.status-badge {
  padding: 0.4rem 1rem;
  border-radius: 50rem;
  font-weight: 600;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  border: 1px solid transparent;
}

/* Light Mode */
.status-approved { background-color: #d1fae5; color: #065f46; border-color: #6ee7b7; }
.status-pending  { background-color: #fef3c7; color: #92400e; border-color: #fcd34d; }
.status-rejected { background-color: #fee2e2; color: #991b1b; border-color: #fca5a5; }
.status-active   { background-color: #d1fae5; color: #065f46; border-color: #6ee7b7; }
.status-inactive { background-color: #fee2e2; color: #991b1b; border-color: #fca5a5; }

/* Dark Mode */
body.dark-mode .status-approved { background-color: rgba(16, 185, 129, 0.15) !important; color: #34d399 !important; border-color: rgba(16, 185, 129, 0.3) !important; }
body.dark-mode .status-pending  { background-color: rgba(245, 158, 11, 0.15) !important; color: #fbbf24 !important; border-color: rgba(245, 158, 11, 0.3) !important; }
body.dark-mode .status-rejected { background-color: rgba(239, 68, 68, 0.15) !important; color: #f87171 !important; border-color: rgba(239, 68, 68, 0.3) !important; }
body.dark-mode .status-active   { background-color: rgba(16, 185, 129, 0.15) !important; color: #34d399 !important; border-color: rgba(16, 185, 129, 0.3) !important; }
body.dark-mode .status-inactive { background-color: rgba(239, 68, 68, 0.15) !important; color: #f87171 !important; border-color: rgba(239, 68, 68, 0.3) !important; }

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PAGINATION
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode .page-link {
  background-color: var(--color-surface-2) !important;
  border-color: var(--color-border) !important;
  color: var(--color-text) !important;
}
body.dark-mode .page-item.active .page-link {
  background-color: #0d6efd !important;
  border-color: #0d6efd !important;
  color: #ffffff !important;
}
body.dark-mode .page-item.disabled .page-link {
  background-color: var(--color-surface) !important;
  color: var(--color-text-muted) !important;
  border-color: var(--color-border) !important;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   RTL FIXES
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
html[dir="rtl"] .bi-box-arrow-right,
html[dir="rtl"] .bi-box-arrow-in-right,
html[dir="rtl"] .bi-chevron-right,
html[dir="rtl"] .bi-chevron-left { transform: scaleX(-1); }

html[dir="rtl"] .ms-auto { margin-right: auto !important; margin-left: 0 !important; }
html[dir="rtl"] .me-auto { margin-left: auto  !important; margin-right: 0 !important; }
html[dir="rtl"] .dropdown-menu-end { right: auto !important; left: 0 !important; }

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SCROLLBAR
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode ::-webkit-scrollbar       { width: 8px; }
body.dark-mode ::-webkit-scrollbar-track { background: #1a1d23; }
body.dark-mode ::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
body.dark-mode ::-webkit-scrollbar-thumb:hover { background: #555; }

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SWEETALERT2
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode .swal2-popup {
  background-color: var(--color-surface) !important;
  color:            var(--color-text)    !important;
}
body.dark-mode .swal2-title          { color: var(--color-text)       !important; }
body.dark-mode .swal2-html-container { color: var(--color-text-label) !important; }

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   EMPLOYEE DETAILS MODAL
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
body.dark-mode .detail-item {
  background: #2d3139 !important;
  border-color: #3a3f4b !important;
}

body.dark-mode .detail-value {
  color: #e0e0e0 !important;
}

body.dark-mode .detail-label {
  color: #94a3b8 !important;
}

body.dark-mode .detail-section-title {
  color: #94a3b8 !important;
  border-bottom-color: #333 !important;
}

body.dark-mode .modal-footer.bg-light {
  background-color: var(--color-surface-2) !important;
}


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\app.component.css


```css

.wrapper {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #f4f7fa;
  position: relative;
}

.app-sidebar {
  display: block;
  width: var(--sidebar-width, 260px);
  flex-shrink: 0;
  transition: margin 0.3s ease, transform 0.3s ease;
  z-index: 1040;
}

.app-sidebar.hidden {
  margin-left: calc(-1 * var(--sidebar-width, 260px)); /* Hide sidebar LTR */
}

:host-context(html[dir="rtl"]) .app-sidebar.hidden {
  margin-left: 0;
  margin-right: calc(-1 * var(--sidebar-width, 260px)); /* Hide sidebar RTL */
}

.main-panel {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
  transition: all 0.3s ease;
}

.content {
  padding: 30px;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1030;
  display: none;
}

@media (max-width: 768px) {
  .app-sidebar {
    position: fixed;
    top: 0;
    left: calc(-1 * var(--sidebar-width, 260px));
    margin-left: 0 !important;
    height: 100vh;
  }
  
  .app-sidebar.mobile-open {
    left: 0;
  }
  
  :host-context(html[dir="rtl"]) .app-sidebar {
    left: auto;
    right: calc(-1 * var(--sidebar-width, 260px));
    margin-right: 0 !important;
  }
  
  :host-context(html[dir="rtl"]) .app-sidebar.mobile-open {
    right: 0;
  }
  
  .sidebar-overlay {
    display: block;
  }

  .content {
    padding: 15px;
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\app.component.html


```html

@if (authService.isLoggedIn()) {
<div class="wrapper">
    @if (isMobileSidebarOpen) {
        <div class="sidebar-overlay" (click)="closeMobileSidebar()"></div>
    }

    <app-sidebar class="app-sidebar" [class.hidden]="isSidebarHidden" [class.mobile-open]="isMobileSidebarOpen"></app-sidebar>

    <div class="main-panel" [class.expanded]="isSidebarHidden">
        <app-header></app-header>

        <main class="content">
            <router-outlet></router-outlet>
        </main>
    </div>
</div>
} @else {
<router-outlet></router-outlet>
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\app.component.ts


```ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { SidebarService } from './core/services/sidebar.service';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  authService = inject(AuthService);
  sidebarService = inject(SidebarService);

  get isSidebarHidden() {
    // Ø­Ø§Ù„Ø© Ø§Ù„Ø³Ø§ÙŠØ¯Ø¨Ø§Ø±
    return this.sidebarService.isSidebarHidden();
  }

  get isMobileSidebarOpen() {
    // ÙØªØ­ Ø§Ù„Ø³Ø§ÙŠØ¯Ø¨Ø§Ø± Ø¨Ø§Ù„Ù…ÙˆØ¨Ø§ÙŠÙ„
    return this.sidebarService.isMobileSidebarOpen();
  }

  closeMobileSidebar() {
    // Ø¥ØºÙ„Ø§Ù‚ Ø§Ù„Ø³Ø§ÙŠØ¯Ø¨Ø§Ø± Ø¨Ø§Ù„Ù…ÙˆØ¨Ø§ÙŠÙ„
    this.sidebarService.closeMobileSidebar();
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\app.config.ts


```ts

import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

function initializeApp(authService: AuthService) {
  return () => {
    if (authService.isLoggedIn()) {
      return authService.getMe().pipe(
        catchError(() => {
          authService.logout();
          return of(null);
        })
      );
    }
    return of(null);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    // Ø¶Ø¨Ø· Ø§Ù„Ù€ providers Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true
    }
  ],
};

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\app.routes.ts


```ts

import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { DepartmentsComponent } from './features/departments/departments.component';
import { LeaveComponent } from './features/leave/leave.component';
import { AttendanceComponent } from './features/attendance/attendance.component';
import { SalaryComponent } from './features/salary/salary.component';
import { EmployeeFormComponent } from './features/employee-form/employee-form.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { hrGuard } from './core/guards/hr.guard';
import { AllAttendanceComponent } from './features/all-attendance/all-attendance.component';
import { PositionsComponent } from './features/positions/positions.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard, adminGuard],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'leave-form',
    loadComponent: () =>
      import('./features/leave-form/leave-form.component').then(
        (m) => m.LeaveFormComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    canActivate: [authGuard, adminGuard],
  },
  // Ø§Ù„ÙƒÙ„ ÙŠØ´ÙˆÙ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§ØªØŒ Ø§Ù„Ù‚Ø¨ÙˆÙ„/Ø§Ù„Ø±ÙØ¶ Ù„Ù„Ù€ admin Ùˆhr ÙÙ‚Ø·
  { path: 'leave', component: LeaveComponent, canActivate: [authGuard] },
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [authGuard],
  },
  {
    path: 'all-attendance',
    component: AllAttendanceComponent,
    canActivate: [authGuard, hrGuard],
  },
  // ÙƒÙ„ Ù…ÙˆØ¸Ù ÙŠØ´ÙˆÙ Ø±Ø§ØªØ¨Ù‡ØŒ Ø§Ù„Ø¥Ø¶Ø§ÙØ© ÙˆØ§Ù„ØªØ¹Ø¯ÙŠÙ„ Ù„Ù„Ù€ admin
  { path: 'salary', component: SalaryComponent, canActivate: [authGuard] },
  {
    path: 'employee-form',
    component: EmployeeFormComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'positions',
    component: PositionsComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'my-profile',
    loadComponent: () =>
      import('./features/my-profile/my-profile.component').then(
        (m) => m.MyProfileComponent,
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\guards\admin.guard.ts


```ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    // Ø§Ù„Ø£Ø¯Ù…Ù† Ø¨Ø³
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Access Denied (403)',
      text: 'You do not have permission to access this page.',
      confirmButtonColor: '#dc3545',
    });
    router.navigate(['/dashboard']);
    return false;
  }
};

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\guards\auth.guard.ts


```ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// âœ… Ø­Ù…Ø§ÙŠØ© Ø§Ù„ØµÙØ­Ø§Øª Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ© â€” ÙŠØ±Ø¬Ø¹ Ù„Ù„Ù„ÙˆØ¬ÙŠÙ† Ø¥Ø°Ø§ Ù„Ù… ÙŠÙƒÙ† Ù…Ø³Ø¬Ù„
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

// âœ… Ù…Ù†Ø¹ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ø§Ù„Ù…Ø³Ø¬Ù„ Ù…Ù† Ø±Ø¤ÙŠØ© ØµÙØ­Ø© Ø§Ù„Ù„ÙˆØ¬ÙŠÙ† â€” ÙŠØ±Ø¬Ø¹ Ù„Ù„Ø¯Ø§Ø´Ø¨ÙˆØ±Ø¯ Ø¥Ø°Ø§ ÙƒØ§Ù† Ù…Ø³Ø¬Ù„Ø§
export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\guards\hr.guard.ts


```ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** ÙŠØ³Ù…Ø­ ÙÙ‚Ø· Ù„Ù€ Admin Ø£Ùˆ HR */
export const hrGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdminOrHR()) {
    return true;
  } else {
    router.navigate(['/dashboard']);
    return false;
  }
};

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\i18n\translations.ts


```ts

// Ù‚Ø§Ù…ÙˆØ³ Ø§Ù„ØªØ±Ø¬Ù…Ø© Ø§Ù„ÙƒØ§Ù…Ù„ â€” Ø¹Ø±Ø¨ÙŠ/Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠ
export const TRANSLATIONS: { [key: string]: { en: string; ar: string } } = {

  // â”€â”€ Sidebar â”€â”€
  'Dashboard':        { en: 'Dashboard',        ar: 'Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…' },
  'My Profile':       { en: 'My Profile',       ar: 'Ù…Ù„ÙÙŠ Ø§Ù„Ø´Ø®ØµÙŠ' },
  'Employees':        { en: 'Employees',        ar: 'Ø§Ù„Ù…ÙˆØ¸ÙÙˆÙ†' },
  'Leave Requests':   { en: 'Leave Requests',   ar: 'Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø©' },
  'Attendance':       { en: 'Attendance',        ar: 'Ø§Ù„Ø­Ø¶ÙˆØ± ÙˆØ§Ù„Ø§Ù†ØµØ±Ø§Ù' },
  'Salaries':         { en: 'Salaries',          ar: 'Ø§Ù„Ø±ÙˆØ§ØªØ¨' },
  'System Control':   { en: 'System Control',    ar: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù†Ø¸Ø§Ù…' },
  'Departments':      { en: 'Departments',       ar: 'Ø§Ù„Ø£Ù‚Ø³Ø§Ù…' },
  'Positions':        { en: 'Positions',         ar: 'Ø§Ù„Ù…Ø³Ù…ÙŠØ§Øª Ø§Ù„ÙˆØ¸ÙŠÙÙŠØ©' },
  'Register User':    { en: 'Register User',     ar: 'ØªØ³Ø¬ÙŠÙ„ Ù…Ø³ØªØ®Ø¯Ù…' },
  'Logout':           { en: 'Logout',            ar: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø±ÙˆØ¬' },
  'HR Management':    { en: 'HR Management',     ar: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ Ø§Ù„Ø¨Ø´Ø±ÙŠØ©' },

  // â”€â”€ Header â”€â”€
  'Settings':         { en: 'Settings',          ar: 'Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª' },
  'Theme':            { en: 'Theme',             ar: 'Ø§Ù„Ù…Ø¸Ù‡Ø±' },
  'Dark Mode':        { en: 'Dark Mode',         ar: 'Ø§Ù„ÙˆØ¶Ø¹ Ø§Ù„Ø¯Ø§ÙƒÙ†' },
  'Light Mode':       { en: 'Light Mode',        ar: 'Ø§Ù„ÙˆØ¶Ø¹ Ø§Ù„ÙØ§ØªØ­' },
  'Language':         { en: 'Language',           ar: 'Ø§Ù„Ù„ØºØ©' },
  'Notifications':    { en: 'Notifications',     ar: 'Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª' },
  'No new notifications': { en: 'No new notifications', ar: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø¬Ø¯ÙŠØ¯Ø©' },
  'New':              { en: 'New',               ar: 'Ø¬Ø¯ÙŠØ¯' },
  'System Alert':     { en: 'System Alert',      ar: 'ØªÙ†Ø¨ÙŠÙ‡ Ø§Ù„Ù†Ø¸Ø§Ù…' },

  // â”€â”€ Dashboard â”€â”€
  'Admin Dashboard':     { en: 'Admin Dashboard',     ar: 'Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Ø§Ù„Ù…Ø¯ÙŠØ±' },
  'Employee Dashboard':  { en: 'Employee Dashboard',  ar: 'Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Ø§Ù„Ù…ÙˆØ¸Ù' },
  'Welcome back':        { en: 'Welcome back',        ar: 'Ù…Ø±Ø­Ø¨Ø§Ù‹ Ø¨Ø¹ÙˆØ¯ØªÙƒ' },
  'Total Employees':     { en: 'Total Employees',     ar: 'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†' },
  'Attendance Rate':     { en: 'Attendance Rate',      ar: 'Ù†Ø³Ø¨Ø© Ø§Ù„Ø­Ø¶ÙˆØ±' },
  'Pending Leaves':      { en: 'Pending Leaves',      ar: 'Ø¥Ø¬Ø§Ø²Ø§Øª Ù…Ø¹Ù„Ù‚Ø©' },
  'Next Payday':         { en: 'Next Payday',         ar: 'Ù…ÙˆØ¹Ø¯ Ø§Ù„Ø±Ø§ØªØ¨' },
  'Recent Leave Requests': { en: 'Recent Leave Requests', ar: 'Ø£Ø­Ø¯Ø« Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø©' },
  'Leave Distribution':  { en: 'Leave Distribution',  ar: 'ØªÙˆØ²ÙŠØ¹ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª' },
  'Annual':              { en: 'Annual',              ar: 'Ø³Ù†ÙˆÙŠØ©' },
  'Sick':                { en: 'Sick',                ar: 'Ù…Ø±Ø¶ÙŠØ©' },
  'Emergency':           { en: 'Emergency',           ar: 'Ø·Ø§Ø±Ø¦Ø©' },
  'Unpaid':              { en: 'Unpaid',              ar: 'Ø¨Ø¯ÙˆÙ† Ø±Ø§ØªØ¨' },
  'Annual Leave Balance': { en: 'Annual Leave Balance', ar: 'Ø±ØµÙŠØ¯ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª Ø§Ù„Ø³Ù†ÙˆÙŠØ©' },
  'Days Remaining':      { en: 'Days Remaining',      ar: 'Ø£ÙŠØ§Ù… Ù…ØªØ¨Ù‚ÙŠØ©' },
  'My Salary':           { en: 'My Salary',           ar: 'Ø±Ø§ØªØ¨ÙŠ' },
  'My Pending Leaves':   { en: 'My Pending Leaves',   ar: 'Ø¥Ø¬Ø§Ø²Ø§ØªÙŠ Ø§Ù„Ù…Ø¹Ù„Ù‚Ø©' },

  // â”€â”€ Leave â”€â”€
  'All Leave Requests':  { en: 'All Leave Requests',  ar: 'Ø¬Ù…ÙŠØ¹ Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø©' },
  'My Leave Requests':   { en: 'My Leave Requests',   ar: 'Ø·Ù„Ø¨Ø§Øª Ø¥Ø¬Ø§Ø²ØªÙŠ' },
  'Manage and track time-off requests effectively': 
    { en: 'Manage and track time-off requests effectively', ar: 'Ø¥Ø¯Ø§Ø±Ø© ÙˆÙ…ØªØ§Ø¨Ø¹Ø© Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª Ø¨ÙØ¹Ø§Ù„ÙŠØ©' },
  'Search by name, ID, or reason...': 
    { en: 'Search by name, ID, or reason...', ar: 'Ø§Ø¨Ø­Ø« Ø¨Ø§Ù„Ø§Ø³Ù… Ø£Ùˆ Ø§Ù„Ø±Ù‚Ù… Ø£Ùˆ Ø§Ù„Ø³Ø¨Ø¨...' },
  'Filter Options':      { en: 'Filter Options',      ar: 'Ø®ÙŠØ§Ø±Ø§Øª Ø§Ù„ØªØµÙÙŠØ©' },
  'Leave Type':          { en: 'Leave Type',           ar: 'Ù†ÙˆØ¹ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø©' },
  'All Types':           { en: 'All Types',            ar: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£Ù†ÙˆØ§Ø¹' },
  'Status':              { en: 'Status',               ar: 'Ø§Ù„Ø­Ø§Ù„Ø©' },
  'All Statuses':        { en: 'All Statuses',         ar: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ø§Ù„Ø§Øª' },
  'Pending':             { en: 'Pending',              ar: 'Ù…Ø¹Ù„Ù‚Ø©' },
  'Approved':            { en: 'Approved',             ar: 'Ù…Ù‚Ø¨ÙˆÙ„Ø©' },
  'Rejected':            { en: 'Rejected',             ar: 'Ù…Ø±ÙÙˆØ¶Ø©' },
  'Request Leave':       { en: 'Request Leave',        ar: 'Ø·Ù„Ø¨ Ø¥Ø¬Ø§Ø²Ø©' },
  'Employee':            { en: 'Employee',             ar: 'Ø§Ù„Ù…ÙˆØ¸Ù' },
  'Duration':            { en: 'Duration',             ar: 'Ø§Ù„Ù…Ø¯Ø©' },
  'Reason':              { en: 'Reason',               ar: 'Ø§Ù„Ø³Ø¨Ø¨' },
  'Actions':             { en: 'Actions',              ar: 'Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª' },
  'Approve':             { en: 'Approve',              ar: 'Ù‚Ø¨ÙˆÙ„' },
  'Reject':              { en: 'Reject',               ar: 'Ø±ÙØ¶' },
  'Processed':           { en: 'Processed',            ar: 'ØªÙ…Øª Ø§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø©' },
  'No Leave Requests':   { en: 'No Leave Requests',    ar: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø·Ù„Ø¨Ø§Øª Ø¥Ø¬Ø§Ø²Ø©' },
  'No leave data available matching your search criteria.':
    { en: 'No leave data available matching your search criteria.', ar: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª Ø¥Ø¬Ø§Ø²Ø§Øª ØªØ·Ø§Ø¨Ù‚ Ù…Ø¹Ø§ÙŠÙŠØ± Ø§Ù„Ø¨Ø­Ø«.' },
  'New Leave Request':   { en: 'New Leave Request',    ar: 'Ø·Ù„Ø¨ Ø¥Ø¬Ø§Ø²Ø© Ø¬Ø¯ÙŠØ¯' },
  'Start Date':          { en: 'Start Date',           ar: 'ØªØ§Ø±ÙŠØ® Ø§Ù„Ø¨Ø¯Ø§ÙŠØ©' },
  'End Date':            { en: 'End Date',             ar: 'ØªØ§Ø±ÙŠØ® Ø§Ù„Ù†Ù‡Ø§ÙŠØ©' },
  'Cancel':              { en: 'Cancel',               ar: 'Ø¥Ù„ØºØ§Ø¡' },
  'Submit Request':      { en: 'Submit Request',       ar: 'Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø·Ù„Ø¨' },
  'Loading requests...': { en: 'Loading requests...',  ar: 'Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø·Ù„Ø¨Ø§Øª...' },
  'No reason provided':  { en: 'No reason provided',   ar: 'Ù„Ù… ÙŠØªÙ… ØªØ­Ø¯ÙŠØ¯ Ø³Ø¨Ø¨' },

  // â”€â”€ Attendance â”€â”€
  'My Attendance':       { en: 'My Attendance',        ar: 'Ø­Ø¶ÙˆØ±ÙŠ' },
  'Clock In':            { en: 'Clock In',             ar: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„' },
  'Clock Out':           { en: 'Clock Out',            ar: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø±ÙˆØ¬' },
  'Date':                { en: 'Date',                 ar: 'Ø§Ù„ØªØ§Ø±ÙŠØ®' },
  'Total Hours':         { en: 'Total Hours',          ar: 'Ø³Ø§Ø¹Ø§Øª Ø§Ù„Ø¹Ù…Ù„' },
  'Working':             { en: 'Working',              ar: 'ÙŠØ¹Ù…Ù„' },
  'Completed':           { en: 'Completed',            ar: 'Ù…ÙƒØªÙ…Ù„' },
  'View All':            { en: 'View All',             ar: 'Ø¹Ø±Ø¶ Ø§Ù„ÙƒÙ„' },
  'Today':               { en: 'Today',                ar: 'Ø§Ù„ÙŠÙˆÙ…' },

  // â”€â”€ Salary â”€â”€
  'My Salary History':   { en: 'My Salary History',    ar: 'Ø³Ø¬Ù„ Ø±ÙˆØ§ØªØ¨ÙŠ' },
  'All Salaries':        { en: 'All Salaries',         ar: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø±ÙˆØ§ØªØ¨' },
  'Month':               { en: 'Month',                ar: 'Ø§Ù„Ø´Ù‡Ø±' },
  'Year':                { en: 'Year',                 ar: 'Ø§Ù„Ø³Ù†Ø©' },
  'Base Salary':         { en: 'Base Salary',          ar: 'Ø§Ù„Ø±Ø§ØªØ¨ Ø§Ù„Ø£Ø³Ø§Ø³ÙŠ' },
  'Allowances':          { en: 'Allowances',           ar: 'Ø§Ù„Ø¨Ø¯Ù„Ø§Øª' },
  'Deductions':          { en: 'Deductions',           ar: 'Ø§Ù„Ø®ØµÙˆÙ…Ø§Øª' },
  'Net Pay':             { en: 'Net Pay',              ar: 'ØµØ§ÙÙŠ Ø§Ù„Ø±Ø§ØªØ¨' },
  'Download Payslip':    { en: 'Download Payslip',     ar: 'ØªØ­Ù…ÙŠÙ„ ÙƒØ´Ù Ø§Ù„Ø±Ø§ØªØ¨' },

  // â”€â”€ Employees â”€â”€
  'All Employees':       { en: 'All Employees',        ar: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†' },
  'Add Employee':        { en: 'Add Employee',         ar: 'Ø¥Ø¶Ø§ÙØ© Ù…ÙˆØ¸Ù' },
  'Search employees...': { en: 'Search employees...',  ar: 'Ø§Ø¨Ø­Ø« Ø¹Ù† Ù…ÙˆØ¸Ù...' },
  'ID':                  { en: 'ID',                   ar: 'Ø§Ù„Ø±Ù‚Ù…' },
  'Name':                { en: 'Name',                 ar: 'Ø§Ù„Ø§Ø³Ù…' },
  'Email':               { en: 'Email',                ar: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' },
  'Phone':               { en: 'Phone',                ar: 'Ø§Ù„Ù‡Ø§ØªÙ' },
  'Department':          { en: 'Department',           ar: 'Ø§Ù„Ù‚Ø³Ù…' },
  'Active':              { en: 'Active',               ar: 'Ù†Ø´Ø·' },
  'Inactive':            { en: 'Inactive',             ar: 'ØºÙŠØ± Ù†Ø´Ø·' },
  'Edit':                { en: 'Edit',                 ar: 'ØªØ¹Ø¯ÙŠÙ„' },
  'Delete':              { en: 'Delete',               ar: 'Ø­Ø°Ù' },
  'Export to Excel':     { en: 'Export to Excel',      ar: 'ØªØµØ¯ÙŠØ± Ù„Ù€ Excel' },
  'Download Report':     { en: 'Download Report',      ar: 'ØªØ­Ù…ÙŠÙ„ Ø§Ù„ØªÙ‚Ø±ÙŠØ±' },

  // â”€â”€ Common â”€â”€
  'Showing':             { en: 'Showing',              ar: 'Ø¹Ø±Ø¶' },
  'of':                  { en: 'of',                   ar: 'Ù…Ù†' },
  'entries':             { en: 'entries',               ar: 'Ø³Ø¬Ù„' },
  'to':                  { en: 'to',                   ar: 'Ø¥Ù„Ù‰' },
  'Previous':            { en: 'Previous',             ar: 'Ø§Ù„Ø³Ø§Ø¨Ù‚' },
  'Next':                { en: 'Next',                 ar: 'Ø§Ù„ØªØ§Ù„ÙŠ' },
  'Loading...':          { en: 'Loading...',            ar: 'Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„...' },
  'No Data':             { en: 'No Data',              ar: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª' },
  'Are you sure?':       { en: 'Are you sure?',        ar: 'Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ØŸ' },
  'Success':             { en: 'Success',              ar: 'Ù†Ø¬Ø§Ø­' },
  'Error':               { en: 'Error',                ar: 'Ø®Ø·Ø£' },
  'Save Changes':        { en: 'Save Changes',         ar: 'Ø­ÙØ¸ Ø§Ù„ØªØºÙŠÙŠØ±Ø§Øª' },
  'Close':               { en: 'Close',                ar: 'Ø¥ØºÙ„Ø§Ù‚' },
  'Role':                { en: 'Role',                 ar: 'Ø§Ù„Ø¯ÙˆØ±' },

  // â”€â”€ My Profile â”€â”€
  'Account Details':     { en: 'Account Details',      ar: 'ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø­Ø³Ø§Ø¨' },
  'Permissions':         { en: 'Permissions',          ar: 'Ø§Ù„ØµÙ„Ø§Ø­ÙŠØ§Øª' },
  'Employee Management': { en: 'Employee Management',  ar: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†' },
  'Payroll Access':      { en: 'Payroll Access',       ar: 'Ø§Ù„ÙˆØµÙˆÙ„ Ù„Ù„Ø±ÙˆØ§ØªØ¨' },
  'Personal Details':    { en: 'Personal Details',     ar: 'Ø§Ù„ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø´Ø®ØµÙŠØ©' },
  'Hire Date':           { en: 'Hire Date',            ar: 'ØªØ§Ø±ÙŠØ® Ø§Ù„ØªØ¹ÙŠÙŠÙ†' },
  'Profile Not Linked':  { en: 'Profile Not Linked',   ar: 'Ø§Ù„Ø¨Ø±ÙˆÙØ§ÙŠÙ„ ØºÙŠØ± Ù…Ø±ØªØ¨Ø·' },
  'Edit Profile':        { en: 'Edit Profile',         ar: 'ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ø¨Ø±ÙˆÙØ§ÙŠÙ„' },
  'Contact Information': { en: 'Contact Information',  ar: 'Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ø§ØªØµØ§Ù„' },
  'Change Password':     { en: 'Change Password',      ar: 'ØªØºÙŠÙŠØ± ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±' },
  'Current Password':    { en: 'Current Password',     ar: 'ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± Ø§Ù„Ø­Ø§Ù„ÙŠØ©' },
  'New Password':        { en: 'New Password',         ar: 'ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©' },
  'Confirm New Password': { en: 'Confirm New Password', ar: 'ØªØ£ÙƒÙŠØ¯ ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±' },
  'System Admin':        { en: 'System Admin',         ar: 'Ù…Ø¯ÙŠØ± Ø§Ù„Ù†Ø¸Ø§Ù…' },

  // â”€â”€ Additional Fields â”€â”€
  'First Name':          { en: 'First Name',           ar: 'Ø§Ù„Ø§Ø³Ù… Ø§Ù„Ø£ÙˆÙ„' },
  'Last Name':           { en: 'Last Name',            ar: 'Ø§Ø³Ù… Ø§Ù„Ø¹Ø§Ø¦Ù„Ø©' },
  'Position':            { en: 'Position',             ar: 'Ø§Ù„Ù…Ø³Ù…Ù‰ Ø§Ù„ÙˆØ¸ÙŠÙÙŠ' },
  'Join Date':           { en: 'Join Date',            ar: 'ØªØ§Ø±ÙŠØ® Ø§Ù„Ø§Ù„ØªØ­Ø§Ù‚' },
  'Save Employee':       { en: 'Save Employee',        ar: 'Ø­ÙØ¸ Ø§Ù„Ù…ÙˆØ¸Ù' },
  'All Departments':     { en: 'All Departments',      ar: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…' },
  'Add Department':      { en: 'Add Department',       ar: 'Ø¥Ø¶Ø§ÙØ© Ù‚Ø³Ù…' },
  'Department Name':     { en: 'Department Name',      ar: 'Ø§Ø³Ù… Ø§Ù„Ù‚Ø³Ù…' },
  'Description':         { en: 'Description',          ar: 'Ø§Ù„ÙˆØµÙ' },
  'All Positions':       { en: 'All Positions',        ar: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…Ø³Ù…ÙŠØ§Øª' },
  'Add Position':        { en: 'Add Position',         ar: 'Ø¥Ø¶Ø§ÙØ© Ù…Ø³Ù…Ù‰' },
  'Position Title':      { en: 'Position Title',       ar: 'Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ù…Ø³Ù…Ù‰' },
  'Welcome to Kawadir':  { en: 'Welcome to Kawadir',   ar: 'Ù…Ø±Ø­Ø¨Ø§Ù‹ Ø¨Ùƒ ÙÙŠ ÙƒÙˆØ§Ø¯Ø±' },
  'Login to your account':{ en: 'Login to your account',ar: 'Ø³Ø¬Ù„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ù„Ø­Ø³Ø§Ø¨Ùƒ' },
  'Password':            { en: 'Password',             ar: 'ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±' },
  'Login':               { en: 'Login',                ar: 'Ø¯Ø®ÙˆÙ„' },
  'Email Address':       { en: 'Email Address',        ar: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' },
  'No Employees Found':  { en: 'No Employees Found',   ar: 'Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø¹Ø«ÙˆØ± Ø¹Ù„Ù‰ Ù…ÙˆØ¸ÙÙŠÙ†' }
};

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\interceptors\auth.interceptor.ts


```ts

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  if (req.url.includes('/login')) {
    return next(req);
  }

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if ((error.status === 401 || error.status === 403) && !req.url.includes('/login')) {
        localStorage.clear();
        Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          text: 'Your session has expired. Please log in again.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#0d6efd'
        }).then(() => {
          router.navigate(['/login']);
        });
      }
      return throwError(() => error);
    })
  );
};

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\pipes\translate.pipe.ts


```ts

import { Pipe, PipeTransform, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { TRANSLATIONS } from '../i18n/translations';

@Pipe({
  name: 't',
  standalone: true,
  pure: false, // Ù„Ø§Ø²Ù… ÙŠÙƒÙˆÙ† impure Ø­ØªÙ‰ ÙŠØªØ­Ø¯Ø« Ù„Ù…Ø§ ØªØªØºÙŠØ± Ø§Ù„Ù„ØºØ©
})
export class TranslatePipe implements PipeTransform {
  private settings = inject(SettingsService);

  transform(key: string): string {
    const lang = this.settings.language;
    const entry = TRANSLATIONS[key];
    if (entry) {
      return entry[lang] || entry['en'] || key;
    }
    return key;
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\services\attendance.service.ts


```ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  // Ø´ØºÙ„ Ø§Ù„Ø­Ø¶ÙˆØ±
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/attendance`;

  getAllAttendance(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?pageNumber=1&pageSize=1000`).pipe(
      map((response) => {
        if (response && response.data && response.data.items)
          return response.data.items;
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        return [];
      }),
    );
  }

  getMyAttendance(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/my?pageNumber=1&pageSize=1000`)
      .pipe(
        map((response) => {
          if (response && response.data && response.data.items)
            return response.data.items;
          if (Array.isArray(response)) return response;
          if (response && Array.isArray(response.data)) return response.data;
          return [];
        }),
      );
  }

  clockIn(payload: { date: string; clockIn: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/clockin`, payload);
  }

  clockOut(payload: { clockOut: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/clockout`, payload);
  }

  getAttendanceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }
}


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\services\auth.service.ts


```ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Ø´ØºÙ„ Ø§Ù„ØªÙˆØ«ÙŠÙ‚
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response?.data?.token) {
          localStorage.setItem('jwt_token', response.data.token);

          if (response.data.role)
            localStorage.setItem('user_role', response.data.role);
          if (response.data.username)
            localStorage.setItem('user_name', response.data.username);
        }
      }),
    );
  }

  register(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, payload);
  }

  changePassword(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password`, payload);
  }

  getMe(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt_token');
    if (!token) return false;

    try {
      const parts = token.split('.');
      if (parts.length < 2) return false;

      const payload = JSON.parse(atob(parts[1]));
      const exp = payload.exp;
      if (!exp) return true;

      // exp Ø¨Ø§Ù„Ø«ÙˆØ§Ù†ÙŠØŒ Date.now() Ø¨Ø§Ù„Ù…Ù„Ù„ÙŠ Ø«Ø§Ù†ÙŠØ©
      if (Date.now() >= exp * 1000) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      // ØªÙˆÙƒÙ† ÙØ§Ø³Ø¯
      this.logout();
      return false;
    }
  }

  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isHR(): boolean {
    return this.hasRole('hr');
  }

  // admin Ø£Ùˆ hr Ø¹Ù†Ø¯Ù‡Ù… Ù†ÙØ³ Ø§Ù„ØµÙ„Ø§Ø­ÙŠØ§Øª Ù„Ø¨Ø¹Ø¶ Ø§Ù„Ø£Ø´ÙŠØ§Ø¡
  isAdminOrHR(): boolean {
    return this.hasRole('admin') || this.hasRole('hr');
  }

  private hasRole(role: string): boolean {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userRole =
        payload[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] ||
        payload['role'] ||
        payload['Role'];

      if (!userRole) return false;

      if (Array.isArray(userRole)) {
        return userRole.some((r) => r.toLowerCase() === role);
      }

      return userRole.toLowerCase() === role;
    } catch {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
  }

  // ÙƒÙ„ Ø§Ù„ÙŠÙˆØ²Ø±Ø§Øª
  getUsers(pageNumber = 1, pageSize = 100): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiUrl}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      )
      .pipe(map((response) => response?.data ?? response));
  }

  // ÙŠÙˆØ²Ø±Ø§Øª Ø¨Ø¯ÙˆÙ† Ù…Ù„Ù Ù…ÙˆØ¸Ù
  getUnassignedEmployeeUsers(pageNumber = 1, pageSize = 100): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiUrl}/unassigned-employees?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      )
      .pipe(map((response) => response?.data ?? response));
  }

  // Ù†Ø¬ÙŠØ¨ Ø§Ù„Ù€ id Ù…Ù† Ø§Ù„Ø¥ÙŠÙ…ÙŠÙ„
  getUserIdByEmail(email: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiUrl}/get-user-id-by-email/${encodeURIComponent(email)}`,
      )
      .pipe(map((response) => response?.data ?? response));
  }
}


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\services\department.service.ts


```ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  // Ø´ØºÙ„ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7204/api/departments';

  getDepartments(): Observable<any[]> {
    return this.http
      .get<any>(
        'https://localhost:7204/api/departments?pageNumber=1&pageSize=1000',
      )
      .pipe(
        map((response) => {
          if (response && response.data && response.data.items)
            return response.data.items;
          if (Array.isArray(response)) return response;
          if (response && Array.isArray(response.data)) return response.data;
          return [];
        }),
      );
  }

  addDepartment(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getDepartmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  updateDepartment(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\services\employee.service.ts


```ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // Ø´ØºÙ„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/employees`;

  getEmployees(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?pageNumber=1&pageSize=1000`).pipe(
      map((response) => {
        if (response && response.data && response.data.items) {
          return response.data.items;
        }
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;

        return [];
      }),
    );
  }
  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }
  getEmployeeFullProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/profile`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  // ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…ÙˆØ¸Ù
  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, employee);
  }

  getMyProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\services\leave.service.ts


```ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  // Ø´ØºÙ„ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/leaves`;

  getMyLeaves(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/my?pageNumber=1&pageSize=1000`)
      .pipe(
        map((response) => {
          if (response && response.data && response.data.items)
            return response.data.items;
          if (Array.isArray(response)) return response;
          if (response && Array.isArray(response.data)) return response.data;
          return [];
        }),
      );
  }

  applyLeave(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  getAllLeaves(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?pageNumber=1&pageSize=1000`).pipe(
      map((response) => {
        if (response && response.data && response.data.items)
          return response.data.items;
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        return [];
      }),
    );
  }

  getLeaveById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  updateLeaveStatus(
    id: number,
    status: string | number,
    rejectionReason?: string,
  ): Observable<any> {
    const payload: any = { status: Number(status) };
    if (rejectionReason) {
      payload.rejectionReason = rejectionReason;
    }
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, payload);
  }

  deleteLeave(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\services\notification.service.ts


```ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // Ø´ØºÙ„ Ø§Ù„ØªÙ†Ø¨ÙŠÙ‡Ø§Øª
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/notifications`;

  getNotifications(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return Array.isArray(response) ? response : [];
      }),
    );
  }

  getUnreadCount(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/unread-count`).pipe(
      map((response) => {
        if (response && response.data !== undefined) return response.data;
        return response;
      }),
    );
  }

  markAsRead(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/read`, {});
  }

  markAllAsRead(): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/read-all`, {});
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\services\position.service.ts


```ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  // Ø´ØºÙ„ Ø§Ù„Ù…Ø³Ù…ÙŠØ§Øª
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/positions`;

  getPositions(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return Array.isArray(response) ? response : [];
      }),
    );
  }

  getPositionsByDepartment(deptId: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/department/${deptId}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return Array.isArray(response) ? response : [];
      }),
    );
  }

  getPositionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  createPosition(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  updatePosition(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  deletePosition(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\services\salary.service.ts


```ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  // Ø´ØºÙ„ Ø§Ù„Ø±ÙˆØ§ØªØ¨
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/salaries`;

  getAllSalaries(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?pageNumber=1&pageSize=1000`).pipe(
      map((response) => {
        if (response && response.data && response.data.items)
          return response.data.items;
        if (Array.isArray(response)) return response;
        if (response && Array.isArray(response.data)) return response.data;
        return [];
      }),
    );
  }

  getMySalaries(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/my?pageNumber=1&pageSize=1000`)
      .pipe(
        map((response) => {
          if (response && response.data && response.data.items)
            return response.data.items;
          if (Array.isArray(response)) return response;
          if (response && Array.isArray(response.data)) return response.data;
          return [];
        }),
      );
  }

  getSalaryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => {
        if (response && response.data) return response.data;
        return response;
      }),
    );
  }

  createSalary(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  updateSalary(id: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  deleteSalary(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\services\settings.service.ts


```ts

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…
  // Ø§Ù„Ø«ÙŠÙ…: dark Ø£Ùˆ light
  private _isDarkMode = signal(false);
  // Ø§Ù„Ù„ØºØ©: en Ø£Ùˆ ar
  private _language = signal<'en' | 'ar'>('en');

  get isDarkMode() {
    return this._isDarkMode();
  }

  get language() {
    return this._language();
  }

  constructor() {
    // Ø§Ø³ØªØ±Ø¬Ø¹ Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ù…Ø­ÙÙˆØ¸Ø© Ù…Ù† localStorage
    const savedTheme = localStorage.getItem('hrms_theme');
    const savedLang = localStorage.getItem('hrms_language') as 'en' | 'ar';

    if (savedTheme === 'dark') {
      this._isDarkMode.set(true);
      this.applyTheme(true);
    }

    if (savedLang === 'ar' || savedLang === 'en') {
      this._language.set(savedLang);
      this.applyLanguage(savedLang);
    }
  }

  toggleTheme() {
    const newMode = !this._isDarkMode();
    this._isDarkMode.set(newMode);
    localStorage.setItem('hrms_theme', newMode ? 'dark' : 'light');
    this.applyTheme(newMode);
  }

  toggleLanguage() {
    const newLang = this._language() === 'en' ? 'ar' : 'en';
    this._language.set(newLang);
    localStorage.setItem('hrms_language', newLang);
    this.applyLanguage(newLang);
  }

  private applyTheme(isDark: boolean) {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light',
    );
    document.body.classList.toggle('dark-mode', isDark);
  }

  private applyLanguage(lang: 'en' | 'ar') {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\services\sidebar.service.ts


```ts

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  // Ø­Ø§Ù„Ø© Ø§Ù„Ø³Ø§ÙŠØ¯Ø¨Ø§Ø±
  isSidebarHidden = signal<boolean>(false);
  isMobileSidebarOpen = signal<boolean>(false);

  toggleSidebar() {
    if (window.innerWidth <= 768) {
      this.isMobileSidebarOpen.set(!this.isMobileSidebarOpen());
    } else {
      this.isSidebarHidden.set(!this.isSidebarHidden());
    }
  }

  closeMobileSidebar() {
    if (window.innerWidth <= 768) {
      this.isMobileSidebarOpen.set(false);
    }
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\core\utils\error-handler.util.ts


```ts

// Ø¨Ø¯Ù„ Ù…Ø§ ØªØ¹Ø±Ø¶ Ø±Ø³Ø§Ø¦Ù„ ØªÙ‚Ù†ÙŠØ© Ù…Ù† Ø§Ù„Ù€ backendØŒ Ù†Ø­ÙˆÙ„Ù‡Ø§ Ù„Ø´ÙŠØ¡ Ù…ÙÙ‡ÙˆÙ…
export function getFriendlyErrorMessage(
  err: any,
  fallback: string = 'Something went wrong. Please try again later.',
): string {
  const status: number = err?.status ?? 0;
  const rawMessage: string =
    err?.error?.message || err?.error?.title || err?.message || '';

  // Ù…Ø´ÙƒÙ„Ø© Ø´Ø¨ÙƒØ© Ø£Ùˆ Ø§Ù„Ù€ server Ù…Ø´ Ø´ØºØ§Ù„
  if (
    status === 0 ||
    (err?.name === 'HttpErrorResponse' && !navigator.onLine)
  ) {
    return 'No internet connection. Please check your network and try again.';
  }

  // Ø£Ø®Ø·Ø§Ø¡ ØªÙ‚Ù†ÙŠØ© Ù…Ù† Ø§Ù„Ù€ DB â€” Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ù…Ø§ ÙŠØ­ØªØ§Ø¬ ÙŠØ´ÙˆÙÙ‡Ø§
  if (
    rawMessage.includes('EADDRNOTALLOWED') ||
    rawMessage.includes('allow_list') ||
    rawMessage.includes('tenant') ||
    rawMessage.includes('XX000') ||
    rawMessage.includes('PGRST') ||
    rawMessage.includes('connection refused') ||
    rawMessage.includes('ECONNREFUSED')
  ) {
    return 'Unable to connect to the server. Please contact support or try again later.';
  }

  if (status === 401) {
    return 'Your session has expired. Please log in again.';
  }

  if (status === 403) {
    return 'You do not have permission to perform this action.';
  }

  if (status === 404) {
    return 'The requested resource was not found.';
  }

  if (status === 400) {
    // Ù„Ùˆ Ø§Ù„Ø±Ø³Ø§Ù„Ø© Ù‚ØµÙŠØ±Ø© ÙˆÙ…ÙÙ‡ÙˆÙ…Ø© Ù†Ø¹Ø±Ø¶Ù‡Ø§ Ù…Ø¨Ø§Ø´Ø±Ø©
    if (
      rawMessage &&
      rawMessage.length < 150 &&
      !looksLikeTechError(rawMessage)
    ) {
      return rawMessage;
    }
    return 'Invalid input. Please check the form and try again.';
  }

  if (status >= 500) {
    return 'A server error occurred. Please try again later.';
  }

  if (
    rawMessage &&
    rawMessage.length < 150 &&
    !looksLikeTechError(rawMessage)
  ) {
    return rawMessage;
  }

  return fallback;
}

// Ù†ØªØ­Ù‚Ù‚ Ø¥Ø°Ø§ ÙƒØ§Ù†Øª Ø§Ù„Ø±Ø³Ø§Ù„Ø© ØªÙ‚Ù†ÙŠØ© ÙˆÙ…Ø§ ØªØµÙ„Ø­ Ù„Ù„Ù…Ø³ØªØ®Ø¯Ù…
function looksLikeTechError(msg: string): boolean {
  const techPatterns = [
    'XX',
    'PGRST',
    'EADDR',
    'ECONN',
    'stack trace',
    'NullReferenceException',
    'SqlException',
    'DbUpdateException',
    'System.',
    'Microsoft.',
    'allow_list',
    'tenant',
    'Object reference',
    'Unhandled exception',
    'at System',
    'at Microsoft',
  ];
  return techPatterns.some((p) => msg.includes(p));
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\all-attendance\all-attendance.component.html


```html

<div class="page-container p-4">

    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
            <h3 class="fw-bold text-dark mb-1">
                <i class="bi bi-clock-history me-2 text-primary"></i>All Employees Attendance
            </h3>
            <p class="text-muted small mb-0">Overview of all employees clock-in and clock-out records</p>
        </div>
        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end">
            <div class="input-group shadow-sm" style="max-width: 350px;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0" 
                    placeholder="Search by name, ID, or date..." 
                    [(ngModel)]="searchQuery" 
                    (input)="filterRecords()">
            </div>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Filter Attendance">
                    <i class="bi bi-funnel-fill"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">Filter Options</h6>
                    
                    <div class="mb-2">
                        <label class="form-label small fw-semibold text-muted mb-1">Status</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedStatus" (change)="filterRecords()">
                            <option value="">All Statuses</option>
                            <option value="Working">Working</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <a routerLink="/employees" class="btn btn-outline-secondary btn-sm rounded-3 text-nowrap shadow-sm p-2 px-3">
                <i class="bi bi-arrow-left me-1"></i> Back to Employees
            </a>
        </div>
    </div>

    <!-- Table -->
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">

                <thead class="bg-light text-muted small text-uppercase" style="letter-spacing: 0.5px;">
                    <tr>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">Employee</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold">Date</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-success">Clock In</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-danger">Clock Out</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-primary">Total Hours</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">Status</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <!-- Loading -->
                    <tr *ngIf="isLoading">
                        <td colspan="6" class="text-center py-5 text-muted">
                            <span class="spinner-border spinner-border-sm me-2"></span>
                            Loading attendance records...
                        </td>
                    </tr>

                    <!-- Empty -->
                    <tr *ngIf="!isLoading && records.length === 0">
                        <td colspan="6" class="text-center py-5">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i class="bi bi-clock-history fs-1 text-secondary"></i>
                                </div>
                                <h5 class="fw-bold text-dark mb-1">No Attendance Records</h5>
                                <p class="text-muted small">There are no clock-in records available yet matching your criteria.</p>
                            </div>
                        </td>
                    </tr>

                    <!-- Rows -->
                    <tr *ngFor="let rec of paginatedRecords">
                        <td data-label="Employee" class="py-3 px-4">
                            <div class="fw-semibold text-dark">
                                {{ rec.employeeName || ('Employee #' + rec.employeeId) }}
                            </div>
                        </td>
                        <td data-label="Date" class="py-3 px-3 text-muted">
                            {{ rec.date | date:'dd MMM yyyy' }}
                        </td>
                        <td data-label="Clock In" class="py-3 px-3 text-success fw-medium">
                            <i class="bi bi-arrow-down-right-circle me-1"></i>
                            {{ rec.clockIn || 'â€”' }}
                        </td>
                        <td data-label="Clock Out" class="py-3 px-3 text-danger fw-medium">
                            <i class="bi bi-arrow-up-right-circle me-1"></i>
                            {{ (!rec.clockOut || rec.clockOut === '00:00:00') ? 'â€”' : rec.clockOut }}
                        </td>
                        <td data-label="Total Hours" class="py-3 px-3 fw-semibold text-primary">
                            {{ calcHours(rec) }}
                        </td>
                        <td data-label="Status" class="py-3 px-4">
                            <span class="badge rounded-pill px-3 py-2"
                                [class.bg-success]="rec.clockOut && rec.clockOut !== '00:00:00'"
                                [class.bg-opacity-10]="true"
                                [class.text-success]="rec.clockOut && rec.clockOut !== '00:00:00'"
                                [class.bg-warning]="!rec.clockOut || rec.clockOut === '00:00:00'"
                                [class.text-warning]="!rec.clockOut || rec.clockOut === '00:00:00'"
                                style="border: 1px solid currentColor; opacity: 0.9;">
                                <i class="bi me-1"
                                   [class.bi-check-circle-fill]="rec.clockOut && rec.clockOut !== '00:00:00'"
                                   [class.bi-clock-fill]="!rec.clockOut || rec.clockOut === '00:00:00'"></i>
                                {{ getStatusLabel(rec) }}
                            </span>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="records.length > 0" class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ getMathMin(currentPage * itemsPerPage, records.length) }} of {{ records.length }} entries
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </div>
    </div>
</div>

<style>
.cursor-pointer {
  cursor: pointer;
}

/* Mobile Responsive Cards for Table */
@media screen and (max-width: 768px) {
  .table-responsive table, 
  .table-responsive thead, 
  .table-responsive tbody, 
  .table-responsive th, 
  .table-responsive td, 
  .table-responsive tr {
    display: block;
  }
  
  .table-responsive thead tr {
    display: none; /* Hide header row */
  }
  
  .table-responsive tr {
    border: 1px solid #e8ecf0;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }
  
  .table-responsive td {
    border: none;
    border-bottom: 1px solid #f0f2f5;
    position: relative;
    padding-left: 45% !important;
    text-align: right !important;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 50px;
  }
  
  .table-responsive td:last-child {
    border-bottom: 0;
  }
  
  .table-responsive td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    width: 40%;
    text-align: left;
    font-weight: 700;
    color: #8592a3;
    font-size: 0.75rem;
    text-transform: uppercase;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .actions-cell {
    justify-content: flex-end !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
}
</style>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\all-attendance\all-attendance.component.ts


```ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../core/services/attendance.service';

@Component({
  selector: 'app-all-attendance',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './all-attendance.component.html',
})
export class AllAttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);

  allRecords: any[] = [];
  records: any[] = [];

  searchQuery: string = '';
  selectedStatus: string = '';

  isLoading = true;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedRecords() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.records.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.records.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  ngOnInit() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø³Ø¬Ù„Ø§Øª
    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        const items = Array.isArray(res)
          ? res
          : (res?.items ?? res?.data?.items ?? res?.data ?? []);
        this.allRecords = Array.isArray(items) ? items : [];
        this.allRecords.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.records = [...this.allRecords];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  filterRecords() {
    // ÙÙ„ØªØ±Ø© Ø§Ù„Ø³Ø¬Ù„Ø§Øª
    this.records = this.allRecords.filter((rec) => {
      let matchesSearch = true;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const empName = (rec.employeeName || '').toLowerCase();
        const empId = String(rec.employeeId || '');
        const dateStr = String(rec.date || '').toLowerCase();
        matchesSearch =
          empName.includes(query) ||
          empId.includes(query) ||
          dateStr.includes(query);
      }

      let matchesStatus = true;
      if (this.selectedStatus) {
        const currentStatus = this.getStatusLabel(rec);
        matchesStatus = currentStatus === this.selectedStatus;
      }

      return matchesSearch && matchesStatus;
    });

    this.currentPage = 1;
  }

  getStatusClass(rec: any): string {
    if (!rec.clockOut || rec.clockOut === '00:00:00') return 'text-warning';
    return 'text-success';
  }

  getStatusLabel(rec: any): string {
    if (!rec.clockOut || rec.clockOut === '00:00:00') return 'Working';
    return 'Completed';
  }

  calcHours(rec: any): string {
    if (!rec.clockOut || rec.clockOut === '00:00:00') return 'â€”';
    const inn = new Date(`2000-01-01T${rec.clockIn}`);
    const out = new Date(`2000-01-01T${rec.clockOut}`);
    const hrs = (out.getTime() - inn.getTime()) / 3600000;
    return `${hrs.toFixed(1)} hrs`;
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\attendance\attendance.component.css


```css


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\attendance\attendance.component.html


```html

<div class="page-container p-4">

    <div class="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
        <div>
            <h3 class="fw-bold text-dark mb-1">
                {{ isAdmin ? ('Employee Attendance Tracking' | t) : ('My Attendance Tracking' | t) }}
            </h3>
            <p class="text-muted small mb-0">
                {{ isAdmin ? ('Monitor all employees daily clock-in and clock-out records' | t) : ('Monitor your daily clock-in and clock-out records' | t) }}
            </p>
        </div>

        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end flex-wrap">
            <div class="input-group shadow-sm" style="max-width: 300px;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0" 
                    placeholder="{{ 'Search employees...' | t }}" 
                    [(ngModel)]="searchQuery" 
                    (input)="filterRecords()">
            </div>

            <button class="btn btn-outline-success shadow-sm px-4 py-2 rounded-3 fw-semibold text-nowrap d-flex align-items-center" (click)="exportToExcel()">
                <i class="bi bi-file-earmark-excel-fill me-2 fs-5"></i> {{ 'Export' | t }}
            </button>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm px-3 py-2 rounded-3 d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-filter me-2 fs-5"></i> {{ 'Filter' | t }}
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="min-width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">{{ 'Filter Options' | t }}</h6>
                    <div class="mb-0">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Status' | t }}</label>
                        <select class="form-select form-select-sm border-light-subtle" [(ngModel)]="selectedStatus" (change)="filterRecords()">
                            <option value="">{{ 'All Statuses' | t }}</option>
                            <option value="Completed">{{ 'Completed' | t }}</option>
                            <option value="Working">{{ 'Working' | t }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div *ngIf="!isAdmin" class="d-flex flex-column align-items-end gap-2">
                <div *ngIf="isStaleSession"
                     class="alert alert-warning py-2 px-3 mb-0 rounded-3 small d-flex align-items-center gap-2 w-100">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    <span>
                        {{ 'Open session from' | t }} <strong>{{ activeSession?.date | date:'dd MMM yyyy' }}</strong>.
                        {{ 'Click Clock Out to close it.' | t }}
                    </span>
                </div>

                <div class="d-flex align-items-center gap-2">
                    <a *ngIf="isAdminOrHR" routerLink="/all-attendance"
                       class="btn btn-outline-primary px-4 py-2 rounded-3 shadow-sm text-nowrap">
                        <i class="bi bi-people me-1"></i> {{ 'View All' | t }}
                    </a>

                    <button *ngIf="!isCheckedInToday"
                        class="btn btn-success px-4 py-2 rounded-3 fw-semibold shadow-sm text-nowrap"
                        (click)="onClockIn()"
                        [disabled]="isProcessing || isLoading">
                        <span *ngIf="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                        <i *ngIf="!isProcessing" class="bi bi-box-arrow-in-right me-2"></i> {{ 'Clock In' | t }}
                    </button>

                    <button *ngIf="isCheckedInToday && !isCheckedOutToday"
                        class="btn btn-warning px-4 py-2 rounded-3 fw-semibold shadow-sm text-dark text-nowrap"
                        (click)="onClockOut()"
                        [disabled]="isProcessing || isLoading">
                        <span *ngIf="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                        <i *ngIf="!isProcessing" class="bi bi-box-arrow-right me-2"></i> {{ 'Clock Out' | t }}
                    </button>

                    <span *ngIf="isCheckedInToday && isCheckedOutToday"
                        class="badge bg-success bg-opacity-10 text-success px-4 py-2 rounded-3 fw-semibold border border-success border-opacity-25 text-nowrap">
                        <i class="bi bi-check-circle-fill me-2"></i> {{ 'Shift Completed' | t }} ({{ todayWorkedHours | number:'1.1-2' }} {{ 'hrs' | t }})
                    </span>
                </div>
            </div>
        </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">

                <thead class="bg-light text-muted small text-uppercase"
                    style="letter-spacing: 0.5px;">
                    <tr>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Date' | t }}</th>
                        <th *ngIf="isAdminOrHR" class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Employee' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Clock In' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Clock Out' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold text-center">{{ 'Status' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold text-end">{{ 'Total Hours' | t }}</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <tr *ngIf="isLoading">
                        <td colspan="6" class="text-center py-5 text-muted">
                            <span
                                class="spinner-border spinner-border-sm me-2"></span>
                            {{ 'Loading attendance data...' | t }}
                        </td>
                    </tr>

                    <tr *ngIf="!isLoading && attendanceRecords.length === 0">
                        <td [colSpan]="isAdmin ? 6 : 5" class="text-center py-5">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i class="bi bi-clock-history text-secondary fs-1"></i>
                                </div>
                                <h3 class="fw-bold text-dark mb-1">{{ 'Attendance' | t }}</h3>
                                <p class="text-muted small mb-0">{{ 'No attendance records available yet matching your criteria.' | t }}</p>
                            </div>
                        </td>
                    </tr>

                    <tr *ngFor="let record of paginatedRecords">
                        <td data-label="Date" class="py-3 px-4 fw-bold text-dark">
                            {{ record.date | date:'dd MMM yyyy' }}
                        </td>
                        <td *ngIf="isAdminOrHR" data-label="Employee" class="py-3 px-4 fw-bold text-dark">
                            {{ record.employeeName || ('Emp #' + record.employeeId) }}
                        </td>

                        <td data-label="Clock-in Time" class="py-3 px-3 text-success fw-medium">
                            <i class="bi bi-arrow-down-right-circle me-1"></i>
                            {{ record.clockIn || '--:--' }}
                        </td>

                        <td data-label="Clock-out Time" class="py-3 px-3 text-danger fw-medium">
                            <i class="bi bi-arrow-up-right-circle me-1"></i>
                            {{ (record.clockOut && record.clockOut !==
                            '00:00:00') ? record.clockOut : '--:--' }}
                        </td>

                        <td data-label="Status" class="py-3 px-4 text-center">
                            <span class="badge px-3 py-2 rounded-pill"
                                [ngClass]="(record.clockOut && record.clockOut !== '00:00:00') ? 'bg-success bg-opacity-10 text-success' : 'bg-primary bg-opacity-10 text-primary'">
                                {{ (record.clockOut && record.clockOut !== '00:00:00') ? ('Completed' | t) : ('Working' | t) }}
                            </span>
                        </td>

                        <td data-label="Total Hours" class="py-3 px-3 text-end">
                            <span class="fw-bold fs-6">{{ record.totalHours || '-' }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="allAttendanceRecords.length > 0" class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ getMathMin(currentPage * itemsPerPage, attendanceRecords.length) }} of {{ attendanceRecords.length }} entries
                <span *ngIf="attendanceRecords.length !== allAttendanceRecords.length" class="text-primary ms-1">
                    (filtered from {{ allAttendanceRecords.length }} total)
                </span>
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </div>
    </div>
</div>

<style>
.cursor-pointer {
  cursor: pointer;
}

/* Mobile Responsive Cards for Table */
@media screen and (max-width: 768px) {
  .table-responsive table, 
  .table-responsive thead, 
  .table-responsive tbody, 
  .table-responsive th, 
  .table-responsive td, 
  .table-responsive tr {
    display: block;
  }
  
  .table-responsive thead tr {
    display: none; /* Hide header row */
  }
  
  .table-responsive tr {
    border: 1px solid #e8ecf0;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }
  
  .table-responsive td {
    border: none;
    border-bottom: 1px solid #f0f2f5;
    position: relative;
    padding-left: 45% !important;
    text-align: right !important;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 50px;
  }
  
  .table-responsive td:last-child {
    border-bottom: 0;
  }
  
  .table-responsive td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    width: 40%;
    text-align: left;
    font-weight: 700;
    color: #8592a3;
    font-size: 0.75rem;
    text-transform: uppercase;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .actions-cell {
    justify-content: flex-end !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
}
</style>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\attendance\attendance.component.ts


```ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../core/services/attendance.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent implements OnInit {
  private attendanceService = inject(AttendanceService);
  private authService = inject(AuthService);

  allAttendanceRecords: any[] = [];
  attendanceRecords: any[] = [];

  searchQuery: string = '';
  selectedStatus: string = '';

  isLoading = true;
  isProcessing = false;
  isAdmin = false;
  isAdminOrHR = false;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedRecords() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.attendanceRecords.slice(
      startIndex,
      startIndex + this.itemsPerPage,
    );
  }

  get totalPages() {
    return Math.ceil(this.attendanceRecords.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  // Ø­Ø§Ù„Ø© clock in/out Ø§Ù„ÙŠÙˆÙ…
  isCheckedInToday = false;
  isCheckedOutToday = false;
  todayWorkedHours = 0;
  activeSession: any = null; // session Ù…ÙØªÙˆØ­Ø© Ø¨Ø¯ÙˆÙ† clock out
  readonly today = new Date().toISOString().split('T')[0]; // Ù„Ù„Ù…Ù‚Ø§Ø±Ù†Ø© ÙÙŠ Ø§Ù„Ù€ template

  // session Ù…Ù† ÙŠÙˆÙ… Ø³Ø§Ø¨Ù‚ ÙˆÙ†Ø³ÙŠ ÙŠØ¹Ù…Ù„ clock out
  get isStaleSession(): boolean {
    if (!this.activeSession?.date) return false;
    const sessionDate = new Date(this.activeSession.date)
      .toISOString()
      .split('T')[0];
    return sessionDate < this.today;
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isAdminOrHR = this.authService.isAdminOrHR();
    if (this.isAdmin) {
      this.loadAllAttendance();
    } else {
      this.loadMyAttendance();
    }
  }

  loadAllAttendance() {
    // ØªØ­Ù…ÙŠÙ„ ÙƒÙ„ Ø§Ù„Ø­Ø¶ÙˆØ±
    this.isLoading = true;
    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        const items = Array.isArray(res)
          ? res
          : (res?.items ?? res?.data?.items ?? res?.data ?? []);
        this.allAttendanceRecords = Array.isArray(items) ? items : [];
        this.allAttendanceRecords.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.attendanceRecords = [...this.allAttendanceRecords];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  loadMyAttendance() {
    // ØªØ­Ù…ÙŠÙ„ Ø­Ø¶ÙˆØ±ÙŠ
    this.isLoading = true;
    this.attendanceService.getMyAttendance().subscribe({
      next: (res: any) => {
        const items = Array.isArray(res)
          ? res
          : (res?.items ?? res?.data?.items ?? res?.data ?? []);
        this.allAttendanceRecords = Array.isArray(items) ? items : [];
        this.attendanceRecords = [...this.allAttendanceRecords];
        this.analyzeSessionStatus(this.attendanceRecords);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching my attendance:', err);
        this.isLoading = false;
      },
    });
  }

  filterRecords() {
    this.attendanceRecords = this.allAttendanceRecords.filter((rec) => {
      let matchesSearch = true;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const empName = (rec.employeeName || '').toLowerCase();
        const empId = String(rec.employeeId || '');
        const dateStr = String(rec.date || '').toLowerCase();
        matchesSearch =
          empName.includes(query) ||
          empId.includes(query) ||
          dateStr.includes(query);
      }

      let matchesStatus = true;
      if (this.selectedStatus) {
        const isCompleted = rec.clockOut && rec.clockOut !== '00:00:00';
        const currentStatus = isCompleted ? 'Completed' : 'Working';
        matchesStatus = currentStatus === this.selectedStatus;
      }

      return matchesSearch && matchesStatus;
    });

    this.currentPage = 1;
    if (this.attendanceRecords.length > 0) {
      this.attendanceRecords.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }
  }

  private analyzeSessionStatus(records: any[]) {
    // ØªØ­Ù„ÙŠÙ„ Ø­Ø§Ù„Ø© Ø§Ù„Ø¯ÙˆØ§Ù…
    const today = new Date().toDateString();

    const openSession = records.find(
      (r) => !r.clockOut || r.clockOut === '00:00:00' || r.clockOut === null,
    );

    const todayRecord = records.find(
      (r) => new Date(r.date).toDateString() === today,
    );

    if (openSession) {
      this.activeSession = openSession;
      this.isCheckedInToday = true;
      this.isCheckedOutToday = false;
      this.todayWorkedHours = 0;
    } else if (todayRecord) {
      this.activeSession = null;
      this.isCheckedInToday = true;
      this.isCheckedOutToday = true;

      const inTime = new Date(`2000-01-01T${todayRecord.clockIn}`);
      const outTime = new Date(`2000-01-01T${todayRecord.clockOut}`);
      this.todayWorkedHours = (outTime.getTime() - inTime.getTime()) / 3600000;
    } else {
      this.activeSession = null;
      this.isCheckedInToday = false;
      this.isCheckedOutToday = false;
      this.todayWorkedHours = 0;
    }
  }

  onClockIn() {
    // ØªØ³Ø¬ÙŠÙ„ Ø¯Ø®ÙˆÙ„
    this.isProcessing = true;
    const now = new Date();
    const dateIso = now.toISOString();
    const timeString = now.toTimeString().split(' ')[0]; // HH:MM:SS format

    this.attendanceService
      .clockIn({ date: dateIso, clockIn: timeString })
      .subscribe({
        next: () => {
          this.isProcessing = false;
          Swal.fire({
            icon: 'success',
            title: 'Clocked In âœ…',
            text: `Have a great day! Clocked in at ${timeString}`,
            timer: 2000,
            showConfirmButton: false,
          });
          this.loadMyAttendance();
        },
        error: (err) => {
          this.isProcessing = false;
          const msg =
            err?.error?.message ||
            err?.error?.Message ||
            'Failed to clock in. Please try again.';
          Swal.fire('Error', msg, 'error');
        },
      });
  }

  // â”€â”€â”€ Clock Out â”€â”€â”€
  onClockOut() {
    this.isProcessing = true;
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];

    // session Ù…Ù† ÙŠÙˆÙ… Ø³Ø§Ø¨Ù‚ Ù†ØºÙ„Ù‚Ù‡Ø§ Ø¨Ù€ 23:59
    const isOldSession =
      this.activeSession &&
      new Date(this.activeSession.date).toDateString() !==
        new Date().toDateString();

    const clockOutTime = isOldSession ? '23:59:00' : timeString;

    this.attendanceService.clockOut({ clockOut: clockOutTime }).subscribe({
      next: () => {
        this.isProcessing = false;
        const msg = isOldSession
          ? `Previous session automatically closed at 23:59.`
          : `Great job today! Clocked out at ${clockOutTime}`;
        Swal.fire({
          icon: 'success',
          title: 'Clocked Out âœ…',
          text: msg,
          timer: 2500,
          showConfirmButton: false,
        });
        this.loadMyAttendance();
      },
      error: (err) => {
        this.isProcessing = false;
        const msg =
          err?.error?.message ||
          err?.error?.Message ||
          'Failed to clock out. Please try again.';
        Swal.fire('Error', msg, 'error');
      },
    });
  }
  // â”€â”€â”€ Export to Excel (CSV) â”€â”€â”€
  exportToExcel() {
    // ØªØµØ¯ÙŠØ± Ø§Ù„Ù…Ù„Ù
    if (this.attendanceRecords.length === 0) {
      Swal.fire(
        'No Data',
        'There are no attendance records to export.',
        'info',
      );
      return;
    }

    const headers = [
      'Date',
      'Employee Name',
      'Employee ID',
      'Clock In',
      'Clock Out',
      'Status',
      'Total Hours',
    ];

    const csvData = this.attendanceRecords.map((rec) => {
      const isCompleted = rec.clockOut && rec.clockOut !== '00:00:00';
      const status = isCompleted ? 'Completed' : 'Working';
      const empName = rec.employeeName || 'Emp #' + rec.employeeId;

      return [
        rec.date ? new Date(rec.date).toLocaleDateString() : '',
        empName,
        rec.employeeId || 'N/A',
        rec.clockIn || '--:--',
        rec.clockOut && rec.clockOut !== '00:00:00' ? rec.clockOut : '--:--',
        status,
        rec.totalHours || '0',
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',');
    });

    // BOM + sep hint Ø¹Ø´Ø§Ù† Excel ÙŠÙØªØ­Ù‡ ØµØ­
    const csvContent =
      '\uFEFFsep=,\r\n' + [headers.join(','), ...csvData].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `Attendance_Kawadir_${new Date().toISOString().split('T')[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: 'success',
      title: 'Exported Successfully',
      text: 'Attendance data has been exported to Excel (CSV).',
      timer: 2000,
      showConfirmButton: false,
    });
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\auth\login\login.component.css


```css

.login-page {
    background: linear-gradient(135deg, #0f1b2d 0%, #1a2e45 40%, #0d2137 100%);
    position: relative;
    overflow: hidden;
}

/* â”€â”€ Ø´Ø¨ÙƒØ© Ù†Ù‚Ø§Ø· â”€â”€ */
.dot-grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 30px 30px;
    pointer-events: none;
    z-index: 0;
}

/* â”€â”€ Ø§Ù„Ø¯ÙˆØ§Ø¦Ø± Ø§Ù„Ø¹Ø§Ø¦Ù…Ø© â”€â”€ */
.bg-blobs {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.35;
    animation: floatBlob 12s ease-in-out infinite;
}

.blob-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #c9a84c, #8B6914);
    top: -150px; left: -150px;
    animation-duration: 14s;
}

.blob-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #1a6ea8, #0d3d6e);
    bottom: -100px; right: -100px;
    animation-duration: 11s;
    animation-delay: -4s;
}

.blob-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, #8B6914, #c9a84c55);
    top: 40%; right: 15%;
    animation-duration: 16s;
    animation-delay: -7s;
}

.blob-4 {
    width: 250px; height: 250px;
    background: radial-gradient(circle, #1e5a8a, #0a2d4d);
    top: 20%; left: 30%;
    animation-duration: 13s;
    animation-delay: -2s;
}

.blob-5 {
    width: 200px; height: 200px;
    background: radial-gradient(circle, #c9a84c44, transparent);
    bottom: 20%; left: 20%;
    animation-duration: 18s;
    animation-delay: -9s;
}

@keyframes floatBlob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(30px, -40px) scale(1.05); }
    66%       { transform: translate(-20px, 25px) scale(0.97); }
}

/* Ø§Ù„Ø¨Ø·Ø§Ù‚Ø© ØªØ·ÙÙˆ ÙÙˆÙ‚ Ø§Ù„Ø®Ù„ÙÙŠØ© */
.login-card {
    position: relative;
    z-index: 1;
}

.login-card {
    background-color: #ffffff;
    background-image: 
        radial-gradient(rgba(0, 0, 0, 0.09) 2px, transparent 2px),
        radial-gradient(circle at bottom left, rgba(255, 248, 225, 0.4) 0%, #ffffff 60%);
    background-size: 24px 24px, 100% 100%;
    background-position: 0 0, 0 0;
    border-radius: 2rem;
    width: 1200px; /* Ø²ÙŠØ§Ø¯Ø© Ø§Ù„Ø¹Ø±Ø¶ */
    max-width: 95vw;
    min-height: 700px; /* Ø²ÙŠØ§Ø¯Ø© Ø§Ù„Ø·ÙˆÙ„ Ù„ÙŠØ£Ø®Ø° Ù…Ø³Ø§Ø­Ø© Ø£Ø·ÙˆÙ„ */
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.login-form-section {
    flex: 1;
    max-width: 50%;
    z-index: 1;
}

.login-image-section {
    flex: 1;
    max-width: 50%;
}

.logo-text .badge {
    border-color: #d1d5db !important;
}

.custom-input {
    background-color: #f9fafb;
    transition: all 0.3s;
    font-size: 0.95rem;
}

.custom-input:focus {
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(255, 214, 107, 0.3) !important;
    outline: none;
}

/* Ø§Ù„Ø§ÙŠØ±ÙˆØ±Ø² */
.custom-input.is-invalid {
    border: 1.5px solid #dc3545 !important;
    background-color: #fff5f5;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.12) !important;
}

.invalid-feedback {
    display: none;
    color: #dc3545;
    font-size: 0.8rem;
}

.custom-input.is-invalid ~ .invalid-feedback,
.is-invalid + .invalid-feedback {
    display: block;
}

/* Ù…Ø´Ø§Ù† Ø§Ù„Ù€ invalid-feedback ÙŠØ´ØªØºÙ„ ØµØ­ */
div:has(.custom-input.is-invalid) .invalid-feedback {
    display: block;
}

.submit-btn {
    background-color: #fed35c;
    border: none;
    transition: all 0.3s;
    font-size: 1rem;
}

.submit-btn:hover {
    background-color: #f5c43d;
    transform: translateY(-1px);
}

.submit-btn:disabled {
    opacity: 0.7;
}

@media (max-width: 991px) {
    .login-form-section {
        max-width: 100%;
    }
    .login-card {
        height: auto;
        padding-bottom: 2rem;
        background: #ffffff;
    }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\auth\login\login.component.html


```html

<div class="login-page d-flex align-items-center justify-content-center vh-100" dir="ltr">

    <!-- Ø®Ù„ÙÙŠØ© Ù…ØªØ­Ø±ÙƒØ© -->
    <div class="bg-blobs" aria-hidden="true">
        <span class="blob blob-1"></span>
        <span class="blob blob-2"></span>
        <span class="blob blob-3"></span>
        <span class="blob blob-4"></span>
        <span class="blob blob-5"></span>
    </div>
    <!-- Ø´Ø¨ÙƒØ© Ù†Ù‚Ø§Ø· -->
    <div class="dot-grid" aria-hidden="true"></div>

    <div class="login-card shadow-lg d-flex position-relative">

        <!-- Left Side: Form -->
        <div class="login-form-section p-5 d-flex flex-column position-relative">
            <div class="logo-text mt-2 mb-4 d-flex align-items-center">
                <div class="shadow-sm overflow-hidden d-flex align-items-center justify-content-center bg-white me-3"
                    style="width: 60px; height: 60px; border-radius: 14px; border: 1px solid #e5e7eb;">
                    <img src="kawadir-logo.png" alt="Kawadir" class="w-100 h-100 object-fit-cover">
                </div>
                <div class="d-flex flex-column justify-content-center">
                    <span
                        style="font-size: 2rem; font-weight: 800; color: #111; letter-spacing: 0.5px; line-height: 1;">Kawadir</span>
                    <span
                        style="font-size: 0.85rem; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 6px;">HR
                        Management</span>
                </div>
            </div>

            <div class="form-content mt-4 px-lg-3">
                <div class="text-center mb-5">
                    <h3 class="fw-normal text-dark mb-2">Login to your account</h3>
                    <p class="text-muted small">Access your HR dashboard</p>
                </div>

                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">

                    <div class="mb-3">
                        <label class="form-label text-secondary small fw-medium ms-3 mb-2">Email Address</label>
                        <input type="email" class="form-control rounded-pill custom-input px-4 py-3 border-0"
                            formControlName="email" placeholder="example@company.com"
                            [class.is-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                        <div class="invalid-feedback ms-3 mt-1">
                            <span *ngIf="loginForm.get('email')?.errors?.['required']">
                                <i class="bi bi-exclamation-circle me-1"></i>Email is required
                            </span>
                            <span *ngIf="loginForm.get('email')?.errors?.['email']">
                                <i class="bi bi-exclamation-circle me-1"></i>Please enter a valid email address
                            </span>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label text-secondary small fw-medium ms-3 mb-2">Password</label>
                        <div class="position-relative">
                            <input [type]="isPasswordVisible ? 'text' : 'password'"
                                class="form-control rounded-pill custom-input px-4 py-3 border-0 pe-5"
                                formControlName="password" placeholder="******************"
                                [class.is-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">

                            <button
                                class="btn btn-link text-muted position-absolute end-0 top-50 translate-middle-y me-2 text-decoration-none shadow-none"
                                type="button" (click)="togglePasswordVisibility()" tabindex="-1" style="z-index: 5;">
                                <i class="bi fs-5" [ngClass]="isPasswordVisible ? 'bi-eye-slash' : 'bi-eye'"></i>
                            </button>
                        </div>
                        <div class="invalid-feedback ms-3 mt-1">
                            <span *ngIf="loginForm.get('password')?.errors?.['required']">
                                <i class="bi bi-exclamation-circle me-1"></i>Password is required
                            </span>
                            <span *ngIf="loginForm.get('password')?.errors?.['minlength']">
                                <i class="bi bi-exclamation-circle me-1"></i>Password must be at least 6 characters
                            </span>
                        </div>
                    </div>

                    <button type="submit"
                        class="btn btn-warning w-100 rounded-pill py-3 fw-medium shadow-sm submit-btn text-dark mb-4"
                        [disabled]="isLoading">
                        @if (isLoading) {
                        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        }
                        Login
                    </button>
                </form>
            </div>
        </div>

        <!-- Right Side: Image -->
        <div class="login-image-section p-3 d-none d-lg-block">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Team working" class="h-100 w-100 object-fit-cover rounded-4 shadow-sm"
                style="border-radius: 1.5rem !important;">
        </div>

    </div>
</div>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\auth\login\login.component.ts


```ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { getFriendlyErrorMessage } from '../../../core/utils/error-handler.util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoading = false;
  isPasswordVisible = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rememberMe: new FormControl(false),
  });

  togglePasswordVisibility() {
    // Ø¥Ø¸Ù‡Ø§Ø±/Ø¥Ø®ÙØ§Ø¡ ÙƒÙ„Ù…Ø© Ø§Ù„Ø³Ø±
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    // ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const credentials = {
      // Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¯Ø®ÙˆÙ„
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire(
          'Login Failed',
          getFriendlyErrorMessage(
            err,
            'Incorrect email or password. Please try again.',
          ),
          'error',
        );
      },
    });
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\auth\register\register.component.css


```css


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\auth\register\register.component.html


```html

<div class="page-container p-4">
    <!-- Page Header -->
    <div class="mb-5 text-center">
        <h2 class="fw-bold text-dark mb-2">Register New User</h2>
        <p class="text-muted mb-0 mx-auto" style="max-width: 500px;">Create secure system credentials and assign appropriate roles for new employees.</p>
    </div>

    <div class="row justify-content-center">
        <!-- Form Column -->
        <div class="col-12 col-lg-10 col-xl-9 col-xxl-8">
            <div class="card shadow border-0 rounded-4 overflow-hidden">
                <div class="card-body p-4 p-md-5">
                    <div class="d-flex align-items-center mb-4 pb-3 border-bottom">
                        <div class="bg-primary bg-opacity-10 rounded-circle p-3 me-3 text-primary">
                            <i class="bi bi-person-plus fs-3"></i>
                        </div>
                        <div>
                            <h5 class="fw-bold text-dark mb-1">Account Details</h5>
                            <p class="text-muted small mb-0">Please fill in the required login information</p>
                        </div>
                    </div>
                    
                    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                        
                        <div class="row g-4">
                            <div class="col-md-6">
                                <label class="form-label fw-semibold text-secondary small">Username <span class="text-danger">*</span></label>
                                <div class="input-group input-group-lg shadow-sm">
                                    <span class="input-group-text bg-light border-end-0 text-muted px-4"><i class="bi bi-person"></i></span>
                                    <input type="text" class="form-control bg-light border-start-0 fs-6" formControlName="username" placeholder="e.g. johndoe">
                                </div>
                            </div>
    
                            <div class="col-md-6">
                                <label class="form-label fw-semibold text-secondary small">Email Address <span class="text-danger">*</span></label>
                                <div class="input-group input-group-lg shadow-sm">
                                    <span class="input-group-text bg-light border-end-0 text-muted px-4"><i class="bi bi-envelope"></i></span>
                                    <input type="email" class="form-control bg-light border-start-0 fs-6" formControlName="email" placeholder="john@company.com">
                                </div>
                            </div>
    
                            <div class="col-md-6">
                                <label class="form-label fw-semibold text-secondary small">Password <span class="text-danger">*</span></label>
                                <div class="input-group input-group-lg shadow-sm">
                                    <span class="input-group-text bg-light border-end-0 text-muted px-4"><i class="bi bi-key"></i></span>
                                    <input type="password" class="form-control bg-light border-start-0 fs-6" formControlName="password" placeholder="Min. 6 characters">
                                </div>
                            </div>
    
                            <div class="col-md-6">
                                <label class="form-label fw-semibold text-secondary small">System Role <span class="text-danger">*</span></label>
                                <div class="input-group input-group-lg shadow-sm">
                                    <span class="input-group-text bg-light border-end-0 text-muted px-4"><i class="bi bi-shield-lock"></i></span>
                                    <select class="form-select bg-light border-start-0 fs-6" formControlName="role">
                                        <option value="" disabled selected>Select Role...</option>
                                        @for (role of roles; track role) {
                                            <option [value]="role">{{ role }}</option>
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="mt-5 pt-4 border-top d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary btn-lg px-5 fw-semibold rounded-pill shadow" [disabled]="registerForm.invalid || isLoading">
                                @if (isLoading) {
                                    <span class="spinner-border spinner-border-sm me-2"></span> Creating Account...
                                } @else {
                                    <i class="bi bi-check2-circle me-2"></i> Register User
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\auth\register\register.component.ts


```ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../../core/utils/error-handler.util';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl('', Validators.required),
  });

  roles = ['Employee', 'Admin', 'HR'];

  onSubmit() {
    // Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨ Ø¬Ø¯ÙŠØ¯
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    const payload = this.registerForm.getRawValue();
    // Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ØªØ³Ø¬ÙŠÙ„

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        const userIdFromRes = res?.data?.id || res?.id || res?.userId;
        const userEmail = this.registerForm.get('email')?.value;

        Swal.fire({
          icon: 'success',
          title: 'ØªÙ… Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø­Ø³Ø§Ø¨ Ø¨Ù†Ø¬Ø§Ø­',
          text: 'Ù‡Ù„ ØªØ±ÙŠØ¯ Ø¥ÙƒÙ…Ø§Ù„ Ù…Ù„Ù Ø§Ù„Ù…ÙˆØ¸Ù Ø§Ù„Ø¢Ù†ØŸ',
          showCancelButton: true,
          confirmButtonText: 'Ù†Ø¹Ù…ØŒ Ø£ÙƒÙ…Ù„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª',
          cancelButtonText: 'Ù„Ø§Ø­Ù‚Ø§Ù‹',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/employee-form'], {
              state: {
                userId: userIdFromRes,
                email: userEmail,
              },
            });
          } else {
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire(
          'Ø®Ø·Ø£',
          getFriendlyErrorMessage(
            err,
            'ÙØ´Ù„ Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø­Ø³Ø§Ø¨. ÙŠØ±Ø¬Ù‰ Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.',
          ),
          'error',
        );
      },
    });
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\dashboard\dashboard.component.css


```css

.stat-card {
  border-radius: 15px;
  color: white;
  padding: 25px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: none;
}

.stat-card h3 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 5px;
}
.stat-card p {
  margin: 0;
  opacity: 0.8;
  font-size: 14px;
}
.stat-card .icon {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 40px;
  opacity: 0.2;
}

.pink {
  background: linear-gradient(135deg, #ff5e7e 0%, #ff99ac 100%);
}
.orange {
  background: linear-gradient(135deg, #f39c12 0%, #f1c40f 100%);
}
.blue {
  background: linear-gradient(135deg, #3498db 0%, #5dade2 100%);
}
.purple {
  background: linear-gradient(135deg, #9b59b6 0%, #af7ac5 100%);
}

.attendance-placeholder-chart {
  height: 300px;
  background-color: #fcfcfc;
  border: 2px dashed #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\dashboard\dashboard.component.html


```html

<div class="dashboard-container">



    @if (isAdmin) {
    <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-primary d-flex align-items-center gap-2 shadow-sm px-4" (click)="downloadSystemReport()">
            <i class="bi bi-file-earmark-arrow-down"></i>
            {{ 'Download Report' | t }}
        </button>
    </div>

    <div class="row g-4 mb-4">
        <div class="col-md-3">
            <div class="stat-card pink h-100">
                <div class="card-body">
                    <h3>{{ totalEmployees }}</h3>
                    <p>{{ 'Total Employees' | t }}</p>
                    <i class="bi bi-people-fill icon"></i>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card orange h-100">
                <div class="card-body">
                    <h3>{{ pendingLeaves }}</h3>
                    <p>{{ 'Pending Leaves' | t }}</p>
                    <i class="bi bi-calendar-x icon"></i>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card blue h-100">
                <div class="card-body">
                    <h3>{{ departmentsCount }}</h3>
                    <p>{{ 'Departments' | t }}</p>
                    <i class="bi bi-building icon"></i>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card purple h-100">
                <div class="card-body">
                    <h3>{{ totalSalaries | number }} JD</h3>
                    <p>{{ 'Salaries' | t }}</p>
                    <i class="bi bi-cash-stack icon"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-4">
        <div class="col-lg-8">
            <div class="chart-card card shadow-sm border-0 rounded-4">
                <div class="card-header bg-white p-3 border-0">
                    <h5 class="fw-bold m-0 text-dark">{{ 'Attendance' | t }}</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="small text-muted text-uppercase bg-light">
                                <tr>
                                    <th class="ps-4">{{ 'Employee' | t }}</th>
                                    <th>{{ 'Date' | t }}</th>
                                    <th>{{ 'Clock In' | t }}</th>
                                    <th>{{ 'Clock Out' | t }}</th>
                                </tr>
                            </thead>
                            <tbody class="small">
                                @for (att of recentAttendances; track att.id) {
                                <tr>
                                    <td class="fw-bold ps-4">{{ att.employeeName || 'Emp #' + att.employeeId }}</td>
                                    <td>{{ att.date | date:'shortDate' }}</td>
                                    <td class="text-success"><i class="bi bi-box-arrow-in-right me-1"></i>{{ att.clockIn || '--:--' }}</td>
                                    <td class="text-danger"><i class="bi bi-box-arrow-right me-1"></i>{{ (att.clockOut && att.clockOut !== '00:00:00') ? att.clockOut : '--:--' }}</td>
                                </tr>
                                } @empty {
                                <tr>
                                    <td colspan="4" class="text-center py-4 text-muted">
                                        <i class="bi bi-calendar-x fs-3 d-block mb-2 text-light-gray"></i>
                                        {{ 'No Data' | t }}
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="chart-card card shadow-sm border-0 rounded-4">
                <div class="card-header bg-white p-3 border-0">
                    <h5 class="fw-bold m-0 text-dark">{{ 'Leave Distribution' | t }}</h5>
                </div>
                <div class="card-body">
                    <div style="height: 250px; position: relative;" class="d-flex justify-content-center align-items-center">
                        <canvas id="leaveTypeChart"></canvas>
                        
                        <div *ngIf="annualLeavePercent === 0 && sickLeavePercent === 0 && emergencyLeavePercent === 0 && unpaidLeavePercent === 0" class="position-absolute text-center text-muted small">
                            {{ 'No Data' | t }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-4 mt-1">
        <div class="col-md-8">
            <div class="chart-card card shadow-sm border-0 rounded-4 h-100">
                <div class="card-header bg-white p-3 border-0 pb-0 d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold m-0 text-dark">{{ 'Attendance Rate' | t }}</h5>
                    <span class="badge bg-light text-success border border-success border-opacity-25 px-2 py-1"><i class="bi bi-person-check-fill me-1"></i>{{ attendanceRate }}% {{ 'Overall' | t }}</span>
                </div>
                <div class="card-body p-3 pt-4">
                    <div style="height: 250px; position: relative; width: 100%;">
                        <canvas id="attendanceRateChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="activity-card bg-white rounded-4 shadow-sm p-4 h-100">
                <h6 class="fw-bold mb-3 text-dark">{{ 'Recent Leave Requests' | t }}</h6>
                <div class="d-flex flex-column gap-2">
                    @for (leave of recentLeaves; track leave.id) {
                    <div class="d-flex align-items-center justify-content-between py-2 px-3 rounded-3" style="background: #f8f9fa;">
                        <div class="d-flex align-items-center gap-2">
                            <div class="rounded-circle bg-primary bg-opacity-10 text-primary fw-bold d-flex align-items-center justify-content-center flex-shrink-0" style="width: 32px; height: 32px; font-size: 12px;">
                                {{ (leave.employeeName || 'E').charAt(0).toUpperCase() }}
                            </div>
                            <span class="fw-semibold text-dark small text-truncate" style="max-width: 110px;">{{ leave.employeeName || 'Emp #' + leave.employeeId }}</span>
                        </div>
                        <span class="status-badge px-2 py-1" style="font-size: 11px;"
                            [ngClass]="{
                                'status-approved': leave.status === 'Approved',
                                'status-pending': leave.status === 'Pending',
                                'status-rejected': leave.status === 'Rejected'
                            }">
                            <i class="bi me-1"
                                [ngClass]="{
                                    'bi-check-circle-fill': leave.status === 'Approved',
                                    'bi-hourglass-split': leave.status === 'Pending',
                                    'bi-x-circle-fill': leave.status === 'Rejected'
                                }"></i>{{ leave.status | t }}
                        </span>
                    </div>
                    } @empty {
                    <div class="text-center text-muted py-4">
                        <i class="bi bi-calendar-x fs-3 d-block mb-2"></i>
                        {{ 'No Data' | t }}
                    </div>
                    }
                </div>
            </div>
        </div>
    </div>


    } @else {
    <div class="row g-4 mb-4">
        <div class="col-md-3">
            <div class="stat-card blue h-100">
                <div class="card-body">
                    <h3>{{ employeeAnnualLeaveBalance }}</h3> <p>{{ 'Annual Leave Balance' | t }}</p>
                    <i class="bi bi-airplane-fill icon"></i>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="stat-card orange h-100">
                <div class="card-body">
                    <h3>{{ employeePendingLeaves }}</h3> <p>{{ 'My Pending Leaves' | t }}</p>
                    <i class="bi bi-hourglass-split icon"></i>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="stat-card pink h-100">
                <div class="card-body">
                    <h3>{{ employeeHoursWorked }} <span class="fs-6 fw-normal">hrs</span></h3>
                    <p>{{ 'Total Hours' | t }}</p>
                    <i class="bi bi-clock-history icon"></i>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="stat-card purple h-100">
                <div class="card-body">
                    <h3>{{ employeeNextPayday }}</h3>
                    <p>{{ 'Next Payday' | t }}</p>
                    <i class="bi bi-calendar-check icon"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-4">
        <div class="col-12">
            <div class="chart-card card shadow-sm border-0 rounded-4 h-100">
                <div class="card-header bg-white p-3 border-0">
                    <h5 class="fw-bold m-0 text-dark">{{ 'My Attendance' | t }}</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="small text-muted text-uppercase bg-light">
                                <tr>
                                    <th class="ps-4">{{ 'Date' | t }}</th>
                                    <th>{{ 'Clock In' | t }}</th>
                                    <th>{{ 'Clock Out' | t }}</th>
                                </tr>
                            </thead>
                            <tbody class="small">
                                @for (att of myRecentAttendances; track att.id) {
                                <tr>
                                    <td class="ps-4 fw-bold">{{ att.date | date:'shortDate' }}</td>
                                    <td class="text-success"><i class="bi bi-box-arrow-in-right me-1"></i>{{ att.clockIn || '--:--' }}</td>
                                    <td class="text-danger"><i class="bi bi-box-arrow-right me-1"></i>{{ (att.clockOut && att.clockOut !== '00:00:00') ? att.clockOut : '--:--' }}</td>
                                </tr>
                                } @empty {
                                <tr>
                                    <td colspan="3" class="text-center py-4 text-muted">
                                        <i class="bi bi-calendar-x fs-3 d-block mb-2 text-light-gray"></i>
                                        {{ 'No Data' | t }}
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
</div>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\dashboard\dashboard.component.ts


```ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee.service';
import { LeaveService } from '../../core/services/leave.service';
import { DepartmentService } from '../../core/services/department.service';
import { AuthService } from '../../core/services/auth.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { SalaryService } from '../../core/services/salary.service';
import { Chart, registerables } from 'chart.js';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import Swal from 'sweetalert2';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private empService = inject(EmployeeService);
  private leaveService = inject(LeaveService);
  private deptService = inject(DepartmentService);
  private authService = inject(AuthService);
  private attendanceService = inject(AttendanceService);
  private salaryService = inject(SalaryService);

  totalEmployees = 0;
  pendingLeaves = 0;
  departmentsCount = 0;
  totalSalaries = 0;
  recentLeaves: any[] = [];
  recentAttendances: any[] = [];
  myRecentAttendances: any[] = [];
  allAttendances: any[] = [];
  isAdmin: boolean = false;

  annualLeavePercent: number = 0;
  sickLeavePercent: number = 0;
  emergencyLeavePercent: number = 0;
  unpaidLeavePercent: number = 0;
  attendanceRate: number = 0;

  employeeAnnualLeaveBalance: number | string = 14;
  employeePendingLeaves: number = 0;
  employeeHoursWorked: number = 0;
  employeeNextPayday: string = '';

  // ÙŠÙˆÙ… 25 Ù…Ù† ÙƒÙ„ Ø´Ù‡Ø±
  readonly PAYDAY = 25;

  leaveChartInstance: any;

  downloadSystemReport() {
    Swal.fire(
      'Notice',
      'Report generation is not fully implemented yet.',
      'info',
    );
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();

    if (this.isAdmin) {
      this.loadAdminStats();
    } else {
      this.loadEmployeeStats();
    }
  }

  loadAdminStats() {
    // ØªØ­Ù…ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø£Ø¯Ù…Ù†
    this.empService.getEmployees().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        this.totalEmployees = extracted.length;
        this.calculateAttendanceRate();
      },
      error: (err) => console.error('Error fetching employees:', err),
    });

    this.leaveService.getAllLeaves().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        this.pendingLeaves = extracted.filter(
          // Ø§Ù„Ù€ backend Ø¨ÙŠØ±Ø¬Ø¹ string Ù…Ø´ Ø±Ù‚Ù…
          (l: any) => l.status === 'Pending',
        ).length;

        extracted.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        );
        this.recentLeaves = extracted.slice(0, 5);

        const totalLeaves = extracted.length;
        let annual = 0,
          sick = 0,
          emergency = 0,
          unpaid = 0;

        if (totalLeaves > 0) {
          // ÙƒÙ„Ù‡Ø§ strings Ù…Ù† Ø§Ù„Ù€ backend
          annual = extracted.filter(
            (l: any) => l.leaveType === 'Annual',
          ).length;
          sick = extracted.filter((l: any) => l.leaveType === 'Sick').length;
          emergency = extracted.filter(
            (l: any) => l.leaveType === 'Emergency',
          ).length;
          unpaid = extracted.filter(
            (l: any) => l.leaveType === 'Unpaid',
          ).length;

          this.annualLeavePercent = Math.round((annual / totalLeaves) * 100);
          this.sickLeavePercent = Math.round((sick / totalLeaves) * 100);
          this.emergencyLeavePercent = Math.round(
            (emergency / totalLeaves) * 100,
          );
          this.unpaidLeavePercent = Math.round((unpaid / totalLeaves) * 100);
        } else {
          this.annualLeavePercent = 0;
          this.sickLeavePercent = 0;
          this.emergencyLeavePercent = 0;
          this.unpaidLeavePercent = 0;
        }

        setTimeout(() => {
          this.renderLeaveChart(annual, sick, emergency, unpaid);
        }, 100);
      },
      error: (err) => console.error('Error fetching leaves:', err),
    });

    this.deptService.getDepartments().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        this.departmentsCount = extracted.length;
      },
      error: (err) => console.error('Error fetching departments:', err),
    });

    this.salaryService.getAllSalaries().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        this.totalSalaries = extracted.reduce(
          (sum, current) => sum + (current.netAmount || 0),
          0,
        );
      },
      error: (err) => console.error('Error fetching salaries:', err),
    });

    this.attendanceService.getAllAttendance().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        extracted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.recentAttendances = extracted.slice(0, 5);
        this.allAttendances = extracted;
        this.calculateAttendanceRate();
      },
      error: (err) => console.error('Error fetching attendance overview:', err),
    });
  }

  calculateAttendanceRate() {
    // Ù†Ø­Ø³Ø¨ Ù†Ø³Ø¨Ø© Ø§Ù„Ø­Ø¶ÙˆØ±
    if (this.totalEmployees === 0 || this.allAttendances.length === 0) return;
    const validAtt = this.allAttendances.filter((a) => a.date && a.clockIn);
    const uniqueDays = new Set(validAtt.map((a) => a.date.split('T')[0])).size;
    if (uniqueDays > 0) {
      const totalExpected = uniqueDays * this.totalEmployees;
      this.attendanceRate = Math.round((validAtt.length / totalExpected) * 100);
      if (this.attendanceRate > 100) this.attendanceRate = 100;
    }
  }

  loadNextPayday() {
    // Ù†Ø­Ø³Ø¨ Ù…ÙˆØ¹Ø¯ Ø§Ù„Ø±Ø§ØªØ¨ Ø§Ù„Ù‚Ø§Ø¯Ù…
    this.salaryService.getMySalaries().subscribe({
      next: (salaries: any[]) => {
        if (!salaries || salaries.length === 0) return;

        const sorted = [...salaries].sort((a, b) => {
          if (b.year !== a.year) return b.year - a.year;
          return b.month - a.month;
        });

        const latest = sorted[0];

        const nextPayMonth = latest.month === 12 ? 1 : latest.month + 1;
        const nextPayYear = latest.month === 12 ? latest.year + 1 : latest.year;

        if (latest.effectiveDate) {
          const effDate = new Date(latest.effectiveDate);
          const nextEff = new Date(
            nextPayYear,
            nextPayMonth - 1,
            effDate.getDate(),
          );
          const dayLabel = nextEff.getDate();
          const monthLabel = nextEff.toLocaleString('en-US', {
            month: 'short',
          });
          this.employeeNextPayday = `${monthLabel} ${dayLabel}`;
        } else {
          const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ];
          this.employeeNextPayday = `${monthNames[nextPayMonth - 1]} ${this.PAYDAY}`;
        }
      },
      error: () => {},
    });
  }

  loadEmployeeStats() {
    // ØªØ­Ù…ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…ÙˆØ¸Ù
    console.log('Loading Employee Dashboard...');

    const today = new Date();
    const currentMonth = today.toLocaleString('en-US', { month: 'short' });
    const nextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1,
    ).toLocaleString('en-US', { month: 'short' });

    // Ù‚ÙŠÙ…Ø© Ù…Ø¤Ù‚ØªØ© ØªØ¸Ù‡Ø± ÙÙˆØ±Ø§Ù‹ØŒ ØªØªØ­Ø¯Ø« Ù„Ù…Ø§ ÙŠØ±Ø¬Ø¹ Ø§Ù„Ù€ API
    if (today.getDate() > this.PAYDAY) {
      this.employeeNextPayday = `${nextMonth} ${this.PAYDAY}`;
    } else {
      this.employeeNextPayday = `${currentMonth} ${this.PAYDAY}`;
    }

    // Ù†Ø¬ÙŠØ¨ Ø§Ù„ØªØ§Ø±ÙŠØ® Ø§Ù„Ø¯Ù‚ÙŠÙ‚ Ù…Ù† Ø¢Ø®Ø± Ø±Ø§ØªØ¨
    this.loadNextPayday();

    this.leaveService.getMyLeaves().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        // backend ÙŠØ±Ø¬Ø¹ strings Ù…Ø´ Ø£Ø±Ù‚Ø§Ù…
        this.employeePendingLeaves = extracted.filter(
          (l: any) => l.status === 'Pending',
        ).length;

        const approvedAnnualLeavesDays = extracted
          .filter(
            (l: any) => l.status === 'Approved' && l.leaveType === 'Annual',
          )
          .reduce((acc: number, l: any) => acc + (l.totalDays || 0), 0);

        this.employeeAnnualLeaveBalance = 14 - approvedAnnualLeavesDays;
      },
      error: (err) => console.error('Error fetching my leaves:', err),
    });

    this.attendanceService.getMyAttendance().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;

        const currentMonthNum = today.getMonth();
        const currentYear = today.getFullYear();

        let totalHours = 0;
        extracted.forEach((att: any) => {
          if (
            att.date &&
            att.clockIn &&
            att.clockOut &&
            att.clockOut !== '00:00:00'
          ) {
            const baseDate = att.date.split('T')[0];

            const clockInDate = new Date(`${baseDate}T${att.clockIn}`);
            const clockOutDate = new Date(`${baseDate}T${att.clockOut}`);

            if (
              clockInDate.getMonth() === currentMonthNum &&
              clockInDate.getFullYear() === currentYear
            ) {
              const diffMs = clockOutDate.getTime() - clockInDate.getTime();
              const diffHrs = diffMs / (1000 * 60 * 60);
              if (diffHrs > 0) totalHours += diffHrs;
            }
          }
        });

        extracted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.myRecentAttendances = extracted.slice(0, 5);

        this.employeeHoursWorked = Math.round(totalHours);
      },
      error: (err) => console.error('Error fetching my attendance:', err),
    });
  }

  renderLeaveChart(
    annual: number,
    sick: number,
    emergency: number,
    unpaid: number,
  ) {
    // Ø±Ø³Ù… ØªØ´Ø§Ø±Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª
    const ctx = document.getElementById('leaveTypeChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.leaveChartInstance) {
      this.leaveChartInstance.destroy();
    }

    // Ù„Ùˆ Ù…Ø§ÙÙŠ Ø¯Ø§ØªØ§ Ù†Ø¹Ø±Ø¶ Ø¯Ø§Ø¦Ø±Ø© ÙØ§Ø¶ÙŠØ©
    if (annual === 0 && sick === 0 && emergency === 0 && unpaid === 0) {
      this.leaveChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['No Data'],
          datasets: [
            {
              data: [1],
              backgroundColor: ['#e9ecef'],
              borderWidth: 0,
              hoverOffset: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
          cutout: '75%',
        },
      });
      return;
    }

    this.leaveChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Annual', 'Sick', 'Emergency', 'Unpaid'],
        datasets: [
          {
            data: [annual, sick, emergency, unpaid],
            backgroundColor: ['#0d6efd', '#dc3545', '#ffc107', '#6c757d'],
            borderWidth: 0,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
            },
          },
        },
        cutout: '75%',
      },
    });
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\departments\departments.component.css


```css


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\departments\departments.component.html


```html

<div class="page-container p-4">

    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
            <h3 class="fw-bold text-dark mb-1">
                <i class="bi bi-diagram-3-fill me-2 text-primary"></i>{{ 'Departments' | t }}
            </h3>
            <p class="text-muted small mb-0">{{ 'Manage organizational departments and view their employee structures' | t }}</p>
        </div>
        <button class="btn btn-primary shadow-sm text-nowrap px-4 py-2 rounded-3 fw-semibold" (click)="openAddModal()">
            <i class="bi bi-plus-lg me-1"></i> {{ 'Add Department' | t }}
        </button>
    </div>

    @if (isLoading) {
    <div class="text-center my-5 py-5">
        <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;"></div>
        <p class="text-muted fw-medium fs-5">Fetching departments data...</p>
    </div>
    } @else {
    <div class="row g-4">
        @for (dept of departmentsList; track dept.id) {
        <div class="col-md-6 col-xl-4 col-xxl-3">
            <div class="card border-0 shadow-sm h-100 rounded-4 overflow-hidden position-relative transition-hover" style="transition: transform 0.2s, box-shadow 0.2s;">
                <div class="card-header bg-white border-0 pt-4 pb-0 px-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="bg-primary bg-opacity-10 text-primary p-2 rounded-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                            <i class="bi bi-buildings fs-4"></i>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-light btn-sm rounded-circle shadow-none text-muted" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 32px; height: 32px;">
                                <i class="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3">
                                <li><a class="dropdown-item py-2 fw-medium text-dark" href="javascript:void(0)" (click)="openEditModal(dept)"><i class="bi bi-pencil-square text-primary me-2"></i>{{ 'Edit' | t }}</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item py-2 fw-medium text-danger" href="javascript:void(0)" (click)="deleteDepartment(dept.id)"><i class="bi bi-trash3 me-2"></i>{{ 'Delete' | t }}</a></li>
                            </ul>
                        </div>
                    </div>
                    <h5 class="card-title fw-bold text-dark mb-1 text-truncate" [title]="dept.name">{{ dept.name }}</h5>
                    <p class="text-muted small mb-0 fw-medium">{{ 'ID' | t }}: #{{ dept.id }}</p>
                </div>
                <div class="card-body px-4 pb-4 pt-3 mt-1">
                    <div class="d-flex justify-content-between align-items-center bg-light rounded-3 p-3">
                        <div class="text-center flex-fill">
                            <h5 class="fw-bold text-primary mb-0">{{ getDeptStat(dept.id, 'employees') }}</h5>
                            <small class="text-muted fw-semibold" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">{{ 'Employees' | t }}</small>
                        </div>
                        <div style="width: 1px; height: 35px; background-color: #dee2e6;"></div>
                        <div class="text-center flex-fill">
                            <h5 class="fw-bold text-dark mb-0">{{ getDeptStat(dept.id, 'positions') }}</h5>
                            <small class="text-muted fw-semibold" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">{{ 'Positions' | t }}</small>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-white border-top-0 px-4 pb-4 pt-0">
                    <button class="btn btn-outline-primary w-100 rounded-3 fw-semibold shadow-sm py-2 d-flex align-items-center justify-content-center" (click)="viewDetails(dept)">
                        <i class="bi bi-eye me-2 fs-5"></i> View Details & Staff
                    </button>
                </div>
            </div>
        </div>
        } @empty {
        <div class="col-12 text-center my-5 py-5">
            <div class="bg-light rounded-circle d-inline-flex justify-content-center align-items-center mb-4" style="width: 100px; height: 100px;">
                <i class="bi bi-diagram-2 text-secondary" style="font-size: 40px;"></i>
            </div>
            <h4 class="fw-bold text-dark mb-2">{{ 'No Data' | t }}</h4>
            <p class="text-muted">There are no departments created in the system yet.</p>
            <button class="btn btn-primary mt-2 px-4 rounded-3" (click)="openAddModal()"><i class="bi bi-plus-lg me-1"></i> Add Your First Department</button>
        </div>
        }
    </div>
    }
</div>

<div class="modal fade" id="deptDetailsModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            <div class="modal-header border-bottom-0 bg-white pt-4 pb-2 px-4">
                <h4 class="modal-title fw-bold text-dark d-flex align-items-center">
                    <div class="bg-primary bg-opacity-10 text-primary p-2 rounded-3 me-3 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                        <i class="bi bi-building fs-5"></i>
                    </div>
                    {{ selectedDepartment?.name }} Department
                </h4>
                <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0 bg-light">
                @if (selectedDepartment) {
                <div class="row g-0">
                    <!-- Left Column: Overview Stats -->
                    <div class="col-lg-4 border-end bg-white">
                        <div class="p-4 h-100">
                            <h6 class="fw-bold text-dark mb-4 text-uppercase" style="letter-spacing: 0.5px; font-size: 13px;">Department Overview</h6>
                            
                            <div class="d-flex align-items-center mb-4 p-3 bg-light rounded-4 border">
                                <div class="bg-primary text-white rounded-3 d-flex justify-content-center align-items-center me-3" style="width: 48px; height: 48px;">
                                    <i class="bi bi-people-fill fs-5"></i>
                                </div>
                                <div>
                                    <p class="text-muted small mb-0 fw-semibold">Total Employees</p>
                                    <h3 class="fw-bold text-primary mb-0">{{ selectedDepartment.stats?.totalEmployees || 0 }}</h3>
                                </div>
                            </div>

                            <div class="d-flex align-items-center mb-4 p-3 bg-light rounded-4 border">
                                <div class="bg-secondary text-white rounded-3 d-flex justify-content-center align-items-center me-3" style="width: 48px; height: 48px;">
                                    <i class="bi bi-diagram-3-fill fs-5"></i>
                                </div>
                                <div>
                                    <p class="text-muted small mb-0 fw-semibold">Total Positions</p>
                                    <h3 class="fw-bold text-secondary mb-0">{{ selectedDepartment.totalPositions || 0 }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Column: Employees Table -->
                    <div class="col-lg-8 bg-light">
                        <div class="p-4 h-100 d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                                <h6 class="fw-bold text-dark mb-0 text-uppercase" style="letter-spacing: 0.5px; font-size: 13px;">Employees Directory</h6>
                                
                                <div class="d-flex gap-2">
                                    <div class="input-group input-group-sm shadow-sm" style="max-width: 200px;">
                                        <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                                        <input type="text" class="form-control border-start-0 ps-0" placeholder="Search by name or ID..." [(ngModel)]="searchEmpQuery" (input)="filterDeptEmployees()">
                                    </div>
                                    <select class="form-select form-select-sm shadow-sm w-auto fw-medium text-secondary" [(ngModel)]="selectedPositionFilter" (change)="filterDeptEmployees()">
                                        <option value="">All Positions</option>
                                        <option *ngFor="let p of uniquePositions" [value]="p">{{ p }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="card border-0 shadow-sm rounded-4 flex-grow-1 overflow-hidden">
                                <div class="table-responsive h-100" style="max-height: 500px;">
                                    <table class="table table-hover align-middle mb-0">
                                        <thead class="bg-light sticky-top" style="z-index: 1;">
                                            <tr>
                                                <th class="py-3 px-4 text-muted small text-uppercase fw-semibold" style="letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef;">ID</th>
                                                <th class="py-3 px-3 text-muted small text-uppercase fw-semibold" style="letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef;">Employee Name</th>
                                                <th class="py-3 px-3 text-muted small text-uppercase fw-semibold" style="letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef;">Position</th>
                                                <th class="py-3 px-4 text-muted small text-uppercase fw-semibold text-center" style="letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef;">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody class="border-top-0">
                                            <tr *ngFor="let emp of filteredDeptEmployees">
                                                <td class="py-3 px-4 fw-bold text-secondary">#{{ emp.id }}</td>
                                                <td class="py-3 px-3 fw-bold text-dark">
                                                    <div class="d-flex align-items-center">
                                                        <div class="avatar-circle bg-primary bg-opacity-10 text-primary fw-bold me-3 rounded-circle d-flex align-items-center justify-content-center" style="width: 35px; height: 35px; font-size: 13px;">
                                                            {{ emp.firstName?.charAt(0) || 'U' }}
                                                        </div>
                                                        {{ emp.firstName }} {{ emp.lastName }}
                                                    </div>
                                                </td>
                                                <td class="py-3 px-3 text-muted fw-medium">{{ emp.positionName || 'N/A' }}</td>
                                                <td class="py-3 px-4 text-center">
                                                    <span class="badge rounded-pill px-3 py-2 fw-semibold" [ngClass]="emp.isActive ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-25' : 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25'">
                                                        {{ emp.isActive ? 'Active' : 'Inactive' }}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr *ngIf="filteredDeptEmployees.length === 0">
                                                <td colspan="4" class="text-center py-5">
                                                    <div class="text-muted d-flex flex-column align-items-center">
                                                        <i class="bi bi-search fs-1 mb-3 text-black-50"></i>
                                                        <span class="fw-medium fs-6">No employees found.</span>
                                                        <small>Try adjusting your search or filter criteria.</small>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
            <div class="modal-footer bg-white border-top pt-3 pb-3 px-4">
                <button type="button" class="btn btn-secondary px-5 py-2 rounded-3 fw-semibold shadow-sm" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="addDeptModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">

            <div
                class="modal-header border-bottom border-success border-4 bg-light">
                <h5 class="modal-title text-success fw-bold">
                    <i class="bi" [class.bi-plus-circle]="!isEditMode" [class.bi-pencil-square]="isEditMode"></i> 
                    {{ isEditMode ? ('Edit' | t) : ('Add Department' | t) }}
                </h5>
                <button type="button" class="btn-close shadow-none"
                    data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form [formGroup]="addForm" (ngSubmit)="saveDepartment()">
                <div class="modal-body p-4">
                    <div class="mb-3">
                        <label
                            class="form-label fw-bold text-secondary">{{ 'Department Name' | t }} <span class="text-danger">*</span></label>
                        <input type="text" class="form-control"
                            formControlName="name"
                            placeholder="e.g., Marketing, Sales..."
                            [class.is-invalid]="addForm.get('name')?.invalid && addForm.get('name')?.touched">
                        @if (addForm.get('name')?.invalid &&
                        addForm.get('name')?.touched) {
                        <div class="invalid-feedback">
                            Department name is required.
                        </div>
                        }
                    </div>
                </div>

                <div class="modal-footer bg-light border-top-0">
                    <button type="button" class="btn btn-light px-4 border"
                        data-bs-dismiss="modal"
                        [disabled]="isSubmitting">{{ 'Cancel' | t }}</button>
                    <button type="submit" class="btn btn-success px-4"
                        [disabled]="addForm.invalid || isSubmitting">
                        @if (isSubmitting) {
                        <span class="spinner-border spinner-border-sm me-2"
                            role="status" aria-hidden="true"></span>Saving...
                        } @else {
                        <i class="bi bi-save me-1"></i> {{ 'Save Changes' | t }}
                        }
                    </button>
                </div>
            </form>

        </div>
    </div>
</div>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\departments\departments.component.ts


```ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { DepartmentService } from '../../core/services/department.service';
import { EmployeeService } from '../../core/services/employee.service';
import { PositionService } from '../../core/services/position.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';

declare var bootstrap: any;

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './departments.component.html',
})
export class DepartmentsComponent implements OnInit {
  private departmentService = inject(DepartmentService);
  private employeeService = inject(EmployeeService);
  private positionService = inject(PositionService);

  allPositions: any[] = []; // lookup: positionId -> title

  departmentsList: any[] = [];
  isLoading: boolean = true;
  isSubmitting: boolean = false;
  isEditMode: boolean = false;
  currentDepartmentId: number | null = null;

  selectedDepartment: any = null;
  private detailsModal: any;
  private addModalInstance: any;

  allEmployees: any[] = [];
  departmentStats: any = {}; // id -> { totalEmployees: 0, positions: { posName: count } }

  deptEmployees: any[] = [];
  filteredDeptEmployees: any[] = [];
  searchEmpQuery: string = '';
  selectedPositionFilter: string = '';
  uniquePositions: string[] = [];

  addForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  ngOnInit() {
    this.loadPositionsThenEmployees();
    this.loadDepartments();
  }

  loadPositionsThenEmployees() {
    // Ø¬Ù„Ø¨ Ø§Ù„Ù€ positions Ø£ÙˆÙ„Ø§Ù‹ Ø«Ù… Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ù„Ø¹Ù…Ù„ join ØµØ­ÙŠØ­
    this.positionService.getPositions().subscribe({
      next: (res: any) => {
        this.allPositions = Array.isArray(res) ? res : res?.data || [];
        this.loadEmployees();
      },
      error: () => this.loadEmployees(), // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ø­ØªÙ‰ Ù„Ùˆ ÙØ´Ù„ Ø¬Ù„Ø¨ Ø§Ù„Ù€ positions
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        const extracted: any[] = Array.isArray(res)
          ? res
          : res?.data?.items || res?.data || [];
        // Ø±Ø¨Ø· Ø§Ø³Ù… Ø§Ù„Ù€ position Ø¨ÙƒÙ„ Ù…ÙˆØ¸Ù
        this.allEmployees = extracted.map((emp) => {
          if (!emp.positionName && emp.positionId) {
            const pos = this.allPositions.find((p) => p.id === emp.positionId);
            return { ...emp, positionName: pos?.title || null };
          }
          return emp;
        });
        this.calculateStats();
      },
    });
  }

  calculateStats() {
    this.departmentStats = {};
    for (const emp of this.allEmployees) {
      const deptId = emp.departmentId;
      if (!deptId) continue;

      if (!this.departmentStats[deptId]) {
        this.departmentStats[deptId] = { totalEmployees: 0, positions: {} };
      }

      this.departmentStats[deptId].totalEmployees++;
      const posName = emp.positionName; // Ù†ØªØ¬Ø§Ù‡Ù„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ø§Ù„Ø°ÙŠÙ† Ù„ÙŠØ³ Ù„Ø¯ÙŠÙ‡Ù… position
      if (!posName) continue; // Ù„Ø§ Ù†ÙØ¯Ø±Ø¬Ù‡Ù… ÙÙŠ Ø§Ù„Ù€ Positions Breakdown
      if (!this.departmentStats[deptId].positions[posName]) {
        this.departmentStats[deptId].positions[posName] = 0;
      }
      this.departmentStats[deptId].positions[posName]++;
    }
  }

  getDeptStat(deptId: number, type: 'employees' | 'positions'): number {
    if (type === 'employees') {
      const stat = this.departmentStats[deptId];
      return stat ? stat.totalEmployees : 0;
    }
    if (type === 'positions') {
      // Ø§Ù„Ø¹Ø¯Ù‘ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ Ù…Ù† Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ù€ positions Ø§Ù„Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ø§Ù„Ù‚Ø³Ù…
      return this.allPositions.filter((p) => p.departmentId === deptId).length;
    }
    return 0;
  }

  loadDepartments() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
    this.isLoading = true;
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data?.items && Array.isArray(res.data.items))
          extracted = res.data.items;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        else if (res?.$values) extracted = res.$values;

        this.departmentsList = extracted;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
        this.isLoading = false;
      },
    });
  }

  viewDetails(dept: any) {
    // ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù‚Ø³Ù…
    this.selectedDepartment = dept;
    const stats = this.departmentStats[dept.id] || { totalEmployees: 0 };
    this.selectedDepartment.stats = stats;
    // Ø§Ù„Ù€ positions Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠØ© Ø§Ù„Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ù‡Ø°Ø§ Ø§Ù„Ù‚Ø³Ù… Ù…Ù† Ø§Ù„Ù€ API
    const deptPositions = this.allPositions.filter(
      (p) => p.departmentId === dept.id,
    );
    this.selectedDepartment.totalPositions = deptPositions.length;

    // Ø¬Ø¯ÙˆÙ„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ø¯Ø§Ø®Ù„ Ø§Ù„Ù€ modal â€” Ù…Ø¹ Ø±Ø¨Ø· Ø§Ù„Ù€ position
    this.deptEmployees = this.allEmployees
      .filter((e) => e.departmentId === dept.id)
      .map((emp) => {
        if (!emp.positionName && emp.positionId) {
          const pos = this.allPositions.find((p) => p.id === emp.positionId);
          return { ...emp, positionName: pos?.title || null };
        }
        return emp;
      });
    this.filteredDeptEmployees = [...this.deptEmployees];
    // Ø¨Ù†Ø§Ø¡ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ù€ positions Ù…Ù† Ø§Ù„Ù€ API Ù…Ø¨Ø§Ø´Ø±Ø©Ù‹ ÙˆÙ„ÙŠØ³ Ù…Ù† Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†
    this.uniquePositions = deptPositions.map((p) => p.title).filter(Boolean);
    this.searchEmpQuery = '';
    this.selectedPositionFilter = '';

    setTimeout(() => {
      const modalElement = document.getElementById('deptDetailsModal');
      if (modalElement) {
        this.detailsModal = new bootstrap.Modal(modalElement);
        this.detailsModal.show();
      }
    }, 0);
  }

  filterDeptEmployees() {
    // ÙÙ„ØªØ±Ø© Ù…ÙˆØ¸ÙÙŠÙ† Ø§Ù„Ù‚Ø³Ù…
    this.filteredDeptEmployees = this.deptEmployees.filter((emp) => {
      let matchesSearch = true;
      if (this.searchEmpQuery) {
        const query = this.searchEmpQuery.toLowerCase();
        const fullName =
          `${emp.firstName || ''} ${emp.lastName || ''}`.toLowerCase();
        const idStr = String(emp.id);
        matchesSearch = fullName.includes(query) || idStr.includes(query);
      }

      let matchesPos = true;
      if (this.selectedPositionFilter) {
        // Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ positionName Ø£Ùˆ Ø¹Ù† Ø·Ø±ÙŠÙ‚ positionId
        const pos = this.allPositions.find(
          (p) => p.title === this.selectedPositionFilter,
        );
        if (pos) {
          matchesPos = emp.positionId === pos.id;
        } else {
          matchesPos = emp.positionName === this.selectedPositionFilter;
        }
      }

      return matchesSearch && matchesPos;
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentDepartmentId = null;
    this.addForm.reset();
    const modalElement = document.getElementById('addDeptModal');
    if (modalElement) {
      this.addModalInstance = new bootstrap.Modal(modalElement);
      this.addModalInstance.show();
    }
  }

  openEditModal(dept: any) {
    this.isEditMode = true;
    this.currentDepartmentId = dept.id;
    this.addForm.patchValue({ name: dept.name });

    const modalElement = document.getElementById('addDeptModal');
    if (modalElement) {
      this.addModalInstance = new bootstrap.Modal(modalElement);
      this.addModalInstance.show();
    }
  }

  saveDepartment() {
    // Ø­ÙØ¸ Ø§Ù„Ù‚Ø³Ù…
    if (this.addForm.invalid) {
      Swal.fire('Warning', 'Please enter a valid department name.', 'warning');
      return;
    }

    this.isSubmitting = true;
    const payload = this.addForm.getRawValue();

    if (this.isEditMode && this.currentDepartmentId) {
      this.departmentService
        .updateDepartment(this.currentDepartmentId, payload)
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            this.addModalInstance.hide();
            Swal.fire('Success', 'Department updated successfully!', 'success');
            this.loadDepartments();
          },
          error: (err) => {
            this.isSubmitting = false;
            Swal.fire(
              'Error',
              getFriendlyErrorMessage(
                err,
                'Failed to update department. Please try again.',
              ),
              'error',
            );
          },
        });
    } else {
      this.departmentService.addDepartment(payload).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.addModalInstance.hide();
          Swal.fire('Success', 'Department added successfully!', 'success');
          this.loadDepartments();
        },
        error: (err) => {
          this.isSubmitting = false;
          Swal.fire(
            'Error',
            getFriendlyErrorMessage(
              err,
              'Failed to add department. Please try again.',
            ),
            'error',
          );
        },
      });
    }
  }

  deleteDepartment(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This department and all associated data might be affected. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.departmentService.deleteDepartment(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Department has been deleted.', 'success');
            this.loadDepartments();
          },
          error: (err) => {
            console.error('Delete error:', err);
            Swal.fire(
              'Error!',
              getFriendlyErrorMessage(
                err,
                'Failed to delete department. It may have employees assigned to it.',
              ),
              'error',
            );
          },
        });
      }
    });
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\employee-form\employee-form.component.css


```css

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PAGE WRAPPER
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.form-page-wrapper {
  min-height: 100vh;
  padding: 2rem 1rem 3rem;
  background: #f5f7fb;
}

.form-container {
  max-width: 820px;
  margin: 0 auto;
  animation: slideUp 0.5s ease-out;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HEADER CARD
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.form-header-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid #e8ecf0;
}

.header-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon-wrap.edit-mode {
  background: linear-gradient(135deg, #f72585, #b5179e);
}

.header-icon-wrap i {
  color: #fff;
  font-size: 1.4rem;
}

.form-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1a1d27;
}

.form-subtitle {
  font-size: 0.85rem;
  color: #8592a3;
  margin-top: 2px;
}

.btn-back {
  padding: 0.45rem 1.2rem;
  border-radius: 30px;
  background: #f0f2f5;
  color: #5a6479;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid #e2e6ea;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-back:hover {
  background: #e2e6ea;
  color: #333;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   LINKED USER BANNER (Add mode â€” after selecting user)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.linked-user-banner {
  background: linear-gradient(135deg, #d1fae5, #ecfdf5);
  border: 1px solid #6ee7b7;
  border-radius: 14px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: slideUp 0.3s ease;
}

.linked-user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #059669;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.linked-user-avatar i {
  color: #fff;
  font-size: 1.2rem;
}

.linked-user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.linked-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #065f46;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.linked-email {
  font-size: 0.95rem;
  font-weight: 600;
  color: #047857;
}

.linked-check i {
  color: #059669;
  font-size: 1.5rem;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   LINKED ACCOUNT CARD (Edit mode)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.linked-account-card {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border: 1px solid #93c5fd;
  border-radius: 14px;
  padding: 1.1rem 1.5rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: slideUp 0.3s ease;
}

.lac-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lac-icon i {
  color: #fff;
  font-size: 1.3rem;
}

.lac-body {
  flex: 1;
}

.lac-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #1e40af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.lac-detail {
  font-size: 0.88rem;
  color: #1e3a8a;
  font-weight: 500;
  line-height: 1.5;
}

.lac-badge {
  background: #1d4ed8;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.9rem;
  border-radius: 30px;
  flex-shrink: 0;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FORM SECTIONS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.form-section {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  margin-bottom: 1.25rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  border: 1px solid #e8ecf0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.85rem;
  border-bottom: 2px solid #f0f2f5;
}

.section-header i {
  font-size: 1rem;
  color: #4361ee;
  background: #eef0fd;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-header span:not(.required-badge) {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1d27;
  flex: 1;
}

.required-badge {
  font-size: 0.7rem;
  font-weight: 700;
  background: #fff0f3;
  color: #e63757;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  border: 1px solid #fecdd3;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FIELD STYLES
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.field-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.45rem;
}

.field-input {
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: #f8fafc;
  padding: 0.65rem 0.9rem;
  font-size: 0.9rem;
  color: #1a202c;
  transition: all 0.2s ease;
  width: 100%;
}

.field-input:focus {
  border-color: #4361ee;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.12);
  outline: none;
}

.field-input.is-invalid {
  border-color: #e63757;
  background: #fff5f7;
}

.field-input.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(230, 55, 87, 0.12);
}

.field-hint {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.78rem;
  color: #8592a3;
  line-height: 1.4;
}

/* Readonly field */
.readonly-field-wrap {
  position: relative;
}

.readonly-icon {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: #8592a3;
  font-size: 0.85rem;
  z-index: 1;
}

.readonly-field {
  padding-left: 2.2rem;
  background: #f0f2f5 !important;
  color: #718096;
  cursor: default;
  border-color: #e2e8f0 !important;
}

.readonly-field:focus {
  box-shadow: none !important;
  border-color: #e2e8f0 !important;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   FORM ACTIONS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.85rem;
  margin-top: 0.5rem;
}

.btn-cancel {
  padding: 0.65rem 1.5rem;
  border-radius: 10px;
  background: #f0f2f5;
  color: #5a6479;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  border: 1.5px solid #e2e6ea;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #e2e6ea;
  color: #333;
}

.btn-submit {
  padding: 0.7rem 2rem;
  border-radius: 10px;
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  border: none;
  transition: all 0.25s;
  box-shadow: 0 4px 14px rgba(67,97,238,0.35);
  min-width: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(67,97,238,0.45);
}

.btn-submit:disabled {
  background: #a0aec0;
  box-shadow: none;
  cursor: not-allowed;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SKELETON LOADING
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.form-body-card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid #e8ecf0;
  margin-bottom: 1.25rem;
}

.skeleton-wrap {
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-line {
  height: 20px;
  background: #e2e8f0;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.skeleton-line.w-40 { width: 40%; }

.skeleton-input {
  height: 42px;
  background: #e2e8f0;
  border-radius: 10px;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ANIMATIONS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   RESPONSIVE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
@media (max-width: 576px) {
  .form-header-card { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .form-actions { flex-direction: column-reverse; }
  .btn-cancel, .btn-submit { width: 100%; justify-content: center; }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DARK MODE OVERRIDES
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
:host-context(body.dark-mode) .form-page-wrapper {
  background: var(--color-bg);
}

:host-context(body.dark-mode) .form-header-card,
:host-context(body.dark-mode) .form-section,
:host-context(body.dark-mode) .form-body-card {
  background: var(--color-surface) !important;
  border-color: var(--color-border) !important;
  color: var(--color-text) !important;
}

:host-context(body.dark-mode) .form-title {
  color: var(--color-text) !important;
}

:host-context(body.dark-mode) .form-subtitle {
  color: var(--color-text-muted) !important;
}

:host-context(body.dark-mode) .section-header {
  border-bottom-color: var(--color-border) !important;
}

:host-context(body.dark-mode) .section-header span:not(.required-badge) {
  color: var(--color-text) !important;
}

:host-context(body.dark-mode) .section-header i {
  background: rgba(67, 97, 238, 0.15) !important;
  color: #7b8ef7 !important;
}

:host-context(body.dark-mode) .field-label {
  color: var(--color-text-sub) !important;
}

:host-context(body.dark-mode) .field-label i {
  color: var(--color-text-muted) !important;
}

:host-context(body.dark-mode) .field-input {
  background: var(--color-input-bg) !important;
  border-color: #444 !important;
  color: var(--color-text) !important;
}

:host-context(body.dark-mode) .field-input::placeholder {
  color: var(--color-text-muted) !important;
}

:host-context(body.dark-mode) .field-input:focus {
  background: var(--color-surface-3) !important;
  border-color: #667eea !important;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2) !important;
}

:host-context(body.dark-mode) .readonly-field {
  background: var(--color-surface-2) !important;
  color: var(--color-text-muted) !important;
  border-color: var(--color-border) !important;
}

:host-context(body.dark-mode) .readonly-icon {
  color: var(--color-text-muted) !important;
}

:host-context(body.dark-mode) .field-hint {
  color: var(--color-text-muted) !important;
}

:host-context(body.dark-mode) .lac-title {
  color: #93c5fd !important;
}

:host-context(body.dark-mode) .lac-detail {
  color: #bfdbfe !important;
}

:host-context(body.dark-mode) .linked-account-card {
  background: linear-gradient(135deg, #1e2a45, #1a2d55) !important;
  border-color: #2d4a7a !important;
}

:host-context(body.dark-mode) .linked-label {
  color: #6ee7b7 !important;
}

:host-context(body.dark-mode) .linked-email {
  color: #a7f3d0 !important;
}

:host-context(body.dark-mode) .linked-user-banner {
  background: linear-gradient(135deg, #1a3a2a, #1e3d2e) !important;
  border-color: #2d6a4f !important;
}

:host-context(body.dark-mode) .btn-back {
  background: var(--color-surface-2) !important;
  color: var(--color-text-sub) !important;
  border-color: var(--color-border) !important;
}

:host-context(body.dark-mode) .btn-back:hover {
  background: var(--color-surface-3) !important;
  color: var(--color-text) !important;
}

:host-context(body.dark-mode) .btn-cancel {
  background: var(--color-surface-2) !important;
  color: var(--color-text-sub) !important;
  border-color: var(--color-border) !important;
}

:host-context(body.dark-mode) .btn-cancel:hover {
  background: var(--color-surface-3) !important;
  color: var(--color-text) !important;
}

:host-context(body.dark-mode) .skeleton-line,
:host-context(body.dark-mode) .skeleton-input {
  background: var(--color-surface-3) !important;
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\employee-form\employee-form.component.html


```html

<div class="form-page-wrapper">
  <div class="form-container">

    <!-- â•â•â• HEADER CARD â•â•â• -->
    <div class="form-header-card">
      <div class="d-flex align-items-center gap-3">
        <div class="header-icon-wrap" [class.edit-mode]="isEditMode">
          <i class="bi" [class.bi-person-plus-fill]="!isEditMode" [class.bi-pencil-square]="isEditMode"></i>
        </div>
        <div>
          <h2 class="form-title mb-0">{{ isEditMode ? 'Edit Employee Profile' : 'Add New Employee' }}</h2>
          <p class="form-subtitle mb-0">
            {{ isEditMode ? 'Update employee information and employment details' : 'Link a registered user to a new
            employee profile' }}
          </p>
        </div>
      </div>
      <a routerLink="/employees" class="btn-back">
        <i class="bi bi-arrow-left me-1"></i> Back
      </a>
    </div>

    <!-- â•â•â• LOADING SKELETON â•â•â• -->
    @if (isLoading && isEditMode) {
    <div class="form-body-card">
      <div class="skeleton-wrap">
        <div class="skeleton-line w-40"></div>
        <div class="row g-3 mt-2">
          <div class="col-6">
            <div class="skeleton-input"></div>
          </div>
          <div class="col-6">
            <div class="skeleton-input"></div>
          </div>
          <div class="col-6">
            <div class="skeleton-input"></div>
          </div>
          <div class="col-6">
            <div class="skeleton-input"></div>
          </div>
        </div>
      </div>
    </div>
    }

    @if (!isLoading || !isEditMode) {
    <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">

      <!-- â•â•â• ADD MODE: Linked User Banner â•â•â• -->
      @if (!isEditMode && employeeForm.get('userId')?.value) {
      <div class="linked-user-banner">
        <div class="linked-user-avatar">
          <i class="bi bi-person-fill"></i>
        </div>
        <div class="linked-user-info">
          <span class="linked-label">Linked Account</span>
          <span class="linked-email">{{ displayEmail }}</span>
        </div>
        <div class="linked-check">
          <i class="bi bi-check-circle-fill"></i>
        </div>
      </div>
      }

      <!-- â•â•â• EDIT MODE: Linked Account Info Card â•â•â• -->
      @if (isEditMode && linkedUserInfo) {
      <div class="linked-account-card">
        <div class="lac-icon">
          <i class="bi bi-person-badge-fill"></i>
        </div>
        <div class="lac-body">
          <div class="lac-title">Linked User Account</div>
          <div class="lac-detail">
            <i class="bi bi-person me-1 text-muted"></i>{{ linkedUserInfo.username }}
          </div>
          <div class="lac-detail">
            <i class="bi bi-envelope me-1 text-muted"></i>{{ linkedUserInfo.email }}
          </div>
        </div>
        <span class="lac-badge">{{ linkedUserInfo.role }}</span>
      </div>
      }

      <!-- â•â•â• SECTION: Link User (Add mode only) â•â•â• -->
      @if (!isEditMode) {
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-link-45deg"></i>
          <span>Link User Account</span>
          <span class="required-badge">Required</span>
        </div>
        <div class="row g-3">
          <div class="col-12">
            <label class="field-label">
              <i class="bi bi-person-lock text-primary"></i>
              Select Registered User <span class="text-danger">*</span>
            </label>
            <select class="form-select field-input" formControlName="userId"
              [class.is-invalid]="employeeForm.get('userId')?.invalid && employeeForm.get('userId')?.touched">
              <option value="" disabled selected>
                {{ unassignedUsers.length === 0 ? 'No unlinked Employee accounts found...' : 'Choose a registered
                user...' }}
              </option>
              @for (user of unassignedUsers; track user.id) {
              <option [value]="user.id">{{ user.username }} â€” {{ user.email }}</option>
              }
            </select>
            <div class="invalid-feedback">Please select a user account to link.</div>
            <small class="field-hint">
              <i class="bi bi-info-circle me-1"></i>
              Only Employee accounts that are not yet linked to a profile are shown.
              Email will be auto-filled from the selected account.
            </small>
          </div>

          <!-- Ø§Ù„Ø§ÙŠÙ…ÙŠÙ„ Ù…Ø³ÙƒØ±ØŒ Ø¨ÙŠØªØ¹Ø¨Ù‰ Ù„Ø­Ø§Ù„Ù‡ -->
          <div class="col-12">
            <label class="field-label">
              <i class="bi bi-envelope text-primary"></i>
              Email Address
            </label>
            <div class="readonly-field-wrap">
              <i class="bi bi-envelope-fill readonly-icon"></i>
              <input type="email" class="form-control field-input readonly-field" formControlName="email"
                placeholder="Auto-filled when you select a user above" readonly>
            </div>
            <small class="field-hint">
              <i class="bi bi-magic me-1"></i>
              This field is auto-filled when you select a user from the dropdown above.
            </small>
          </div>
        </div>
      </div>
      }

      <!-- â•â•â• SECTION: Personal Information â•â•â• -->
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-person-vcard"></i>
          <span>Personal Information</span>
        </div>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="field-label">
              <i class="bi bi-person text-primary"></i>
              First Name <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control field-input" formControlName="firstName" placeholder="e.g. Mohammad"
              [class.is-invalid]="employeeForm.get('firstName')?.invalid && employeeForm.get('firstName')?.touched">
            <div class="invalid-feedback">First name is required.</div>
          </div>
          <div class="col-md-6">
            <label class="field-label">
              <i class="bi bi-person text-primary"></i>
              Last Name <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control field-input" formControlName="lastName" placeholder="e.g. Al-Ahmad"
              [class.is-invalid]="employeeForm.get('lastName')?.invalid && employeeForm.get('lastName')?.touched">
            <div class="invalid-feedback">Last name is required.</div>
          </div>
        </div>
      </div>

      <!-- â•â•â• SECTION: Contact Details â•â•â• -->
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-telephone-fill"></i>
          <span>Contact Details</span>
        </div>
        <div class="row g-3">
          <!-- Ø§Ù„Ø§ÙŠÙ…ÙŠÙ„ Ø¨Ø³ ÙŠÙ†Ø¹Ø±Ø¶ -->
          @if (isEditMode) {
          <div class="col-md-6">
            <label class="field-label">
              <i class="bi bi-envelope text-primary"></i>
              Email Address
            </label>
            <div class="readonly-field-wrap">
              <i class="bi bi-envelope-fill readonly-icon"></i>
              <input type="email" class="form-control field-input readonly-field" formControlName="email" readonly>
            </div>
            <small class="field-hint">
              <i class="bi bi-lock-fill me-1"></i>Email is linked to the user account and cannot be changed here.
            </small>
          </div>
          }
          <div [class]="isEditMode ? 'col-md-6' : 'col-12'">
            <label class="field-label">
              <i class="bi bi-telephone text-primary"></i>
              Phone Number <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control field-input" formControlName="phoneNumber" placeholder="0791234567"
              maxlength="10" inputmode="numeric"
              [class.is-invalid]="employeeForm.get('phoneNumber')?.invalid && employeeForm.get('phoneNumber')?.touched">
            @if (employeeForm.get('phoneNumber')?.touched) {
            @if (employeeForm.get('phoneNumber')?.errors?.['required']) {
            <div class="invalid-feedback d-block">
              <i class="bi bi-exclamation-circle me-1"></i>Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ Ù…Ø·Ù„ÙˆØ¨.
            </div>
            } @else if (employeeForm.get('phoneNumber')?.errors?.['pattern']) {
            <div class="invalid-feedback d-block">
              <i class="bi bi-exclamation-triangle me-1"></i>
              Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ ÙŠØ¬Ø¨ Ø£Ù† ÙŠØªÙƒÙˆÙ† Ù…Ù† 10 Ø£Ø±Ù‚Ø§Ù… ÙÙ‚Ø· Ø¨Ø¯ÙˆÙ† Ù…Ø³Ø§ÙØ§Øª Ø£Ùˆ Ø±Ù…ÙˆØ².
            </div>
            }
            }
            <small class="field-hint">
              <i class="bi bi-info-circle me-1"></i>
              Ø£Ø¯Ø®Ù„ 10 Ø£Ø±Ù‚Ø§Ù… ÙÙ‚Ø· â€” Ù…Ø«Ø§Ù„: 0791234567
            </small>
          </div>
        </div>
      </div>

      <!-- â•â•â• SECTION: Employment Information â•â•â• -->
      <div class="form-section">
        <div class="section-header">
          <i class="bi bi-briefcase-fill"></i>
          <span>Employment Details</span>
        </div>
        <div class="row g-3">
          <div class="col-md-4">
            <label class="field-label">
              <i class="bi bi-calendar-date text-primary"></i>
              Hire Date <span class="text-danger">*</span>
            </label>
            <input type="date" class="form-control field-input" formControlName="hireDate"
              [class.is-invalid]="employeeForm.get('hireDate')?.invalid && employeeForm.get('hireDate')?.touched">
            <div class="invalid-feedback">Hire date is required.</div>
          </div>
          <div class="col-md-4">
            <label class="field-label">
              <i class="bi bi-building text-primary"></i>
              Department <span class="text-danger">*</span>
            </label>
            <select class="form-select field-input" formControlName="departmentId"
              [class.is-invalid]="employeeForm.get('departmentId')?.invalid && employeeForm.get('departmentId')?.touched">
              <option value="" disabled selected>Select department...</option>
              @for (dept of departments; track dept.id) {
              <option [value]="dept.id">{{ dept.name }}</option>
              }
            </select>
            <div class="invalid-feedback">Please select a department.</div>
          </div>
          <div class="col-md-4">
            <label class="field-label">
              <i class="bi bi-person-badge text-primary"></i>
              Job Position <span class="text-danger">*</span>
            </label>
            <select class="form-select field-input" formControlName="positionId"
              [class.is-invalid]="employeeForm.get('positionId')?.invalid && employeeForm.get('positionId')?.touched">
              <option value="" disabled selected>
                {{ departments.length === 0 ? 'Select a department first...' : positions.length === 0 ? 'Select
                department first...' : 'Select position...' }}
              </option>
              @for (pos of positions; track pos.id) {
              <option [value]="pos.id">{{ pos.title }}</option>
              }
            </select>
            <div class="invalid-feedback">Please select a job position.</div>
            @if (positions.length > 0) {
            <small class="field-hint">
              <i class="bi bi-info-circle me-1"></i>
              {{ positions.length }} position(s) available in this department.
            </small>
            }
          </div>
        </div>
      </div>

      <!-- â•â•â• SUBMIT BUTTON â•â•â• -->
      <div class="form-actions">
        <a routerLink="/employees" class="btn btn-cancel">
          <i class="bi bi-x-lg me-2"></i>Cancel
        </a>
        <button type="submit" class="btn btn-submit" [disabled]="isLoading || employeeForm.invalid">
          @if (isLoading) {
          <span class="spinner-border spinner-border-sm me-2"></span>
          {{ isEditMode ? 'Saving Changes...' : 'Creating Profile...' }}
          } @else {
          <i class="bi me-2" [class.bi-check2-circle]="!isEditMode" [class.bi-floppy-fill]="isEditMode"></i>
          {{ isEditMode ? 'Save Changes' : 'Create Employee Profile' }}
          }
        </button>
      </div>

    </form>
    }

  </div>
</div>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\employee-form\employee-form.component.ts


```ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { PositionService } from '../../core/services/position.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private positionService = inject(PositionService);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  isEditMode = false;
  currentEmployeeId: number | null = null;
  departments: any[] = [];
  positions: any[] = [];
  unassignedUsers: any[] = [];

  // Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ÙŠÙˆØ²Ø± Ø§Ù„Ù„ÙŠ Ù…Ø±Ø¨ÙˆØ· Ø¨Ø§Ù„Ù…ÙˆØ¸Ù ÙÙŠ Ø­Ø§Ù„Ø© Ø§Ù„ØªØ¹Ø¯ÙŠÙ„
  linkedUserInfo: { username: string; email: string; role: string } | null =
    null;

  employeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/),
    ]),
    hireDate: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    positionId: new FormControl(
      { value: '', disabled: true },
      Validators.required,
    ),
    userId: new FormControl('', Validators.required),
  });

  ngOnInit() {
    // ØªØ¬Ù‡ÙŠØ² Ø§Ù„Ù†Ù…ÙˆØ°Ø¬
    const state = window.history.state;

    if (state && state.editMode && state.employeeId) {
      // edit mode
      this.isEditMode = true;
      this.currentEmployeeId = state.employeeId;
      this.loadEmployeeDetails(this.currentEmployeeId!);
      // userId ÙˆØ§Ù„Ø¥ÙŠÙ…ÙŠÙ„ Ù…Ø§ ÙŠØªØ¹Ø¯Ù„ÙˆØ§
      this.employeeForm.get('userId')?.disable();
      this.employeeForm.get('email')?.disable();
    } else {
      // add mode
      // Ù„Ùˆ Ø¬Ø§ÙŠØ© Ø¯Ø§ØªØ§ Ù…Ù† ØµÙØ­Ø© Ø«Ø§Ù†ÙŠØ© Ù†Ø¹Ø¨ÙŠÙ‡Ø§ Ù…Ø¨Ø§Ø´Ø±Ø©
      if (state && (state.userId || state.email)) {
        this.employeeForm.patchValue({
          userId: state.userId,
          email: state.email,
        });
      }
      // Ø§Ù„Ø¥ÙŠÙ…ÙŠÙ„ ÙŠØªØ¹Ø¨Ù‰ ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹ Ù…Ù† Ø§Ù„ÙŠÙˆØ²Ø± Ø§Ù„Ù…Ø®ØªØ§Ø±
      this.employeeForm.get('email')?.disable();

      this.loadUnassignedUsers();

      // Ù†Ø¹Ø¨ÙŠ Ø§Ù„Ø¥ÙŠÙ…ÙŠÙ„ Ù„Ù…Ø§ ÙŠØ®ØªØ§Ø± ÙŠÙˆØ²Ø± Ù…Ù† Ø§Ù„Ù€ dropdown
      this.employeeForm.get('userId')?.valueChanges.subscribe((selectedId) => {
        const user = this.unassignedUsers.find(
          (u) => String(u.id) === String(selectedId),
        );
        if (user) {
          this.employeeForm.get('email')?.setValue(user.email);
        }
      });
    }

    this.loadDepartments();

    this.employeeForm.get('departmentId')?.valueChanges.subscribe((deptId) => {
      if (deptId) {
        this.employeeForm.get('positionId')?.enable();
        this.loadPositions(Number(deptId));
      }
    });
  }

  // Ø¬Ù„Ø¨ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…ÙˆØ¸Ù
  loadEmployeeDetails(id: number) {
    this.isLoading = true;
    // Ø¨Ù†Ø¬ÙŠØ¨ ÙƒØ§Ù…Ù„ Ø§Ù„ØªÙØ§ØµÙŠÙ„
    this.employeeService.getEmployeeById(id).subscribe({
      next: (profile: any) => {
        this.isLoading = false;

        if (profile.departmentId) {
          this.loadPositions(profile.departmentId);
          this.employeeForm.get('positionId')?.enable();
        }

        // Ù†Ø¹Ø¨ÙŠ Ø§Ù„ÙÙˆØ±Ù… Ø¨Ø§Ù„Ø¯Ø§ØªØ§ Ø§Ù„Ù…ÙˆØ¬ÙˆØ¯Ø©
        this.employeeForm.patchValue({
          firstName: profile.firstName || profile.fullName?.split(' ')[0] || '',
          lastName:
            profile.lastName ||
            profile.fullName?.split(' ').slice(1).join(' ') ||
            '',
          email: profile.email || '',
          phoneNumber: profile.phoneNumber || profile.phone || '',
          hireDate: profile.hireDate
            ? new Date(profile.hireDate).toISOString().split('T')[0]
            : '',
          departmentId: profile.departmentId || '',
          positionId: profile.positionId || '',
          userId: profile.userId || '',
        });

        // Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø¨Ø³ÙŠØ·Ø© Ù„Ù„Ø¹Ø±Ø¶ ÙÙŠ Ø§Ù„Ù€ header
        this.linkedUserInfo = {
          username:
            profile.fullName ||
            `${profile.firstName || ''} ${profile.lastName || ''}`.trim() ||
            'Employee',
          email: profile.email || '',
          role: profile.positionTitle || profile.departmentName || 'Employee',
        };
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching employee', err);
        Swal.fire('Error', 'Failed to load employee details', 'error');
      },
    });
  }

  loadDepartments() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = Array.isArray(res) ? res : res?.data || [];
      },
    });
  }

  // Ø§Ù„ÙŠÙˆØ²Ø±Ø§Øª Ø§Ù„Ù„ÙŠ Ù…Ø§ Ø±Ø¨Ø·ÙˆØ§ Ø¨Ù…ÙˆØ¸Ù Ø¨Ø¹Ø¯
  loadUnassignedUsers() {
    // ØªØ­Ù…ÙŠÙ„ ÙŠÙˆØ²Ø±Ø§Øª Ø¨Ø¯ÙˆÙ† Ù…ÙˆØ¸Ù
    this.authService.getUnassignedEmployeeUsers().subscribe({
      next: (res: any) => {
        this.unassignedUsers = res?.items ?? (Array.isArray(res) ? res : []);
      },
      error: (err) => {
        console.error('Failed to load unassigned users:', err);
      },
    });
  }

  // positions Ø­Ø³Ø¨ Ø§Ù„Ù‚Ø³Ù…
  loadPositions(deptId: number) {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ù†Ø§ØµØ¨
    this.positionService.getPositionsByDepartment(deptId).subscribe({
      next: (res: any) => {
        this.positions = Array.isArray(res) ? res : res?.data || [];
        this.employeeForm.get('positionId')?.setValue('');
      },
    });
  }

  // Ø§Ù„Ø¥ÙŠÙ…ÙŠÙ„ disabled ÙÙ†Ø­ØªØ§Ø¬ getRawValue
  get displayEmail(): string {
    return this.employeeForm.getRawValue().email || '';
  }

  // ØªØ­ÙˆÙŠÙ„ Ø£Ø®Ø·Ø§Ø¡ Ø§Ù„Ù€ backend Ù„Ø±Ø³Ø§Ø¦Ù„ Ù…ÙÙ‡ÙˆÙ…Ø©
  private parseBackendError(err: any): string {
    const body = err?.error;

    if (!body) return 'Ø­Ø¯Ø« Ø®Ø·Ø£ ØºÙŠØ± Ù…ØªÙˆÙ‚Ø¹ØŒ ÙŠØ±Ø¬Ù‰ Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.';

    // ASP.NET validation errors â€” ÙƒÙ„ field ÙÙŠÙ‡ list Ù…Ù† Ø§Ù„Ù€ errors
    if (body.errors && typeof body.errors === 'object') {
      const fieldLabels: Record<string, string> = {
        PhoneNumber: 'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ',
        FirstName: 'Ø§Ù„Ø§Ø³Ù… Ø§Ù„Ø£ÙˆÙ„',
        LastName: 'Ø§Ø³Ù… Ø§Ù„Ø¹Ø§Ø¦Ù„Ø©',
        Email: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ',
        HireDate: 'ØªØ§Ø±ÙŠØ® Ø§Ù„ØªØ¹ÙŠÙŠÙ†',
        DepartmentId: 'Ø§Ù„Ù‚Ø³Ù…',
        PositionId: 'Ø§Ù„Ù…Ø³Ù…Ù‰ Ø§Ù„ÙˆØ¸ÙŠÙÙŠ',
        UserId: 'Ø­Ø³Ø§Ø¨ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…',
      };

      const messages: string[] = [];
      for (const [field, errors] of Object.entries(body.errors)) {
        const label = fieldLabels[field] || field;
        const msgs = Array.isArray(errors) ? errors : [String(errors)];
        for (const msg of msgs) {
          // Ù†ØªØ±Ø¬Ù… Ø§Ù„Ø±Ø³Ø§Ù„Ø© Ù„Ù„Ø¹Ø±Ø¨ÙŠ Ù„Ùˆ Ø¹Ù†Ø¯Ù†Ø§ ØªØ±Ø¬Ù…Ø©
          const translated = this.translateBackendMsg(String(msg));
          messages.push(`â€¢ ${label}: ${translated}`);
        }
      }
      if (messages.length) return messages.join('\n');
    }

    // Ø±Ø³Ø§Ù„Ø© Ø¹Ø§Ø¯ÙŠØ©
    if (body.message) return body.message;
    if (body.title) return body.title;
    if (typeof body === 'string') return body;

    return 'Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø¥Ø±Ø³Ø§Ù„ØŒ ÙŠØ±Ø¬Ù‰ Ø§Ù„Ù…Ø­Ø§ÙˆÙ„Ø© Ù…Ø±Ø© Ø£Ø®Ø±Ù‰.';
  }

  // ØªØ±Ø¬Ù…Ø© Ø¨Ø¹Ø¶ Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„Ù€ backend Ø§Ù„Ø´Ø§Ø¦Ø¹Ø© Ù„Ù„Ø¹Ø±Ø¨ÙŠ
  private translateBackendMsg(msg: string): string {
    const map: Record<string, string> = {
      'Invalid phone number format.':
        'ØµÙŠØºØ© Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ ØºÙŠØ± ØµØ­ÙŠØ­Ø© (ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† 10 Ø£Ø±Ù‚Ø§Ù…)',
      'Phone number must be 10 digits.':
        'ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ 10 Ø£Ø±Ù‚Ø§Ù… Ø¨Ø§Ù„Ø¶Ø¨Ø·',
      'The field PhoneNumber must be a string or array type with a maximum length of 10.':
        'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ ÙŠØ¬Ø¨ Ø£Ù„Ø§ ÙŠØªØ¬Ø§ÙˆØ² 10 Ø£Ø±Ù‚Ø§Ù…',
      'is required.': 'Ù‡Ø°Ø§ Ø§Ù„Ø­Ù‚Ù„ Ù…Ø·Ù„ÙˆØ¨',
      'already exists': 'Ù‡Ø°Ø§ Ø§Ù„Ø³Ø¬Ù„ Ù…ÙˆØ¬ÙˆØ¯ Ù…Ø³Ø¨Ù‚Ø§Ù‹',
    };
    for (const [en, ar] of Object.entries(map)) {
      if (msg.toLowerCase().includes(en.toLowerCase())) return ar;
    }
    return msg;
  }

  onSubmit() {
    // Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ù†Ù…ÙˆØ°Ø¬
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();

      // Ø®Ø·Ø£ Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ Ù„Ù‡ Ø±Ø³Ø§Ù„Ø© Ù…Ø®ØµØµØ©
      const phone = this.employeeForm.get('phoneNumber');
      if (phone?.errors?.['pattern']) {
        Swal.fire({
          icon: 'warning',
          title: 'Ø±Ù‚Ù… Ù‡Ø§ØªÙ ØºÙŠØ± ØµØ­ÙŠØ­',
          text: 'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ ÙŠØ¬Ø¨ Ø£Ù† ÙŠØªÙƒÙˆÙ† Ù…Ù† 10 Ø£Ø±Ù‚Ø§Ù… ÙÙ‚Ø· (Ø£Ø±Ù‚Ø§Ù… ÙÙ‚Ø· Ø¨Ø¯ÙˆÙ† Ù…Ø³Ø§ÙØ§Øª Ø£Ùˆ Ø±Ù…ÙˆØ²)',
          confirmButtonText: 'Ø­Ø³Ù†Ø§Ù‹',
        });
        return;
      }

      Swal.fire({
        icon: 'warning',
        title: 'Ø¨ÙŠØ§Ù†Ø§Øª Ù†Ø§Ù‚ØµØ©',
        text: 'ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªØ£ÙƒØ¯ Ù…Ù† ØªØ¹Ø¨Ø¦Ø© Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ„ Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© Ø¨Ø´ÙƒÙ„ ØµØ­ÙŠØ­',
        confirmButtonText: 'Ø­Ø³Ù†Ø§Ù‹',
      });
      return;
    }

    this.isLoading = true;
    const rawValues = this.employeeForm.getRawValue();

    const payload = {
      ...rawValues,
      departmentId: Number(rawValues.departmentId),
      positionId: Number(rawValues.positionId),
      hireDate: rawValues.hireDate
        ? new Date(rawValues.hireDate).toISOString()
        : new Date().toISOString(),
    };

    if (this.isEditMode && this.currentEmployeeId) {
      this.employeeService
        .updateEmployee(this.currentEmployeeId, payload)
        .subscribe({
          next: () => {
            this.isLoading = false;
            Swal.fire('Ù†Ø¬Ø§Ø­', 'ØªÙ… ØªØ¹Ø¯ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…ÙˆØ¸Ù Ø¨Ù†Ø¬Ø§Ø­', 'success');
            this.router.navigate(['/employees']);
          },
          error: (err) => {
            this.isLoading = false;
            const msg = this.parseBackendError(err);
            Swal.fire({
              icon: 'error',
              title: 'ÙØ´Ù„ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„',
              text: msg,
              confirmButtonText: 'Ø­Ø³Ù†Ø§Ù‹',
            });
            console.error('Update error:', err);
          },
        });
    } else {
      this.employeeService.addEmployee(payload).subscribe({
        next: () => {
          this.isLoading = false;
          Swal.fire('Ù†Ø¬Ø§Ø­', 'ØªÙ… Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…ÙˆØ¸Ù Ø¨Ù†Ø¬Ø§Ø­', 'success');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.isLoading = false;
          const msg = this.parseBackendError(err);
          Swal.fire({
            icon: 'error',
            title: 'ÙØ´Ù„ Ø§Ù„Ø¥Ø¶Ø§ÙØ©',
            text: msg,
            confirmButtonText: 'Ø­Ø³Ù†Ø§Ù‹',
          });
          console.error('Add error:', err);
        },
      });
    }
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\employees\employees.component.css


```css


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\employees\employees.component.html


```html



<div
    class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
    <h2 class="fw-bold text-secondary mb-0">
        <i class="bi bi-people-fill me-2"></i>{{ 'Employee Management' | t }}
    </h2>
    <div
        class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end">
        <div class="input-group shadow-sm" style="max-width: 350px;">
            <span class="input-group-text bg-white border-end-0 text-muted"><i
                    class="bi bi-search"></i></span>
            <input type="text" class="form-control border-start-0 ps-0"
                placeholder="{{ 'Search employees...' | t }}"
                [(ngModel)]="searchQuery"
                (input)="filterEmployees()">
        </div>

        <div class="dropdown">
            <button class="btn btn-outline-secondary shadow-sm" type="button"
                data-bs-toggle="dropdown" aria-expanded="false"
                title="Filter Employees">
                <i class="bi bi-funnel-fill"></i>
            </button>
            <div
                class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4"
                style="width: 250px;">
                <h6
                    class="dropdown-header px-0 text-primary fw-bold mb-2">Filter
                    Options</h6>

                <div class="mb-3">
                    <label
                        class="form-label small fw-semibold text-muted mb-1">{{
                        'Department' | t }}</label>
                    <select class="form-select form-select-sm"
                        [(ngModel)]="selectedDepartment"
                        (change)="filterEmployees()">
                        <option value>All Departments</option>
                        @for (dept of uniqueDepartments; track dept) {
                        <option [value]="dept">{{ dept }}</option>
                        }
                    </select>
                </div>

                <div class="mb-2">
                    <label
                        class="form-label small fw-semibold text-muted mb-1">{{
                        'Status' | t }}</label>
                    <select class="form-select form-select-sm"
                        [(ngModel)]="selectedStatus"
                        (change)="filterEmployees()">
                        <option value>All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>
        </div>

        @if (isAdmin) {
        <div class="d-flex align-items-center gap-2">
            <button class="btn btn-outline-success px-4 fw-semibold me-2"
                (click)="exportToExcel()">
                <i class="bi bi-file-earmark-excel-fill me-2"></i> {{
                'Export to Excel' | t }}
            </button>
            <button class="btn btn-primary px-4 fw-semibold"
                routerLink="/employee-form">
                <i class="bi bi-person-plus-fill me-2"></i> {{ 'Add Employee' |
                t }}
            </button>
        </div>
        }
    </div>
</div>

@if (isLoading) {
<div class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-2 text-muted">Fetching data from server...</p>
</div>
} @else {
<div class="card shadow-sm border-0">
    <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
                <tr class="text-muted small text-uppercase"
                    style="letter-spacing: 0.5px;">
                    <th
                        class="py-3 px-4 fw-semibold text-muted border-bottom-0">ID</th>
                    <th
                        class="py-3 px-4 fw-semibold text-muted border-bottom-0">{{
                        'Employee' | t }}</th>
                    <th
                        class="py-3 px-4 fw-semibold text-muted border-bottom-0">{{
                        'Email' | t }}</th>
                    <th
                        class="py-3 px-4 fw-semibold text-muted border-bottom-0">{{
                        'Department' | t }}</th>
                    <th
                        class="py-3 px-4 fw-semibold text-muted border-bottom-0 text-center">{{
                        'Status' | t }}</th>
                    @if (isAdminOrHR) { <th
                        class="py-3 px-4 fw-semibold text-muted border-bottom-0 text-end">{{
                        'Actions' | t }}</th> }
                </tr>
            </thead>
            <tbody>
                @for (emp of paginatedEmployees; track emp.id) {
                <tr>
                    <td data-label="ID" class="py-3 px-4 fw-bold text-dark">#{{
                        emp.id }}</td>
                    <td data-label="Full Name"
                        class="py-3 px-4 fw-bold text-dark">
                        <div class="d-flex align-items-center">
                            <div
                                class="avatar-circle bg-primary bg-opacity-10 text-primary fw-bold me-3 rounded-circle d-flex align-items-center justify-content-center"
                                style="width: 35px; height: 35px; font-size: 14px;">
                                {{ emp.firstName ?
                                emp.firstName.charAt(0).toUpperCase() : 'U' }}
                            </div>
                            {{ emp.firstName }} {{ emp.lastName }}
                        </div>
                    </td>
                    <td data-label="Email" class="py-3 px-4 text-muted">{{
                        emp.email }}</td>
                    <td data-label="Department" class="py-3 px-4">{{
                        emp.departmentName || emp.departmentId || 'â€”' }}</td>
                    <td data-label="Status" class="py-3 px-4">
                        <span class="status-badge"
                            [ngClass]="emp.isActive ? 'status-active' : 'status-inactive'">
                            <i class="bi"
                                [ngClass]="emp.isActive ? 'bi-check-circle-fill' : 'bi-x-circle-fill'"></i>
                            {{ emp.isActive ? ('Active' | t) : ('Inactive' | t)
                            }}
                        </span>
                    </td>
                    @if (isAdminOrHR) {
                    <td data-label="Actions"
                        class="py-3 px-4 text-end text-nowrap actions-cell">
                        <button class="btn btn-outline-info btn-sm me-2"
                            title="Details"
                            (click)="viewFullDetails(emp)">
                            <i class="bi bi-file-earmark-person"></i>
                        </button>
                        @if (isAdmin) {
                        <button class="btn btn-sm btn-outline-secondary me-2"
                            title="Download Report"
                            (click)="downloadEmployeeReport(emp)">
                            <i class="bi bi-file-earmark-pdf"></i>
                        </button>
                        <button class="btn btn-outline-primary btn-sm"
                            title="Edit"
                            (click)="editEmployee(emp.id)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger ms-2"
                            title="Delete"
                            (click)="onDelete(emp.id)">
                            <i class="bi bi-trash3"></i>
                        </button>
                        }
                    </td>
                    }
                </tr>
                } @empty {
                <tr>
                    <td [colSpan]="isAdminOrHR ? 6 : 5"
                        class="text-center py-5">
                        <div class="d-flex flex-column align-items-center">
                            <div
                                class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center"
                                style="width: 80px; height: 80px;">
                                <i class="bi bi-people text-secondary fs-1"></i>
                            </div>
                            <h5 class="fw-bold text-dark mb-1">{{
                                'No Employees Found' | t }}</h5>
                            <p class="text-muted small mb-0">Try adjusting your
                                filters or search query.</p>
                        </div>
                    </td>
                </tr>
                }
            </tbody>
        </table>
    </div>

    <!-- Pagination Footer -->
    @if (employeesList.length > 0) {
    <div
        class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <small class="text-muted fw-medium">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{
            getMathMin(currentPage * itemsPerPage, employeesList.length) }} of
            {{ employeesList.length }} entries
        </small>
        <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
            <li class="page-item" [class.disabled]="currentPage === 1">
                <a class="page-link cursor-pointer px-3"
                    (click)="changePage(currentPage - 1)">Previous</a>
            </li>

            <li class="page-item active">
                <a class="page-link px-3 bg-primary border-primary">{{
                    currentPage }} / {{ totalPages }}</a>
            </li>

            <li class="page-item" [class.disabled]="currentPage === totalPages">
                <a class="page-link cursor-pointer px-3"
                    (click)="changePage(currentPage + 1)">Next</a>
            </li>
        </ul>
    </div>
    }
</div>
}

<div class="modal fade" id="employeeDetailsModal" tabindex="-1"
    aria-labelledby="employeeDetailsModalLabel" aria-hidden="true">
    <div
        class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">

            <div class="modal-header border-0 p-0">
                <div
                    class="emp-modal-header w-100 p-4 d-flex align-items-center gap-3">
                    <div class="emp-modal-avatar">
                        {{ getEmpInitials(selectedEmployeeProfile) }}
                    </div>
                    <div>
                        <h4 class="fw-bold text-white mb-0">
                            {{ selectedEmployeeProfile?.fullName ||
                            (selectedEmployeeProfile?.firstName + ' ' +
                            selectedEmployeeProfile?.lastName) }}
                        </h4>
                        <span
                            class="badge bg-white text-primary mt-1 px-3 py-2 rounded-pill shadow-sm">
                            {{ selectedEmployeeProfile?.positionTitle ||
                            'Employee' }}
                        </span>
                    </div>
                    <button type="button"
                        class="btn-close btn-close-white ms-auto shadow-none"
                        data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
            </div>

            <div class="modal-body p-4">
                @if (selectedEmployeeProfile?.isLoadingDetails) {
                <div class="text-center py-4">
                    <div class="spinner-border text-primary"
                        role="status"></div>
                    <p class="mt-2 text-muted">Loading full details...</p>
                </div>
                }
                @if (selectedEmployeeProfile &&
                !selectedEmployeeProfile?.isLoadingDetails) {

                <h6 class="detail-section-title">
                    <i
                        class="bi bi-person-lines-fill text-primary me-2"></i>Personal
                    Information
                </h6>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i
                                    class="bi bi-envelope me-1"></i>Email</span>
                            <span class="detail-value">{{
                                selectedEmployeeProfile?.email || 'â€”' }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i
                                    class="bi bi-telephone me-1"></i>Phone</span>
                            <span class="detail-value">
                                {{ selectedEmployeeProfile?.phone ||
                                selectedEmployeeProfile?.phoneNumber || 'N/A' }}
                            </span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i
                                    class="bi bi-hash me-1"></i>Employee
                                ID</span>
                            <span class="detail-value fw-bold text-primary">#{{
                                selectedEmployeeProfile?.id }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i
                                    class="bi bi-calendar-check me-1"></i>Hire
                                Date</span>
                            <span class="detail-value">{{
                                selectedEmployeeProfile?.hireDate |
                                date:'mediumDate' }}</span>
                        </div>
                    </div>
                </div>

                <h6 class="detail-section-title">
                    <i
                        class="bi bi-briefcase-fill text-success me-2"></i>Employment
                    Details
                </h6>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i
                                    class="bi bi-building me-1"></i>Department</span>
                            <span class="detail-value">{{
                                selectedEmployeeProfile?.departmentName || 'â€”'
                                }}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-item">
                            <span class="detail-label"><i
                                    class="bi bi-person-badge me-1"></i>Position</span>
                            <span class="detail-value">{{
                                selectedEmployeeProfile?.positionTitle || 'â€”'
                                }}</span>
                        </div>
                    </div>
                </div>

                <h6 class="detail-section-title">
                    <i class="bi bi-activity text-warning me-2"></i>Account
                    Status
                </h6>
                <div class="d-flex gap-3 flex-wrap">
                    <span class="status-badge"
                        [ngClass]="selectedEmployeeProfile?.isActive !== false ? 'status-active' : 'status-inactive'">
                        <i class="bi me-1"
                            [class.bi-check-circle-fill]="selectedEmployeeProfile?.isActive !== false"
                            [class.bi-x-circle-fill]="selectedEmployeeProfile?.isActive === false"></i>
                        {{ selectedEmployeeProfile?.isActive !== false ?
                        'Active' : 'Inactive' }}
                    </span>
                </div>

                }
            </div>

            <div
                class="modal-footer border-0 bg-light d-flex justify-content-between align-items-center">
                <span class="text-muted small">
                    <i
                        class="bi bi-shield-lock-fill me-1 text-secondary"></i>Confidential
                    Employee Record
                </span>
                <div class="d-flex gap-2">
                    <button type="button"
                        class="btn btn-outline-secondary rounded-pill px-4"
                        data-bs-dismiss="modal">
                        <i class="bi bi-x-lg me-1"></i> {{ 'Close' | t }}
                    </button>
                    @if (isAdmin) {
                    <button type="button"
                        class="btn btn-outline-danger rounded-pill px-4"
                        [disabled]="isGeneratingReport"
                        (click)="downloadEmployeeReport(selectedEmployeeProfile)">
                        @if (isGeneratingReport) {
                        <span
                            class="spinner-border spinner-border-sm me-2"></span>
                        {{ 'Loading...' | t }}
                        } @else {
                        <i class="bi bi-file-earmark-pdf-fill me-1"></i> {{
                        'Download Report' | t }}
                        }
                    </button>
                    <button type="button"
                        class="btn btn-primary rounded-pill px-4"
                        (click)="editEmployee(selectedEmployeeProfile?.id); detailsModal?.hide()">
                        <i class="bi bi-pencil-square me-1"></i> Edit Employee
                    </button>
                    }
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.emp-modal-header {
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
}

.emp-modal-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: 2px solid rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
  line-height: 1;
}

.detail-section-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #6c757d;
  border-bottom: 1px solid #f0f2f5;
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
}

.detail-item {
  background: #f8fafc;
  border: 1px solid #e8ecf0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.detail-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #8592a3;
  font-weight: 600;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a202c;
}


.status-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1rem;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
}



.cursor-pointer {
  cursor: pointer;
}

/* Mobile Responsive Cards for Table */
@media screen and (max-width: 768px) {
  .table-responsive table, 
  .table-responsive thead, 
  .table-responsive tbody, 
  .table-responsive th, 
  .table-responsive td, 
  .table-responsive tr {
    display: block;
  }
  
  .table-responsive thead tr {
    display: none; /* Hide header row */
  }
  
  .table-responsive tr {
    border: 1px solid #e8ecf0;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }
  
  .table-responsive td {
    border: none;
    border-bottom: 1px solid #f0f2f5;
    position: relative;
    padding-left: 40% !important;
    text-align: right !important;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 50px;
  }
  
  .table-responsive td:last-child {
    border-bottom: 0;
  }
  
  .table-responsive td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    width: 35%;
    text-align: left;
    font-weight: 700;
    color: #8592a3;
    font-size: 0.75rem;
    text-transform: uppercase;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .actions-cell {
    justify-content: flex-end !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
}
</style>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\employees\employees.component.ts


```ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { LeaveService } from '../../core/services/leave.service';
import { SalaryService } from '../../core/services/salary.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);
  private attendanceService = inject(AttendanceService);
  private leaveService = inject(LeaveService);
  private salaryService = inject(SalaryService);

  allEmployeesList: any[] = [];
  employeesList: any[] = [];
  isLoading: boolean = true;
  isGeneratingReport: boolean = false;
  isAdmin: boolean = false;
  isAdminOrHR: boolean = false;
  selectedEmployeeProfile: any = null;

  searchQuery: string = '';
  selectedDepartment: string = '';
  selectedStatus: string = '';
  uniqueDepartments: string[] = [];

  detailsModal: any;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.employeesList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.employeesList.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  showToast(message: string, icon: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }

  ngOnInit() {
    // Ø£ÙˆÙ„ ØªØ­Ù…ÙŠÙ„
    this.isAdmin = this.authService.isAdmin();
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.loadEmployees();
  }

  getRoleBadgeClass(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25';
      case 2:
        return 'bg-warning bg-opacity-10 text-dark border border-warning border-opacity-25';
      default:
        return 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25';
    }
  }

  // --- Export to Excel (CSV) ---
  exportToExcel() {
    if (this.employeesList.length === 0) {
      Swal.fire('No Data', 'There are no employees to export.', 'info');
      return;
    }

    const headers = [
      'ID',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Address',
      'Status',
      'Role ID',
    ];

    const csvData = this.employeesList.map((emp) => {
      return [
        emp.id,
        emp.firstName || '',
        emp.lastName || '',
        emp.email || '',
        emp.phoneNumber || 'N/A',
        emp.address || 'N/A',
        emp.isActive ? 'Active' : 'Inactive',
        emp.roleId || 'N/A',
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',');
    });

    // Add UTF-8 BOM for Excel to read Arabic/Special characters correctly
    // Add sep=, to force Excel to recognize comma as delimiter regardless of region
    const csvContent =
      '\uFEFFsep=,\r\n' + [headers.join(','), ...csvData].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `Employees_Kawadir_${new Date().toISOString().split('T')[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: 'success',
      title: 'Exported Successfully',
      text: 'Employees list has been exported to Excel (CSV).',
      timer: 2000,
      showConfirmButton: false,
    });
  }

  getEmpInitials(emp: any): string {
    const name =
      emp?.fullName ||
      `${emp?.firstName || ''} ${emp?.lastName || ''}`.trim() ||
      'E';
    return name
      .split(' ')
      .map((w: string) => w[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  loadEmployees() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.allEmployeesList = data;
        this.employeesList = [...this.allEmployeesList];

        const depts = data
          .map((e: any) => e.departmentName || e.departmentId)
          .filter(Boolean);
        this.uniqueDepartments = Array.from(new Set(depts)) as string[];

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.isLoading = false;
      },
    });
  }

  filterEmployees() {
    // ÙÙ„ØªØ±Ø© Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©
    this.employeesList = this.allEmployeesList.filter((emp) => {
      let matchesSearch = true;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const fullName =
          `${emp.firstName || ''} ${emp.lastName || ''}`.toLowerCase();
        const idStr = String(emp.id);
        const deptStr = String(
          emp.departmentName || emp.departmentId || '',
        ).toLowerCase();

        matchesSearch =
          fullName.includes(query) ||
          idStr.includes(query) ||
          deptStr.includes(query);
      }

      let matchesDept = true;
      if (this.selectedDepartment) {
        matchesDept =
          (emp.departmentName || String(emp.departmentId)) ===
          this.selectedDepartment;
      }

      let matchesStatus = true;
      if (this.selectedStatus) {
        matchesStatus =
          this.selectedStatus === 'Active' ? emp.isActive : !emp.isActive;
      }

      return matchesSearch && matchesDept && matchesStatus;
    });

    this.currentPage = 1; // Reset to first page on filter
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.employeesList = this.employeesList.filter(
              (emp) => emp.id !== id,
            );

            // Adjust pagination if needed
            if (this.currentPage > this.totalPages) {
              this.currentPage = this.totalPages;
            }

            this.showToast('Employee deleted successfully', 'success');
          },
          error: (err) => {
            console.error('Error deleting employee:', err);
            this.showToast('Failed to delete employee', 'error');
          },
        });
      }
    });
  }

  viewFullDetails(emp: any) {
    // ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…ÙˆØ¸Ù
    this.selectedEmployeeProfile = { ...emp, isLoadingDetails: true };

    const modalElement = document.getElementById('employeeDetailsModal');
    if (modalElement) {
      this.detailsModal = new bootstrap.Modal(modalElement);
      this.detailsModal.show();
    }

    this.employeeService.getEmployeeFullProfile(emp.id).subscribe({
      next: (profile) => {
        this.selectedEmployeeProfile = {
          ...emp,
          ...profile,
          isLoadingDetails: false,
        };
      },
      error: () => {
        this.selectedEmployeeProfile = { ...emp, isLoadingDetails: false };
      },
    });
  }

  editEmployee(id: number) {
    this.router.navigate(['/employee-form'], {
      state: { editMode: true, employeeId: id },
    });
  }

  downloadEmployeeReport(emp: any) {
    // ØªÙ‚Ø±ÙŠØ± Ø§Ù„Ù…ÙˆØ¸Ù
    if (!emp) return;

    this.isGeneratingReport = true;
    const empName =
      `${emp.firstName || ''} ${emp.lastName || ''}`.trim() ||
      `Employee #${emp.id}`;

    // Fetch all data in parallel
    forkJoin({
      attendance: this.attendanceService
        .getAllAttendance()
        .pipe(catchError(() => of([]))),
      leaves: this.leaveService.getAllLeaves().pipe(catchError(() => of([]))),
      salaries: this.salaryService
        .getAllSalaries()
        .pipe(catchError(() => of([]))),
    }).subscribe(({ attendance, leaves, salaries }) => {
      this.isGeneratingReport = false;

      // Filter data for this specific employee
      const empAttendance = attendance
        .filter((a: any) => a.employeeId === emp.id)
        .sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
        .slice(0, 15);

      const empLeaves = leaves
        .filter((l: any) => l.employeeId === emp.id)
        .sort(
          (a: any, b: any) =>
            new Date(b.startDate || 0).getTime() -
            new Date(a.startDate || 0).getTime(),
        );

      const empSalaries = salaries
        .filter((s: any) => s.employeeId === emp.id)
        .sort((a: any, b: any) => {
          if (b.year !== a.year) return b.year - a.year;
          return b.month - a.month;
        });

      this.buildEmployeePDF(
        emp,
        empName,
        empAttendance,
        empLeaves,
        empSalaries,
      );
    });
  }

  private buildEmployeePDF(
    emp: any,
    empName: string,
    attendance: any[],
    leaves: any[],
    salaries: any[],
  ) {
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    // âœ… W3 Fix: ØªØ£ÙƒØ¯ Ù…Ù† ØµØ­Ø© ÙƒÙ„ Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª Ø¨Ù…Ø§ ÙŠØ·Ø§Ø¨Ù‚ Backend enum
    const leaveTypeMap: any = {
      0: 'Annual',
      1: 'Sick',
      2: 'Emergency',
      3: 'Unpaid',
      Annual: 'Annual',
      Sick: 'Sick',
      Emergency: 'Emergency',
      Unpaid: 'Unpaid',
    };
    const statusMap: any = {
      0: 'Pending',
      1: 'Approved',
      2: 'Rejected',
      Pending: 'Pending',
      Approved: 'Approved',
      Rejected: 'Rejected',
    };

    // â”€â”€ HEADER BANNER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    doc.setFillColor(67, 97, 238);
    doc.rect(0, 0, pageW, 38, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('Kawadir HRMS', 14, 14);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Employee Monthly Report', 14, 22);
    doc.text(`Generated: ${todayStr}`, 14, 29);

    // â”€â”€ EMPLOYEE INFO CARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    doc.setFillColor(248, 249, 252);
    doc.roundedRect(10, 44, pageW - 20, 38, 3, 3, 'F');
    doc.setDrawColor(225, 228, 240);
    doc.roundedRect(10, 44, pageW - 20, 38, 3, 3, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(30, 30, 50);
    doc.text(empName, 18, 55);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 120);
    doc.text(`Employee ID: #${emp.id}`, 18, 62);
    doc.text(`Department: ${emp.departmentName || 'â€”'}`, 18, 68);
    doc.text(`Position: ${emp.positionTitle || 'â€”'}`, 18, 74);

    const hireDate = emp.hireDate ? emp.hireDate.split('T')[0] : 'â€”';
    doc.text(`Hire Date: ${hireDate}`, pageW / 2, 62);
    doc.text(`Email: ${emp.email || 'â€”'}`, pageW / 2, 68);
    doc.text(
      `Status: ${emp.isActive !== false ? 'Active' : 'Inactive'}`,
      pageW / 2,
      74,
    );

    let curY = 90;

    // â”€â”€ SALARY SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(67, 97, 238);
    doc.text('SALARY HISTORY', 14, curY);
    doc.setDrawColor(67, 97, 238);
    doc.setLineWidth(0.5);
    doc.line(14, curY + 2, pageW - 14, curY + 2);

    if (salaries.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('No salary records found.', 18, curY + 10);
      curY += 18;
    } else {
      autoTable(doc, {
        startY: curY + 6,
        head: [
          [
            'Month',
            'Year',
            'Base ($)',
            'Allowances ($)',
            'Deductions ($)',
            'Net Pay ($)',
          ],
        ],
        body: salaries
          .slice(0, 6)
          .map((s: any) => [
            s.month,
            s.year,
            `$${s.baseAmount ?? 'â€”'}`,
            `+$${s.allowances ?? 0}`,
            `-$${s.deductions ?? 0}`,
            `$${s.netAmount ?? 'â€”'}`,
          ]),
        theme: 'grid',
        headStyles: {
          fillColor: [240, 243, 255],
          textColor: [50, 50, 80],
          fontStyle: 'bold',
          fontSize: 8,
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [252, 253, 255] },
        margin: { left: 14, right: 14 },
      });
      curY = (doc as any).lastAutoTable.finalY + 10;
    }

    // â”€â”€ ATTENDANCE SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (curY > 230) {
      doc.addPage();
      curY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(25, 135, 84);
    doc.text('RECENT ATTENDANCE (Last 15 Records)', 14, curY);
    doc.setDrawColor(25, 135, 84);
    doc.line(14, curY + 2, pageW - 14, curY + 2);

    if (attendance.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('No attendance records found.', 18, curY + 10);
      curY += 18;
    } else {
      autoTable(doc, {
        startY: curY + 6,
        head: [['Date', 'Clock In', 'Clock Out', 'Hours', 'Status']],
        body: attendance.map((a: any) => [
          a.date ? a.date.split('T')[0] : 'â€”',
          a.clockIn || 'â€”',
          a.clockOut && a.clockOut !== '00:00:00' ? a.clockOut : 'â€”',
          a.totalHours || 'â€”',
          a.clockOut && a.clockOut !== '00:00:00' ? 'Completed' : 'Working',
        ]),
        theme: 'grid',
        headStyles: {
          fillColor: [232, 248, 240],
          textColor: [20, 80, 50],
          fontStyle: 'bold',
          fontSize: 8,
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [248, 253, 250] },
        margin: { left: 14, right: 14 },
      });
      curY = (doc as any).lastAutoTable.finalY + 10;
    }

    // â”€â”€ LEAVE SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (curY > 230) {
      doc.addPage();
      curY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(220, 53, 69);
    doc.text('LEAVE REQUESTS', 14, curY);
    doc.setDrawColor(220, 53, 69);
    doc.line(14, curY + 2, pageW - 14, curY + 2);

    if (leaves.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('No leave requests found.', 18, curY + 10);
      curY += 18;
    } else {
      autoTable(doc, {
        startY: curY + 6,
        head: [['Type', 'Start Date', 'End Date', 'Days', 'Status']],
        body: leaves.map((l: any) => [
          leaveTypeMap[l.leaveType] || l.leaveType,
          l.startDate ? l.startDate.split('T')[0] : 'â€”',
          l.endDate ? l.endDate.split('T')[0] : 'â€”',
          l.totalDays ?? 'â€”',
          statusMap[l.status] || l.status,
        ]),
        theme: 'grid',
        headStyles: {
          fillColor: [255, 240, 242],
          textColor: [100, 20, 30],
          fontStyle: 'bold',
          fontSize: 8,
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [255, 248, 249] },
        margin: { left: 14, right: 14 },
      });
      curY = (doc as any).lastAutoTable.finalY + 10;
    }

    // â”€â”€ SUMMARY BOX â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (curY > 235) {
      doc.addPage();
      curY = 20;
    }

    const approvedLeaves = leaves.filter(
      (l: any) => l.status === 1 || l.status === 'Approved',
    );
    const totalLeaveDays = approvedLeaves.reduce(
      (acc: number, l: any) => acc + (l.totalDays || 0),
      0,
    );
    const completedSessions = attendance.filter(
      (a: any) => a.clockOut && a.clockOut !== '00:00:00',
    ).length;
    const latestSalary = salaries[0];

    doc.setFillColor(240, 243, 255);
    doc.roundedRect(10, curY, pageW - 20, 32, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(67, 97, 238);
    doc.text('REPORT SUMMARY', 18, curY + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(50, 50, 80);
    doc.text(
      `Total Attendance Records: ${attendance.length}   |   Completed Sessions: ${completedSessions}`,
      18,
      curY + 16,
    );
    doc.text(
      `Total Approved Leave Days: ${totalLeaveDays}   |   Latest Net Salary: $${latestSalary?.netAmount ?? 'N/A'}`,
      18,
      curY + 23,
    );

    // â”€â”€ FOOTER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const pageCount = (doc.internal as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(180, 180, 180);
      doc.text(
        'Confidential â€“ Kawadir HRMS â€“ System Generated Report',
        14,
        doc.internal.pageSize.getHeight() - 8,
      );
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageW - 30,
        doc.internal.pageSize.getHeight() - 8,
      );
    }

    const fileName = `Report_${empName.replace(/ /g, '_')}_${todayStr}.pdf`;
    doc.save(fileName);
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\leave\leave.component.css


```css


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\leave\leave.component.html


```html

<div class="page-container p-4">



    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
            <h3 class="fw-bold text-dark mb-1">{{ isAdminOrHR ? ('All Leave Requests' | t) : ('My Leave Requests' | t) }}</h3>
            <p class="text-muted small mb-0">{{ 'Manage and track time-off requests effectively' | t }}</p>
        </div>
        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end">
            <div class="input-group shadow-sm" style="max-width: 350px;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0" 
                    placeholder="{{ 'Search by name, ID, or reason...' | t }}"
                    [(ngModel)]="leaveSearchQuery" 
                    (input)="filterLeaves()">
            </div>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Filter Leaves">
                    <i class="bi bi-funnel-fill"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">{{ 'Filter Options' | t }}</h6>
                    
                    <div class="mb-3">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Leave Type' | t }}</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedLeaveType" (change)="filterLeaves()">
                            <option value="">{{ 'All Types' | t }}</option>
                            <option *ngFor="let type of leaveTypes" [value]="type.name">{{ type.name }}</option>
                        </select>
                    </div>
                    
                    <div class="mb-2">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Status' | t }}</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedLeaveStatus" (change)="filterLeaves()">
                            <option value="">{{ 'All Statuses' | t }}</option>
                            <option value="Pending">{{ 'Pending' | t }}</option>
                            <option value="Approved">{{ 'Approved' | t }}</option>
                            <option value="Rejected">{{ 'Rejected' | t }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <button *ngIf="!isAdminOrHR"
                class="btn btn-primary px-4 py-2 rounded-3 fw-semibold shadow-sm text-nowrap"
                (click)="openModal()">
                <i class="bi bi-send-plus me-2"></i> {{ 'Request Leave' | t }}
            </button>
        </div>
    </div>

    <!-- Annual Leave Balance Banner for Employees -->
    <div class="row mb-4" *ngIf="!isAdminOrHR">
        <div class="col-12">
            <div class="card border-0 shadow-sm rounded-4 bg-primary bg-opacity-10 position-relative overflow-hidden">
                <div class="position-absolute end-0 top-0 h-100 w-50" style="background: linear-gradient(90deg, transparent, rgba(13, 110, 253, 0.05)); z-index: 0;"></div>
                <div class="card-body d-flex align-items-center justify-content-between p-4 position-relative" style="z-index: 1;">
                    <div class="d-flex align-items-center gap-3">
                        <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 55px; height: 55px;">
                            <i class="bi bi-airplane-engines-fill fs-4"></i>
                        </div>
                        <div>
                            <p class="text-primary small mb-0 fw-bold text-uppercase" style="letter-spacing: 0.5px;">{{ 'Annual Leave Balance' | t }}</p>
                            <h3 class="mb-0 fw-bold text-dark">{{ employeeAnnualLeaveBalance }} {{ 'Days Remaining' | t }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">

                <thead class="bg-light text-muted small text-uppercase"
                    style="letter-spacing: 0.5px;">
                    <tr>
                        <th *ngIf="isAdminOrHR" class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Employee' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Leave Type' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Duration' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Reason' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold text-center">{{ 'Status' | t }}</th>
                        <th *ngIf="isAdminOrHR"
                            class="py-3 px-4 border-bottom-0 fw-semibold text-end">{{ 'Actions' | t }}</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <tr *ngIf="isLoading">
                        <td [colSpan]="isAdminOrHR ? 6 : 5" class="text-center py-5 text-muted">
                            <span
                                class="spinner-border spinner-border-sm me-2"></span>
                            {{ 'Loading requests...' | t }}
                        </td>
                    </tr>

                    <tr *ngIf="!isLoading && leavesList.length === 0">
                        <td [colSpan]="isAdminOrHR ? 7 : 6" class="text-center py-5">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                    <i class="bi bi-airplane-engines text-secondary fs-1"></i>
                                </div>
                                <h5 class="fw-bold text-dark mb-1">{{ 'No Leave Requests' | t }}</h5>
                                <p class="text-muted small mb-0">{{ 'No leave data available matching your search criteria.' | t }}</p>
                            </div>
                        </td>
                    </tr>

                    <tr *ngFor="let leave of paginatedLeaves">
                        <td *ngIf="isAdminOrHR" data-label="Employee" class="py-3 px-3">
                            <div class="d-flex align-items-center">
                                <div class="avatar-circle bg-primary bg-opacity-10 text-primary fw-bold me-2 rounded-circle d-flex align-items-center justify-content-center"
                                    style="width: 32px; height: 32px; font-size: 13px;">
                                    {{ leave.employeeName ? leave.employeeName.charAt(0).toUpperCase() : 'U' }}
                                </div>
                                <span class="fw-semibold text-dark">{{ leave.employeeName }}</span>
                            </div>
                        </td>
                        <td data-label="Leave Type" class="py-3 px-4 fw-bold text-dark">
                            <div class="d-flex align-items-center">
                                <div
                                    class="rounded-circle p-2 me-3 bg-secondary bg-opacity-10 text-secondary d-flex align-items-center justify-content-center"
                                    style="width: 35px; height: 35px;">
                                    <i class="bi bi-journal-text"></i>
                                </div>
                                {{ getLeaveTypeText(leave.leaveType) }}
                            </div>
                        </td>

                        <td data-label="Duration" class="py-3 px-4">
                            <div class="fw-medium text-dark">{{ leave.startDate
                                | date:'MMM dd' }} <i
                                    class="bi bi-arrow-right text-muted mx-1"></i>
                                {{ leave.endDate | date:'MMM dd, yyyy' }}</div>
                        </td>

                        <td data-label="Reason" class="py-3 px-4 text-secondary">
                            <span class="d-inline-block text-truncate"
                                style="max-width: 180px;"
                                [title]="leave.reason">
                                {{ leave.reason || ('No reason provided' | t) }}
                            </span>
                        </td>

                        <td data-label="Status" class="py-3 px-4 text-center">
                            <span class="status-badge"
                                [ngClass]="{
                                  'status-approved': getStatusText(leave.status) === 'Approved',
                                  'status-pending': getStatusText(leave.status) === 'Pending',
                                  'status-rejected': getStatusText(leave.status) === 'Rejected'
                                }">
                                <i class="bi me-1"
                                    [ngClass]="{
         'bi-check-circle-fill': getStatusText(leave.status) === 'Approved',
         'bi-hourglass-split': getStatusText(leave.status) === 'Pending',
         'bi-x-circle-fill': getStatusText(leave.status) === 'Rejected'
       }"></i>
                                {{ getStatusText(leave.status) }}
                            </span>
                            <div *ngIf="getStatusText(leave.status) === 'Rejected' && leave.rejectionReason"
                                class="mt-1">
                                <small class="text-danger d-block" [title]="leave.rejectionReason">
                                    <i class="bi bi-chat-left-text-fill me-1"></i>
                                    <span class="d-inline-block text-truncate" style="max-width: 150px;">{{ leave.rejectionReason }}</span>
                                </small>
                            </div>
                        </td>

                        <td *ngIf="isAdminOrHR" data-label="Actions" class="py-3 px-4 text-end actions-cell">
                            <div
                                *ngIf="getStatusText(leave.status) === 'Pending'"
                                class="d-flex justify-content-end gap-2">
                                <button
                                    class="btn btn-sm btn-success rounded-3 shadow-sm px-3"
                                    (click)="changeStatus(leave.id, 1)">
                                    {{ 'Approve' | t }}
                                </button>
                                <button
                                    class="btn btn-sm btn-outline-danger rounded-3 px-3"
                                    (click)="changeStatus(leave.id, 2)">
                                    {{ 'Reject' | t }}
                                </button>
                            </div>
                            <span
                                *ngIf="getStatusText(leave.status) !== 'Pending'"
                                class="text-muted small">{{ 'Processed' | t }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="leavesList.length > 0" class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                {{ 'Showing' | t }} {{ (currentPage - 1) * itemsPerPage + 1 }} {{ 'to' | t }} {{ getMathMin(currentPage * itemsPerPage, leavesList.length) }} {{ 'of' | t }} {{ leavesList.length }} {{ 'entries' | t }}
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">{{ 'Previous' | t }}</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">{{ 'Next' | t }}</a>
                </li>
            </ul>
        </div>
    </div>


<div class="modal fade" id="leaveModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow rounded-4">
            <div class="modal-header border-bottom-0 pt-4 px-4">
                <h5 class="modal-title fw-bold text-dark"><i
                        class="bi bi-send-plus text-primary me-2"></i>New Leave
                    Request</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <form #leaveForm="ngForm">

                    <div class="mb-4">
                        <label
                            class="form-label fw-semibold text-secondary small">Leave
                            Type *</label>
                        <select class="form-select bg-light border-0"
                            name="leaveType" [(ngModel)]="leaveData.leaveType"
                            required>
                            <option *ngFor="let type of leaveTypes"
                                [value]="type.id">{{ type.name }}</option>
                        </select>
                    </div>

                    <div class="row mb-4">
                        <div class="col-6">
                            <label
                                class="form-label fw-semibold text-secondary small">Start
                                Date *</label>
                            <input type="date"
                                class="form-control bg-light border-0"
                                name="startDate"
                                [(ngModel)]="leaveData.startDate"
                                [min]="getToday()" required>
                        </div>
                        <div class="col-6">
                            <label
                                class="form-label fw-semibold text-secondary small">End
                                Date *</label>
                            <input type="date"
                                class="form-control bg-light border-0"
                                name="endDate" [(ngModel)]="leaveData.endDate"
                                [min]="leaveData.startDate || getToday()" required>
                        </div>
                    </div>

                    <div class="mb-2">
                        <label
                            class="form-label fw-semibold text-secondary small">Reason
                            *</label>
                        <textarea class="form-control bg-light border-0"
                            name="reason" [(ngModel)]="leaveData.reason"
                            rows="3" required
                            placeholder="Explain why you need this leave..."></textarea>
                    </div>

                </form>
            </div>
            <div class="modal-footer border-top-0 pb-4 px-4">
                <button type="button"
                    class="btn btn-light px-4 rounded-3 fw-semibold"
                    data-bs-dismiss="modal">Cancel</button>
                <button type="button"
                    class="btn btn-primary px-4 rounded-3 fw-semibold"
                    (click)="submitLeaveRequest()"
                    [disabled]="leaveForm.invalid || isProcessing">
                    <span *ngIf="isProcessing"
                        class="spinner-border spinner-border-sm me-2"></span>
                    Submit Request
                </button>
            </div>
        </div>
    </div>
</div>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\leave\leave.component.ts


```ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaveService } from '../../core/services/leave.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './leave.component.html',
})
export class LeaveComponent implements OnInit {
  private leaveService = inject(LeaveService);
  private authService = inject(AuthService);

  allLeavesList: any[] = [];
  leavesList: any[] = [];

  leaveSearchQuery: string = '';
  selectedLeaveStatus: string = '';
  selectedLeaveType: string = '';

  isLoading: boolean = true;
  isProcessing: boolean = false;

  isAdminOrHR: boolean = false;
  employeeAnnualLeaveBalance: number | string = 14;

  leaveModal: any;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedLeaves() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.leavesList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.leavesList.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  leaveData = {
    leaveType: 0,
    startDate: '',
    endDate: '',
    reason: '',
  };

  leaveTypes = [
    { id: 0, name: 'Annual' },
    { id: 1, name: 'Sick' },
    { id: 2, name: 'Emergency' }, // âœ… ÙŠØ·Ø§Ø¨Ù‚ Backend enum: Emergency=2
    { id: 3, name: 'Unpaid' }, // âœ… ÙŠØ·Ø§Ø¨Ù‚ Backend enum: Unpaid=3
  ];

  ngOnInit() {
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.loadLeaves();
  }

  loadLeaves() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª
    this.isLoading = true;

    const request = this.isAdminOrHR
      ? this.leaveService.getAllLeaves()
      : this.leaveService.getMyLeaves();

    request.subscribe({
      next: (res: any) => {
        let extracted: any[] = [];

        if (Array.isArray(res)) {
          extracted = res;
        } else if (res?.data?.items && Array.isArray(res.data.items)) {
          extracted = res.data.items;
        } else if (res?.data && Array.isArray(res.data)) {
          extracted = res.data;
        }

        this.allLeavesList = extracted;
        this.leavesList = [...this.allLeavesList];

        if (this.isAdminOrHR && this.leavesList.length > 0) {
          this.leavesList.sort((a, b) => {
            const statusA = this.getStatusText(a.status);
            const statusB = this.getStatusText(b.status);

            if (statusA === 'Pending' && statusB !== 'Pending') return -1;
            if (statusA !== 'Pending' && statusB === 'Pending') return 1;

            return (
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            );
          });
        } else if (!this.isAdminOrHR) {
          // âœ… Backend ÙŠÙØ±Ø¬Ø¹ strings: 'Approved', 'Annual'
          const approvedAnnualLeavesDays = this.allLeavesList
            .filter(
              (l: any) => l.status === 'Approved' && l.leaveType === 'Annual',
            )
            .reduce((acc: number, l: any) => acc + (l.totalDays || 0), 0);
          this.employeeAnnualLeaveBalance = 14 - approvedAnnualLeavesDays;
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching leaves:', err);
        this.isLoading = false;
        this.leavesList = [];
      },
    });
  }

  filterLeaves() {
    // ÙÙ„ØªØ±Ø© Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª
    this.leavesList = this.allLeavesList.filter((l) => {
      let matchesSearch = true;
      if (this.leaveSearchQuery) {
        const query = this.leaveSearchQuery.toLowerCase();
        const empName = (l.employeeName || '').toLowerCase();
        const empId = String(l.employeeId || '');
        const reason = (l.reason || '').toLowerCase();
        matchesSearch =
          empName.includes(query) ||
          empId.includes(query) ||
          reason.includes(query);
      }

      let matchesStatus = true;
      if (this.selectedLeaveStatus) {
        matchesStatus =
          this.getStatusText(l.status).toLowerCase() ===
          this.selectedLeaveStatus.toLowerCase();
      }

      let matchesType = true;
      if (this.selectedLeaveType) {
        // Ø§Ù„Ù€ backend ÙŠØ±Ø¬Ø¹ string Ù…Ø«Ù„ "Annual" Ø£Ùˆ Ø±Ù‚Ù… Ù…Ø«Ù„ 0
        // Ù†Ø­ÙˆÙ‘Ù„ ÙƒÙ„Ø§Ù‡Ù…Ø§ Ù„Ø§Ø³Ù… ÙˆÙ†Ù‚Ø§Ø±Ù† Ø¨Ù€ case-insensitive
        const leaveTypeName = this.getLeaveTypeText(l.leaveType).toLowerCase();
        matchesType = leaveTypeName === this.selectedLeaveType.toLowerCase();
      }

      return matchesSearch && matchesStatus && matchesType;
    });

    this.currentPage = 1;
    if (this.leavesList.length > 0) {
      this.leavesList.sort((a, b) => {
        if (this.isAdminOrHR) {
          const statusA = this.getStatusText(a.status);
          const statusB = this.getStatusText(b.status);
          if (statusA === 'Pending' && statusB !== 'Pending') return -1;
          if (statusA !== 'Pending' && statusB === 'Pending') return 1;
        }
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      });
    }
  }

  getStatusText(statusCode: any): string {
    // âœ… Backend ÙŠÙØ±Ø¬Ø¹ string Ù…Ø¨Ø§Ø´Ø±Ø© Ù…Ù† MappingProfile (.ToString())
    if (typeof statusCode === 'string' && isNaN(Number(statusCode))) {
      return statusCode; // 'Pending' | 'Approved' | 'Rejected'
    }
    // ØªÙˆØ§ÙÙ‚ÙŠØ© Ù…Ø¹ Ø§Ù„Ù‚ÙŠÙ… Ø§Ù„Ø±Ù‚Ù…ÙŠØ© Ø§Ù„Ù‚Ø¯ÙŠÙ…Ø©
    if (statusCode === 0 || statusCode === '0') return 'Pending';
    if (statusCode === 1 || statusCode === '1') return 'Approved';
    if (statusCode === 2 || statusCode === '2') return 'Rejected';
    return statusCode?.toString() || 'Unknown';
  }

  getLeaveTypeText(typeCode: any): string {
    // âœ… Backend ÙŠÙØ±Ø¬Ø¹ string Ù…Ø¨Ø§Ø´Ø±Ø©: 'Annual', 'Sick', 'Emergency', 'Unpaid'
    if (typeof typeCode === 'string' && isNaN(Number(typeCode))) {
      const found = this.leaveTypes.find(
        (t) => t.name.toLowerCase() === typeCode.toLowerCase(),
      );
      return found
        ? found.name
        : typeCode.charAt(0).toUpperCase() + typeCode.slice(1);
    }
    // ØªÙˆØ§ÙÙ‚ÙŠØ© Ù…Ø¹ Ø§Ù„Ù‚ÙŠÙ… Ø§Ù„Ø±Ù‚Ù…ÙŠØ©
    const type = this.leaveTypes.find((t) => t.id === Number(typeCode));
    return type ? type.name : typeCode != null ? String(typeCode) : 'Unknown';
  }

  openModal() {
    this.leaveData = { leaveType: 0, startDate: '', endDate: '', reason: '' };
    const modalEl = document.getElementById('leaveModal');
    if (modalEl) {
      this.leaveModal = new bootstrap.Modal(modalEl);
      this.leaveModal.show();
    }
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  submitLeaveRequest() {
    // Ø¥Ø±Ø³Ø§Ù„ Ø·Ù„Ø¨ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø©
    if (this.leaveData.startDate < this.getToday()) {
      Swal.fire('Invalid Date', 'Start Date cannot be in the past.', 'warning');
      return;
    }

    if (this.leaveData.endDate < this.leaveData.startDate) {
      Swal.fire(
        'Invalid Date',
        'End Date cannot be before the Start Date.',
        'warning',
      );
      return;
    }

    this.isProcessing = true;
    const payload = {
      leaveType: Number(this.leaveData.leaveType),
      startDate: new Date(this.leaveData.startDate).toISOString(),
      endDate: new Date(this.leaveData.endDate).toISOString(),
      reason: this.leaveData.reason,
      status: 0,
    };

    this.leaveService.applyLeave(payload).subscribe({
      next: () => {
        this.isProcessing = false;
        this.leaveModal.hide();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.loadLeaves();
      },
      error: (err) => {
        this.isProcessing = false;
        Swal.fire(
          'Error',
          getFriendlyErrorMessage(
            err,
            'Failed to submit leave request. Please try again.',
          ),
          'warning',
        );
      },
    });
  }

  changeStatus(id: number, newStatusCode: number) {
    // ØªØºÙŠÙŠØ± Ø§Ù„Ø­Ø§Ù„Ø©
    if (newStatusCode === 2) {
      Swal.fire({
        title: 'Reject Leave Request',
        text: 'Please provide a reason for rejection:',
        input: 'textarea',
        inputPlaceholder: 'Type your reason here...',
        showCancelButton: true,
        confirmButtonText: 'Reject',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#dc3545',
        inputValidator: (value) => {
          if (!value || value.trim() === '') {
            return 'You need to write a rejection reason!';
          }
          return null;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.executeStatusChange(id, newStatusCode, result.value);
        }
      });
    } else {
      this.executeStatusChange(id, newStatusCode);
    }
  }

  private executeStatusChange(
    id: number,
    newStatusCode: number,
    rejectionReason?: string,
  ) {
    this.leaveService
      .updateLeaveStatus(id, newStatusCode, rejectionReason)
      .subscribe({
        next: () => {
          Swal.fire('Updated!', 'Status changed.', 'success');
          this.loadLeaves();
        },
        error: (err) => {
          console.error('Status update error:', err);
          Swal.fire(
            'Error!',
            getFriendlyErrorMessage(
              err,
              'Failed to update leave status. Please try again.',
            ),
            'error',
          );
        },
      });
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\leave-form\leave-form.component.css


```css


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\leave-form\leave-form.component.html


```html

<div class="container mt-4" style="max-width: 600px;">
    <div class="card shadow-sm border-0 rounded-3">
        <div class="card-header bg-white border-0 pt-4 pb-0 px-4">
            <h3 class="fw-bold text-secondary mb-0">Apply for Leave</h3>
        </div>

        <div class="card-body p-4">
            <form [formGroup]="leaveForm" (ngSubmit)="onSubmit()">

                <div class="mb-3">
                    <label class="form-label fw-bold text-muted small">Leave
                        Type</label>
                    <select class="form-select bg-light" formControlName="leaveType">
                        <option value="" disabled selected>Select Leave
                            Type</option>
                        <!-- âœ… Ø§Ø³ØªØ®Ø¯Ù… Ø£Ø±Ù‚Ø§Ù… ØªØ·Ø§Ø¨Ù‚ Backend enum: Annual=0, Sick=1, Emergency=2, Unpaid=3 -->
                        <option value="0">Annual</option>
                        <option value="1">Sick</option>
                        <option value="2">Emergency</option>
                        <option value="3">Unpaid</option>
                    </select>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label fw-bold text-muted small">Start
                            Date</label>
                        <input type="date" class="form-control bg-light" formControlName="startDate">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label fw-bold text-muted small">End
                            Date</label>
                        <input type="date" class="form-control bg-light" formControlName="endDate">
                    </div>
                </div>

                <div class="mb-4">
                    <label class="form-label fw-bold text-muted small">Reason</label>
                    <textarea class="form-control bg-light" formControlName="reason" rows="3"
                        placeholder="Explain your reason..."></textarea>
                </div>

                <div class="d-flex justify-content-end gap-2">
                    <a routerLink="/leave" class="btn btn-light px-4 fw-bold text-muted">Cancel</a>
                    <button type="submit" class="btn btn-primary px-5 fw-bold" [disabled]="isLoading">
                        <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                        {{ isLoading ? loadingMessage : 'Submit Request' }}
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\leave-form\leave-form.component.ts


```ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LeaveService } from '../../core/services/leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './leave-form.component.html',
})
export class LeaveFormComponent {
  private leaveService = inject(LeaveService);
  private router = inject(Router);

  isLoading = false;
  loadingMessage = 'Submitting...';
  private slowWarningTimer: any;

  leaveForm = new FormGroup({
    leaveType: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    reason: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(500),
    ]),
  });

  onSubmit() {
    if (this.leaveForm.invalid) {
      alert(
        'Please fill all required fields. Note: Reason must be at least 5 characters long.',
      );
      console.log('Form Errors:', this.leaveForm.errors);
      return;
    }

    this.isLoading = true;
    const formValue = this.leaveForm.value;

    const newLeave = {
      // âœ… Ø­ÙˆÙ‘Ù„ Ù„Ø±Ù‚Ù… Ø­ØªÙ‰ ÙŠØ·Ø§Ø¨Ù‚ Backend enum
      leaveType: Number(formValue.leaveType),
      startDate: new Date(formValue.startDate!).toISOString(),
      endDate: new Date(formValue.endDate!).toISOString(),
      reason: formValue.reason,
    };

    console.log('Sending Leave Data:', newLeave);

    // show slow-server warning after 6 seconds
    this.slowWarningTimer = setTimeout(() => {
      this.loadingMessage = 'Server is starting up, please wait a moment...';
    }, 6000);

    this.leaveService.applyLeave(newLeave).subscribe({
      next: (res) => {
        clearTimeout(this.slowWarningTimer);
        this.isLoading = false;
        Swal.fire({ icon: 'success', title: 'Done!', text: 'Leave request submitted successfully.', timer: 2000, showConfirmButton: false });
        this.router.navigate(['/leave']);
      },
      error: (err) => {
        clearTimeout(this.slowWarningTimer);
        this.isLoading = false;
        Swal.fire('Error', 'Could not submit leave request. Please try again.', 'error');
      },
    });
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\my-profile\my-profile.component.html


```html

<div class="d-flex justify-content-between align-items-center mb-4">
  <h2 class="fw-bold text-secondary">
    <i class="bi bi-person-badge-fill me-2"></i>{{ 'My Profile' | t }}
  </h2>
  <button class="btn btn-primary shadow-sm rounded-pill px-4 fw-semibold" (click)="openEditModal()" *ngIf="!isLoading">
    <i class="bi bi-pencil-square me-2"></i>{{ 'Edit Profile' | t }}
  </button>
</div>

<!-- â”€â”€â”€ Loading â”€â”€â”€ -->
@if (isLoading) {
<div class="text-center my-5">
  <div class="spinner-border text-primary" role="status"></div>
  <p class="mt-2 text-muted">Loading your profile...</p>
</div>
}

<!-- Ø¨Ø±ÙˆÙØ§ÙŠÙ„ Ø§Ù„Ø£Ø¯Ù…Ù† -->
@else if (isAdmin) {
<div class="row g-4">
  <!-- Left card: Avatar -->
  <div class="col-md-4">
    <div class="card shadow-sm border-0 h-100 text-center p-4">
      <div class="mb-3">
        <div class="profile-avatar mx-auto admin-avatar-bg">{{ initials }}</div>
      </div>
      <h4 class="fw-bold text-dark mb-1">{{ userName }}</h4>
      <p class="text-muted mb-1">{{ userRole }}</p>
      <p class="text-muted small mb-3">{{ userEmail }}</p>
      <span
        class="badge rounded-pill px-3 py-2 bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25">
        <i class="bi bi-shield-fill-check me-1"></i> System Admin
      </span>
    </div>
  </div>

  <!-- Right card: Details -->
  <div class="col-md-8">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
        <h5 class="fw-bold text-secondary">
          <i class="bi bi-person-lines-fill me-2 text-primary"></i>{{ 'Account Details' | t }}
        </h5>
      </div>
      <div class="card-body p-4">
        <div class="row g-4">
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-envelope me-1"></i> {{ 'Email Address' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ userEmail || 'â€”' }}</p>
          </div>
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-person-badge me-1"></i> {{ 'Role' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ userRole }}</p>
          </div>
        </div>

        <hr class="my-4 text-muted opacity-25">

        <h5 class="fw-bold text-secondary mb-3">
          <i class="bi bi-shield-check me-2 text-primary"></i>{{ 'Permissions' | t }}
        </h5>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="bg-light rounded-3 p-3 d-flex align-items-center gap-2">
              <i class="bi bi-people-fill text-primary fs-5"></i>
              <span class="fw-semibold small">{{ 'Employee Management' | t }}</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-light rounded-3 p-3 d-flex align-items-center gap-2">
              <i class="bi bi-gear-fill text-success fs-5"></i>
              <span class="fw-semibold small">{{ 'System Control' | t }}</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-light rounded-3 p-3 d-flex align-items-center gap-2">
              <i class="bi bi-cash-stack text-warning fs-5"></i>
              <span class="fw-semibold small">{{ 'Payroll Access' | t }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
}

<!-- â”€â”€â”€ EMPLOYEE PROFILE â”€â”€â”€ -->
@else if (profile) {
<div class="row g-4">
  <div class="col-md-4">
    <div class="card shadow-sm border-0 h-100 text-center p-4">
      <div class="mb-3">
        <div class="profile-avatar mx-auto">{{ getProfileInitials() }}</div>
      </div>
      <h4 class="fw-bold text-dark mb-1">{{ profile.fullName }}</h4>
      <p class="text-muted mb-3">{{ profile.positionTitle || 'Employee' }}</p>
      <span
        class="badge rounded-pill px-3 py-2 bg-success bg-opacity-10 text-success border border-success border-opacity-25">
        <i class="bi bi-check-circle-fill me-1"></i> Active
      </span>
    </div>
  </div>

  <div class="col-md-8">
    <div class="card shadow-sm border-0 h-100">
      <div class="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
        <h5 class="fw-bold text-secondary">
          <i class="bi bi-person-lines-fill me-2 text-primary"></i>{{ 'Personal Details' | t }}
        </h5>
      </div>
      <div class="card-body p-4">
        <div class="row g-4">
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-envelope me-1"></i> {{ 'Email Address' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ profile.email || 'â€”' }}</p>
          </div>
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-telephone me-1"></i> {{ 'Phone' | t }}
            </label>
            <!-- Ø±Ù‚Ù… Ø§Ù„ØªÙ„ÙÙˆÙ† -->
            <p class="fw-semibold text-dark fs-5 mb-0">
              {{ profile.phone || profile.phoneNumber || 'N/A' }}
            </p>
          </div>
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-building me-1"></i> {{ 'Department' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ profile.departmentName || 'N/A' }}</p>
          </div>
          <div class="col-md-6">
            <label class="text-muted small text-uppercase fw-bold">
              <i class="bi bi-calendar2-check me-1"></i> {{ 'Hire Date' | t }}
            </label>
            <p class="fw-semibold text-dark fs-5 mb-0">{{ profile.hireDate | date:'longDate' }}</p>
          </div>
        </div>

        <hr class="my-4 text-muted opacity-25">

        <h5 class="fw-bold text-secondary mb-3">
          <i class="bi bi-clock-history me-2 text-info"></i>{{ 'Status' | t }}
        </h5>
        <div class="row">
          <div class="col-md-6">
            <div class="bg-light rounded-3 p-3 d-flex align-items-center">
              <i class="bi bi-person-check-fill fs-2 text-success me-3"></i>
              <div>
                <h6 class="text-muted text-uppercase fw-bold small mb-1">{{ 'Status' | t }}</h6>
                <span class="fs-5 fw-bold text-success">{{ 'Active' | t }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
}

<!-- â”€â”€â”€ Not linked â”€â”€â”€ -->
@else if (!isLoading && !profile && !isAdmin) {
<div class="alert alert-warning d-flex align-items-center rounded-3" role="alert">
  <i class="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
  <div>
    <h5 class="alert-heading fw-bold mb-1">{{ 'Profile Not Linked' | t }}</h5>
    Your account is not yet linked to an employee profile. Please contact your administrator.
  </div>
</div>
}

<!-- â”€â”€â”€ Edit Profile Modal â”€â”€â”€ -->
<div class="modal fade" id="editProfileModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg rounded-4">
      <div class="modal-header border-bottom-0 pt-4 pb-0 px-4">
        <h5 class="fw-bold text-dark"><i class="bi bi-person-lines-fill text-primary me-2"></i>{{ 'Edit Profile' | t }}
        </h5>
        <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-4">
        <!-- Contact Info -->
        <h6 class="fw-bold text-secondary mb-3 small text-uppercase">{{ 'Contact Information' | t }}</h6>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">Email Address</label>
          <input type="email" class="form-control bg-light border-0 py-2" [(ngModel)]="editData.email"
            placeholder="name@example.com">
        </div>
        <div class="mb-4" *ngIf="profile">
          <label class="form-label text-muted small fw-semibold">{{ 'Phone' | t }}</label>
          <input type="text" class="form-control bg-light border-0 py-2" [(ngModel)]="editData.phone"
            placeholder="e.g. +123456789">
        </div>

        <hr class="my-4 text-muted opacity-25">

        <!-- Security -->
        <h6 class="fw-bold text-secondary mb-3 small text-uppercase">{{ 'Change Password' | t }}</h6>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">{{ 'Current Password' | t }}</label>
          <input type="password" class="form-control bg-light border-0 py-2" [(ngModel)]="pwdData.oldPassword"
            placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢">
        </div>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">{{ 'New Password' | t }}</label>
          <input type="password" class="form-control bg-light border-0 py-2" [(ngModel)]="pwdData.newPassword"
            placeholder="Min. 6 characters">
        </div>
        <div class="mb-3">
          <label class="form-label text-muted small fw-semibold">{{ 'Confirm New Password' | t }}</label>
          <input type="password" class="form-control bg-light border-0 py-2" [(ngModel)]="pwdData.confirmNewPassword"
            placeholder="Repeat new password">
        </div>
      </div>
      <div class="modal-footer border-top-0 pb-4 px-4">
        <button type="button" class="btn btn-light px-4 rounded-pill" data-bs-dismiss="modal">{{ 'Cancel' | t
          }}</button>
        <button type="button" class="btn btn-primary px-4 rounded-pill fw-semibold shadow-sm" (click)="saveProfile()"
          [disabled]="isUpdatingProfile || isChangingPwd">
          <span *ngIf="isUpdatingProfile || isChangingPwd" class="spinner-border spinner-border-sm me-2"></span> {{
          'Save Changes' | t }}
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .profile-avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4361ee, #3a0ca3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    font-weight: 800;
    color: #fff;
    line-height: 90px;
    text-align: center;
  }

  .admin-avatar-bg {
    background: linear-gradient(135deg, #1d4ed8, #7c3aed);
  }
</style>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\my-profile\my-profile.component.ts


```ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { getFriendlyErrorMessage } from '../../core/utils/error-handler.util';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './my-profile.component.html',
})
export class MyProfileComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  profile: any = null;
  isLoading: boolean = true;
  isAdmin: boolean = false;
  userName: string = '';
  userRole: string = '';
  userEmail: string = '';

  editData = { email: '', phone: '' };
  pwdData = { oldPassword: '', newPassword: '', confirmNewPassword: '' };
  isUpdatingProfile = false;
  isChangingPwd = false;

  ngOnInit() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª
    this.isAdmin = this.authService.isAdmin();
    this.userName = localStorage.getItem('user_name') || 'User';
    this.userRole = localStorage.getItem('user_role') || 'Employee';

    if (this.isAdmin) {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.userEmail =
            payload['email'] ||
            payload[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
            ] ||
            '';
        } catch {}
      }
      this.isLoading = false;
    } else {
      this.loadMyProfile();
    }
  }

  get initials(): string {
    return this.userName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getProfileInitials(): string {
    const name = this.profile?.fullName || this.userName || 'U';
    return name
      .split(' ')
      .map((w: string) => w[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  loadMyProfile() {
    // Ø¬Ù„Ø¨ Ø¨Ø±ÙˆÙØ§ÙŠÙ„ÙŠ
    this.isLoading = true;
    this.employeeService.getMyProfile().subscribe({
      next: (res: any) => {
        this.profile = res?.data || res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching my profile:', err);
        this.isLoading = false;
      },
    });
  }

  openEditModal() {
    this.editData.email = this.profile?.email || this.userEmail || '';
    this.editData.phone =
      this.profile?.phone || this.profile?.phoneNumber || '';
    this.pwdData = { oldPassword: '', newPassword: '', confirmNewPassword: '' };

    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  saveProfile() {
    // Ø­ÙØ¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª
    let requestsPending = 0;
    let hasError = false;

    // 1. Password Update
    if (this.pwdData.oldPassword && this.pwdData.newPassword) {
      requestsPending++;
      this.isChangingPwd = true;
      this.authService
        .changePassword({
          oldPassword: this.pwdData.oldPassword,
          newPassword: this.pwdData.newPassword,
        })
        .subscribe({
          next: () => {
            this.isChangingPwd = false;
            requestsPending--;
            this.checkDone(requestsPending, hasError);
          },
          error: (err) => {
            this.isChangingPwd = false;
            hasError = true;
            requestsPending--;
            Swal.fire(
              'Error',
              getFriendlyErrorMessage(
                err,
                'Failed to change password. Please check your current password and try again.',
              ),
              'error',
            );
            this.checkDone(requestsPending, hasError);
          },
        });
    }

    // 2. Profile Info Update
    const emailChanged =
      this.editData.email !== (this.profile?.email || this.userEmail);
    const phoneChanged =
      this.profile &&
      this.editData.phone !==
        (this.profile?.phone || this.profile?.phoneNumber);

    if (emailChanged || phoneChanged) {
      if (this.profile && this.profile.id) {
        requestsPending++;
        this.isUpdatingProfile = true;

        // Prepare updated employee object
        const updatedEmp = {
          ...this.profile,
          email: this.editData.email,
          phone: this.editData.phone,
          phoneNumber: this.editData.phone,
        };

        this.employeeService
          .updateEmployee(this.profile.id, updatedEmp)
          .subscribe({
            next: () => {
              this.isUpdatingProfile = false;
              this.profile.email = this.editData.email;
              this.profile.phone = this.editData.phone;
              this.userEmail = this.editData.email;

              requestsPending--;
              this.checkDone(requestsPending, hasError);
            },
            error: (err) => {
              this.isUpdatingProfile = false;
              hasError = true;
              requestsPending--;
              Swal.fire(
                'Error',
                getFriendlyErrorMessage(
                  err,
                  'Failed to update profile. Please try again.',
                ),
                'error',
              );
              this.checkDone(requestsPending, hasError);
            },
          });
      } else {
        // Admin without employee profile
        this.userEmail = this.editData.email;
        // There might not be an endpoint to update Admin user email alone,
        // but we update it locally for UX.
      }
    }

    if (requestsPending === 0 && !hasError) {
      this.closeModalAndShowSuccess();
    }
  }

  private checkDone(pending: number, hasError: boolean) {
    if (pending === 0 && !hasError) {
      this.closeModalAndShowSuccess();
    }
  }

  private closeModalAndShowSuccess() {
    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
    Swal.fire({
      icon: 'success',
      title: 'Profile Updated',
      text: 'Your profile has been updated successfully.',
      timer: 2000,
      showConfirmButton: false,
    });
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\positions\positions.component.css


```css

.input-group:focus-within .input-group-text,
.input-group:focus-within .form-control,
.input-group:focus-within .form-select {
  border-color: #0d6efd;
  box-shadow: none;
}

.input-group:focus-within {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
  border-radius: 0.375rem;
}

.form-control::placeholder {
  color: #adb5bd;
  font-size: 0.9rem;
}

.max-w-4xl {
  max-width: 900px;
  margin: 0 auto;
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\positions\positions.component.html


```html

<div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="fw-bold text-secondary">
        <i class="bi bi-briefcase-fill me-2"></i>{{ 'Job Positions' | t }}
    </h2>
    <button class="btn btn-primary shadow-sm fw-bold px-4"
        (click)="openModal()">
        <i class="bi bi-plus-lg me-1"></i> {{ 'Add Position' | t }}
    </button>
</div>

@if (isLoading) {
<div class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-2 text-muted">Synchronizing with server...</p>
</div>
} @else {
<div class="card shadow-sm border-0">
    <div class="table-responsive">
        <table class="table table-hover align-middle mb-0 text-center">
            <thead class="table-light text-uppercase small fw-bold">
                <tr>
                    <th>ID</th>
                    <th>{{ 'Job Title' | t }}</th>
                    <th>{{ 'Department' | t }}</th>
                    <th>{{ 'Salary Range (Min - Max)' | t }}</th>
                    <th>{{ 'Actions' | t }}</th>
                </tr>
            </thead>
            <tbody>
                @for (pos of positionsList; track pos.id) {
                <tr>
                    <td class="text-muted fw-bold">#{{ pos.id }}</td>
                    <td class="fw-bold text-dark">{{ pos.title }}</td>
                    <td>
                        <span
                            class="badge bg-light text-secondary border px-3 py-2 fw-semibold shadow-sm" style="font-size: 0.85rem;">
                            {{ getDepartmentName(pos.departmentId) }}
                        </span>
                    </td>
                    <td class="fw-semibold text-secondary">
                        {{ pos.salaryMin | currency }} -
                        <span class="text-success">{{ pos.salaryMax | currency
                            }}</span>
                    </td>
                    <td>
                        <button
                            class="btn btn-sm btn-outline-primary me-2 border-0 shadow-none"
                            (click)="openModal(pos)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button
                            class="btn btn-sm btn-outline-danger border-0 shadow-none"
                            (click)="onDelete(pos.id)">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </td>
                </tr>
                } @empty {
                <tr>
                    <td colspan="5" class="text-center py-5 text-muted">
                        <i
                            class="bi bi-briefcase fs-1 d-block mb-2 opacity-25"></i>
                        {{ 'No positions defined in the system.' | t }}
                    </td>
                </tr>
                }
            </tbody>
        </table>
    </div>
</div>
}

<div class="modal fade" id="positionModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
            <div
                class="modal-header border-bottom border-primary border-4 bg-light">
                <h5 class="modal-title text-primary fw-bold">
                    <i class="bi" [class.bi-plus-circle]="!isEditMode"
                        [class.bi-pencil-square]="isEditMode"></i>
                    {{ isEditMode ? ('Modify Position' | t) : ('Create New Position' | t) }}
                </h5>
                <button type="button" class="btn-close shadow-none"
                    data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body p-4">
                <form #positionForm="ngForm">
                    <div class="row g-3">
                        <div class="col-12">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Job
                                Title</label>
                            <input type="text" class="form-control" name="title"
                                [(ngModel)]="positionData.title" required
                                placeholder="e.g. Software Engineer">
                        </div>

                        <div class="col-12">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Department
                                Assignment</label>
                            <select class="form-select" name="deptId"
                                [(ngModel)]="positionData.departmentId"
                                required>
                                <option [ngValue]="null" disabled
                                    selected>Select target department</option>
                                @for (dept of departmentsList; track dept.id) {
                                <option [ngValue]="dept.id">{{ dept.name
                                    }}</option>
                                }
                            </select>
                        </div>

                        <div class="col-6 mt-4">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Minimum
                                Salary</label>
                            <input type="number" class="form-control"
                                name="sMin" [(ngModel)]="positionData.salaryMin"
                                min="0" required>
                        </div>

                        <div class="col-6 mt-4">
                            <label
                                class="fw-bold mb-1 small text-uppercase text-muted">Maximum
                                Salary</label>
                            <input type="number" class="form-control"
                                name="sMax" [(ngModel)]="positionData.salaryMax"
                                min="0" required>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer bg-light border-top-0">
                <button type="button" class="btn btn-secondary px-4 fw-bold"
                    data-bs-dismiss="modal">Cancel</button>
                <button type="button"
                    class="btn btn-primary px-4 fw-bold shadow-sm"
                    (click)="savePosition()"
                    [disabled]="positionForm.invalid || isProcessing">
                    @if(isProcessing) { <span
                        class="spinner-border spinner-border-sm me-2"></span> }
                    Confirm Action
                </button>
            </div>
        </div>
    </div>
</div>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\positions\positions.component.ts


```ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PositionService } from '../../core/services/position.service';
import { DepartmentService } from '../../core/services/department.service';
import Swal from 'sweetalert2';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './positions.component.html',
})
export class PositionsComponent implements OnInit {
  private positionService = inject(PositionService);
  private departmentService = inject(DepartmentService);

  positionsList: any[] = [];
  departmentsList: any[] = [];
  isLoading: boolean = true;
  isProcessing: boolean = false;

  positionModal: any;
  isEditMode: boolean = false;
  currentPositionId: number | null = null;

  positionData = {
    title: '',
    departmentId: null as number | null,
    salaryMin: 0,
    salaryMax: 0,
  };

  ngOnInit() {
    // Ø£ÙˆÙ„ ØªØ­Ù…ÙŠÙ„
    this.loadDepartments();
    this.loadPositions();
  }

  loadDepartments() {
    // Ø¬Ù„Ø¨ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        const extracted = Array.isArray(res) ? res : res?.data || [];
        this.departmentsList = Array.isArray(extracted) ? extracted : [];
      },
      error: (err) => console.error('Error fetching departments:', err),
    });
  }

  loadPositions() {
    // Ø¬Ù„Ø¨ Ø§Ù„Ù…Ù†Ø§ØµØ¨
    this.isLoading = true;
    this.positionService.getPositions().subscribe({
      next: (res: any) => {
        const extracted = Array.isArray(res) ? res : res?.data || [];
        this.positionsList = Array.isArray(extracted) ? extracted : [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching positions:', err);
        this.isLoading = false;
      },
    });
  }

  getDepartmentName(deptId: number): string {
    const dept = this.departmentsList.find((d) => d.id === deptId);
    return dept ? dept.name : `Dept #${deptId}`;
  }

  openModal(position: any = null) {
    // ÙØªØ­ Ø§Ù„Ù…ÙˆØ¯Ø§Ù„
    if (position) {
      this.isEditMode = true;
      this.currentPositionId = position.id;
      this.positionData = {
        title: position.title,
        departmentId: position.departmentId,
        salaryMin: position.salaryMin,
        salaryMax: position.salaryMax,
      };
    } else {
      this.isEditMode = false;
      this.currentPositionId = null;
      this.positionData = {
        title: '',
        departmentId: null,
        salaryMin: 0,
        salaryMax: 0,
      };
    }

    const modalEl = document.getElementById('positionModal');
    if (modalEl) {
      this.positionModal = new bootstrap.Modal(modalEl);
      this.positionModal.show();
    }
  }

  savePosition() {
    // Ø­ÙØ¸ Ø§Ù„Ù…Ø³Ù…Ù‰
    this.isProcessing = true;

    if (this.isEditMode && this.currentPositionId) {
      this.positionService
        .updatePosition(this.currentPositionId, this.positionData)
        .subscribe({
          next: () => this.handleSuccess('Position updated successfully'),
          error: (err) => this.handleError(err),
        });
    } else {
      this.positionService.createPosition(this.positionData).subscribe({
        next: () => this.handleSuccess('Position created successfully'),
        error: (err) => this.handleError(err),
      });
    }
  }

  onDelete(id: number) {
    // Ø­Ø°Ù Ø§Ù„Ù…Ø³Ù…Ù‰
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.positionService.deletePosition(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Position has been deleted.', 'success');
            this.loadPositions();
          },
          error: (err) => {
            console.error('Delete error:', err);
            Swal.fire('Error!', 'Failed to delete position.', 'error');
          },
        });
      }
    });
  }

  private handleSuccess(message: string) {
    this.isProcessing = false;
    this.positionModal.hide();
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
    this.loadPositions();
  }

  private handleError(err: any) {
    this.isProcessing = false;
    console.error('Position save error:', err);
    Swal.fire('Error', 'Failed to save position data.', 'error');
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\salary\salary.component.css


```css

.table th {
  border-bottom: 1px solid #f3f4f6 !important;
}

.table td {
  vertical-align: middle;
  border-bottom: 1px solid #f8f9fa;
}

.form-control:focus {
  box-shadow: none;
  border-color: #0d6efd;
  background-color: #ffffff !important;
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.table-responsive::-webkit-scrollbar {
  height: 6px;
}
.table-responsive::-webkit-scrollbar-thumb {
  background-color: #dee2e6;
  border-radius: 4px;
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\salary\salary.component.html


```html

<div class="page-container p-4">



    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
            <h3 class="fw-bold text-dark mb-1">{{ 'Salaries' | t }}</h3>
            <p class="text-muted small mb-0">{{ 'View and manage employee payroll records' | t }}</p>
        </div>
        <div class="d-flex align-items-center gap-2 flex-grow-1 justify-content-end">
            <div class="input-group shadow-sm" style="max-width: 350px;">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control border-start-0 ps-0"
                    placeholder="Search by name, ID, or amount..." [(ngModel)]="salarySearchQuery"
                    (input)="filterSalaries()">
            </div>

            <div class="dropdown">
                <button class="btn btn-outline-secondary shadow-sm" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false" title="Filter Salaries">
                    <i class="bi bi-funnel-fill"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end p-3 shadow-lg border-0 rounded-4" style="width: 250px;">
                    <h6 class="dropdown-header px-0 text-primary fw-bold mb-2">Filter Options</h6>

                    <div class="mb-3">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Year' | t }}</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedYear"
                            (change)="filterSalaries()">
                            <option value="">All Years</option>
                            <option *ngFor="let yr of uniqueYears" [value]="yr">{{ yr }}</option>
                        </select>
                    </div>

                    <div class="mb-2">
                        <label class="form-label small fw-semibold text-muted mb-1">{{ 'Month' | t }}</label>
                        <select class="form-select form-select-sm" [(ngModel)]="selectedMonth"
                            (change)="filterSalaries()">
                            <option value="">All Months</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                </div>
            </div>

            <button *ngIf="isAdmin" class="btn btn-primary px-4 py-2 rounded-3 fw-semibold shadow-sm text-nowrap"
                (click)="openModal()">
                <i class="bi bi-plus-lg me-2"></i> {{ 'Add Salary' | t }}
            </button>
        </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">

                <thead class="bg-light text-muted small text-uppercase" style="letter-spacing: 0.5px;">
                    <tr>
                        <th *ngIf="isAdminOrHR" class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Employee' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold">{{ 'Month' | t }}/{{ 'Year' | t }}</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold">{{ 'Base Salary' | t }}</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-success">{{ 'Allowances' | t }}</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-danger">{{ 'Deductions' | t }}</th>
                        <th class="py-3 px-3 border-bottom-0 fw-semibold text-primary">{{ 'Net Pay' | t }}</th>
                        <th class="py-3 px-4 border-bottom-0 fw-semibold text-end text-nowrap">{{ 'Actions' | t }}</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">

                    <tr *ngIf="isLoading">
                        <td colspan="7" class="text-center py-5 text-muted">
                            <span class="spinner-border spinner-border-sm me-2"></span>
                            {{ 'Loading...' | t }}
                        </td>
                    </tr>

                    <tr *ngIf="!isLoading && salariesList.length === 0">
                        <td [colSpan]="isAdminOrHR ? 7 : 6" class="text-center py-5">
                            <div class="d-flex flex-column align-items-center">
                                <div class="bg-light rounded-circle p-4 mb-3 d-flex align-items-center justify-content-center"
                                    style="width: 80px; height: 80px;">
                                    <i class="bi bi-wallet2 text-secondary fs-1"></i>
                                </div>
                                <h5 class="fw-bold text-dark mb-1">{{ 'No Data' | t }}</h5>
                                <p class="text-muted small mb-0">{{ 'No Data' | t }}</p>
                            </div>
                        </td>
                    </tr>

                    <tr *ngFor="let salary of paginatedSalaries">
                        <!-- Ø§Ø³Ù… Ø§Ù„Ù…ÙˆØ¸Ù Ù„Ù„Ø£Ø¯Ù…Ù† ÙˆØ§Ù„Ù€ hr -->
                        <td *ngIf="isAdminOrHR" data-label="Employee" class="py-3 px-4 fw-bold text-dark">
                            {{ salary.employeeName || '#' + salary.employeeId }}
                        </td>
                        <td data-label="Period" class="py-3 px-4">
                            <span class="badge bg-light text-dark border">{{
                                salary.month | number:'2.0' }} / {{ salary.year
                                }}</span>
                            <div class="text-muted mt-1" style="font-size: 0.7rem;">Eff: {{
                                salary.effectiveDate | date:'dd MMM yyyy'
                                }}</div>
                        </td>
                        <td data-label="Base Salary" class="py-3 px-3 text-secondary">${{ salary.baseAmount }}</td>
                        <td data-label="Allowances" class="py-3 px-3 text-success fw-medium">+${{ salary.allowances }}
                        </td>
                        <td data-label="Deductions" class="py-3 px-3 text-danger fw-medium">-${{ salary.deductions }}
                        </td>
                        <td data-label="Net Pay" class="py-3 px-3">
                            <span class="fw-bold text-primary fs-6">${{ salary.netAmount }}</span>
                            <div class="text-muted" style="font-size: 0.7rem;">Before Deductions: ${{ salary.grossAmount
                                }}</div>
                        </td>
                        <!-- ØµÙ„Ø§Ø­ÙŠØ§Øª Ø£Ø¯Ù…Ù† Ø¨Ø³ -->
                        <td data-label="Actions" class="py-3 px-4 text-end text-nowrap actions-cell">
                            <button class="btn btn-sm btn-outline-danger rounded-circle shadow-sm me-2"
                                (click)="downloadPayslip(salary)" title="Download Payslip (PDF)">
                                <i class="bi bi-file-earmark-pdf-fill"></i>
                            </button>
                            <button *ngIf="isAdmin" class="btn btn-sm btn-light text-primary rounded-circle shadow-sm"
                                (click)="openModal(salary)" title="Edit Record">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination Footer -->
        <div *ngIf="salariesList.length > 0"
            class="card-footer bg-white border-top-0 p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <small class="text-muted fw-medium">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ getMathMin(currentPage * itemsPerPage,
                salariesList.length) }} of {{ salariesList.length }} entries
            </small>
            <ul class="pagination pagination-sm mb-0 shadow-sm rounded-3">
                <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage - 1)">Previous</a>
                </li>
                <li class="page-item active">
                    <a class="page-link px-3 bg-primary border-primary">{{ currentPage }} / {{ totalPages }}</a>
                </li>
                <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link cursor-pointer px-3" (click)="changePage(currentPage + 1)">Next</a>
                </li>
            </ul>
        </div>
    </div>
</div>

<div class="modal fade" id="salaryModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow rounded-4">
            <div class="modal-header border-bottom-0 pt-4 pb-0 px-4">
                <h5 class="modal-title fw-bold text-dark">
                    <i class="bi"
                        [ngClass]="isEditMode ? 'bi-pencil-square text-primary' : 'bi-plus-circle text-primary'"></i>
                    {{ isEditMode ? ' Edit Salary Record' : ' Add New Salary' }}
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <form #salaryForm="ngForm">

                    <div class="mb-4 position-relative">
                        <label class="form-label fw-semibold text-secondary small">Employee <span
                                class="text-danger">*</span></label>
                        <div class="input-group">
                            <span class="input-group-text bg-light border-end-0"><i class="bi bi-person"></i></span>
                            <input type="text" class="form-control bg-light border-start-0" name="employeeSearchText"
                                [(ngModel)]="employeeSearchText" (ngModelChange)="onEmployeeSearchChange($event)"
                                (focus)="showEmployeeDropdown = true" (blur)="hideDropdownWithDelay()"
                                autocomplete="off" required placeholder="Search by name or ID...">
                        </div>

                        <!-- Custom Dropdown -->
                        <div class="dropdown-menu w-100 shadow-lg border-0 rounded-4 mt-2 py-2"
                            [class.show]="showEmployeeDropdown"
                            style="position: absolute; top: 100%; left: 0; max-height: 250px; overflow-y: auto; z-index: 1050;">

                            <ng-container *ngIf="filteredEmployeesList.length > 0; else noEmployees">
                                <button type="button"
                                    class="dropdown-item d-flex justify-content-between align-items-center py-2 px-3 border-bottom border-light"
                                    *ngFor="let emp of filteredEmployeesList" (mousedown)="selectEmployee(emp)"
                                    style="transition: background-color 0.2s;">
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                            style="width: 36px; height: 36px; font-size: 13px;">
                                            {{ emp.firstName[0] }}{{ emp.lastName[0] }}
                                        </div>
                                        <div class="d-flex flex-column">
                                            <span class="fw-semibold text-dark" style="font-size: 14px;">{{
                                                emp.firstName }} {{ emp.lastName }}</span>
                                        </div>
                                    </div>
                                    <span class="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-3 py-2"
                                        style="font-size: 11px;">ID: {{ emp.id }}</span>
                                </button>
                            </ng-container>

                            <ng-template #noEmployees>
                                <div class="text-center py-4 text-muted">
                                    <i class="bi bi-search mb-2 fs-4 text-black-50"></i>
                                    <p class="mb-0 small fw-semibold">No employees found.</p>
                                </div>
                            </ng-template>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <div class="col-6">
                            <label class="form-label fw-semibold text-secondary small">Month
                                <span class="text-danger">*</span></label>
                            <input type="number" class="form-control bg-light border-0" name="month"
                                [(ngModel)]="salaryData.month" required min="1" max="12">
                        </div>
                        <div class="col-6">
                            <label class="form-label fw-semibold text-secondary small">Year
                                <span class="text-danger">*</span></label>
                            <input type="number" class="form-control bg-light border-0" name="year"
                                [(ngModel)]="salaryData.year" required min="2000">
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-semibold text-secondary small">Base
                            Salary ($) <span class="text-danger">*</span></label>
                        <input type="number" class="form-control form-control-lg bg-light border-0" name="baseAmount"
                            [(ngModel)]="salaryData.baseAmount" required min="0">
                    </div>

                    <div class="row mb-4">
                        <div class="col-6">
                            <label class="form-label fw-semibold text-success small">Allowances
                                (+) <span class="text-danger">*</span></label>
                            <input type="number" class="form-control border-success border-opacity-25 bg-light"
                                name="allowances" [(ngModel)]="salaryData.allowances" required min="0">
                        </div>
                        <div class="col-6">
                            <label class="form-label fw-semibold text-danger small">Deductions
                                (-) <span class="text-danger">*</span></label>
                            <input type="number" class="form-control border-danger border-opacity-25 bg-light"
                                name="deductions" [(ngModel)]="salaryData.deductions" required min="0">
                        </div>
                    </div>

                    <div class="mb-2">
                        <label class="form-label fw-semibold text-secondary small">Effective
                            Date <span class="text-danger">*</span></label>
                        <input type="date" class="form-control bg-light border-0" name="effectiveDate"
                            [(ngModel)]="salaryData.effectiveDate" required>
                    </div>

                </form>
            </div>
            <div class="modal-footer border-top-0 pb-4 px-4">
                <button type="button" class="btn btn-light px-4 rounded-3 fw-semibold"
                    data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary px-4 rounded-3 fw-semibold" (click)="saveSalary()"
                    [disabled]="salaryForm.invalid || isProcessing || !salaryData.employeeId">
                    <span *ngIf="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                    {{ isProcessing ? 'Saving...' : 'Save Record' }}
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    .cursor-pointer {
        cursor: pointer;
    }

    /* Mobile Responsive Cards for Table */
    @media screen and (max-width: 768px) {

        .table-responsive table,
        .table-responsive thead,
        .table-responsive tbody,
        .table-responsive th,
        .table-responsive td,
        .table-responsive tr {
            display: block;
        }

        .table-responsive thead tr {
            display: none;
            /* Hide header row */
        }

        .table-responsive tr {
            border: 1px solid #e8ecf0;
            border-radius: 0.75rem;
            margin-bottom: 1rem;
            padding: 0.5rem;
            background: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .table-responsive td {
            border: none;
            border-bottom: 1px solid #f0f2f5;
            position: relative;
            padding-left: 45% !important;
            text-align: right !important;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            min-height: 50px;
        }

        .table-responsive td:last-child {
            border-bottom: 0;
        }

        .table-responsive td::before {
            content: attr(data-label);
            position: absolute;
            left: 1rem;
            width: 40%;
            text-align: left;
            font-weight: 700;
            color: #8592a3;
            font-size: 0.75rem;
            text-transform: uppercase;
            top: 50%;
            transform: translateY(-50%);
        }

        .actions-cell {
            justify-content: flex-end !important;
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
        }
    }
</style>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\features\salary\salary.component.ts


```ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Ù„Ø§Ø²Ù… Ù„Ù„Ù€ forms
import { SalaryService } from '../../core/services/salary.service';
import { EmployeeService } from '../../core/services/employee.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './salary.component.html',
})
export class SalaryComponent implements OnInit {
  private salaryService = inject(SalaryService);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  allSalariesList: any[] = [];
  salariesList: any[] = [];
  isLoading: boolean = true;
  isAdmin: boolean = false; // Ø£Ø¯Ù…Ù† (ÙŠØ¶ÙŠÙ ÙˆÙŠØ¹Ø¯Ù„)
  isAdminOrHR: boolean = false; // Ø£Ø¯Ù…Ù† Ø£Ùˆ hr (ÙŠØ´ÙˆÙ Ø¨Ø³)
  isProcessing: boolean = false;

  salaryModal: any;
  isEditMode: boolean = false;
  currentSalaryId: number | null = null;

  employeesList: any[] = [];
  filteredEmployeesList: any[] = [];
  showEmployeeDropdown: boolean = false;
  employeeSearchText: string = '';

  salarySearchQuery: string = '';
  selectedYear: string = '';
  selectedMonth: string = '';
  uniqueYears: number[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedSalaries() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.salariesList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.salariesList.length / this.itemsPerPage) || 1;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getMathMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  salaryData = {
    employeeId: null as number | null,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    baseAmount: 0,
    allowances: 0,
    deductions: 0,
    effectiveDate: new Date().toISOString().split('T')[0],
  };

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.loadSalaries();
    if (this.isAdmin) {
      this.loadEmployees();
    }
  }

  loadEmployees() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        const extractedData = Array.isArray(res) ? res : res?.data || [];
        this.employeesList = Array.isArray(extractedData) ? extractedData : [];
        this.filteredEmployeesList = [...this.employeesList];
      },
      error: (err: any) => {
        console.error('Error fetching employees:', err);
      },
    });
  }

  onEmployeeSearchChange(val: string) {
    this.showEmployeeDropdown = true;
    if (!val) {
      this.filteredEmployeesList = [...this.employeesList];
      this.salaryData.employeeId = null;
      return;
    }

    const query = val.toLowerCase();
    this.filteredEmployeesList = this.employeesList.filter((emp) => {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      const idStr = String(emp.id);
      return fullName.includes(query) || idStr.includes(query);
    });

    // Reset selected ID if typing changes
    this.salaryData.employeeId = null;
  }

  selectEmployee(emp: any) {
    this.salaryData.employeeId = emp.id;
    this.employeeSearchText = `${emp.firstName} ${emp.lastName}`;
    this.showEmployeeDropdown = false;
  }

  hideDropdownWithDelay() {
    setTimeout(() => {
      this.showEmployeeDropdown = false;
    }, 200);
  }

  loadSalaries() {
    // ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø±ÙˆØ§ØªØ¨
    this.isLoading = true;
    const request = this.isAdminOrHR
      ? this.salaryService.getAllSalaries()
      : this.salaryService.getMySalaries();

    request.subscribe({
      next: (res: any) => {
        const extractedData = Array.isArray(res) ? res : res?.data || [];
        this.allSalariesList = Array.isArray(extractedData)
          ? extractedData
          : [];
        this.salariesList = [...this.allSalariesList];

        const years = this.allSalariesList
          .map((s) => s.year)
          .filter((y) => y != null);
        this.uniqueYears = Array.from(new Set(years))
          .sort()
          .reverse() as number[];

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching salaries:', err);
        this.isLoading = false;
      },
    });
  }

  filterSalaries() {
    // ÙÙ„ØªØ±Ø© Ø§Ù„Ø±ÙˆØ§ØªØ¨
    this.salariesList = this.allSalariesList.filter((s) => {
      let matchesSearch = true;
      if (this.salarySearchQuery) {
        const query = this.salarySearchQuery.toLowerCase();
        const empName = (s.employeeName || '').toLowerCase();
        const empId = String(s.employeeId || '');
        const baseAmt = String(s.baseAmount || '');
        matchesSearch =
          empName.includes(query) ||
          empId.includes(query) ||
          baseAmt.includes(query);
      }

      let matchesYear = true;
      if (this.selectedYear) {
        matchesYear = String(s.year) === this.selectedYear;
      }

      let matchesMonth = true;
      if (this.selectedMonth) {
        matchesMonth = String(s.month) === this.selectedMonth;
      }

      return matchesSearch && matchesYear && matchesMonth;
    });

    if (this.salariesList.length > 0) {
      this.salariesList.sort((a, b) => {
        if (b.year !== a.year) {
          return b.year - a.year;
        }
        return b.month - a.month;
      });
    }

    this.currentPage = 1; // Reset to first page
  }

  openModal(salary: any = null) {
    if (salary) {
      this.isEditMode = true;
      this.currentSalaryId = salary.id;
      this.salaryData = {
        employeeId: salary.employeeId,
        month: salary.month,
        year: salary.year,
        baseAmount: salary.baseAmount,
        allowances: salary.allowances,
        deductions: salary.deductions,
        effectiveDate: salary.effectiveDate
          ? salary.effectiveDate.split('T')[0]
          : '',
      };
      const emp = this.employeesList.find((e) => e.id === salary.employeeId);
      this.employeeSearchText = emp
        ? `${emp.firstName} ${emp.lastName}`
        : salary.employeeId
          ? String(salary.employeeId)
          : '';
    } else {
      this.isEditMode = false;
      this.currentSalaryId = null;
      this.employeeSearchText = '';
      this.salaryData = {
        employeeId: null,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        baseAmount: 0,
        allowances: 0,
        deductions: 0,
        effectiveDate: new Date().toISOString().split('T')[0],
      };
    }

    this.filteredEmployeesList = [...this.employeesList];
    this.showEmployeeDropdown = false;

    const modalEl = document.getElementById('salaryModal');
    if (modalEl) {
      this.salaryModal = new bootstrap.Modal(modalEl);
      this.salaryModal.show();
    }
  }

  saveSalary() {
    // Ø­ÙØ¸ Ø§Ù„Ø±Ø§ØªØ¨
    this.isProcessing = true;

    const isoDate = new Date(this.salaryData.effectiveDate).toISOString();

    const base = Number(this.salaryData.baseAmount) || 0;
    const allow = Number(this.salaryData.allowances) || 0;
    const deduct = Number(this.salaryData.deductions) || 0;

    const calculatedGross = base + allow;
    const calculatedNet = calculatedGross - deduct;

    if (this.isEditMode && this.currentSalaryId) {
      const updatePayload = {
        baseAmount: base,
        allowances: allow,
        deductions: deduct,
        grossAmount: calculatedGross,
        netAmount: calculatedNet,
        effectiveDate: isoDate,
      };

      this.salaryService
        .updateSalary(this.currentSalaryId, updatePayload)
        .subscribe({
          next: () => this.handleSuccess('Salary updated successfully'),
          error: (err) => this.handleError(err),
        });
    } else {
      const createPayload = {
        ...this.salaryData,
        grossAmount: calculatedGross,
        netAmount: calculatedNet,
        effectiveDate: isoDate,
      };

      this.salaryService.createSalary(createPayload).subscribe({
        next: () => this.handleSuccess('Salary record added successfully'),
        error: (err) => this.handleError(err),
      });
    }
  }

  private handleSuccess(message: string) {
    this.isProcessing = false;
    this.salaryModal.hide();
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
    this.loadSalaries();
  }

  private handleError(err: any) {
    this.isProcessing = false;
    console.error('Salary save error:', err);
    Swal.fire(
      'Error',
      'Failed to save salary data. Check console for details.',
      'error',
    );
  }

  downloadPayslip(salary: any) {
    // ØªÙ†Ø²ÙŠÙ„ ÙƒØ´Ù Ø§Ù„Ø±Ø§ØªØ¨
    const doc = new jsPDF();

    // Add Header
    doc.setFontSize(22);
    doc.setTextColor(13, 110, 253);
    doc.text('Kawadir HRMS', 14, 20);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Salary Payslip', 14, 30);

    const today = new Date();
    const dateGen = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date Generated: ${dateGen}`, 14, 38);

    const empName = salary.employeeName || `Employee #${salary.employeeId}`;
    const period = `${salary.month} / ${salary.year}`;

    const effObj = new Date(salary.effectiveDate);
    const effDate = `${effObj.getFullYear()}-${String(effObj.getMonth() + 1).padStart(2, '0')}-${String(effObj.getDate()).padStart(2, '0')}`;

    // Employee Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Employee Name: ${empName}`, 14, 50);
    doc.text(`Payroll Period: ${period}`, 14, 58);
    doc.text(`Effective Date: ${effDate}`, 14, 66);

    // Salary Details Table
    autoTable(doc, {
      startY: 75,
      head: [['Description', 'Amount (JD)']],
      body: [
        ['Base Salary', `${salary.baseAmount} JD`],
        ['Allowances', `+${salary.allowances} JD`],
        ['Gross Salary', `${salary.grossAmount} JD`],
        ['Deductions', `-${salary.deductions} JD`],
      ],
      theme: 'grid',
      headStyles: {
        fillColor: [240, 242, 245],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
      },
      bodyStyles: { textColor: [50, 50, 50] },
      alternateRowStyles: { fillColor: [252, 252, 252] },
    });

    const finalY = (doc as any).lastAutoTable.finalY || 130;

    // Net Pay Highlight
    doc.setFontSize(14);
    doc.setTextColor(25, 135, 84);
    doc.setFont('helvetica', 'bold');
    doc.text(`Net Pay: ${salary.netAmount} JD`, 14, finalY + 15);

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(
      'This is a system generated payslip and requires no signature.',
      14,
      finalY + 40,
    );

    // Download
    const fileName = `Payslip_${empName.replace(/ /g, '_')}_${salary.month}_${salary.year}.pdf`;
    doc.save(fileName);
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\shared\header\header.component.css


```css

/* â”€â”€ Settings Button â”€â”€ */
.settings-btn {
  transition: transform 0.3s ease;
}

.settings-btn:hover {
  transform: rotate(90deg);
}

.settings-btn:hover i {
  color: #0d6efd !important;
}

/* â”€â”€ Settings Panel â”€â”€ */
.settings-panel {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* â”€â”€ Settings Icon Circle â”€â”€ */
.settings-icon-circle {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background: linear-gradient(135deg, #fff3cd, #ffeaa7);
  color: #f39c12;
  transition: all 0.3s ease;
}

.settings-icon-circle.active {
  background: linear-gradient(135deg, #2d3436, #636e72);
  color: #ffeaa7;
}

.settings-icon-circle.lang {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
}

/* â”€â”€ Language Toggle Button â”€â”€ */
.lang-toggle-btn {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  border: none;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
}

.lang-toggle-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
  color: #fff;
}

/* â”€â”€ Dark Mode Toggle Switch â”€â”€ */
.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.cursor-pointer {
  cursor: pointer;
}

/* â”€â”€ Sticky Header â”€â”€ */
.header-bar {
  position: sticky;
  top: 0;
  z-index: 1020;
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\shared\header\header.component.html


```html

<nav class="navbar navbar-expand bg-white border-bottom shadow-sm px-4 py-2 header-bar">
    <div class="container-fluid px-2">
        <div class="d-flex align-items-center gap-3 ms-2">
            <button
                class="btn btn-light border-0 shadow-none d-flex align-items-center justify-content-center p-2"
                (click)="toggleSidebar()">
                <i class="bi bi-list fs-4 text-secondary"></i>
            </button>
        </div>

        <ul class="navbar-nav ms-auto align-items-center flex-row">

            <!-- âœ… Settings Dropdown -->
            <li class="nav-item me-3 dropdown">
                <button
                    class="btn btn-light btn-sm border-0 shadow-none settings-btn"
                    id="settingsDropdown" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bi bi-gear-fill fs-5 text-secondary"></i>
                </button>

                <div class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 p-0 settings-panel overflow-hidden"
                    aria-labelledby="settingsDropdown"
                    style="width: 280px;">

                    <!-- Header -->
                    <div class="p-3 border-bottom" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-gear-wide-connected text-white fs-5"></i>
                            <span class="fw-bold text-white">{{ 'Settings' | t }}</span>
                        </div>
                    </div>

                    <!-- Theme Toggle -->
                    <div class="px-3 py-3 border-bottom">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <div class="settings-icon-circle" [class.active]="settingsService.isDarkMode">
                                    <i class="bi" [ngClass]="settingsService.isDarkMode ? 'bi-moon-stars-fill' : 'bi-sun-fill'"></i>
                                </div>
                                <div>
                                    <p class="mb-0 fw-semibold small text-dark">{{ 'Theme' | t }}</p>
                                    <p class="mb-0 text-muted" style="font-size: 0.7rem;">
                                        {{ settingsService.isDarkMode ? ('Dark Mode' | t) : ('Light Mode' | t) }}
                                    </p>
                                </div>
                            </div>
                            <div class="form-check form-switch mb-0">
                                <input class="form-check-input cursor-pointer" type="checkbox" role="switch"
                                    id="themeToggle"
                                    [checked]="settingsService.isDarkMode"
                                    (change)="settingsService.toggleTheme()"
                                    style="width: 2.5em; height: 1.25em;">
                            </div>
                        </div>
                    </div>

                    <!-- Language Toggle -->
                    <div class="px-3 py-3">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-2">
                                <div class="settings-icon-circle lang">
                                    <i class="bi bi-translate"></i>
                                </div>
                                <div>
                                    <p class="mb-0 fw-semibold small text-dark">{{ 'Language' | t }}</p>
                                    <p class="mb-0 text-muted" style="font-size: 0.7rem;">
                                        {{ settingsService.language === 'ar' ? 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©' : 'English' }}
                                    </p>
                                </div>
                            </div>
                            <button class="btn btn-sm px-3 py-1 rounded-pill fw-semibold lang-toggle-btn"
                                (click)="settingsService.toggleLanguage(); $event.stopPropagation()">
                                {{ settingsService.language === 'ar' ? 'EN' : 'AR' }}
                            </button>
                        </div>
                    </div>
                </div>
            </li>

            <!-- Notifications Dropdown -->
            <li class="nav-item me-4 dropdown">
                <button
                    class="btn btn-light btn-sm border-0 position-relative shadow-none"
                    id="notificationDropdown" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bi bi-bell-fill fs-5 text-secondary"></i>

                    @if (unreadCount > 0) {
                    <span
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {{ unreadCount }}
                    </span>
                    }
                </button>

                <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-0"
                    aria-labelledby="notificationDropdown"
                    style="width: 320px; max-height: 400px; overflow-y: auto;">

                    <li
                        class="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-dark">{{ 'Notifications' | t }}</span>
                        @if (unreadCount > 0) {
                        <span class="badge bg-primary rounded-pill">{{
                            unreadCount }} {{ 'New' | t }}</span>
                        }
                    </li>

                    @for (note of notifications; track note.id) {
                    <li>
                        <a class="dropdown-item py-3 border-bottom"
                            href="javascript:void(0)"
                            [class.bg-light]="!note.isRead"
                            (click)="markAsRead(note)">

                            <div
                                class="d-flex w-100 justify-content-between align-items-center mb-1">
                                <h6 class="mb-0 text-truncate fw-bold text-dark"
                                    style="max-width: 200px;">
                                    {{ note.title || ('System Alert' | t) }}
                                </h6>
                                <small class="text-muted"
                                    style="font-size: 0.75rem;">{{
                                    note.createdAt | date:'shortTime' }}</small>
                            </div>

                            <p class="mb-0 text-secondary text-wrap"
                                style="font-size: 0.85rem;">
                                {{ note.message }}
                            </p>
                        </a>
                    </li>
                    } @empty {
                    <li class="p-4 text-center text-muted">
                        <i
                            class="bi bi-bell-slash fs-3 d-block mb-2 text-light-gray"></i>
                        {{ 'No new notifications' | t }}
                    </li>
                    }
                </ul>
            </li>

            <li class="nav-item">
                <div class="d-flex align-items-center">

                </div>
            </li>

        </ul>
    </div>
</nav>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\shared\header\header.component.ts


```ts

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { SidebarService } from '../../core/services/sidebar.service';
import { SettingsService } from '../../core/services/settings.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private sidebarService = inject(SidebarService);

  // âœ… public Ø­ØªÙ‰ Ù†Ø³ØªØ®Ø¯Ù…Ù‡ ÙÙŠ Ø§Ù„Ù€ template
  settingsService = inject(SettingsService);

  notifications: any[] = [];
  unreadCount: number = 0;
  private pollingSub?: Subscription;

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit() {
    this.loadNotifications();
    this.pollingSub = interval(5000).subscribe(() => {
      this.loadNotifications();
    });
  }

  ngOnDestroy() {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (res: any) => {
        let extracted: any[] = [];
        if (Array.isArray(res)) extracted = res;
        else if (res?.data && Array.isArray(res.data)) extracted = res.data;
        else if (res?.items) extracted = res.items;

        this.notifications = extracted;
        this.unreadCount = this.notifications.filter((n) => !n.isRead).length;
      },
      error: (err) => console.error('Error fetching notifications:', err),
    });
  }

  markAsRead(notification: any) {
    if (notification.isRead) {
      this.navigateBasedOnNotification(notification);
      return;
    }

    this.notificationService.markAsRead(notification.id).subscribe({
      next: () => {
        notification.isRead = true;
        this.unreadCount = Math.max(0, this.unreadCount - 1);
        this.navigateBasedOnNotification(notification);
      },
      error: (err) => console.error('Error marking as read:', err),
    });
  }

  private navigateBasedOnNotification(notif: any) {
    const type = notif.type || '';
    const msg = (notif.message || '').toLowerCase();

    if (
      type.includes('Leave') ||
      msg.includes('leave') ||
      msg.includes('Ù…ØºØ§Ø¯Ø±Ø©') ||
      msg.includes('Ø¥Ø¬Ø§Ø²Ø©')
    ) {
      this.router.navigate(['/leave']);
    } else if (
      type.includes('Salary') ||
      msg.includes('salary') ||
      msg.includes('Ø±Ø§ØªØ¨')
    ) {
      this.router.navigate(['/salary']);
    } else if (
      type.includes('Clock') ||
      msg.includes('attendance') ||
      msg.includes('Ø­Ø¶ÙˆØ±')
    ) {
      this.router.navigate(['/attendance']);
    }
  }
}


```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\shared\sidebar\sidebar.component.css


```css

.sidebar {
  width: var(--sidebar-width, 260px);
  min-width: 200px;
  max-width: 400px;
  background-color: var(--color-surface-2, #f2f3f5);
  border-right: 1px solid var(--color-border, #e5e7eb);
  color: var(--color-text, #333);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --sidebar-scale: 1;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: calc(30px * var(--sidebar-scale)) calc(20px * var(--sidebar-scale)) calc(20px * var(--sidebar-scale));
}

.sidebar-logo-wrap {
  width: calc(45px * var(--sidebar-scale));
  height: calc(45px * var(--sidebar-scale));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: var(--color-surface, #fff);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.sidebar-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sidebar-brand-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sidebar-brand-name {
  font-size: calc(1.35rem * var(--sidebar-scale));
  font-weight: 800;
  color: var(--color-text, #111);
  letter-spacing: 0.5px;
  line-height: 1;
  transition: color 0.3s ease;
}

.sidebar-brand-sub {
  font-size: calc(0.65rem * var(--sidebar-scale));
  color: var(--color-text-label, #888);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
  transition: color 0.3s ease;
}

.sidebar-nav {
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 calc(14px * var(--sidebar-scale));
}

.sidebar-nav::-webkit-scrollbar { width: 4px; }
.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  padding-bottom: 20px;
}

.sidebar-nav li { margin-bottom: 4px; }

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: calc(12px * var(--sidebar-scale));
  padding: calc(10px * var(--sidebar-scale)) calc(12px * var(--sidebar-scale));
  font-size: calc(0.95rem * var(--sidebar-scale));
  color: var(--color-link, #5f6368);
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-nav a i {
  font-size: calc(1.1rem * var(--sidebar-scale));
  color: var(--color-link-icon, #7f838a);
  transition: color 0.2s;
}

.sidebar-nav a:hover {
  background-color: var(--color-link-hover-bg, #e5e7eb);
  color: var(--color-link-hover, #111);
}

.sidebar-nav a:hover i {
  color: var(--color-link-hover, #333);
}

.sidebar-nav a.active {
  background-color: var(--color-link-hover-bg, #e5e7eb);
  color: var(--color-link-hover, #111);
  font-weight: 600;
}

.sidebar-nav a.active i {
  color: var(--color-link-hover, #111);
}

.section-title {
  padding: calc(20px * var(--sidebar-scale)) calc(12px * var(--sidebar-scale)) calc(8px * var(--sidebar-scale));
  font-size: calc(0.75rem * var(--sidebar-scale));
  text-transform: uppercase;
  color: var(--color-text-label, #9ca3af);
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-footer {
  margin-top: auto;
  padding: calc(16px * var(--sidebar-scale));
  border-top: 1px solid var(--color-border, #e5e7eb);
  transition: border-color 0.3s ease;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: calc(10px * var(--sidebar-scale));
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 10px;
}

.user-profile:hover {
  background-color: var(--color-surface-3, #e5e7eb);
}

.avatar-initials {
  width: calc(38px * var(--sidebar-scale));
  height: calc(38px * var(--sidebar-scale));
  border-radius: 50%;
  background: var(--color-avatar-bg, #d1d5db);
  color: var(--color-avatar-text, #111);
  font-weight: 600;
  font-size: calc(14px * var(--sidebar-scale));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.user-info { white-space: nowrap; overflow: hidden; }

.user-info .name {
  margin: 0;
  font-weight: 600;
  color: var(--color-text, #111);
  font-size: calc(0.9rem * var(--sidebar-scale));
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: color 0.3s ease;
}

.user-info .status {
  margin: 0;
  font-size: calc(0.75rem * var(--sidebar-scale));
  color: var(--color-text-muted, #6b7280);
  transition: color 0.3s ease;
}

.btn-logout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: calc(10px * var(--sidebar-scale));
  background: transparent;
  border: 1px solid var(--color-logout-border, #d1d5db);
  color: var(--color-logout-text, #4b5563);
  border-radius: 8px;
  font-weight: 500;
  font-size: calc(0.9rem * var(--sidebar-scale));
  cursor: pointer;
  transition: all 0.2s;
}

.btn-logout:hover {
  background-color: #fef2f2;
  color: #dc2626;
  border-color: #fecaca;
}

.sidebar-resizer {
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  cursor: ew-resize;
  z-index: 10;
  background-color: transparent;
  transition: background-color 0.2s;
}

.sidebar-resizer:hover,
.sidebar-resizer.active {
  background-color: var(--color-border, #d1d5db);
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\shared\sidebar\sidebar.component.html


```html

<div class="sidebar" #sidebar>

    <!-- â”€â”€ Brand â”€â”€ -->
    <div class="sidebar-brand" style="cursor: pointer;" routerLink="/dashboard"
        (click)="closeMobileSidebar()">
        <div class="sidebar-logo-wrap">
            <img src="kawadir-logo.png" alt="Kawadir" class="sidebar-logo">
        </div>
        <div class="sidebar-brand-text">
            <span class="sidebar-brand-name">Kawadir</span>
            <span class="sidebar-brand-sub">{{ 'HR Management' | t }}</span>
        </div>
    </div>

    <!-- â”€â”€ Navigation â”€â”€ -->
    <nav class="sidebar-nav">
        <ul>
            <li><a routerLink="/dashboard" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-house"></i> {{ 'Dashboard' | t }}</a></li>
            <li><a routerLink="/my-profile" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-person"></i> {{ 'My Profile' | t
                    }}</a></li>
            <li><a routerLink="/employees" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-people"></i> {{ 'Employees' | t }}</a></li>
            <li><a routerLink="/leave" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-calendar2-check"></i> {{ 'Leave Requests' |
                    t }}</a></li>
            <li><a routerLink="/attendance" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-clock-history"></i> {{ 'Attendance' | t
                    }}</a></li>
            <li><a routerLink="/salary" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-cash-stack"></i> {{ 'Salaries' | t
                    }}</a></li>

            @if (isAdmin) {
            <li class="section-title">{{ 'System Control' | t }}</li>
            <li><a routerLink="/departments" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-diagram-3"></i> {{ 'Departments' | t
                    }}</a></li>
            <li><a routerLink="/positions" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-briefcase"></i> {{ 'Positions' | t
                    }}</a></li>
            <li><a routerLink="/register" routerLinkActive="active"
                    (click)="closeMobileSidebar()"><i
                        class="bi bi-person-plus"></i> {{ 'Register User' | t }}
                </a></li>
            }
        </ul>
    </nav>

    <!-- â”€â”€ Footer (Profile + Logout) â”€â”€ -->
    <div class="sidebar-footer">
        <div class="user-profile" routerLink="/my-profile"
            (click)="closeMobileSidebar()">
            <div class="avatar-initials">{{ initials }}</div>
            <div class="user-info">
                <p class="name">{{ userName }}</p>
                <p class="status">{{ userRole }}</p>
            </div>
        </div>
        <button class="btn-logout" (click)="onLogout()">
            <i class="bi bi-box-arrow-right"></i> <span>{{ 'Logout' | t
                }}</span>
        </button>
    </div>

    <!-- Resizer Handle -->
    <div class="sidebar-resizer" [class.active]="isResizing"
        (mousedown)="startResize($event)"></div>
</div>

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\app\shared\sidebar\sidebar.component.ts


```ts

import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { EmployeeService } from '../../core/services/employee.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private sidebarService = inject(SidebarService);
  private employeeService = inject(EmployeeService);

  isAdmin: boolean = false;
  userName: string = 'User';
  userRole: string = 'Employee';

  @ViewChild('sidebar') sidebarRef!: ElementRef;
  isResizing = false;

  startResize(event: MouseEvent) {
    this.isResizing = true;
    event.preventDefault(); // Ù…Ø§ Ù†Ø­Ø¯Ø¯ Ù†Øµ
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;
    const newWidth = event.clientX;
    // Ù†Ø­ØµØ± Ø§Ù„Ø¹Ø±Ø¶
    if (newWidth >= 200 && newWidth <= 400) {
      this.sidebarRef.nativeElement.style.width = `${newWidth}px`;

      // Ù†Ø­Ø¯Ù‘Ø« Ø§Ù„Ù…ØªØºÙŠØ± Ø§Ù„Ø¹Ø§Ù…
      document.documentElement.style.setProperty(
        '--sidebar-width',
        `${newWidth}px`,
      );

      // Ø³ÙƒÙŠÙ„ Ø¹Ù„Ù‰ 260
      const scale = newWidth / 260;
      this.sidebarRef.nativeElement.style.setProperty(
        '--sidebar-scale',
        scale.toString(),
      );
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isResizing = false;
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.userName = localStorage.getItem('user_name') || 'User';
    this.userRole = localStorage.getItem('user_role') || 'Employee';

    this.employeeService.getMyProfile().subscribe({
      next: (profile) => {
        if (profile && profile.positionTitle) {
          this.userRole = profile.positionTitle;
        }
      },
      error: () => {}, // Ø·Ù†Ù‘Ø´ Ø§Ù„Ø£Ø®Ø·Ø§Ø¡
    });
  }

  get initials(): string {
    return this.userName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  closeMobileSidebar() {
    this.sidebarService.closeMobileSidebar();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\environments\environment.prod.ts


```ts

export const environment = {
  production: true,
  // TODO: Replace with your actual Render URL later
  apiUrl: 'https://kawadir-hrms.onrender.com/api'
};

```

## File: D:\HRMS-Team\FrontEnd\HRMS-GradProject\src\environments\environment.ts


```ts

export const environment = {
  production: false,
  apiUrl: 'https://localhost:7204/api'
};

```
