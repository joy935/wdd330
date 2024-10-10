import { loadHeaderFooter } from "./utils.mjs";
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
    checkout.checkout();
  });
