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
    <span class="cart-card__remove-data" id="${item.Id}">X</span>  
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

/////////////////
export function cartQuantityEvent(event) {
  const newQuantity = parseInt(event.target.value);
  const itemId = event.target.getAttribute("data-id");

  if (newQuantity < 1 || newQuantity > 100) {
    alert("Quantity must be between 1 and 100");
    return;
  }
  // Update the cart with the new quantity
  updateCartItem("so-cart", itemId, newQuantity);
};


////////////////


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
        const cartFooter = document.querySelector(".cart-footer");
        const checkoutBtn = document.querySelector(".checkout-button");
        
        // if there are no items in the cart, display a message
        if (!cartItems || cartItems.length === 0) {
          document.querySelector(".product-list").innerHTML =
            "<p>Your cart is empty</p>";
            // cartFooter.setAttribute("hidden", "true");
            // checkoutBtn.setAttribute("hidden", "true");
            document.querySelector(".cart-footer").setAttribute("hidden", true); // hide the cart footer
          document.querySelector(".checkout-button").style.display = "none"; // hide the checkout button
          return;
        }
      
        // otherwise, display the cart items
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      
        // calculate total price
        let total = 0;
        cartItems.forEach((item) => {
          total += parseFloat(item.FinalPrice * item.Quantity);
        });
      
        // show the cart footer
        cartFooter.removeAttribute("hidden");
        checkoutBtn.removeAttribute("hidden");
        // add total price to the cart footer
        cartFooter.innerHTML = `<p class="cart-total">Total: $${total.toFixed(2)}</p>`;
      
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
  }
  removeItemListener() {
    const cartContainer = document.querySelector(this.parentSelector);
    
    // event listener to remove item from cart
    cartContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("cart-card__remove-data")) {
        const itemId = e.target.id;
        this.removeItem(itemId);
      }
    });
  }

  removeItem(itemId) {
    let cartItems = getLocalStorage(this.key);
    cartItems = cartItems.filter((item) => item.Id !== itemId);
    // update local storage
    setLocalStorage(this.key, cartItems);
    // re-render the cart
    this.renderCartContents();
  }
}