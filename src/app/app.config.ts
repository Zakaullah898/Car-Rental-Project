import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';


import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptorInterceptor } from './core/services/custom-interceptor.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([customInterceptorInterceptor])),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,withInMemoryScrolling({
        scrollPositionRestoration: 'top',   // scroll to top on navigation
        anchorScrolling: 'enabled'          // enable #anchor scrolling
      })), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),]
}
