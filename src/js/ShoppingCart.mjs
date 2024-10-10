import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}"/>
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

export default class ShoppingCart {
    // assigns variables to data
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }
    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        const cartFooter = document.querySelector(".cart-footer");
        const checkoutBtn = document.querySelector(".checkout-button");
        
        // if there are no items in the cart, display a message
        if (!cartItems || cartItems.length === 0) {
          document.querySelector(".product-list").innerHTML =
            "<p>Your cart is empty</p>";
            cartFooter.setAttribute("hidden", "true");
            checkoutBtn.setAttribute("hidden", "true");
          return;
        }
      
        // otherwise, display the cart items
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      
        // calculate total price
        let total = 0;
        cartItems.forEach((item) => {
          total += parseFloat(item.FinalPrice);
        });
      
        // show the cart footer
        cartFooter.removeAttribute("hidden");
        checkoutBtn.removeAttribute("hidden");
        // add total price to the cart footer
        cartFooter.innerHTML = `<p class="cart-total">Total: $${total.toFixed(2)}</p>`;
      
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
      }
}