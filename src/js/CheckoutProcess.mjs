// js/CheckoutProcess.mjs
import { getLocalStorage, formDataToJSON } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

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
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((total, item) => total + item.FinalPrice * item.Quantity, 0);
    document.querySelector(`${this.outputSelector} #subtotal`).innerText = this.itemTotal.toFixed(2);
  }

  calculateOrderTotal() {
    const itemCount = this.list.reduce((count, item) => count + item.Quantity, 0);
    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + (itemCount > 1 ? (itemCount - 1) * 2 : 0);
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #tax`).innerText = this.tax.toFixed(2);
    document.querySelector(`${this.outputSelector} #shipping`).innerText = this.shipping.toFixed(2);
    document.querySelector(`${this.outputSelector} #order-total`).innerText = this.orderTotal.toFixed(2);
  }

  packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.Quantity
    }));
  }

  async checkout(form) {
    const formData = formDataToJSON(form);
    const order = {
      ...formData,
      orderDate: new Date().toISOString(),
      items: this.packageItems(this.list),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };

    const service = new ExternalServices();
    const response = await service.checkout(order);
    return response;
  }
}
