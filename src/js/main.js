// main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const category = "tents";
const dataSource = new ProductData(category);
const listElement = document.querySelector(".product-list"); // or your target container

const tentList = new ProductList(category, dataSource, listElement);
tentList.init();
