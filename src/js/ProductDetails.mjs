import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
  }

  async init() {
    // Get product details
    this.product = await this.dataSource.findProductById(this.productId);

    // Render to the page
    this.renderProductDetails(this.product);

    // Add click listener to "Add to Cart" button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  renderProductDetails(product) {
    const detailsSection = document.querySelector("#productDetails");

    // Clear existing content (if any)
    detailsSection.innerHTML = `
      <h3>${product.Brand?.Name || " "}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img class="divider" src="${product.Image}" alt="${product.Name}" />

      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors?.[0]?.ColorName || " "}</p>

      <p class="product__description">${product.DescriptionHtmlSimple}</p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    `;
  }

  addProductToCart() {
    let cartItems = getLocalStorage("so-cart");

    // Ensure cartItems is an array
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }
}
