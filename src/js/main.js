import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductListing("Tents", dataSource, listElement);
productList.init();
