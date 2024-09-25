import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

const productId = getParam("product");
console.log(productId);

function addProductToCart(newProduct) {
  // retrieve current cart info from local storage
  const cart = getLocalStorage("so-cart") || [];

  // check if the product is already in the cart
  const exists = cart.some(product => product.Id === newProduct.Id);

  // if the product isn't already in the cart, add it, otherwise do nothing
  if (!exists) {
    // add new item to the cart
    cart.push(newProduct);
    // update local storage with complete cart
    setLocalStorage("so-cart", cart);
  }
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

