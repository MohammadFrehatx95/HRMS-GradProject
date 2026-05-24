import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { SidebarService } from './core/services/sidebar.service';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { UpdateService } from './core/services/update.service';
import { PwaService } from './core/services/pwa.service';

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
  updateService = inject(UpdateService);
  pwaService = inject(PwaService);
  router = inject(Router);

  get isAiRoute(): boolean {
    return this.router.url.includes('/ai-assistant');
  }

  get isSidebarHidden() {
    // حالة السايدبار
    return this.sidebarService.isSidebarHidden();
  }

  get isMobileSidebarOpen() {
    // فتح السايدبار بالموبايل
    return this.sidebarService.isMobileSidebarOpen();
  }

  closeMobileSidebar() {
    // إغلاق السايدبار بالموبايل
    this.sidebarService.closeMobileSidebar();
  }
}
