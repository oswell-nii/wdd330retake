// main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, updateCartCount } from "./utils.mjs";

// Load header and footer, then update cart badge
loadHeaderFooter().then(() => {
  updateCartCount();
});

// Get the category from URL
const category = getParam("category");

// Update page title
const titleElement = document.getElementById("product-list-title");
if (titleElement && category) {
  // Capitalize the first letter
  const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
  titleElement.textContent = `Top Products: ${capitalized}`;
}

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const tentList = new ProductList(category, dataSource, listElement);
tentList.init();
