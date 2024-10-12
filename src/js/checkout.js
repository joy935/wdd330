import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const checkout = new CheckoutProcess("so-cart", ".product-list");
checkout.init();

// event listener to display the summary order details
document.getElementById("zip").addEventListener("input", () => {
  checkout.calculateOrderTotal();
});

// event listener to checkout
document
  .getElementById("checkout-button")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const form = document.getElementById("checkout-form");
    const zip = form.zip.value;
    const cardNumber = form.cardNumber.value;
    const expiration = form.expiration.value;
    const code = form.code.value;

    const zipPattern = /^\d{5}$/;
    const cardPattern = /^\d{16}$/;
    const expirationPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const codePattern = /^\d{3}$/;

    let alertList = [];

    if (!zipPattern.test(zip)) {
      alertList.push("Invalid zip code");
    }
    if (!cardPattern.test(cardNumber)) {
      alertList.push("Invalid card number");
    }
    if (!expirationPattern.test(expiration)) {
      alertList.push("Invalid expiration date");
    }
    if (!codePattern.test(code)) {
      alertList.push("Invalid security code");
    }

    if (alertList.length > 0) {
      alertList.forEach((message) => {
        alertMessage(message);
      });
      return;
    }

    checkout.checkout();
    return;
  });
