/* main.js - Core Application Entry Point */
import './styles/theme.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/animations.css';

import { initTimer } from './js/timer.js';
import { initScrollAnimations } from './js/animations.js';
import { initSurvey, initDataExporter } from './js/survey.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Countdown Timer
  initTimer();

  // Initialize Scroll-driven & parallax animations
  initScrollAnimations();

  // Initialize Survey Form controls and privacy modal
  initSurvey();

  // Initialize hidden CSV data exporter for local storage surveys
  initDataExporter();
});
