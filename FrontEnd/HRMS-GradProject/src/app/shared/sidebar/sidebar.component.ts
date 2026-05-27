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
  isAdminOrHR: boolean = false;
  userName: string = 'User';
  userRole: string = 'Employee';
  profilePicUrl: string | null = null;

  @ViewChild('sidebar') sidebarRef!: ElementRef;
  isResizing = false;

  startResize(event: MouseEvent) {
    this.isResizing = true;
    event.preventDefault(); // ما نحدد نص
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;
    const newWidth = event.clientX;
    // نحصر العرض
    if (newWidth >= 200 && newWidth <= 400) {
      this.sidebarRef.nativeElement.style.width = `${newWidth}px`;

      // نحدّث المتغير العام
      document.documentElement.style.setProperty(
        '--sidebar-width',
        `${newWidth}px`,
      );

      // سكيل على 260
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
    this.isAdminOrHR = this.authService.isAdminOrHR();
    this.userName = localStorage.getItem('user_name') || 'User';
    this.userRole = localStorage.getItem('user_role') || 'Employee';

    // الأدمن ليس له Employee profile — نتجنب طلب الـ API الزائد
    if (!this.isAdmin) {
      this.employeeService.getMyProfile().subscribe({
        next: (profile) => {
          if (profile && profile.positionTitle) {
            this.userRole = profile.positionTitle;
          }
        },
        error: () => {}, // طنّش الأخطاء
      });
    }

    this.profilePicUrl = this.authService.getCurrentUserProfilePic();
    if (typeof window !== 'undefined') {
      window.addEventListener('profile_pic_updated', () => {
        this.profilePicUrl = this.authService.getCurrentUserProfilePic();
      });
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

  closeMobileSidebar() {
    this.sidebarService.closeMobileSidebar();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
