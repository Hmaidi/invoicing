import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {  provideHttpClient } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import {  provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes),provideHttpClient(),DialogService,    provideAnimations(), provideAnimationsAsync(),provideNoopAnimations()
  
  ]
};