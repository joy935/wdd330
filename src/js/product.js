import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // setLocalStorage("so-cart", product); // fix this line because it overwrites the cart
  // get the current cart items from local storage
  const cartItems = getLocalStorage("so-cart") || [];
  // add the new product to the cart items
  cartItems.push(product);
  // save the updated cart items to local storage
  setLocalStorage("so-cart", cartItems);
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
