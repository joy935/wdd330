import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
// event listener to remove item from cart
cart.removeItemListener();

// event listener to go to checkout page
document.querySelector(".checkout-button").addEventListener("click", () => {
  window.location.href = "/checkout/index.html";
});
