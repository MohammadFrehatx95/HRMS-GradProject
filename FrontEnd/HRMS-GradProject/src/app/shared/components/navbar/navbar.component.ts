import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  notifications: any[] = [];
  unreadCount: number = 0;
  private refreshInterval: any;

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit() {
    this.loadNotifications();
    this.refreshInterval = setInterval(() => this.loadNotifications(), 60000);
  }

  loadNotifications() {
    this.notificationService.getUnreadCount().subscribe({
      next: (res: any) => {
        this.unreadCount = res && res.data !== undefined ? res.data : res || 0;
      },
      error: (err) => console.error('Error fetching unread count:', err),
    });

    this.notificationService.getNotifications().subscribe({
      next: (res: any) => {
        const extractedData = Array.isArray(res) ? res : res?.data || [];
        this.notifications = Array.isArray(extractedData) ? extractedData : [];
      },
      error: (err) => console.error('Error fetching notifications:', err),
    });
  }

  readNotification(notification: any) {
    this.notificationService.markAsRead(notification.id).subscribe({
      next: () => {
        this.loadNotifications();

        const message = notification.message.toLowerCase();
        if (
          message.includes('leave') ||
          message.includes('مغادرة') ||
          message.includes('إجازة')
        ) {
          this.router.navigate(['/leave']);
        } else if (message.includes('salary') || message.includes('راتب')) {
          this.router.navigate(['/salary']);
        }
      },
    });
  }

  readAll() {
    this.notificationService.markAllAsRead().subscribe(() => {
      this.loadNotifications();
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'All marked as read',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  onLogout() {
    Swal.fire({
      title: 'Ready to leave?',
      text: 'You will be logged out of your current session.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
  }
}
