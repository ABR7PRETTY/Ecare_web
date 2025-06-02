// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { authInterceptor, websocketAuthInterceptor} from './services/authentification.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    websocketAuthInterceptor,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // Providers pour SockJS
    { provide: 'global', useValue: window },
    { provide: 'process', useValue: { env: {} } }
  ]
};