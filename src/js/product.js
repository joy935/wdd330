import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get the current cart items from local storage or initialize it empty array
  const currentCartItems = getLocalStorage("so-cart") || [];

  // Add new product 
  currentCartItems.push(product); 

  // Save the updated cart item back to local storage
  setLocalStorage("so-cart", currentCartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
