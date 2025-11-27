/**
 * Main Application Entry Point
 * Initializes the IoT Energy Dashboard
 */

import { initERAWidget } from "./era-widget.js";
import {
  showHistory,
  showDetails,
  resetPeak,
  analyzeTHD,
  closeModal,
  showNotification,
  updateSystemStatus,
} from "./ui-handlers.js";

// Make functions globally available for inline onclick handlers
window.showHistory = showHistory;
window.showDetails = showDetails;
window.resetPeak = resetPeak;
window.analyzeTHD = analyzeTHD;
window.closeModal = closeModal;

/**
 * Initialize application
 */
function initApp() {
  console.log("IoT Energy Dashboard starting...");

  // Initialize E-RA Widget
  initERAWidget();

  // Set up periodic status updates
  setInterval(updateSystemStatus, 30000); // Every 30 seconds

  // Initial status update
  updateSystemStatus();

  // Modal click outside to close
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      closeModal();
    }
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  console.log("Dashboard initialized successfully");
  showNotification("Dashboard khởi động thành công!", "success");
}

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
