import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalEl = document.querySelector("#cart-total");

  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    return; // Don't show footer
  }

  // Render each cart item
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // Calculate total and show cart footer
  const total = cartItems
    .reduce((sum, item) => sum + item.FinalPrice, 0)
    .toFixed(2);
  cartTotalEl.textContent = total;
  cartFooter.classList.remove("hide");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
