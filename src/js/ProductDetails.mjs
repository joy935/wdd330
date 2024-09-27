import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
    return `
    <main class="divider">
        <section class="product-detail">
            <h3>${product.Brand.Name}</h3>
            <h2 class=divider>${product.NameWithoutBrand}</h2>
            <img 
                class="divider"
                src="${product.Image}" 
                alt="${product.NameWithoutBrand}">

            <p class="product-card__price">$${product.ListPrice}</p>
            <p class="product__color">${product.Colors[0].ColorName}</p>
            <p class="product__description">${product.DescriptionHtmlSimple}</p>

            <div class="product-detail__add">
                <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
            </div>
        </section>
    </main>
    `;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");
        document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this));
    }
    addToCart() {
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
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
    }
};
