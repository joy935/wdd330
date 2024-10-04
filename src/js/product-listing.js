import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function getSelectedCategory() {
    const fromURL = new URLSearchParams(window.location.search);
    const category = fromURL.get("category");
    return category;
}

loadHeaderFooter();
let categroyFromURL = getSelectedCategory();
const dataSource = new ProductData(categroyFromURL);
const listElement = document.querySelector(".product-list");
const productList = new ProductListing(categroyFromURL, dataSource, listElement);
productList.init();