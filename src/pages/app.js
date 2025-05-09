import '../styles/styles.css';
import '../styles/themes.css';

import { formHandler } from './formHandler.js';
import { previewUpdater } from './previewUpdater.js';
import { pdfGenerator } from './pdfGenerator.js';
import { sectionOrderManager } from './sectionOrderManager.js';
import { themeManager } from './themeManager.js';
import { imageUploader } from './imageUploader.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
  formHandler.init();
  previewUpdater.init();
  pdfGenerator.init();
  sectionOrderManager.init();
  themeManager.init();
  imageUploader.init();
});
