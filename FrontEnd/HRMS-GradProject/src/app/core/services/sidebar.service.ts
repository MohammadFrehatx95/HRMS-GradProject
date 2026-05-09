import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
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
