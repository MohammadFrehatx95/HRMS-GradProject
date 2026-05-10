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

  // ✅ public حتى نستخدمه في الـ template
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
    }
  }
}

