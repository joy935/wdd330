import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { updateCartItem } from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
// event listener to remove item from cart
cart.removeItemListener();

// event listener to go to checkout page
document.querySelector(".checkout-button").addEventListener("click", () => {
  window.location.href = "/checkout/index.html";
});

// Event listener for Updating Product Quantity
// Leads to update the quantity in the cart
// It is saved it to local storage:
document.querySelectorAll(".qty").forEach((input) => {
  input.addEventListener("change", function (event) {
    const newQuantity = parseInt(event.target.value);
    const itemId = event.target.getAttribute("data-id");

    if (newQuantity < 1 || newQuantity > 100) {
      alert("Quantity must be between 1 and 100");
      return;
    }
    // Update the cart with the new quantity
    updateCartItem("so-cart", itemId, newQuantity);
  });
});

