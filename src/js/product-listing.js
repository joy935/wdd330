
import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const categoryFromURL = getParam("category");
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const productList = new ProductListing(
  categoryFromURL,
  dataSource,
  listElement,
);

productList.init();
