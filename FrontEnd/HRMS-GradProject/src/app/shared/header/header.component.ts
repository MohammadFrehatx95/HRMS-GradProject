import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { SidebarService } from '../../core/services/sidebar.service';
import { SettingsService } from '../../core/services/settings.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { PwaService } from '../../core/services/pwa.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

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
  
  // ✅ public حتى نستخدمه في الـ template
  pwaService = inject(PwaService);
  settingsService = inject(SettingsService);
  authService = inject(AuthService);

  notifications: any[] = [];
  unreadCount: number = 0;
  profilePicUrl: string | null = null;
  private pollingSub?: Subscription;

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  installApp() {
    this.pwaService.promptInstall();
  }

  ngOnInit() {
    this.loadNotifications();
    this.pollingSub = interval(5000).subscribe(() => {
      this.loadNotifications();
    });

    this.profilePicUrl = this.authService.getCurrentUserProfilePic();
    if (typeof window !== 'undefined') {
      window.addEventListener('profile_pic_updated', () => {
        this.profilePicUrl = this.authService.getCurrentUserProfilePic();
      });
    }
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

  markAllAsRead(event: Event) {
    event.stopPropagation(); // لمنع إغلاق القائمة المنسدلة
    if (this.unreadCount === 0) return;

    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications.forEach(n => n.isRead = true);
        this.unreadCount = 0;
      },
      error: (err) => console.error('Error marking all as read:', err),
    });
  }

  deleteNotification(event: Event, id: number) {
    event.stopPropagation();
    Swal.fire({
      title: 'Delete Notification?',
      text: 'Are you sure you want to delete this notification?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.notificationService.deleteNotification(id).subscribe({
          next: () => {
            this.notifications = this.notifications.filter(n => n.id !== id);
            this.unreadCount = this.notifications.filter((n) => !n.isRead).length;
          },
          error: (err) => console.error('Error deleting notification:', err)
        });
      }
    });
  }

  deleteAllNotifications(event: Event) {
    event.stopPropagation();
    if (this.notifications.length === 0) return;

    Swal.fire({
      title: 'Clear All Notifications?',
      text: 'Are you sure you want to delete all notifications?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete all',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.notificationService.deleteAllNotifications().subscribe({
          next: () => {
            this.notifications = [];
            this.unreadCount = 0;
          },
          error: (err) => console.error('Error deleting all notifications:', err)
        });
      }
    });
  }

  private navigateBasedOnNotification(notif: any) {
    const type = notif.type || '';
    const msg = (notif.message || '').toLowerCase();

    if (
      type.includes('Leave') ||
      msg.includes('leave') ||
      msg.includes('مغادرة') ||
      msg.includes('إجازة')
    ) {
      this.router.navigate(['/leave']);
    } else if (
      type.includes('Salary') ||
      msg.includes('salary') ||
      msg.includes('راتب')
    ) {
      this.router.navigate(['/salary']);
    } else if (
      type.includes('Clock') ||
      msg.includes('attendance') ||
      msg.includes('حضور')
    ) {
      this.router.navigate(['/attendance']);
    } else if (
      type.includes('Meeting') ||
      msg.includes('meeting') ||
      msg.includes('اجتماع') ||
      msg.includes('مقابلة') ||
      msg.includes('interview')
    ) {
      this.router.navigate(['/meetings']);
    } else if (
      type.includes('Adjustment') ||
      type.includes('Bonus') ||
      type.includes('Penalty') ||
      msg.includes('bonus') ||
      msg.includes('penalty') ||
      msg.includes('مكافأة') ||
      msg.includes('بونص') ||
      msg.includes('خصم') ||
      msg.includes('عقوبة')
    ) {
      this.router.navigate(['/payroll-adjustments']);
    } else if (
      type.includes('Announcement') ||
      msg.includes('announcement') ||
      msg.includes('إعلان')
    ) {
      this.router.navigate(['/dashboard']);
    } else if (
      type.includes('ProfilePicture') ||
      type.includes('profile_picture') ||
      msg.includes('profile picture') ||
      msg.includes('profile photo') ||
      msg.includes('صورة') ||
      msg.includes('picture')
    ) {
      this.router.navigate(['/pending-approvals']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}

