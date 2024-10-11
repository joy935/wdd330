import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.shippingDeposit = 10;
        this.extraItemShippingCost = 2;
        this.taxRate = 0.06;
    }
    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
        this.calculateOrderTotal();
    }
    calculateItemSummary() {
        this.list = getLocalStorage(this.key);
            // calculate and display the total amount of the items in the cart, 
            this.list.forEach(item => {         
                this.itemTotal += item.FinalPrice * item.Quantity;    
            });
            document.getElementById("subtotal").textContent = this.itemTotal.toFixed(2);

            // and the number of items.
            this.list.length;  
        }
    calculateOrderTotal() {
            // calculate the shipping. 
            this.list.forEach(item => {
                this.shipping += (item.Quantity * 2) 
                });
            this.shipping = this.shipping + this.shippingDeposit - this.extraItemShippingCost;
            // calculate the tax amounts. 
            this.tax = this.itemTotal * this.taxRate;
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
        
}