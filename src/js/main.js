// main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";

// ✅ Wait for header to load, then run other logic
loadHeaderFooter().then(() => {
  updateCartCount();

  const category = "tents";
  const dataSource = new ProductData(category);
  const listElement = document.querySelector(".product-list");

  const tentList = new ProductList(category, dataSource, listElement);
  tentList.init();
});

// ✅ Function to update cart item badge
function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.length;
  const badge = document.getElementById("cart-count");

  if (badge) {
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = "inline";
    } else {
      badge.style.display = "none";
    }
  }
}
