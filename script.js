// Toggle Cart Panel
const cartToggle = document.getElementById("cart-toggle");
const cartPanel = document.getElementById("cart-panel");

cartToggle.addEventListener("click", () => {
  cartPanel.classList.toggle("show");
});

// Add to Cart
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  });
});

// Render Cart
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>৳${item.price} x ${item.quantity}</p>
      <button class="remove-item" data-id="${item.id}">❌ Remove</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  updateTotalPrice(cart);
}

// Remove Item
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-item")) {
    const id = e.target.dataset.id;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
});

// Update Cart Count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

// Update Total Price
function updateTotalPrice(cart) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("total-price").textContent = total.toFixed(2);
}

// Clear Cart
document.getElementById("clear-cart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  renderCart();
  updateCartCount();
});

// Checkout (Simulation)
document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("✅ Checkout successful! Thank you for shopping with VibeMart.");
  localStorage.removeItem("cart");
  renderCart();
  updateCartCount();
});

// Load on Page Start
window.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});

// 🔍 Smart Search Bar
document.getElementById("search-bar").addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  const products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    const name = product.dataset.name.toLowerCase();
    const category = product.dataset.category?.toLowerCase() || "";
    const brand = product.dataset.brand?.toLowerCase() || "";

    if (name.includes(query) || category.includes(query) || brand.includes(query)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});
