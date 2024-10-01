
import { renderListWithTemplate } from "./utils.mjs";

export function productCardTemplate(product) {
    return `<li class="product-card">
                <a href="product_pages/index.html?product=${product.Id}">
                <img
                    src= ${product.Image}
                    alt= ${product.Name}
                />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.Name}</h2>
                <p class="product-card__price">$${product.FinalPrice}</p>
                </a>
          </li>`
  }


export default class ProductList{
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }


    async init() {
      // our dataSource will return a Promise...so we can use await to resolve it.
      const list = await this.dataSource.getData();
      // render the list
      this.renderList(list);
    }

     // render before doing the stretch
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }


  // async filterProducts(criteria) {
  //   const list = await this.dataSource.getData(); // Get the complete product list
  //   const filteredList = list.filter(product => {
  //     let matches = true;
  //     if (criteria.category) {
  //       matches = matches && product.category === criteria.category;
  //     }
  //     if (criteria.maxPrice !== undefined) {
  //       matches = matches && product.FinalPrice < criteria.maxPrice; // Assuming FinalPrice is the price property
  //     }
  //     if (criteria.name) {
  //       matches = matches && product.Name.includes(criteria.name); // Check product name
  //     }
  //     // Check if the product has an image
  //     matches = matches && product.Image; // Assuming `Image` holds the image URL or path

  //     return matches;
  //   })
  //   this.renderList(filteredList); // Render the filtered list
  // }
    
    



}