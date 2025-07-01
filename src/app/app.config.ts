// ¿Qué es este código?
// Es una configuración central de la aplicación Angular usando la API moderna de Angular, que define los proveedores de servicios globales para la app.

import { ApplicationConfig,importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), importProvidersFrom(HttpClientModule),provideHttpClient()
  ]
};


// provideBrowserGlobalErrorListeners()	Activa la escucha global de errores del navegador para reportarlos a Angular.
// provideZoneChangeDetection({ eventCoalescing: true })	Optimiza la detección de cambios usando zone.js para mejorar rendimiento.
// provideRouter(routes)	Configura el sistema de rutas con las rutas definidas en tu archivo routes.
// importProvidersFrom(HttpClientModule)	Importa los proveedores del módulo HTTP clásico para poder usar servicios HTTP.
// provideHttpClient()	Provee el cliente HTTP moderno (introducido en Angular 16) para hacer solicitudes HTTP.