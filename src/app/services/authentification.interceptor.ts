import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthentificationService } from './authentification.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthentificationService);
  const token = authService.getToken();

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};

// Nouvelle implémentation spécifique pour WebSocket
export const websocketAuthInterceptor = {
  provide: 'WEBSOCKET_AUTH_INTERCEPTOR',
  useFactory: (authService: AuthentificationService) => {
    return {
      connectHeaders: () => ({
        Authorization: `Bearer ${authService.getToken()}`,
        'X-Requested-With': 'XMLHttpRequest' // Nécessaire pour certaines configs CORS
      })
    };
  },
  deps: [AuthentificationService]
};