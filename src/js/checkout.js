// js/checkout.js
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", "#order-summary");
checkout.init();

document.querySelector("input[name='zip']").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

document
  .querySelector("#checkoutSubmit")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    //const response = await checkout.checkout(e.target);
    //console.log("Order Response:", response); // Handle success/failure
  });
