import { bootstrapApplication } from '@angular/platform-browser';
import { destroyPlatform, getPlatform } from '@angular/core';
import { appConfig } from './app/app.config';
import { App } from './app/app';


// Destroy previous platform instance if it exists (prevents NG0400)
destroyPlatform();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
