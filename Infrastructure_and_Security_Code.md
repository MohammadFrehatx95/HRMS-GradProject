# ملف الكود الخاص بمسؤول البنية التحتية والأمان

## FrontEnd\HRMS-GradProject\src\app\core\guards\admin.guard.ts

``ts
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

``

## FrontEnd\HRMS-GradProject\src\app\core\guards\auth.guard.ts

``ts
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

``

## FrontEnd\HRMS-GradProject\src\app\core\guards\hr.guard.ts

``ts
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

``

## FrontEnd\HRMS-GradProject\src\app\core\i18n\translations.ts

``ts
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

``

## FrontEnd\HRMS-GradProject\src\app\core\interceptors\auth.interceptor.ts

``ts
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

``

## FrontEnd\HRMS-GradProject\src\app\core\pipes\translate.pipe.ts

``ts
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

``

## FrontEnd\HRMS-GradProject\src\app\core\services\attendance.service.ts

``ts
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


``

## FrontEnd\HRMS-GradProject\src\app\core\services\auth.service.ts

``ts
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


``

## FrontEnd\HRMS-GradProject\src\app\core\services\department.service.ts

``ts
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

``

## FrontEnd\HRMS-GradProject\src\app\core\services\employee.service.ts

``ts
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


``

## FrontEnd\HRMS-GradProject\src\app\core\services\leave.service.ts

``ts
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


``

## FrontEnd\HRMS-GradProject\src\app\core\services\notification.service.ts

``ts
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


``

## FrontEnd\HRMS-GradProject\src\app\core\services\position.service.ts

``ts
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


``

## FrontEnd\HRMS-GradProject\src\app\core\services\salary.service.ts

``ts
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


``

## FrontEnd\HRMS-GradProject\src\app\core\services\settings.service.ts

``ts
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

``

## FrontEnd\HRMS-GradProject\src\app\core\services\sidebar.service.ts

``ts
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

``

## FrontEnd\HRMS-GradProject\src\app\core\utils\error-handler.util.ts

``ts
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

``

## FrontEnd\HRMS-GradProject\src\app\app.config.ts

``ts
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

``

## FrontEnd\HRMS-GradProject\src\app\app.routes.ts

``ts
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

``

## FrontEnd\HRMS-GradProject\src\environments\environment.ts

``ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7204/api'
};

``

## FrontEnd\HRMS-GradProject\src\environments\environment.prod.ts

``ts
export const environment = {
  production: true,
  // TODO: Replace with your actual Render URL later
  apiUrl: 'https://kawadir-hrms.onrender.com/api'
};

``

## Infrastructure\Data\AppContext\AppDbContext.cs

``cs
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
    {
    
    }

    public DbSet<Employee> Employees { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<Position> Positions { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Leave> Leaves => Set<Leave>();
    public DbSet<Attendance> Attendances { get; set; } 
    public DbSet<Salary> Salaries { get; set; }
    
    public DbSet<Notification> Notifications => Set<Notification>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Department)
            .WithMany(d => d.Employees)
            .HasForeignKey(e => e.DepartmentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.User)
            .WithOne(u => u.Employee)
            .HasForeignKey<Employee>(e => e.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        //modelBuilder.Entity<Employee>()
        //   .HasOne(e => e.User)
        //   .WithOne(u => u.Employee)
        //   .HasForeignKey<Employee>(e => e.Email)
        //   .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Employee>()
             .Property(e => e.Id)
             .ValueGeneratedNever();


        modelBuilder.Entity<Position>()
            .HasOne(p => p.Department)
            .WithMany(d => d.Positions)
            .HasForeignKey(p => p.DepartmentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Leave>()
            .HasOne(l => l.Employee)
            .WithMany(e => e.LeaveRequests)
            .HasForeignKey(l => l.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

    


        modelBuilder.Entity<Attendance>()
            .HasOne(a => a.Employee)
            .WithMany(e => e.Attendances)
            .HasForeignKey(a => a.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Salary>()
            .HasOne(s => s.Employee)
            .WithMany(e => e.Salaries)
            .HasForeignKey(s => s.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Notification>()
            .HasOne(n => n.User)
            .WithMany(u => u.Notifications)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Leave>()
            .Property(l => l.RejectionReason)
            .IsRequired(false)  // يقبل null
            .HasMaxLength(500);



        modelBuilder.Entity<Department>().HasData(
           new Department { Id = 1, Name = "HR" },
           new Department { Id = 2, Name = "IT" },
           new Department { Id = 3, Name = "Finance" },
           new Department { Id = 4, Name = "Operations" });

        modelBuilder.Entity<Position>().HasData(
    new Position { Id = 1, Title = "HR Manager", DepartmentId = 1 },
    new Position { Id = 2, Title = "HR Specialist", DepartmentId = 1 },
    new Position { Id = 3, Title = "Software Engineer", DepartmentId = 2 },
    new Position { Id = 4, Title = "IT Manager", DepartmentId = 2 },
    new Position { Id = 5, Title = "Accountant", DepartmentId = 3 },
    new Position { Id = 6, Title = "Finance Manager", DepartmentId = 3 },
    new Position { Id = 7, Title = "Operations Manager", DepartmentId = 4 }
);


    }
}
``

## Infrastructure\Data\Repositories\GenericRepository.cs

``cs
// Author : Abedalqader Alfaqeeh
// last Edit : 2026-04-11 
// / <summary> this class is an implementation of the IGenericRepository interface,
// which provides basic CRUD operations for a generic repository pattern. 


using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Infrastructure.Data;

namespace Infrastructure.Data.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly AppDbContext context;
        private readonly DbSet<T> dbSet;

        public GenericRepository(AppDbContext context)
        {
            this.context = context;
            this.dbSet = context.Set<T>();
           
        }

        public async Task<IEnumerable<T>> GetAllAsync(params Expression<Func<T, object>>[] includes) 
        {

            IQueryable<T> query = dbSet;
            if (includes != null && includes.Length > 0)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }
            return await query.ToListAsync();


        }

        public IQueryable<T> GetAllQueryable() => context.Set<T>().AsQueryable();
        public async Task<T?> GetByIdAsync(params object[] keyValues)
        {
            return await dbSet.FindAsync(keyValues);
        }

        public async Task<T?> GetAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = dbSet;
            if (includes != null && includes.Length > 0)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }
            return await query.FirstOrDefaultAsync(predicate);
        }

        public async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate)
        {
            return await dbSet.AnyAsync(predicate);
        }   

        public async Task AddAsync(T entity)
        {
            await dbSet.AddAsync(entity);
        }
        public void Update(T entity)
        {
            dbSet.Update(entity);
        }
        public void Delete(T entity)
        {
            dbSet.Remove(entity);
        } 






    }
}

``

## Infrastructure\Data\Repositories\UnitOfWork.cs

``cs
using Domain.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;

namespace Infrastructure.Repositories;

public class UnitOfWork(AppDbContext context) : IUnitOfWork
{
    private readonly Dictionary<Type, object> _repositories = [];

    public IGenericRepository<T> Repository<T>() where T : class
    {
        var type = typeof(T);

        if (!_repositories.ContainsKey(type))
            _repositories[type] = new GenericRepository<T>(context);

        return (IGenericRepository<T>)_repositories[type];
    }

    public async Task<int> SaveChangesAsync() =>
        await context.SaveChangesAsync();

    public void Dispose() => context.Dispose();
}
``

## Infrastructure\DependencyInjection.cs

``cs
using Application.Mappings;
using Application.Services.Implementations;
using Application.Services.Interfaces;
using Application.Settings;
using Domain.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Database
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection")));



        // UnitOfWork
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }

    public static IServiceCollection AddApplication(
     this IServiceCollection services, IConfiguration configuration)
    {
        // AutoMapper
        services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfile>());

        // Services
        services.AddScoped<IEmployeeService, EmployeeService>();
        services.AddScoped<IDepartmentService, DepartmentService>();
        services.AddScoped<IPositionService, PositionService>();
        services.AddScoped<ILeaveService, LeaveService>();
        services.AddScoped<IAttendanceService, AttendanceService>();
        
        services.AddScoped<ISalaryService, SalaryService>();
        services.AddScoped<IUserService, UserService>();

        services.AddScoped<INotificationService, NotificationService>();
        // أضف هاد
        // obtain IConfiguration from the service collection to avoid missing 'configuration' variable
        
        services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
        services.AddScoped<IEmailService, EmailService>();

        return services;
    }
}
``

## HRMS-GradProject\Middleware\ExceptionHandlingMiddleware.cs

``cs
using System.Net;
using System.Text.Json;
using Application.Common;

namespace HRMS_API.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";

        var (statusCode, message) = ex switch
        {
            KeyNotFoundException => (HttpStatusCode.NotFound, ex.Message),
            UnauthorizedAccessException => (HttpStatusCode.Unauthorized, ex.Message),
            ArgumentException => (HttpStatusCode.BadRequest, ex.Message),
            InvalidOperationException => (HttpStatusCode.BadRequest, ex.Message),
            _  => (HttpStatusCode.InternalServerError, ex.InnerException?.Message ?? ex.Message)
        };

        context.Response.StatusCode = (int) statusCode;

        var response = ApiResponse.Fail(message);
        var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        return context.Response.WriteAsync(json);
    }
}
``

## Application\Services\Implementations\JwtService.cs

``cs
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services.Implementations
{
    public class JwtService(IConfiguration config) : IJwtService
    {
        public string GenerateToken(User user)
        {
            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));

            var Clims= new[]
            {

            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role,  user.Role.ToString()),
            new Claim("employeeId", user.Employee?.Id.ToString() ?? "")

            };

            var token = new JwtSecurityToken(

                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                claims: Clims,
                expires : GetExpiration(),
                signingCredentials: new SigningCredentials(Key, SecurityAlgorithms.HmacSha256)

                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        public DateTime GetExpiration() =>
       DateTime.UtcNow.AddHours(
           double.Parse(config["Jwt:ExpiryHours"] ?? "24"));

    }
}

``

## Application\Services\Interfaces\IJwtService.cs

``cs
using Domain.Entities;

namespace Application.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
    DateTime GetExpiration();
}
``


