import { Component, OnInit, inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    event.preventDefault(); // Prevent text selection
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;
    const newWidth = event.clientX;
    // Apply bounds (200px to 400px)
    if (newWidth >= 200 && newWidth <= 400) {
      this.sidebarRef.nativeElement.style.width = `${newWidth}px`;
      
      // Calculate scale relative to default width (260px)
      const scale = newWidth / 260;
      this.sidebarRef.nativeElement.style.setProperty('--sidebar-scale', scale.toString());
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
      error: () => {} // ignore errors (e.g. if admin has no profile)
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
