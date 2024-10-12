import { loadHeaderFooter, renderListWithTemplate } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { getParam } from "./utils.mjs";

loadHeaderFooter();

const box = document.querySelector(".product-list");
const services = new ExternalServices();

async function getSearchResults() {
  try {
    const searchResults = getParam("search");

    if (searchResults.length > 0) {
      // array of the products by categories
      const categories = ["tents", "hammocks", "sleeping-bags", "backpacks"];

      // fetch data for all categories concurrently using Promise.all
      const getData = categories.map((category) => services.getData(category));
      const allData = await Promise.all(getData);

      // flatten the products into a single array
      const allResults = allData.flat();

      // check if the search query matches the products
      const matchedResults = allResults.filter(
        (product) =>
          // match the brand
          product.Brand.Name.toLowerCase().includes(
            searchResults.toLowerCase(),
          ) ||
          // match the category
          product.Category.toLowerCase().includes(
            searchResults.toLowerCase(),
          ) ||
          // match the product name
          product.Name.toLowerCase().includes(searchResults.toLowerCase()) ||
          // match the color
          product.Colors?.some((color) =>
            color.ColorName.toLowerCase().includes(searchResults.toLowerCase()),
          ),
      );

      if (matchedResults.length > 0) {
        renderListWithTemplate(productCardTemplate, box, matchedResults);
      } else {
        box.innerHTML = "<p>No results found.</p>";
      }
    } else {
      box.innerHTML = "<p>No results found.</p>";
    }
  } catch (error) {
    box.innerHTML = "<p>There was an error. Please try again later.</p>";
  }
}

function productCardTemplate(product) {
  // populates products to the product page
  return `
    <li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

getSearchResults();
