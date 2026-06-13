import { Component, inject, OnInit, OnDestroy, Renderer2 } from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  sidebarService = inject(SidebarService);
  updateService = inject(UpdateService);
  pwaService = inject(PwaService);
  router = inject(Router);
  renderer = inject(Renderer2);
  private unlistenHideModal!: () => void;

  ngOnInit() {
    this.unlistenHideModal = this.renderer.listen('document', 'hide.bs.modal', () => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
  }

  ngOnDestroy() {
    if (this.unlistenHideModal) {
      this.unlistenHideModal();
    }
  }

  get isAiRoute(): boolean {
    return this.router.url.includes('/ai-assistant');
  }

  get isAuthRoute(): boolean {
    return this.router.url.includes('/login');
  }

  get isSidebarHidden() {

    return this.sidebarService.isSidebarHidden();
  }

  get isMobileSidebarOpen() {

    return this.sidebarService.isMobileSidebarOpen();
  }

  closeMobileSidebar() {

    this.sidebarService.closeMobileSidebar();
  }
}
