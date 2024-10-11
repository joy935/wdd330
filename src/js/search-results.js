import { loadHeaderFooter, renderListWithTemplate } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { getParam } from "./utils.mjs";

loadHeaderFooter();

const box = document.querySelector(".product-list");
const services = new ExternalServices();

async function getSearchResults() {
  try {
    const searchResults = await services.getData(getParam("search"));

    if (searchResults.length > 0) {
      renderListWithTemplate(productCardTemplate, box, searchResults);
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
