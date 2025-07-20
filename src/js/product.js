import { getParam, loadHeaderFooter, updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load header and footer, then update cart badge
loadHeaderFooter().then(() => {
  updateCartCount();
});

// Get the product ID from the query string
const productId = getParam("product");

// Create a new instance of ProductData for the "tents" category
const dataSource = new ProductData("tents");

// Create a new ProductDetails instance
const product = new ProductDetails(productId, dataSource);

// Initialize it: fetch data, render, set up "Add to Cart" listener
product.init();
