// main.js
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

// Load header and footer, then update cart badge
loadHeaderFooter().then(() => {
  updateCartCount();
});

const category = "tents";
const dataSource = new ExternalServices(category);
const listElement = document.querySelector(".product-list");

const tentList = new ProductList(category, dataSource, listElement);
tentList.init();
