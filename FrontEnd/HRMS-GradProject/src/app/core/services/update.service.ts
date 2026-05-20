import { Injectable, inject, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, switchMap } from 'rxjs/operators';
import { concat, interval } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private updates = inject(SwUpdate);
  private appRef = inject(ApplicationRef);

  constructor() {
    this.checkForUpdates();
    this.initUpdateChecker();
  }

  private initUpdateChecker() {
    if (!this.updates.isEnabled) {
      console.log('Service Worker is not enabled.');
      return;
    }

    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable === true),
    );

    // Poll every 6 hours
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await this.updates.checkForUpdate();
        console.log(
          updateFound
            ? 'A new version is available.'
            : 'Already on the latest version.',
        );
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }

  private checkForUpdates() {
    if (!this.updates.isEnabled) {
      return;
    }

    this.updates.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          this.promptUser();
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });
  }

  private promptUser() {
    Swal.fire({
      title: 'Update Available!',
      text: 'A new version of Kawadir HRMS is ready. Please update to get the latest features and fixes.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Update Now',
      cancelButtonText: 'Later',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
