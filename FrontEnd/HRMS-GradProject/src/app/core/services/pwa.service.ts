import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

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
      e.preventDefault();
      this.deferredPrompt = e;
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
    });
  }

  public promptInstall(): void {
    if (this.deferredPrompt) {

      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        this.deferredPrompt = null;
      });
    } else if (this.isAlreadyInstalled()) {
      Swal.fire({
        icon: 'info',
        title: 'Already Installed',
        text: 'Kawadir app is already installed on your device!',
        confirmButtonColor: '#0d6efd'
      });
    } else {

      const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      const isChrome = /chrome/i.test(navigator.userAgent) && !/edge/i.test(navigator.userAgent);
      const isEdge = /edg/i.test(navigator.userAgent);
      const isFirefox = /firefox/i.test(navigator.userAgent);

      let instructionsHtml = '';

      if (isIOS) {
        instructionsHtml = `
          <div style="text-align:left; line-height: 2;">
            <p>To install on iOS (Safari):</p>
            <ol style="padding-left: 1.2rem;">
              <li>Tap the <b>Share</b> button <span style="font-size:1.2rem;">⎋</span> at the bottom</li>
              <li>Scroll down and tap <b>"Add to Home Screen"</b></li>
              <li>Tap <b>Add</b></li>
            </ol>
          </div>`;
      } else if (isChrome || isEdge) {
        instructionsHtml = `
          <div style="text-align:left; line-height: 2;">
            <p>To install on ${isEdge ? 'Edge' : 'Chrome'}:</p>
            <ol style="padding-left: 1.2rem;">
              <li>Click the <b>⋮</b> menu (top-right)</li>
              <li>Click <b>"Install Kawadir..."</b> or <b>"Add to Home Screen"</b></li>
              <li>Click <b>Install</b></li>
            </ol>
          </div>`;
      } else if (isFirefox) {
        instructionsHtml = `
          <div style="text-align:left; line-height: 2;">
            <p>Firefox does not fully support PWA install.<br>We recommend using <b>Chrome</b> or <b>Edge</b> to install the app.</p>
          </div>`;
      } else {
        instructionsHtml = `
          <div style="text-align:left; line-height: 2;">
            <p>To install the app:</p>
            <ol style="padding-left: 1.2rem;">
              <li>Open the browser <b>menu</b> (⋮ or ☰)</li>
              <li>Look for <b>"Install App"</b> or <b>"Add to Home Screen"</b></li>
            </ol>
          </div>`;
      }

      Swal.fire({
        icon: 'info',
        title: 'Install Kawadir',
        html: instructionsHtml,
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#0d6efd',
        width: '420px'
      });
    }
  }

  private isAlreadyInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  }

  public get canInstall(): boolean {
    return true;
  }
}
