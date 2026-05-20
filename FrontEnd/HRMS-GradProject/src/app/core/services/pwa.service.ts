import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private deferredPrompt: any = null;

  constructor() {
    this.init();
  }

  private init() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      console.log('beforeinstallprompt event captured');
    });
  }

  public promptInstall(): void {
    if (this.deferredPrompt) {
      // Show the install prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        // We no longer need the prompt. Clear it up.
        this.deferredPrompt = null;
      });
    } else {
      console.log('No deferred prompt available');
    }
  }

  public get canInstall(): boolean {
    return !!this.deferredPrompt;
  }
}
