import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
    <p class="cart-card__quantity"> 
    <label for="${item.Id}">Quantity </label>
    <input type="number" id="${item.Id}" data-id="${item.Id}" class="qty" min="1" max="100" value = "${item.Quantity}" /> 
    </p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// Function to update the quantity of items in the cart 
// and then save
export function updateCartItem(key, id, newQuantity) {
  let cart = getLocalStorage(`${key}`);
  const itemIndex = cart.findIndex(item => item.Id === id);
  if (itemIndex !== -1) {
      cart[itemIndex].Quantity = newQuantity;
  } else {
      alert("Item not found in cart");
  }
  //Save changes to local storage
  setLocalStorage(key, cart);
}

// ShoppingCart save cart data in localstorage
// is exported to / imported by cart.js
export default class ShoppingCart {
    // assigns variables to data
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }
    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        
        // if there are no items in the cart, display a message
        if (!cartItems) {
          document.querySelector(".product-list").innerHTML =
            "<p>Your cart is empty</p>";
          return;
        }
      
        // otherwise, display the cart items
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      
        // calculate total price
        let total = 0;
        cartItems.forEach((item) => {
          total += parseFloat(item.FinalPrice);
        });
      
        const cartFooter = document.querySelector(".cart-footer");
        // show the cart footer
        cartFooter.removeAttribute("hidden");
        // add total price to the cart footer
        cartFooter.innerHTML = `<p class="cart-total">Total: $${total.toFixed(2)}</p>`;
      
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
      }
}