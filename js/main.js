
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  console.log("FlockiShop booted. UX-Engines online.");
});

let cartCount = 0;
let cart = JSON.parse(localStorage.getItem("cart")) || {};

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productName, price) {
  if (!cart[productName]) {
    cart[productName] = { quantity: 1, price };
  } else {
    cart[productName].quantity++;
  }
  saveCart();
  updateCartUI();
  showToast(productName, price);
}
function updateCartUI() {
  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
}

function showToast(productName, price) {
  const toastContainer = document.getElementById('toast-container');

  const toastEl = document.createElement('div');
  toastEl.className = 'toast align-items-center text-bg-success border-0 show';
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ✅ <strong>${productName}</strong> wurde deinem Warenkorb hinzugefügt.<br>
        <small>Warenwert: € ${price}</small>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  toastContainer.appendChild(toastEl);

  // Jetzt Bootstrap-Toast initialisieren
  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  // Automatisch entfernen
  setTimeout(() => toastEl.remove(), 4000);
}

$('#product-grid').on('click', 'button[data-id]', function () {
  const productName = $(this).data('name');
  const productPrice = parseFloat($(this).data('price'));

  addToCart(productName, productPrice);
});
