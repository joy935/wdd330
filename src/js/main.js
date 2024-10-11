import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.js";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const alertInstance = new Alert();
  alertInstance.loadAlerts();
});
