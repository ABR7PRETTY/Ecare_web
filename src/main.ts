(window as any).global = window;
(window as any).process = { env: {} };
if (!window.crypto) {
  window.crypto = (window as any).msCrypto; // Pour IE11
}

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));