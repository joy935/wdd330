class Alert {
  constructor() {
    this.alerts = [];
  }

  async loadAlerts() {
    try {
      const response = await fetch("../public/json/alerts.json");
      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.warn("Network response was not ok");
      }
      this.alerts = await response.json();
      this.displayAlerts();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to load alerts:", error);
    }
  }

  displayAlerts() {
    if (this.alerts.length > 0) {
      const alertSection = document.createElement("section");
      alertSection.classList.add("alert-list");

      this.alerts.forEach((alert) => {
        const alertElement = document.createElement("p");
        alertElement.textContent = alert.message;
        alertElement.style.backgroundColor = alert.background;
        alertElement.style.color = alert.color;
        alertSection.appendChild(alertElement);
      });

      const mainElement = document.querySelector("main");
      if (mainElement) {
        mainElement.prepend(alertSection);
      }
    }
  }
}

export default Alert;
