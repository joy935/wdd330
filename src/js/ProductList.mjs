import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    // populates products to the home page
    return `
    <li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.PrimaryMedium}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`
}

export default class ProductListing {
    // assigns variables to data
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    // obtains the data
    async init() {
        const list = await this.dataSource.getData(this.category);
        let newList = list.filter((product, i) => i < 4);
        this.renderList(newList);
        // set the title of the page to the category
        document.querySelector(".h2__title").innerHTML = this.category;
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}