import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const externalService = new ExternalServices();
function DataToJson(formElement) {
    const formData = new FormData(formElement), convertToJson = {};
    formData.forEach((value, key) => {
        convertToJson[key] = value;
    });
    return convertToJson;
}

// takes the items currently stored in the cart (localstorage) 
// and returns them in a simplified form.
function packageItems(items) {
    const itemsSimplified = items.map((item) => {
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return itemsSimplified;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }
    calculateItemSummary() {
        this.list = getLocalStorage(this.key);
            // calculate and display the total amount of the items in the cart, 
            this.list.forEach(item => {         
                this.itemTotal += item.FinalPrice;    
            });
            document.getElementById("subtotal").textContent = this.itemTotal.toFixed(2);

            // and the number of items.
            this.list.length;  
        }
    calculateOrderTotal() {
            // calculate the shipping and tax amounts. 
            this.shipping = 10 + (this.list.length - 1 ) * 2;
            this.tax = this.itemTotal * 0.06;
            // Then use them to along with the cart total to figure out the order total
            this.orderTotal = this.itemTotal + this.shipping + this.tax;

            // display the total
            this.displayOrderTotals();
    }
    displayOrderTotals() {
        document.getElementById("shipping-estimate").textContent = this.shipping.toFixed(2);
        document.getElementById("tax").textContent = this.tax.toFixed(2);
        document.getElementById("order-total").textContent = this.orderTotal.toFixed(2);
    }
    async checkout() {
        const formElement = document.forms["checkout-form"];
        // build the data object from the calculated fields, the items in the cart, 
        // and the information entered into the form
        const data = DataToJson(formElement);
        data.orderDate = new Date(),
        data.subtotal = parseFloat(this.itemTotal),
        data.tax = parseFloat(this.tax.toFixed(2)),
        data.shipping = parseFloat(this.shipping),
        data.orderTotal = parseFloat(this.orderTotal.toFixed(2)),
        data.items = packageItems(this.list);
        // call the checkout method in our ExternalServices module 
        // and send it our data object.
        try {
            const response = await externalService.checkout(data);
            console.log("API response:", response);
            setLocalStorage("so-cart", []); // clear the cart

            // Hide cart footer and checkout button
            const cartFooter = document.querySelector(".cart-footer");
            const checkoutBtn = document.querySelector(".checkout-button");
            
            if (cartFooter) cartFooter.setAttribute("hidden", "true");
            if (checkoutBtn) checkoutBtn.setAttribute("hidden", "true");


            window.location.href = "/checkout/success.html"; // redirect to success page
        } catch (error) {
            console.error("API error:", error);
        }
    }
        
}