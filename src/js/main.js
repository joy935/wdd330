import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

// const listfilter = new ProductList('Tents', dataSource, listElement);
// await listing.filterProducts('Tents');

// listfilter.init();

listing.init();
// console.log("it works");