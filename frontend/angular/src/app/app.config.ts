import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
// pick one preset: Aura | Lara | Material | Nora
import Lara from '@primeuix/themes/lara';
import { authInterceptor } from './services/interceptor/auth-interceptor';
import { MessageService, ConfirmationService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideAnimations(),          
    provideHttpClient(),  
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Lara,
        options: {darkModeSelector:'.app-dark'}
        // optional: dark mode class you toggle on <html>
        // options: { darkModeSelector: '.app-dark' }
      }
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    MessageService,
    ConfirmationService
  ]
};
