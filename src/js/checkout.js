import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

// Load header and footer, then update cart badge
loadHeaderFooter().then(() => {
  updateCartCount();
});