import 'zone.js';
console.log('App starting...');
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppRoot } from './app/app';

// Register Chart.js components
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

bootstrapApplication(AppRoot, appConfig)
  .catch((err) => console.error(err));
